"use client";
import React from 'react';
import BookTeaser from '../components/BookTeaser'; 
import BookByCatList from '../components/BookByCatList';

export default function BookList({ type, booksprops, categories }) {
  // Rendre l'état de chargement ou d'erreur
  if (!booksprops) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="container">
      <h1>{type}</h1>

      {type === "AllBooks" ? (
        // Display all books
        <ul className="list-unstyled">
          {booksprops.map((book) => (
            <li key={book.id} className="mb-3">
              <BookTeaser book={book} />
            </li>
          ))}
        </ul>
      ) : type === "Nouveautés" ? (
        // Display the 3 most recent books
        <ul className="list-unstyled">
          {booksprops
            ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Sort by date, most recent first
            .slice(0, 3) // Take only the first 3 books
            .map((book) => (
              <li key={book.id} className="mb-3">
                <BookTeaser book={book} />
              </li>
            ))}
        </ul>
      ) : (
        // Logic for categories if the type is not "Nouveautés" or "AllBooks"
        (() => {
          // Vérifiez si les catégories sont définies et non vides
          if (!categories || categories.length === 0) {
            return <div>No categories available</div>;
          }

          // Générer un index aléatoire compris entre 0 et la longueur du tableau des catégories
          const randomIndex = Math.floor(Math.random() * categories.length);
          const randomCategory = categories[randomIndex];

          // Assurez-vous que randomCategory est valide avant le rendu
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
