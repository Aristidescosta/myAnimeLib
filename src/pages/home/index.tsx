/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, CircularProgress } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import { AnimeRow, EmptyMessage, Featured } from "../../shared/components";
import { APP_VARIANT_COLOR } from "../../shared/utils/constants";
import jikanDB from "../../jikanDB";
import { useDataAnime } from "../../shared/states/useAnimeRequest";
import { useToastMessage } from "../../shared/chakra-ui-api/toast";

export default function Home(): JSX.Element {
	const {
		setRequest,
		request,
		animeData,
		type,
		setAnimeData,
		animeList,
		setAnimeList,
		calculateIntervalBetweenDates,
	} = useDataAnime();
	const [isLoading, setIsLoading] = useState(true);
	/* const { setIsOnline, isOnline } = useVerifyInternet(); */

	const { toastMessage, ToastStatus } = useToastMessage();

	useEffect(() => {
		function verificarConexaoInternet(): Promise<boolean> {
			console.log("estou verificando");
			return new Promise((resolve) => {
				const img = new Image();
				img.src = "https://www.google.com/";
				img.onload = () => resolve(true);
				img.onerror = () => resolve(false);
			});
		}
		const verifyIfIsOnline = async () => {
			try {
				const isOnline = await verificarConexaoInternet();
				console.log("isOnline:", isOnline);
				if (!isOnline) {
					console.log("Sem conexão com a internet");
					toastMessage({
						statusToast: ToastStatus.WARNING,
						title: "Falha da rede",
						description: "Sem acesso à internet, esses dados estão em cache",
						isClosable: false,
						position: "top-right",
					});
				}
			} catch (error) {
				console.error("Erro ao verificar a conexão com a internet:", error);
			}
		};

		verifyIfIsOnline();
	}, []);

	const getAnimeList = () => {
		console.log("Vou ser executado");
		jikanDB
			.getAnimeList()
			.then((response) => {
				let animeDataCount = 0;
				while (animeDataCount < 4) {
					const RANDOM_CHOISE_SLUGS = Math.floor(
						Math.random() * response.length
					);

					const RANDOM_CHOISE = Math.floor(
						Math.random() * response[RANDOM_CHOISE_SLUGS].items.length
					);

					const choice =
						response[RANDOM_CHOISE_SLUGS].items.data[RANDOM_CHOISE];
					if (animeData.includes(choice)) {
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
		if (animeList.length < 0) {
			console.log("teste");
			getAnimeList();
		} else {
			const CURRENT_DATE = new Date();
			const INTERVAL_BETWEEN_DATES =
				calculateIntervalBetweenDates(CURRENT_DATE);
			if (INTERVAL_BETWEEN_DATES && INTERVAL_BETWEEN_DATES.DAYS >= 1) {
				getAnimeList();
				setRequest("https://api.jikan.moe/v4/seasons/now");
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
			) : request ? (
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
}
