import { useState } from 'react'

interface useRegistertUiState {
	email: string,
	password: string,
	confirmPassword: string,
	loading: boolean
	isRegister: boolean
}

export default function useRegistertUiState() {
	const [registerUiState, setRegisterUiState] = useState<useRegistertUiState>({
		email: '',
		password: '',
		confirmPassword: '',
		loading: false,
		isRegister: false
	})

	return {
		registerUiState,
		setRegisterUiState,
	}
}