import React from 'react';

const Stats = ({ posts, location }) => {
    return location === 'header' ? (
        <>
            <li className='mr-10'>
                <span className='font-semibold'>{posts.length}</span> posts
            </li>
            <li className='mr-10'>
                <span className='font-semibold'>54</span> followers
            </li>
            <li>
                <span className='font-semibold'>27</span> following
            </li>
        </>
    ) : (
        <>
            <li className='flex flex-col text-center'>
                <span className='font-semibold text-black'>{posts.length}</span>
                posts
            </li>
            <li className='flex flex-col text-center'>
                <span className='font-semibold text-black'>54</span>
                followers
            </li>
            <li className='flex flex-col text-center'>
                <span className='font-semibold text-black'>27</span>
                following
            </li>
        </>
    );
};

export default Stats;
