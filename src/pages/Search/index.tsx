/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, CircularProgress, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { APP_VARIANT_COLOR } from "../../shared/utils/constants";
import { AnimeData } from "../../shared/types/AnimeData";
import { AnimeRow } from "../../shared/components";

export const Search: React.FC = () => {
	const [searchParams] = useSearchParams();
	const QUERY = searchParams.get("q");
	const [isLoading, setIsloading] = useState(false);

	const [searchAnimes, setSearchAnimes] = useState<AnimeData[] | null>();

	const getSearchAnimes = async (
		url: string,
		myFunction: (data: any) => void
	) => {
		setSearchAnimes(null);
		const res = await fetch(url);
		const data = await res.json();
		myFunction(data.data);
	};

	useEffect(() => {
		setIsloading(true);
		const searchAnimeWithQueryURL = `https://api.jikan.moe/v4/anime?q=${QUERY}&page=1`;
		getSearchAnimes(searchAnimeWithQueryURL, setSearchAnimes).then(() =>
			setIsloading(false)
		);
	}, [QUERY]);
	console.log(searchAnimes);

	return isLoading ? (
		<>
			<Text m={"8rem 0 4rem 3rem"} as={"h2"}>
				Carrgando resultados para: {QUERY}
			</Text>
			<CircularProgress
				size={"180px"}
				isIndeterminate
				color={APP_VARIANT_COLOR}
			/>
		</>
	) : (
		<Box>
			<Box as="section">
				{searchAnimes &&
					searchAnimes.map((item, key) => (
						<AnimeRow key={key} title={item.title} items={searchAnimes} />
					))}
			</Box>
		</Box>
	);
};
