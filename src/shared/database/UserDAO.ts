import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"


import { AuthenticationType } from "../types/AuthenticationType"
import { StorageEnum, saveData } from "./LocalStorageDAO"
import { setDocument } from "../../firebase/firestore"
import { COLLECTION_USERS } from "../utils/constants"

export const signUp = (email: string, password: string): Promise<boolean> => {
	return new Promise((resolve, reject) => {
		try {
			const auth = getAuth()
			console.log(auth)
			createUserWithEmailAndPassword(auth, email, password)
				.then(() => {
					createUserAccount({
						email,
						password
					})
					console.log("Fui chamado")
					saveData(StorageEnum.Login, email)
					resolve(true)
				}).catch(reject)
		} catch (error) {
			reject()
			console.error(error)
		}
	})
}

export const createUserAccount = (user: AuthenticationType): Promise<void> => {
	return new Promise((resolve, reject) => {
		setDocument(COLLECTION_USERS, user.email, {
			email: user.email
		})
			.then(resolve)
			.catch(reject)
	})
}