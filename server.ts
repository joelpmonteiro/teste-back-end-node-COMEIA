import { app } from "./src/config/config";
import { env } from "./src/config/env";
import {
  createCollection,
  createDBA,
} from "./src/mongodb/createDBA-Collection";

//inicia o serviço do mongo para criar as collections
(async () => {
  createDBA();
  await createCollection("avaliacao");
  await createCollection("user");
})();

app.listen(env.port, () => console.log(`servidor rodando ${env.port}`));
