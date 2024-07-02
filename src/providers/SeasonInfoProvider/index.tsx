import { addOnDateHandler } from '@/hooks/useClock';
import { getSeasons } from '@/services';
import { SeasonInfo } from '@/types';
import React, { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { CurrentSeasonPeriodModal } from './CurrentSeasonPeriodModal';

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

  // const [seasonEndedModalVisible, setSeasonEndedModalVisible] = useState(false);
  const [prizePoolModalVisible, setPrizePoolModalVisible] = useState(false);

  const [seasons, setSeasons] = useState<SeasonInfo[]>([]);

  const currentSeason = useMemo(() => {
    return seasons?.find((season) => season.isCurrent === true);
  }, [seasons]);

  useEffect(() => {
    let dispose: (() => void) | null = null;

    const refreshSeasonData = async () => {
      const seasons = await getSeasons();

      setSeasons(seasons);

      const currentSeason = seasons.find((season) => season.isCurrent);

      if (currentSeason) {
        const prizePoolModalShownFlag = 'prizePoolModalShown_' + currentSeason.seasonKey;

        if (currentSeason.popTime && !getStorageFlag(prizePoolModalShownFlag)) {
          dispose = addOnDateHandler({
            date: currentSeason.popTime,
            handler: () => {
              setPrizePoolModalVisible(true);
              setStorageFlag(prizePoolModalShownFlag);
            }
          });
        }
      }
    };

    refreshSeasonData();

    return () => {
      if (typeof dispose === 'function') dispose();
    };
  }, []);

  return (
    <SeasonInfoContext.Provider value={{ seasons: seasons, currentSeason }}>
      {children}

      {/* <LastSeasonEndedModal
        seasonInfo={seasons}
        open={seasonEndedModalVisible}
        onOpenChange={setSeasonEndedModalVisible}
      /> */}

      <CurrentSeasonPeriodModal
        seasonInfo={currentSeason}
        open={prizePoolModalVisible}
        onOpenChange={setPrizePoolModalVisible}
      />
    </SeasonInfoContext.Provider>
  );
};
