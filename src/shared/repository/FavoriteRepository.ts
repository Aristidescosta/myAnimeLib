import { StorageEnum, getData, saveData } from "../database/LocalStorageDAO";
import { favoriteData } from "../database/FavoriteDAO";
import { TFavoriteProps } from "../types/FavoriteType";
import { FirebaseError } from "firebase/app";

export const setItemWithFavorite = (favorites: TFavoriteProps, isFavorite: boolean): Promise<string> => {
	return new Promise((resolve, reject) => {
		try {
			const FAVORITES_ITEMS: TFavoriteProps[] = getData(StorageEnum.Favorites) ?? []
			const FAVORITE_ITEM = FAVORITES_ITEMS.find((prev) => prev === favorites)
			let removedItem: TFavoriteProps[] = []
			if (FAVORITE_ITEM) {
				removedItem = FAVORITES_ITEMS.filter(prev => prev.id !== FAVORITE_ITEM.id)
			}
			FAVORITES_ITEMS.push(favorites)
			favoriteData(isFavorite ? removedItem : FAVORITES_ITEMS)
				.then(() => {
					console.log("passou")
					saveData(StorageEnum.Favorites, isFavorite ? removedItem : FAVORITES_ITEMS)
					if (!isFavorite) {
						resolve(`${favorites.title} adicionado como favorito`)
					} else {
						resolve(`${favorites.title} removido como favorito`)
					}
				})
				.catch((error: FirebaseError) => {
					console.log(error.message)
					reject()
				})
		} catch (error) {
			console.log("não passou")
			reject(error)
		}

	})
}