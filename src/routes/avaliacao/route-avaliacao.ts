import express from "express";
import AvalicaoController from "../../controller/avalicaoController";
import { authorizedAuth } from "../../middleware/authentication";
const route_avaliacao = express.Router();

//busca todas as avalicações
route_avaliacao.get(
  "/find-all-reviews",
  authorizedAuth,
  AvalicaoController.index
);

//busca avaliação por id
route_avaliacao.get(
  "/find-byId-review",
  authorizedAuth,
  AvalicaoController.showById
);

//deleta avaliação
route_avaliacao.delete(
  "/delete-review",
  authorizedAuth,
  AvalicaoController.delete
);

//atualiza avaliação
route_avaliacao.put(
  "/update-review",
  authorizedAuth,
  AvalicaoController.update
);

//cria avaliação
route_avaliacao.post(
  "/create-review",
  authorizedAuth,
  AvalicaoController.create
);

export { route_avaliacao };
