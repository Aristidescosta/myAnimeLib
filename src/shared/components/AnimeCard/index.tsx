import { Flex, IconButton, Image, Stack, Tag, Text } from "@chakra-ui/react";
import { AiFillHeart, AiOutlinePlus } from "react-icons/ai";
import React from "react";

interface IAnimeCardProps {
	image: string;
	title: string;
	year: number;
}

export const AnimeCard: React.FC<IAnimeCardProps> = ({
	image,
	title,
	year,
}) => {
	return (
		<Flex
			pos={"relative"}
			h="400px"
			w="200px"
			flexDir={"column"}
			gap={5}
			transition="transform 0.3s"
			_hover={{
				transform: "scale(1.1)",
			}}
			cursor={"pointer"}
			overflow="visible"
			mr={2}
		>
			<Flex>
				<Image src={image} objectFit={"cover"} bgSize={"cover"} />
				<Flex
					p={2}
					flexDir={"column"}
					justifyContent={"space-between"}
					w={"full"}
					h={"full"}
					pos={"absolute"}
					top={0}
					zIndex={9999}
					overflow="visible" // Defina o overflow para "visible"
				>
					<Flex justifyContent={"space-between"}>
						<Tag h={"0.5"}>{year}</Tag>
						<Stack>
							<IconButton
								aria-label="Adicionar aos favoritos"
								icon={<AiFillHeart />}
								colorScheme="gray"
							/>

							<IconButton
								aria-label="Adicionar a lista"
								icon={<AiOutlinePlus />}
								colorScheme="gray"
							/>
						</Stack>
					</Flex>
				</Flex>
			</Flex>

			<Flex flexDir={"column"} w={"full"} fontWeight={"bold"}>
				<Text textOverflow={"ellipsis"} w={"full"}>
					{title}
				</Text>
				<Stack direction={["column", "row"]} spacing="8px">
					<Tag colorScheme="gray" w={"min"}>
						SIMULCAST
					</Tag>
					<Text>SUB</Text>
					<Text>DOB</Text>
				</Stack>
			</Flex>
		</Flex>
	);
};
