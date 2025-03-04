import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchMovieById, fetchTrailer } from '../../utils/api';
import ReviewForm from '../../components/ReviewForm';
import ReviewList from '../../components/ReviewList';

export default function MoviePage() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);
  const [trailerId, setTrailerId] = useState('');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      try {
        // Fetch movie details
        const movieData = await fetchMovieById(id);
        setMovie(movieData);

        // Fetch YouTube trailer
        const trailer = await fetchTrailer(movieData.Title);
        setTrailerId(trailer);

        // Load reviews from localStorage
        const savedReviews = localStorage.getItem(`reviews-${id}`);
        setReviews(savedReviews ? JSON.parse(savedReviews) : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleAddReview = (review) => {
    const newReviews = [...reviews, review];
    setReviews(newReviews);
    localStorage.setItem(`reviews-${id}`, JSON.stringify(newReviews));
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (!movie) return <div className="text-center mt-8">Movie not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">{movie.Title}</h1>
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
            alt={movie.Title}
            className="w-64 h-96 object-cover rounded-lg"
          />
          <div className="space-y-2">
            <p><strong>Release Date:</strong> {movie.Released}</p>
            <p><strong>Rating:</strong> {movie.imdbRating}/10</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
          </div>
        </div>

        {trailerId && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Trailer</h2>
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${trailerId}`}
                className="w-full h-full rounded-lg"
                allowFullScreen
              />
            </div>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          <ReviewForm onSubmit={handleAddReview} />
          <ReviewList reviews={reviews} />
        </div>
      </div>
    </div>
  );
}
