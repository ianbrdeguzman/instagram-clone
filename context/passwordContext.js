import { createContext, useState } from 'react';
import axios from 'axios';

export const PasswordContext = createContext();

export const PasswordProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const resetPassword = async (token, password) => {
        try {
            setError(null);
            setLoading(true);
            const response = await axios.post('/api/reset-password', {
                token,
                password,
            });
            setData(response);
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

    const forgotPassword = async (email) => {
        try {
            setError(null);
            setLoading(true);
            const response = await axios.post('/api/forgot-password', {
                email,
            });
            if (response?.data.accepted.length > 0) {
                setData(
                    'Password reset link has been sent. Please check your email.'
                );
                setLoading(false);
            } else {
                throw new Error({
                    message: 'Oops! Something went wrong.',
                });
            }
        } catch (error) {
            setError(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
            setLoading(false);
        }
    };

    const changePassword = async (data) => {
        try {
            setError(null);
            setData(null);
            setLoading(true);
            const response = await axios.post('/api/change-password', data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            setData(response.data);
            setLoading(false);
        } catch (error) {
            setError(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
            setLoading(false);
        }
    };
    return (
        <PasswordContext.Provider
            value={{
                loading,
                data,
                error,
                resetPassword,
                forgotPassword,
                changePassword,
            }}
        >
            {children}
        </PasswordContext.Provider>
    );
};
