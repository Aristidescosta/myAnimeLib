import React, { useEffect, useState } from "react";
import { AnimeData } from "../../types/AnimeData";
import {
  Box,
  Button,
  Center,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Tag,
  Text,
  useMediaQuery,
  useTheme,
} from "@chakra-ui/react";

import { useWindowMeasure } from "../../states/useWindowMeasure";
import { WindowSize } from "../Featured/FeaturedScreen";
import { APP_COLOR } from "../../utils/constants";
import { useDataAnime } from "../../states/useAnimeRequest";

interface IModalAnimeProps {
  item: AnimeData;
  isOpen: boolean;
  onClose: () => void;
}

export const ModalAnime: React.FC<IModalAnimeProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  const theme = useTheme();

  const breakpoints = {
    sm: theme.breakpoints["sm"],
  };

  const { setItemAnime } = useDataAnime();

  const isSm = useMediaQuery(`(max-width: ${breakpoints.sm})`);

  const STUDIOS = item.studios.map((studio) => studio.name);
  const PRODUCERS = item.producers.map((producer) => producer.name);

  const { md } = useWindowMeasure();
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

  const handleButtonClose = () => {
    setItemAnime(null);
    onClose();
  };

  console.log(windowSize.width <= md);

  return (
    <Drawer
      isOpen={isOpen}
      /* placement="right" */
      onClose={onClose}
      size={windowSize.width <= md ? "full" : "xl"}
      /* finalFocusRef={btnRef} */
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton bgColor={APP_COLOR} />

        <DrawerBody bgColor={"blue.900"} p={0}>
          <Box
            display={"flex"}
            h={"full"}
            w={"full"}
            flexDir={isSm[0] ? "column" : "row"}
          >
            <Box
              bgImage={item.images.webp.large_image_url}
              bgRepeat={"no-repeat"}
              bgSize={"cover"}
              bgPos={"center"}
              borderTopRightRadius={windowSize.width >= md ? 15 : 0}
              borderBottomRightRadius={windowSize.width >= md ? 15 : 0}
              zIndex={99999}
              boxShadow="dark-lg"
              objectFit={"cover"}
              w={"full"}
              h={"full"}
            />
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box
                color={APP_COLOR}
                borderTopRightRadius={windowSize.width >= md ? 8 : 0}
                borderBottomRightRadius={windowSize.width >= md ? 8 : 0}
                boxShadow="2xl"
                p="6"
                bg="white"
                w={"full"}
              >
                <Text as={"h1"} fontWeight={"bold"}>
                  {item.title}
                </Text>
                <Box
                  display={"flex"}
                  borderColor={APP_COLOR}
                  borderWidth={1}
                  p={2}
                  gap={3}
                >
                  <Box fontSize={windowSize.width <= md ? 12 : 18}>
                    <Tag bgColor={APP_COLOR} color={"#FFF"}>
                      Score
                    </Tag>

                    <Text fontWeight={"bold"}>{item.score}</Text>
                  </Box>
                  <Center height="50px">
                    <Divider orientation="vertical" />
                  </Center>
                  <Text fontWeight={"bold"}>Classificado #{item.rank}</Text>
                  <Text fontWeight={"bold"}>
                    Popuparidade #{item.popularity}
                  </Text>
                </Box>
                <Text as={"h4"} fontWeight={"bold"}>
                  {/* {item.demographics[0]} */}
                </Text>
                {/* 								<Text>{item.synopsis}</Text> */}
                <Text as={"h5"} fontWeight={"bold"}>
                  Informações
                </Text>
                <Text fontSize={"small"}>
                  {" "}
                  <strong>Tipo</strong>: {item.type}
                </Text>
                <Text fontSize={"small"}>
                  {" "}
                  <strong>Epsódeos</strong>: {item.episodes}
                </Text>
                <Text fontSize={"small"}>
                  <strong>Status</strong>:{" "}
                  {item.airing ? "Atualmente no ar" : "Finalizado"}
                </Text>
                <Text fontSize={"small"}>
                  {" "}
                  <strong>Exibido</strong>: {item.aired.string}
                </Text>
                <Text fontSize={"small"}>
                  <strong>Produtores</strong>: {PRODUCERS.join(", ")}
                </Text>
                <Text fontSize={"small"}>
                  {" "}
                  <strong>Studios</strong>: {STUDIOS.join(", ")}
                </Text>
                <Text fontSize={"small"}>
                  {" "}
                  <strong>Fonte</strong>: {item.source}
                </Text>

                <Button colorScheme="blue" mt={15}>
                  Ver mais
                </Button>
              </Box>
            </Box>
          </Box>
        </DrawerBody>

        {windowSize.width <= md && (
          <DrawerFooter>
            <Button bg={APP_COLOR} color={"#FFF"} onClick={handleButtonClose}>
              Fechar
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};
