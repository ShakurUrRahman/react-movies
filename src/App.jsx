import { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { getTrendingMovies, updateSearchCount } from "./appwrite";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${API_KEY}`,
	},
};

const App = () => {
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const [tvSeries, setTvSeries] = useState([]);

	const [errorMessage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isTrendingLoading, setIsTrendingLoading] = useState(false);
	const [tvSeriesDetailsLoading, setTvSeriesDetailsLoading] = useState(false);

	const [trendingMovies, setTrendingMovies] = useState([]);
	const [movieDetails, setMovieDetails] = useState({});

	useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

	const fetchMovies = async (query = "") => {
		setIsLoading(true);
		setErrorMessage("");

		try {
			const endpoint = query
				? `${API_BASE_URL}/search/tv?query=${encodeURIComponent(query)}`
				: `${API_BASE_URL}/discover/tv`;

			const response = await fetch(endpoint, API_OPTIONS);

			if (!response.ok) {
				throw new Error("Failed to fetch movies");
			}

			const data = await response.json();

			if (data.Response === "False") {
				setErrorMessage(data.Error || "Failed to fetch movies");
				setTvSeries([]);
				return;
			}

			setTvSeries(data.results || []);

			if (query && data.results.length > 0) {
				await updateSearchCount(query, data.results[0]);
			}
		} catch (error) {
			console.error(`Error fetching movies: ${error}`);
			setErrorMessage("Error fetching movies. Please try again later.");
		} finally {
			setIsLoading(false);
		}
	};

	const loadTrendingMovies = async () => {
		setIsTrendingLoading(true);
		setErrorMessage("");
		try {
			const movies = await getTrendingMovies();

			setTrendingMovies(movies);
		} catch (error) {
			console.error(`Error fetching trending movies: ${error}`);
		} finally {
			setIsTrendingLoading(false);
		}
	};

	const fetchMovieDetails = async (movieId) => {
		setTvSeriesDetailsLoading(true);
		setErrorMessage("");
		try {
			const response = await fetch(
				`${API_BASE_URL}/tv/${movieId}`,
				API_OPTIONS
			);
			if (!response.ok) {
				throw new Error("Failed to fetch movie details");
			}
			const data = await response.json();

			setMovieDetails(data);
		} catch (error) {
			console.error(`Error fetching movie details: ${error}`);
		} finally {
			setTvSeriesDetailsLoading(false);
		}
	};

	useEffect(() => {
		fetchMovies(debouncedSearchTerm);
	}, [debouncedSearchTerm]);

	useEffect(() => {
		loadTrendingMovies();
	}, []);

	return (
		<main>
			<div className="pattern" />
			<div className="wrapper">
				<header>
					<img src="./hero.png" alt="Herp Banner" />
					<h1>
						Find <span className="text-gradient">TV Series</span>{" "}
						You'll Enjoy Without the Hussle
					</h1>
					<Search
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
					/>
				</header>

				{trendingMovies.length > 0 && (
					<section className="trending">
						<h2>Trending TV Series</h2>

						<ul>
							{isTrendingLoading ? (
								<Spinner />
							) : errorMessage ? (
								<p className="text-red-500">{errorMessage}</p>
							) : (
								trendingMovies.map((movie, index) => (
									<li key={movie.$id}>
										<p>{index + 1}</p>
										<img
											src={movie.poster_url}
											alt={movie.title}
										/>
									</li>
								))
							)}
						</ul>
					</section>
				)}

				<section className="all-movies">
					<h2>All TV Series</h2>

					{isLoading ? (
						<Spinner />
					) : errorMessage ? (
						<p className="text-red-500">{errorMessage}</p>
					) : (
						<ul>
							{tvSeries.map((movie) => (
								<MovieCard
									key={movie.id}
									movie={movie}
									fetchMovieDetails={fetchMovieDetails}
									movieDetails={movieDetails}
									tvSeriesDetailsLoading={
										tvSeriesDetailsLoading
									}
									setTvSeriesDetailsLoading={
										setTvSeriesDetailsLoading
									}
								/>
							))}
						</ul>
					)}
				</section>
			</div>
		</main>
	);
};

export default App;
