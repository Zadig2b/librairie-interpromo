"use client"
import React, { useState } from 'react';

export default function ConnexionPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a JSON object with the form data
        const formData = {
            email,
            password
        };

        try {
            // Send a POST request to the API
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            // Check if the request was successful
            if (response.ok) {
                const result = await response.json();
                setMessage(result.message || 'Login successful!');
                setError('');

                // Redirect to another page, e.g., dashboard, after successful login
                // window.location.href = '/dashboard';
            } else {
                const result = await response.json();
                setError(result.error || 'Login failed!');
                setMessage('');
            }
        } catch (error) {
            setError('An unexpected error occurred.');
            setMessage('');
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

                        <div className="mb-3 text-end">
                            <a href="/motdepasse_oublie" className="link-secondary">Mot de passe oublié ?</a>
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary btn-block">Se connecter</button>
                        </div>
                    </form>

                    {message && <div className="alert alert-success mt-4">{message}</div>}
                    {error && <div className="alert alert-danger mt-4">{error}</div>}
                </div>
            </div>
        </div>
    );
}
