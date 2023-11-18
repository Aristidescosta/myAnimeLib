/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, CircularProgress, useToast } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import online from "is-online";

import { AnimeRow, EmptyMessage, Featured } from "../../shared/components";
import { useVerifyInternet } from "../../shared/states/useVerifyInternet";
import { useDataAnime } from "../../shared/states/useAnimeRequest";
import { useToastMessage } from "../../shared/chakra-ui-api/toast";
import { APP_VARIANT_COLOR } from "../../shared/utils/constants";
import jikanDB from "../../jikanDB";
import { AnimeData } from "../../shared/types/AnimeData";

export interface IAnimeListProps {
  slug: string;
  title: string;
  items: any;
}

export const Home: React.FC = () => {
  const {
    calculateIntervalBetweenDates,
    setAnimeData,
    setAnimeList,
    animeList,
    animeData,
  } = useDataAnime();
  const [isLoading, setIsLoading] = useState(true);

  const { ToastStatus } = useToastMessage();
  const { isOnline, setIsOnline } = useVerifyInternet();
  const toast = useToast();
  const toastIdRef = useRef<number | undefined>();

  useEffect(() => {
    online().then((online) => {
      setIsOnline(online);
    });

    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);

  useEffect(() => {
    if (!isOnline) {
      toastIdRef.current = toast({
        description: "Conexão a internet perdida",
        status: ToastStatus.WARNING,
        duration: 900000,
        position: "top-right",
      }) as number;
    } else {
      if (toastIdRef.current) {
        toast.update(toastIdRef.current, {
          description: "Conexão restabelecida",
          status: ToastStatus.INFO,
          duration: 1000,
        });
      }
    }
  }, [isOnline]);

  const addDataOnAnimeData = (response: IAnimeListProps[]) => {
    let animeDataCount = 0;
    const ANIME_DATA: AnimeData[] = [];
    while (animeDataCount < 4) {
      const RANDOM_CHOISE_SLUGS = Math.floor(Math.random() * response.length);

      const RANDOM_CHOISE = Math.floor(
        Math.random() * response[RANDOM_CHOISE_SLUGS].items.data.length
      );

      const choice = response[RANDOM_CHOISE_SLUGS].items.data[RANDOM_CHOISE];
      if (!animeData.includes(choice)) {
        animeDataCount++;
        ANIME_DATA.push(choice);
      }
    }
    setAnimeData(ANIME_DATA);
  };

  function getAnimeList(): Promise<IAnimeListProps[]> {
    return new Promise((resolve, reject) => {
      jikanDB
        .getAnimeList()
        .then((response) => {
          addDataOnAnimeData(response);
          resolve(response);
        })
        .catch(() => {
          reject({ message: "Ouve um erro interno" });
        })
        .finally(() => setIsLoading(false));
    });
  }

  useEffect(() => {
    setIsLoading(true);

    if (
      !animeList ||
      animeList.length === 0 ||
      !animeData ||
      animeData.length === 0
    ) {
      getAnimeList()
        .then((response) => {
          setAnimeList(response);
        })
        .catch((error) => {
          toast({
            description: error.message,
            status: ToastStatus.ERROR,
            position: "top-right",
          });
        });
    } else {
      const CURRENT_DATE = new Date();
      const INTERVAL_BETWEEN_DATES =
        calculateIntervalBetweenDates(CURRENT_DATE);
      if (INTERVAL_BETWEEN_DATES && INTERVAL_BETWEEN_DATES.DAYS >= 1) {
        getAnimeList()
          .then((response) => {
            setAnimeList(response);
          })
          .catch((error) => {
            toast({
              description: error.message,
              status: ToastStatus.ERROR,
              position: "top-right",
            });
          });
      } else {
        setIsLoading(false);
        addDataOnAnimeData(animeList);
      }
    }
  }, []);
  return (
    <>
      {isLoading ? (
        <Box
          display={"flex"}
          h={"100%"}
          w={"100%"}
					overflow={"hidden"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <CircularProgress
            value={30}
            size={"120px"}
            color={APP_VARIANT_COLOR}
            isIndeterminate
          />
        </Box>
      ) : animeData.length > 0 ? (
        <>
          <Featured items={animeData} />
          <Box>
            <Box as="section">
              {animeList.length > 0 &&
                animeList.map((item, key) => (
                  <AnimeRow
                    key={key}
                    title={item.title}
                    items={item.items.data}
                  />
                ))}
            </Box>
          </Box>
        </>
      ) : (
        <EmptyMessage message="Tivemos um erro interno, por favor recarrege a página!" />
      )}
    </>
  );
};
