import React, { useEffect } from 'react';
import usePost from '../hooks/usePost';
import Post from '../components/Post';

const PostList = () => {
    const { loading, posts, getAllPosts } = usePost();

    useEffect(() => {
        getAllPosts();
    }, []);
    return (
        <div className='min-h-sc flex flex-col justify-center items-center mt-[62px]'>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                posts.map((post) => {
                    const { _id } = post;
                    return <Post key={_id} post={post} />;
                })
            )}
        </div>
    );
};

export default PostList;
