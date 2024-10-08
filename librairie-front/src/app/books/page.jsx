"use client";
import React, { useState, useEffect } from 'react';
import Filter from '@/components/Filter';
import BookList from '@/components/BookList';
import '@/app/books/page.css';
import Pagination from '@/components/Pagination';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation'; // Import the useRouter hook

export default function BooksPage() {
  const router = useRouter(); // Initialize the router

  const handleAddBookClick = () => {
    router.push('/new-book'); // Navigate to the /add-book page
  };

  // State to hold book data
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  // State to handle loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Define the number of items per page
  
  const allBooks = "Nos Livres";
  const { user } = useAuth(); // Récupérer l'utilisateur connecté

  const handleDeleteBook = (deletedBookId) => {
    setBooks(prevBooks => prevBooks.filter(book => book.id !== deletedBookId));
    setFilteredBooks(prevFilteredBooks => prevFilteredBooks.filter(book => book.id !== deletedBookId));
  };

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

  // Handle page changes
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate the items to display on the current page
  const indexOfLastBook = currentPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Render loading, error, or book list
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="book-section">
      <h1 className="section-title">Nos Livres</h1>

     {/* Filter component */}
      <Filter books={books} categories={categories} setFilteredBooks={setFilteredBooks} />
      {user?.isAdmin() && (
  <button
    className="btn btn-lg float-end"
    style={{
      backgroundColor: '#C6E6FE',
      borderRadius: '0',
      border: '2px solid black',
    }}
    onClick={handleAddBookClick}
  >
    Ajouter
  </button>
)}



      {/* BookList component */}
      <BookList type={allBooks} booksprops={currentBooks} categories={categories} handleDeleteBook={handleDeleteBook} />

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
