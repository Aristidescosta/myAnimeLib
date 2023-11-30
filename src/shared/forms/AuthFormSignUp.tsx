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
import React, { useRef, useState, useEffect } from "react";
import { APP_COLOR, APP_VARIANT_COLOR } from "../utils/constants";
import { TUserProps } from "../types/AuthenticationType";
import { FaCircleUser } from "react-icons/fa6";
import { MdEmail, MdPassword } from "react-icons/md";
import { useWindowMeasure } from "../states/useWindowMeasure";
import { WindowSize } from "../components/Featured/FeaturedScreen";

interface AuthFormSignUp {
	loading: boolean;
	handleLogin: (user: TUserProps, confirmPassword: string) => void;
	onChangeRegistrationInformation: () => void;
}

export const AuthFormSignUp: React.FC<AuthFormSignUp> = ({
	loading,
	handleLogin,
	onChangeRegistrationInformation,
}) => {
	const REF_EMAIL = useRef<HTMLInputElement>(null);
	const REF_PASSWORD = useRef<HTMLInputElement>(null);
	const REF_RE_PASSWORD = useRef<HTMLInputElement>(null);
	const REF_NAME = useRef<HTMLInputElement>(null);
	const REF_USER_NAME = useRef<HTMLInputElement>(null);

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
		e: React.KeyboardEvent | React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		const EMAIL = REF_EMAIL.current?.value as string;
		const PASSWORD = REF_PASSWORD.current?.value as string;
		const RE_REPASSWORD = REF_RE_PASSWORD.current?.value as string;
		const NAME = REF_NAME.current?.value as string;
		const USER_NAME = REF_USER_NAME.current?.value as string;

		if (
			(e as React.KeyboardEvent).key === "Enter" ||
			(e as React.KeyboardEvent).key === undefined
		) {
			const USER: TUserProps = {
				email: EMAIL,
				password: PASSWORD,
				name: NAME,
				userName: USER_NAME,
			};
			handleLogin(USER, RE_REPASSWORD);
		}
	}

	return (
		<>
			<Grid templateColumns={"repeat(2, 1fr)"} gap={6}>
				<FormControl id="name">
					<FormLabel fontSize={windowSize.width <= sm ? "xs" : windowSize.width <= md ? "md" : "lg"}>Nome</FormLabel>
					<InputGroup size={windowSize.width <= sm ? "xs" : windowSize.width <= md ? "md" : "lg"}>
						<InputLeftElement pointerEvents={"none"}>
							<FaCircleUser />
						</InputLeftElement>
						<Input type="text" ref={REF_NAME} onKeyDown={handleSubmit} placeholder="Nome" />
					</InputGroup>
				</FormControl>

				<FormControl id="userName">
					<FormLabel fontSize={windowSize.width <= sm ? "xs" : windowSize.width <= md ? "md" : "lg"}>Nome de usuario</FormLabel>
					<InputGroup size={windowSize.width <= sm ? "xs" : windowSize.width <= md ? "md" : "lg"}>
						<InputLeftElement pointerEvents={"none"}>
							<FaCircleUser />
						</InputLeftElement>
						<Input type="text" ref={REF_USER_NAME} onKeyDown={handleSubmit} placeholder="Nome de usuário" />
					</InputGroup>
				</FormControl>

				<FormControl id="email">
					<FormLabel fontSize={windowSize.width <= sm ? "xs" : windowSize.width <= md ? "md" : "lg"}>Email</FormLabel>
					<InputGroup size={windowSize.width <= sm ? "xs" : windowSize.width <= md ? "md" : "lg"}>
						<InputLeftElement pointerEvents={"none"}>
							<MdEmail />
						</InputLeftElement>
						<Input type="email" ref={REF_EMAIL} onKeyDown={handleSubmit} placeholder="emailexample@gmail.com" />
					</InputGroup>
				</FormControl>

				<FormControl id="userName">
					<FormLabel fontSize={windowSize.width <= sm ? "xs" : windowSize.width <= md ? "md" : "lg"}>Palavra passe</FormLabel>
					<InputGroup size={windowSize.width <= sm ? "xs" : windowSize.width <= md ? "md" : "lg"}>
						<InputLeftElement pointerEvents={"none"}>
							<MdPassword />
						</InputLeftElement>
						<Input type="password" ref={REF_PASSWORD} onKeyDown={handleSubmit} placeholder="***********" />
					</InputGroup>
				</FormControl>
			</Grid>

			<FormControl id="userName" mt={15}>
				<FormLabel fontSize={windowSize.width <= sm ? "xs" : windowSize.width <= md ? "md" : "lg"}>Reconfirma palavra passe</FormLabel>
				<InputGroup size={windowSize.width <= sm ? "xs" : windowSize.width <= md ? "md" : "lg"}>
					<InputLeftElement pointerEvents={"none"}>
						<MdPassword />
					</InputLeftElement>
					<Input type="password" ref={REF_RE_PASSWORD} onKeyDown={handleSubmit} placeholder="***********" />
				</InputGroup>
			</FormControl>

			<FormControl id="userName" mt={15}>
				<Button
					_hover={{
						bg: APP_VARIANT_COLOR,
						color: "#FFF"
					}}
					isLoading={loading}
					loadingText="Criando conta..."
					onKeyDown={handleSubmit}
					onClick={handleSubmit}
				>
					Criar minha conta
				</Button>
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
