import React from "react";

export default function NotFound() {
  const notFoundUrl =
    "https://unblast.com/wp-content/uploads/2018/06/404-Website-Page-Template.jpg";
  return (
    <div
      class="container-fluid not-found"
      style={{ backgroundImage: `url(${notFoundUrl})`, backgroundPosition: "center", backgroundSize: "cover" }}
    ><h1 className="text-center mt-5">Ooops! Page not found</h1></div>
  );
}
