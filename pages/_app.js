import '../styles/globals.css';
import { AuthProvider } from '../context/authContext';
import { RegisterProvider } from '../context/registerContext';
import { PasswordProvider } from '../context/passwordContext';
import { PostProvider } from '../context/postContext';

const MyApp = ({ Component, pageProps }) => {
    return (
        <AuthProvider>
            <RegisterProvider>
                <PasswordProvider>
                    <PostProvider>
                        <Component {...pageProps} />
                    </PostProvider>
                </PasswordProvider>
            </RegisterProvider>
        </AuthProvider>
    );
};

export default MyApp;
