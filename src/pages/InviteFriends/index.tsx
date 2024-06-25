import { TabBar } from '@/components/Header';
import { Star } from '@/components/Icons';
import { InvitationInfo } from '@/types';
import { UserPlus01 } from '@ethsign/icons';
import { Button, ScrollArea } from '@ethsign/ui';
import classNames from 'classnames';
import { Check, Loader2 } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useEffect, useMemo, useState } from 'react';

function ordinalSuffix(n: number): string {
  // 处理特殊情况，比如 11, 12, 13 这些数字
  if (n % 100 >= 11 && n % 100 <= 13) {
    return n + 'th';
  }

  // 其他情况，根据数字的最后一位决定后缀
  switch (n % 10) {
    case 1:
      return n + 'st';
    case 2:
      return n + 'nd';
    case 3:
      return n + 'rd';
    default:
      return n + 'th';
  }
}

function formatNumber(value: number): string {
  return value.toLocaleString('en-US');
}

const InviteFriendsPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const [invitationInfo, setInvitationInfo] = useState<InvitationInfo>();

  useEffect(() => {
    const refreshInvitationInfo = async () => {
      setLoading(true);
      // TODO: 获取当前已邀请的信息

      await new Promise((resolve) => {
        setTimeout(resolve, 1500);
      });

      setInvitationInfo({
        totalInvited: 2,
        totalPoints: 9000,
        rule: [
          { count: 1, points: 100 },
          { count: 2, points: 300 },
          { count: 3, points: 500 },
          { count: 4, points: 1000 },
          { count: 5, points: 5000 }
        ],
        rows: [
          {
            id: nanoid(),
            points: 100,
            username: 'Harry Potter'
          },
          {
            id: nanoid(),
            points: 100,
            username: 'Monkey King'
          },
          {
            id: nanoid(),
            points: 100,
            username: 'Spider Man'
          }
        ]
      });

      setLoading(false);
    };

    refreshInvitationInfo();
  }, []);

  const steps = useMemo(() => {
    const rule = invitationInfo?.rule;
    if (!rule) return [];

    return rule.map((item, index) => {
      return {
        label: ordinalSuffix(index + 1),
        finished: index < (invitationInfo?.totalInvited ?? 0),
        points: item.points
      };
    });
  }, [invitationInfo?.rule, invitationInfo?.totalInvited]);

  return (
    <div className="flex h-full flex-col">
      <TabBar title={'Invite Friends'} />

      <ScrollArea className="h-[calc(100vh-48px)] bg-white">
        <div className="flex-1 space-y-4 bg-white px-6 pt-8">
          <div className="px-[26px] text-center">
            <h1 className="font-bold text-2xl">Invite Friends</h1>

            <p className="mt-2 font-medium text-sm text-[#667085]">
              Get bonuses together with your friends who sign up Sign Protocol
            </p>
          </div>

          <div className="rounded-[16px] p-5 shadow-[0px_8px_32px_0px_rgba(31,47,70,0.08)]">
            {loading ? (
              <div className="flex min-h-20 items-center justify-center">
                <Loader2 className="animate-spin text-primary" />
              </div>
            ) : (
              <div className="flex min-h-20 justify-between gap-2">
                {steps.map((step, index) => (
                  <div className="text-center">
                    <div
                      key={index}
                      className={classNames(
                        'flex flex-1 flex-col items-center justify-center min-w-[50px] min-h-[56px] pt-[6px] pb-2 rounded-[12px] border',
                        step.finished
                          ? 'border-transparent bg-[#EBF4FF] text-[#067DFE] font-semibold'
                          : 'border-[#E4E9F2] bg-white'
                      )}
                    >
                      <span className="font-medium text-xs">
                        +{step.points >= 1000 ? step.points / 1000 + 'K' : step.points}
                      </span>

                      <div
                        className={classNames(
                          'size-4 rounded-full flex justify-center items-center mt-1',
                          step.finished ? 'bg-[#067DFE]' : 'bg-[#C5CEE0]'
                        )}
                      >
                        {step.finished ? <Check size={12} color="white" /> : <Star />}
                      </div>
                    </div>

                    <span
                      className={classNames(
                        'mt-1 font-medium text-xs',
                        step.finished ? 'text-[#067DFE]' : 'text-[#8F9BB3]'
                      )}
                    >
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <Button className="mt-4 flex w-full items-center justify-center">
              <UserPlus01 className="mr-2" size={16} color="white" />
              Invite Friends
            </Button>
          </div>

          <div
            hidden={!loading && !invitationInfo?.totalPoints}
            className="space-y-2 rounded-[16px] p-5 shadow-[0px_8px_32px_0px_rgba(31,47,70,0.08)]"
          >
            {loading && (
              <div className="flex min-h-[80px] items-center justify-center">
                <Loader2 className="animate-spin text-primary" />
              </div>
            )}

            {!loading && invitationInfo && (
              <>
                <h1 className="font-bold text-2xl">Received {formatNumber(invitationInfo.totalPoints)} points</h1>
                <div className="space-y-2">
                  {invitationInfo.rows.map((invitation) => (
                    <div key={invitation.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          className="size-[35px]"
                          src="https://sign-public-cdn.s3.us-east-1.amazonaws.com/Signie/invite-friends-coin_240625071408.webp"
                          alt=""
                        />

                        <span className="font-bold text-xs">{invitation.username}</span>
                      </div>

                      <div className="flex items-center gap-1 text-[#FEC84B]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="9" viewBox="0 0 8 9" fill="none">
                          <circle cx="4" cy="4.90625" r="4" fill="#FEC84B" />
                        </svg>
                        <span className="font-medium text-xs">+{formatNumber(invitation.points)} points</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default InviteFriendsPage;
