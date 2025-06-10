import React from "react";
import Spinner from "./Spinner";

const MovieModal = ({ movieDetails, setOpenModal, tvSeriesDetailsLoading }) => {
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
		genres,
		overview,
		production_countries,
		number_of_episodes,
		number_of_seasons,
		spoken_languages,
		production_companies,
		status,
	} = movieDetails;

	return (
		<div>
			<div className="fixed inset-0 w-full overflow-y-auto bg-slate-800/50 backdrop-blur-sm z-50 sm:py-6 sm:px-3 md:py-12 md:px-16 lg:py-20 lg:px-28">
				<div className="relative mx-auto bg-slate-900 lg:p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10">
					{tvSeriesDetailsLoading ? (
						<div className="flex justify-center">
							{" "}
							<Spinner />
						</div>
					) : (
						<div className="movie-modal">
							<button
								onClick={setOpenModal}
								className="text-[#A8B5DB] cursor-pointer flex justify-end items-center absolute top-4 right-4 hover:text-white transition-colors duration-300"
							>
								X
							</button>
							<div className="p-12">
								<div className="flex flex-col xl:flex-row justify-between items-center mb-[30px]">
									<div>
										<h1 className="text-4xl font-bold leading-12 xl:leading-12">
											{name}
										</h1>

										<div className="flex gap-2 text-[#A8B5DB] mb-3 xl:mb-0">
											<p>
												{first_air_date
													? first_air_date.split(
															"-"
													  )[0]
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
														? vote_average.toFixed(
																1
														  )
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
												{Math.round(popularity) ||
													"N/A"}
											</span>
										</div>
									</div>
								</div>
								<div className="grid grid-cols-6 gap-6 mb-6">
									<div className="col-span-2 hidden xl:block">
										<img
											className="w-full rounded-lg h-[441px]"
											src={
												poster_path
													? `https://image.tmdb.org/t/p/w500/${poster_path}`
													: "/no-movie.png"
											}
											alt=""
										/>
									</div>
									<div className="col-span-6 xl:col-span-4">
										<img
											className="xl:w-full rounded-lg xl:h-[441px] "
											src={
												poster_path
													? `https://image.tmdb.org/t/p/w500/${backdrop_path}`
													: "/no-movie.png"
											}
											alt=""
										/>
									</div>
								</div>
								<div className="flex justify-between text-sm lg:text-lg">
									<table className="w-full text-sm text-[#A8B5DB]">
										<tbody>
											<tr>
												<td className="py-2 pr-4 text-[#A8B5DB] whitespace-nowrap">
													Genres
												</td>
												<td className="py-2">
													<div className="flex flex-wrap gap-2">
														{genres &&
														genres.length > 0
															? genres.map(
																	(genre) => (
																		<span
																			key={
																				genre.id
																			}
																			className="bg-[#221F3D] font-semibold text-white px-3 py-1 rounded-[6px]"
																		>
																			{
																				genre.name
																			}
																		</span>
																	)
															  )
															: ""}
													</div>
												</td>
											</tr>
											<tr className="align-top">
												<td className="py-2 pr-4 text-[#A8B5DB] whitespace-nowrap font-normal">
													Overview
												</td>
												<td className="py-2 text-white leading-[28px] font-normal">
													{overview}
												</td>
											</tr>
											<tr>
												<td className="text-[#A8B5DB] py-2 pr-4 whitespace-nowrap font-normal">
													Release Date
												</td>
												<td className="py-2 text-[#D6C7FF] font-semibold">
													{new Date(
														first_air_date
													).toLocaleDateString(
														"en-US",
														{
															year: "numeric",
															month: "long",
															day: "numeric",
														}
													)}{" "}
													(Worldwide)
												</td>
											</tr>
											<tr>
												<td className="text-[#A8B5DB] py-2 pr-4 whitespace-nowrap font-normal">
													Countries
												</td>
												{production_countries &&
													production_countries.length >
														0 && (
														<td className="py-2 text-[#D6C7FF] font-semibold">
															{production_countries
																.map(
																	(country) =>
																		country.name
																)
																.join(" • ")}
														</td>
													)}
											</tr>
											<tr>
												<td className="py-2 pr-4 text-[#A8B5DB] whitespace-nowrap">
													Status
												</td>
												<td className="py-2 text-[#D6C7FF] font-semibold">
													{status || "N/A"}
												</td>
											</tr>
											<tr>
												<td className="py-2 pr-4 text-[#A8B5DB] whitespace-nowrap">
													Language
												</td>
												<td className="py-2 text-[#D6C7FF] font-semibold">
													{spoken_languages &&
													spoken_languages.length > 0
														? spoken_languages
																.map(
																	(lang) =>
																		lang.english_name
																)
																.join(" • ")
														: "N/A"}
												</td>
											</tr>
											<tr>
												<td className="py-2 pr-4 text-[#A8B5DB] whitespace-nowrap">
													No. of Episodes
												</td>
												<td className="py-2 text-[#D6C7FF] font-semibold">
													{number_of_episodes}
												</td>
											</tr>
											<tr>
												<td className="py-2 pr-4 text-[#A8B5DB] whitespace-nowrap">
													No. of Seasons
												</td>
												<td className="py-2 text-[#D6C7FF] font-semibold">
													{number_of_seasons}
												</td>
											</tr>
											<tr>
												<td className="py-2 pr-4 text-[#A8B5DB] whitespace-nowrap">
													Type
												</td>
												<td className="py-2 text-[#D6C7FF] font-semibold">
													{type || "N/A"}
												</td>
											</tr>
											<tr>
												<td className="py-2 pr-4 text-[#A8B5DB] whitespace-nowrap">
													Production <br /> Companies
												</td>
												{production_companies &&
													production_companies.length >
														0 && (
														<td className="py-2 text-[#D6C7FF] font-semibold">
															{production_companies
																.map(
																	(company) =>
																		company.name
																)
																.join(" • ")}
														</td>
													)}
											</tr>
										</tbody>
									</table>
									<div className="hidden xl:block">
										<button
											onClick={() =>
												(window.location.href = "/")
											}
											className="py-[10px] px-5 rounded-md cursor-pointer text-[#121212] font-semibold flex"
											style={{
												background:
													"linear-gradient(90deg, #D6C7FF 0%, #AB8BFF 100%)",
											}}
										>
											<span className="whitespace-nowrap">
												Visit Homepage
											</span>

											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="22"
												height="22"
												viewBox="0 0 22 22"
												fill="none"
												className=" ml-2"
											>
												<path
													d="M17.6004 11L13.2004 5.86664M17.6004 11L13.2004 16.1333M17.6004 11L4.40039 11"
													stroke="#121212"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</button>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default MovieModal;
