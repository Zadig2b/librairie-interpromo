// src/app/page.js
"use client"
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import BookList from '../components/BookList'; // Import BookList component
import HeroHeader from "@/components/HeroHeader";
import { useState, useEffect } from 'react';

export default function Home() {
  const nouveautés = "Nouveautés";
  const categories = "Vos genres préférés";
    // Etat pour gérer les données du livre
    const [books, setBooks] = useState([]);
    // État pour gérer les états de chargement et d’erreur
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch books from the backend
    useEffect(() => {
        async function fetchBooks() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/livres`);
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
    <>
    <HeroHeader/>
    <div className="container mt-5 d-flex justify-content-center align-items-center" >
    <header className="text-center mb-5">
          <h1>Welcome to Our Online Bookstore</h1>
          <p className="lead">Find and reserve your favorite books online</p>
        </header>



        <section className="mb-5">
          <BookList type={nouveautés}
          booksprops={books}/> 
        </section>

        <section className="mb-5">
          <BookList type={categories}
          booksprops={books}/> 
        </section>

        <section>
          <h2 className="mb-4">Categories</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card bg-light text-center p-3">
                <h5 className="card-title">Fantasy</h5>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-light text-center p-3">
                <h5 className="card-title">Science Fiction</h5>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-light text-center p-3">
                <h5 className="card-title">Mystery</h5>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
