import { useForm } from 'react-hook-form';
import usePassword from '../../hooks/usePassword';
import useUser from '../../hooks/useUser';

const ChangePasswordForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm();

    const { user } = useUser();

    const { changePassword, loading, success, error } = usePassword();

    const handleOnSubmit = async (data) => {
        const obj = {
            email: user.email,
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
        };

        await changePassword(obj);
        reset();
    };
    return (
        <form onSubmit={handleSubmit(handleOnSubmit)}>
            {error && (
                <p className='sm:ml-[216px] text-sm text-red-500 mb-4 py-1 flex justify-center rounded bg-red-100'>
                    {error}
                </p>
            )}
            {success && (
                <p className='sm:ml-[216px] text-sm text-green-500 mb-4 py-1 flex justify-center rounded bg-green-100'>
                    You have successfully changed your password.
                </p>
            )}
            <div className='mb-4 flex flex-col sm:flex-row sm:items-center'>
                <label
                    htmlFor='oldPassword'
                    className='inline-block sm:min-w-[200px] sm:text-right font-semibold mb-2 sm:mb-0'
                >
                    Old Password
                </label>
                <input
                    type='password'
                    {...register('oldPassword', {
                        required: true,
                        minLength: 6,
                        maxLength: 20,
                    })}
                    id='oldPassword'
                    autoComplete='true'
                    className='bg-gray-100 outline-none py-1 px-4 sm:ml-4 rounded-md block w-full'
                />
            </div>
            <div className='mb-4 flex flex-col sm:flex-row sm:items-center'>
                <label
                    htmlFor='newPassword'
                    className='inline-block sm:min-w-[200px] sm:text-right font-semibold mb-2 sm:mb-0'
                >
                    New Password
                </label>
                <input
                    type='password'
                    {...register('newPassword', {
                        required: true,
                        minLength: 6,
                        maxLength: 20,
                    })}
                    id='newPassword'
                    autoComplete='true'
                    className='bg-gray-100 outline-none py-1 px-4 sm:ml-4 rounded-md block w-full'
                />
            </div>
            <div className='flex flex-col sm:flex-row sm:items-center'>
                <label
                    htmlFor='confirmPassword'
                    className='inline-block sm:min-w-[200px] sm:text-right font-semibold mb-2 sm:mb-0'
                >
                    Confirm Password
                </label>
                <input
                    type='password'
                    {...register('confirmPassword', {
                        required: true,
                        minLength: 6,
                        maxLength: 20,
                        validate: (value) =>
                            value === watch('newPassword') ||
                            'Password does not match.',
                    })}
                    id='confirmPassword'
                    autoComplete='true'
                    className='bg-gray-100 outline-none py-1 px-4 sm:ml-4 rounded-md block w-full'
                />
            </div>
            {errors.confirmPassword && (
                <p className='sm:ml-[216px] text-sm text-red-500'>
                    {errors.confirmPassword.message}
                </p>
            )}
            <button
                type='submit'
                className='py-1 px-2 text-sm rounded font-semibold text-white my-4 sm:ml-[216px] bg-blue-500'
            >
                {loading ? 'Loading...' : 'Change Password'}
            </button>
        </form>
    );
};

export default ChangePasswordForm;
