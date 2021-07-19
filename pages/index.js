import cookie from 'cookie';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import useAuth from '../hooks/useAuth';
import Head from 'next/head';
import usePost from '../hooks/usePost';

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
    const { loading, posts, error } = usePost();
    console.log(loading, posts);

    return (
        <Layout>
            <Head>
                <title>Instagram | Clone</title>
            </Head>
            <div className='min-h-screen bg-gray-100 flex flex-col justify-center items-center'>
                {posts?.map(({ title, id }) => {
                    return <h2 key={id}>{title}</h2>;
                })}
            </div>
        </Layout>
    );
};

export default Home;
