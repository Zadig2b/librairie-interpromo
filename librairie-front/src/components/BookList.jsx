"use client"
import React, { useState, useEffect } from 'react';
import BookTeaser from '../components/BookTeaser'; 
import BookByCatList from '../components/BookByCatList';

export default function BookList({ type, booksprops, categories }) {
  // Render loading or error state
  if ( !booksprops) {
    return <div>Loading...</div>; // Adjust based on your needs
  }

  return (
    <div className="container">
      <h1>{type}</h1>

      {type !== "Nouveautés" ? (
        // Logic for categories only if type is not "Nouveautés"
        (() => {
          // Vérifiez si les catégories sont définies et non vides
          if (!categories || categories.length === 0) {
            return <div>No categories available</div>;
          }

          // Générer un index aléatoire compris entre 0 et la longueur du tableau des catégories
          const randomIndex = Math.floor(Math.random() * categories.length);
          const randomCategory = categories[randomIndex];

          // Ensure randomCategory is valid before rendering
          if (!randomCategory) {
            return <div>Selected category is not available</div>;
          }

          return (
            <BookByCatList 
              categorie={randomCategory} 
            />
          );
        })()
      ) : (
        <ul className="list-unstyled">
          {booksprops?.map((book) => (
            <li key={book.id} className="mb-3">
              <BookTeaser book={book} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
