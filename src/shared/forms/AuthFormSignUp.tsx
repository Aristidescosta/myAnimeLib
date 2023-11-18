import {
	Button,
	FormControl,
	FormLabel,
	Grid,
	Input,
	InputGroup,
	InputLeftElement,
	Text,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { APP_COLOR } from "../utils/constants";
import { AuthenticationType } from "../types/AuthenticationType";
import { FaCircleUser } from "react-icons/fa6";
import { MdEmail, MdPassword } from "react-icons/md";

interface AuthFormSignUp {
	loading: boolean;
	handleLogin: (user: AuthenticationType, confirmPassword: string) => void;
	onChangeRegistrationInformation: () => void;
}

export const AuthFormSignUp: React.FC<AuthFormSignUp> = ({
	loading,
	handleLogin,
	onChangeRegistrationInformation,
}) => {
	const REF_EMAIL = useRef<HTMLInputElement>(null);
	const REF_PASSWORD = useRef<HTMLInputElement>(null);

	function handleSubmit(
		e: React.KeyboardEvent | React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		const EMAIL = REF_EMAIL.current?.value as string;
		const PASSWORD = REF_PASSWORD.current?.value as string;

		if (
			(e as React.KeyboardEvent).key === "Enter" ||
			(e as React.KeyboardEvent).key === undefined
		) {
			const USER = {
				email: EMAIL,
				password: PASSWORD,
			};
			handleLogin(USER, PASSWORD);
		}
	}

	return (
		<>
			<Grid templateColumns={"repeat(2, 1fr)"} gap={6}>
				<FormControl id="name">
					<FormLabel>Nome</FormLabel>
					<InputGroup>
						<InputLeftElement pointerEvents={"none"}>
							<FaCircleUser />
						</InputLeftElement>
						<Input type="text" placeholder="Nome" />
					</InputGroup>
				</FormControl>

				<FormControl id="userName">
					<FormLabel>Nome de usuario</FormLabel>
					<InputGroup>
						<InputLeftElement pointerEvents={"none"}>
							<FaCircleUser />
						</InputLeftElement>
						<Input type="text" placeholder="Nome de usuário" />
					</InputGroup>
				</FormControl>

				<FormControl id="email">
					<FormLabel>Email</FormLabel>
					<InputGroup>
						<InputLeftElement pointerEvents={"none"}>
							<MdEmail />
						</InputLeftElement>
						<Input type="text" placeholder="Nome" />
					</InputGroup>
				</FormControl>

				<FormControl id="userName">
					<FormLabel>Palavra passe</FormLabel>
					<InputGroup>
						<InputLeftElement pointerEvents={"none"}>
							<MdPassword />
						</InputLeftElement>
						<Input type="text" placeholder="Nome de usuário" />
					</InputGroup>
				</FormControl>
			</Grid>

			<FormControl id="userName" mt={15}>
				<FormLabel>Reconfirma palavra passe</FormLabel>
				<InputGroup>
					<InputLeftElement pointerEvents={"none"}>
						<MdPassword />
					</InputLeftElement>
					<Input type="text" placeholder="Nome de usuário" />
				</InputGroup>
			</FormControl>

			<FormControl id="userName" mt={15}>
				<Button>Criar minha conta</Button>
			</FormControl>

			<Text>
				Já tenho uma conta!{" "}
				<Text
					onClick={onChangeRegistrationInformation}
					cursor={"pointer"}
					color={APP_COLOR}
				>
					Entrar
				</Text>{" "}
			</Text>
		</>
	);
};
