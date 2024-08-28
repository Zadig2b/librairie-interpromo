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
        <div className="col-md-12">
          <h2>{titre}</h2>
        </div>
        <hr className="" style={{border: '5px solid #BFE4FF' }} />
        {/* <div className="col-md-4" style={{ position: 'relative', paddingLeft: '10px', paddingRight: '150px' }}>
          {image && <img src={image} alt={titre} className="img-fluid" />}
        </div> */}
        <div className="col-md-4">
         {image && <img src={image} alt={titre} className="img-fluid" style={{ width: '503px', height: '412px' }} />}
        </div>

        <div className="col-md-8 mt-5">
          <div className="">
            <strong>Auteur : </strong>
            <span className="text-muted">{auteur}</span>
          </div>
          <div className="">
            <strong>Editeur : </strong>
            <span className="text-muted">{editeur}</span>
          </div>
          <div className="">
            <strong>Date de publication : </strong>
            <span>
              {datePublication ? new Date(datePublication).getFullYear() : "N/A"}
            </span>
          </div>
          <div className="mb-3">
            <strong>Genre : </strong><span className="text-muted">Fantasy</span>
            <span className="text-muted"></span>
          </div>
          <div>
            <strong className="m-3"></strong> ${prix.toFixed(2)}
          </div>
          <button
            className="btn btn-primary mt-3"
            style={{ backgroundColor: '#BFE4FF', border: '5px solid black', borderRadius: '0'}}
            onClick={handleOrder}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Commander"}
          </button>
         
          {/* <div>
            <strong>Quantité:</strong> {quantite}
          </div> */}
         
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
            <strong>Résumer : </strong> 
            <p>
            {description}
            </p>
          </div>
      </div>
    </div>
  );
};

export default BookDetails;
