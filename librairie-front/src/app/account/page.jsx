"use client"
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // Adjust the path as needed
import Cookies from 'js-cookie';

export default function MonCompte() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user: authUser } = useAuth(); // Get user from AuthContext

    useEffect(() => {
        console.log('useEffect triggered: authUser', authUser);

        if (authUser) {
            const token = Cookies.get('token');
            console.log('Token retrieved:', token);

            // Fetch user details from the backend
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                console.log('Fetch response status:', response.status);

                if (!response.ok) {
                    console.error('Fetch failed with status:', response.status);
                    throw new Error('Failed to fetch user data');
                }
                return response.json();
            })
            .then(data => {
                console.log('User data received:', data);
                setUser(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                setError(error);
                setLoading(false);
            });
        } else {
            console.log('No authUser found');
            setLoading(false); // No user data to fetch
        }
    }, [authUser]);

    if (loading) {
        console.log('Loading user data...');
        return <p>Loading...</p>;
    }

    if (error) {
        console.error('Error loading user data:', error);
        return <p>Error loading user data: {error.message}</p>;
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Mon Compte</h2>
            <h5>Informations personnelles</h5>
            {user ? (
                <>
                    <p><strong>Nom:</strong> {user.nom}</p>
                    <p><strong>Prénom:</strong> {user.prenom}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </>
            ) : (
                <p>No user data available</p>
            )}

            {/* Bouton Modifier */}
            <a href="/account/edit" className="btn btn-primary mt-3">Modifier</a>
        </div>
    );
}
