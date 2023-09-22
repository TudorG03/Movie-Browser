import React, { useState, useEffect, useRef } from "react";
import { Carousel, Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { BounceLoader } from "react-spinners";

function Card({ movie, orientation, updateBg }) {
  const target = orientation === "poster_path" ? "" : "_blank";

  const [isHovered, setIsHovered] = useState(false);

  const handleEnterHover = () => {
    setIsHovered(true);
    const bg = movie.backdrop_path;
    updateBg(bg);
  };

  const handleLeaveHover = () => {
    setIsHovered(false);
    updateBg("");
  };

  const url =
    orientation === "poster_path"
      ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
      : `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  const trailerGradient = {
    backgroundImage: isHovered
      ? `linear-gradient(rgba(68, 27, 77, 0.8), rgba(68, 27, 77, 0.8)), url(${url})`
      : `url(${url})`,
  };

  const date = orientation === "poster_path" && movie.release_date;
  const showButton = isHovered ? "block" : "none";
  const urlVideo = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=79b6766f2960d692019a0072eacfd852`;

  const [trailerKey, setTrailerKey] = useState("");

  if (orientation === "backdrop_path") {
    fetch(urlVideo)
      .then((response) => response.json())
      .then((data) => {
        setTrailerKey(data.results[0].key);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const ytUrl = trailerKey
    ? `https://www.youtube.com/watch?v=${trailerKey}`
    : "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley";

  const location =
    orientation === "poster_path" ? `/movies/${movie.id}` : ytUrl;

  return (
    <div className="col-lg-3 d-flex align-items-stretch">
      <Link to={location} target={target} style={{ textDecoration: "none" }}>
        <div
          className="card border-0 rounded"
          style={{ backgroundColor: "transparent" }}
          onMouseEnter={handleEnterHover}
          onMouseLeave={handleLeaveHover}
        >
          {orientation === "poster_path" ? (
            <img
              src={url}
              className="card-img-top"
              alt={movie.original_title}
              style={{
                borderRadius: "15px",
                marginBottom: "1em",
                zIndex: "200",
              }}
            />
          ) : (
            <div
              className="trailer-image d-flex justify-content-center align-items-center"
              style={trailerGradient}
            >
              <i
                className="fa fa-play-circle-o"
                style={{
                  fontSize: "50px",
                  color: "#FFF",
                  display: showButton,
                }}
              ></i>
            </div>
          )}
          <div className="card-text">
            <p className="card-title">{movie.original_title}</p>
            <p>{date}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

function TrendingCarousel({ orientation, movieList }) {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const url = `https://api.themoviedb.org/3/movie/${movieList}?language=en-US&page=1&api_key=79b6766f2960d692019a0072eacfd852&append_to_response=videos`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setTrendingMovies(data.results);
      });
  }, [trendingMovies, url]);

  const num = orientation === "poster_path" ? 4 : 3;

  const reduceMovies = (acc, cur, index) => {
    const groupIndex = Math.floor(index / num);
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(cur);
    return acc;
  };

  const [bg, setBg] = useState();

  const updateBg = (bg) => {
    setBg(bg);
  };

  const customBg = {
    backgroundImage:
      orientation === "backdrop_path" &&
      bg &&
      `linear-gradient(rgba(70,70,70,.6), rgba(70,70,70,.6)), url(https://image.tmdb.org/t/p/original${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: orientation === "backdrop_path" && "10px",
    paddingTop: orientation === "backdrop_path" && "5em",
  };

  const ref = useRef(null);

  const onPrevClick = () => {
    ref.current.prev();
  };
  const onNextClick = () => {
    ref.current.next();
  };

  return (
    <div style={customBg} className="trailers-container position-relative">
      <Container
        className="position-absolute"
        style={{ zIndex: "1000", top: "50%" }}
      >
        <Row className="position-relative">
          <Button
            variant="primary"
            onClick={onPrevClick}
            style={{ position: "absolute", left: "0", borderRadius: "100px" }}
          >
            <p style={{ fontWeight: "900", margin: ".5em" }}>{"<"}</p>
          </Button>
          <Button
            variant="primary"
            onClick={onNextClick}
            style={{ position: "absolute", right: "0", fontWeight: "900", borderRadius: "100px" }}
          >
            <p style={{ fontWeight: "900", margin: ".5em" }}>{">"}</p>
          </Button>
        </Row>
      </Container>
      <Carousel indicators={false} controls={false} className="p-5" ref={ref}>
        {trendingMovies.reduce(reduceMovies, []).map((item, index) => (
          <Carousel.Item key={index}>
            <div className="d-flex justify-content-center">
              {item.map((item, index) => {
                return (
                  <Card
                    movie={item}
                    orientation={orientation}
                    updateBg={updateBg}
                  />
                );
              })}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

function HeroCarousel({ iconicMovies }) {
  return (
    <Carousel controls={false} indicators={false}>
      {iconicMovies.map((item, i) => {
        return (
          <Carousel.Item key={i} style={{ height: "20em", opacity: ".8" }}>
            <img
              className="d-block w-100 img-fluid"
              src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
              alt="movie backdrop"
            />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

function RandomMovie() {
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [randomMovie, setRandomMovie] = useState({});

  const handleClick = () => {
    setLoading(true);
    fetch(
      "https://api.themoviedb.org/3/movie/latest?api_key=79b6766f2960d692019a0072eacfd852"
    )
      .then((response) => response.json())
      .then((data) => {
        const randNum = Math.floor(Math.random() * data.id);
        fetch(
          `https://api.themoviedb.org/3/movie/${randNum}?language=en-US&api_key=79b6766f2960d692019a0072eacfd852&include_adult=false`
        )
          .then((response) => response.json())
          .then((data) => {
            setRandomMovie(data);
            setClicked(true);
            setLoading(false);
          });
      });
  };
  if (randomMovie.success === false || randomMovie.adult === true) {
    return (
      <div className="container">
        <button
          className="btn mt-5"
          style={{ border: "3px solid #74d6da" }}
          onClick={handleClick}
        >
          Surprise me
        </button>
        <div
          className="my-5"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1533654918788-bb60458d80aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80)`,
            backgroundPosition: "0 30%",
            backgroundSize: "cover",
            height: "10em",
            borderRadius: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 style={{ color: "#FF0A01", fontSize: "5em" }}>TRY AGAIN</h1>
        </div>
      </div>
    );
  }

  let genres = [];
  if (randomMovie.genres && randomMovie.genres.length > 0) {
    genres = randomMovie.genres.map((item) => {
      return item.name + " ";
    });
  } else {
    genres.push("unknown");
  }

  const backdropUrl = randomMovie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`
    : "";

  return (
    <div className="container">
      <button
        className="btn mt-5"
        style={{ border: "3px solid #74d6da" }}
        onClick={handleClick}
      >
        Surprise me
      </button>
      {loading ? (
        <div
          className="container d-flex justify-content-center align-items-center"
          style={{ height: "10em" }}
        >
          <BounceLoader color={"#fff"} size={50} />
        </div>
      ) : (
        <div>
          {!clicked ? (
            <div
              className="my-5"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1533654918788-bb60458d80aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80)`,
                backgroundPosition: "0 30%",
                backgroundSize: "cover",
                height: "10em",
                borderRadius: "15px",
              }}
            ></div>
          ) : (
            <div className="movieDetailsPage container">
              <div className="row p-2">
                <div className="col-md-3 d-flex justify-content-center align-items-center">
                  <img
                    src={
                      randomMovie.poster_path
                        ? `https://image.tmdb.org/t/p/original${randomMovie.poster_path}`
                        : "https://media.istockphoto.com/id/1023946126/vector/big-movie-reel-open-clapper-board-popcorn-box-package-ticket-admit-one-three-star-cinema.jpg?s=612x612&w=0&k=20&c=_f9dhpn1WUxbLsxXWuJb0jhmn4dBS2yAEa2TVIkn70E="
                    }
                    className="img-fluid rounded shadow"
                    alt="..."
                  />
                </div>
                <div
                  className="col-md-9 my-5 p-4"
                  style={{
                    backgroundImage: `linear-gradient(rgba(70,70,70,.6), rgba(70,70,70,.6)), url(${backdropUrl})`,
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                    borderRadius: "15px",
                  }}
                >
                  <h2 className="mb-4">{randomMovie.original_title}</h2>
                  <p className="lead">
                    <span className="h3">Genres: </span>
                    {genres}
                  </p>
                  <p className="lead">
                    <span className="h3">Release date: </span>
                    {randomMovie.release_date
                      ? randomMovie.release_date
                      : "unknown"}
                  </p>
                  <p className="lead">
                    <span className="h3">Rating: </span>{" "}
                    {randomMovie.vote_average &&
                      randomMovie.vote_average.toFixed(1)}{" "}
                    ({randomMovie.vote_count} votes)
                  </p>
                  <p className="lead">{randomMovie.overview}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [iconicMovies, setIconicMovies] = useState([]);
  const url =
    "https://api.themoviedb.org/3/movie/top_rated/?language=en-US&api_key=79b6766f2960d692019a0072eacfd852";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setIconicMovies(data.results.slice(0, 10));
    });

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container-fluid">
          <div className="row">
            <HeroCarousel iconicMovies={iconicMovies} />
            <div className="home-hero m-5">
              <h1>Welcome.</h1>
              <p className="lead">
                Millions of movies to discover. Explore now.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="container">
              <p className="mt-5 h2">Trending</p>
              <div class="hr"></div>
              <TrendingCarousel
                orientation={"poster_path"}
                movieList={"popular"}
              />
            </div>
          </div>
          <div className="row mt-5">
            <div className="container">
              <p className="mt-5 h2">Trailers on theater</p>
              <div class="hr"></div>
              <TrendingCarousel
                orientation={"backdrop_path"}
                movieList={"now_playing"}
              />
            </div>
          </div>
          <div className="row">
            <div className="container">
              <p className="mt-5 h2">Upcoming</p>
              <div class="hr"></div>
              <TrendingCarousel
                orientation={"poster_path"}
                movieList={"upcoming"}
              />
            </div>
          </div>
          <div className="container">
            <div class="hr"></div>
            <RandomMovie />
          </div>
        </div>
      )}
    </>
  );
}
