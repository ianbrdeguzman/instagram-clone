import { useContext } from 'react';
import { RegisterContext } from '../context/registerContext';

const useRegister = () => {
    return useContext(RegisterContext);
};

export default useRegister;
