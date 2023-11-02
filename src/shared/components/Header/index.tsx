import { Box, HStack, Text, useBreakpointValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";
import { TNavbarItem } from "../../types/NavbarItem";
import NavigationBar from "./NavgationBar";
/* import { APP_COLOR } from '../../utils/constants' */

interface IHeader {
	navbar: TNavbarItem[];
}

export const Header: React.FC<IHeader> = ({ navbar }) => {
	const isBase = useBreakpointValue({ base: true, md: true, lg: false });
	return (
		<Box>
			<Box display={'flex'} justifyContent={"space-between"} h={["20", "96px"]} mx={["2", "8"]}>
				<Box as={Link} display={"flex"} alignSelf={"center"} to={"/"}>
					<Text as={"h1"} textTransform={"capitalize"}>
						AnimeLib
					</Text>
				</Box>
				<NavigationBar items={navbar} isBase={isBase || false}/>
			</Box>

			<HStack>

			</HStack>
		</Box>
	);
};
