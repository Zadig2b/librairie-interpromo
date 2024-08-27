// components/BookTeaser.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";

export default function BookTeaser({ book }) {
  const { id, image, titre, editeur, categorie, prix, auteur } = book;
  const categoryName = categorie?.nom || "N/A";
  const router = useRouter(); // Initialize useRouter

  // Handle click to navigate to book details page
  const handleClick = () => {
    router.push(`/books/${id}`); // Navigate to the book details page
  };

  return (
    <div
      className="card mb-3"
      style={{ maxWidth: "540px", cursor: "pointer" }}
      onClick={handleClick} // Add onClick event
    >
      <div className="row g-0">
        <div className="col-md-12 d-flex flex-column align-items-center text-center">
          {/* Image Section */}
          <img
            src={image}
            alt={titre}
            className="img-fluid rounded mb-3"
            style={{ maxWidth: "200px", height: "auto" }}
          />

          {/* Content Section */}
          <div className="card-body">
            <h5 className="card-title">{titre}</h5>
            <p className="card-text">
              <strong>Auteur:</strong> {auteur}
            </p>
            {categoryName!="N/A" && (
              <p className="card-text">
                <strong>Genre:</strong> {categoryName}
              </p>
            )}
            <p className="card-text">
              <strong>Prix:</strong> ${prix.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
