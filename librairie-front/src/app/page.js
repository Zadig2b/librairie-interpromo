// src/app/page.js
"use client"
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import BookList from '../components/BookList'; // Import BookList component
import HeroHeader from "@/components/HeroHeader";

export default function Home() {
  const nouveautés = "new";
  const categories = "categories";

  return (
    <>
    <HeroHeader/>
    <div className="container mt-5 d-flex justify-content-center align-items-center" >
    <header className="text-center mb-5">
          <h1>Welcome to Our Online Bookstore</h1>
          <p className="lead">Find and reserve your favorite books online</p>
        </header>



        <section className="mb-5">
          <h2 className="mb-4">Nouveautés</h2>
          <BookList type={nouveautés}/> 
        </section>

        <section className="mb-5">
          <h2 className="mb-4">Vos Genres Préférés</h2>
          <BookList type={categories}/> 
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
