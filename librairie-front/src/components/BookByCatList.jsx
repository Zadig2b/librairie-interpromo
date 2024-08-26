"use client"
import React, { useState, useEffect } from 'react';
import BookTeaser from '../components/BookTeaser'; 

export default function BookByCatList({ categorie, booksprops }) {
    if (!categorie) {
        return <div>No category data available.</div>;
    }

    return (
        <div className="container">
            <h3>{categorie.nom}</h3>
            <h5>{categorie.description || 'No description available.'}</h5>
            <ul className="list-unstyled">
                {booksprops?.map(book => (
                    <li key={book.id} className="mb-3">
                        <BookTeaser book={book} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

