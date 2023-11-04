import React from "react";
import { Box, Heading, useMediaQuery, useTheme } from "@chakra-ui/react";
import "swiper/css";

import { AnimeData } from "../../types/AnimeData";
import { AnimeCard } from "..";
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

	return (
		<Box mb={30} ml={6}>
			<Heading as={"h2"} mb={8}>
				{title}
			</Heading>
			<Swiper spaceBetween={50} slidesPerView={isSm[0] ? 1.5 : 6}>
				{items.map((item, key) => (
					<SwiperSlide key={key} style={{ overflow: "visible" }}>
						<AnimeCard
							image={item.images.jpg.image_url}
							title={item.title}
							year={item.year}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</Box>
	);
};
