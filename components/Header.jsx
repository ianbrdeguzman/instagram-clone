import Image from 'next/image';
import Link from 'next/link';
import { BiSearch, BiBookmark } from 'react-icons/bi';
import {
    AiOutlineHome,
    AiOutlineCompass,
    AiOutlineHeart,
} from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { FiSend, FiSettings } from 'react-icons/fi';
import { HiSwitchHorizontal } from 'react-icons/hi';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Header = () => {
    const { user, logout } = useAuth();
    const { push } = useRouter();
    const [show, setShow] = useState(false);

    const onLogOut = async () => {
        await logout();
        push('/accounts/login');
    };

    return (
        <header className='border-b w-screen h-[54px] flex justify-between items-center fixed top-0 left-0 bg-white px-[20px]'>
            <div className='max-w-[975px] flex items-center'>
                <Link href='/'>
                    <a className='flex items-center'>
                        <Image
                            src='/images/logo.png'
                            alt='Logo'
                            width={103}
                            height={29}
                        ></Image>
                    </a>
                </Link>
            </div>
            <div>
                <form className='relative'>
                    <span className='hidden sm:block absolute top-1/2 -translate-y-1/2 left-3 text-gray-500'>
                        <BiSearch />
                    </span>
                    <input
                        type='text'
                        id='search'
                        placeholder='Search'
                        aria-required='true'
                        autoCapitalize='off'
                        autoCorrect='off'
                        className='h-[28px] hidden sm:block text-sm border bg-gray-100 rounded p-2 pl-8'
                    />
                </form>
            </div>
            <nav className='flex text-2xl'>
                <Link href='/'>
                    <a>
                        <AiOutlineHome />
                    </a>
                </Link>
                <Link href='/'>
                    <a className='mx-2'>
                        <FiSend />
                    </a>
                </Link>
                <Link href='/'>
                    <a>
                        <AiOutlineCompass />
                    </a>
                </Link>
                <Link href='/'>
                    <a className='mx-2'>
                        <AiOutlineHeart />
                    </a>
                </Link>
                <button
                    onClick={() => setShow(!show)}
                    className='flex text-sm m border rounded-full p-1 bg-gray-100'
                >
                    <span className='uppercase'>
                        {user?.username.substring(0, 2)}
                    </span>
                </button>
                {show && (
                    <ul className='w-[230px] bg-white absolute top-[50px] right-0 text-sm rounded shadow'>
                        <li className='py-2 px-4 cursor-pointer hover:bg-gray-100 flex items-center'>
                            <span className='mr-2 text-base'>
                                <CgProfile />
                            </span>
                            Profile
                        </li>
                        <li className='py-2 px-4 cursor-pointer hover:bg-gray-100 flex items-center'>
                            <span className='mr-2 text-base'>
                                <BiBookmark />
                            </span>
                            Saved
                        </li>
                        <li className='py-2 px-4 cursor-pointer hover:bg-gray-100 flex items-center'>
                            <span className='mr-2 text-base'>
                                <FiSettings />
                            </span>
                            Settings
                        </li>
                        <li className='py-2 px-4 cursor-pointer hover:bg-gray-100 flex items-center'>
                            <span className='mr-2 text-base'>
                                <HiSwitchHorizontal />
                            </span>
                            Switch Accounts
                        </li>
                        <li
                            onClick={onLogOut}
                            className='py-2 px-4 border-t cursor-pointer hover:bg-gray-100'
                        >
                            Log Out
                        </li>
                    </ul>
                )}
            </nav>
        </header>
    );
};

export default Header;
