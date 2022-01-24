const axios = require('axios');

const API = "https://ghibliapi.herokuapp.com/films";

export interface Anime {
  id?: string,
  title?: String,
  original_title?: String,
  original_title_romanised?: String,
  image?: String,
  movie_banner?: string,
  description?: String,
  director?: String,
  producer?: String,
  release_date?: String,
  running_time?: String,
  rt_score?: String,
}

export async function getAnimes():Promise<Anime[]> {
  try {
    const response = await axios.get(API);

    return response.data;
  } catch (error) {
    console.log("Erro", error);
    return []
  }
}

export async function getAnimesByTerm(term: string) {

}