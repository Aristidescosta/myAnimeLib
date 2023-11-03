import { Button, FormControl, FormLabel, Input, Spacer, Stack } from "@chakra-ui/react";
import React, { useRef } from "react";
import { APP_COLOR, APP_VARIANT_COLOR } from "../utils/constants";

interface IAuthForm {
	loading: boolean;
	handleLogin: (email: string, password: string) => void;
}

export const AuthForm: React.FC<IAuthForm> = ({ loading, handleLogin }) => {
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
			if (EMAIL && PASSWORD) {
				handleLogin(EMAIL, PASSWORD);
			}
		}
	}

	return (
		<Stack spacing={4}>
			<FormControl id="email">
				<FormLabel fontSize={"14px"}>Email de utilizador</FormLabel>
				<Input
					h={"49px"}
					ref={REF_EMAIL}
					type={"email"}
					variant={"none"}
					onKeyDown={handleSubmit}
					border={"1px solid #BABABA"}
					color={APP_COLOR}
				/>
			</FormControl>
			<Spacer height={0} />
			<FormControl id="password">
				<FormLabel fontSize={"14px"}>Palavra-passe</FormLabel>
				<Input
					required
					h={"49px"}
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
					h={"49px"}
					mt={"20px"}
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
			</Stack>
		</Stack>
	);
};
