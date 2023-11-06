import React, { useState } from "react";
import {
	Box,
	Heading,
	useDisclosure,
	useMediaQuery,
	useTheme,
} from "@chakra-ui/react";
import "swiper/css";

import { AnimeData } from "../../types/AnimeData";
import { AnimeCard, ModalAnime } from "..";
import { Swiper, SwiperSlide } from "swiper/react";

interface IAnimeRowProps {
	title: string;
	items: AnimeData[];
}

export const AnimeRow: React.FC<IAnimeRowProps> = ({ title, items }) => {
	const theme = useTheme();

	const breakpoints = {
		sm: theme.breakpoints["sm"],
	};

	const isSm = useMediaQuery(`(max-width: ${breakpoints.sm})`);

	const [animeItem, setAnimeItem] = useState<AnimeData | null>(null);
	const handleClickAnimeCard = (item: AnimeData) => {
		setAnimeItem(item);
		onOpen()
	};

	const { isOpen, onClose, onOpen } = useDisclosure();

	return (
		<>
			<Box mb={30} ml={6}>
				<Heading as={"h2"} mb={8}>
					{title}
				</Heading>
				<Swiper spaceBetween={50} slidesPerView={isSm[0] ? 1.5 : 6}>
					{items.map((item, key) => (
						<SwiperSlide key={key} style={{ overflow: "visible" }}>
							<AnimeCard item={item} handleClick={handleClickAnimeCard} />
						</SwiperSlide>
					))}
				</Swiper>
			</Box>
			{animeItem && (
				<ModalAnime item={animeItem} isOpen={isOpen} onClose={onClose} />
			)}
		</>
	);
};
