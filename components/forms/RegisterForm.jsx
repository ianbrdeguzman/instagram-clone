import Error from '../Error';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { AiFillFacebook, AiOutlineCloseCircle } from 'react-icons/ai';
import useUser from '../../hooks/useUser';

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const { register: registerUser, loading, error, success } = useUser();

    const onRegister = async (data) => {
        await registerUser(data);
    };

    return (
        <main className='flex flex-col justify-center items-center'>
            <div className='w-3/4 text-gray-500 font-semibold text-center'>
                <h2>Sign up to see photos and videos from your friends.</h2>
                <button className='w-full flex justify-center text-sm text-white font-semibold mt-4 h-full flex align-center bg-blue-500 py-1.5 rounded'>
                    <span className='text-xl mr-2'>
                        <AiFillFacebook />
                    </span>
                    <span>Log in with Facebook</span>
                </button>
            </div>
            <div className='w-3/4 flex justify-between my-4'>
                <div className='border-t flex-1 mt-2'></div>
                <div className='mx-4 text-gray-400 font-semibold text-sm'>
                    OR
                </div>
                <div className='border-t flex-1 mt-2'></div>
            </div>
            {success && (
                <p className='text-sm mb-4 border w-3/4 text-center py-1 rounded bg-green-100 text-gray-500'>
                    {success.message}{' '}
                    <Link href='/accounts/login'>
                        <a className='text-blue-500 font-semibold'>Log In</a>
                    </Link>
                </p>
            )}
            <form className='w-3/4 text-xs' onSubmit={handleSubmit(onRegister)}>
                <label className='relative'>
                    <input
                        type='text'
                        {...register('email', {
                            required: true,
                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        })}
                        id='email'
                        placeholder='Email'
                        aria-required='true'
                        autoCapitalize='off'
                        autoCorrect='off'
                        className='w-full border p-2 outline-none focus:ring-1 focus:ring-gray-500 rounded-sm mb-2 bg-gray-100'
                    />
                    {errors.email && (
                        <span className='absolute top-0 right-1 text-base text-red-500'>
                            <AiOutlineCloseCircle />
                        </span>
                    )}
                </label>
                <label className='relative'>
                    <input
                        type='text'
                        {...register('name', {
                            required: true,
                            minLength: 3,
                            maxLength: 20,
                        })}
                        id='name'
                        placeholder='Full Name'
                        aria-required='true'
                        autoCapitalize='off'
                        autoCorrect='off'
                        className='w-full border p-2 outline-none focus:ring-1 focus:ring-gray-500 rounded-sm mb-2 bg-gray-100'
                    />
                    {errors.name && (
                        <span className='absolute top-0 right-1 text-base text-red-500'>
                            <AiOutlineCloseCircle />
                        </span>
                    )}
                </label>
                <label className='relative'>
                    <input
                        type='text'
                        {...register('username', {
                            required: true,
                            minLength: 6,
                            maxLength: 20,
                        })}
                        id='username'
                        placeholder='Username'
                        aria-required='true'
                        autoCapitalize='off'
                        autoCorrect='off'
                        className='w-full border p-2 outline-none focus:ring-1 focus:ring-gray-500 rounded-sm mb-2 bg-gray-100'
                    />
                    {errors.username && (
                        <span className='absolute top-0 right-1 text-base text-red-500'>
                            <AiOutlineCloseCircle />
                        </span>
                    )}
                </label>
                <label className='relative'>
                    <input
                        type='password'
                        {...register('password', {
                            required: true,
                            minLength: 6,
                            maxLength: 20,
                        })}
                        id='password'
                        placeholder='Password'
                        aria-required='true'
                        autoCapitalize='off'
                        autoCorrect='off'
                        autoComplete='on'
                        className='w-full border p-2 outline-none focus:ring-1 focus:ring-gray-500 rounded-sm bg-gray-100'
                    />
                    {errors.password && (
                        <span className='absolute top-0 right-1 text-base text-red-500'>
                            <AiOutlineCloseCircle />
                        </span>
                    )}
                </label>
                {watch('password')?.length >= 6 &&
                watch('email')?.length !== 0 ? (
                    <button
                        className='bg-blue-500 w-full py-2 my-4 rounded text-white font-semibold'
                        type='submit'
                    >
                        {loading ? 'Loading...' : 'Sign Up'}
                    </button>
                ) : (
                    <button
                        className='bg-blue-200 w-full py-2 my-4 rounded text-white font-semibold cursor-default'
                        type='submit'
                        disabled
                    >
                        {loading ? 'Loading...' : 'Sign Up'}
                    </button>
                )}
            </form>
            {error && <Error>{error}</Error>}
            <div className='w-3/4 text-gray-500 text-center text-xs mb-8'>
                <p>
                    By signing up, you agree to our{' '}
                    <span className='font-semibold'>Terms</span>,{' '}
                    <span className='font-semibold'>Data</span>{' '}
                    <span className='font-semibold'>Policy</span> and{' '}
                    <span className='font-semibold'>Cookies Policy</span>.
                </p>
            </div>
        </main>
    );
};

export default RegisterForm;
