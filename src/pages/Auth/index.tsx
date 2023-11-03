import { Box } from "@chakra-ui/react";

import { AuthScreen } from "./AuthScreen";

export const Auth = () => {
	return (
		<Box
			m={0}
			bgPos={"center"}
			bgSize={"cover"}
			bgRepeat={"no-repeat"}
			bgImg={"/banner.jpg"}
			h={"100vh"}
			w={"100vw"}
			overflow={"hidden"}
		>
			<AuthScreen />
		</Box>
	);
};
