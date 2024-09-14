import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel, { Set } from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        const { set, exercise_name } = await req.json();

        if (!set || !exercise_name) {
            console.log('All fields are required');
            return NextResponse.json({ message: 'All fields are necessary' }, { status: 400 });
        }

        const session = await getServerSession(authOptions);

        if (!session) {
            console.log('No session found');
            return NextResponse.json({
                success: false,
                message: 'Unauthorized',
            }, { status: 401 });
        }

        const user = await UserModel.findById(session.user._id);

        if (!user) {
            console.log('User not found', session);
            return NextResponse.json(
              { success: false, message: "User not found" },
              { status: 404 }
            );
        }

        // Find the exercise by name and push the new set into it
        const exercise = user.workout.find(ex => ex.exercise_name === exercise_name);

        if (!exercise) {
            console.log('Exercise not found');
            return NextResponse.json(
              { success: false, message: "Exercise not found" },
              { status: 404 }
            );
        }

        exercise.sets.push({
            set: set,
            time: new Date() // Set the current time
        });

        const res = await user.save();

        console.log('Set added:', res);

        return NextResponse.json({
            success: true,
            message: 'Set added successfully',
        }, { status: 200 });

    } catch (error) {
        console.error('Error registering set:', error);
        return NextResponse.json({
            success: false,
            message: 'Error registering set',
        }, { status: 500 });
    }
}
