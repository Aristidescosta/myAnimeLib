import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import React, { useState, useEffect } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import {
  AspectRatio,
  Box,
  Flex,
  Highlight,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
  useMediaQuery,
  useTheme,
} from "@chakra-ui/react";
import { useSwiper, useSwiperSlide, Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Scrollbar,
  A11y,
  EffectCube,
} from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-cube";

import { APP_COLOR, APP_VARIANT_COLOR } from "../../utils/constants";
import { AnimeData } from "../../types/AnimeData";

interface IFeaturedProps {
  items: AnimeData[];
  type: string;
}

export const Featured: React.FC<IFeaturedProps> = ({ items, type }) => {
  const theme = useTheme();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const breakpoints = {
    sm: theme.breakpoints["sm"],
  };
  const swiperSlide = useSwiperSlide();
  const swiper = useSwiper();

  const isSm = useMediaQuery(`(max-width: ${breakpoints.sm})`);
  /* const { getState } = useItemState(items[0])
	const { item } = getState() */
  const [itemPosition, setItemPosition] = useState<number>(0);
  const [item, setItem] = useState<AnimeData>(items[itemPosition]);

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
    onOpen();
  };

  const handleClickLeftArrow = () => {
	console.log(swiper)
	/* swiper.allowSlideNext */
	swiperSlide.isNext
  }

  return (
    <>
      <Swiper
        spaceBetween={50}
        modules={[Navigation,  Scrollbar, A11y, EffectCube]}
        navigation
        effect="cube"
        slidesPerView={isSm[0] ? 1.5 : 6}
      >
        {items.map((item, key) => (
          <SwiperSlide key={key} style={{ overflow: "visible" }}>
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
                    background:
                      "linear-gradient(to top, #111 10%, transparent 90%)",
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
                      background:
                        "linear-gradient(to top, #111 10%, transparent 90%)",
                    }}
                  >
                    <Text fontSize={isSm[0] ? 24 : 60} fontWeight={"bold"}>
                      {item.title}
                    </Text>
                    <Box
                      fontSize={isSm[0] ? 14 : 18}
                      fontWeight={"bold"}
                      mt={15}
                    >
                      <Text
                        display={"inline-block"}
                        mr={15}
                        color={APP_VARIANT_COLOR}
                      >
                        {type.toUpperCase()}
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
                        fontSize={isSm[0] ? 9 : 20}
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
                      <IconButton
                        aria-label="Previous anime"
                        fontSize={isSm[0] ? 18 : 40}
                        icon={<ArrowBackIcon />}
                        onClick={handleClickLeftArrow}
                        color={"#999"}
                        bg={"none"}
                      />
                      <Flex fontSize={isSm[0] ? 18 : 40}>
                        <Text>0{itemPosition + 1}</Text>
                        <Text
                          alignSelf={"flex-end"}
                          mt={-25}
                          fontSize={isSm[0] ? 9 : 20}
                        >
                          /04
                        </Text>
                      </Flex>
                      <IconButton
                        aria-label="Previous anime"
                        /* fontSize="40px" */
                        fontSize={isSm[0] ? 18 : 40}
                        icon={<ArrowForwardIcon />}
                        onClick={() => swiper.slideNext()}
                        color={"#FFF"}
                        bg={"none"}
                      />
                    </Flex>
                  </Flex>
                </Box>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      <Modal onClose={onClose} isOpen={isOpen} size={"3xl"}>
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="20%"
          backdropBlur="2px"
        />
        <ModalContent>
          <ModalHeader color={APP_COLOR}>{item.title}</ModalHeader>
          <ModalCloseButton color={APP_COLOR} />
          <ModalBody bgColor={APP_COLOR} w={"full"} p={0}>
            <AspectRatio w={"full"} h={"full"} ratio={1}>
              <iframe
                title={item.title}
                src={item.trailer.embed_url}
                allowFullScreen
              />
            </AspectRatio>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
