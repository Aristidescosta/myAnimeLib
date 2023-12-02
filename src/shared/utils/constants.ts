export const APP_COLOR = '#101018'
export const APP_VARIANT_COLOR = '#3ba4b1'
export const FIRST_COLOR = '#24d0e7'
export const TEXT_COLOR = '#FFF'
export const TRANSPARENT_COLOR = '#1a202c23'

export const HEADER_HEIGHT = '3.8rem'
export const NAV_HEIGHT = '4rem'


export const BIGGEST_FONT_SIZE = '2.5rem'
export const H1_FONT_SIZE = '1.75rem'
export const H2_FONT_SIZE = '1.25rem'
export const H3_FONT_SIZE = '1.125rem'
export const NORMAL_FONT_SIZE = '.938rem'
export const SMALL_FONT_SIZE = '.813rem'
export const SMALLER_FONT_SIZE = '.75rem'


export const FONT_REGULAR = '300'
export const FONT_MEDIUM = '400'
export const FONT_SEMI_BOLD = '500'

export const Z_TOOLTIP = '10'
export const Z_FIXED = '100'





const BASE_URL = "myAnimeLib"

export const ROUTE_LOGIN = { route: `${BASE_URL}/entrar` }
export const ROUTE_HOME = { route: BASE_URL }
export const ROUTE_PERFIL = { route: `${BASE_URL}/perfil` }


export const COLLECTION_USERS = 'users'

export const DATA_REQUEST: { title: string, slug: string }[] = [
	{
		title: "Temporadas novas",
		slug: "seasons/now"
	},
	{
		title: "Em alta",
		slug: "top/anime"
	}
]
export const OPTIONS = [
	{
		value: "all",
		title: "Todos"
	},

	{
		value: "anime",
		title: "Anime"
	},

	{
		value: "manga",
		title: "Mangá"
	},

	{
		value: "characters",
		title: "Personagens"
	},
]

export const PROFILE_DETAILS: {title: string, description: string}[] = [
	{
		title: "historioco",
		description: "veja sua navegação"
	},
	{
		title: "favoritos",
		description: "veja seus favoritos"
	},
	{
		title: "acompanhando",
		description: "veja seus acompanhando"
	},
	{
		title: "seguindo",
		description: "veja quem estás seguindo"
	},
	{
		title: "seguidores",
		description: "veja quem te segue"
	},
]