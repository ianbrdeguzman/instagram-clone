import Link from 'next/link';
import { AiFillFacebook } from 'react-icons/ai';

const Form = ({ login }) => {
    return login ? (
        <main className='flex flex-col justify-center items-center'>
            <form className='w-3/4 text-xs'>
                <label>
                    <input
                        type='text'
                        name='username'
                        id='username'
                        placeholder='Username'
                        aria-required='true'
                        autoCapitalize='off'
                        autoCorrect='off'
                        className='w-full border p-2 outline-none focus:ring-1 focus:ring-gray-500 rounded-sm mb-2 bg-gray-100'
                    />
                </label>
                <label>
                    <input
                        type='password'
                        name=''
                        id='password'
                        placeholder='Password'
                        aria-required='true'
                        autoCapitalize='off'
                        autoCorrect='off'
                        autoComplete='on'
                        className='w-full border p-2 outline-none focus:ring-1 focus:ring-gray-500 rounded-sm bg-gray-100'
                    />
                </label>
                <button
                    className='bg-blue-200 w-full py-1.5 my-4 rounded text-white font-semibold'
                    type='submit'
                >
                    Log In
                </button>
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
            <form className='w-3/4 text-xs'>
                <label>
                    <input
                        type='text'
                        name='email'
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
                        type='text'
                        name='name'
                        id='name'
                        placeholder='Full Name'
                        aria-required='true'
                        autoCapitalize='off'
                        autoCorrect='off'
                        className='w-full border p-2 outline-none focus:ring-1 focus:ring-gray-500 rounded-sm mb-2 bg-gray-100'
                    />
                </label>
                <label>
                    <input
                        type='text'
                        name='username'
                        id='username'
                        placeholder='Username'
                        aria-required='true'
                        autoCapitalize='off'
                        autoCorrect='off'
                        className='w-full border p-2 outline-none focus:ring-1 focus:ring-gray-500 rounded-sm mb-2 bg-gray-100'
                    />
                </label>
                <label>
                    <input
                        type='password'
                        name=''
                        id='password'
                        placeholder='Password'
                        aria-required='true'
                        autoCapitalize='off'
                        autoCorrect='off'
                        autoComplete='on'
                        className='w-full border p-2 outline-none focus:ring-1 focus:ring-gray-500 rounded-sm bg-gray-100'
                    />
                </label>
                <button
                    className='bg-blue-200 w-full py-1.5 my-4 rounded text-white font-semibold text-sm'
                    type='submit'
                >
                    Sign Up
                </button>
            </form>
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
