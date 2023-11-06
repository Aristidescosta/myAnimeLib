import React from "react";
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
} from "@chakra-ui/react";
import { APP_COLOR } from "../../utils/constants";

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
	const STUDIOS = item.studios.map((studio) => studio.name);
	const PRODUCERS = item.producers.map((producer) => producer.name);

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
				<DrawerCloseButton />
				{/* <DrawerHeader bgColor={APP_COLOR}>{item.title}</DrawerHeader> */}

				<DrawerBody bgColor={APP_COLOR} p={0}>
					<Box
						w={"full"}
						h={"full"}
						display={"flex"}
						overflow={"hidden"}
						textOverflow={"ellipsis"}
					>
						<Image
							src={item.images.webp.large_image_url}
							bgRepeat={"no-repeat"}
							bgSize={"cover"}
							borderTopRightRadius={15}
							borderBottomRightRadius={15}
							zIndex={99999}
							boxShadow="dark-lg"
						/>
						<Box
							width={"50%"}
							h={"full"}
							display={"flex"}
							justifyContent={"center"}
							alignItems={"center"}
						>
							<Box
								/* bg={"#FFF"} */
								/* p={5} */
								color={APP_COLOR}
								mr={5}
								borderTopRightRadius={8}
								borderBottomRightRadius={8}
								/* width={"50%"} */
								/* ml={"-10%"} */
								boxShadow="2xl"
								p="6"
								bg="white"
								maxH={"50%"}
								textOverflow={"ellipsis"}
								/* overflow={"scroll"} */
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
								<Text fontSize={"small"}>Tipo: {item.type}</Text>
								<Text fontSize={"small"}>Epsódeos: {item.episodes}</Text>
								<Text fontSize={"small"}>
									Status: {item.airing ? "Atualmente no ar" : "Finalizado"}
								</Text>
								<Text fontSize={"small"}>Exibido: {item.aired.string}</Text>
								<Text fontSize={"small"}>
									Produtores: {PRODUCERS.join(", ")}
								</Text>
								<Text fontSize={"small"}>Studios: {STUDIOS.join(", ")}</Text>
								<Text fontSize={"small"}>Fonte: {item.source}</Text>

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
