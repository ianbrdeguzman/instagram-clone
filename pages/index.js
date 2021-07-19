import cookie from 'cookie';
import Layout from '../components/Layout';
import Head from 'next/head';
import PostList from '../components/PostList';

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
            <PostList />
        </Layout>
    );
};

export default Home;
