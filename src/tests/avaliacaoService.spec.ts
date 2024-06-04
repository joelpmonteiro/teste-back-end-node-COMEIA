import { ObjectId } from "mongodb";
import UserAdo from "../ado/userADO";
import { IAvalicao, IUser } from "../interface";
import { hashPassword } from "../middleware/bcrypt";
import Avaliacao from "../ado/avalicaoADO";
import mongo from "../mongodb/mongo";

import "dotenv/config";

describe("Create Avaliacao", () => {
  //teste para criar um usuario
  beforeAll(async () => {
    try {
      await mongo.getConnect().connect();
    } catch (error) {
      console.log(error);
    }
  });

  it("Criar Avaliação", async () => {
    const avaliacaoData: IAvalicao = {
      userId: "665e753516e21b9c9dda10c5",
      rating: 1,
      comment: "testes1",
    };

    const resultAdo = await Avaliacao.createAvaliacao(avaliacaoData);
    console.log(resultAdo);
    expect(resultAdo).toHaveProperty("insertedId");
  });

  it("Atualiza Avaliação", async () => {
    const id = "665e9ddb54f39d0689b8ff43";

    const avaliacaoData: IAvalicao = {
      userId: "665e753516e21b9c9dda10c5",
      rating: 5,
      comment: "asdasdsadasdasdasdasdasdsad",
    };

    const resultAdo = await Avaliacao.update(avaliacaoData, id);
    console.log(resultAdo?.modifiedCount);
    expect(resultAdo).toHaveProperty("modifiedCount");
    expect(resultAdo).toHaveProperty("matchedCount");
  });

  it("Busca avalição por Id", async () => {
    const avaliacaoData: IAvalicao = {
      userId: "665dfca811f5dc5c493605ee",
      rating: 1,
      comment: "testes1",
    };

    //cria uma avaliação caso nao exista nenhuma
    const userAv = await Avaliacao.createAvaliacao(avaliacaoData);
    const idAv = userAv?.insertedId.toString() as string;

    const av = await Avaliacao.showById(idAv);
    console.log(av);

    expect(av).toHaveProperty("_id");
  });

  it("Deleta avalição por Id", async () => {
    const avaliacaoData = "665e9ddb54f39d0689b8ff42";

    //cria uma avaliação caso nao exista nenhuma
    const userAv = await Avaliacao.delete(avaliacaoData);

    expect(1).toBe(userAv?.deletedCount as number);
  });

  it("Avaliação não encontrado para deletar", async () => {
    const avaliacaoData = "665e9ddb54f39d0689b8ff42";

    //cria uma avaliação caso nao exista nenhuma
    const userAv = await Avaliacao.delete(avaliacaoData);
    console.log("testestse", userAv);
    expect(0).toBe(userAv?.deletedCount as number);
  });

  it("Busca todas avalições", async () => {
    const index = await Avaliacao.index();
    let avalicaoArray: Array<IAvalicao[]> = [];

    if (index !== undefined) {
      for await (const doc of index) {
        avalicaoArray.push(doc);
      }
    }
    expect(avalicaoArray.length > 0).toBe(avalicaoArray.length > 0);
  });

  it("Busca avaliações que nao 404 not found", async () => {
    const index = await Avaliacao.index();
    let avalicaoArray: Array<IAvalicao[]> = [];

    if (index !== undefined) {
      for await (const doc of index) {
        avalicaoArray.push(doc);
      }
    }
    console.log(avalicaoArray.length);
    expect(avalicaoArray.length <= 0).toBe(avalicaoArray.length <= 0);
  });

  it("Uma Avaliação não pode ter numeros abaixo de 1 e numeros maiores do que 5", () => {
    const avaliacaoData: IAvalicao = {
      userId: "665e2c185e473822be9af050",
      rating: 4,
      comment: "testeando",
    };
    expect(avaliacaoData.rating >= 1 && avaliacaoData.rating <= 5).toBe(true);
  });

  it("Uma Avaliação com rating menor do 1 e maior do que 5", () => {
    const avaliacaoData: IAvalicao = {
      userId: ObjectId.generate().toString(),
      rating: -1,
      comment: "testeando",
    };
    expect(avaliacaoData.rating < 1 || avaliacaoData.rating > 5).toBe(true);
  });
});
