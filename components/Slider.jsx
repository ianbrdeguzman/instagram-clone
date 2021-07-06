import Image from 'next/image';
import useSlide from '../hooks/useSlide';

const images = [
    { id: 0, src: '/images/slider-image1.jpg' },
    { id: 1, src: '/images/slider-image2.jpg' },
    { id: 2, src: '/images/slider-image3.jpg' },
    { id: 3, src: '/images/slider-image4.jpg' },
    { id: 4, src: '/images/slider-image5.jpg' },
];

const Slider = () => {
    const { index } = useSlide(images.length);

    return (
        <div className='bg-hero w-[454px] h-[618px] hidden md:block relative'>
            {images.map(({ id, src }) => {
                if (index !== id) return null;
                return (
                    <div
                        key={id}
                        className='border w-[240px] h-[427px] absolute top-[16.2%] left-[33.26%]'
                    >
                        <Image src={src} width='240' height='427'></Image>
                    </div>
                );
            })}
        </div>
    );
};

export default Slider;
