/* eslint-disable @typescript-eslint/no-explicit-any */

import { doc, setDoc } from "firebase/firestore"
import { firestore } from ".."

const db = firestore.getFirestore()

/**
 *
 * @param collectionName - Name of collection (string)
 * @param document - Identity of document on collection (string)
 * @param data - Data to be stored on document (any)
 * @param isUpdate - If used, the document will be updated (boolean = false)
 */
export function setDocument(
	collectionName: string,
	document: string,
	data: any,
	isUpdate: boolean = false
) {
	if (isUpdate) {
		return setDoc(doc(db, collectionName, document), data, { merge: isUpdate })
	} else {
		return setDoc(doc(db, collectionName, document), data)
	}
}