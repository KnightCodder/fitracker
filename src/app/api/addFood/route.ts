import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel, { Food, Nutrition } from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { food_name, quantity, nutritional_value } = await req.json();

    // Validate the incoming request data
    if (!food_name || !quantity || !nutritional_value) {
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
      food_name: food_name,
      quantity: quantity,
      nutritional_value: nutritional_value,
    };

    console.log("before: ", user.foods);
    // Push the food into the user's foods array
    user.foods.push(food);

    console.log("after: ", user.foods);

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
