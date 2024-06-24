import { useUserInfo } from '@/providers/UserInfoProvider';
import { updateClaimAddress } from '@/services';
import { Button, Input, Modal } from '@ethsign/ui';
import { shortenWalletAddress } from '@ethsign/utils-web';
import React, { useState } from 'react';

export interface ClaimAddressModalVisible {
  open: boolean;
  onOpenChange?: (visible: boolean) => void;
}

export const ClaimAddressModal: React.FC<ClaimAddressModalVisible> = (props) => {
  const { user, fetchUser } = useUserInfo();

  const { open, onOpenChange } = props;

  const [claimAddress, setCalimAddress] = useState(user?.claimWalletAddress);

  const confirmUpdateAddress = async () => {
    if (!claimAddress) return;

    await updateClaimAddress(claimAddress);

    fetchUser();

    onOpenChange?.(false);

    // TODO: 显示结果
  };

  return (
    <Modal
      className="w-[95vw] rounded-[24px] border border-white/20 bg-white p-4 pt-6 sm:w-[410px]"
      header=""
      footer={false}
      open={open}
      onOpenChange={onOpenChange}
    >
      {user?.claimWalletAddress && (
        <div className="overflow-hidden">
          <div className="">Current wallet address</div>
          <div className="text-xs">{shortenWalletAddress(user.claimWalletAddress, 'normal')}</div>
        </div>
      )}

      <div className="overflow-hidden">
        <div className="">New wallet address</div>
        <Input
          className="focus:border-primary/20"
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
        <Button className="flex-1" onClick={confirmUpdateAddress}>
          Change
        </Button>
      </div>
    </Modal>
  );
};
