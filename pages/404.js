import { useEffect } from 'react';
import { useRouter } from 'next/router';

const NotFound = () => {
    const { push } = useRouter();
    useEffect(() => {
        push('/');
    }, []);
    return null;
};

export default NotFound;
