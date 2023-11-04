/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, CircularProgress } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import { AnimeRow, EmptyMessage, Featured } from "../../shared/components";
import { RequestContext } from "../../shared/contexts/Index";
import jikanDB from "../../jikanDB";
import { APP_VARIANT_COLOR } from "../../shared/utils/constants";
import { AnimeData } from "../../shared/types/AnimeData";

export const Home: React.FC = () => {
	const [dataRequest, setDataRequest] = useState(
		"https://api.jikan.moe/v4/seasons/now"
	);
	const [type, setType] = useState("anime");
	const [request, setRequest] = useState<AnimeData[]>([]);
	const REQUEST: AnimeData[] = [];
	const [animeList, setAnimeList] = useState<
		{
			slug: string;
			title: string;
			items: any;
		}[]
	>([]);
	const [isLoading, setIsLoading] = useState(true);

	const getTopRatedMovie = async (url: string) => {
		const res = await fetch(url);
		const data = await res.json();
		//Pegando o featured

		while (REQUEST.length < 4) {
			const RANDOM_CHOISE = Math.floor(Math.random() * (data.data.length - 1));
			const choice = data.data[RANDOM_CHOISE];
			if (!REQUEST.includes(choice)) {
				REQUEST.push(choice);
			}
		}
		setRequest(REQUEST);
	};

	useEffect(() => {
		setIsLoading(true);
		jikanDB
			.getAnimeList()
			.then((response) => {
				setAnimeList(response);
				setIsLoading(false);
			})
			.catch(() => {
				setIsLoading(false);
			});
		setDataRequest("https://api.jikan.moe/v4/seasons/now");
	}, []);

	useEffect(() => {
		// setRequest("https://api.jikan.moe/v4/seasons/now")
		getTopRatedMovie(dataRequest);
	}, [dataRequest]);
	return (
		<RequestContext.Provider
			value={{ dataRequest, setDataRequest, type, setType }}
		>
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
					<Featured items={request} type={type} />
					<Box>
						<Box as="section">
							{animeList &&
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
		</RequestContext.Provider>
	);
};
