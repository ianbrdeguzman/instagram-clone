import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getAllPosts = async () => {
            try {
                setError(null);
                setLoading(true);
                const { data } = await axios.get('/api/post', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                });

                if (data) setPosts(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(error.message);
            }
        };

        getAllPosts();
    }, []);

    return (
        <PostContext.Provider value={{ loading, posts, error }}>
            {children}
        </PostContext.Provider>
    );
};
