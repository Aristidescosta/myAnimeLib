import { PropsWithChildren } from 'react'
import { Box } from '@chakra-ui/react'

import { TNavbarItem } from '../shared/types/NavbarItem'
import { Header } from '../shared/components/Header'

export const BaseLayoutHomePage = (props: PropsWithChildren) => {
	const NAVBAR_ITEMS: TNavbarItem[] = [
		{
			link: '/',
			menu: 'Início'
		},
		{
			link: '/animes',
			menu: 'Animes'
		},
		{
			link: '/mangas',
			menu: 'Mangás'
		},
		{
			link: '/personagens',
			menu: 'Personagens'
		}
	]

	return (
		<Box>
			<Header/>
			{ props.children }
		</Box>
	)
}
