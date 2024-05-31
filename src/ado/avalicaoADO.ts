import { Db } from "mongodb";
import { IAvalicao } from "../interface";
import mongo from "../mongodb/mongo";
import { env } from "../config/env";

class AvalicaoADO {
  private conn: Db | undefined;
  private collection = "avalicao";
  constructor() {
    this.init();
  }
  init() {
    mongo
      .getConnect()
      .connect()
      .then((result) => {
        this.conn = result.db(env.database);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  async createAvalicao(data: IAvalicao) {
    try {
      return this.conn?.collection(this.collection).insertOne(data);
    } catch (error) {
      throw error;
    }
  }
}

export default new AvalicaoADO();
