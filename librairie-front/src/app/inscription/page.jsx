"use client"
import React, { useState } from 'react';

export default function Inscription() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a JSON object with the form data
        const formData = {
            email,
            password,
            prenom,
            nom
        };

        try {
            // Send a POST request to the API
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register`, {
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
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email :</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />

                <label htmlFor="password">Mot de passe :</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />

                <label htmlFor="prenom">Prénom :</label>
                <input 
                    type="text" 
                    id="prenom" 
                    name="prenom" 
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                />

                <label htmlFor="nom">Nom :</label>
                <input 
                    type="text" 
                    id="nom" 
                    name="nom" 
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                />

                <button type="submit">S'inscrire</button>
            </form>

            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
