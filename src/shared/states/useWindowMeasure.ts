import { create } from "zustand"

interface WindowSize {
	width: number;
	height: number;
}

interface IWindowMeasureProps{
	windowSize: WindowSize
	setWindowSize: (windowSize: WindowSize) => void,
	xs: number
	sm: number
	md: number
	lg: number
	ls: number
}

export const useWindowMeasure = create<IWindowMeasureProps>()((set) => ({
	windowSize:{
		width: 0,
		height: 0
	},
	xs: 321,
	sm: 376,
	md: 426,
	lg: 769,
	ls: 1025,
	setWindowSize: (windowSize: WindowSize) => set(() => ({ windowSize }))
}))