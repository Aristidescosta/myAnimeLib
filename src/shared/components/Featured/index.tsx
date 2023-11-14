/* eslint-disable @typescript-eslint/no-unused-vars */
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useState } from "react";
import {
	AspectRatio,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
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

import { APP_COLOR } from "../../utils/constants";
import { AnimeData } from "../../types/AnimeData";
import { FeaturedScreen } from "./FeaturedScreen";
import { useDataAnime } from "../../states/useAnimeRequest";

interface IFeaturedProps {
	items: AnimeData[];
}

export const Featured: React.FC<IFeaturedProps> = ({ items }) => {
	const { onClose, isOpen, onOpen } = useDisclosure();
	const { itemAnime, setItemAnime } = useDataAnime();
	const [autoplay, setAutoplay] = useState(true)

	const onCloseTrailer = () =>{
		onClose()
		setItemAnime(null)
		setAutoplay(true)
	}

	const onOpenTrailer = () =>{
		onOpen()
	}

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
				grabCursor
			>
				{items.map((item, key) => (
					<SwiperSlide key={key} style={{ overflow: "visible" }}>
						<FeaturedScreen item={item} setAutoplay={setAutoplay} onOpenTrailer={onOpenTrailer} currentAnime={key}/>
					</SwiperSlide>
				))}
			</Swiper>

			{itemAnime && (
				<Modal onClose={onCloseTrailer} isOpen={isOpen} size={"3xl"}>
					<ModalOverlay
						bg="none"
						backdropFilter="auto"
						backdropInvert="20%"
						backdropBlur="2px"
					/>
					<ModalContent>
						<ModalHeader color={APP_COLOR}>{itemAnime.title}</ModalHeader>
						<ModalCloseButton color={APP_COLOR} />
						<ModalBody bgColor={APP_COLOR} w={"full"} p={0}>
							<AspectRatio w={"full"} h={"full"} ratio={1}>
								<iframe
									title={itemAnime.title}
									src={itemAnime.trailer.embed_url}
									allowFullScreen
								/>
							</AspectRatio>
						</ModalBody>
					</ModalContent>
				</Modal>
			)}
		</>
	);
};
