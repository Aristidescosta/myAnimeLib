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
	xs: 480,
	sm: 768,
	md: 1024,
	lg: 1200,
	ls: 1201,
	setWindowSize: (windowSize: WindowSize) => set(() => ({ windowSize }))
}))