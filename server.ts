import { app } from "./src/config/config";
import { env } from "./src/config/env";
import mongo from "./src/mongodb/mongo";

mongo
  .createCollection("avaliacao")
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

(async () => {
  try {
    console.log();
    const con = (await mongo.getConnect().connect()).db(env.database);
    con.collection("avaliacao").insertOne({
      nome: "teste",
    });
  } catch (error) {
    console.log("error", error);
  }
})();

app.listen(env.port, () => console.log(`servidor rodando ${env.port}`));
