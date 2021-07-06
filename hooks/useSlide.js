import { useState, useEffect } from 'react';

const useSlide = (length) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const slider = setInterval(() => {
            setIndex(index + 1);
        }, 3000);
        return () => {
            clearInterval(slider);
        };
    }, [index]);

    useEffect(() => {
        if (index > length - 1) {
            setIndex(0);
        }
        if (index < 0) {
            setIndex(length - 1);
        }
    }, [index]);

    return {
        index,
    };
};

export default useSlide;
