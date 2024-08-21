"use client";
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function ConnexionPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(email, password);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center mb-4">Connexion</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email :</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                required
                                placeholder="Entrez votre email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary btn-block">Se connecter</button>
                        </div>
                    </form>

                    {error && <div className="alert alert-danger mt-4">{error}</div>}
                </div>
            </div>
        </div>
    );
}
