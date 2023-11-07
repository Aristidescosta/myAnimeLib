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
import { Navigation, Pagination, Scrollbar, A11y, EffectCards } from "swiper/modules";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';

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
    onOpen();
  };

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Box mb={30} ml={6}>
        <Heading as={"h2"} mb={8}>
          {title}
        </Heading>
        <Swiper
          spaceBetween={50}
          modules={[Navigation, Pagination, Scrollbar, A11y, EffectCards ]}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
		  effect="card"
          slidesPerView={isSm[0] ? 1.5 : 6}
			style={{ padding: 30 }}
		>
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
