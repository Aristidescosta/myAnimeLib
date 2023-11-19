import { StorageEnum, getData, saveData } from "../database/LocalStorageDAO";
import { favoriteData } from "../database/FavoriteDAO";
import { TFavoriteProps } from "../types/FavoriteType";
import { FirebaseError } from "firebase/app";
import { IUserFavoriteProps } from "../components";

export const setItemWithFavorite = (favorites: TFavoriteProps, isFavorite: boolean): Promise<string> => {
	return new Promise((resolve, reject) => {
		try {
			const USER_DATA: IUserFavoriteProps = getData(StorageEnum.UserData);
			const USER_FAVORITE_DATA = USER_DATA.favorites;
			const FAVORITE_ITEM_INDEX = USER_FAVORITE_DATA.findIndex((prev) => prev.id === favorites.id);

			if (FAVORITE_ITEM_INDEX !== -1) {
				USER_FAVORITE_DATA.splice(FAVORITE_ITEM_INDEX, 1);
			}else{
				USER_FAVORITE_DATA.push(favorites)
			}

			favoriteData(USER_FAVORITE_DATA)
				.then(() => {
					saveData(StorageEnum.UserData, { ...USER_DATA, favorites: USER_FAVORITE_DATA });
					if (!isFavorite) {
						resolve(`${favorites.title} adicionado como favorito`);
					} else {
						resolve(`${favorites.title} removido como favorito`);
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
