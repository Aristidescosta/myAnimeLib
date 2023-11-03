/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconButton } from "@chakra-ui/react";
import React from "react";

interface IButtonControl {
	icon:
		| React.ReactElement<any, string | React.JSXElementConstructor<any>>
		| undefined;
	handleClick: () => void;
	ariaLabel: string
}

export const ButtonControl: React.FC<IButtonControl> = ({
	ariaLabel,
	icon,
	handleClick,
}) => {
	return (
		<IconButton
			aria-label={ariaLabel}
			fontSize="40px"
			icon={icon}
			/* as={Link} */
			color={"#FFF"}
			bg={"none"}
			onClick={handleClick}
			
		/>
	);
};
