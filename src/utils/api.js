import axios from 'axios';

const OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

export const fetchMovies = async (query, page = 1) => {
  const response = await axios.get(
    `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&page=${page}&apikey=${OMDB_API_KEY}`
  );
  if (response.data.Error) throw new Error(response.data.Error);
  return {
    movies: response.data.Search,
    totalResults: parseInt(response.data.totalResults, 10),
  };
};

export const fetchMovieById = async (id) => {
  const response = await axios.get(
    `https://www.omdbapi.com/?i=${id}&apikey=${OMDB_API_KEY}`
  );
  if (response.data.Error) throw new Error(response.data.Error);
  return response.data;
};

export const fetchTrailer = async (title) => {
  const response = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(title + ' official trailer')}&key=${YOUTUBE_API_KEY}`
  );
  return response.data.items[0]?.id?.videoId || null;
};
