import { AuthenticationType, TUserProps } from "../types/AuthenticationType"
import { StorageEnum, deleteData, saveData } from "../database/LocalStorageDAO"
import { TUserData, createUserAccount, signIn, signInWithGoogle, signUp } from "../database/UserDAO"
import { logout } from "../../firebase/Auth"
import { COLLECTION_USERS } from "../utils/constants"
import { getDocument } from "../../firebase/firestore"

function isValidEmail(email: string): boolean {
	const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
	return emailPattern.test(email)
}

export const createAccount = (user: TUserProps, confirmPassword: string): Promise<string | boolean> => {
	console.log(user)
	return new Promise((resolve, reject) => {
		if (user.name.trim() === "") {
			reject("Digite o seu nome")
		} else if (user.userName.trim() === "") {
			reject("Digite o seu nome de usuário")
		} else if (user.email.trim() === "") {
			console.log("teste")
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

export async function handleLoginWithGoogle() {
	return new Promise((resolve, reject) => {
		signInWithGoogle()
			.then((user) => {
				if (user.email) {
					getUserData(user.email)
						.then((response) => {
							saveData(StorageEnum.Login, user.email)
							if (response) {
								saveData(StorageEnum.PhotoUrl, user.photoURL)
								resolve(true)
							} else if (user.displayName && user.email) {
								const USER_SIGN_IN: TUserData = {
									email: user.email,
									name: user.displayName,
									userName: user.displayName
								}
								createUserAccount(USER_SIGN_IN)
								saveData(StorageEnum.UserData, USER_SIGN_IN)
							}
						}).catch(reject)
				}
			})
			.catch(reject);
	});
}

export function getUserData(currentEmail: string): Promise<TUserData | null> {
	return new Promise((resolve, reject) => {
		if (currentEmail) {
			getDocument(COLLECTION_USERS, currentEmail)
				.then(snapshot => {
					if (snapshot.exists()) {
						const data = snapshot.data() as TUserData;
						saveData(StorageEnum.UserData, data)
						resolve(data);
					} else {
						resolve(null);
					}
				})
				.catch(error => {
					reject(error)
				})
		} else {
			resolve(null);
		}

	})
}

export const signInAccount = (user: AuthenticationType): Promise<AuthenticationType> => {
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
		} else {
			signIn(user)
				.then(() => {
					getUserData(user.email).then(() => {
						deleteData("anime-storage")
						resolve(user)
					}).catch(reject)
				})
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
	deleteData("anime-storage")
}
