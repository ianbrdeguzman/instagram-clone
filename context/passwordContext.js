import { createContext, useReducer } from 'react';
import passwordReducer from './passwordReducer';
import axios from 'axios';

export const PasswordContext = createContext();

const initialState = {
    loading: false,
    success: null,
    error: null,
    data: null,
};

export const PasswordProvider = ({ children }) => {
    const [state, dispatch] = useReducer(passwordReducer, initialState);

    const resetPassword = async (token, password) => {
        try {
            dispatch({ type: 'PASSWORD_RESET_REQUEST' });

            const response = await axios.post('/api/users/password/reset', {
                token,
                password,
            });

            dispatch({ type: 'PASSWORD_RESET_SUCCESS', payload: response });
        } catch (error) {
            dispatch({
                type: 'PASSWORD_RESET_FAIL',
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

    const forgotPassword = async (email) => {
        try {
            dispatch({ type: 'PASSWORD_FORGOT_REQUEST' });

            const response = await axios.post('/api/users/password/forgot', {
                email,
            });

            if (response?.data.accepted.length > 0) {
                dispatch({
                    type: 'PASSWORD_FORGOT_SUCCESS',
                    payload:
                        'Password reset link has been sent. Please check your email.',
                });
            } else {
                throw new Error({
                    message: 'Oops! Something went wrong.',
                });
            }
        } catch (error) {
            dispatch({
                type: 'PASSWORD_FORGOT_FAIL',
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

    const changePassword = async (data) => {
        try {
            dispatch({ type: 'PASSWORD_CHANGE_REQUEST' });

            const response = await axios.post(
                '/api/users/password/change',
                data,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            );

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
