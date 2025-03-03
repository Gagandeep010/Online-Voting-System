import { Schema, model } from "mongoose";
const userSchema = new Schema({
  phoneNumber: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Phone number must be 10 digits"],
  },
  adharID: {
    type: String,
    required: true,
    match: [/^\d{12}$/, "Adhar ID must be 12 digits"],
  },
  age: {
    type: Number,
    required: true,
    min: [0, "Age must be a positive number"],
  },
  name: {
    type: String,
    required: true,
  },
});
const User = model("User", userSchema);
export default User;
