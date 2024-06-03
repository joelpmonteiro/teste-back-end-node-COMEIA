import express from "express";
import AuthController from "../../controller/authController";
import { authorizedAuth } from "../../middleware/authentication";
const route_auth = express.Router();

//busca todas as avalicações
route_auth.post("/login", AuthController.loginUser);

export { route_auth };
