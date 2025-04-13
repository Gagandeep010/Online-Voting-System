import mongoose, { Document, Schema} from "mongoose";

export interface IUser extends Document {
  user_name: string;
  phoneNumber: string;
  age: number;
  adharID: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    user_name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    age: { type: Number, required: true },
    adharID: { type: String, required: true, unique: true },
  },
  { collection: "Users" } // ✅ Explicitly define collection name
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
