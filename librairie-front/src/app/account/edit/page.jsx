"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useAuth } from "../../../context/AuthContext"; // Ajuster le chemin si nécessaire
import { useRouter } from 'next/navigation';

export default function EditAccount() {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { user: authUser } = useAuth();

    // Charger les données utilisateur existantes pour pré-remplir le formulaire
    useEffect(() => {
        if (authUser) {
            const token = Cookies.get("token");

            // Requête pour récupérer les informations utilisateur
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/me`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Impossible de charger les données utilisateur");
                    }
                    return response.json();
                })
                .then((data) => {
                    setNom(data.nom || "");
                    setPrenom(data.prenom || "");
                    setEmail(data.email || "");
                })
                .catch((error) => {
                    console.error("Erreur lors du chargement des données utilisateur:", error);
                    setError(error.message);
                });
        }
    }, [authUser]);

    // Gérer la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const token = Cookies.get("token");

            // Requête pour mettre à jour les informations utilisateur
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/edit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // Le token est automatiquement envoyé avec les cookies
                },
                body: JSON.stringify({
                    nom: nom,
                    prenom: prenom,
                    email: email,
                    // password: password,
                }),
                credentials: "include", // Assure que les cookies sont inclus dans la requête
            });

            const result = await response.json();

            if (response.ok) {
                setMessage("Les informations ont été mises à jour avec succès.");
                setTimeout(() => router.push("/account"), 2000); // Redirection après succès
            } else {
                throw new Error(result.error || "Une erreur s'est produite lors de la mise à jour");
            }
        } catch (error) {
            setError(error.message);
            console.error("Erreur lors de la mise à jour des informations:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center mb-4">Modification des informations</h2>
                    {message && <div className="alert alert-success">{message}</div>}
                    {error && <div className="alert alert-danger">Erreur : {error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="Nom" className="form-label">Nom :</label>
                            <input
                                type="text"
                                id="Nom"
                                name="Nom"
                                className="form-control"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                required
                                placeholder="Entrez votre nouveau Nom"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="prenom" className="form-label">Prénom :</label>
                            <input
                                type="text"
                                id="prenom"
                                name="prenom"
                                className="form-control"
                                value={prenom}
                                onChange={(e) => setPrenom(e.target.value)}
                                required
                                placeholder="Entrez votre nouveau Prénom"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email :</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Entrez votre nouveau Email"
                            />
                        </div>

                        {/* <div className="mb-3">
                            <label htmlFor="password" className="form-label">Mot de passe :</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Entrez votre nouveau mot de passe"
                            />
                        </div> */}

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                                {loading ? "En cours..." : "Sauvegarder"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
