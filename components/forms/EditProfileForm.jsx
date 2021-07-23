import { useForm } from 'react-hook-form';
import useUser from '../../hooks/useUser';

const EditProfileForm = () => {
    const { register, handleSubmit, reset } = useForm();

    const { editProfile, loading, data: updated, error, user } = useUser();

    const handleOnSubmit = async (data) => {
        console.log(data);
        await editProfile(data);
        reset();
    };
    return (
        <form onSubmit={handleSubmit(handleOnSubmit)}>
            {error && (
                <p className='sm:ml-[216px] text-sm text-red-500 mb-4 py-1 flex justify-center rounded bg-red-100'>
                    {error}
                </p>
            )}
            {updated && (
                <p className='sm:ml-[216px] text-sm text-green-500 mb-4 py-1 flex justify-center rounded bg-green-100'>
                    You have successfully updated your profile.
                </p>
            )}
            <div className='mb-4 flex flex-col sm:flex-row sm:items-center relative'>
                <label
                    htmlFor='name'
                    className='inline-block sm:min-w-[200px] sm:text-right font-semibold mb-2 sm:mb-0'
                >
                    Name
                </label>
                <input
                    type='text'
                    {...register('name', {
                        minLength: 6,
                        maxLength: 20,
                    })}
                    id='name'
                    defaultValue={updated?.name || user?.name}
                    className='border outline-none py-1 px-4 sm:ml-4 rounded-md block w-full'
                />
            </div>
            <div className='mb-4 flex flex-col sm:flex-row sm:items-center'>
                <label
                    htmlFor='username'
                    className='inline-block sm:min-w-[200px] sm:text-right font-semibold mb-2 sm:mb-0'
                >
                    Username
                </label>
                <input
                    type='text'
                    {...register('username', {
                        minLength: 6,
                        maxLength: 20,
                    })}
                    id='username'
                    defaultValue={updated?.username || user?.username}
                    className='border outline-none py-1 px-4 sm:ml-4 rounded-md block w-full'
                />
            </div>
            <div className='mb-4 flex flex-col sm:flex-row sm:items-center'>
                <label
                    htmlFor='website'
                    className='inline-block sm:min-w-[200px] sm:text-right font-semibold mb-2 sm:mb-0'
                >
                    Website
                </label>
                <input
                    type='text'
                    {...register('website', {
                        minLength: 6,
                        maxLength: 50,
                    })}
                    id='website'
                    defaultValue={updated?.website || user?.website || ''}
                    className='border outline-none py-1 px-4 sm:ml-4 rounded-md block w-full'
                />
            </div>
            <div className='mb-4 flex flex-col sm:flex-row sm:items-center'>
                <label
                    htmlFor='bio'
                    className='inline-block sm:min-w-[200px] sm:text-right font-semibold mb-2 sm:mb-0'
                >
                    Bio
                </label>
                <textarea
                    {...register('bio', {
                        maxLength: 200,
                    })}
                    id='bio'
                    rows='4'
                    defaultValue={updated?.bio || user?.bio || ''}
                    className='border outline-none py-1 px-4 sm:ml-4 rounded-md block w-full'
                />
            </div>
            <div className='mb-4 flex flex-col sm:flex-row sm:items-center'>
                <label
                    htmlFor='email'
                    className='inline-block sm:min-w-[200px] sm:text-right font-semibold mb-2 sm:mb-0'
                >
                    Email
                </label>
                <input
                    type='text'
                    {...register('email', {
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    })}
                    id='email'
                    defaultValue={updated?.email || user?.email || ''}
                    className='border outline-none py-1 px-4 sm:ml-4 rounded-md block w-full'
                />
            </div>
            <div className='mb-4 flex flex-col sm:flex-row sm:items-center'>
                <label
                    htmlFor='phone'
                    className='inline-block sm:min-w-[200px] sm:text-right font-semibold mb-2 sm:mb-0'
                >
                    Phone Number
                </label>
                <input
                    type='text'
                    {...register('phone', {
                        maxLength: 10,
                    })}
                    id='phone'
                    defaultValue={updated?.phone || user?.phone || ''}
                    className='border outline-none py-1 px-4 sm:ml-4 rounded-md block w-full'
                />
            </div>
            <div className='mb-4 flex flex-col sm:flex-row sm:items-center'>
                <label
                    htmlFor='gender'
                    className='inline-block sm:min-w-[200px] sm:text-right font-semibold mb-2 sm:mb-0'
                >
                    Gender
                </label>
                <input
                    type='text'
                    {...register('gender', {
                        maxLength: 20,
                    })}
                    id='gender'
                    defaultValue={updated?.gender || user?.gender || ''}
                    className='border outline-none py-1 px-4 sm:ml-4 rounded-md block w-full'
                />
            </div>
            <button
                type='submit'
                className='py-1 px-2 text-sm rounded font-semibold text-white my-4 sm:ml-[216px] bg-blue-500'
            >
                {loading ? 'Loading...' : 'Edit Profile'}
            </button>
        </form>
    );
};

export default EditProfileForm;
