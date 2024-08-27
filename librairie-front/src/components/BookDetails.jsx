import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../context/AuthContext"; // Adjust the path as necessary
import Cookies from "js-cookie";
import { useEffect } from "react";

const BookDetails = ({ book }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Destructure book details from props
  const {
    titre,
    auteur,
    editeur,
    datePublication,
    description,
    quantite,
    prix,
    image,
    id,
  } = book;

  // Retrieve user data from AuthContext
  const { user } = useAuth();

  const handleOrder = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Retrieve the token from cookies
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
            Authorization: `Bearer ${token}`, // Inclure le jeton dans l'en-tête Autorisation
          },
          body: JSON.stringify({
            user_id: user?.id, // Récupérer l'ID utilisateur d'AuthContext
            livre_id: id,
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
  useEffect(() => {
    if (successMessage || error) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
        setError(null);
      }, 2000);

      // Effacez le délai d'attente si le composant se démonte ou si les messages changent
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
        <div className="col-md-4">
          {image && <img src={image} alt={titre} className="img-fluid" />}
        </div>
        <div className="col-md-8">
          <h2>{titre}</h2>
          <h4 className="text-muted">by {auteur}</h4>
          <p>
            <strong>Publisher:</strong> {editeur}
          </p>
          <p>
            <strong>Publication Date:</strong>{" "}
            {datePublication
              ? new Date(datePublication).toLocaleDateString()
              : "N/A"}
          </p>
          <p>
            <strong>Description:</strong> {description}
          </p>
          <p>
            <strong>Quantity:</strong> {quantite}
          </p>
          <p>
            <strong>Price:</strong> ${prix.toFixed(2)}
          </p>
          <button
            className="btn btn-primary"
            onClick={handleOrder}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Commander"}
          </button>
          {successMessage && (
            <div className="alert alert-success mt-3"style={messageStyle}>{successMessage}</div>
          )}
          {error && <div className="alert alert-danger mt-3"style={messageStyle}>{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
