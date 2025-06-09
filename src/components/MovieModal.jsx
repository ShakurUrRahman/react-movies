import React from "react";

const MovieModal = ({ movieDetails, setOpenModal }) => {
	console.log(movieDetails);
	const {
		name,
		vote_average,
		vote_count,
		popularity,
		first_air_date,
		type,
		episode_run_time,
		backdrop_path,
		poster_path,
		original_language,
		poster,
		trailer,
		overview,
		releaseDate,
		countries,
		status,
		language,
		budget,
		revenue,
	} = movieDetails;

	return (
		<div>
			<div className="absolute left-0 top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50">
				<div className="relative mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10">
					<div className="movie-modal">
						<button
							onClick={setOpenModal}
							className="text-[#A8B5DB] cursor-pointer flex justify-end items-center absolute top-4 right-4 hover:text-white transition-colors duration-300"
						>
							X
						</button>
						<div className="p-12">
							{/* Title & Rating */}
							<div className="flex justify-between items-center mb-[30px]">
								<div>
									<h1 className="text-4xl font-bold">
										{name}
									</h1>

									<div className="flex gap-2 text-[#A8B5DB]">
										<p>
											{first_air_date
												? first_air_date.split("-")[0]
												: "N/A"}
										</p>
										<span>•</span>
										<p>{type}</p>
										<span>•</span>
										<p>
											{episode_run_time &&
											episode_run_time.length > 0
												? `${episode_run_time[0]} min`
												: "N/A"}
										</p>
									</div>
								</div>

								<div className="flex items-center gap-[10px]">
									<div className="flex items-center gap-1 bg-[#221F3D] px-4 py-[11px] rounded-md h-fit ">
										<img
											className="w-4 h-4"
											src="/star.svg"
											alt="star rating"
										/>
										<p className="text-[#A8B5DB] text-sm leading-none">
											<span className="text-white align-middle">
												{vote_average
													? vote_average.toFixed(1)
													: "N/A"}
											</span>
											/10 (
											{vote_count >= 1000
												? vote_count + "K"
												: vote_count}
											)
										</p>
									</div>
									<div className="flex items-center gap-1 bg-[#221F3D] px-3 py-[8px] rounded-md h-fit ">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
										>
											<path
												d="M16.4325 6.85L17.8725 8.29L12.9925 13.17L9.7025 9.88C9.3125 9.49 8.6825 9.49 8.2925 9.88L2.2925 15.89C1.9025 16.28 1.9025 16.91 2.2925 17.3C2.6825 17.69 3.3125 17.69 3.7025 17.3L8.9925 12L12.2825 15.29C12.6725 15.68 13.3025 15.68 13.6925 15.29L19.2825 9.71L20.7225 11.15C21.0325 11.46 21.5725 11.24 21.5725 10.8V6.5C21.5825 6.22 21.3625 6 21.0825 6L16.7925 6C16.3425 6 16.1225 6.54 16.4325 6.85Z"
												fill="#A8B5DB"
											/>
										</svg>
										<span className="text-[#A8B5DB]">
											{Math.round(popularity) || "N/A"}
										</span>
									</div>
								</div>
							</div>

							{/* Poster and Trailer */}
							<div className="grid grid-cols-4 gap-6  mb-6">
								<div className="col-span-1">
									<img
										className="w-full rounded-lg"
										src={
											poster_path
												? `https://image.tmdb.org/t/p/w500/${poster_path}`
												: "/no-movie.png"
										}
										alt=""
									/>
								</div>
								<div className="col-span-3">
									<img
										className="w-full rounded-lg h-[341px]"
										src={
											poster_path
												? `https://image.tmdb.org/t/p/w500/${backdrop_path}`
												: "/no-movie.png"
										}
										alt=""
									/>
								</div>
							</div>

							{/* Tags */}
							<div className="flex gap-4">
								<span className="bg-purple-600 px-4 py-1 rounded-full">
									Adventure
								</span>
								<span className="bg-blue-600 px-4 py-1 rounded-full">
									Action
								</span>
								<span className="bg-gray-700 px-4 py-1 rounded-full">
									Drama
								</span>
							</div>

							{/* Overview */}
							<p className="text-gray-300 text-lg">
								Hundreds of cash-strapped players accept a
								strange invitation to compete in children’s
								games. Inside, a tempting prize awaits with
								deadly high stakes: a survival game that has a
								whopping 45.6 billion-won prize at stake.
							</p>

							{/* Details */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-400">
								<div>
									<p>
										<strong className="text-white">
											Release date:
										</strong>{" "}
										December 26, 2024 (Worldwide)
									</p>
									<p>
										<strong className="text-white">
											Countries:
										</strong>{" "}
										United States · Canada · UAE · Hungary ·
										Italy · New Zealand
									</p>
									<p>
										<strong className="text-white">
											Status:
										</strong>{" "}
										Released
									</p>
								</div>
								<div>
									<p>
										<strong className="text-white">
											Language:
										</strong>{" "}
										English · Korean · Hindi · Arabic ·
										German · Spanish
									</p>
									<p>
										<strong className="text-white">
											Budget:
										</strong>{" "}
										$21.4 million
									</p>
									<p>
										<strong className="text-white">
											Revenue:
										</strong>{" "}
										$800 million
									</p>
								</div>
							</div>

							{/* Tagline and Button */}
							<div className="flex flex-col md:flex-row justify-between items-center mt-6">
								<p className="italic text-pink-400 text-lg">
									45.6 Billion Won is Child’s Play
								</p>
								<button className="bg-purple-600 text-white mt-4 md:mt-0 px-4 py-2 rounded-full font-semibold">
									Visit Homepage
								</button>
							</div>

							{/* Production Companies */}
							<p className="text-sm text-gray-400">
								<strong className="text-white">
									Production Companies:
								</strong>{" "}
								Legendary Entertainment · Warner Bros.
								Entertainment · Villeneuve Films
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieModal;
