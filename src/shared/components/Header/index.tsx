import {
	Avatar,
	Box,
	Button,
	Flex,
	HStack,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	useBreakpointValue,
	useDisclosure,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { TNavbarItem } from "../../types/NavbarItem";
import NavigationBar from "./NavgationBar";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { StorageEnum, getData } from "../../database/LocalStorageDAO";
import { APP_COLOR, APP_VARIANT_COLOR } from "../../utils/constants";
import { useTheBounce } from "../../hooks/hooks";
import { SearchForm } from "../../forms/SearchForm";
import { signOut } from "../../repository/UserRepository";

interface IHeader {
	navbar: TNavbarItem[];
}

export const Header: React.FC<IHeader> = ({ navbar }) => {
	const isBase = useBreakpointValue({ base: true, md: true, lg: false });
	const user = getData(StorageEnum.UserData);
	const PHOTO_URL = getData(StorageEnum.PhotoUrl);
	const username = user ? user.userName : null;
	const { theBounce } = useTheBounce();
	const { onClose } = useDisclosure();
	const [choice, setChoice] = useState("all");
	const [search, setSearch] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!search) return;
		navigate(`/search?q=${search}`);
		setSearch("");
	};

	const handleChangeChoice = (choice: string) => {
		setChoice(choice);
	};

	useEffect(() => {
		theBounce(() => {
			if (!search) return;
			navigate(`/search?q=${search}`);
		});
	});

	function onLogout() {
		signOut();
		window.location.reload()
		/* navigate("/myAnimeLib"); */
	}

	return (
		<Box>
			<Box
				display={"flex"}
				justifyContent={"space-between"}
				alignItems={"center"}
				h={["20", "96px"]}
				mx={["2", "8"]}
			>
				<Box as={Link} display={"flex"} alignSelf={"center"} to={"/"}>
					<Text as={"h1"} textTransform={"capitalize"}>
						AnimeLib
					</Text>
				</Box>

				<NavigationBar items={navbar} isBase={isBase || false} />

				<HStack display={"flex"} justify={"space-between"}>
					{isBase ? (
						<Menu>
							<MenuButton
								as={IconButton}
								aria-label="Options"
								icon={<SearchIcon />}
								variant="outline"
								borderColor={APP_COLOR}
								color={"#FFF"}
							/>
							<MenuList zIndex={9} color={APP_COLOR} p={6}>
								<SearchForm
									handleChangeChoice={handleChangeChoice}
									handleSubmit={handleSubmit}
									search={search}
									setSearch={setSearch}
									choice={choice}
									isMobile={isBase || false}
								/>
							</MenuList>
						</Menu>
					) : (
						<SearchForm
							handleChangeChoice={handleChangeChoice}
							handleSubmit={handleSubmit}
							search={search}
							setSearch={setSearch}
							choice={choice}
							isMobile={isBase || false}
						/>
					)}

					{user ? (
						<Menu onClose={onClose}>
							<Flex alignItems={"center"} justifyContent={"center"}>
								<Flex alignItems={"center"} justifyContent={"center"}>
									<Avatar name={username} src={PHOTO_URL} />
									{!isBase && (
										<Text fontSize={"small"} ml={2}>
											{username}
										</Text>
									)}
								</Flex>
								<MenuButton
									as={Button}
									aria-label="Options"
									rightIcon={<ChevronDownIcon />}
									variant="outline"
									border={"none"}
									_hover={{
										bg: "transparent",
									}}
									color={"FFF"}
								/>
							</Flex>

							<MenuList zIndex={99999999} color={APP_COLOR} p={0}>
								<MenuItem as={"a"} href="/perfil">
									Perfil
								</MenuItem>
								<MenuItem as={"button"} onClick={onLogout}>
									Sair
								</MenuItem>
							</MenuList>
						</Menu>
					) : (
						<Button
							border={`1px solid ${APP_VARIANT_COLOR}`}
							color={APP_VARIANT_COLOR}
							borderRadius={"8"}
							/* display={["none", "flex"]} */
							alignSelf={"center"}
							background="transparent"
							_hover={{
								bg: "transparent",
							}}
							fontSize={["2px, 8px, 19px"]}
							as={Link}
							to={"/myAnimeLib/entrar"}
						>
							Entrar
						</Button>
					)}
				</HStack>
			</Box>
		</Box>
	);
};
