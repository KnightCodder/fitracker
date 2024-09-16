import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET() {
  try {
    // Connect to the database
    await dbConnect();

    // Get the current session
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Find the user by session user ID
    const user = await UserModel.findById(session.user._id);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Retrieve the exercises from the user
    const records = user.diet.intake || [];

    // Return exercises as a JSON response
    return NextResponse.json({ success: true, records: records.reverse() }, { status: 200 });
  } catch (error) {
    console.error("Error fetching food record", error);
    return NextResponse.json(
      { success: false, message: "Error fetching food record" },
      { status: 500 }
    );
  }
}
