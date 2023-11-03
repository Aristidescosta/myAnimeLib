import { Box, Flex, Highlight, IconButton, Text } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { BsFillPlayFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { APP_VARIANT_COLOR } from "../../utils/constants";
import { AnimeData } from "../../types/AnimeData";
import axios, { AxiosError } from "axios";

interface IFeaturedProps {
	item: AnimeData;
	type: string;
}

export const Featured: React.FC<IFeaturedProps> = ({ item, type }) => {
	const genres = [];
	for (let i in item.genres) {
		genres.push(item.genres[i].name);
	}
	let code;
	if (item.trailer.url)
		code = item.trailer.url.slice(item.trailer.url.lastIndexOf("=") + 1);
	const [description, setDescription] = useState("");
	const [translatedText, setTranslatedText] = useState("");

	useEffect(() => {
		if (item.synopsis.length > 300) {
			setDescription(item.synopsis.substring(0, 300) + "...");
			traslate(description);
			/* setDescription(translatedText); */
		} else {
			traslate(description);
			setDescription(item.synopsis);
		}
	}, [item.synopsis]);

	/* Função para traduzir */
	const traslate = async (text: string) => {
		const data1 = {
			q: text,
			source: "en",
			target: "pt",
		};
		await axios
			.post(
				`https://script.google.com/macros/s/AKfycbwYSW_qyWiYPOAQNduUavlhrp3WWZ1MDf202CAfVzn8WPPItlNIo9nwA-1Pr6nvDzuVCw/exec`
			)
			.then((response) => {
				console.log(response);
				setTranslatedText(response.data.translatedText);
			})
			.catch((error: AxiosError) => {
				console.log("erro: " + error.message);
			});
	};

	return (
		<Box
			as="section"
			bgPos={"center"}
			bgSize={"cover"}
			bgImg={item.images.jpg.large_image_url}
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
							{item.title}
						</Text>
						<Box fontSize={18} fontWeight={"bold"} mt={15}>
							<Text display={"inline-block"} mr={15} color={APP_VARIANT_COLOR}>
								{item.type}
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
								{description}
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
