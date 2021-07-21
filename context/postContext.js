import axios from 'axios';
import { createContext, useState } from 'react';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [createPostLoading, setCreatePostLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    const getAllPosts = async () => {
        try {
            setError(null);
            setLoading(true);
            const { data } = await axios.get('/api/post', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (data) setPosts(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    const createPost = async (data, image) => {
        try {
            setError(null);
            setCreatePostLoading(true);

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
            const { data: postData } = await axios.post(
                '/api/post/create',
                body,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            );
            const newPosts = [postData, ...posts];

            setPosts(newPosts);
            setCreatePostLoading(false);
        } catch (error) {
            setError(error.message);
            setCreatePostLoading(false);
        }
    };

    return (
        <PostContext.Provider
            value={{
                loading,
                createPostLoading,
                posts,
                error,
                getAllPosts,
                createPost,
            }}
        >
            {children}
        </PostContext.Provider>
    );
};
