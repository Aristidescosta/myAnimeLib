const storage = window.localStorage;

export enum StorageEnum {
	RestaurantData = 'restaurantData',
	Restaurants = 'restaurants',
	Login = 'login',
	UserEmail = 'userEmail',
	customerQrCodeReadId = 'customerQrCodeReadId',
	RestaurantStorage = 'restaurantStorage',
	PositionPriceLine = 'positionPriceLine',
	TypeRestaurantInUse = 'typeRestaurantInUse',
	RestaurantSettingPriceLine = 'restaurantSettingPriceLine',
	RestaurantSettings = 'restaurantSettings',
	WarehouseData = 'warehouseData',
	UserAutenticatePermissions = 'userAutenticatePermissions',
	ModuleInUse = 'moduleInUse',
	UserFirstLogin = 'userFirstLogin',
	UserName = 'userName'
}

export function saveData(key: string, data: unknown) {
	storage.setItem(key, JSON.stringify(data));
}

export function getData(key: string) {
	const data = storage.getItem(key);
	if (data !== null) {
		if (data !== 'undefined') {
			//if (data.length > 2) {
			return JSON.parse(data);
			//}
		}
	}

	return null;
}

export function deleteData(key: string) {
	storage.removeItem(key);
}

export function deleteAll() {
	storage.clear()
}