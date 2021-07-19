import '../styles/globals.css';
import { AuthProvider } from '../context/authContext';
import { RegisterProvider } from '../context/registerContext';
import { PasswordResetProvider } from '../context/passwordResetContext';
import { PostProvider } from '../context/postContext';

const MyApp = ({ Component, pageProps }) => {
    return (
        <AuthProvider>
            <RegisterProvider>
                <PasswordResetProvider>
                    <PostProvider>
                        <Component {...pageProps} />
                    </PostProvider>
                </PasswordResetProvider>
            </RegisterProvider>
        </AuthProvider>
    );
};

export default MyApp;
