import { addOnDateHandler } from '@/hooks/useClock';
import { getSeasons } from '@/services';
import { MiniRewardStatus, SeasonInfo } from '@/types';
import React, { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';
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

  const [seasons, setSeasons] = useState<SeasonInfo[]>([]);

  const currentSeason = useMemo(() => {
    return seasons?.find((season) => season.isCurrent === true);
  }, [seasons]);

  const lastSeason = useMemo(() => {
    const currentSeasonIndex = seasons.findIndex((season) => season.isCurrent);
    return seasons[currentSeasonIndex - 1] ?? null;
  }, [seasons]);

  useEffect(() => {
    const disposes: (() => void)[] = [];

    const refreshSeasonData = async () => {
      const seasons = await getSeasons();

      setSeasons(seasons);

      const currentSeasonIndex = seasons.findIndex((season) => season.isCurrent);
      const currentSeason = seasons[currentSeasonIndex];

      if (currentSeason) {
        const prizePoolModalShownFlag = 'prizePoolModalShown_' + currentSeason.seasonKey;

        if (currentSeason.popTime && !getStorageFlag(prizePoolModalShownFlag)) {
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
            handler: () => {
              refreshSeasonData();
            }
          })
        );
      }

      const lastSeason = seasons[currentSeasonIndex - 1] ?? null;

      if (lastSeason) {
        const lastSeasonEndedModalShownFlag = 'lastSeasonEndedModalShown_' + lastSeason.seasonKey;

        const shown = getStorageFlag(lastSeasonEndedModalShownFlag);

        if (!shown && (!lastSeason.result.hasGain || lastSeason.result.rewardStatus === MiniRewardStatus.Claimed)) {
          setSeasonEndedModalVisible(true);
          setStorageFlag(lastSeasonEndedModalShownFlag);
        }
      }
    };

    refreshSeasonData();

    return () => {
      disposes.forEach((dispose) => {
        if (typeof disposes === 'function') dispose();
      });
    };
  }, []);

  return (
    <SeasonInfoContext.Provider value={{ seasons: seasons, currentSeason }}>
      {children}

      <LastSeasonEndedModal
        seasonInfo={lastSeason}
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
