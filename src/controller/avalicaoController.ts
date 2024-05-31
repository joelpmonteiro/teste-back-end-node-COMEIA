import { Request, Response } from "express";
class AvalicaoController {
  constructor() {}

  async index() {}
  async showById() {}
  async update() {}
  async delete() {}
  async create(req: Request, res: Response) {
    try {
    } catch (error) {
      return res.status(404).json({ msg: "Erro interno" });
    }
  }
}

export default new AvalicaoController();
