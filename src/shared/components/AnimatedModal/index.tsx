import {
	Modal,
	ModalOverlay,
	ModalContent,
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
import { useNavigate } from "react-router-dom";
import { useAnimated } from "../../states/useAnimatedModal";

interface IAnimatedModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const AnimatedModal: React.FC<IAnimatedModalProps> = ({
	isOpen,
	onClose,
}) => {
	const navigate = useNavigate()
	const { onClose: onCloseModal } = useAnimated()

	const handleClickButtonLogin = () =>{
		navigate("/myAnimeLib/entrar")
		onCloseModal()
	}

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
							<Button variant="ghost" colorScheme="messenger" onClick={handleClickButtonLogin}>
								Fazer login
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</Center>
		</>
	);
};
