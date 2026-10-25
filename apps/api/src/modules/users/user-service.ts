import { BadRequest, Conflict, NotFound } from "../../shared/utils/appErrors.js";
import { Password } from "../shared/utils/password/password.js";
import type { IUser } from "./domain/user-interface.js";
import type { IUserRepository } from "./domain/user-repository-interface.js";

class UserService {
  constructor(private readonly repository: IUserRepository) {}

  create = async (data: IUser) => {
    const emailExist = await this.repository.findByEmail(data.email);

    if (emailExist)
      throw new Conflict("Este email já está cadastrado. Faça login ou recupere sua senha.");

    if (!Password.isStrong(data.password))
      throw new BadRequest("A senha fornecida não atende os requisitos minimos de segurança.");

    data.password = await Password.hash(data.password);

    await this.repository.create(data);
    return;
  };

  update = async (data: Partial<IUser>, id: string) => {
    if (!(await this.repository.findById(id))) throw new NotFound("Usuário não encontrado.");

    const user = await this.repository.update(data, id);

    return user;
  };

  findById = async (id: string) => {
    const user = await this.repository.findById(id);

    if (!user) throw new NotFound("Usuário não encontrado.");

    return user;
  };

  updatePass = async (newPassword: string, id: string) => {
    const user = await this.repository.findById(id);

    if (!user) throw new NotFound("Usuário não encontrado.");

    if (!Password.isStrong(newPassword))
      throw new BadRequest("A senha fornecida não atende os requisitos minimos de segurança.");

    const newHash = await Password.hash(newPassword);

    await this.repository.updatePass(newHash, id);
    return;
  };
}

export default UserService;
