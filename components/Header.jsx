import Image from 'next/image';
import Link from 'next/link';
import { BiSearch } from 'react-icons/bi';

const Header = () => {
    return (
        <header className='border-b w-screen h-[54px] flex justify-center items-center fixed top-0 left-0 bg-white px-[20px]'>
            <div className='w-full max-w-[975px] flex items-center'>
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
                    <div className='text-transparent focus-within:text-gray-500'>
                        <span className='absolute top-1/2 -translate-y-1/2 left-2'>
                            <BiSearch />
                        </span>
                        <input
                            type='text'
                            id='search'
                            placeholder='Search'
                            aria-required='true'
                            autoCapitalize='off'
                            autoCorrect='off'
                            className='h-[28px] hidden sm:block text-sm border bg-gray-100 rounded p-2 pl-8 placeholder-gray-500 focus:placeholder-gray-500 focus:placeholder-opacity-1 placeholder-opacity-0'
                        />
                    </div>
                </form>
            </div>
            <div></div>
        </header>
    );
};

export default Header;
