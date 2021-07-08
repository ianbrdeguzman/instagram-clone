import { createContext, useState } from 'react';
import axios from 'axios';

export const RegisterContext = createContext();

export const RegisterProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const register = async (data) => {
        try {
            setLoading(true);
            await axios.post('/api/register', data);
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
        <RegisterContext.Provider
            value={{
                loading,
                register,
                error,
            }}
        >
            {children}
        </RegisterContext.Provider>
    );
};
