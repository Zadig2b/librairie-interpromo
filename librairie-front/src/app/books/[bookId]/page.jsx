"use client";

import { useEffect, useState } from "react";
import BookDetails from "@/components/BookDetails"; // Assuming BookDetails is in the components folder


export default function BookDetailsPage(props) {
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(false);
  const [data, setData] = useState(null); 

  useEffect(() => {
    // Extracting the bookId from props.params
    const bookId = props.params.bookId;

    // Fetching the book data from the API
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/livre/${bookId}`)
      .then((response) => response.json()) 
      .then((data) => {
        setLoading(false); 
        setData(data); 
        console.log(data);
      })
      .catch(() => {
        setError(true); 
        setLoading(false); 
      });
  }, [props.params.bookId]); 

  return (
    <div className="book-details-container">
      {loading && !error && <div>Loading book data...</div>}
      {!loading && !error && data && (
        <BookDetails
          book={data}
        />
      )}
      {!loading && error && <div>An error occurred while fetching the data.</div>}
    </div>
  );
}
