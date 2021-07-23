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

    const changePhoto = async (data) => {
        try {
            setLoading(true);
            setError(null);

            const formData = new FormData();
            formData.append('file', data);
            formData.append('upload_preset', 'instagram-clone');
            formData.append('cloud_name', 'ianbrdeguzman');

            const { data: cloudinaryData } = await axios.post(
                'https://api.cloudinary.com/v1_1/ianbrdeguzman/image/upload',
                formData
            );

            const response = await axios.post(
                '/api/change-photo',
                {
                    image: cloudinaryData.url,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            );
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
                changePhoto,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
