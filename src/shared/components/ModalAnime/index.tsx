import React from "react";
import { AnimeData } from "../../types/AnimeData";
import {
	Box,
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Image,
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
	console.log(item)
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
					<Box w={"full"} h={"full"} display={"flex"}>
						<Image
							src={item.images.webp.large_image_url}
							bgRepeat={"no-repeat"}
							bgSize={"cover"}
							borderTopRightRadius={15}
							borderBottomRightRadius={15}
						/>
						<Box
							width={"50%"}
							h={"full"}
							display={"flex"}
							justifyContent={"center"}
							alignItems={"center"}
						>
							<Box
								bg={"#FFF"}
								p={5}
								color={APP_COLOR}
								mr={5}
								borderTopRightRadius={8}
								borderBottomRightRadius={8}
							>
								<Text as={"h4"} fontWeight={"bold"}>
									{item.title}
								</Text>
								<Text as={"h4"} fontWeight={"bold"}>
									{item.demographics[0].name}
								</Text>
							</Box>
						</Box>
					</Box>
				</DrawerBody>

				{/* <DrawerFooter bgColor={APP_COLOR}>
					<Button variant="outline" mr={3} onClick={onClose}>
						Voltar
					</Button>
					<Button colorScheme="blue">Save</Button>
				</DrawerFooter> */}
			</DrawerContent>
		</Drawer>
	);
};
