import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import Spinner from '../components/Spinner';
import { fetchMovies } from '../utils/api';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (searchQuery, pageNum = 1) => {
    setLoading(true);
    try {
      const { movies: results, totalResults } = await fetchMovies(searchQuery, pageNum);
      setQuery(searchQuery);
      setPage(pageNum);
      setMovies(prev => pageNum === 1 ? results : [...prev, ...results]);
      setTotalResults(totalResults);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Movie Search</h1>
        <SearchBar onSearch={handleSearch} />
        {loading && <Spinner />}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <MovieList movies={movies} />
        {movies.length > 0 && movies.length < totalResults && (
          <div className="text-center mt-8">
            <button
              onClick={() => handleSearch(query, page + 1)}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
