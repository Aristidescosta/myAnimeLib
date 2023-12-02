import {
	Box,
	Center,
	TabIndicator,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from "@chakra-ui/react";
import React from "react";
import {
	APP_VARIANT_COLOR,
	PROFILE_DETAILS,
} from "../../shared/utils/constants";
import { TabHeader } from "./TabHeader";
import { Historic } from "../../shared/components/Historic";
import { AnimeCard } from "../../shared/components";
import { useDataAnime } from "../../shared/states/useAnimeRequest";


export const Perfil: React.FC = () => {
	/* const {  } = useDataAnime() */

	return (
		<Box mt={24}>
			<Tabs position="relative" variant="unstyled">
				<Center>
					<TabList>
						{PROFILE_DETAILS.map((profileDetail) => (
							<TabHeader
								key={profileDetail.title}
								tabDescription={profileDetail.description}
								tabTitle={profileDetail.title.toUpperCase()}
							/>
						))}
					</TabList>
					<TabIndicator
						mt="-1.5px"
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
						{/* <AnimeCard > */}
					</TabPanel>
					<TabPanel>
						<p>two!</p>
					</TabPanel>
					<TabPanel>
						<p>two!</p>
					</TabPanel>
					<TabPanel>
						<p>two!</p>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Box>
	);
};
