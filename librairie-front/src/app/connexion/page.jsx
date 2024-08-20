"use client"
import React, { useState, useEffect } from 'react';

export default function ConnexionPage() {
    return (
        <div>
            <form action="/connexion" method="post">
                <label htmlFor="email">Email :</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="password">Mot de passe :</label>
                <input type="password" id="password" name="password" required />

                <a href="/motdepasse_oublie">Mot de passe oublié ?</a>

                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}