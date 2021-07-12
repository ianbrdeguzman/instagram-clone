import { createTransport } from 'nodemailer';

export const sendForgotPasswordMail = async (user, url) => {
    const transporter = createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.GMAIL_APP_PASS,
        },
    });

    console.log(user, url);

    const message = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Forgot your password?',
        html: `<body style='background-color: #f5f5f5'>
                    <div style='width: 100%; padding: 1rem 0;'>
                        <div style='max-width: 400px; background-color: #ffffff; padding: 1rem; margin: 0 auto;'>
                            <h1 style="margin: 1rem 0; ">Hello ${user.name}</h1>
                            <p>We got a request to reset your Instagram password.</p>
                            <a href=${url} style="display: block; padding: 0.5rem; text-decoration: none; border-radius: 0.1rem; color: white; background-color: #47a2ea; margin: 1rem 0; text-align: center">Reset password</a>
                            <p>If you ignore this message, your password will not be changed.</p>
                        </div>
                    </div>
                </body>`,
    };

    // transporter.sendMail(message, (err, info) => {
    //     if (err) {
    //         return new Error(err);
    //     } else {
    //         return info;
    //     }
    // });

    try {
        const info = await transporter.sendMail(message);
        return info;
    } catch (error) {
        return error;
    }
};
