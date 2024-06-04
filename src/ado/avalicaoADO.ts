import { Db, Document, ObjectId, WithId } from "mongodb";
import { IAvalicao, IAvalicaoShow } from "../interface";
import mongo from "../mongodb/mongo";
import { env } from "../config/env";

class AvalicaoADO {
  private conn: Db | undefined;
  private collection = "avaliacao";
  constructor() {
    this.init();
  }
  init() {
    mongo
      .getConnect()
      .connect()
      .then((result) => {
        this.conn = result.db(process.env.database); //env.database
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async showById(id: string) {
    try {
      const con = (await this.conn
        ?.collection(this.collection)
        .findOne(
          { _id: ObjectId.createFromHexString(id) },
          { projection: { _id: 1, userId: 1, rating: 1, comment: 1 } }
        )) as WithId<IAvalicaoShow | Document> | null | undefined;
      return con;
    } catch (error) {
      throw error;
    }
  }

  async index() {
    try {
      const con = this.conn
        ?.collection<IAvalicao[]>(this.collection)
        .find()
        .project<IAvalicao[]>({ _id: 1, userId: 1, rating: 1, comment: 1 });
      return con;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const con = await this.conn
        ?.collection(this.collection)
        .deleteOne({ _id: ObjectId.createFromHexString(id) });
      return con;
    } catch (error) {
      throw error;
    }
  }

  async update(data: IAvalicao, id: string) {
    try {
      const filter = { _id: ObjectId.createFromHexString(id) };
      const options = { upsert: true };

      const updateDoc = {
        $set: {
          comment: data.comment,
          rating: data.rating,
          userId: data.userId,
        },
      };

      const con = await this.conn
        ?.collection(this.collection)
        .updateOne(filter, updateDoc, options);
      return con;
    } catch (error) {
      throw error;
    }
  }

  async createAvaliacao(data: IAvalicao) {
    try {
      console.log("dados", data);
      const con = await this.conn?.collection(this.collection).insertOne(data);

      return con;
    } catch (error) {
      throw error;
    }
  }
}

export default new AvalicaoADO();
