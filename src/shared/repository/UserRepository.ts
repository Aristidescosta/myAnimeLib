import { TUserProps } from "../types/AuthenticationType"
import { signUp } from "../database/UserDAO"
import { logout } from "../../firebase/Auth"
import { StorageEnum, deleteData } from "../database/LocalStorageDAO"

function isValidEmail(email: string): boolean {
	const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
	return emailPattern.test(email)
}

export const createAccount = (user: TUserProps, confirmPassword: string): Promise<string | boolean> => {
	return new Promise((resolve, reject) => {
		if (user.email.trim() === "") {
			reject("Digite o seu email de utilizador")
		} else if (!isValidEmail(user.email)) {
			reject("Digite um email válido")
		} else if (user.password.trim() === "") {
			reject("Digite a sua senha de utilizador")
		} else if (!/^[^\s]*$/.test(user.password)) {
			reject('Digite uma palavra-passe válida')
		} else if (user.password.length < 6) {
			reject('A sua palavra-passe deve ter no mínimo 6 caracteres')
		} else if (confirmPassword !== user.password) {
			reject('A sua palavra-passe não confere')
		} else {
			signUp(user)
				.then(resolve)
				.catch(reject)
		}
	})
}

export function signOut() {
	logout()
	deleteData(StorageEnum.UserData)
	deleteData(StorageEnum.Login)
	deleteData(StorageEnum.PhotoUrl)
	deleteData(StorageEnum.UserAutenticatePermissions)
}
