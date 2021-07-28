import axios from 'axios';
import { createContext, useReducer } from 'react';

export const PostContext = createContext();

const initialState = {
    loading: false,
    postLoading: false,
    posts: [],
    error: null,
    success: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'POST_GET_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'POST_GET_SUCCESS':
            return {
                ...state,
                posts: action.payload,
                loading: false,
            };
        case 'POST_GET_FAIL':
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case 'POST_CREATE_REQUEST':
            return {
                ...state,
                postLoading: true,
            };
        case 'POST_CREATE_SUCCESS':
            return {
                ...state,
                posts: [action.payload, ...state.posts],
                postLoading: false,
            };
        case 'POST_CREATE_FAIL':
            return {
                ...state,
                error: action.payload,
                postLoading: false,
            };
        default:
            return { ...state };
    }
};

export const PostProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getAllPosts = async () => {
        try {
            dispatch({ type: 'POST_GET_REQUEST' });
            const { data } = await axios.get('/api/post', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            dispatch({ type: 'POST_GET_SUCCESS', payload: data });
        } catch (error) {
            dispatch({ type: 'POST_GET_FAIL', payload: error.message });
        }
    };

    const createPost = async (data, image) => {
        try {
            dispatch({ type: 'POST_CREATE_REQUEST' });

            // set formData
            const formData = new FormData();
            formData.append('file', image);
            formData.append('upload_preset', 'instagram-clone');
            formData.append('clound_name', 'ianbrdeguzman');

            // post image to cloudinary
            const { data: cloudinaryData } = await axios.post(
                'https://api.cloudinary.com/v1_1/ianbrdeguzman/image/upload',
                formData
            );

            // create post body
            const body = {
                caption: data.caption,
                image: cloudinaryData.url,
            };

            // post to create post api route
            const response = await axios.post('/api/post/create', body, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            dispatch({ type: 'POST_CREATE_SUCCESS', payload: response.data });
        } catch (error) {
            dispatch({ type: 'POST_CREATE_FAIL', payload: error.message });
        }
    };

    const likePost = async (postId) => {
        try {
            await axios.put(
                '/api/post/like',
                { postId },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    const unlikePost = async (postId) => {
        try {
            await axios.put(
                '/api/post/unlike',
                { postId },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <PostContext.Provider
            value={{
                ...state,
                getAllPosts,
                createPost,
                likePost,
                unlikePost,
            }}
        >
            {children}
        </PostContext.Provider>
    );
};
