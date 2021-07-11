import Link from 'next/link';
import Image from 'next/image';
import GetApp from '../../../components/GetApp';
import Slider from '../../../components/Slider';
import cookie from 'cookie';
import LoginForm from '../../../components/LoginForm';

export const getServerSideProps = ({ req, res }) => {
    if (req.headers.cookie) {
        const { refreshToken } = cookie.parse(req.headers.cookie);

        if (refreshToken) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            };
        }
    } else {
        return {
            props: {},
        };
    }
};

const Login = () => {
    return (
        <div className='min-h-screen bg-gray-100 flex justify-center items-center'>
            <Slider />
            <div className='flex flex-col items-center justify-center'>
                <div className='w-screen sm:max-w-[350px] sm:border sm:bg-white'>
                    <Link href='/'>
                        <a className='flex justify-center py-6'>
                            <Image
                                src='/images/logo.png'
                                alt='Logo'
                                width='175'
                                height='60'
                                priority
                            />
                        </a>
                    </Link>
                    <LoginForm />
                </div>
                <div className='w-screen sm:max-w-[350px] my-12 sm:my-2 flex justify-center text-center sm:border'>
                    <p className='w-full text-sm p-0 sm:py-4 sm:bg-white'>
                        Dont have an account?{' '}
                        <Link href='/accounts/emailsignup'>
                            <a className='text-blue-500 font-semibold cursor-pointer'>
                                Sign Up
                            </a>
                        </Link>
                    </p>
                </div>
                <GetApp />
            </div>
        </div>
    );
};

export default Login;
