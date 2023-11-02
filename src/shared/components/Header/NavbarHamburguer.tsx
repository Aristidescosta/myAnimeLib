import {
	Button,
	List,
	ListItem,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import React from "react";

import { APP_COLOR } from "../../utils/constants";
import { TNavbarItem } from "../../types/NavbarItem";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from 'react-icons/ai'

interface INavbarHamburguerProps {
	items: TNavbarItem[];
}

export const NavbarHamburguer: React.FC<INavbarHamburguerProps> = ({
	items,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Button
				variant={'unstyled'}
				onClick={onOpen}
				_active={{
					opacity: .8
				}}
			>
				<AiOutlineMenu />
			</Button>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				size={"full"}
				motionPreset="slideInBottom"
			>
				<ModalOverlay />
				<ModalContent>
					<ModalBody>
						<ModalHeader p={0}>
							<ModalCloseButton size={"lg"} color={APP_COLOR} />
						</ModalHeader>
						<List pt={8} spacing={4}>
							{items.map((item) => (
								<ListItem
									key={item.menu}
									as={Link}
									to={item.link}
									display={"flex"}
									justifyContent={"space-between"}
									alignItems={"center"}
									borderBottomWidth={1}
									py={6}
								>
									<Text
										fontSize="3xl"
										fontWeight={"semibold"}
										color={"#333"}
										onClick={() => onClose()}
									>
										{item.menu}
									</Text>
								</ListItem>
							))}
						</List>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};
