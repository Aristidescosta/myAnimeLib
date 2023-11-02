import { useState } from 'react';

interface useHomePageState {
	showMore: boolean
	showMenu: boolean
	itemsPerPage: number
}

export const initialHomePageUiState = {
	showMore: false,
	showMenu: false,
	itemsPerPage: 8
}

export default function useHomePageState() {
	const [homePageUiState, setHomePageUiState] = useState<useHomePageState>(initialHomePageUiState);

	return {
		homePageUiState,
		setHomePageUiState
	};
}