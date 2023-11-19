import { Box, Heading, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React from "react";

import {
	AuthenticationType,
	TUserProps,
} from "../../shared/types/AuthenticationType";
import useRegistertUiState from "../../shared/states/useRegistertUiState";
import { AuthFormSignUp } from "../../shared/forms/AuthFormSignUp";
import { useToastMessage } from "../../shared/chakra-ui-api/toast";
import {
	createAccount,
	signInAccount,
} from "../../shared/repository/UserRepository";
import { AuthForm } from "../../shared/forms/AuthForm";
import { FirebaseError } from "firebase/app";

export const AuthScreen: React.FC = () => {
	const { registerUiState, setRegisterUiState } = useRegistertUiState();
	const navigate = useNavigate();
	const { toastMessage, ToastStatus } = useToastMessage();

	const onChangeRegistrationInformation = (isRegister: boolean) => {
		setRegisterUiState((prev) => ({ ...prev, isRegister: isRegister }));
	};

	const handleRegister = (user: TUserProps, confirmPassword: string) => {
		setRegisterUiState((prev) => ({ ...prev, loading: true }));
		createAccount(user, confirmPassword)
			.then((response) => {
				if (response === true) {
					navigate("/myAnimeLib");
				} else {
					toastMessage({
						title: response as string,
						statusToast: ToastStatus.WARNING,
						position: "top-right",
					});
				}
			})
			.catch((err: FirebaseError) => {
				if (err.message === "Firebase: Error (auth/email-already-in-use).") {
					toastMessage({
						title: "Email já cadastrado!",
						statusToast: ToastStatus.ERROR,
						position: "top-right",
					});
				} else {
					console.log(err.message);
					toastMessage({
						title: "Lamentamos, tivemos um erro interno! Tente novamente",
						statusToast: ToastStatus.ERROR,
						position: "top-right",
					});
				}
			})
			.finally(() =>
				setRegisterUiState((prev) => ({ ...prev, loading: false }))
			);
	};

	const handleLogin = (user: AuthenticationType) => {
		setRegisterUiState((prev) => ({ ...prev, loading: true }));
		signInAccount(user)
			.then((response) => {
				if (typeof response === "object") {
					navigate("/myAnimeLib");
				}
			})
			.catch((error) => {
				console.error(error);
				toastMessage({
					title: "Email ou senha incorretas",
					statusToast: ToastStatus.WARNING,
					position: "top-right",
				});
			})
			.finally(() =>
				setRegisterUiState((prev) => ({ ...prev, loading: false }))
			);
	};

	return (
		<Box
			borderRadius="6px"
			bgColor="#466c9e"
			padding={"8"}
			border="1px solid #DDDDDD"
			boxShadow="dark-lg"
			textAlign={"center"}
			position={"absolute"}
			top={"15%"}
			left="50%"
			transform="translateX(-50%)"
		>
			<Heading
				display="flex"
				justifyContent="center"
				alignItems="center"
				flexDir="column"
			>
				<Heading as="h2">
					{registerUiState.isRegister ? "Cadastre-se" : "Entrar"}
				</Heading>
			</Heading>
			<Spacer height={8} />
			{registerUiState.isRegister ? (
				<AuthFormSignUp
					loading={registerUiState.loading}
					handleLogin={handleRegister}
					onChangeRegistrationInformation={() =>
						onChangeRegistrationInformation(false)
					}
				/>
			) : (
				<AuthForm
					loading={registerUiState.loading}
					handleLogin={handleLogin}
					onChangeRegistrationInformation={() =>
						onChangeRegistrationInformation(true)
					}
				/>
			)}
		</Box>
	);
};
