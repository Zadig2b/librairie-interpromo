"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import '../books/page.css';

export default function BookList() {
  // State to hold book data
  const [books, setBooks] = useState([]);
  // State to handle loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // State for filtering by selected categories
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Fetch books from the backend
  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/livres`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setBooks(data);  // Update state with fetched data
      } catch (error) {
        setError(error.message);  // Update state with error message
      } finally {
        setLoading(false);  // Set loading to false once done
      }
    }

    fetchBooks();  // Call the fetch function
  }, []);  // Empty dependency array means this runs once when the component mounts

  // Handle checkbox change for categories
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategories(prevSelectedCategories =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter(c => c !== category) // Remove category if already selected
        : [...prevSelectedCategories, category] // Add category if not selected
    );
  };

  // Filter books by selected categories
  const filteredBooks = selectedCategories.length === 0
    ? books
    : books.filter(book => selectedCategories.includes(book.categorie.nom)); // Assuming categorie has a 'nom' property

  // Get all unique categories from books
  const categories = [...new Set(books.map(book => book.categorie.nom))]; // Assuming categorie has a 'nom' property

  // Render loading, error, or book list
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="book-section">
      <h1 className="section-title">Nos Livres</h1>

      {/* Category Filter with Checkboxes */}
      <div className="filter-container">
        <p>Filtrer par catégorie :</p>
        {categories.map(categorieNom => (
          <div key={categorieNom}>
            <label>
              <input
                type="checkbox"
                value={categorieNom}
                onChange={handleCategoryChange}
                checked={selectedCategories.includes(categorieNom)}
              />
              {categorieNom}
            </label>
          </div>
        ))}
      </div>

      <ul className="book-list">
        {filteredBooks.map(book => (
          <li key={book.id} className="book-item">
            <div className="image-container">
              <Link href={`/books/${book.id}`}>
                {book.image && <img src={book.image} alt={book.titre} />}
              </Link>
            </div>
            <div className="info-container">
              <h2>{book.titre}</h2>
              <p className="author">Author: {book.auteur}</p>
              <p className="price">Price: ${book.prix}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
