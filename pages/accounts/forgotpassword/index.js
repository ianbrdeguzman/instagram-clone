import ForgotPasswordForm from '../../../components/ForgotPasswordForm';
import Link from 'next/link';
import Image from 'next/image';

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

const ForgotPassword = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
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
                <ForgotPasswordForm />
            </div>
        </div>
    );
};

export default ForgotPassword;
