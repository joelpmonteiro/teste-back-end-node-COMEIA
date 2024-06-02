import express from "express";
import UserController from "../../controller/userController";
const route_user = express.Router();

//busca todos as users
route_user.get("/find-all-users", UserController.index);

//busca user por id
route_user.get("/find-byId-user");

//deleta user
route_user.delete("/delete-user");

//atualiza user
route_user.put("/update-user");

//cria user
route_user.post("/create-user", UserController.create);

export { route_user };
