import { create } from "zustand"

interface IUseAnimatedStates{
	isOpen: boolean
	onClose: () => void
	onOpen: () => void
}

export const useAnimated = create<IUseAnimatedStates>()((set) => ({
	isOpen: false,
	onClose: () => set(() => ({ isOpen: false })),
	onOpen: () => set(() => ({ isOpen: true })),
}))