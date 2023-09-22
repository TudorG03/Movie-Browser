import React from "react";
import Hero from "./Hero";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://media.istockphoto.com/id/1023946126/vector/big-movie-reel-open-clapper-board-popcorn-box-package-ticket-admit-one-three-star-cinema.jpg?s=612x612&w=0&k=20&c=_f9dhpn1WUxbLsxXWuJb0jhmn4dBS2yAEa2TVIkn70E=";
  const location = `/movies/${movie.id}`;

  return (
    <div className="col-lg-2 col-md-3 col-4 my-5 d-flex align-items-stretch">
      <div className="card shadow-lg" style={{border: "none", backgroundColor: "#212121", borderRadius: "20px"}}>
        <img
          src={posterUrl}
          className="card-img-top"
          alt={movie.original_title}
          style={{borderRadius: "20px"}}
        />
        <div className="card-body d-flex flex-column justify-content-center align-items-center">
          <h5 className="card-title text-light" style={{color: "#000"}}>{movie.original_title}</h5>
          <Link to={location} className="btn btn-primary">
            Show details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function Search({ keyword, searchResults }) {
  const title = `You are searching for ${keyword}`;
  const resultsHTML = searchResults.map((obj, i) => {
    return <MovieCard movie={obj} key={i} />;
  });

  return (
    <>
      <Hero text={title} backdrop={"https://www.themoviedb.org/t/p/original/dqK9Hag1054tghRQSqLSfrkvQnA.jpg"}/>
      {resultsHTML.length ? (
        <div className="container-fluid px-5">
          <div className="row">{resultsHTML}</div>
        </div>
      ) : (
        <div className="container-fluid no-results d-flex justify-content-center align-items-center">
          <h1>No results for <strong>{keyword}</strong>!</h1>
        </div>
      )}
    </>
  );
}
