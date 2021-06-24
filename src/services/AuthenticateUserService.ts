import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateUserService {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateUserService) {
    const userRepositories = getCustomRepository(UserRepositories);

    const user = await userRepositories.findOne({
      email,
    });

    if (!user) {
      throw new Error("Email/password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/password incorrect");
    }

    const token = await sign({ email: user.email }, "alsknfajaksjdoa", { subject: user.id, expiresIn: "1d" });

    return token;
  }
}

export { AuthenticateUserService };
