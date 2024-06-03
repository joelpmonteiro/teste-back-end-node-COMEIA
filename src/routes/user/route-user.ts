import express from "express";
import UserController from "../../controller/userController";
import { authorizedAuth } from "../../middleware/authentication";
import { userValidate } from "../../middleware/validation";
const route_user = express.Router();

//busca todos as users
route_user.get("/find-all-users", authorizedAuth, UserController.index);

//busca user por id
route_user.get("/find-byId-user/:id", authorizedAuth, UserController.showById);

//deleta user
route_user.delete("/delete-user/:id", authorizedAuth, UserController.delete);

//atualiza user
route_user.put(
  "/update-user/:id",
  authorizedAuth,
  userValidate,
  UserController.update
);

//cria user
route_user.post("/create-user", userValidate, UserController.create);

export { route_user };
