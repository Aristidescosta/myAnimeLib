import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import "swiper/css";

import { AnimeData } from "../../types/AnimeData";
import { AnimeCard } from "..";
import { Swiper, SwiperSlide } from "swiper/react";

interface IAnimeRowProps {
	title: string;
	items: AnimeData[];
}

export const AnimeRow: React.FC<IAnimeRowProps> = ({ title, items }) => {
	return (
		<Box mb={30}>
			<Heading as={"h2"} mb={8}>{title}</Heading>
			<Swiper spaceBetween={50} slidesPerView={6}>
				{items.map((item, key) => (
					<SwiperSlide key={key}>
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
