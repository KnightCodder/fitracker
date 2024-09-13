import { NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email: string, username: string, code: string): Promise<boolean> => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Fitracker | Verification Code',
            text: `${username} Your verfication code is ${code}`,
        };

        const res = await transporter.sendMail(mailOptions);
        console.log('response from sendmails', res);

        return true;
    } catch (error) {
        console.log('error sending verification email', error)

        return false;
    }
};