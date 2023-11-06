import { Flex, IconButton, Image, Stack, Tag, Text } from "@chakra-ui/react";
import { AiFillHeart, AiOutlinePlus } from "react-icons/ai";
import React from "react";
import { AnimeData } from "../../types/AnimeData";

interface IAnimeCardProps {
	item: AnimeData;
	handleClick: (newItem: AnimeData) => void
}

export const AnimeCard: React.FC<IAnimeCardProps> = ({ item, handleClick }) => {
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
			onClick={() => handleClick(item)}
			mr={2}
		>
			<Flex>
				<Image src={item.images.webp.large_image_url} objectFit={"cover"} bgSize={"cover"} />
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
						<Tag h={"0.5"}>{item.year}</Tag>
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
					{item.title}
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
