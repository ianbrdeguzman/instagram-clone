import dbConnect from '../utils/dbConnect';
import User from '../models/userModel';
import Layout from '../components/Layout';

export const getStaticPaths = async () => {
    try {
        await dbConnect();

        const users = await User.find({});

        const paths = users.map((user) => {
            return {
                params: { username: user.username },
            };
        });

        return {
            paths: paths,
            fallback: false,
        };
    } catch (error) {
        console.log(error);
    }
};

export const getStaticProps = async (context) => {
    const username = context.params.username;
    try {
        await dbConnect();

        const user = await User.findOne({ username });

        const userProfile = {
            email: user.email,
            name: user.name,
            username: user.username,
        };
        return {
            props: { data: JSON.stringify(userProfile) },
        };
    } catch (error) {
        console.log(error);
    }
};

const Profile = ({ data }) => {
    const user = JSON.parse(data);

    return (
        <Layout>
            <div className='min-h-screen flex justify-center items-center bg-gray-100'>
                Profile page {user.name}
            </div>
        </Layout>
    );
};

export default Profile;
