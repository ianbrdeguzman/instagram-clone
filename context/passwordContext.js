import { createContext, useReducer } from 'react';
import passwordReducer from './passwordReducer';
import axios from 'axios';

export const PasswordContext = createContext();

const initialState = {
    loading: false,
    success: null,
    error: null,
};

export const PasswordProvider = ({ children }) => {
    const [state, dispatch] = useReducer(passwordReducer, initialState);

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
            dispatch({ type: 'PASSWORD_CHANGE_REQUEST' });

            const response = await axios.post('/api/password/change', data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            dispatch({
                type: 'PASSWORD_CHANGE_SUCCESS',
                payload: response.data,
            });
        } catch (error) {
            dispatch({
                type: 'PASSWORD_CHANGE_FAIL',
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

    return (
        <PasswordContext.Provider
            value={{
                ...state,
                changePassword,
                resetPassword,
                forgotPassword,
            }}
        >
            {children}
        </PasswordContext.Provider>
    );
};
