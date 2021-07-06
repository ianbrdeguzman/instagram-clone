import Link from 'next/link';
import Image from 'next/image';

const GetApp = () => {
    return (
        <div className='text-center'>
            <p className='my-4 text-sm'>Get the app.</p>
            <div className='flex justify-center'>
                <Link href='https://apps.apple.com/us/app/instagram/id389801252'>
                    <div className='mr-2'>
                        <Image
                            src='/images/appstore.png'
                            width='136'
                            height='40'
                        ></Image>
                    </div>
                </Link>
                <Link href='https://play.google.com/store/apps/details?id=com.instagram.android&hl=en_CA&gl=US'>
                    <div>
                        <Image
                            src='/images/googleplay.png'
                            width='136'
                            height='40'
                        ></Image>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default GetApp;
