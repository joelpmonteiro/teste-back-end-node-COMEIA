import express from "express";
import AvalicaoController from "../../controller/avalicaoController";
import { authorizedAuth } from "../../middleware/authentication";
import { avaliacaoValidate } from "../../middleware/validation";
const route_avaliacao = express.Router();

//busca todas as avalicações
route_avaliacao.get(
  "/find-all-reviews",
  authorizedAuth,
  AvalicaoController.index
);

//busca avaliação por id
route_avaliacao.get(
  "/find-byId-review/:id",
  authorizedAuth,
  AvalicaoController.showById
);

//deleta avaliação
route_avaliacao.delete(
  "/delete-review/:id",
  authorizedAuth,
  AvalicaoController.delete
);

//atualiza avaliação
route_avaliacao.put(
  "/update-review/:id",
  authorizedAuth,
  avaliacaoValidate,
  AvalicaoController.update
);

//cria avaliação
route_avaliacao.post(
  "/create-review",
  authorizedAuth,
  avaliacaoValidate,
  AvalicaoController.create
);

export { route_avaliacao };
