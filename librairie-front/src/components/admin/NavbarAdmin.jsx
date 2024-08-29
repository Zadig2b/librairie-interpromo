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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
              <p className="text-white fs-1 m-0">Administration</p>
            </li>
            <li className="nav-item">
              <Link href="/books" className="nav-link">
                Les Livres
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/orders" className="nav-link">
                Les Commandes
              </Link>
            </li>

            {user && (
              <>
                <li className="nav-item d-flex align-items-center">
                  <Link href="/account" className="nav-link d-flex align-items-center">
                  Mes informations <i className="bi bi-person fs-4 me-2"></i> 
                  </Link>
                </li>
              </>
            )}
          </ul>
          <div className="d-flex align-items-center">
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
