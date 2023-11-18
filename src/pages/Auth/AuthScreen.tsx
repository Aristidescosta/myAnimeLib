import { Box, Heading, Image, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { AuthForm } from "../../shared/forms/AuthForm";

export const AuthScreen: React.FC = () => {
	return (
		<Box
			borderRadius="6px"
			bgColor="#466c9e"
			padding={"8"}
			width={"xl"}
			m={["auto"]}
			mt={"8"}
			border="1px solid #DDDDDD"
			boxShadow="1.5px 1.5px #ddd"
			textAlign={"center"}
		>
			<Heading
				display="flex"
				justifyContent="center"
				alignItems="center"
				flexDir="column"
			>
				<Image src={"/demon.png"} boxSize={"60%"} />
				<Text pt="15px" fontWeight="400" fontSize="14px" lineHeight=" 160%">
					Escolha uma forma para iniciar secção
				</Text>
			</Heading>
			<Spacer height={8} />
			<AuthForm loading={false} handleLogin={() => alert("Funcionando")} />
		</Box>
	);
};
