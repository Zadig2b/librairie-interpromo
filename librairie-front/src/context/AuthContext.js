// context/AuthContext.js

"use client"
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { decodeJwt } from '../utils/jwtUtils'; // Import the utility function

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Check if the user is already logged in
        const token = Cookies.get('token');
        if (token) {
            // Decode the JWT and set user
            try {
                const userData = decodeJwt(token);
                setUser(userData);
            } catch (error) {
                console.error('Failed to decode token:', error);
                Cookies.remove('token');
                setUser(null);
            }
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const { token } = await response.json();
                Cookies.set('token', token, { expires: 7 }); // Store token in a cookie for 7 days
                
                // Decode the JWT and set user
                const userData = decodeJwt(token);
                setUser(userData);

                console.log(userData);
                
                // router.push('/dashboard'); // Redirect to a protected route after login
            } else {
                const error = await response.json();
                console.error('Login failed:', error.message);
                throw new Error(error.message);
            }
        } catch (error) {
            console.error('An unexpected error occurred during login:', error);
            throw new Error('An unexpected error occurred during login.');
        }
    };

    const logout = () => {
        Cookies.remove('token');
        setUser(null);
        router.push('/login'); // Redirect to login page after logout
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
