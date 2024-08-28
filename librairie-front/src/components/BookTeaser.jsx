import React from 'react';


import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext'; // Importer le contexte d'authentification
import '@/app/books/page.css';

export default function BookTeaser({ book }) {
  const { id, image, titre, editeur, categorie, prix, auteur } = book;
  const categoryName = categorie?.nom || "N/A";
  const router = useRouter();
  const { user } = useAuth(); // Récupérer l'utilisateur connecté

  // Gérez le clic pour accéder à la page de détails du livre
  const handleClick = () => {
    router.push(`/books/${id}`);
  };

  // Gestion de la suppression d'un livre (à implémenter)
  const handleDelete = () => {
    // Ajouter la logique pour supprimer le livre ici
    console.log(`Supprimer le livre avec l'ID: ${id}`);
  };

  // Gestion de l'édition d'un livre (à implémenter)
  const handleEdit = () => {
    router.push(`/books/edit/${id}`);
  };

  return (
    <div
      className="card mb-3"
      style={{ maxWidth: "300px", cursor: "pointer" }}
      onClick={handleClick}
    >
      {/* Section de l'image */}
      <img
        src={image}
        alt={titre}
        className="card-img-top"
        style={{ maxWidth: "100%", height: "auto" }}
      />

      {/* Section du contenu */}
      <div className="card-body d-flex" style={{ maxWidth: "100%" }}>
        {/* Section du texte: Titre, Auteur, et Genre */}
        <div className="flex-grow-1 pe-3">
          <h5 className="card-title">{titre}</h5>
          <div className="card-text">
            <h5>{auteur}</h5>
          </div>
          {categoryName !== "N/A" && (
            <p className="card-text">
              {categoryName}
            </p>
          )}
        </div>

        {/* Section du prix */}
        <div className="d-flex align-items-start">
          <p className="card-text mb-0 fs-3 text-end">
            <strong>{prix.toFixed(2)}€</strong>
          </p>
        </div>
      </div>

      {/* Section des icônes d'édition et de suppression pour les utilisateurs autorisés */}
      {user?.roles.includes('ROLE_ADMIN') && (
    <div className="d-flex justify-content-end">
        <button className="btn btn-link p-0 me-3" onClick={handleEdit} aria-label="Éditer">
            <i className="bi bi-pencil"></i>
        </button>
        <button className="btn btn-link p-0" onClick={handleDelete} aria-label="Supprimer">
            <i className="bi bi-trash"></i>
        </button>
    </div>
)}

    </div>
  );
}
