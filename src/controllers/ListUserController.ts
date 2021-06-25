import { classToPlain } from "class-transformer";
import { Request, Response } from "express";
import { ListUserService } from "../services/ListUsersService";

class ListUserController {
  async handle(request: Request, response: Response) {
    const listUserController = new ListUserService();
    const users = await listUserController.execute();

    return classToPlain(users);
  }
}

export { ListUserController };
