import { create } from "zustand"

interface WindowSize {
	width: number;
	height: number;
}

interface IWindowMeasureProps{
	windowSize: WindowSize
	setWindowSize: (windowSize: WindowSize) => void,
	sm: number
	md: number
	lg: number
	xl: number
}

export const useWindowMeasure = create<IWindowMeasureProps>()((set) => ({
	windowSize:{
		width: 0,
		height: 0
	},
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200,
	setWindowSize: (windowSize: WindowSize) => set(() => ({ windowSize }))
}))