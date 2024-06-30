import { getSeasonInfo } from '@/services';
import { SeasonInfo } from '@/types';
import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
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

const SeasonInfoContext = createContext<SeasonInfo | undefined>(undefined);

export const SeasonInfoProvider: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const [seasonEndedModalVisible, setSeasonEndedModalVisible] = useState(false);
  const [prizePoolModalVisible, setPrizePoolModalVisible] = useState(false);

  const [seasonInfo, setSeasonInfo] = useState<SeasonInfo>();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const init = async () => {
      const seasonInfo = await getSeasonInfo();

      setSeasonInfo(seasonInfo);

      const seasonEndedModalShownFlag = 'seasonEndedModalShown_' + seasonInfo.key;
      const prizePoolModalShownFlag = 'prizePoolModalShown_' + seasonInfo.key;

      timer = setInterval(() => {
        const now = Date.now();

        if (now >= seasonInfo.seasonEndNotifyTime && !getStorageFlag(prizePoolModalShownFlag)) {
          setPrizePoolModalVisible(true);
          setStorageFlag(prizePoolModalShownFlag);
        }

        if (now >= seasonInfo.endTime && !getStorageFlag(seasonEndedModalShownFlag)) {
          setSeasonEndedModalVisible(true);
          setStorageFlag(seasonEndedModalShownFlag);
        }
      }, 1000);
    };

    init();

    return () => {
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <SeasonInfoContext.Provider value={seasonInfo}>
      {children}

      <LastSeasonEndedModal
        seasonInfo={seasonInfo}
        open={seasonEndedModalVisible}
        onOpenChange={setSeasonEndedModalVisible}
      />
      <CurrentSeasonPeriodModal open={prizePoolModalVisible} onOpenChange={setPrizePoolModalVisible} />
    </SeasonInfoContext.Provider>
  );
};
