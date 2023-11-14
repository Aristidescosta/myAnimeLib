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

export const Home: React.FC = () => {
	const {
		calculateIntervalBetweenDates,
		setAnimeData,
		setAnimeList,
		animeList,
		animeData,
		type,
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
				title: "Internet",
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

	const getAnimeList = () => {
		console.log("Fui convocado")
		jikanDB
			.getAnimeList()
			.then((response) => {
				let animeDataCount = 0;
				while (animeDataCount < 4) {
					const RANDOM_CHOISE_SLUGS = Math.floor(
						Math.random() * response.length
					);

					const RANDOM_CHOISE = Math.floor(
						Math.random() * response[RANDOM_CHOISE_SLUGS].items.data.length
					);

					const choice = response[RANDOM_CHOISE_SLUGS].items.data[RANDOM_CHOISE];
					if (!animeData.includes(choice)) {
						setAnimeData([...animeData, choice]);
						animeDataCount++;
					}
				}
				setAnimeList(response);
				setIsLoading(false);
			})
			.catch(() => {
				setIsLoading(false);
			});
	};
	useEffect(() => {
		setIsLoading(true);
		if (animeList.length === 0 || animeData.length === 0) {
			getAnimeList();
		} else {
			const CURRENT_DATE = new Date();
			const INTERVAL_BETWEEN_DATES =
				calculateIntervalBetweenDates(CURRENT_DATE);
			if (INTERVAL_BETWEEN_DATES && INTERVAL_BETWEEN_DATES.DAYS >= 1) {
				getAnimeList();
			} else {
				setIsLoading(false);
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
					<Featured items={animeData} type={type} />
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
