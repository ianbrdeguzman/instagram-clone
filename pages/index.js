import Link from 'next/link';
import Image from 'next/image';
import Form from '../components/Form';
import GetApp from '../components/GetApp';
import Slider from '../components/Slider';

const Home = () => {
    return (
        <div className='min-h-screen bg-gray-100 flex justify-center items-center'>
            <Slider />
            <div className='flex flex-col items-center justify-center'>
                <div className='w-screen sm:max-w-[350px] sm:border sm:bg-white'>
                    <Link href='/'>
                        <h1 className='flex justify-center py-6'>
                            <Image
                                src='/images/logo.png'
                                alt='Logo'
                                width='175'
                                height='60'
                            />
                        </h1>
                    </Link>
                    <Form login />
                </div>
                <div className='w-screen sm:max-w-[350px] my-12 sm:my-2 flex justify-center text-center sm:border'>
                    <p className='w-full text-sm w-3/4 p-0 sm:py-4 sm:bg-white'>
                        Dont have an account?{' '}
                        <span className='text-blue-500 font-semibold'>
                            Sign up
                        </span>
                    </p>
                </div>
                <GetApp />
            </div>
        </div>
    );
};

export default Home;
