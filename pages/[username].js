import dbConnect from '../utils/dbConnect';
import User from '../models/userModel';
import Post from '../models/postModel';
import Layout from '../components/Layout';
import Image from 'next/image';
import Head from 'next/head';
import { FiSettings } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';

const Profile = ({ data, posts }) => {
    const user = JSON.parse(data);
    const postsList = JSON.parse(posts);
    const { user: loginUser } = useAuth();

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
                        {user && user.image && (
                            <div>
                                <Image
                                    src='https://www.w3schools.com/howto/img_avatar.png'
                                    alt='Avatar'
                                    layout='fill'
                                    objectFit='cover'
                                    quality={100}
                                />
                            </div>
                        )}
                        {user && !user.image && (
                            <div className='sm:min-w-[300px] flex justify-center'>
                                <div className='min-w-[77px] min-h-[77px] sm:min-w-[150px] sm:min-h-[150px] border flex justify-center items-center rounded-full'>
                                    <h2 className='uppercase text-3xl'>
                                        {user.name.substring(0, 2)}
                                    </h2>
                                </div>
                            </div>
                        )}
                        <section className='w-full pl-4 relative'>
                            <div className='flex items-center mb-2'>
                                <h2 className='text-3xl font-light mr-4'>
                                    {user.username}
                                </h2>
                                {user.username === loginUser?.username && (
                                    <>
                                        <button className='hidden sm:block border w-full sm:w-auto px-2 py-1 text-sm rounded font-semibold mr-4'>
                                            Edit Profile
                                        </button>
                                        <button className='text-xl'>
                                            <FiSettings />
                                        </button>
                                    </>
                                )}
                            </div>
                            {user.username === loginUser?.username ? (
                                <button className='border w-full sm:w-auto px-2 py-1 text-sm rounded font-semibold sm:hidden'>
                                    Edit Profile
                                </button>
                            ) : (
                                <button className='border w-full sm:w-auto px-2 py-1 text-sm rounded font-semibold sm:hidden'>
                                    Follow
                                </button>
                            )}
                            <ul className='hidden sm:flex'>
                                <li className='mr-10'>
                                    <span className='font-semibold'>0</span>{' '}
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
                                {user.name} or bio
                            </p>
                        </section>
                    </div>
                </header>
                <div className='sm:hidden px-4 pb-4 font-semibold'>
                    <p>{user.name} or bio</p>
                </div>
                <ul className='sm:hidden p-4 grid grid-cols-3 text-sm text-gray-500 border-b border-t'>
                    <li className='flex flex-col text-center'>
                        <span className='font-semibold text-black'>0</span>
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
                <main className='grid grid-cols-3 max-w-[975px] mx-auto gap-1 sm:gap-4'>
                    {postsList.map((post) => {
                        return (
                            <div key={post._id}>
                                <Image
                                    src='/images/sample.jpg'
                                    alt='Post'
                                    width={600}
                                    height={600}
                                    layout='responsive'
                                    priority='true'
                                />
                            </div>
                        );
                    })}
                </main>
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
    console.log(context);
    const username = context.params.username;
    try {
        await dbConnect();

        const user = await User.findOne({ username });

        const posts = await Post.find({ user: user._id });

        const userProfile = {
            email: user.email,
            name: user.name,
            username: user.username,
        };
        return {
            props: {
                data: JSON.stringify(userProfile),
                posts: JSON.stringify(posts),
            },
        };
    } catch (error) {
        console.log(error);
    }
};
