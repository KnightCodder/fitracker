import { NextRequest, NextResponse } from "next/server";
import { sendVerificationEmail } from "@/helpers/sendmails";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        const { username, email, firstName, lastName, DOB, password } = await req.json();
        const decodedEmail = decodeURIComponent(email);

        if (!username || !email || !firstName || !lastName || !DOB || !password) {
            console.log('all fields required')
            return NextResponse.json({message: 'all fields are neccessary'}, {status: 400});
        }
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        });

        if (existingUserVerifiedByUsername) {
            console.log('username not available')
            return Response.json({
                success: false,
                message: 'username is already taken'
            }, {status: 400});
        }

        const existingUserByEmail = await UserModel.findOne({email: decodedEmail});
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                console.log('user already exists with this email')
                return Response.json({
                    success: false,
                    message: 'user alredy exist with this email'
                }, {status: 400});
            } else {
                existingUserByEmail.password = password;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.username = username;
                existingUserByEmail.firstName = firstName;
                existingUserByEmail.lastName = lastName;
                existingUserByEmail.DOB = DOB;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 60*1000);

                await existingUserByEmail.save();
            }
        } else {
            const expiryDate = new Date();
            expiryDate.setMinutes(expiryDate.getMinutes() + 1);

            const newUser = new UserModel({
                email: email,
                password: password,
                verifyCode: verifyCode,
                verifyCodeExpiry: expiryDate,
                username: username,
                firstName: firstName,
                lastName: lastName,
                DOB: new Date(DOB),
            });

            await newUser.save();
        }

        // send verification email
        const emailResponse = await sendVerificationEmail(email, username, verifyCode);

        if (!emailResponse) {
            return Response.json({
                success: false,
                message: 'error sending verification code'
            }, {status: 500})
        }

        return Response.json({
            success: true,
            message: 'user registered successfully. Please verify your email'
        }, {status: 201})
    } catch (error) {
        console.error('error registering user', error);
        return Response.json({
            success: false,
            message: 'error registering user',
        }, {status: 500});
    }
}