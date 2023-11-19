import { StorageEnum, getData } from "./LocalStorageDAO"
import { setDocument } from "../../firebase/firestore"
import { TFavoriteProps } from "../types/FavoriteType"
import { COLLECTION_USERS } from "../utils/constants"

export const favoriteData = (favorites: TFavoriteProps[]): Promise<void> => {
	return new Promise((resolve, reject) => {
		const USER_EMAIL = getData(StorageEnum.Login)
		setDocument(COLLECTION_USERS, USER_EMAIL, {favorites: favorites}, true)
			.then(resolve)
			.catch(reject)
	})
}