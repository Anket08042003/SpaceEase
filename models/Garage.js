import { Schema, model, models } from "mongoose";

const GarageSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true }, // Only 4-wheeler capacity
    managerEmail: { type: String, required: true },
  });
  
  // Prevent model re-compilation in hot-reload environments
  const Garage = models.Garage || model("Garage", GarageSchema);
  
  export default Garage;