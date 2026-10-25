import type { ObjectId } from "mongoose";

export type TypeUserRoles = (typeof USER_ROLES)[number];
export const USER_ROLES = ["PLAYER", "ADMIN"] as const;

export interface IUser {
  nickname: string;
  email: string;
  password: string;
  team_id: string | ObjectId;
  role: TypeUserRoles;
}
