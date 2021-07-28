import React from 'react';
import useUser from '../../hooks/useUser';

const ChangePhoto = ({ isModalOpen, setIsModalOpen }) => {
    const { changePhoto } = useUser();

    const handleOnChange = async (e) => {
        await changePhoto(e.target.files[0]);
        setIsModalOpen(!isModalOpen);
    };

    const handleRemovePhoto = async () => {
        console.log('remove');
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className='h-screen w-screen bg-modal fixed top-0 left-0 z-20 flex justify-center items-center'>
            <div className='bg-white rounded-xl min-w-[260px] sm:min-w-[400px] text-center'>
                <header className='p-4'>
                    <h2 className='text-xl font-semibold'>
                        Change Profile Photo
                    </h2>
                </header>
                <div className='p-4 border-t border-b'>
                    <label className='text-blue-500 font-semibold cursor-pointer w-full block h-full'>
                        <input
                            type='file'
                            name='photo'
                            id='photo'
                            className='hidden'
                            onChange={handleOnChange}
                        />
                        Upload Photo
                    </label>
                </div>
                <button
                    className='block p-4 cursor-pointer text-red-500 border-b w-full font-semibold'
                    onClick={handleRemovePhoto}
                >
                    Remove Photo
                </button>
                <button
                    onClick={() => setIsModalOpen(!isModalOpen)}
                    className='block p-4 cursor-pointer w-full'
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ChangePhoto;
