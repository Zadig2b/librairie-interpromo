"use client"
import React from 'react';


export default function MonCompte() {


    return (
        <div className="container mt-5">
            <h2 className="mb-4">Mon Compte</h2>
            <h5>Informations personnelles</h5>
            <p><strong>Nom:</strong> user.nom</p>
            <p><strong>Prénom:</strong> user.prenom</p>
            <p><strong>Email:</strong> user.email</p>

            {/* Bouton Modifier */}
            <a href="/monCompte/edition" className="btn btn-primary mt-3" >Modifier</a>
        </div>
    );
}
