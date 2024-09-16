import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel, { Food, Nutrition } from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { newRecord } = await req.json();

    console.log(newRecord)

    // Validate the incoming request data
    if (!newRecord) {
      console.log("All fields are required");
      return NextResponse.json({ message: "All fields are necessary" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!session) {
      console.log("Session not found");
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // Find the user based on the session
    const user = await UserModel.findById(session.user._id);

    if (!user) {
      console.log("User not found", session);
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Create the food object
    const food: Food = {
      food_name: newRecord.food.food_name,
      quantity: newRecord.quantity,
      nutritional_value: {
        calories: newRecord.food.nutritional_value.calories * newRecord.quantity / newRecord.food.quantity,
        protein: newRecord.food.nutritional_value.protein * newRecord.quantity / newRecord.food.quantity,
        carbs: newRecord.food.nutritional_value.carbs * newRecord.quantity / newRecord.food.quantity,
        fats: newRecord.food.nutritional_value.fats * newRecord.quantity / newRecord.food.quantity,
        fiber: newRecord.food.nutritional_value.fiber * newRecord.quantity / newRecord.food.quantity,
      },
    };

    const intake = {
        food: food,
        time: new Date(newRecord.time)
    }

    console.log('intake',intake);

    user.diet.intake.push(intake);

    console.log('diet',user.diet)

    // Save the updated user data
    const res = await user.save();

    console.log("Added food: ", res);

    return NextResponse.json(
      {
        success: true,
        message: "Food added successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error registering food:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error registering food",
      },
      { status: 500 }
    );
  }
}
