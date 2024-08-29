import React, { useState } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const EditBookForm = ({ book, onSave, onCancel }) => {
  // Initialiser formData en fonction de la présence ou non de la prop book
  const [formData, setFormData] = useState({
    // id: book?.id || '', // Laisser vide si book est null
    titre: book?.titre || '',
    auteur: book?.auteur || '',
    editeur: book?.editeur || '',
    datePublication: book?.datePublication || '',
    description: book?.description || '',
    quantite: book?.quantite || '',
    prix: book?.prix || '',
    image: book?.image || '',
  });

  // État pour gérer le chargement, les erreurs et les messages de succès
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ 
      ...formData, 
      [name]: name === "quantite" ? parseInt(value, 10) : value ,
      [name]: name === "prix" ? parseFloat(value) : value 

    });
  };
  

  // Fonction pour sauvegarder les modifications
  const handleSave = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Récupérer le token d'authentification depuis les cookies
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No token found");
      }

      const url = book 
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/livre/edit/${book.id}`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/livre/new`;

      const method = book ? "PUT" : "POST";

      // Envoyer une requête PUT pour l'édition ou POST pour l'ajout
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Inclure le token dans l'en-tête
        },
        body: JSON.stringify(formData), // Envoyer les données du formulaire en JSON
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setSuccessMessage(book ? "Livre mis à jour avec succès!" : "Livre ajouté avec succès!");

      if (onSave) onSave(formData);

    } catch (error) {
      setError(`Une erreur est survenue: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form">
      <div className="mb-3">
        <label className="form-label">Titre</label>
        <input
          type="text"
          className="form-control"
          name="titre"
          value={formData.titre}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Auteur</label>
        <input
          type="text"
          className="form-control"
          name="auteur"
          value={formData.auteur}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Éditeur</label>
        <input
          type="text"
          className="form-control"
          name="editeur"
          value={formData.editeur}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Date de Publication</label>
        <input
          type="date"
          className="form-control"
          name="datePublication"
          value={formData.datePublication}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Quantité</label>
        <input
          type="number"
          className="form-control"
          name="quantite"
          value={formData.quantite}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Prix</label>
        <input
          type="number"
          step="0.01"
          className="form-control"
          name="prix"
          value={formData.prix}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Image URL</label>
        <input
          type="text"
          className="form-control"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />
      </div>
      <button
        className="btn btn-success mt-3"
        onClick={handleSave}
        disabled={isLoading}
      >
        {isLoading ? "Sauvegarde..." : book ? "Sauvegarder les modifications" : "Ajouter le livre"}
      </button>
      <button
        className="btn btn-secondary mt-3 ms-2"
        onClick={onCancel}
      >
        Annuler
      </button>
      {successMessage && (
        <div className="alert alert-success mt-3">
          {successMessage}
        </div>
      )}
      {error && (
        <div className="alert alert-danger mt-3">
          {error}
        </div>
      )}
    </div>
  );
};

// Définir les types des props attendues
EditBookForm.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    titre: PropTypes.string.isRequired,
    auteur: PropTypes.string.isRequired,
    editeur: PropTypes.string.isRequired,
    datePublication: PropTypes.string,
    description: PropTypes.string.isRequired,
    quantite: PropTypes.number.isRequired,
    prix: PropTypes.number.isRequired,
    image: PropTypes.string,
  }),
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
};

export default EditBookForm;
