import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';

export const UserContext = createContext();

const initialState = {
    loading: false,
    user: null,
    error: null,
    loadError: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'USER_LOAD_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'USER_LOAD_SUCCESS':
            return {
                ...state,
                user: action.payload,
                loading: false,
            };
        case 'USER_LOAD_FAIL':
            return {
                ...state,
                loadError: action.payload,
                loading: false,
            };
        case 'USER_LOGIN_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'USER_LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload,
                loading: false,
            };
        case 'USER_LOGIN_FAIL':
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case 'USER_LOGOUT_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'USER_LOGOUT_SUCCESS':
            return {
                ...state,
                user: null,
                loading: false,
            };
        case 'USER_LOGOUT_FAIL':
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

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

            const response = await axios.post('/api/login', data);

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

            await axios.post('/api/logout', {
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
                ...state,
                login,
                logout,
                register,
                editProfile,
                changePhoto,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
