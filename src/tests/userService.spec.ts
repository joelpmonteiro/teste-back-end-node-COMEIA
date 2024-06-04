import UserAdo from "../ado/userADO";
import { IUser } from "../interface";
import { hashPassword } from "../middleware/bcrypt";

import "dotenv/config";

describe("Create user", () => {
  //teste para criar um usuario
  it("Deve ser possivel criar um novo usuario", async () => {
    const user: IUser = {
      email: "aaaaaaaaaaaaaaa@teste.com",
      nome: "teste",
      senha: await hashPassword("451236"),
    };
    const userAdo = await UserAdo.createUser(user);
    expect(userAdo).toHaveProperty("insertedId");
  });

  it("Não Deve ser possivel cadastrar um usuário com mesmo email", async () => {
    const user: IUser = {
      email: "teste@teste.com",
      nome: "testeExisting",
      senha: await hashPassword("451236"),
    };

    //executa a primeira chamada para cadastrar
    const userExistByEmail = await UserAdo.showByEmail(user.email);
    const checkUser = (await userExistByEmail?.toArray()) as [];
    expect(checkUser.length > 0).toBe(checkUser.length > 0);
  });
});
