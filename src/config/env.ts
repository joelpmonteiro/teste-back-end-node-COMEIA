export const env = {
  port: Number(process.env.port),
  mongodb: process.env.mongodb as string,
  database: process.env.database as string,
  secret_key: process.env.secret_key as string,
};
