import { create } from "zustand";

interface IUseVerifyInternetProps{
	isOnline: boolean
	setIsOnline: (isOnline: boolean) => void
}

export const useVerifyInternet = create<IUseVerifyInternetProps>()((set) => ({
	isOnline: false,
	setIsOnline: (isOnline: boolean) => set(() => ({ isOnline: isOnline }))
}))