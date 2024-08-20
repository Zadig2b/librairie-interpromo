"use client"
import React, { useState } from 'react';

export default function editionCompte() {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center mb-4">Modification des informations</h2>
                    <form action="/connexion" method="post">
                        <div className="mb-3">
                            <label htmlFor="Nom" className="form-label">Nom :</label>
                            <input
                                type="text"
                                id="Nom"
                                name="Nom"
                                className="form-control"
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
                                required
                                placeholder="Entrez votre nouveau Email"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Mot de passe :</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                required
                                placeholder="Entrez votre nouveau mot de passe"
                            />
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary btn-block">Sauvegarder</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}