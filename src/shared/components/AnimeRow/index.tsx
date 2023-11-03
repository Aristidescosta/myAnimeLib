import { Box, Button, Flex, Heading, IconButton, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { ButtonControl } from "..";

export const AnimeRow: React.FC = () => {
	const [scrollX, setScrollX] = useState(-400);
	const handleLeftArrow = () => {
		let x = scrollX + Math.round(window.innerWidth / 2);
		if (x > 0) x = 0;
		setScrollX(x);
	};

	const handleRigthArrow = () => {
		let x = scrollX - Math.round(window.innerWidth / 2);
		const LIST_WIDTH = 8 * 150;
		if (window.innerWidth - LIST_WIDTH > x) x = window.innerWidth - listW - 60;
		setScrollX(x);
	};

	return (
		<Box mb={30}>
			<Heading as={"h2"}>Animes </Heading>
			<Flex
				pos={"absolute"}
				w={40}
				h={225}
				bg={"#fff"}
				zIndex={99}
				alignItems={"center"}
				justifyContent={"center"}
				cursor={"pointer"}
				overflow={"hidden"}
				opacity={0}
				transition={"all ease 0.2s"}
				left={0}
			>
				<ArrowBackIcon />
			</Flex>
			<Flex
				pos={"absolute"}
				w={40}
				h={225}
				bg={"#00000099"}
				zIndex={99}
				alignItems={"center"}
				justifyContent={"center"}
				cursor={"pointer"}
				overflow={"hidden"}
				opacity={0}
				transition={"all ease 0.2s"}
				right={0}
			>
				<ArrowForwardIcon />
			</Flex>
			<Box overflowX={'hidden'} pl={30}>
				<Box transition={'all ease 0.5s'} /* ml={scrollX} w={8 * 150} */>
					<Box display={'inline-block'} w={150} cursor={'pointer'}>
						<Image w={'full'} transform={'scale(0.9)'} 
							src="https://github.com/Aristidescosta.png"
						/>
					</Box>
				</Box>
			</Box>

		</Box>
	);
};
