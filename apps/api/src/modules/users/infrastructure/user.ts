import { Schema, model } from "mongoose";
import { USER_ROLES, type IUser } from "../domain/user-interface.js";

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, trim: true, unique: true },
    nickname: { type: String, required: true, trim: true, unique: true },
    role: { type: String, default: "PLAYER", enum: USER_ROLES },
    password: { type: String, required: true, select: false },
    team_id: { type: String, default: null },
  },
  { timestamps: true },
);

const User = model("User", UserSchema);
export default User;
