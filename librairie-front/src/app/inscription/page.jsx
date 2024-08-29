"use client"
import React, { useState } from 'react';

export default function Inscription() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple password confirmation check
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        // Create a JSON object with the form data
        const formData = {
            email,
            password,
            prenom,
            nom
        };

        try {
            // Send a POST request to the API
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            // Check if the request was successful
            if (response.ok) {
                const result = await response.json();
                setMessage(result.message || 'Registration successful!');
                setError('');
            } else {
                const result = await response.json();
                setError(result.error || 'Registration failed!');
                setMessage('');
            }
        } catch (error) {
            setError('An unexpected error occurred.');
            setMessage('');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Inscription</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nom" className="form-label">Nom</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="nom" 
                        placeholder="Entrez votre nom" 
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="prenom" className="form-label">Prénom</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="prenom" 
                        placeholder="Entrez votre prénom" 
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        placeholder="Entrez votre email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mot de passe</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Entrez votre mot de passe" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirm-password" className="form-label">Confirmation du mot de passe</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="confirm-password" 
                        placeholder="Confirmez votre mot de passe" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required 
                    />
                </div>

                <div className="mb-3 text-end">
                    <a href="/login" className="link-secondary">Déjà un compte?</a>
                </div>

                <button type="submit" className="btn btn-primary">S'inscrire</button>
            </form>

            {message && <p className="mt-3 text-success">{message}</p>}
            {error && <p className="mt-3 text-danger">{error}</p>}
        </div>
    );
}

