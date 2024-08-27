// components/BookDetails.jsx
import React from 'react';
// import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookDetails = ({ book }) => {
  // Destructure book details from props
  const { titre, auteur, editeur, datePublication, description, quantite, prix, image } = book;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          {image && (
            <img src={image} alt={titre} className="img-fluid" />
          )}
        </div>
        <div className="col-md-8">
          <h2>{titre}</h2>
          <h4 className="text-muted">by {auteur}</h4>
          <p><strong>Publisher:</strong> {editeur}</p>
          <p><strong>Publication Date:</strong> {datePublication ? new Date(datePublication).toLocaleDateString() : 'N/A'}</p>
          <p><strong>Description:</strong> {description}</p>
          <p><strong>Quantity:</strong> {quantite}</p>
          <p><strong>Price:</strong> ${prix.toFixed(2)}</p>
          <button className="btn btn-primary">Commander</button>
        </div>
      </div>
    </div>
  );
};

// Define PropTypes for the component
// BookDetails.propTypes = {
//   book: PropTypes.shape({
//     titre: PropTypes.string.isRequired,
//     auteur: PropTypes.string.isRequired,
//     editeur: PropTypes.string.isRequired,
//     datePublication: PropTypes.string,
//     description: PropTypes.string,
//     quantite: PropTypes.number.isRequired,
//     prix: PropTypes.number.isRequired,
//     image: PropTypes.string
//   }).isRequired
// };

export default BookDetails;
