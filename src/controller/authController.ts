import { Request, Response } from "express";
import { ILogin, IUser, IUserMongo } from "../interface";
import UserAdo from "../ado/userADO";
import { Document, WithId } from "mongodb";
import { hashCompare } from "../middleware/bcrypt";
import { sign } from "../middleware/authentication";

class AuthController {
  constructor() {}

  async loginUser(req: Request, res: Response) {
    try {
      const login: ILogin = req.body;
      const auth = await UserAdo.showByEmail(login.email);
      const authArr = (await auth?.toArray()) as WithId<
        IUserMongo | Document
      >[];

      if (authArr === undefined || authArr?.length <= 0) {
        return res
          .status(404)
          .json({ msg: "Não foi encontrado esse usuario para autenticar!" });
      }

      const checkLogin = await hashCompare(authArr[0].senha, login.password);

      if (checkLogin) {
        const token = sign(login.email);

        return res.status(200).json({ msg: "Login feito com sucesso!", token });
      }

      return res.status(400).json({ msg: "Dados do usuario invalidos!" });
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno" });
    }
  }
}

export default new AuthController();
