import '../styles/globals.css';
import { AuthProvider } from '../context/authContext';
import { RegisterProvider } from '../context/registerContext';
import { PasswordResetProvider } from '../context/passwordResetContext';

const MyApp = ({ Component, pageProps }) => {
    return (
        <AuthProvider>
            <RegisterProvider>
                <PasswordResetProvider>
                    <Component {...pageProps} />
                </PasswordResetProvider>
            </RegisterProvider>
        </AuthProvider>
    );
};

export default MyApp;
