import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	Button,
	Text,
} from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";

interface IAnimatedModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const AnimatedModal: React.FC<IAnimatedModalProps> = ({
	isOpen,
	onClose,
}) => {
	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<ModalHeader>Modal Animado</ModalHeader>
					<ModalBody>
						<motion.div
							initial={{ opacity: 0, translateY: 50 }}
							animate={{ opacity: 1, translateY: 0 }}
							exit={{ opacity: 0, translateY: 50 }}
							transition={{ duration: 0.3 }}
						>
							<Text bgColor={APP_COLOR}></Text>
						</motion.div>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onClose}>
							Fechar
						</Button>
						<Button variant="ghost">Ação Secundária</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
