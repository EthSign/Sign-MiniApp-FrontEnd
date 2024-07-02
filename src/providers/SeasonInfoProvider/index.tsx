import { addOnDateHandler } from '@/hooks/useClock';
import { getPreviousSeasonInfo } from '@/services';
import { SeasonInfo, SeasonInfoWithResult } from '@/types';
import React, { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLotteryInfo } from '../LotteryInfoProvider';
import { CurrentSeasonPeriodModal } from './CurrentSeasonPeriodModal';
import { LastSeasonEndedModal } from './LastSeasonEndedModal';

function getStorageFlag(flagName: string) {
  return localStorage.getItem(flagName) === 'true';
}

function setStorageFlag(flagName: string) {
  return localStorage.setItem(flagName, 'true');
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSeasonInfo = () => {
  const seasonInfo = useContext(SeasonInfoContext);

  return seasonInfo;
};

const SeasonInfoContext = createContext<{
  seasons: SeasonInfo[];
  currentSeason?: SeasonInfo;
}>({
  seasons: []
});

export const SeasonInfoProvider: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const [seasonEndedModalVisible, setSeasonEndedModalVisible] = useState(false);
  const [prizePoolModalVisible, setPrizePoolModalVisible] = useState(false);
  const { seasonList, refresh: refreshLotteryInfo } = useLotteryInfo();

  const currentSeason = useMemo(() => {
    return seasonList?.find((season) => season.isCurrent === true);
  }, [seasonList]);

  const [fullLastSeasonInfo, setFullLastSeasonInfo] = useState<SeasonInfoWithResult>();

  useEffect(() => {
    const disposes: (() => void)[] = [];

    const refreshSeasonData = async () => {
      if (!seasonList.length) await refreshLotteryInfo();

      if (currentSeason) {
        const prizePoolModalShownFlag = 'prizePoolModalShown_' + currentSeason.seasonKey;
        const shown = getStorageFlag(prizePoolModalShownFlag);

        if (currentSeason.popTime && !shown) {
          disposes.push(
            addOnDateHandler({
              date: currentSeason.popTime,
              handler: () => {
                setPrizePoolModalVisible(true);
                setStorageFlag(prizePoolModalShownFlag);
              }
            })
          );
        }

        // 当前赛季结束之后刷新赛季信息
        disposes.push(
          addOnDateHandler({
            date: currentSeason.endTime,
            handler: async () => {
              await refreshLotteryInfo();
              refreshSeasonData();
            }
          })
        );
      }

      const currentSeasonIndex = seasonList.findIndex((season) => season.isCurrent === true);
      const lastSeason = seasonList[currentSeasonIndex - 1] ?? null;

      if (lastSeason) {
        const lastSeasonEndedModalShownFlag = 'lastSeasonEndedModalShown_' + lastSeason.seasonKey;
        const shown = getStorageFlag(lastSeasonEndedModalShownFlag);

        if (!shown) {
          addOnDateHandler({
            date: lastSeason.allocatedPopTime,
            handler: async () => {
              const fullInfo = await getPreviousSeasonInfo();

              if (!fullInfo) return;

              setFullLastSeasonInfo(fullInfo);
              setSeasonEndedModalVisible(true);
              setStorageFlag(lastSeasonEndedModalShownFlag);
            }
          });
        }
      }
    };

    refreshSeasonData();

    return () => {
      disposes.forEach((dispose) => {
        if (typeof disposes === 'function') dispose();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSeason, seasonList]);

  return (
    <SeasonInfoContext.Provider value={{ seasons: seasonList, currentSeason }}>
      {children}

      <LastSeasonEndedModal
        seasonInfo={fullLastSeasonInfo}
        open={seasonEndedModalVisible}
        onOpenChange={setSeasonEndedModalVisible}
      />

      <CurrentSeasonPeriodModal
        seasonInfo={currentSeason}
        open={prizePoolModalVisible}
        onOpenChange={setPrizePoolModalVisible}
      />
    </SeasonInfoContext.Provider>
  );
};
