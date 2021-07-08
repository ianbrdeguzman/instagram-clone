import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorLogin, setErrorLogin] = useState(null);
    const [errorRegister, setErrorRegister] = useState(null);

    useEffect(() => {
        const loadUserFromCookies = async () => {
            try {
                const { data } = await axios.get('/api/users/me', {
                    withCredentials: true,
                });
                if (data) setUser(data);
                setLoading(false);
            } catch (error) {
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
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setErrorLogin(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
    };

    const register = async (data) => {
        try {
            setLoading(true);
            const res = await axios.post('/api/register', data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setErrorLogin(
                error.response && error.response.data.message
                    ? error.response.data.message
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

            setUser(null);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setErrorRegister(
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
                register,
                errorLogin,
                errorRegister,
                errorRegister,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
