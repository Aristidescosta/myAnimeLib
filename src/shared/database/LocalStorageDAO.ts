const storage = window.localStorage;

export enum StorageEnum {
	UserEmail = 'userEmail',
	UserAutenticatePermissions = 'userAutenticatePermissions',
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