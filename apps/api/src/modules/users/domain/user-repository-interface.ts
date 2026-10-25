import type { IUser } from "./user-interface.js";

export interface IUserRepository {
  create(data: IUser): Promise<IUser | null>;
  update(data: Partial<IUser>, id: string): Promise<IUser | null>;
  updatePass(newPassword: string, id: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
}
