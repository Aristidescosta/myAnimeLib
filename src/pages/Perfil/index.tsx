import {
	Box,
	Center,
	Tab,
	TabIndicator,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
} from "@chakra-ui/react";
import React from "react";

import { useDataAnime } from "../../shared/states/useAnimeRequest";
import { AnimeRow, EmptyMessage } from "../../shared/components";
import { Historic } from "../../shared/components/Historic";
import {
	APP_VARIANT_COLOR,
	PROFILE_DETAILS,
} from "../../shared/utils/constants";

export const Perfil: React.FC = () => {
	const { favorites } = useDataAnime();

	return (
		<Box mt={24}>
			<Tabs position="relative" variant="unstyled">
				<Center>
					<TabList>
						{PROFILE_DETAILS.map((profileDetail) => (
							<Tab>
								<Text as={"h3"}>{profileDetail.title.toUpperCase()}</Text>
							</Tab>
						))}
					</TabList>
					<TabIndicator
						mt={8}
						height="2px"
						bg={APP_VARIANT_COLOR}
						borderRadius="1px"
					/>
				</Center>
				<TabPanels>
					<TabPanel>
						<Historic />
					</TabPanel>
					<TabPanel>
						{favorites.length > 0 ? (
							<AnimeRow items={favorites} title="Favoritos" />
						) : (
							<EmptyMessage message="Ainda não tens nada aqui!" />
						)}
					</TabPanel>
					<TabPanel>
						<EmptyMessage message="Ainda não tens nada aqui!" />
					</TabPanel>
					<TabPanel>
						<EmptyMessage message="Ainda não tens nada aqui!" />
					</TabPanel>
					<TabPanel>
						<EmptyMessage message="Ainda não tens nada aqui!" />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Box>
	);
};
