import { NextResponse } from "next/server";
import connectToDB from "@/utils/database";
import Garage from "@/models/Garage";

// Ensure database connection
connectToDB();

// POST method to add a new garage
export async function POST(req) {
  try {
    const { name, location, capacity } = await req.json();

    if (!name || !location || typeof capacity !== "number" || capacity < 0) {
      return NextResponse.json(
        { success: false, message: "Invalid input data" },
        { status: 400 }
      );
    }

    const newGarage = new Garage({ name, location, capacity, managerEmail });
    await newGarage.save();

    return NextResponse.json(
      { success: true, message: "Garage added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding garage:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
