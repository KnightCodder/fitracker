import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect();
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier },
                        ]
                    });

                    if (!user) {
                        throw new Error('No user found with this email');
                    }

                    if (!user.isVerified) {
                        throw new Error('Please verify your account first before login');
                    }

                    const isPasswordCorrect = await user.verifyPassword(credentials.password);

                    if (isPasswordCorrect) {
                        return user;
                    } else {
                        throw new Error('Incorrect password');
                    }
                } catch (error: any) {
                    throw new Error(error);
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.DOB = user.DOB;
                token.goal = user.goal;
                token.username = user.username;
                token.isVerified = user.isVerified;
            }

            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.firstName = token.firstName;
                session.user.lastName = token.lastName;
                session.user.DOB = token.DOB;
                session.user.goal = token.goal;
                session.user.username = token.username;
                session.user.isVerified = token.isVerified;
            }

            return session;
        },
    },
    pages: {
        signIn: '/sign-in'
    },
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET
}