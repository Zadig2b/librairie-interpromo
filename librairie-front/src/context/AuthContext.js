"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { decodeJwt } from '../utils/jwtUtils';
import User from '../models/User';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const userData = decodeJwt(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (userData.exp < currentTime) {
          logout();
        } else {
          // Fetch additional user data from the backend
          fetchUserData()
            .then((userDetails) => {
              const user = new User({ ...userData, ...userDetails });
              setUser(user);
              const expirationTime = (userData.exp - currentTime) * 1000;
              setTimeout(logout, expirationTime);
            })
            .catch((error) => {
              console.error('Failed to fetch user data:', error);
              logout();
            });
        }
      } catch (error) {
        console.error('Failed to decode token:', error);
        Cookies.remove('token');
        setUser(null);
      }
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    router.push('/');
  };

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
        Cookies.set('token', token, { expires: 7 });
        const userData = decodeJwt(token);
        const userDetails = await fetchUserData();
        const user = new User({ ...userData, ...userDetails });
        setUser(user);
        const currentTime = Math.floor(Date.now() / 1000);
        const expirationTime = (userData.exp - currentTime) * 1000;
        setTimeout(logout, expirationTime);
        router.push('/');
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
