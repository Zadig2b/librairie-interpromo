import { useState } from "react";
import '../app/books/page.css';


export default function Filter({ books, categories, setFilteredBooks }) {
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Handle checkbox change for categories
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    const updatedSelectedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category) // Remove if already selected
      : [...selectedCategories, category]; // Add if not selected

    setSelectedCategories(updatedSelectedCategories);

    const newFilteredBooks = updatedSelectedCategories.length === 0
      ? books // Show all books if no category is selected
      : books.filter(book => updatedSelectedCategories.includes(book.categorie.nom));

    setFilteredBooks(newFilteredBooks);
  };

  return (
    <div className="book-section">

      {/* Catégorie Filtre avec des cases à cocher */}
      <div className="filter-container">
        <div className="filter-header">
          <svg width="38" height="38" viewBox="0 0 42 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.0542 31.9359C10.6094 32.4129 9.98958 32.6875 9.33333 32.6875C8.67708 32.6875 8.05729 32.4129 7.6125 31.9359L1.19583 24.9984C0.32812 24.059 0.386453 22.592 1.34166 21.732C2.29687 20.8721 3.76979 20.9299 4.63749 21.8766L7 24.4275V2.625C7 1.3459 8.0427 0.3125 9.33333 0.3125C10.624 0.3125 11.6667 1.3459 11.6667 2.625V24.4275L14.0292 21.8693C14.8969 20.9299 16.3771 20.8648 17.325 21.7248C18.2729 22.5848 18.3385 24.0518 17.4708 24.9912L11.0542 31.9287V31.9359ZM23.3333 32.6875C22.0427 32.6875 21 31.6541 21 30.375C21 29.0959 22.0427 28.0625 23.3333 28.0625H25.6667C26.9573 28.0625 28 29.0959 28 30.375C28 31.6541 26.9573 32.6875 25.6667 32.6875H23.3333ZM23.3333 23.4375C22.0427 23.4375 21 22.4041 21 21.125C21 19.8459 22.0427 18.8125 23.3333 18.8125H30.3333C31.624 18.8125 32.6667 19.8459 32.6667 21.125C32.6667 22.4041 31.624 23.4375 30.3333 23.4375H23.3333ZM23.3333 14.1875C22.0427 14.1875 21 13.1541 21 11.875C21 10.5959 22.0427 9.5625 23.3333 9.5625H35C36.2906 9.5625 37.3333 10.5959 37.3333 11.875C37.3333 13.1541 36.2906 14.1875 35 14.1875H23.3333ZM23.3333 4.9375C22.0427 4.9375 21 3.9041 21 2.625C21 1.3459 22.0427 0.3125 23.3333 0.3125H39.6667C40.9573 0.3125 42 1.3459 42 2.625C42 3.9041 40.9573 4.9375 39.6667 4.9375H23.3333Z" fill="black" />
          </svg>
          <p className="filter-text">Filtrer</p>
        </div>
        <div className="filtre">
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((categorie) => (
            <div key={categorie.nom}>
              <label>
                <input className="cases"
                  type="checkbox"
                  value={categorie.nom}
                  onChange={handleCategoryChange}
                  checked={selectedCategories.includes(categorie.nom)}
                />
                {categorie.nom}
              </label>
            </div>
          ))
        ): (
          <p>Aucune catégorie disponible</p>
        )}
        </div>
      </div>
    </div>
  );
}
