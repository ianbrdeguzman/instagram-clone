import { useContext } from 'react';
import { PostContext } from '../context/postContext';

const usePost = () => {
    return useContext(PostContext);
};

export default usePost;
