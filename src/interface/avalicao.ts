import { ObjectId } from "mongodb";

export type IAvalicao = {
  userId: number | ObjectId;
  rating: number;
  comment: string;
};

export type IAvalicaoShow = {
  _id: ObjectId;
  userId: number | ObjectId;
  rating: number;
  comment: string;
};
