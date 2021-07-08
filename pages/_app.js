import '../styles/globals.css';
import { AuthProvider } from '../context/authContext';
import { RegisterProvider } from '../context/registerContext';

const MyApp = ({ Component, pageProps }) => {
    return (
        <AuthProvider>
            <RegisterProvider>
                <Component {...pageProps} />
            </RegisterProvider>
        </AuthProvider>
    );
};

export default MyApp;
