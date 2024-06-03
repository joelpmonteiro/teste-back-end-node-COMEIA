import { IUser, IUserMongo } from "../interface";
import mongo from "../mongodb/mongo";
import { Db, Document, ObjectId, WithId } from "mongodb";
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
      const con = (await this.conn
        ?.collection(this.collection)
        .findOne(
          { _id: ObjectId.createFromHexString(id.toString()) },
          { projection: { _id: 1, email: 1, nome: 1 } }
        )) as WithId<IUserMongo | Document> | null | undefined;
      return con;
    } catch (error) {
      throw error;
    }
  }

  async showByEmail(email: string) {
    try {
      const con = this.conn?.collection(this.collection).find({ email: email });

      // verifica a quantidade de linhas para definir se achou ou nao o usuario pelo email
      const countItens = await this.conn
        ?.collection(this.collection)
        .countDocuments({ email: email });
      return con;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async index() {
    try {
      const con = this.conn
        ?.collection<IUserMongo[]>(this.collection)
        .find({})
        .project<IUserMongo[]>({ _id: 1, email: 1, nome: 1 });
      return con;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number) {
    try {
      const con = await this.conn
        ?.collection(this.collection)
        .deleteOne({ _id: ObjectId.createFromHexString(id.toString()) });
      return con;
    } catch (error) {
      throw error;
    }
  }

  async update(data: IUser, id: number) {
    try {
      const filter = { _id: ObjectId.createFromHexString(id.toString()) };
      const options = { upsert: true };

      const updateDoc = {
        $set: {
          email: data.email,
          nome: data.nome,
          senha: data.senha,
        },
      };

      const con = await this.conn
        ?.collection(this.collection)
        .updateOne(filter, updateDoc, options);
      //console.log("con: ", con);
      return con;
    } catch (error: any) {
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
