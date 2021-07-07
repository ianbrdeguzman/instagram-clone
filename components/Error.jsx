const Error = ({ children }) => {
    return (
        <div className='w-3/4 text-red-500 text-sm mb-4 text-center'>
            <p>{children}</p>
        </div>
    );
};

export default Error;
