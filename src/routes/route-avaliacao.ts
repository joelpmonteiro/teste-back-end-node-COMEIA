import express from "express";
import AvalicaoController from "../controller/avalicaoController";
const route_avaliacao = express.Router();

//busca todas as avalicações
route_avaliacao.get("/find-all-reviews", AvalicaoController.index);

//busca avaliação por id
route_avaliacao.get("/find-byId-review", AvalicaoController.showById);

//deleta avaliação
route_avaliacao.delete("/delete-review", AvalicaoController.delete);

//atualiza avaliação
route_avaliacao.put("/update-review", AvalicaoController.update);

//cria avaliação
route_avaliacao.post("/create-review", AvalicaoController.create);

export { route_avaliacao };
