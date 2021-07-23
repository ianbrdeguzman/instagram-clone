import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { BsThreeDots } from 'react-icons/bs';
import { FiSend } from 'react-icons/fi';
import { IoMdHeartEmpty } from 'react-icons/io';
import { MdBookmarkBorder } from 'react-icons/md';
import { AiOutlineMessage, AiOutlineSmile } from 'react-icons/ai';
import useUser from '../hooks/useUser';

const Post = ({ post }) => {
    const {
        _id,
        caption,
        image,
        user: { _id: userId, username },
    } = post;

    const { user } = useUser();

    const { register, handleSubmit, watch } = useForm();

    const handleOnSubmit = (data) => {
        console.log(`comment = ${data.comment}`);
        console.log(`post id = ${_id}`);
        console.log(`user commenting = ${user.username}`);
    };

    return (
        <article className='bg-white w-screen mb-4 text-sm max-w-[600px] sm:border sm:rounded'>
            <header className='flex border-b p-4'>
                <div className='flex items-center flex-1'>
                    <p className='border w-[42px] h-[42px] rounded-full flex justify-center items-center mr-4 uppercase'>
                        {username.substring(0, 2)}
                    </p>
                    <p className='font-semibold'>{username}</p>
                </div>
                <button className='text-lg'>
                    <BsThreeDots />
                </button>
            </header>
            <main>
                <Image
                    src={image}
                    alt='post'
                    width={600}
                    height={600}
                    priority='true'
                ></Image>
            </main>
            <footer className='p-4'>
                <div className='flex text-2xl'>
                    <ul className='flex flex-1 pb-4'>
                        <li className='mr-4'>
                            <button className='hover:opacity-50 transition'>
                                <IoMdHeartEmpty />
                            </button>
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
                <div className='flex'>
                    <h3 className='mr-4 font-semibold'>{username}</h3>
                    <p>{caption}</p>
                </div>
            </footer>
            <form
                className='border-t p-4 flex sm:hidden'
                onSubmit={handleSubmit(handleOnSubmit)}
            >
                <button className='text-2xl'>
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
