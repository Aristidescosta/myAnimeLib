import { GoogleAuthProvider, User, UserCredential, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { auth, authApp } from ".."

export const loginWithEmailAndPassword = (email: string, password: string): Promise<UserCredential> => {
	return new Promise((resolve, reject) => {
		signInWithEmailAndPassword(authApp, email, password)
			.then(resolve)
			.catch(reject)
	})
}

export const loginWithGoogle = async (): Promise<User> => {
	return new Promise((resolve, reject) => {
		const provider = new GoogleAuthProvider();
		provider.addScope("profile");
		provider.addScope("email")
		signInWithPopup(authApp, provider)
			.then(result => {
				GoogleAuthProvider.credentialFromResult(result)
				resolve(result.user)
			})
			.catch(error => {
				GoogleAuthProvider.credentialFromError(error)
				reject(error.message)
			})
	})
}

export const updateUserProfile = (user: { displayName?: string | null | undefined, photoURL?: string | null | undefined }) => {
	return auth.updateProfile(authApp.currentUser as User, user)
}

export const currentUser = () => {
	return authApp.currentUser
}

export const logout = () => {
	signOut(authApp)
}