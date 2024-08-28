"use client"

import React from 'react';
import Image from 'next/image';

export default function About() {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>À propos</h1>

            <p style={styles.paragraph}>
                La plume des Ecrins vous attend patiemment au bourg d'Oisans. A proximité d'un cadre naturel époustouflant, venez faire le plein de littérature avant de partir à l'aventure braver mère nature. Bande dessinée, grands classique ou encore fantasy, notre collection hétéroclite sera vous ravir ! " L’équipe de la librairie.
            </p>

            <div style={styles.imageContainer}>
                <Image
                    src="/Bibliothèque-INHA-Eklektike.jpg" // Assurez-vous que l'image est placée dans le dossier public
                    alt="Librairie"
                    width={800}
                    height={450}
                    style={styles.image}
                />
            </div>

            <div style={styles.contact}>
                <h2>Contactez-nous</h2>
                <p><strong>Adresse :</strong> 123 Rue de la Lecture, 75000 Paris, France</p>
                <p><strong>Téléphone :</strong> +33 1 23 45 67 89</p>
            </div>
        </div>
    );
}

// Styles inline pour la page
const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center',
    },
    title: {
        fontSize: '3rem',
        marginBottom: '20px',
    },
    paragraph: {
        fontSize: '1.2rem',
        lineHeight: '1.6',
        marginBottom: '40px',
    },
    imageContainer: {
        marginBottom: '40px',
    },
    contact: {
        fontSize: '1rem',
        lineHeight: '1.5',
    },
    image: {
        borderRadius: '10px',
    },
};
