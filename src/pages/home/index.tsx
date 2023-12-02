/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, CircularProgress, useToast } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import online from "is-online";

import {
	AnimeRow,
	EmptyMessage,
	Featured,
	IUserFavoriteProps,
} from "../../shared/components";
import { useVerifyInternet } from "../../shared/states/useVerifyInternet";
import { useDataAnime } from "../../shared/states/useAnimeRequest";
import { useToastMessage } from "../../shared/chakra-ui-api/toast";
import { APP_VARIANT_COLOR, DATA_REQUEST } from "../../shared/utils/constants";
import { AnimeData, IAnimeListProps } from "../../shared/types/AnimeData";
import { StorageEnum, getData } from "../../shared/database/LocalStorageDAO";
import { AnimeService } from "../../shared/services/api/anime";
import { useTheBounce } from "../../shared/hooks/hooks";
import { AnimatedModal } from "../../shared/components/AnimatedModal";
import { useAnimated } from "../../shared/states/useAnimatedModal";

export const Home: React.FC = () => {
	const {
		addAnimeOnList,
		animeList,
		animeData,
		setAnimeData,
		calculateIntervalBetweenDates,
		addFavorite
	} = useDataAnime();
	const [isLoading, setIsLoading] = useState(true);
	const { isOnline, setIsOnline } = useVerifyInternet();
	const toastIdRef = useRef<number | undefined>();
	const { isOpen, onClose } = useAnimated();

	const { ToastStatus } = useToastMessage();
	const toast = useToast();
	const { theBounce } = useTheBounce();
	const USER_DATA: IUserFavoriteProps = getData(StorageEnum.UserData);
	const USER_FAVORITE_DATA = USER_DATA?.favorites;

	const updateStatusFavoriteItem = (item: AnimeData) => {
		if (USER_DATA) {
			const FAVORITE = USER_FAVORITE_DATA?.find(
				(prev) => prev.id === item.mal_id
			);

			if (FAVORITE) {
				item.isFavorite = true;
				addFavorite(item)
			}
		}
	};

	const getAnimeList = (): Promise<IAnimeListProps[] | string> => {
		return new Promise((resolve, _) => {
			const RESPONSE_DATA: IAnimeListProps[] = [];
			// Usando Promise.all para aguardar todas as chamadas assíncronas
			Promise.all(
				DATA_REQUEST.map((request) => {
					return AnimeService.getAnimeList(request.slug)
						.then((response) => {
							if (response instanceof Error) {
								resolve(response.message);
							} else {
								response.data.map((data) => updateStatusFavoriteItem(data));
								RESPONSE_DATA.push({
									...response,
									title: request.title,
								});
							}
						})
						.catch((error) => {
							resolve(error.message)
						});
				})
			).then(() => {
				addDataOnAnimeData(RESPONSE_DATA);
				resolve(RESPONSE_DATA);
			});
		});
	};

	const addDataOnAnimeData = (response: IAnimeListProps[]) => {
		let animeDataCount = 0;
		const ANIME_DATA: AnimeData[] = [];
		while (animeDataCount < 4) {
			const RANDOM_CHOISE_SLUGS = Math.floor(Math.random() * response.length);

			const RANDOM_CHOISE = Math.floor(
				Math.random() * response[RANDOM_CHOISE_SLUGS].data.length
			);

			const choice = response[RANDOM_CHOISE_SLUGS].data[RANDOM_CHOISE];
			if (!animeData.includes(choice)) {
				animeDataCount++;
				ANIME_DATA.push(choice);
			}
		}
		setAnimeData(ANIME_DATA);
	};

	const updateAnimeCard = (itemData: IAnimeListProps[]) => {
		for (const result in itemData) {
			itemData[result].data.forEach((item) => {
				USER_FAVORITE_DATA?.forEach((favoriteData) => {
					if (item.mal_id === favoriteData.id) {
						item.isFavorite = true;
					}
				});
			});
		}
		addAnimeOnList(itemData);
	};

	useEffect(() => {
		setIsLoading(true);
		theBounce(() => {
			if (
				!animeList ||
				animeList.length === 0 ||
				!animeData ||
				animeData.length === 0
			) {
				getAnimeList()
					.then((response) => {
						if (typeof response === "object") {
							addAnimeOnList(response);
						} else {
							toast({
								description: response,
								position: "top-right",
								status: ToastStatus.ERROR,
							});
						}
					})
					.catch((error) => console.log(error))
					.finally(() => setIsLoading(false));
			} else {
				const CURRENT_DATE = new Date();
				const INTERVAL_BETWEEN_DATES =
					calculateIntervalBetweenDates(CURRENT_DATE);
				if (INTERVAL_BETWEEN_DATES && INTERVAL_BETWEEN_DATES.DAYS >= 1) {
					getAnimeList()
						.then((response) => {
							if (typeof response === "object") {
								addAnimeOnList(response);
							} else {
								toast({
									description: response,
									position: "top-right",
									status: ToastStatus.ERROR,
								});
							}
						})
						.catch((error) => console.log(error))
						.finally(() => setIsLoading(false));
				} else {
					setIsLoading(false);
					updateAnimeCard(animeList);
					addDataOnAnimeData(animeList);
				}
			}
		});
	}, []);

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
				duration: 3000,
				position: "bottom-left",
				isClosable: true,
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

	return (
		<>
			{isLoading ? (
				<Box
					display={"flex"}
					h={"100vh"}
					w={"100vw"}
					m={["-20", "-96px"]}
					overflow={"hidden"}
					alignItems={"center"}
					justifyContent={"center"}
					position={"absolute"}
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
									<AnimeRow key={key} title={item.title} items={item.data} />
								))}
						</Box>
					</Box>
				</>
			) : (
				<EmptyMessage message="Tivemos um pequeno erro interno, por favor recarrege a página!" />
			)}

			<AnimatedModal isOpen={isOpen} onClose={onClose} />
		</>
	);
};
