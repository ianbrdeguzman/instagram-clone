import cookie from 'cookie';
import Layout from '../components/Layout';
import Head from 'next/head';
import PostList from '../components/PostList';
import Sidebar from '../components/Sidebar';

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
    return (
        <Layout>
            <Head>
                <title>Instagram | Clone</title>
            </Head>
            <div className='bg-gray-100 flex justify-center items-start'>
                <PostList />
                <Sidebar />
            </div>
        </Layout>
    );
};

export default Home;
