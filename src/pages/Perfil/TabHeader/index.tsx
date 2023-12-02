import { Tab, Text, VStack } from "@chakra-ui/react";
import React from "react";

export interface ITabHeaderProps {
	tabTitle: string;
	tabDescription: string;
}

export const TabHeader: React.FC<ITabHeaderProps> = ({
	tabTitle,
	tabDescription,
}) => {
	return (
		<Tab>
			<VStack>
				<Text as={"h3"}>{tabTitle}</Text>
				<Text fontSize={"2xs"}>{tabDescription}</Text>
			</VStack>
		</Tab>
	);
};
