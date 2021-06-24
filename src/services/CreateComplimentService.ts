import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UserRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receive: string;
  message: string;
}

class CreateComplimentService {
  async execute({ tag_id, user_sender, user_receive, message }: IComplimentRequest) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
    const userRepositories = getCustomRepository(UserRepositories);

    if (user_receive === user_sender) {
      throw new Error("Incorrect User Receiver");
    }

    const userReceiverExists = await userRepositories.findOne(user_receive);

    if (!userReceiverExists) {
      throw new Error("User Receiver does not exists!!");
    }

    const compliment = complimentsRepositories.create({
      tag_id,
      user_sender,
      user_receive,
      message,
    });

    await complimentsRepositories.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService };
