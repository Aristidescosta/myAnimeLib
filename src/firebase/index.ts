import { initializeApp, getApp } from 'firebase/app'
import {
	addDoc,
	arrayRemove,
	arrayUnion,
	collection,
	collectionGroup,
	connectFirestoreEmulator,
	deleteDoc,
	doc,
	documentId,
	FieldValue,
	increment,
	initializeFirestore,
	getFirestore,
	getDoc,
	getDocs,
	onSnapshot,
	orderBy,
	query,
	setDoc,
	Timestamp,
	updateDoc,
	where,
	writeBatch,
	limit,
	startAfter,
} from 'firebase/firestore'

import {
	getAuth,
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPhoneNumber,
	signOut,
	sendPasswordResetEmail,
	updateProfile,
	updatePassword,
	fetchSignInMethodsForEmail,
	RecaptchaVerifier,
	signInWithCredential,
	PhoneAuthProvider,
	reauthenticateWithCredential,
	EmailAuthProvider,
} from 'firebase/auth'

import {
	getFunctions
} from 'firebase/functions'
import { getStorage } from 'firebase/storage'

const app = initializeApp({
	apiKey: "AIzaSyBbADZlSf92X3kYhyBvHC23IuybwU3D6a4",
	authDomain: "myanimelib-13b91.firebaseapp.com",
	projectId: "myanimelib-13b91",
	storageBucket: "myanimelib-13b91.appspot.com",
	messagingSenderId: "846706905120",
	appId: "1:846706905120:web:4ed47c53c914a25c17ec45",
	measurementId: "G-2LHJDQLJCP"
})

initializeFirestore(app, { ignoreUndefinedProperties: true })

export const dbFirestore = getFirestore()
export const functionsApp = getFunctions(getApp())
export const authApp = getAuth()
export const storage = getStorage()
export const firestore = {
	addDoc,
	arrayRemove,
	arrayUnion,
	collection,
	collectionGroup,
	connectFirestoreEmulator,
	deleteDoc,
	doc,
	documentId,
	FieldValue,
	increment,
	initializeFirestore,
	getFirestore,
	getDoc,
	getDocs,
	onSnapshot,
	orderBy,
	query,
	setDoc,
	Timestamp,
	updateDoc,
	where,
	writeBatch,
	limit,
	startAfter,
}

export const auth = {
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	sendPasswordResetEmail,
	updateProfile,
	updatePassword,
	getAuth,
	fetchSignInMethodsForEmail,
	signInWithPhoneNumber,
	signInWithCredential,
	reauthenticateWithCredential,
	EmailAuthProvider,
	PhoneAuthProvider,
	RecaptchaVerifier,
}

export const functions = getFunctions()