// components/BookTeaser.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function BookTeaser({ book }) {
  const { image, titre, editeur, categorie, prix, auteur } = book;
  console.log(book);
  const categoryName = categorie?.nom || 'N/A';

  return (
    <div className="card mb-3" style={{ maxWidth: '540px' }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={image} alt={titre} className="img-fluid rounded-start" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{titre}</h5>
            <p className="card-text"><strong>Auteur:</strong> {auteur}</p>
            <p className="card-text"><strong>Genre:</strong> {categoryName}</p>
            <p className="card-text"><strong>Prix:</strong> ${prix.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

