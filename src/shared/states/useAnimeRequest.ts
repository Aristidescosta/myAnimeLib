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
	itemAnime: AnimeData | null
	setItemAnime: (newItem: AnimeData | null) => void
	clearItem: () => void
	clearAllItems: () => void
	clearAnimeData: () => void
	createdAt: string
	calculateIntervalBetweenDates: (date: Date) => { DAYS: number } | void
	favorites: AnimeData[]
	addFavorite: (item: AnimeData) => void
	removeFavorite: (itemId: number) => void
}

export const useDataAnime = create(
	persist<IRequestProps>(
		(set, get) => ({
			animeList: [],
			animeData: [],
			type: "",
			itemAnime: null,
			createdAt: "",
			favorites: [],
			addFavorite: (item: AnimeData) => {
				set((state) => ({
					favorites: [...state.favorites, item],
				}))
			},
			addAnimeOnList: (newAnimelist: IAnimeListProps[]) => set(() => ({ animeList: newAnimelist })),
			removeFavorite: async (itemId: number) => set((state) => {
				const newAnimeList = state.animeList.map((items => {
					return {
						title: items.title,
						data: items.data.map(item => {
							if (item.mal_id === itemId) {
								item.isFavorite = false
							}
							return item
						}),
						pagination: items.pagination
					}
				}))
				console.log(newAnimeList)
				console.log(state.animeList)
				state.addAnimeOnList(newAnimeList)
				return { favorites: state.favorites.filter((favorite) => favorite.mal_id !== itemId) }
			}),
			setAnimeData: (newAnimeData: AnimeData[]) => set(() => ({ animeData: newAnimeData })),
			setType: (newType: string) => set(() => ({ type: newType })),
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