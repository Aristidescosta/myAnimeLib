import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Spacer,
	Stack,
	Text,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { APP_COLOR, APP_VARIANT_COLOR } from "../utils/constants";
import { AuthenticationType } from "../types/AuthenticationType";
import { useWindowMeasure } from "../states/useWindowMeasure";
import { WindowSize } from "../components/Featured/FeaturedScreen";
import { handleLoginWithGoogle } from "../repository/UserRepository";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface IAuthForm {
	loading: boolean;
	handleLogin: (user: AuthenticationType, confirmPassword: string) => void;
	onChangeRegistrationInformation: () => void;
}

export const AuthForm: React.FC<IAuthForm> = ({
	loading,
	handleLogin,
	onChangeRegistrationInformation,
}) => {
	const REF_EMAIL = useRef<HTMLInputElement>(null);
	const REF_PASSWORD = useRef<HTMLInputElement>(null);

	const navigation = useNavigate();

	const { md, sm } = useWindowMeasure();
	const [windowSize, setWindowSize] = useState<WindowSize>({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEffect(() => {
		const handleResize = () => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [setWindowSize]);

	function handleSubmit(
		e: React.KeyboardEvent | React.MouseEvent<HTMLButtonElement, MouseEvent>,
		isLoginWightGoogle?: boolean
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
			if (isLoginWightGoogle) {
				onhandleLoginWithGoogle;
			} else {
				handleLogin(USER, PASSWORD);
			}
		}
	}

	function onhandleLoginWithGoogle() {
		console.log("Passando");
		handleLoginWithGoogle()
			.then(() => {
				navigation("/myAnimeLib");
			})
			.catch((err) => console.log(err));
	}

	return (
		<Stack spacing={4}>
			<FormControl
				size={
					windowSize.width <= sm ? "xs" : windowSize.width <= md ? "md" : "lg"
				}
				id="email"
			>
				<FormLabel fontSize={"14px"}>Email de utilizador</FormLabel>
				<Input
					ref={REF_EMAIL}
					type={"email"}
					variant={"none"}
					onKeyDown={handleSubmit}
					border={"1px solid #BABABA"}
					color={APP_COLOR}
				/>
			</FormControl>
			<Spacer height={0} />
			<FormControl
				size={
					windowSize.width <= sm ? "xs" : windowSize.width <= md ? "md" : "lg"
				}
				id="password"
			>
				<FormLabel fontSize={"14px"}>Palavra-passe</FormLabel>
				<Input
					required
					variant={"none"}
					ref={REF_PASSWORD}
					type={"password"}
					onKeyDown={handleSubmit}
					border={"1px solid #BABABA"}
					color={APP_COLOR}
				/>
			</FormControl>
			<Stack spacing={10} alignItems="center">
				<Button
					w={{
						base: "218px",
						md: "318px",
						lg: "300px",
					}}
					bg={APP_VARIANT_COLOR}
					color={"white"}
					_hover={{
						bg: APP_VARIANT_COLOR,
					}}
					isLoading={loading}
					loadingText="A entrar..."
					onKeyDown={handleSubmit}
					onClick={handleSubmit}
				>
					ENTRAR
				</Button>

				<Button
					w={{
						base: "218px",
						md: "318px",
						lg: "300px",
					}}
					bg={APP_VARIANT_COLOR}
					color={"white"}
					_hover={{
						bg: APP_VARIANT_COLOR,
					}}
					isLoading={loading}
					loadingText="A entrar..."
					onKeyDown={onhandleLoginWithGoogle}
					onClick={onhandleLoginWithGoogle}
					leftIcon={<FaGoogle />}
				>
					ENTRAR COM A GOOGLE
				</Button>

				<Text>
					Ainda não possuí uma conta?{" "}
					<Text
						onClick={onChangeRegistrationInformation}
						cursor={"pointer"}
						color={APP_COLOR}
					>
						Clica aqui
					</Text>{" "}
				</Text>
			</Stack>
		</Stack>
	);
};
