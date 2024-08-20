"use client"
import React, { useState, useEffect } from 'react';

export default function Inscription() {
    return (
        <div className="container mt-5">
            <h2 className="mb-4">Inscription</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="nom" className="form-label">Nom</label>
                    <input type="text" className="form-control" id="nom" placeholder="Entrez votre nom" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="prenom" className="form-label">Prénom</label>
                    <input type="text" className="form-control" id="prenom" placeholder="Entrez votre prénom" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Entrez votre email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mot de passe</label>
                    <input type="password" className="form-control" id="password" placeholder="Entrez votre mot de passe" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirm-password" className="form-label">Confirmation du mot de passe</label>
                    <input type="password" className="form-control" id="confirm-password" placeholder="Confirmez votre mot de passe" required />
                </div>

                <div className="mb-3 text-end">
                    <a href="/#" className="link-secondary">Déjà un compte?</a>
                </div>

                <button type="submit" className="btn btn-primary">S'inscrire</button>
            </form>
        </div>
    );
}
