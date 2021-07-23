import '../styles/globals.css';
import { UserProvider } from '../context/userContext';
import { PasswordProvider } from '../context/passwordContext';
import { PostProvider } from '../context/postContext';

const MyApp = ({ Component, pageProps }) => {
    return (
        <UserProvider>
            <PasswordProvider>
                <PostProvider>
                    <Component {...pageProps} />
                </PostProvider>
            </PasswordProvider>
        </UserProvider>
    );
};

export default MyApp;
