import Error from '../Error';
import { useForm } from 'react-hook-form';
import usePassword from '../../hooks/usePassword';

const PasswordResetForm = () => {
    const { register, handleSubmit, watch } = useForm();

    const { forgotPassword, error, loading, data: response } = usePassword();

    const onSubmit = async (data) => {
        forgotPassword(data.email);
    };

    return (
        <main className='flex flex-col justify-center items-center'>
            <form className='w-3/4 text-xs' onSubmit={handleSubmit(onSubmit)}>
                {response && (
                    <p className='mb-2 text-green-500 text-center'>
                        {response}
                    </p>
                )}
                <label>
                    <input
                        type='text'
                        {...register('email', {
                            required: true,
                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        })}
                        id='email'
                        placeholder='Email address'
                        aria-required='true'
                        autoCapitalize='off'
                        autoCorrect='off'
                        autoComplete='on'
                        className='w-full border p-2 outline-none focus:ring-1 focus:ring-gray-500 rounded-sm bg-gray-100 mb-2'
                    />
                </label>
                {watch('email')?.length >= 6 ? (
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
