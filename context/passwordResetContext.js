import { createContext, useState } from 'react';
import axios from 'axios';

export const PasswordResetContext = createContext();

export const PasswordResetProvider = ({ children }) => {
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

    return (
        <PasswordResetContext.Provider
            value={{
                loading,
                resetPassword,
                forgotPassword,
                data,
                error,
            }}
        >
            {children}
        </PasswordResetContext.Provider>
    );
};
