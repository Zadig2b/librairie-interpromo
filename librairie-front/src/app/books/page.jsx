"use client";
import React, { useState, useEffect } from 'react';
import Filter from '@/components/Filter';
import BookList from '@/components/BookList';
import '@/app/books/page.css';
import Pagination from '@/components/Pagination';

export default function BooksPage() {
  // State to hold book data
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  // State to handle loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Calculate current books to display based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);

  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Fetch books and categories from the backend
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategories(data);  // Update state with fetched data
      } catch (error) {
        setError(error.message);  // Update state with error message
      }
    }

    async function fetchBooks() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/livres`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBooks(data);
        setFilteredBooks(data);  // Update state with fetched data
      } catch (error) {
        setError(error.message);  // Update state with error message
      } finally {
        setLoading(false);  // Set loading to false once done
      }
    }

    fetchCategories();
    fetchBooks();
  }, []);

  // Render loading, error, or book list
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="book-section">
      <h1 className="section-title">Nos Livres</h1>
      {/* Filter component */}
      <Filter books={books} categories={categories} setFilteredBooks={setFilteredBooks} />

      {/* BookList component */}
      <BookList type="AllBooks" booksprops={currentBooks} categories={categories} />

      {/* Pagination component */}
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredBooks.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

