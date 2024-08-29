"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import EditBookForm from "@/components/admin/EditBookForm";

export default function AddBookPage() {
  const { user } = useAuth();

  // Vérifiez si l'utilisateur est administrateur
  if (!user?.roles.includes('ROLE_ADMIN')) {
    return <div>Accèss Refusé</div>; // Afficher un message d'erreur ou rediriger
  }

  return (
    <div className="container mt-5">
      <h1>Ajouter un Livre</h1>
      <EditBookForm />
    </div>
  );
}
