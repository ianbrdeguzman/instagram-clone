import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { FiImage } from 'react-icons/fi';
import usePost from '../hooks/usePost';

const Sidebar = () => {
    const { user } = useAuth();
    const { register, handleSubmit, watch, reset } = useForm();
    const { createPost, createPostLoading } = usePost();

    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState(null);

    const handleOnChange = (e) => {
        setImage(e.target.files[0]);
        setImageURL(URL.createObjectURL(e.target.files[0]));
    };

    const handleOnSubmit = async (data) => {
        await createPost(data, image);
        setOpen(false);
        setImage(null);
        setImageURL(null);
        reset();
    };

    return (
        user && (
            <div className='mt-[62px] min-w-[300px] ml-4 hidden lg:block sticky top-[62px] text-sm text-gray-500'>
                <header className='p-4 flex justify-between items-center'>
                    <Link href={`/${user.username}`}>
                        <a className='border w-[56px] h-[56px] flex justify-center items-center uppercase rounded-full mr-4'>
                            {user.username.substring(0, 2)}
                        </a>
                    </Link>
                    <div className='flex-1'>
                        <Link href={`/${user.username}`}>
                            <a className='font-semibold text-black hover:underline'>
                                {user.username}
                            </a>
                        </Link>
                        <p>{user.name}</p>
                    </div>
                </header>
                <div className='mx-4'>
                    {open ? (
                        <form onSubmit={handleSubmit(handleOnSubmit)}>
                            {createPostLoading ? (
                                <div className='h-full flex justify-center items-center'>
                                    <h3>Loading...</h3>
                                </div>
                            ) : (
                                <>
                                    <label
                                        htmlFor='image'
                                        className='block border w-full h-[268px] cursor-pointer'
                                    >
                                        <input
                                            type='file'
                                            {...register('image', {
                                                required: true,
                                            })}
                                            id='image'
                                            className='hidden'
                                            accept='image/*'
                                            onChange={handleOnChange}
                                        />
                                        {imageURL ? (
                                            <Image
                                                src={imageURL}
                                                alt='Post'
                                                loader={() => imageURL}
                                                width={300}
                                                height={300}
                                                layout='responsive'
                                            />
                                        ) : (
                                            <div className='h-full flex justify-center items-center'>
                                                <FiImage size={24} />
                                                Upload Image
                                            </div>
                                        )}
                                    </label>
                                    <input
                                        type='text'
                                        {...register('caption', {
                                            required: true,
                                        })}
                                        id='caption'
                                        placeholder='Add a caption...'
                                        className='my-2 pl-2 py-1 block w-full outline-none rounded text-sm'
                                    />
                                    <button
                                        type='submit'
                                        className={`block py-1 w-full rounded bg-white rounded font-semibold text-center ${
                                            watch('caption') && watch('image')
                                                ? 'text-blue-500'
                                                : 'text-blue-100'
                                        }`}
                                    >
                                        Post
                                    </button>
                                </>
                            )}
                        </form>
                    ) : (
                        <button
                            onClick={() => setOpen(true)}
                            className='block py-1 w-full rounded bg-white rounded text-blue-500 font-semibold text-center'
                        >
                            Post
                        </button>
                    )}
                </div>
            </div>
        )
    );
};

export default Sidebar;
