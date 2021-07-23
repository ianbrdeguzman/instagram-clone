import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/userModel';
import ChangePasswordForm from '../../../components/forms/ChangePasswordForm';
import EditProfileForm from '../../../components/forms/EditProfileForm';
import Layout from '../../../components/Layout';

const EditProfile = ({ data }) => {
    const [selected, setSelected] = useState('edit');

    const { user } = JSON.parse(data);

    return (
        <Layout>
            <Head>
                {selected === 'edit' ? (
                    <title>Edit Profile • Instagram</title>
                ) : (
                    <title>Change Password • Instagram</title>
                )}
            </Head>
            <div className='h-screen bg-gray-100 pt-[54px]'>
                <div className='bg-white max-w-[900px] mx-auto mt-8 flex border rounded'>
                    <ul className='min-w-[240px] border-r hidden md:block'>
                        <li
                            onClick={() => setSelected('edit')}
                            className={`p-4 pl-8 hover:bg-gray-100 border-l-2 hover:border-gray-200 ${
                                selected === 'edit' &&
                                'font-semibold border-l-2 border-black'
                            }`}
                        >
                            Edit Profile
                        </li>
                        <li
                            onClick={() => setSelected('change')}
                            className={`p-4 pl-8 hover:bg-gray-100 border-l-2 hover:border-gray-200 ${
                                selected === 'change' &&
                                'font-semibold border-black'
                            }`}
                        >
                            Change Password
                        </li>
                    </ul>
                    <div className='w-full'>
                        <div className='p-4 pr-8 pt-8 w-full sm:min-w-[660px]'>
                            {user && (
                                <div className='flex items-center'>
                                    <div className='sm:min-w-[200px]'>
                                        <div className='h-[38px] w-[38px] overflow-hidden rounded-full sm:ml-40'>
                                            <Image
                                                src={user.image}
                                                alt={user.username}
                                                width={38}
                                                height={38}
                                                layout='responsive'
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Link href={`/${user.username}`}>
                                            <a className='text-2xl ml-4'>
                                                {user.username}
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                        {selected === 'edit' && (
                            <div className='p-4 pr-8 w-full sm:min-w-[660px]'>
                                <EditProfileForm />
                                <div className='sm:ml-[216px]'>
                                    <Link href='/accounts/forgotpassword'>
                                        <a className='text-sm text-blue-500 font-semibold'>
                                            Forgot Password?
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        )}
                        {selected === 'change' && (
                            <div className='p-4 pr-8 w-full sm:min-w-[660px]'>
                                <ChangePasswordForm />
                                <div className='sm:ml-[216px]'>
                                    <Link href='/accounts/forgotpassword'>
                                        <a className='text-sm text-blue-500 font-semibold'>
                                            Forgot Password?
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default EditProfile;

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

        user.password = undefined;

        return {
            props: {
                data: JSON.stringify(user),
            },
        };
    } catch (error) {
        console.log(error);
    }
};
