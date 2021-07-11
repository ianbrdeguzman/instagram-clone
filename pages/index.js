import cookie from 'cookie';
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';

export const getServerSideProps = ({ req, res }) => {
    if (req.headers.cookie) {
        const { refreshToken } = cookie.parse(req.headers.cookie);

        if (refreshToken) {
            return {
                props: {},
            };
        }
    } else {
        return {
            redirect: {
                destination: '/accounts/login',
                permanent: false,
            },
        };
    }
};

const Home = () => {
    const { user, logout } = useAuth();
    const { push } = useRouter();

    const onSignOut = async () => {
        await logout();
        push('/accounts/login');
    };

    return (
        <div className='min-h-screen bg-gray-100 flex flex-col justify-center items-center'>
            <h1>Welcome {user?.name}</h1>
            <button onClick={onSignOut}>Logout</button>
        </div>
    );
};

export default Home;
