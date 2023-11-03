import { Box, Flex, Highlight, IconButton, Text } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { BsFillPlayFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import React from "react";
import { APP_VARIANT_COLOR } from "../../utils/constants";

export const Featured: React.FC = () => {
	return (
		<Box
			as="section"
			bgPos={"center"}
			bgSize={"cover"}
			bgImg={"/demon.png"}
			h={"80vh"}
			alignSelf={"flex-start"}
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
							background: "linear-gradient(to top, #111 10%, transparent 90%)",
						}}
					>
						<Text fontSize={60} fontWeight={"bold"}>
							Jujutsu Kaisen 2
						</Text>
						<Box fontSize={18} fontWeight={"bold"} mt={15}>
							<Text display={"inline-block"} mr={15} color={APP_VARIANT_COLOR}>
								TV SERIE
							</Text>
							<Text display={"inline-block"} mr={15}>
								2023
							</Text>
							<Highlight
								query={["acção", "aventura"]}
								styles={{ px: "1", py: "1", bg: "#999" }}
							>
								Acção Aventura
							</Highlight>
						</Box>
						<Flex gap={4} alignItems={"center"}>
							<IconButton
								isRound={true}
								variant="solid"
								colorScheme="teal"
								aria-label="Done"
								fontSize="20px"
								icon={<BsFillPlayFill />}
								as={Link}
								to={"/myList"}
							/>
							<Text fontSize={20} color={"#FFFFFF"} maxW={"40%"} mt={15}>
								Kimetsu no Yaiba, também conhecido pelo título em língua inglesa
								Demon Slayer é uma série japonesa de mangá shōnen escrita e
								ilustrada por Koyoharu Gotōge.
							</Text>
						</Flex>

						<Flex
							alignItems={"center"}
							color={"#999"}
							alignSelf={"flex-end"}
							fontSize={60}
						>
							<IconButton
								aria-label="Previous anime"
								fontSize="40px"
								icon={<ArrowBackIcon />}
								as={Link}
								to={"/myList"}
								color={"#999"}
								bg={"none"}
							/>
							<Flex>
								<Text>01</Text>
								<Text alignSelf={"flex-end"} mt={-25} fontSize={20}>
									/04
								</Text>
							</Flex>
							<IconButton
								aria-label="Previous anime"
								fontSize="40px"
								icon={<ArrowForwardIcon />}
								as={Link}
								to={"/myList"}
								color={"#FFF"}
								bg={"none"}
							/>
						</Flex>
					</Flex>
				</Box>
			</Box>
		</Box>
	);
};
