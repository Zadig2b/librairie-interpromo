"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import Image from "next/image";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <Image
            src="/asset/Logo/logo-transparent-svg.svg"
            alt="Logo"
            width={100}
            height={100}
            className="me-2"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <p>Administration</p>
            <li className="nav-item">
              <Link href="/books" className="nav-link">
                Nos Livres
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about" className="nav-link">
                À Propos
              </Link>
            </li>
            {user && (
              <>
                <li className="nav-item">
                  <Link href="/account" className="nav-link">
                    Mon Compte
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/account/reservations" className="nav-link">
                    Mes Réservations
                  </Link>
                </li>
              </>
            )}
          </ul>
          <div className="d-flex">
            {!user && (
              <>
                <Link
                  href="/inscription"
                  className="btn btn-outline-light me-2"
                >
                  Sign Up
                </Link>
                <Link href="/login" className="btn btn-outline-light me-2">
                  Login
                </Link>
              </>
            )}
            {user && (
              <button onClick={logout} className="btn btn-outline-light me-2">
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
