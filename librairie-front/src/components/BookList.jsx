"use client"
import React, { useState, useEffect } from 'react';
import BookTeaser from '../components/BookTeaser'; 
import BookByCatList from '../components/BookByCatList';

export default function BookList({ type, booksprops }) {
    return (
      <div className="container">
        <h1>{type}</h1>
  
        {type !== "Nouveautés" ? (
          <BookByCatList 
          categorie={booksprops[0].categorie}/>
        ) : (
          <ul className="list-unstyled">
            {booksprops?.map((book) => (
              <li key={book.id} className="mb-3">
                <BookTeaser book={book} />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
