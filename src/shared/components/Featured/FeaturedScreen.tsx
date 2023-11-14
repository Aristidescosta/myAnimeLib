import React, { useState, useEffect } from "react";
import {
	Box,
	Flex,
	Highlight,
	IconButton,
	Text,
	Tooltip,
	useMediaQuery,
	useTheme,
} from "@chakra-ui/react";

import { useDataAnime } from "../../states/useAnimeRequest";
import { APP_VARIANT_COLOR } from "../../utils/constants";
import { AnimeData } from "../../types/AnimeData";
import { BsFillPlayFill } from "react-icons/bs";

interface IFeaturedScreenProps {
	item: AnimeData;
	setAutoplay: (isAutoplay: boolean) => void;
	onOpenTrailer: () => void;
	currentAnime: number
}

export const FeaturedScreen: React.FC<IFeaturedScreenProps> = ({
	onOpenTrailer,
	setAutoplay,
	currentAnime,
	item,
}) => {
	const theme = useTheme();
	const { setItemAnime, animeData } = useDataAnime();

	const breakpoints = {
		sm: theme.breakpoints["sm"],
		md: theme.breakpoints["md"],
	};

	const isSm = useMediaQuery(`(max-width: ${breakpoints.sm})`);
	const isMd = useMediaQuery(`(max-width: ${breakpoints.md})`);

	const genres: string | string[] = [];
	if (item) {
		for (const i in item.genres) {
			genres.push(item.genres[i].name);
		}
	}
	const [description, setDescription] = useState("");

	useEffect(() => {
		if (item.synopsis.length > 300) {
			setDescription(item.synopsis.substring(0, 300) + "...");
		} else {
			setDescription(item.synopsis);
		}
	}, [item.synopsis]);

	const handleOpenTrailler = () => {
		setItemAnime(item);
		setAutoplay(false);
		onOpenTrailer();
	};
	return (
		<Box
			as="section"
			bgPos={"center"}
			bgSize={"cover"}
			bgImg={item.images.webp.large_image_url}
			h={"80vh"}
			alignSelf={"flex-start"}
			transition="transform 0.3s"
			pos={"relative"}
		>
			<Box
				bgGradient={"to top, #111 10%, transparent 90%"}
				w={"inherit"}
				h={"inherit"}
			>
				<Box
					style={{
						background: "linear-gradient(to top, #111 10%, transparent 90%)",
					}}
					w={"inherit"}
					h={"inherit"}
				>
					<Flex
						w={"inherit"}
						h={"inherit"}
						flexDir={"column"}
						pb={150}
						pl={30}
						pt={70}
						style={{
							background: "linear-gradient(to top, #111 10%, transparent 90%)",
						}}
					>
						<Text fontSize={isMd ? 34 : isSm[0] ? 24 : 60} fontWeight={"bold"}>
							{item.title}
						</Text>
						<Box fontSize={isSm[0] ? 14 : 18} fontWeight={"bold"} mt={15}>
							<Text display={"inline-block"} mr={15} color={APP_VARIANT_COLOR}>
								{item.type.toUpperCase()}
							</Text>
							<Text display={"inline-block"} mr={15}>
								{item.year}
							</Text>
							<Highlight
								query={genres}
								styles={{ px: "1", py: "1", bg: "#999" }}
							>
								{genres.join(" ")}
							</Highlight>
						</Box>
						<Flex gap={4} alignItems={"center"}>
							<Tooltip label="Assistir trailer">
								<IconButton
									isRound={true}
									variant="solid"
									colorScheme="teal"
									aria-label="Done"
									fontSize="20px"
									icon={<BsFillPlayFill />}
									onClick={handleOpenTrailler}
								/>
							</Tooltip>
							<Text
								fontSize={isMd ? 18 : isSm[0] ? 9 : 22}
								color={"#FFFFFF"}
								maxW={"40%"}
								mt={15}
							>
								{description}
							</Text>
						</Flex>

						<Flex
							alignItems={"center"}
							color={"#999"}
							alignSelf={"flex-end"}
							fontSize={60}
							pos={"absolute"}
							bottom={20}
							right={isSm[0] ? 18 : 20}
						>
							<Flex fontSize={isSm[0] ? 18 : 40}>
								<Text>0{currentAnime + 1}</Text>
								<Text
									alignSelf={"flex-end"}
									mt={-25}
									fontSize={isSm[0] ? 9 : 20}
								>
									/0{ animeData.length }
								</Text>
							</Flex>
						</Flex>
					</Flex>
				</Box>
			</Box>
		</Box>
	);
};
