/* eslint-disable jsx-a11y/anchor-is-valid */
// TMDB API key: 79b6766f2960d692019a0072eacfd852       https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=79b6766f2960d692019a0072eacfd852
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Search from "./components/Search";
import Movie from "./components/Movie";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    if (searchText) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchText}&api_key=79b6766f2960d692019a0072eacfd852&include_adult=false&include_video=true`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setSearchResults(data.results);
        });
    }
  }, [searchText]);

  return (
    <div className="main-container">
      <Navbar searchText={searchText} setSearchText={setSearchText} inputText={inputText} setInputText={setInputText} />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/about" element={<About />} />
        <Route
          path="/search"
          element={
            <Search keyword={searchText} searchResults={searchResults} />
          }
        />
        <Route path="/movies/:id" element={<Movie />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
