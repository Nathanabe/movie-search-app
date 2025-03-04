import Link from 'next/link';

export default function MovieList({ movies }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {movies.map((movie) => (
        <Link
          key={movie.imdbID}
          href={`/movie/${movie.imdbID}`}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
        >
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
            alt={movie.Title}
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-bold">{movie.Title}</h2>
            <p className="text-gray-600 mt-2">{movie.Year}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
