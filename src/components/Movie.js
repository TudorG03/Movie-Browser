import React from "react";
import Hero from "./Hero";
import Loading from "./Loading";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Movie() {
  const { id } = useParams();

  const [movieDetails, setMovieDetails] = useState({});
  const [movieTrailer, setMovieTrailer] = useState({});
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=79b6766f2960d692019a0072eacfd852`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovieDetails(data);
        isLoading(false);
      });
  }, [id]);

  const urlVideo = `https://api.themoviedb.org/3/movie/${movieDetails.id}/videos?api_key=79b6766f2960d692019a0072eacfd852`;
  useEffect(() => {
    fetch(urlVideo)
      .then((response) => response.json())
      .then((data) => {
        setMovieTrailer(data);
        isLoading(false);
      });
  }, [id, urlVideo]);

  const trailerUrl = (movieTrailer.results && movieTrailer.results[0])
    ? `https://www.youtube.com/watch?v=${movieTrailer.results[0].key}`
    : "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley";
  const openTrailer = (url) => {
    window.open(trailerUrl, "_blank");
  };

  function renderMovieDetails() {
    if (loading) {
      return <Loading />;
    } else {
      const posterUrl = movieDetails.poster_path
        ? `https://image.tmdb.org/t/p/original${movieDetails.poster_path}`
        : "https://media.istockphoto.com/id/1023946126/vector/big-movie-reel-open-clapper-board-popcorn-box-package-ticket-admit-one-three-star-cinema.jpg?s=612x612&w=0&k=20&c=_f9dhpn1WUxbLsxXWuJb0jhmn4dBS2yAEa2TVIkn70E=";
      const backdropUrl = `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`;
      let genres = [];
      if (movieDetails.genres && movieDetails.genres.length > 0) {
        genres = movieDetails.genres.map((item) => {
          return item.name + " ";
        });
      } else {
        genres.push("unknown");
      }

      return (
        <>
          <Hero text={movieDetails.original_title} backdrop={backdropUrl} />
          <div className="movieDetailsPage container">
            <div className="row p-2">
              <div className="col-md-3 d-flex justify-content-center align-items-center">
                <img
                  src={posterUrl}
                  className="img-fluid rounded shadow"
                  alt="..."
                />
              </div>
              <div className="col-md-9 my-5">
                <h2 className="mb-4">
                  {movieDetails.original_title} (
                  {movieDetails.release_date ? movieDetails.release_date.substr(0, 4) : "unknown"})
                </h2>
                <p className="lead">
                  <span className="h3">Genres: </span>
                  {genres}
                </p>
                <p className="lead">
                  <span className="h3">Release date: </span>
                  {movieDetails.release_date}
                </p>
                <p className="lead">
                  <span className="h3">Rating: </span>{" "}
                  {movieDetails.vote_average && movieDetails.vote_average.toFixed(1)} (
                  {movieDetails.vote_count} votes)
                </p>
                <p className="lead">{movieDetails.overview}</p>
                <button className="btn" onClick={() => openTrailer(trailerUrl)}>
                  Trailer
                </button>
              </div>
            </div>
          </div>
        </>
      );
    }
  }

  return renderMovieDetails();
}
