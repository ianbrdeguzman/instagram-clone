import dbConnect from '../utils/dbConnect';
import User from '../models/userModel';
import Post from '../models/postModel';
import Layout from '../components/Layout';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { FiSettings } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';
import { useState } from 'react';
import useUser from '../hooks/useUser';
import ChangePhoto from '../components/modal/ChangePhoto';

const Profile = ({ data, posts }) => {
    const user = JSON.parse(data);
    const postsList = JSON.parse(posts);
    const { user: loginUser } = useAuth();
    const { loading } = useUser();

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Layout>
            <Head>
                <title>
                    {user.name} (@{user.username})
                </title>
            </Head>
            <div className='min-h-screen bg-gray-100'>
                <header className='pt-[54px] max-w-[975px] mx-auto sm:border-b'>
                    <div className='p-4 flex items-center sm:py-8'>
                        {user && (
                            <div className='sm:min-w-[300px] flex justify-center'>
                                {loading ? (
                                    <div className='min-w-[77px] min-h-[77px] sm:min-w-[150px] sm:min-h-[150px] border rounded-full overflow-hidden flex justify-center items-center'>
                                        <p>Loading...</p>
                                    </div>
                                ) : (
                                    <div
                                        onClick={() =>
                                            setIsModalOpen(!isModalOpen)
                                        }
                                        className='min-w-[77px] min-h-[77px] sm:min-w-[150px] sm:min-h-[150px] border rounded-full overflow-hidden cursor-pointer'
                                    >
                                        <Image
                                            src={user.image}
                                            alt={user.username}
                                            width={150}
                                            height={150}
                                            layout='responsive'
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                        <section className='w-full pl-4 relative'>
                            <div className='flex items-center mb-2'>
                                <h2 className='text-xl sm:text-3xl font-light mr-4'>
                                    {user.username}
                                </h2>
                                {user.username === loginUser?.username ? (
                                    <Link
                                        href={`/accounts/edit/${user.username}`}
                                    >
                                        <a className='hidden sm:block border w-full sm:w-auto px-2 py-1 text-sm rounded font-semibold mr-4'>
                                            Edit Profile
                                        </a>
                                    </Link>
                                ) : (
                                    <button className='hidden sm:block border w-full sm:w-auto px-2 py-1 text-sm rounded font-semibold mr-4'>
                                        Follow
                                    </button>
                                )}
                            </div>
                            {user.username === loginUser?.username ? (
                                <Link href='/accounts/edit'>
                                    <a className='block text-center border w-full sm:w-auto px-2 py-1 text-sm rounded font-semibold sm:hidden'>
                                        Edit Profile
                                    </a>
                                </Link>
                            ) : (
                                <button className='block text-center border w-full sm:w-auto px-2 py-1 text-sm rounded font-semibold sm:hidden'>
                                    Follow
                                </button>
                            )}
                            <ul className='hidden sm:flex'>
                                <li className='mr-10'>
                                    <span className='font-semibold'>
                                        {postsList.length}
                                    </span>{' '}
                                    posts
                                </li>
                                <li className='mr-10'>
                                    <span className='font-semibold'>54</span>{' '}
                                    followers
                                </li>
                                <li>
                                    <span className='font-semibold'>27</span>{' '}
                                    following
                                </li>
                            </ul>
                            <p className='py-2 font-semibold hidden sm:block'>
                                {user.bio || user.name}
                            </p>
                        </section>
                    </div>
                </header>
                <div className='sm:hidden px-4 pb-4 font-semibold'>
                    <p>{user.bio || user.name}</p>
                </div>
                <ul className='sm:hidden p-4 grid grid-cols-3 text-sm text-gray-500 border-b border-t'>
                    <li className='flex flex-col text-center'>
                        <span className='font-semibold text-black'>
                            {postsList.length}
                        </span>
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
                </ul>
                <main className='grid grid-cols-3 max-w-[975px] mx-auto gap-1 sm:gap-4 mt-4'>
                    {postsList.map((post) => {
                        return (
                            <div key={post._id}>
                                <Image
                                    src={post.image}
                                    alt={post.caption}
                                    width={600}
                                    height={600}
                                    layout='responsive'
                                    priority='true'
                                />
                            </div>
                        );
                    })}
                </main>
                {isModalOpen && (
                    <ChangePhoto
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                    />
                )}
            </div>
        </Layout>
    );
};

export default Profile;

export const getStaticPaths = async () => {
    try {
        await dbConnect();

        const users = await User.find({});

        const paths = users.map((user) => {
            return {
                params: { username: user.username },
            };
        });

        return {
            paths: paths,
            fallback: false,
        };
    } catch (error) {
        console.log(error);
    }
};

export const getStaticProps = async (context) => {
    const username = context.params.username;
    try {
        await dbConnect();

        let user = await User.findOne({ username });

        const posts = await Post.find({ user: user._id }).sort({
            createdAt: 'desc',
        });

        user.password = undefined;
        return {
            props: {
                data: JSON.stringify(user),
                posts: JSON.stringify(posts),
            },
        };
    } catch (error) {
        console.log(error);
    }
};
