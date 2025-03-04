export default function MovieDetails({ movie }) {
  return (
    <div className="mt-6 p-6 border rounded-lg bg-white shadow-md max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{movie.Title}</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={
            movie.Poster !== "N/A" 
              ? movie.Poster 
              : "/placeholder.jpg"
          }
          alt={movie.Title}
          className="w-64 h-96 object-cover rounded-lg mx-auto"
        />
        <div className="space-y-2">
          <p className="text-lg">
            <span className="font-semibold">Release Date:</span>{" "}
            {movie.Released || movie.Year}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Rating:</span>{" "}
            {movie.imdbRating}/10
          </p>
        </div>
      </div>
    </div>
  );
}
