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
  DrawerOverlay,
  Image,
  Tag,
  Text,
  useMediaQuery,
  useTheme,
} from "@chakra-ui/react";
import { APP_COLOR } from "../../utils/constants";
import { useWindowMeasure } from "../../states/useWindowMeasure";
import { WindowSize } from "../Featured/FeaturedScreen";

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

  const isSm = useMediaQuery(`(max-width: ${breakpoints.sm})`);

  const STUDIOS = item.studios.map((studio) => studio.name);
  const PRODUCERS = item.producers.map((producer) => producer.name);

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

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size={"xl"}
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
              flex={2}
              /* h={isSm[0] ? "30%" : "full"} */
			  h={windowSize.width >= md ? "full" : "30%"}
            >
              <Image
                src={item.images.webp.large_image_url}
                bgRepeat={"no-repeat"}
                bgSize={"cover"}
                borderTopRightRadius={windowSize.width <= xs ? 0 : 15}
                borderBottomRightRadius={windowSize.width <= xs ? 0 : 15}
                zIndex={99999}
                boxShadow="dark-lg"
                objectFit={"cover"}
                w={"full"}
                h={"full"}
              />
            </Box>
            <Box
              h={isSm[0] ? "70%" : "full"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flex={isSm[0] ? 2 : 1}
            >
              <Box
                color={APP_COLOR}
                mr={5}
                borderTopRightRadius={windowSize.width <= xs ? 0 : 8}
                borderBottomRightRadius={windowSize.width <= xs ? 0 : 8}
                boxShadow="2xl"
                p="6"
                bg="white"
              >
                <Text as={"h4"} fontWeight={"bold"}>
                  {item.title}
                </Text>
                <Box
                  display={"flex"}
                  borderColor={APP_COLOR}
                  borderWidth={1}
                  p={2}
                  gap={3}
                >
                  <Box>
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
      </DrawerContent>
    </Drawer>
  );
};
