// components/Navbar.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link'; // For client-side routing with Next.js

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link href="/" className="navbar-brand">Accueil</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/books" className="nav-link">Nos Livres</Link>
            </li>
            <li className="nav-item">
              <Link href="/about" className="nav-link">À Propos</Link>
            </li>
            <li className="nav-item">
              <Link href="/login" className="nav-link">Connexion</Link>
            </li>
          </ul>
          <div className="d-flex">
            <button className="btn btn-outline-light me-2" type="button">Sign Up</button>
            <button className="btn btn-outline-light" type="button">Login</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
