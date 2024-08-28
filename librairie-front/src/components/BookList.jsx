"use client";
import React from 'react';
import BookTeaser from '../components/BookTeaser'; 
import BookByCatList from '../components/BookByCatList';

export default function BookList({ type, booksprops, categories, handleDeleteBook }) {
  // Rendre l'état de chargement ou d'erreur
  if (!booksprops) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="container">
      <h1>{type}</h1>
      <hr className="my-4" style={{border: '5px solid #BFE4FF' }} />

      {type === "Nos Livres" ? (
        // Display all books
        <div className="row">
          {booksprops.map((book) => (
            <div key={book.id} className="col-md-4 mb-4">
              <BookTeaser book={book} onDelete={handleDeleteBook}/>
            </div>
          ))}
        </div>
      ) : type === "Nouveautés" ? (
        // Afficher les 3 livres les plus récents
        <div className="row">
          {booksprops
            ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Trier par date, le plus récent en premier
            .slice(0, 3) // Ne prendre que les 3 premiers livres
            .map((book) => (
              <div key={book.id} className="col-md-4 mb-4">
                <BookTeaser book={book} />
              </div>
            ))}
        </div>
      ) : (
        // Logique pour les catégories si le type n'est pas "Nouveautés" ou "AllBooks"
        (() => {
          // Vérifiez si les catégories sont définies et non vides
          if (!categories || categories.length === 0) {
            return <div>No categories available</div>;
          }

          // Générer un index aléatoire compris entre 0 et la longueur du tableau des catégories
          const randomIndex = Math.floor(Math.random() * categories.length);
          const randomCategory = categories[randomIndex];

          // on s'assure que randomCategory est valide avant le rendu
          if (!randomCategory) {
            return <div>Selected category is not available</div>;
          }

          return (
            <BookByCatList 
              categorie={randomCategory} 
            />
          );
        })()
      )}
    </div>
  );
}
