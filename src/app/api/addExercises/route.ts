import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel, { Exercise, Set, Weight } from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        const { exercise_name, goal, goalDueDate } = await req.json();

        if (!exercise_name || !goal || !goalDueDate) {
            console.log('all fields required')
            return NextResponse.json({ message: 'all fields are neccessary' }, { status: 400 });
        }

        const session = await getServerSession(authOptions);

        if (!session) {
            console.log('dont have session')

            return Response.json({
                success: false,
                message: 'Unauthorized',
            }, { status: 401 });
        }

        const user = await UserModel.findById(session.user._id);
        
        if (!user) {
            console.log('user not found', session);
            return NextResponse.json(
              { success: false, message: "User not found" },
              { status: 404 }
            );
          }

        const exercise : Exercise  = {
            exercise_name: exercise_name,
            sets: [],
            goal : goal,
            goalDueDate: new Date(goalDueDate),
        };

        user?.workout.push(exercise);

        const res = await user?.save();

        console.log('added : ', res);

        return Response.json({
            success: true,
            message: 'exercise added successfully',
        }, {status: 200})

    } catch (error) {
        console.error('error registering exercise', error);
        return Response.json({
            success: false,
            message: 'error registering exercise',
        }, { status: 500 });
    }
}