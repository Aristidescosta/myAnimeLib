import { Box } from "@chakra-ui/react";

import { AuthScreen } from "./AuthScreen";

export const Auth = () => {
	return (
		<Box h={"100vh"} w={"100vw"} pos={"relative"}>
			<Box
				bgPos={"center"}
				bgSize={"cover"}
				bgRepeat={"no-repeat"}
				bgImg={"/banner.jpg"}
				h={"100%"}
				w={"100%"}
				filter={"blur(4px)"}
			/>
			<AuthScreen />
		</Box>
	);
};
