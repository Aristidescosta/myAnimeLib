/* eslint-disable react-hooks/exhaustive-deps */
import { Flex } from "@chakra-ui/react";

import { NAV_HEIGHT, TRANSPARENT_COLOR_SECUNDARY } from "../../utils/constants";
import { NavigationIcon } from "./NavigationIcon";
import { INavigationBar } from ".";

export default function NavigationBar({ items }: INavigationBar): JSX.Element {
	return (
		<Flex
			w={{ base: "320px", md: "360px", lg: "360px" }}
			height={NAV_HEIGHT}
			borderRadius={"50px"}
			position={"fixed"}
			top={"89vh"}
			right={"0"}
			left={"0"}
			margin={"0 auto"}
			backgroundColor={TRANSPARENT_COLOR_SECUNDARY}
			backdropFilter={"blur(4px)"}
			boxSizing={"border-box"}
			padding={"0 1.8rem"}
			alignItems={"center"}
			as={"nav"}
			justifyContent={"space-between"}
		>
			{items.map((item) => (
				<NavigationIcon
					name={item.menu}
					icon={item.icon}
					url={item.link}
					key={item.menu}
				/>
			))}
		</Flex>
	);
}
