import { NextFunction, Response, Request } from "express";
import { env } from "../config/env";
import jwt from "jsonwebtoken";

export const sign = (user: string) => {
  const key: any = env.secret_key;
  const token = jwt.sign(
    {
      user,
    },
    key,
    {
      expiresIn: 7200, //2h
    }
  );
  return token;
};

export const authorizedAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: any = req.headers["authorization"]?.split(" ")[1];
    const key: any = env.secret_key;

    if (!token)
      return res
        .status(403)
        .send({ msg: "Token de autenticação não informado" });

    jwt.verify(token, key, (err: any, decoded: any) => {
      if (err) {
        return res.status(401).send({ msg: "Falha na autorização" });
      }
      //req.user = decoded.id;
      return next();
    });
  } catch (e) {
    //console.log(e)
    return res.status(400).json({
      msg: "Erro ao validar autenticação",
    });
  }
};
