import { useContext } from 'react';
import { PasswordResetContext } from '../context/passwordResetContext';

const useReset = () => {
    return useContext(PasswordResetContext);
};

export default useReset;
