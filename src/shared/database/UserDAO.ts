import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"


import { TUserProps } from "../types/AuthenticationType"
import { StorageEnum, saveData } from "./LocalStorageDAO"
import { setDocument } from "../../firebase/firestore"
import { COLLECTION_USERS } from "../utils/constants"

export const signUp = (user: TUserProps): Promise<boolean> => {
	return new Promise((resolve, reject) => {
		try {
			const auth = getAuth()
			createUserWithEmailAndPassword(auth, user.email, user.password)
				.then(() => {
					createUserAccount(user)
					saveData(StorageEnum.UserData, { name: user.name, email: user.email, username: user.userName })
					resolve(true)
				})
				.catch(reject)
		} catch (error) {
			reject()
			console.error(error)
		}
	})
}

export const createUserAccount = (user: TUserProps): Promise<void> => {
	return new Promise((resolve, reject) => {
		setDocument(COLLECTION_USERS, user.email, user)
			.then(resolve)
			.catch(reject)
	})
}