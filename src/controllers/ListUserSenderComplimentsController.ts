import { Request, Response } from "express";
import { ListUserReceiverComplimentsService } from "../services/ListUserReceiveServiceCompliments";

class ListUserReceiveComplimentController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const listUserReceiveComplimentService = new ListUserReceiverComplimentsService();

    const compliments = await listUserReceiveComplimentService.execute(user_id);

    return response.json(compliments);
  }
}

export { ListUserReceiveComplimentController };
