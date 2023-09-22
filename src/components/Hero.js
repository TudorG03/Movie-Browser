import React from "react";

export default function Hero({ text, backdrop }) {
  return (
    <header className="bg-dark text-white p-5 hero-container d-flex align-items-center">
      <h1 className="hero-text">{text}</h1>
      <div
        className="hero-backdrop"
        style={{ backgroundImage: `url(${backdrop})`, backgroundPosition: 'center 30%'}}
      ></div>
    </header>
  );
}
