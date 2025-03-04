import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;

export const fetchMovie = async (title) => {
  if (!title.trim()) throw new Error('Please enter a movie title.');
  try {
    const response = await axios.get(
      `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${API_KEY}`
    );
    if (response.data.Error) throw new Error(response.data.Error);
    return response.data;
  } catch (err) {
    throw new Error(err.message || 'Failed to fetch movie.');
  }
};
