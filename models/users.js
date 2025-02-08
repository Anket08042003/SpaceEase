import { Schema, model, models } from "mongoose";
import CarDetails from "./cardetails";

const userSchema = new Schema({
    clerkId:{
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    carDetails:[{
        type: Schema.Types.ObjectId,
        ref: CarDetails
    }],

});

const User = models?.User || model("User", userSchema);

export default User;