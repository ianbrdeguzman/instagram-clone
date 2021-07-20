import React from 'react';
import useAuth from '../hooks/useAuth';
import Link from 'next/link';

const Sidebar = () => {
    const { user } = useAuth();

    return (
        <div className='mt-[62px] min-w-[300px] ml-4 hidden lg:block sticky top-[62px] text-sm text-gray-500'>
            <Link href={`/${user.username}`}>
                <a className='p-4 flex justify-between items-center'>
                    <div className='border w-[56px] h-[56px] flex justify-center items-center uppercase rounded-full mr-4'>
                        {user.username.substring(0, 2)}
                    </div>
                    <div className='flex-1'>
                        <h2 className='font-semibold text-black'>
                            {user.username}
                        </h2>
                        <p>{user.name}</p>
                    </div>
                </a>
            </Link>

            <div className='border mx-4'>
                <button className='py-1 w-full rounded bg-white rounded text-blue-500 font-semibold'>
                    Post
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
