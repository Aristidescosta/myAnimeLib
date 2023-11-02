/* eslint-disable react-hooks/exhaustive-deps */
import { Flex } from '@chakra-ui/react';
import { useEffect } from 'react';

import useHomePageState from '../../states/useHomePageState';
import { ListNavigationbar } from './ListNavigationBar';
import { NavbarHamburguer } from './NavbarHamburguer';
import { TNavbarItem } from '../../types/NavbarItem';

interface INavigationBar {
	items: TNavbarItem[]
	isBase: boolean
}

export default function NavigationBar(props: INavigationBar): JSX.Element {
	const { homePageUiState, setHomePageUiState } = useHomePageState();
	const {
		items,
		isBase
	} = props;

	function onSetShowMenu(menu: boolean) {
		setHomePageUiState(prev => ({ ...prev, showMenu: menu }));
	}

	useEffect(() => {
		onSetShowMenu(isBase || false);
	}, [isBase]);

	return (

		<Flex
			justify={['flex-end', 'space-around']}
			align='center'
			h={'100%'}
			w={{ base: 'fit-content', md: 'fit-content', lg: '50%' }}
		>
			{homePageUiState.showMenu ? <NavbarHamburguer items={items} /> : <ListNavigationbar items={items} />}
		</Flex>

	);
}