import Link from 'next/link';
import Image from 'next/image';
import cookie from 'cookie';
import PasswordResetForm from '../../../components/forms/PasswordResetForm';

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

const ResetPassword = () => {
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
                <PasswordResetForm />
            </div>
        </div>
    );
};

export default ResetPassword;
