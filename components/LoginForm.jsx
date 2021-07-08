import Error from '../components/Error';
import { useForm } from 'react-hook-form';
import { AiFillFacebook } from 'react-icons/ai';
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';

const LoginForm = () => {
    const { register, handleSubmit, watch } = useForm();

    const { login, errorLogin, loading } = useAuth();

    const { push } = useRouter();

    const onLogin = async (data) => {
        await login(data);
        push('/');
    };

    return (
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
                            minLength: 6,
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
                        {loading ? 'Loading...' : 'Log In'}
                    </button>
                ) : (
                    <button
                        className='bg-blue-200 w-full py-2 my-4 rounded text-white font-semibold cursor-default'
                        type='submit'
                        disabled
                    >
                        {loading ? 'Loading...' : 'Log In'}
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
            {errorLogin && <Error>{errorLogin}</Error>}
            <button className='text-xs mb-8'>Forgot password?</button>
        </main>
    );
};

export default LoginForm;
