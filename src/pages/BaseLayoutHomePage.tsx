import { BsBookHalf, BsCollectionPlay, BsHouse, BsPeople } from 'react-icons/bs'
import { PropsWithChildren } from 'react'
import { Box } from '@chakra-ui/react'

import { TNavbarItem } from '../shared/types/NavbarItem'
import { Header } from '../shared/components/Header'

export const BaseLayoutHomePage = (props: PropsWithChildren) => {
	const NAVBAR_ITEMS: TNavbarItem[] = [
		{
			icon: <BsHouse />,
			link: '/',
			menu: 'Início'
		},
		{
			icon: <BsCollectionPlay />,
			link: '/animes',
			menu: 'Animes'
		},
		{
			icon: <BsBookHalf />,
			link: '/mangas',
			menu: 'Mangás'
		},
		{
			icon: <BsPeople />,
			link: '/personagens',
			menu: 'Personagens'
		}/* ,
		{
			icon: <BsBookmarkStar />,
			link: '/favoritos',
			menu: 'Favoritos'
		} */
	]

	return (
		<Box>
			<Header items={NAVBAR_ITEMS}/>
			{ props.children }
		</Box>
	)
}
