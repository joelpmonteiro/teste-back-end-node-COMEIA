import { Request, Response } from "express";
import { ILogin, IUser, IUserMongo } from "../interface";
import UserAdo from "../ado/userADO";
import { hashPassword } from "../middleware/bcrypt";
class UserController {
  constructor() {}

  async index(req: Request, res: Response) {
    try {
      const user = await UserAdo.index();
      let userArray: Array<IUserMongo[]> = [];
      if (user !== undefined) {
        for await (const doc of user) {
          userArray.push(doc);
        }
      } else {
        return res
          .status(404)
          .json({ msg: "Não foi encontrado usuarios cadastrados" });
      }

      return res.status(200).json(userArray);
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno" });
    }
  }

  async showById(req: Request, res: Response) {
    try {
      const { id } = req.params as any as { id: number };

      const show = await UserAdo.showById(id);

      if (show === null || show === undefined) {
        return res
          .status(404)
          .json({ msg: "não foi encontrado nenhum usuario com esse id" });
      }

      return res.status(200).json(show);
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params as any as { id: number };
      let { email, nome, senha } = req.body as any as IUser;

      senha = await hashPassword(senha);

      const updateUser = await UserAdo.update({ email, nome, senha }, id);

      if (updateUser?.modifiedCount === 1 && updateUser?.matchedCount === 1) {
        return res.status(200).json({ msg: "Usuario atualizado com sucesso" });
      }

      // se nao existir o usuario é criado.
      if (
        updateUser !== null &&
        (updateUser?.upsertedCount === 1 ||
          Number(updateUser?.upsertedId) === 1)
      ) {
        return res.status(201).json({ msg: "Usuario criado com sucesso" });
      }

      return res.status(404).json({ msg: "Erro ao atualizar usuario" });
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params as any as { id: number };

      const deleteuser = await UserAdo.delete(id);
      if (deleteuser === undefined || deleteuser.deletedCount === 0) {
        return res
          .status(404)
          .json({ msg: "não foi encontrado nenhum usuario com esse id" });
      }

      return res.status(200).json({ msg: `usuario deletado com sucesso` });
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      let user = req.body as any as IUser;
      const userExist = await UserAdo.showByEmail(user.email);
      const checkUser = await userExist?.toArray();

      // verifica se o usuario existe
      if (checkUser !== undefined && checkUser?.length > 0)
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
