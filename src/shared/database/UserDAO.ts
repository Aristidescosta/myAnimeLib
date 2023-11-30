import { User, createUserWithEmailAndPassword, getAuth } from "firebase/auth"


import { AuthenticationType, TUserProps } from "../types/AuthenticationType"
import { StorageEnum, saveData } from "./LocalStorageDAO"
import { setDocument } from "../../firebase/firestore"
import { COLLECTION_USERS } from "../utils/constants"
import { loginWithEmailAndPassword, loginWithGoogle } from "../../firebase/Auth"

export interface TUserData extends Omit<TUserProps, "password"> { }

export const signUp = (user: TUserProps): Promise<boolean> => {
	return new Promise((resolve, reject) => {
		try {
			const auth = getAuth()
			createUserWithEmailAndPassword(auth, user.email, user.password)
				.then(() => {
					createUserAccount({ name: user.name, email: user.email, userName: user.userName })
					saveData(StorageEnum.Login, user.email)
					saveData(StorageEnum.UserData, { name: user.name, email: user.email, userName: user.userName })
					resolve(true)
				})
				.catch(reject)
		} catch (error) {
			reject()
			console.error(error)
		}
	})
}

export const signInWithGoogle = (): Promise<User> => {
	return new Promise((resolve, reject) => {
		try {
			loginWithGoogle()
				.then(response => resolve(response))
				.catch(reject)
		} catch (error) {
			reject
		}
	})
}

export const signIn = (user: AuthenticationType) => {
	return new Promise((resolve, reject) => {
		loginWithEmailAndPassword(user.email, user.password)
			.then((userCredential) => {
				const user = userCredential.user;
				resolve(user)
				saveData(StorageEnum.Login, user.email)
			})
			.catch(reject)
	})
}

export const createUserAccount = (user: TUserData): Promise<void> => {
	return new Promise((resolve, reject) => {
		setDocument(COLLECTION_USERS, user.email, user)
			.then(resolve)
			.catch(reject)
	})
}