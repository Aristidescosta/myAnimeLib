import { favoriteData } from "../database/FavoriteDAO";
import { AnimeData } from "../types/AnimeData";

export const setItemWithFavorite = (arrayDataItem: AnimeData[], itemTitle: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		favoriteData(arrayDataItem)
			.then(() => {
				resolve(`${itemTitle} adicionado como favorito`)
			})
			.catch(() => {
				reject()
			})
	})
}