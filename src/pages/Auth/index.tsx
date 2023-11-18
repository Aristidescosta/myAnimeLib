import { Box } from "@chakra-ui/react";

import { AuthScreen } from "./AuthScreen";

export const Auth = () => {
	return (
		<Box h={"full"} w={"full"} pos={"relative"}>
			<Box
				bgPos={"center"}
				bgSize={"cover"}
				bgRepeat={"no-repeat"}
				bgImg={"/banner.jpg"}
				h={"100vh"}
				w={"100vw"}
				filter={"blur(4px)"}
			/>
			<AuthScreen />
		</Box>
	);
};
