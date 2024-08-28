import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import '@/app/books/page.css';

export default function BookTeaser({ book, onDelete }) {
  const { id, image, titre, editeur, categorie, prix, auteur, quantite } = book;
  const categoryName = categorie?.nom || "N/A";
  const router = useRouter();
  const { user } = useAuth();

  const [message, setMessage] = useState(null);

  const handleClick = () => {
    router.push(`/books/${id}`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the book: ${titre}?`);
    
    if (!confirmDelete) {
      return;
    }

    try {
      const token = Cookies.get('token');

      if (!token) {
        setMessage({ text: 'No token found, user might not be authenticated.', type: 'error' });
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/livre/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMessage({ text: `Book "${titre}" deleted successfully.`, type: 'success' });
        if (onDelete) onDelete(id); // Call the onDelete callback to remove the book from the UI
      } else {
        const errorData = await response.json();
        setMessage({ text: `Failed to delete the book: ${errorData.error}`, type: 'error' });
      }
    } catch (error) {
      setMessage({ text: `An unexpected error occurred: ${error.message}`, type: 'error' });
    }
  };

  const handleEdit = () => {
    router.push(`/books/edit/${id}`);
  };

  return (
    <div
      className="card mb-3"
      style={{ maxWidth: "300px" }}
    >
      <img
        src={image}
        alt={titre}
        className="card-img-top"
        style={{ maxWidth: "100%", height: "auto", cursor: "pointer" }}
        onClick={handleClick}
      />

<div className="card-body d-flex" style={{ maxWidth: "100%" }}>
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

  <div className="d-flex">
    <p className="card-text mb-0 fs-5 text-end" style={{ display: 'flex' }}>
      {user?.roles.includes('ROLE_ADMIN') ? (
        <>
          <span style={{ marginRight: '0.5rem' }}>Stock:</span>
          <strong>{quantite}</strong>
        </>
      ) : (
        <strong>{prix.toFixed(2)}€</strong>
      )}
    </p>
  </div>
</div>


      {user?.roles.includes('ROLE_ADMIN') && (
        <div className="d-flex justify-content-end">
          <button className="btn btn-link p-0 me-3" onClick={handleEdit} aria-label="Éditer">
            <i className="bi bi-pencil" style={{ fontSize: '1.5rem', color: '#54494B' }}></i>
          </button>
          <button className="btn btn-link p-0" onClick={handleDelete} aria-label="Supprimer">
            <i className="bi bi-trash" style={{ fontSize: '1.5rem', color: '#54494B' }}></i>
          </button>
        </div>
      )}

      {/* Display Success/Error Message */}
      {message && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '10px 20px',
            backgroundColor: message.type === 'success' ? 'green' : 'red',
            color: 'white',
            borderRadius: '5px',
            zIndex: 1000,
          }}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
