import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	Button,
	Text,
	Center,
} from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";
import { APP_COLOR } from "../../utils/constants";
import "./animatedStyle.css";

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
			<Center>
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />

					<ModalContent color={APP_COLOR} p={4}>
						<ModalBody mt={2}>
							<Center flexDir={"column"}>
								<motion.div
									className="x-container"
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{
										type: "spring",
										stiffness: 260,
										damping: 20,
									}}
								>
									<motion.div className="x-line" />
									<motion.div className="x-line" />
								</motion.div>
								<Text>Oops...</Text>
								<Text>Você precisa estar logado para marca essa opção!</Text>
							</Center>
						</ModalBody>
						<ModalFooter>
							<Button colorScheme="blackAlpha" mr={3} onClick={onClose}>
								Fechar
							</Button>
							<Button variant="ghost" colorScheme="messenger">
								Fazer login
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</Center>
		</>
	);
};
