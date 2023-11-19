import { Flex, IconButton, Image, Stack, Tag, Text } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { AiFillHeart, AiOutlinePlus } from "react-icons/ai";

import { setItemWithFavorite } from "../../repository/FavoriteRepository";
import { StorageEnum, getData } from "../../database/LocalStorageDAO";
import { useToastMessage } from "../../chakra-ui-api/toast";
import { useDataAnime } from "../../states/useAnimeRequest";
import { TFavoriteProps } from "../../types/FavoriteType";
import { AnimeData } from "../../types/AnimeData";
import { IAnimeListProps } from "../../../pages";

interface IAnimeCardProps {
	item: AnimeData;
	handleClick: (newItem: AnimeData) => void;
}

export interface IUserFavoriteProps{
	email: string;
	favorites: TFavoriteProps[]
	name: string
	username: string
	password: string
}

export const AnimeCard: React.FC<IAnimeCardProps> = ({ item, handleClick }) => {
	const [colorSchema, setColorSchema] = useState<"gray" | "red">("gray");
	const [isLoading, setIsLoading] = useState(false);
	const { animeList, setAnimeList } = useDataAnime();
	const { toastMessage, ToastStatus } = useToastMessage();
	const USER_DATA: IUserFavoriteProps = getData(StorageEnum.UserData)
	const USER_FAVORITE_DATA = USER_DATA?.favorites
	const FAVORITE_DATA: TFavoriteProps = {
		id: item.mal_id,
		title: item.title,
	};

	useEffect(() => {
		if (item.isFavorite) {
			setColorSchema("red");
		} else {
			setColorSchema("gray");
		}
	}, [item.isFavorite]);

	const updateStatusFavoriteItem = (status: boolean) => {
		item.isFavorite = status;

		const ANIME_DATA: IAnimeListProps[] = [];
		const FAVORITE = USER_FAVORITE_DATA?.find((prev) => prev.id === item.mal_id);
		for (const itemPosition in animeList) {
			animeList[itemPosition].items.data.map((prev) => {
				prev.mal_id == FAVORITE?.id ? item : prev;
			});
			ANIME_DATA.push(animeList[itemPosition]);
		}
		setAnimeList(ANIME_DATA);
	};

	const onFavoriteItem = useCallback(
		(event: React.MouseEvent) => {
			event.stopPropagation(); // Impede a propagação do evento para o contêiner pai
			setIsLoading(true);
			setItemWithFavorite(FAVORITE_DATA, item.isFavorite || false)
				.then((response) => {
					toastMessage({
						title: response,
						statusToast: ToastStatus.SUCCESS,
						position: "top-right",
					});
					if (response.includes("removido")) {
						updateStatusFavoriteItem(false);
						setColorSchema("gray");
					} else {
						updateStatusFavoriteItem(true);
						setColorSchema("red");
					}
				})
				.catch((err) => {
					console.error(err);
				})
				.finally(() => setIsLoading(false));
		},
		[item.isFavorite]
	);

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
			boxShadow={"2xl"}
			mb={10}
		>
			<Flex>
				<Image
					src={item.images.webp.large_image_url}
					objectFit={"cover"}
					bgSize={"cover"}
				/>
				<Flex
					p={2}
					flexDir={"column"}
					justifyContent={"space-between"}
					w={"full"}
					h={"full"}
					pos={"absolute"}
					top={0}
					zIndex={9999}
					overflow="visible"
					onClick={() => handleClick(item)} // Defina o overflow para "visible"
				>
					<Flex justifyContent={"space-between"}>
						<Tag h={"0.5"}>{item.year}</Tag>
						<Stack>
							<IconButton
								aria-label="Adicionar aos favoritos"
								icon={<AiFillHeart />}
								colorScheme={colorSchema}
								onClick={onFavoriteItem}
								isLoading={isLoading}
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
				{/* <Stack direction={["column", "row"]} spacing="8px">
					<Tag colorScheme="gray" w={"min"}>
						SIMULCAST
					</Tag>
					<Text>SUB</Text>
					<Text>DOB</Text>
				</Stack> */}
			</Flex>
		</Flex>
	);
};
