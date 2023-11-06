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

	const isSm = useMediaQuery(`(max-width: ${breakpoints.sm})`);
	/* const { getState } = useItemState(items[0])
	const { item } = getState() */
	const [itemPosition, setItemPosition] = useState<number>(0);
	const [item, setItem] = useState<AnimeData>(items[itemPosition]);

	const genres = [];
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

	const handleClickRightButton = () => {
		setItemPosition(
			items.findIndex((itemFinded) => itemFinded.title === item.title)
		);
		if (itemPosition < 3) {
			setItem(items[itemPosition + 1]);
			setItemPosition(itemPosition + 1);
		}
	};
	const handleClickLeftButton = () => {
		setItemPosition(
			items.findIndex((itemFinded) => itemFinded.title === item.title)
		);
		if (itemPosition > 0) {
			setItem(items[itemPosition - 1]);
			setItemPosition(itemPosition - 1);
		}
	};

	const handleOpenTrailler = () => {
		onOpen();
	};

	return (
		<>
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
							background: "linear-gradient(to top, #111 10%, transparent 90%)",
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
							<Box fontSize={isSm[0] ? 14 : 18} fontWeight={"bold"} mt={15}>
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
									onClick={handleClickLeftButton}
									color={"#999"}
									bg={"none"}
								/>
								<Flex fontSize={isSm[0] ? 18 : 40}>
									<Text>0{itemPosition + 1}</Text>
									<Text alignSelf={"flex-end"} mt={-25} fontSize={isSm[0] ? 9 : 20}>
										/04
									</Text>
								</Flex>
								<IconButton
									aria-label="Previous anime"
									/* fontSize="40px" */
									fontSize={isSm[0] ? 18 : 40}
									icon={<ArrowForwardIcon />}
									onClick={handleClickRightButton}
									color={"#FFF"}
									bg={"none"}
								/>
							</Flex>
						</Flex>
					</Box>
				</Box>
			</Box>

			<Modal onClose={onClose} isOpen={isOpen} size={'3xl'}>
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
