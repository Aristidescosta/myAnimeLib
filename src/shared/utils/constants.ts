export const APP_COLOR = '#101018'
export const APP_VARIANT_COLOR = '#3ba4b1'

const BASE_URL = "myAnimeLib"

export const ROUTE_LOGIN = { route: `${BASE_URL}/entrar` }
export const ROUTE_HOME = { route: BASE_URL }

export const COLLECTION_USERS = 'users'

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