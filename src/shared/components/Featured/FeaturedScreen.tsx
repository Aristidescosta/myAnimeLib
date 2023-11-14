import React, { useState, useEffect } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import {
	Box,
	Flex,
	Highlight,
	IconButton,
	Text,
	Tooltip,
} from "@chakra-ui/react";

import { useWindowMeasure } from "../../states/useWindowMeasure";
import { useDataAnime } from "../../states/useAnimeRequest";
import { APP_VARIANT_COLOR } from "../../utils/constants";
import { AnimeData } from "../../types/AnimeData";

interface IFeaturedScreenProps {
	item: AnimeData;
	setAutoplay: (isAutoplay: boolean) => void;
	onOpenTrailer: () => void;
	currentAnime: number;
}

export const FeaturedScreen: React.FC<IFeaturedScreenProps> = ({
	onOpenTrailer,
	setAutoplay,
	currentAnime,
	item,
}) => {
	const { setItemAnime, animeData } = useDataAnime();

	const { windowSize, setWindowSize, lg, ls, md, sm, xs } = useWindowMeasure();

	useEffect(() => {
		const handleResize = () => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
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
						<Text
							fontSize={
								windowSize.width <= xs
									? 24
									: windowSize.width <= sm
									? 28
									: windowSize.width <= md
									? 32
									: windowSize.width <= lg
									? 36
									: windowSize.width <= ls
									? 40
									: 48
							}
							fontWeight={"bold"}
						>
							{item.title}
						</Text>
						<Box
							fontSize={
								windowSize.width <= xs
									? 14
									: windowSize.width <= sm
									? 20
									: windowSize.width <= md
									? 26
									: windowSize.width <= lg
									? 42
									: windowSize.width <= ls
									? 48
									: 54
							}
							fontWeight={"bold"}
							mt={15}
						>
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
								fontSize={
									windowSize.width <= xs
										? 11
										: windowSize.width <= sm
										? 18
										: windowSize.width <= md
										? 24
										: windowSize.width <= lg
										? 30
										: windowSize.width <= ls
										? 36
										: 42
								}
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
							right={
								windowSize.width <= xs
									? 1.5
									: windowSize.width <= sm
									? 2
									: windowSize.width <= md
									? 3
									: windowSize.width <= lg
									? 4
									: windowSize.width <= ls
									? 5
									: 6
							}
						>
							<Flex
								fontSize={
									windowSize.width <= xs
										? 11
										: windowSize.width <= sm
										? 18
										: windowSize.width <= md
										? 24
										: windowSize.width <= lg
										? 30
										: windowSize.width <= ls
										? 36
										: 42
								}
							>
								<Text>0{currentAnime + 1}</Text>
								<Text
									alignSelf={"flex-end"}
									mt={-25}
									fontSize={
										windowSize.width <= xs
											? 11
											: windowSize.width <= sm
											? 18
											: windowSize.width <= md
											? 24
											: windowSize.width <= lg
											? 30
											: windowSize.width <= ls
											? 36
											: 42
									}
								>
									/0{animeData.length}
								</Text>
							</Flex>
						</Flex>
					</Flex>
				</Box>
			</Box>
		</Box>
	);
};
