export type IUser = {
  email: string;
  nome: string;
  senha: string;
};

export type ILogin = {
  email: string;
  password: string;
};

export type IUserMongo = {
  _id: number;
  email: string;
  nome: string;
  senha?: string;
};
