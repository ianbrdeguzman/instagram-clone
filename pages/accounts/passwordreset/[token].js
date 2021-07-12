import { useRouter } from 'next/router';
import PasswordResetForm from '../../../components/PasswordResetForm';
import Link from 'next/link';
import Image from 'next/image';

const ForgotPassword = () => {
    const { query } = useRouter();
    console.log(query.token);
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

export default ForgotPassword;
