import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, code} = await request.json();

        const decodedUsername = decodeURIComponent(username);
        const user = await UserModel.findOne({username: decodedUsername});

        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                }, {status:500}
            )
        }

        const isCodeValid = user.verifyCode === code && new Date(user.verifyCodeExpiry) > new Date();

        if (isCodeValid) {
            user.isVerified = true;
            await user.save();

            return Response.json(
                {
                    success: true,
                    message: "Account verified successfully"
                }, {status:200}
            )
        }

        return Response.json(
            {
                success: false,
                message: "Failed to verify account"
            }, {status:400}
        )
    } catch (error) {
        console.error("Error verifying user", error);
        return Response.json({
            success: false,
            message: "Error verifying user"
        },{ status: 500 }
        )   
    }
}
