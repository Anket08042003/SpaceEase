"use server";
import Garage from "@/models/Garage";
import { connectToDB } from "@/utils/database";

export async function createGarage(garage) {
  try {
    await connectToDB();

    // Check if a garage with the same name and location already exists
    const existingGarage = await Garage.findOne({ name: garage.name, location: garage.location });
    if (existingGarage) {
      return { success: true, data: JSON.parse(JSON.stringify(existingGarage)) }; // ✅ Return success flag
    }

    // Create new garage entry
    const newGarage = new Garage(garage);
    await newGarage.save();

    // Convert Mongoose document to plain object (handle ObjectId)
    const garageObj = newGarage.toObject({
      versionKey: false,
      transform: (doc, ret) => {
        ret._id = ret._id.toString();
        return ret;
      },
    });

    return { success: true, data: garageObj }; // ✅ Now returns a success flag

  } catch (error) {
    console.error("Error creating garage:", error);
    return { success: false, message: error.message }; // ✅ Return an explicit error response
  }
};


// ✅ Function to get all garages for a specific manager
export const getGaragesByManager = async (managerEmail) => {
  try {
    await connectToDB();
    const garages = await Garage.find({ managerEmail });

    // ✅ Convert all MongoDB objects to JSON-safe format
    return JSON.parse(JSON.stringify(garages));
  } catch (error) {
    console.error("Error fetching garages:", error);
    return [];
  }
};


