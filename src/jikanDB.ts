const api_base = "https://api.jikan.moe/v4/";

/* 
 - Animes novos
 - recomendado(trending)
 - em alta(top rated)
 - ação 
 - comédia
 - terror
 - romance
 - documentários
*/

const basecFetch = async (endpoint: string) => {
  const req = await fetch(`${api_base}${endpoint}`);
  const json = await req.json();
  return json;
};

export default {
  getAnimeList: async () => {
    return [
      {
        slug: "now",
        title: "Animes/Temporadas novos",
        items: await basecFetch("seasons/now"),
      },

      {
        slug: "toprated",
        title: "Em alta",
        items: await basecFetch(`top/anime`),
      },
    ];
  },

  getMangaList: async () => {
    return [
      {
        slug: "now",
        title: "Mangás/capitulos novos",
        items: await basecFetch("manga/1/news"),
      },

      {
        slug: "toprated",
        title: "Mangás em alta",
        items: await basecFetch(`top/manga`),
      },
    ];
  },

  getAnimeInfo: async (movieId: string | number, type: string) => {
    let info: object | null = {};

    if (movieId) {
      switch (type) {
        case "anime":
          info = await basecFetch(`/anime/${movieId}?`);
          break;
        case "manga":
          info = await basecFetch(`/tv/${movieId}?`);
          break;
        case "character":
          info = await basecFetch(`/tv/${movieId}?`);
          break;
        default:
          info = null;
          break;
      }
    }
    return info;
  },
};
