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

  async showById(id: number) {
    try {
      const con = this.conn?.collection(this.collection).findOne({
        _id: {
          equals: id,
        },
      });
      console.log("con1: ", con);
      return con;
    } catch (error) {
      throw error;
    }
  }

  async index() {
    try {
      const con = this.conn?.collection(this.collection).find();
      console.log("con: ", con);
      return con;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number) {
    try {
      const con = this.conn?.collection(this.collection).deleteOne({
        _id: {
          equals: id,
        },
      });
      console.log("con: ", con);
      return con;
    } catch (error) {
      throw error;
    }
  }

  async update(data: IAvalicao) {
    try {
      //const con = this.conn?.collection(this.collection).updateOne({})
      //console.log("con: ", con);
      return "";
    } catch (error) {
      throw error;
    }
  }

  async createAvalicao(data: IAvalicao) {
    try {
      const con = this.conn?.collection(this.collection).insertOne(data);
      console.log("con: ", con);
      return con;
    } catch (error) {
      throw error;
    }
  }
}

export default new AvalicaoADO();
