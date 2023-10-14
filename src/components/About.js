import React from "react";
import Hero from "./Hero";

export default function About() {
  return (
    <div>
      <Hero text="About Us" />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 my-5">
            <h1>Movie Browser- Your Ultimate Movie Database Experience!</h1>
            <ul>
              <li>
                <p className="lead"><em>Vast Movie Collection</em>: Our extensive database is home to thousands of movies, from classic films to the latest blockbusters. You'll find information on cast, crew, plot summaries, trailers, and much more.</p>
              </li>
              <li>
                <p className="lead"><em>User-Friendly Interface</em>: We've designed our app with you in mind. Navigating through our movie database is a breeze, ensuring that you can find the information you need quickly and effortlessly.</p>
              </li>
              <li>
                <p className="lead"><em>News and Updates</em>: Stay up-to-date with the latest movie news, release schedules, and industry insights. We've got your finger on the pulse of the movie world.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
