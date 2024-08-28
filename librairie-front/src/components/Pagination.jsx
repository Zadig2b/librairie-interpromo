import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Générer les numéros de page
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Limiter l'affichage des numéros de page avec des ellipses
  const renderPageNumbers = () => {
    const maxPageNumbersToShow = 5; // Nombre maximal de numéros de page à afficher

    if (totalPages <= maxPageNumbersToShow) {
      return pageNumbers.map(number => (
        <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
          <button onClick={() => paginate(number)} className="page-link">
            {number}
          </button>
        </li>
      ));
    }

    const pages = [];
    let startPage, endPage;

    if (currentPage <= Math.ceil(maxPageNumbersToShow / 2)) {
      startPage = 1;
      endPage = maxPageNumbersToShow;
    } else if (currentPage + Math.floor(maxPageNumbersToShow / 2) >= totalPages) {
      startPage = totalPages - maxPageNumbersToShow + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - Math.floor(maxPageNumbersToShow / 2);
      endPage = currentPage + Math.floor(maxPageNumbersToShow / 2);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
          <button onClick={() => paginate(i)} className="page-link">
            {i}
          </button>
        </li>
      );
    }

    if (startPage > 1) {
      pages.unshift(
        <li key="first" className="page-item">
          <button onClick={() => paginate(1)} className="page-link">1</button>
        </li>,
        <li key="start-ellipsis" className="page-item disabled">
          <span className="page-link">...</span>
        </li>
      );
    }

    if (endPage < totalPages) {
      pages.push(
        <li key="end-ellipsis" className="page-item disabled">
          <span className="page-link">...</span>
        </li>,
        <li key="last" className="page-item">
          <button onClick={() => paginate(totalPages)} className="page-link">{totalPages}</button>
        </li>
      );
    }

    return pages;
  };

  return (
    <nav>
      <ul className="pagination">
        {/* Bouton Précédent */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="page-link"
          >
            Précédent
          </button>
        </li>

        {/* Numéros de page */}
        {renderPageNumbers()}

        {/* Bouton Suivant */}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="page-link"
          >
            Suivant
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
