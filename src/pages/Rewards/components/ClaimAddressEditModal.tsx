import { useUserInfo } from '@/providers/UserInfoProvider';
import { updateClaimAddress } from '@/services';
import { Button, Input, Modal } from '@ethsign/ui';
import { shortenWalletAddress } from '@ethsign/utils-web';
import React, { useState } from 'react';
import { ClaimAddressConfirmModal } from './ClaimAddressConfirmModal';

export interface ClaimAddressEditModalVisible {
  open: boolean;
  onOpenChange?: (visible: boolean) => void;
}

export const ClaimAddressEditModal: React.FC<ClaimAddressEditModalVisible> = (props) => {
  const { user, fetchUser } = useUserInfo();

  const { open, onOpenChange } = props;

  const [claimAddress, setCalimAddress] = useState(user?.claimWalletAddress);

  const [isSaving, setIsSaving] = useState(false);

  const [claimAddressConfirmModalVisible, setClaimAddressConfirmModalVisible] = useState(false);

  const confirmUpdateAddress = async () => {
    if (!claimAddress) return;

    try {
      setIsSaving(true);

      await updateClaimAddress(claimAddress);
      setIsSaving(false);

      fetchUser();

      onOpenChange?.(false);
    } finally {
      setIsSaving(false);
      setClaimAddressConfirmModalVisible(false);
    }
  };

  return (
    <>
      <Modal
        maskClosable={!isSaving}
        className="w-[95vw] rounded-[24px] border border-white/20 bg-white p-4 pt-6 sm:w-[410px]"
        header={<h1 className="text-left text-xl font-semibold">Change Wallet Address</h1>}
        footer={false}
        open={open}
        onOpenChange={onOpenChange}
      >
        {user?.claimWalletAddress && (
          <div className="space-y-[6px] overflow-hidden">
            <div className="font-medium text-sm">Current wallet address</div>
            <div className="rounded-[8px] bg-[#F2F4F7] px-3 py-4 text-sm text-[#101828]">
              {shortenWalletAddress(user.claimWalletAddress, 'normal')}
            </div>
          </div>
        )}

        <div className="space-y-[6px] overflow-hidden">
          <div className="font-medium text-sm">New wallet address</div>
          <Input
            disabled={isSaving}
            className="border-[#D0D5DD] focus:border-primary/20 "
            placeholder="Enter wallet address manually"
            value={claimAddress}
            onChange={(e) => {
              setCalimAddress(e.target.value);
            }}
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => {
              onOpenChange?.(false);
            }}
          >
            Cancel
          </Button>
          <Button
            className="flex-1"
            onClick={() => {
              setClaimAddressConfirmModalVisible(true);
            }}
            loading={isSaving}
          >
            Save
          </Button>
        </div>
      </Modal>

      <ClaimAddressConfirmModal
        address={claimAddress!}
        loading={isSaving}
        open={claimAddressConfirmModalVisible}
        onOpenChange={setClaimAddressConfirmModalVisible}
        onConfirm={confirmUpdateAddress}
      />
    </>
  );
};
