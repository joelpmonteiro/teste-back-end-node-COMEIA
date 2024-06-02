import { Request, Response } from "express";
import createAvalicao from "../ado/avalicaoADO";
import { IAvalicao } from "../interface";
class AvalicaoController {
  constructor() {}

  async index(req: Request, res: Response) {
    try {
      const index = await createAvalicao.index();
      if (index === null || index === undefined) {
        return res
          .status(404)
          .json({ msg: "não foi encontrado nenhuma avaliação" });
      }

      return res.status(200).json(index);
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno" });
    }
  }

  async showById(req: Request, res: Response) {
    try {
      const { id } = req.params as any as { id: number };

      const show = await createAvalicao.showById(id);
      if (show === null || show === undefined) {
        return res
          .status(404)
          .json({ msg: "não foi encontrado nenhuma avaliação" });
      }

      return res.status(200).json(show);
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params as any as { id: number };
      const avalicaoUpdate: IAvalicao = req.body;

      const updateAv = await createAvalicao.update(avalicaoUpdate);
      if (updateAv === null || updateAv === undefined) {
        return res
          .status(404)
          .json({ msg: "não foi encontrado avaliação para atualizar" });
      }

      return res.status(200).json(updateAv);
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params as any as { id: number };

      const deleteAv = await createAvalicao.delete(id);
      if (deleteAv === null || deleteAv === undefined) {
        return res
          .status(404)
          .json({ msg: "não foi encontrado avaliação para deletar" });
      }

      return res.status(200).json(deleteAv);
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const avalicao: IAvalicao = req.body;

      if (avalicao.rating < 1 && avalicao.rating > 5) {
        throw "A avalição deve ter um intervalo entre 1 a 5";
      }

      const result = await createAvalicao.createAvalicao(avalicao);

      if (result === null || result === undefined) {
        return res.status(404).json({ msg: "erro ao criar avaliação" });
      }

      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno" });
    }
  }
}

export default new AvalicaoController();
