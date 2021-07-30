import { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { BsThreeDots } from 'react-icons/bs';
import { FiSend } from 'react-icons/fi';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
import { MdBookmarkBorder } from 'react-icons/md';
import { AiOutlineMessage, AiOutlineSmile } from 'react-icons/ai';
import usePost from '../hooks/usePost';
import useUser from '../hooks/useUser';

const Post = ({ post }) => {
    const {
        _id,
        caption,
        image,
        likes,
        comments,
        user: { _id: userId, username, image: userImage },
    } = post;

    const { user } = useUser();
    const { likePost, unlikePost, commentPost } = usePost();
    const { register, handleSubmit, watch } = useForm();

    const [like, setLike] = useState(likes.includes(userId));

    const handleOnSubmit = (data) => {
        const obj = {
            postId: _id,
            text: data.comment,
            user: {
                _id: user._id,
                username: user.username,
            },
        };
        commentPost(obj);
    };

    const handlePostLike = (postId) => {
        setLike(!like);
        likePost(postId);
    };

    const handlePostUnlike = (postId) => {
        setLike(!like);
        unlikePost(postId);
    };

    return (
        <article className='bg-white w-screen mb-4 text-sm max-w-[600px] sm:border sm:rounded overflow-x-hidden'>
            <header className='flex justify-between border-b p-4'>
                <div className='flex items-center'>
                    <div className='border w-[42px] h-[42px] rounded-full overflow-hidden mr-4'>
                        <Image
                            src={userImage}
                            alt={username}
                            width={42}
                            height={42}
                            layout='responsive'
                        />
                    </div>
                    <p className='font-semibold'>{username}</p>
                </div>
                <button className='text-lg'>
                    <BsThreeDots />
                </button>
            </header>
            <main className='w-full max-w-[600px]'>
                <Image
                    src={image}
                    alt='post'
                    width={600}
                    height={600}
                    priority='true'
                    layout='responsive'
                />
            </main>
            <footer className='p-4 pb-0'>
                <div className='flex text-2xl'>
                    <ul className='flex flex-1'>
                        <li className='mr-4'>
                            {like ? (
                                <button
                                    onClick={() => handlePostUnlike(_id)}
                                    className='hover:opacity-50 transition'
                                >
                                    <IoMdHeart />
                                </button>
                            ) : (
                                <button
                                    onClick={() => handlePostLike(_id)}
                                    className='hover:opacity-50 transition'
                                >
                                    <IoMdHeartEmpty />
                                </button>
                            )}
                        </li>
                        <li className='mr-4'>
                            <button className='hover:opacity-50 transition'>
                                <AiOutlineMessage />
                            </button>
                        </li>
                        <li className='mr-4'>
                            <button className='hover:opacity-50 transition'>
                                <FiSend />
                            </button>
                        </li>
                    </ul>
                    <button className='self-start hover:opacity-50 transition'>
                        <MdBookmarkBorder />
                    </button>
                </div>
                <div className='flex sm:mb-4'>
                    <span className='mr-2 font-semibold'>{username}</span>
                    <span>{caption}</span>
                </div>
            </footer>
            <ul className='sm:hidden'>
                {comments?.map(({ text, user: { _id, username } }) => {
                    return (
                        <li key={_id} className='px-4'>
                            <span className='mr-2 font-semibold'>
                                {username}
                            </span>
                            <span>{text}</span>
                        </li>
                    );
                })}
            </ul>
            <form
                className='border-t p-4 mt-4 flex sm:hidden'
                onSubmit={handleSubmit(handleOnSubmit)}
            >
                <button type='button' className='text-2xl'>
                    <AiOutlineSmile />
                </button>
                <input
                    type='text'
                    {...register('comment', {
                        required: true,
                    })}
                    id='comment'
                    placeholder='Add a comment...'
                    className='flex-1 px-4 outline-none'
                />
                {watch('comment')?.length > 0 ? (
                    <button
                        type='submit'
                        className='text-blue-500 font-semibold'
                    >
                        Post
                    </button>
                ) : (
                    <button
                        disabled
                        type='submit'
                        className='text-blue-500 opacity-50 font-semibold'
                    >
                        Post
                    </button>
                )}
            </form>
        </article>
    );
};

export default Post;
