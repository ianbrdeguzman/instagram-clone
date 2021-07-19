import React from 'react';
import usePost from '../hooks/usePost';
import Post from '../components/Post';

const PostList = () => {
    const { loading, posts } = usePost();
    return (
        <div className='min-h-screen bg-gray-100 flex flex-col justify-center items-center pt-[62px]'>
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
