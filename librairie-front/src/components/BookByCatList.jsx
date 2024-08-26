"use client"
import React, { useState, useEffect } from 'react';
import BookTeaser from '../components/BookTeaser'; 

export default function BookByCatList({ categorie }) {
    if (!categorie) {
        return <div>No category data available.</div>;
    }
    // Etat pour gérer les données du livre
    const [books, setBooks] = useState([]);
    // État pour gérer les états de chargement et d’erreur
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const nom = categorie.nom;
    // Fetch books from the backend
    useEffect(() => {
        async function fetchBooks() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categorie/${nom}`);
                // TODO: créer de nouvelles routes en utilisant /${props.type}
                // on voudra alors récupérer les derniers livres ajoutés par le libraire si type=new
                //ou les livres rangés par catégorie si type=categorie
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
            <h3>{categorie.nom}</h3>
            <h5>{categorie.description || 'No description available.'}</h5>
            <ul className="list-unstyled">
                {books?.map(book => (
                    <li key={book.id} className="mb-3">
                        <BookTeaser book={book} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

