import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../context/AuthContext"; 
import Cookies from "js-cookie";
import EditBookForm from "./admin/EditBookForm"; 

const BookDetails = ({ book }) => {
  const [bookData, setBookData] = useState(book); // Utiliser un état local pour les données du livre
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const { user } = useAuth();

  const handleOrder = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/order/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            user_id: user?.id,
            livre_id: bookData.id, // Utiliser bookData
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setSuccessMessage("Commande passée avec succès!");
    } catch (error) {
      setError(`Une erreur est survenue lors de la commande: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = (updatedBook) => {
    // Mettre à jour l'état local avec les nouvelles données du livre
    setBookData(updatedBook);
    setIsEditing(false); // Fermer le formulaire d'édition après la sauvegarde
  };

  useEffect(() => {
    if (successMessage || error) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, error]);

  const messageStyle = {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
    zIndex: 1050,
    maxWidth: '300px',
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <h2>{bookData.titre}</h2>
        </div>
        <hr className="my-4" style={{border: '5px solid #BFE4FF' }} />
        <div className="col-md-4" style={{ position: 'relative', paddingLeft: '10px', paddingRight: '150px' }}>
          {bookData.image && <img src={bookData.image} alt={bookData.titre} className="img-fluid" />}
        </div>
        <div className="col-md-8 mt-5">
          {!isEditing ? (
            <>
              <div><strong>Auteur : </strong><span className="text-muted">{bookData.auteur}</span></div>
              <div><strong>Editeur : </strong><span className="text-muted">{bookData.editeur}</span></div>
              <div><strong>Date de publication : </strong><span>{bookData.datePublication ? new Date(bookData.datePublication).getFullYear() : "N/A"}</span></div>
              <div><strong>Genre : </strong><span className="text-muted">Fantasy</span></div>
              <div><strong>Prix : </strong> ${bookData.prix.toFixed(2)}</div>
              {!user?.isAdmin() && (
                <button
                  className="btn btn-primary mt-3"
                  style={{
                    backgroundColor: '#BFE4FF',
                    border: '5px solid var(--primary-color)',
                    borderRadius: '0',
                    color: 'var(--primary-color)'
                  }}
                  onClick={handleOrder}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Commander"}
                </button>
              )}
              {user?.isAdmin() && (
                <button
                  className="btn btn-secondary mt-3"
                  onClick={handleEditToggle}
                >
                  Éditer
                </button>
              )}
            </>
          ) : (
            <EditBookForm
              book={bookData} // Passer bookData au lieu de book
              onSave={handleSave}  // Passer la fonction handleSave
              onCancel={handleEditToggle} // Fermer le formulaire en cas d'annulation
            />
          )}
          {successMessage && (
            <div className="alert alert-success mt-3" style={messageStyle}>
              {successMessage}
            </div>
          )}
          {error && (
            <div className="alert alert-danger mt-3" style={messageStyle}>
              {error}
            </div>
          )}
        </div>
        <div className="mt-3">
          <strong>Résumé : </strong>
          <p>{bookData.description}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
