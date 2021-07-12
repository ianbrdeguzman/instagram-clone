import Error from '../components/Error';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';

const PasswordResetForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const { login, error, loading } = useAuth();

    const { push, query } = useRouter();

    const resetPassword = (data) => {
        console.log(query.token);
        console.log(data);
    };

    return (
        <main className='flex flex-col justify-center items-center'>
            <form
                className='w-3/4 text-xs'
                onSubmit={handleSubmit(resetPassword)}
            >
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
                        className='w-full border p-2 outline-none focus:ring-1 focus:ring-gray-500 rounded-sm bg-gray-100 mb-2'
                    />
                </label>
                <label>
                    <input
                        type='password'
                        {...register('confirmPassword', {
                            required: true,
                            minLength: 6,
                            validate: (value) =>
                                value === watch('password') ||
                                'Password does not match.',
                        })}
                        id='confirmPassword'
                        placeholder='Confirm Password'
                        aria-required='true'
                        autoCapitalize='off'
                        autoCorrect='off'
                        autoComplete='on'
                        className='w-full border p-2 outline-none focus:ring-1 focus:ring-gray-500 rounded-sm bg-gray-100'
                    />
                </label>
                {errors && errors.confirmPassword && (
                    <p>{errors.confirmPassword}</p>
                )}
                {watch('password')?.length >= 6 &&
                watch('confirmPassword')?.length >= 6 ? (
                    <button
                        className='bg-blue-500 w-full py-2 my-4 rounded text-white font-semibold'
                        type='submit'
                    >
                        {loading ? 'Loading...' : 'Reset Password'}
                    </button>
                ) : (
                    <button
                        className='bg-blue-200 w-full py-2 my-4 rounded text-white font-semibold cursor-default'
                        type='submit'
                        disabled
                    >
                        {loading ? 'Loading...' : 'Reset Password'}
                    </button>
                )}
            </form>
            {error && <Error>{error}</Error>}
        </main>
    );
};

export default PasswordResetForm;
