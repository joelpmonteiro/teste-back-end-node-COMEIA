import { Request, Response } from "express";
import { ILogin, IUser } from "../interface";
import UserAdo from "../ado/userADO";
import { hashPassword } from "../middleware/bcrypt";
class UserController {
  constructor() {}

  async index(req: Request, res: Response) {
    try {
      const user = await UserAdo.index();
      console.log(user);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno" });
    }
  }

  async showById(req: Request, res: Response) {
    try {
      return res.status(200).json("");
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      return res.status(200).json("");
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      return res.status(200).json("");
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      let user = req.body as any as IUser;
      const userExist = await UserAdo.showByEmail(user.email);

      // verifica se o usuario existe
      if (userExist !== undefined && userExist > 0)
        return res
          .status(400)
          .json({ msg: "Já existe um usuario com esse email" });

      user.senha = await hashPassword(user.senha);
      const createUser = await UserAdo.createAvalicao(user);

      if (createUser === null)
        //verifica se deu erro ao criar usuario
        res.status(404).json({ msg: "Erro ao criar usuario" });

      return res
        .status(201)
        .json({ user_nome: user.nome, user_id: createUser?.insertedId });
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno" });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body as any as ILogin;
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno" });
    }
  }
}

export default new UserController();
