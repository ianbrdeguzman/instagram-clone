import { createContext, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const register = async (data) => {
        try {
            setError(null);
            setLoading(true);
            const response = await axios.post('/api/register', data);
            setSuccess(response.data);
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

    const editProfile = async (data) => {
        try {
            setError(null);
            setData(null);
            setLoading(true);

            const response = await axios.post('/api/edit-profile', data, {
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
        <UserContext.Provider
            value={{
                loading,
                success,
                error,
                data,
                register,
                editProfile,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
