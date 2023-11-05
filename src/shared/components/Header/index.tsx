import {
	Avatar,
	Box,
	Button,
	Flex,
	FormControl,
	HStack,
	Input,
	InputGroup,
	InputRightElement,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	useBreakpointValue,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { TNavbarItem } from "../../types/NavbarItem";
import NavigationBar from "./NavgationBar";
import { SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { StorageEnum, getData } from "../../database/LocalStorageDAO";
import { APP_VARIANT_COLOR } from "../../utils/constants";

interface IHeader {
	navbar: TNavbarItem[];
}

export const Header: React.FC<IHeader> = ({ navbar }) => {
	const isBase = useBreakpointValue({ base: true, md: true, lg: false });
	const user = getData(StorageEnum.Login);
	const username = user ? user.split("@")[0] : null;

	const [search, setSearch] = useState("");
	const navigate = useNavigate();
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!search) return;
		navigate(`/search?q=${search}`);
		setSearch("");
	};

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
					<form onSubmit={handleSubmit}>
						<FormControl >
							<InputGroup>
								<InputRightElement pointerEvents={"none"}>
									<SearchIcon color={"grey.300"} />
								</InputRightElement>
								<Input
									type="search"
									placeholder="Pesquise por um anime, mangá ou personagem"
									value={search}
									onChange={(e) => setSearch(e.target.value)}
								/>
							</InputGroup>
						</FormControl>
					</form>

					{user ? (
						<Menu>
							<Flex alignItems={"center"} justifyContent={"center"}>
								<Flex alignItems={"center"} justifyContent={"center"} gap={2}>
									<Avatar
										name={username}
										src="https://github.com/Aristidescosta.png"
									/>
									<Text fontSize={"small"}>Aristides Costa</Text>
								</Flex>
								<MenuButton
									as={Button}
									aria-label="Options"
									rightIcon={<ChevronDownIcon />}
									variant="outline"
									border={"none"}
								/>
							</Flex>

							<MenuList>
								<MenuItem as={"a"} href="/perfil">
									Perfil
								</MenuItem>
								<MenuItem as={"a"} href="/logout">
									Sair
								</MenuItem>
							</MenuList>
						</Menu>
					) : (
						<Button
							border={`1px solid ${APP_VARIANT_COLOR}`}
							color={APP_VARIANT_COLOR}
							borderRadius={"8"}
							display={["none", "flex"]}
							alignSelf={"center"}
							background="transparent"
							_hover={{
								bg: "transparent",
							}}
							fontSize={["2px, 8px, 19px"]}
							as={Link}
							to={"/entrar"}
						>
							Entrar
						</Button>
					)}
				</HStack>
			</Box>
		</Box>
	);
};
