import { useContext } from 'react';
import { PasswordContext } from '../context/passwordContext';

const usePassword = () => {
    return useContext(PasswordContext);
};

export default usePassword;
