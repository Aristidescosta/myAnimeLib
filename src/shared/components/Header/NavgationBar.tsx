/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Flex, LinkBox, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { BsBookHalf, BsBookmarkStar, BsCollectionPlay, BsHouse, BsPeople } from 'react-icons/bs'
import { FIRST_COLOR, H2_FONT_SIZE, NAV_HEIGHT, SMALL_FONT_SIZE, TRANSPARENT_COLOR } from '../../utils/constants';


export default function NavigationBar(): JSX.Element {
	

	return (

		<Flex
			w={{base: '320px', md: '360px', lg: '360px' }}
			height={NAV_HEIGHT}
			borderRadius={"50px"}
			position={"fixed"}
			top={"89vh"}
			right={"0"}
			left={"0"}
			margin={"0 auto"}
			backgroundColor={TRANSPARENT_COLOR}
			backdropFilter={"blur(4px)"} 
			boxSizing={'border-box'}
			padding={"0 1.8rem"}
			alignItems={"center"}
			as={"nav"}
			justifyContent={"space-between"}
		>
			<LinkBox 
				as={Link} 
				to="/myAnimeLib" 
				color={"#fff"}
				display={"flex"}
				flexDirection={"column"}
				alignItems={"center"}
				justifyContent={"center"}
				borderBottom={"3px solid transparent"}
				gap={".25rem"}
				height={NAV_HEIGHT}
				transition={".3s"}

				_hover={{
					color: FIRST_COLOR,
					borderColor: FIRST_COLOR,
				}}
			>
				<Box
					fontSize={H2_FONT_SIZE}
				>
					<BsHouse />
				</Box>
				<Text
					fontSize={SMALL_FONT_SIZE}
				>
					Início
				</Text>
			</LinkBox>

			<LinkBox
				as={Link}
				to="/myAnimeLib"
				color={"#fff"}
				display={"flex"}
				flexDirection={"column"}
				alignItems={"center"}
				justifyContent={"center"}
				borderBottom={"3px solid transparent"}
				gap={".25rem"}
				height={NAV_HEIGHT}
				transition={".3s"}

				_hover={{
					color: FIRST_COLOR,
					borderColor: FIRST_COLOR,
				}}
			>
				<Box
					fontSize={H2_FONT_SIZE}
				>
					<BsCollectionPlay />
				</Box>
				<Text
					fontSize={SMALL_FONT_SIZE}
				>
					Animes
				</Text>
			</LinkBox>

			<LinkBox
				as={Link}
				to="/myAnimeLib"
				color={"#fff"}
				display={"flex"}
				flexDirection={"column"}
				alignItems={"center"}
				justifyContent={"center"}
				borderBottom={"3px solid transparent"}
				gap={".25rem"}
				height={NAV_HEIGHT}
				transition={".3s"}

				_hover={{
					color: FIRST_COLOR,
					borderColor: FIRST_COLOR,
				}}
			>
				<Box
					fontSize={H2_FONT_SIZE}
				>
					<BsBookHalf />
				</Box>
				<Text
					fontSize={SMALL_FONT_SIZE}
				>
					Mangas
				</Text>
			</LinkBox>

			<LinkBox
				as={Link}
				to="/myAnimeLib"
				color={"#fff"}
				display={"flex"}
				flexDirection={"column"}
				alignItems={"center"}
				justifyContent={"center"}
				borderBottom={"3px solid transparent"}
				gap={".25rem"}
				height={NAV_HEIGHT}
				transition={".3s"}

				_hover={{
					color: FIRST_COLOR,
					borderColor: FIRST_COLOR,
				}}
			>
				<Box
					fontSize={H2_FONT_SIZE}
				>
					<BsPeople />
				</Box>
				<Text
					fontSize={SMALL_FONT_SIZE}
				>
					Pers...
				</Text>
			</LinkBox>

			<LinkBox
				as={Link}
				to="/myAnimeLib"
				color={"#fff"}
				display={"flex"}
				flexDirection={"column"}
				alignItems={"center"}
				justifyContent={"center"}
				borderBottom={"3px solid transparent"}
				gap={".25rem"}
				height={NAV_HEIGHT}
				transition={".3s"}

				_hover={{
					color: FIRST_COLOR,
					borderColor: FIRST_COLOR,
				}}
			>
				<Box
					fontSize={H2_FONT_SIZE}
				>
					<BsBookmarkStar />
				</Box>
				<Text
					fontSize={SMALL_FONT_SIZE}
				>
					Favoritos
				</Text>
			</LinkBox>

		</Flex>

	);
}