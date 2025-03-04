import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import MovieDetails from '../components/MovieDetails';
import Spinner from '../components/Spinner';
import { fetchMovie } from '../utils/api';

export default function Home() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (query) => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchMovie(query);
      setMovie(data);
    } catch (err) {
      setError(err.message);
      setMovie(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Movie Search
        </h1>
        <SearchBar onSearch={handleSearch} />
        {loading && <Spinner />}
        {error && (
          <p className="mt-6 text-center text-red-600 font-medium">{error}</p>
        )}
        {movie && <MovieDetails movie={movie} />}
      </div>
    </div>
  );
}
