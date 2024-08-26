"use client"
import React, { useState, useEffect } from 'react';
import { } from "../books/page.css";



export default function BookList() {
    // State to hold book data
    const [books, setBooks] = useState([]);
    // State to handle loading and error states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    // Render loading, error, or book list
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Books List</h1>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        <h2>{book.titre}</h2>
                        <p>Author: {book.auteur}</p>
                        <p>Editor: {book.editeur}</p>
                        <p>Price: ${book.prix}</p>
                        <p>Description: {book.description}</p>

                        {book.image && <img src={book.image} alt={book.titre} />}

                    </li>
                ))}
            </ul>
        </div>
    );
}
