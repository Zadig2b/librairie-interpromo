// src/app/page.js
"use client"
import BookList from '../components/BookList'; // Import BookList component
import HeroHeader from "@/components/HeroHeader";
import { useState, useEffect } from 'react';

export default function Home() {
  const nouveautés = "Nouveautés";
  const randomCategory = "Vos genres préférés";
    // Etat pour gérer les données du livre
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    // État pour gérer les états de chargement et d’erreur
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch books from the backend
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
      } finally {
          setLoading(false);  // Set loading to false once done
      }       
      }

        async function fetchBooks() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/livres`);

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
        fetchCategories();

    }, []);  // Un tableau de dépendances vide signifie qu'il s'exécute une fois lorsque le composant est monté

    // Render loading, error, or book list
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    // console.log(books);
    
    return (
      <>
        <HeroHeader />
        <div className="container mt-5">
          <header className="text-center mb-5">
            <h1>Welcome to Our Online Bookstore</h1>
            <p className="lead">Find and reserve your favorite books online</p>
          </header>
  
          <section className="mb-5">
            <BookList type={nouveautés} booksprops={books} />
          </section>
  
          <section className="mb-5">
            <BookList type={randomCategory} booksprops={books} categories={categories} />
          </section>
        </div>
      </>
    );
}
