import React, { useEffect, useState } from "react";
import { Box, Heading, useDisclosure } from "@chakra-ui/react";
import "swiper/css";

import { AnimeData } from "../../types/AnimeData";
import { AnimeCard, ModalAnime } from "..";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCards,
} from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "./style.css";
import { useWindowMeasure } from "../../states/useWindowMeasure";
import { WindowSize } from "../Featured/FeaturedScreen";

interface IAnimeRowProps {
  title: string;
  items: AnimeData[];
}

export const AnimeRow: React.FC<IAnimeRowProps> = ({ title, items }) => {
  const [animeItem, setAnimeItem] = useState<AnimeData | null>(null);
  const handleClickAnimeCard = (item: AnimeData) => {
    setAnimeItem(item);
    onOpen();
  };

  const { lg, ls, md, sm, xs } = useWindowMeasure();
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

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
  }, [setWindowSize]);

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Box mb={30} ml={6}>
        <Heading as={"h2"} mb={8}>
          {title}
        </Heading>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, EffectCards]}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          effect="card"
          spaceBetween={50}
          slidesPerView={
            windowSize.width <= xs
              ? 1.2
              : windowSize.width <= sm
              ? 1.5
              : windowSize.width <= md
              ? 1.8
              : windowSize.width <= lg
              ? 3.5
              : windowSize.width <= ls
              ? 4.5
              : 6
          }
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
