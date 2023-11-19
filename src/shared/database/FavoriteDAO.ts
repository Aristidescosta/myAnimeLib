import { StorageEnum, getData } from "./LocalStorageDAO"
import { setDocument } from "../../firebase/firestore"
import { COLLECTION_USERS } from "../utils/constants"
import { AnimeData } from "../types/AnimeData"

export const favoriteData = (dataItem: AnimeData[]): Promise<void> => {
	return new Promise((resolve, reject) => {
		try {
			const USER_EMAIL = getData(StorageEnum.Login)
			setDocument(COLLECTION_USERS, USER_EMAIL, dataItem).then(resolve).catch(reject)
		} catch (error) {
			reject
		}
	})
}