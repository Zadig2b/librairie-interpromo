import { useState } from "react";

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
    <div className="filter-container">
      <p>Filtrer par catégorie :</p>
      {Array.isArray(categories) && categories.length > 0 ? (
        categories.map((categorie) => (
          <div key={categorie.nom}>
            <label>
              <input
                type="checkbox"
                value={categorie.nom}
                onChange={handleCategoryChange}
                checked={selectedCategories.includes(categorie.nom)}
              />
              {categorie.nom}
            </label>
          </div>
        ))
      ) : (
        <p>No categories available</p>
      )}
    </div>
  );
}
