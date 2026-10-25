import { ResolveError } from "../../shared/utils/resolveError.js";
import UserService from "./user-service.js";
import type { Request, Response } from "express";

class UserController {
  constructor(private readonly service: UserService) {}

  create = async (req: Request, res: Response) => {
    try {
      const body = req.body;

      await this.service.create(body);

      return res.status(201).json({ message: "Usuário cadastrado com sucesso!", data: null });
    } catch (error: any) {
      ResolveError.resolve(error);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const body = req.body;

      const user = await this.service.update(body, id);

      return res.status(200).json({ message: "Usuário atualizado com sucesso!", data: user });
    } catch (error: any) {
      ResolveError.resolve(error);
    }
  };

  findById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;

      const user = await this.service.findById(id);

      return res.status(200).json({ message: "Usuário encontrado com sucesso!", data: user });
    } catch (error: any) {
      ResolveError.resolve(error);
    }
  };

  updatePass = async (req: Request, res: Response) => {
    try {
      const newPassword = req.body.newPassword;
      const id = req.params.id as string;

      await this.service.updatePass(newPassword, id);

      return res.status(200).json({ message: "Atualização realizada com sucesso!", data: null });
    } catch (error: any) {
      ResolveError.resolve(error);
    }
  };
}

export default UserController;
