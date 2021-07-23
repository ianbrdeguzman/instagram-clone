import React from 'react';
import useUser from '../../hooks/useUser';

const ChangePhoto = ({ isModalOpen, setIsModalOpen }) => {
    const { changePhoto, data: newPhoto } = useUser();

    const handleOnChange = async (e) => {
        await changePhoto(e.target.files[0]);
        console.log(newPhoto);
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
                    <label className='text-blue-500 font-semibold cursor-pointer'>
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
                <div
                    onClick={() => setIsModalOpen(!isModalOpen)}
                    className='p-4 cursor-pointer'
                >
                    <p>Cancel</p>
                </div>
            </div>
        </div>
    );
};

export default ChangePhoto;
