/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ searchText, setSearchText, inputText, setInputText }) {
  const navigate = useNavigate();

  const updateInputText = (e) => {
    navigate("/search");
    setInputText(e.target.value);
    setSearchText(e.target.value);
  }

  const formSubmit = click => {
    click.preventDefault();
    navigate("/search");
    setInputText("");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Movie Browser
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse d-lg-flex justify-content-between" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link disabled"
                to="/"
                tabIndex="-1"
                aria-disabled="true"
              >
                Coming Soon
              </Link>
            </li>
          </ul>
          <form className="d-flex">
            <input
              className="form-control"
              type="search"
              placeholder="Find a movie"
              aria-label="Search"
              value={inputText}
              onChange={updateInputText}
              required
              style={{backgroundColor: "#1B061E", color: "#FFF", border: "1px solid #3D3A4E"}}
            />
            <button className=" btn btn-outline-success" type="submit" onClick={formSubmit}>
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
