"use client"
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../../../context/AuthContext'; 
import Cookies from 'js-cookie';
import BookTeaser from '@/components/BookTeaser';

export default function MesReservations() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth(); // Récupérer les données utilisateur de AuthContext

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = Cookies.get('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/order/orders`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const data = await response.json();
                setOrders(data); // Assuming the backend returns an array of orders
            } catch (error) {
                setError(`Failed to load orders: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <p>Loading your reservations...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Mes Réservations</h2>
            {orders.length > 0 ? (
                <ul className="list-group">
                    {orders.map((order) => (
                        <li key={order.id} className="list-group-item">
                            <h5>Commande #{order.id}</h5>
                            <p><strong>Statut:</strong> {order.statut}</p>
                            <div><strong>Articles:</strong>
                            {order.books.map(book => (
                                <BookTeaser key={book.id} book={book} />
                            ))}
                        </div>                            
                            {/* <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p> */}
                            {/* <p><strong>Total:</strong> ${order.total.toFixed(2)}</p> */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reservations found.</p>
            )}
        </div>
    );
}
