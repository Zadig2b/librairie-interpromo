"use client"
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { decodeJwt } from '../utils/jwtUtils'; // Import the utility function

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    const logout = () => {
        Cookies.remove('token');
        setUser(null);
        router.push('/'); // Redirect to login page after logout
    };

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const userData = decodeJwt(token);
                const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds

                if (userData.exp < currentTime) {
                    // Token has expired, logout user
                    logout();
                } else {
                    setUser(userData);

                    // Set a timeout to log the user out when the token expires
                    const expirationTime = (userData.exp - currentTime) * 1000; // Convert to milliseconds
                    setTimeout(logout, expirationTime);
                }
            } catch (error) {
                console.error('Failed to decode token:', error);
                Cookies.remove('token');
                setUser(null);
            }
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const { token } = await response.json();
                Cookies.set('token', token, { expires: 7 }); // Store token in a cookie for 7 days
                
                const userData = decodeJwt(token);
                setUser(userData);

                // Set a timeout to log the user out when the token expires
                const currentTime = Math.floor(Date.now() / 1000);
                const expirationTime = (userData.exp - currentTime) * 1000;
                setTimeout(logout, expirationTime);

                router.push('/'); // Redirect to a protected route after login
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

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
