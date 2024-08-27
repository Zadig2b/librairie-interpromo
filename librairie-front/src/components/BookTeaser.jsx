// components/BookTeaser.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";

export default function BookTeaser({ book }) {
  const { id, image, titre, editeur, categorie, prix, auteur } = book;
  const categoryName = categorie?.nom || "N/A";
  const router = useRouter(); // Initialiser useRouter

  // Gérez le clic pour accéder à la page de détails du livre
  const handleClick = () => {
    router.push(`/books/${id}`); // Accédez à la page de détails du livre
  };

  return (
    <div
      className="card mb-3"
      style={{ maxWidth: "300px", cursor: "pointer" }}
      onClick={handleClick} // Add onClick event
    >
      {/* Image Section */}
      <img
        src={image}
        alt={titre}
        className="card-img-top"
        style={{ maxWidth: "100%", height: "auto" }} // Ensure the image spans full width of the card
      />

      {/* Content Section */}
      <div className="card-body d-flex" style={{ maxWidth: "100%" }}>
        {/* Text Section: Title, Author, and Genre */}
        <div className="flex-grow-1 pe-3">
          <h5 className="card-title">{titre}</h5>
          <p className="card-text">
            <h5>{auteur}</h5>
          </p>
          {categoryName !== "N/A" && (
            <p className="card-text">
              {categoryName}
            </p>
          )}
        </div>

        {/* Price Section */}
        <div className="d-flex align-items-start">
          <p className="card-text mb-0">
            <strong>${prix.toFixed(2)}</strong> 
          </p>
        </div>
      </div>
    </div>
  );
}
