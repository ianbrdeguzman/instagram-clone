import Link from 'next/link';
import Image from 'next/image';
import Form from '../../../components/Form';
import GetApp from '../../../components/GetApp';

const Register = () => {
    return (
        <div className='min-h-screen bg-gray-100 flex justify-center items-center'>
            <div className='flex flex-col items-center justify-center'>
                <div className='w-screen sm:max-w-[350px] sm:border sm:bg-white'>
                    <Link href='/'>
                        <h1 className='flex justify-center py-6'>
                            <Image
                                src='/images/logo.png'
                                alt='Logo'
                                width='175'
                                height='60'
                                priority
                            />
                        </h1>
                    </Link>
                    <Form />
                </div>
                <div className='w-screen sm:max-w-[350px] my-12 sm:my-2 flex justify-center text-center sm:border'>
                    <p className='w-full text-sm p-0 sm:py-4 sm:bg-white'>
                        Have an account?{' '}
                        <Link href='/accounts/login'>
                            <span className='text-blue-500 font-semibold cursor-pointer'>
                                Log In
                            </span>
                        </Link>
                    </p>
                </div>
                <GetApp />
            </div>
        </div>
    );
};

export default Register;
