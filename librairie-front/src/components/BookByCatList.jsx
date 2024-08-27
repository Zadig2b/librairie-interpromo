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
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const data = await response.json();
                setBooks(data);  // Mettre à jour l'état avec les données récupérées
            } catch (error) {
                setError(error.message);  // Mettre à jour l'état avec un message d'erreur
            } finally {
                setLoading(false);  // Définir le chargement sur false une fois terminé
            }
        }
        
        fetchBooks();  // Appelez la fonction fetch
    }, []);  // Un tableau de dépendances vide signifie qu'il s'exécute une fois lorsque le composant est monté

    // Chargement du rendu, erreur ou liste de livres
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="container">
            <h3>{categorie.nom}</h3>
            <h5>{categorie.description || 'No description available.'}</h5>
            <div className="row">
            {books?.map(book => (
              <div key={book.id} className="col-md-4 mb-4">
                        <BookTeaser book={book} />
                    </div>
                ))}
              </div>
              </div>
    );
}

