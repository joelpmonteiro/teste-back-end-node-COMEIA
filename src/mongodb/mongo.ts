import { MongoClient, ObjectId } from "mongodb";
import { env } from "../config/env";
class Mongo {
  private connect: MongoClient;
  constructor() {
    console.log("conectou");
    this.connect = new MongoClient(env.mongodb);
    this.createDB();
  }

  public getConnect() {
    return this.connect;
  }

  public setConnect(conn: MongoClient) {
    this.connect = conn;
  }

  createDB() {
    const dbUri = `${env.mongodb}${env.database}`;
    MongoClient.connect(dbUri)
      .then((result) => {
        this.connect = result;
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }

  async createCollection(collectionName: string) {
    try {
      const db = await this.connect.connect();
      const collectionExist = db.db(env.database); //verifica se db existe e a collection

      const collectionInfo = await collectionExist
        .listCollections({ name: collectionName })
        .next();

      if (collectionInfo !== null)
        throw "já existe uma collection com esse nome";

      const collectionCreate = await collectionExist.createCollection(
        collectionName
      );
      if (collectionCreate === null)
        throw "Collection já existe ou ouve um erro de conexão";

      console.log(`Collection created with the name ${collectionName}`);
      this.connect.close();
    } catch (error: any) {
      this.connect.close();
      throw error;
    }
  }
}

export default new Mongo();
