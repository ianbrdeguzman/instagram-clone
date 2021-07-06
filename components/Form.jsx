import { AiFillFacebook } from 'react-icons/ai';

const Form = ({ login }) => {
    return login ? (
        <main className='flex flex-col justify-center items-center'>
            <form className='w-3/4 text-sm'>
                <label>
                    <input
                        type='text'
                        name='username'
                        id='username'
                        placeholder='Username'
                        aria-required='true'
                        autoCapitalize='off'
                        autoCorrect='off'
                        className='w-full border p-2 outline-none focus:ring-1 focus:ring-gray-500 rounded-sm mb-2'
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
                        className='w-full border p-2 outline-none focus:ring-1 focus:ring-gray-500 rounded-sm'
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
    ) : null;
};

export default Form;
