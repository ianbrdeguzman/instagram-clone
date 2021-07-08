import '../styles/globals.css';
import { AuthProvider } from '../context/authContext';

const MyApp = ({ Component, pageProps }) => {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
};

export default MyApp;
