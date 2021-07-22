import '../styles/globals.css';
import { AuthProvider } from '../context/authContext';
import { UserProvider } from '../context/userContext';
import { PasswordProvider } from '../context/passwordContext';
import { PostProvider } from '../context/postContext';

const MyApp = ({ Component, pageProps }) => {
    return (
        <AuthProvider>
            <UserProvider>
                <PasswordProvider>
                    <PostProvider>
                        <Component {...pageProps} />
                    </PostProvider>
                </PasswordProvider>
            </UserProvider>
        </AuthProvider>
    );
};

export default MyApp;
