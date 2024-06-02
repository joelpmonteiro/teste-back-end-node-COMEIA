import { IUser } from "../interface";
import mongo from "../mongodb/mongo";
import { Db } from "mongodb";
import { env } from "../config/env";

class UserADO {
  private conn: Db | undefined;
  private collection = "user";
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
      return con;
    } catch (error) {
      throw error;
    }
  }

  async showByEmail(email: string): Promise<number | undefined> {
    try {
      const con = await this.conn
        ?.collection(this.collection)
        .find({ email: email });

      // verifica a quantidade de linhas para definir se achou ou nao o usuario pelo email
      const countItens = await this.conn
        ?.collection(this.collection)
        .countDocuments({ email: email });
      return countItens;
    } catch (error) {
      console.log(error);
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

  async update(data: IUser) {
    try {
      //const con = this.conn?.collection(this.collection).updateOne({})
      //console.log("con: ", con);
      return "";
    } catch (error) {
      throw error;
    }
  }

  async createAvalicao(data: IUser) {
    try {
      const con = await this.conn?.collection(this.collection).insertOne(data);
      console.log(con);
      return con;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserADO();
