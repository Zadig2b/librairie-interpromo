"use client"
import React from 'react';

export default function ConnexionPage() {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center mb-4">Connexion</h2>
                    <form action="/connexion" method="post">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email :</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                className="form-control" 
                                required 
                                placeholder="Entrez votre email" 
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
                                placeholder="Entrez votre mot de passe" 
                            />
                        </div>

                        <div className="mb-3 text-end">
                            <a href="/motdepasse_oublie" className="link-secondary">Mot de passe oublié ?</a>
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary btn-block">Se connecter</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
