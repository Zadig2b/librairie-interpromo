// components/BookTeaser.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import '@/app/books/page.css';

export default function BookTeaser({ book }) {
  const { id, image, titre, editeur, categorie, prix, auteur } = book;
  const categoryName = categorie?.nom || 'N/A';
  const router = useRouter(); // Initialize useRouter

  // Handle click to navigate to book details page
  const handleClick = () => {
    router.push(`/books/${id}`); // Navigate to the book details page
  };

  return (
    <div 
      className="card mb-2" 
      style={{ maxWidth: '540px', cursor: 'pointer' }} 
      onClick={handleClick} // Add onClick event
    >
      <div className="row g-2">
        <div className="col-md-12 d-flex flex-column align-items-start text-">
          {/* Image Section */}
          <img src={book.image} alt={book.titre} className="book-image" />
          <div className="card-body">
            <h6 className="card-title">{book.titre}</h6>
            <p className="card-text"><strong>Auteur:</strong> {book.auteur}</p>
            <p className="card-text"><strong>Genre:</strong> {book.categoryName}</p>
            <p className="price"><strong>Prix:</strong> ${book.prix.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
