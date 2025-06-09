import React, { useState } from "react";
import MovieModal from "./MovieModal";

const MovieCard = ({ movie, fetchMovieDetails, movieDetails }) => {
	const {
		id,
		name,
		vote_average,
		poster_path,
		first_air_date,
		original_language,
	} = movie;
	const [openModal, setOpenModal] = useState(false);

	const handleMovieClick = (id) => {
		setOpenModal(true);
		fetchMovieDetails(id);
	};

	return (
		<div className="movie-card">
			<img
				src={
					poster_path
						? `https://image.tmdb.org/t/p/w500/${poster_path}`
						: "/no-movie.png"
				}
				alt={name}
			/>

			<div className="mt-4">
				<h3
					onClick={() => handleMovieClick(id)}
					className="hover:underline cursor-pointer"
				>
					{name}
				</h3>

				<div className="content">
					<div className="rating">
						<img src="star.svg" alt="Star Icon" />
						<p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
					</div>

					<span>•</span>
					<p className="lang">{original_language}</p>

					<span>•</span>
					<p className="year">
						{first_air_date ? first_air_date.split("-")[0] : "N/A"}
					</p>
				</div>
			</div>
			{openModal && (
				<MovieModal
					movieDetails={movieDetails}
					setOpenModal={() => setOpenModal(false)}
				/>
			)}
		</div>
	);
};
export default MovieCard;
