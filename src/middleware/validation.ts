import { Request, Response, NextFunction } from "express";

export const userValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errorMessage = "";
  try {
    if (!req.body.nome) {
      errorMessage = "nome e obrigatório";
    }
    if (!req.body.senha) {
      errorMessage = "a senha e obrigatório";
    }
    if (req.body.senha.length < 5) {
      errorMessage = "a senha deve ter pelo menos 4 caracteres";
    }
    if (
      req.body.email.match(
        '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/'
      )
    ) {
      errorMessage = "forneça um e-mail válido";
    }

    // send error
    if (errorMessage) {
      throw errorMessage;
    }

    next();
  } catch (error) {
    // send error
    res.status(422).json({ success: false, errorMessage });
  }
};

export const avaliacaoValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errorMessage = "";
  try {
    if (!req.body.userId) {
      errorMessage = "O id do usuário e obrigatório";
    }
    if (!req.body.rating) {
      errorMessage = "A nota da avaliação e obrigatório";
    }
    if (req.body.rating < 1 || req.body.rating > 5) {
      errorMessage = "A avalição deve ter um intervalo entre 1 a 5";
    }
    if (!req.body.comment) {
      errorMessage = "O comentario e obrigatório";
    }

    // send error
    if (errorMessage) {
      throw errorMessage;
    }

    next();
  } catch (error) {
    // send error
    res.status(422).json({ success: false, errorMessage });
  }
};
