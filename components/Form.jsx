import Error from '../components/Error';
import { useForm } from 'react-hook-form';
import {
    AiFillFacebook,
    AiOutlineCheckCircle,
    AiOutlineCloseCircle,
} from 'react-icons/ai';

const Form = ({ login }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onLogin = (data) => {
        console.log(data);
    };

    const onRegister = (data) => {
        console.log(data);
    };

    console.log(errors);

    return login ? (
        <main className='flex flex-col justify-center items-center'>
            <form className='w-3/4 text-xs' onSubmit={handleSubmit(onLogin)}>
                <label>
                    <input
                        type='text'
                        {...register('email', {
                            required: true,
                        })}
                        id='email'
                        placeholder='Email'
                        aria-required='true'
                        autoCapitalize='off'
                        autoCorrect='off'
                        className='w-full border p-2 outline-none focus:ring-1 focus:ring-gray-500 rounded-sm mb-2 bg-gray-100'
                    />
                </label>
                <label>
                    <input
                        type='password'
                        {...register('password', {
                            required: true,
                            minLength: 8,
                        })}
                        id='password'
                        placeholder='Password'
                        aria-required='true'
                        autoCapitalize='off'
                        autoCorrect='off'
                        autoComplete='on'
                        className='w-full border p-2 outline-none focus:ring-1 focus:ring-gray-500 rounded-sm bg-gray-100'
                    />
                </label>
                {watch('password')?.length >= 6 &&
                watch('email')?.length !== 0 ? (
                    <button
                        className='bg-blue-500 w-full py-2 my-4 rounded text-white font-semibold'
                        type='submit'
                    >
                        Log In
                    </button>
                ) : (
                    <button
                        className='bg-blue-200 w-full py-2 my-4 rounded text-white font-semibold cursor-default'
                        type='submit'
                        disabled
                    >
                        Log In
                    </button>
                )}
            </form>
            <div className='w-3/4 flex justify-between'>
                <div className='border-t flex-1 mt-2'></div>
                <div className='mx-4 text-gray-400 font-semibold text-sm'>
                    OR
                </div>
                <div className='border-t flex-1 mt-2'></div>
            </div>
            <button className='text-sm text-blue-900 font-semibold mt-8 mb-4 h-full flex align-center'>
                <span className='text-xl mr-2'>
                    <AiFillFacebook />
                </span>
                <span>Log in with Facebook</span>
            </button>
            {/* <Error>
                Sorry, your password was incorrect. Please double-check your
                password.
            </Error> */}
            <button className='text-xs mb-8'>Forgot password?</button>
        </main>
    ) : (
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
            <form className='w-3/4 text-xs' onSubmit={handleSubmit(onRegister)}>
                <label className='relative'>
                    <input
                        type='text'
                        {...register('emailRegister', {
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
                    {errors.emailRegister && (
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
                        {...register('passwordRegister', {
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
                    {errors.passwordRegister && (
                        <span className='absolute top-0 right-1 text-base text-red-500'>
                            <AiOutlineCloseCircle />
                        </span>
                    )}
                </label>
                {watch('passwordRegister')?.length >= 6 &&
                watch('emailRegister')?.length !== 0 ? (
                    <button
                        className='bg-blue-500 w-full py-2 my-4 rounded text-white font-semibold'
                        type='submit'
                    >
                        Sign Up
                    </button>
                ) : (
                    <button
                        className='bg-blue-200 w-full py-2 my-4 rounded text-white font-semibold cursor-default'
                        type='submit'
                        disabled
                    >
                        Sign Up
                    </button>
                )}
            </form>
            {/* <Error>
                Sorry, your password was incorrect. Please double-check your
                password.
            </Error> */}
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

export default Form;
