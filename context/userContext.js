import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import userReducer from './userReducer';

export const UserContext = createContext();

const initialState = {
    loading: false,
    user: null,
    error: null,
    loadError: null,
    success: false,
    successAvatar: false,
};

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    useEffect(() => {
        const loadUser = async () => {
            try {
                dispatch({ type: 'USER_LOAD_REQUEST' });

                const { data } = await axios.get('/api/users/me', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                });

                dispatch({ type: 'USER_LOAD_SUCCESS', payload: data });
            } catch (error) {
                dispatch({ type: 'USER_LOAD_FAIL', payload: error.message });
                localStorage.removeItem('token');
            }
        };
        loadUser();
    }, []);

    const login = async (data) => {
        try {
            dispatch({ type: 'USER_LOGIN_REQUEST' });

            const response = await axios.post('/api/users/login', data);

            localStorage.setItem('token', response.data.token);
            dispatch({ type: 'USER_LOGIN_SUCCESS', payload: response.data });
        } catch (error) {
            dispatch({
                type: 'USER_LOGIN_FAIL',
                payload:
                    error.response && error.response.data
                        ? error.response.data
                        : error.message,
            });
        }
    };

    const logout = async () => {
        try {
            dispatch({ type: 'USER_LOGOUT_REQUEST' });

            await axios.post('/api/users/logout', {
                withCredentials: true,
            });

            dispatch({ type: 'USER_LOGOUT_SUCCESS' });
            localStorage.removeItem('token');
        } catch (error) {
            dispatch({
                type: 'USER_LOGOUT_FAIL',
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

    const register = async (data) => {
        try {
            dispatch({ type: 'USER_REGISTER_REQUEST' });

            const response = await axios.post('/api/users/register', data);

            dispatch({ type: 'USER_REGISTER_SUCCESS', payload: response.data });
        } catch (error) {
            dispatch({
                type: 'USER_REGISTER_FAIL',
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

    const editProfile = async (data) => {
        try {
            dispatch({ type: 'USER_EDIT_PROFILE_REQUEST' });

            const response = await axios.post('/api/users/edit/profile', data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            dispatch({
                type: 'USER_EDIT_PROFILE_SUCCESS',
                payload: response.data,
            });
        } catch (error) {
            dispatch({
                type: 'USER_EDIT_PROFILE_FAIL',
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

    const changePhoto = async (data) => {
        try {
            dispatch({ type: 'USER_EDIT_AVATAR_REQUEST' });

            const formData = new FormData();
            formData.append('file', data);
            formData.append('upload_preset', 'instagram-clone');
            formData.append('cloud_name', 'ianbrdeguzman');

            const { data: cloudinaryData } = await axios.post(
                'https://api.cloudinary.com/v1_1/ianbrdeguzman/image/upload',
                formData
            );

            const response = await axios.post(
                '/api/users/edit/avatar',
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

            dispatch({
                type: 'USER_EDIT_AVATAR_SUCCESS',
                payload: response.data,
            });
        } catch (error) {
            dispatch({
                type: 'USER_EDIT_AVATAR_FAIL',
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

    const removePhoto = async () => {
        try {
            dispatch({ type: 'USER_REMOVE_AVATAR_REQUEST' });

            const { data } = await axios.get('/api/users/edit/avatar', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            dispatch({ type: 'USER_REMOVE_AVATAR_SUCCESS', payload: data });
        } catch (error) {
            dispatch({
                type: 'USER_REMOVE_AVATAR_FAIL',
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

    return (
        <UserContext.Provider
            value={{
                ...state,
                login,
                logout,
                register,
                editProfile,
                changePhoto,
                removePhoto,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
