import mongo from "./mongo";

export const createDBA = () => {
  mongo.createDB();
};

export const createCollection = async (nomeCollection: string) => {
  try {
    // cria as collections
    await mongo.createCollection(nomeCollection);
  } catch (error) {
    console.error(error);
  }
};
