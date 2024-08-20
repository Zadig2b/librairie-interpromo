"use client"
import React, { useState, useEffect } from 'react';
import BookTeaser from '../components/BookTeaser'; // Import BookTeaser component

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
        <div className="container">
            <h1>Books List</h1>
            <ul className="list-unstyled">
                {books.map(book => (
                    <li key={book.id} className="mb-3">
                        <BookTeaser book={book} /> {/* Use BookTeaser component */}
                    </li>
                ))}
            </ul>
        </div>
    );
}
