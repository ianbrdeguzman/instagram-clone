import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { push } = useRouter();

    useEffect(() => {
        const loadUserFromCookies = async () => {
            try {
                const { data } = await axios.get('/api/users/me', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                });

                if (data) setUser(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                localStorage.removeItem('token');
                push('/accounts/login');
                return;
            }
        };
        loadUserFromCookies();
    }, []);

    const login = async (data) => {
        try {
            setLoading(true);
            const res = await axios.post('/api/login', data);
            setUser(res.data);
            localStorage.setItem('token', res.data.token);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(
                error.response && error.response.data
                    ? error.response.data
                    : error.message
            );
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            await axios.post('/api/logout', {
                withCredentials: true,
            });
            localStorage.removeItem('token');
            setUser(null);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                error,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
