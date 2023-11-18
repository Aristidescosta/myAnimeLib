/* eslint-disable @typescript-eslint/no-unused-vars */
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useState } from "react";
import {
	useDisclosure,
} from "@chakra-ui/react";

import {
	Navigation,
	Scrollbar,
	A11y,
	EffectFade,
	Autoplay,
} from "swiper/modules";

import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

import { useDataAnime } from "../../states/useAnimeRequest";
import { AnimeData } from "../../types/AnimeData";
import { FeaturedScreen } from "./FeaturedScreen";
import { AnimeTrailer } from "../AnimeTrailer";

interface IFeaturedProps {
	items: AnimeData[];
}

export const Featured: React.FC<IFeaturedProps> = ({ items }) => {
	const { onClose, isOpen, onOpen } = useDisclosure();
	const { itemAnime, setItemAnime } = useDataAnime();
	const [autoplay, setAutoplay] = useState(true);

	const onCloseTrailer = () => {
		onClose();
		setItemAnime(null);
		setAutoplay(true);
	};

	const onOpenTrailer = () => {
		onOpen();
	};

	return (
		<>
			<Swiper
				spaceBetween={50}
				modules={[Navigation, Scrollbar, A11y, EffectFade, Autoplay]}
				navigation
				effect="fade"
				slidesPerView={1}
				autoplay={autoplay}
				loop
			>
				{items.map((item, key) => (
					<SwiperSlide key={key}>
						<FeaturedScreen
							item={item}
							setAutoplay={setAutoplay}
							onOpenTrailer={onOpenTrailer}
							currentAnime={key}
						/>
					</SwiperSlide>
				))}
			</Swiper>

			{itemAnime && (
				<AnimeTrailer
					isOpen={isOpen}
					onCloseTrailer={onCloseTrailer}
					title={itemAnime.title}
					url={itemAnime.trailer.embed_url}
				/>
			)}
		</>
	);
};
