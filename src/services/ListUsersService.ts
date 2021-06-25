import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UsersRepositories";

class ListUserService {
  async execute() {
    const userRepositories = getCustomRepository(UserRepositories);

    const users = await userRepositories.find();

    return users;
  }
}

export { ListUserService };
