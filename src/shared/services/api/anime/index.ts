import { Environment } from "../../../environment"
import { AnimeData, IAnimeListProps, IPaginationProps } from "../../../types/AnimeData"
import { Api } from "../axios-config"

export const getAnimeList = async (
	slug = "top/anime"
): Promise<IAnimeListProps | Error> => {
	try {
		console.log(slug, "TESTES")
		const relativeUrl = `${slug}?limit=${Environment.LIMITE_DE_DADOS}`
		const { data } = await Api.get(relativeUrl)
		if (data) {
			return {
				pagination: data.pagination as IPaginationProps,
				data: data.data as AnimeData[],
				title: ""
			}
		}
		return new Error("Erro ao listar os animes")
	} catch (error) {
		return new Error(
      (error as { message: string }).message || "Erro ao listar os animes"
    );
	}
}

export const AnimeService = {
	getAnimeList
}