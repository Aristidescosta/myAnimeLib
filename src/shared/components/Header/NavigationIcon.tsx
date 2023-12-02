import { Box, LinkBox, Text } from "@chakra-ui/react";
import { Link, To } from "react-router-dom";
import React from "react";
import {
	FIRST_COLOR,
	H2_FONT_SIZE,
	NAV_HEIGHT,
	SMALL_FONT_SIZE,
} from "../../utils/constants";

interface INavigationIconProps{
	name: string
	icon: React.ReactNode,
	url: To
}


export const NavigationIcon: React.FC<INavigationIconProps> = ({ name, icon, url }) => {
	return (
		<LinkBox
			as={Link}
			to={`/myAnimeLib${url}`}
			color={"#fff"}
			display={"flex"}
			flexDirection={"column"}
			alignItems={"center"}
			justifyContent={"center"}
			borderBottom={"3px solid transparent"}
			gap={".25rem"}
			height={NAV_HEIGHT}
			transition={".3s"}
			_hover={{
				color: FIRST_COLOR,
				borderColor: FIRST_COLOR,
			}}
		>
			<Box fontSize={H2_FONT_SIZE}>
				{icon}
			</Box>
			<Text fontSize={SMALL_FONT_SIZE}>{name}</Text>
		</LinkBox>
	);
};
