import { Model } from "mongoose";
import type { IUser } from "../domain/user-interface.js";
import type { IUserRepository } from "../domain/user-repository-interface.js";

class UserRepository implements IUserRepository {
  constructor(private readonly User: Model<IUser>) {}

  create = async (data: IUser): Promise<IUser | null> => {
    const user = await this.User.create(data);
    return user;
  };

  findById = async (id: string): Promise<IUser | null> => {
    const user = await this.User.findById(id);
    return user;
  };

  update = async (data: Partial<IUser>, id: string): Promise<IUser | null> => {
    const user = await this.User.findByIdAndUpdate(id, { ...data }, { new: true });
    return user;
  };

  updatePass = async (newPassword: string, id: string): Promise<IUser | null> => {
    const user = await this.User.findByIdAndUpdate(id, {
      password: newPassword,
    });

    return user;
  };

  findByEmail = async (email: string): Promise<IUser | null> => {
    const user = await this.User.findOne({ email });
    return user;
  };
}

export default UserRepository;
