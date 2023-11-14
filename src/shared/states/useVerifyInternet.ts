import { create } from "zustand";

interface IUseVerifyInternetProps{
	isOnline: boolean
	setIsOnline: (isOnline: boolean) => void
}

export const useVerifyInternet = create<IUseVerifyInternetProps>()((set) => ({
	isOnline: true,
	setIsOnline: (isOnline: boolean) => set(() => ({ isOnline: isOnline }))
}))