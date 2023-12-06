import { StorageEnum, getData, saveData } from "../database/LocalStorageDAO";
import { favoriteData } from "../database/FavoriteDAO";
import { TFavoriteProps } from "../types/FavoriteType";
import { FirebaseError } from "firebase/app";
import { IUserFavoriteProps } from "../components";

export const setItemWithFavorite = (favorites: TFavoriteProps[], isFavorite: boolean, itemTitle: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		try {
			const USER_DATA: IUserFavoriteProps = getData(StorageEnum.UserData);
			
			favoriteData(favorites)
				.then(() => {
					saveData(StorageEnum.UserData, { ...USER_DATA, favorites: favorites });
					if (!isFavorite) {
						resolve(`${itemTitle} adicionado como favorito`);
					} else {
						resolve(`${itemTitle} removido como favorito`);
					}
				})
				.catch((error: FirebaseError) => {
					console.log(error.message);
					reject();
				});
		} catch (error) {
			console.log("não passou");
			reject(error);
		}
	});
};
