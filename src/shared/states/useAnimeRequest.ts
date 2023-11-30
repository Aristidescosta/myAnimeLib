/* eslint-disable @typescript-eslint/no-explicit-any */
import { persist, createJSONStorage } from "zustand/middleware"
import { create } from "zustand"

import { AnimeData, IAnimeListProps } from "../types/AnimeData"



interface IRequestProps {
	animeList: IAnimeListProps[]
	animeData: AnimeData[]
	type: string
	setAnimeData: (animeData: AnimeData[]) => void
	addAnimeOnList: (animeList: IAnimeListProps[]) => void
	setType: (newType: string) => void
	request: string,
	setRequest: (request: string) => void
	itemAnime: AnimeData | null
	setItemAnime: (newItem: AnimeData | null) => void
	clearItem: () => void
	clearAllItems: () => void
	clearAnimeData: () => void
	createdAt: string
	calculateIntervalBetweenDates: (date: Date) => { DAYS: number } | void
}

export const useDataAnime = create(
	persist<IRequestProps>(
		(set, get) => ({
			animeList: [],
			animeData: [],
			type: "",
			request: "https://api.jikan.moe/v4/seasons/now",
			itemAnime: null,
			createdAt: "",
			addAnimeOnList: (newAnimelist: IAnimeListProps[]) => set(() => ({ animeList: newAnimelist })),
			setAnimeData: (newAnimeData: AnimeData[]) => set(() => ({ animeData: newAnimeData })),
			setType: (newType: string) => set(() => ({ type: newType })),
			setRequest: (request: string) => set(() => ({ request: request })),
			setItemAnime: (newItem: AnimeData | null) => set(() => ({ itemAnime: newItem })),
			clearItem: () => set(() => ({ itemAnime: null })),
			clearAllItems: () => set(() => ({ animeList: [] })),
			clearAnimeData: () => set(() => ({ animeData: [] })),
			calculateIntervalBetweenDates(date: Date) {
				const CURRENT_DATE = new Date(get().createdAt)
				const TIMES_TAMP_FIRST_DATE = date.getTime();
				const TIMES_TAMP_SECOND_DATE = new Date(CURRENT_DATE).getTime();

				const DIFFERENCE_IN_MILLISECONDS = Math.abs(TIMES_TAMP_FIRST_DATE - TIMES_TAMP_SECOND_DATE);
				const MINUTE = 60
				const SECOND = 60
				const HOUR = 24
				const DAYS = Math.floor(DIFFERENCE_IN_MILLISECONDS / (HOUR * MINUTE * SECOND * 1000));
				if (date.getMonth() === CURRENT_DATE.getMonth() && date.getFullYear() === CURRENT_DATE.getFullYear()) {
					return { DAYS };
				} else {
					return { DAYS: -1 }
				}
			},
		}),
		{
			name: "anime-storage",
			storage: createJSONStorage(() => localStorage)
		}
	))