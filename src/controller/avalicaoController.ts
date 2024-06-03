import { Request, Response } from "express";
import AvalicaoAdo from "../ado/avalicaoADO";
import { IAvalicao } from "../interface";
import { ObjectId } from "mongodb";
class AvalicaoController {
  constructor() {}

  async index(req: Request, res: Response) {
    try {
      const index = await AvalicaoAdo.index();
      let avalicaoArray: Array<IAvalicao[]> = [];
      if (index !== undefined) {
        for await (const doc of index) {
          avalicaoArray.push(doc);
        }
      } else {
        return res
          .status(404)
          .json({ msg: "Não foi encontrado nenhuma avaliação" });
      }

      return res.status(200).json(avalicaoArray);
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno" });
    }
  }

  async showById(req: Request, res: Response) {
    try {
      const { id } = req.params as any as { id: number };

      const show = await AvalicaoAdo.showById(id);
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

      const updateAv = await AvalicaoAdo.update(avalicaoUpdate, id);
      if (updateAv?.modifiedCount === 1 && updateAv?.matchedCount === 1) {
        return res
          .status(200)
          .json({ msg: "Avaliação atualizado com sucesso" });
      }

      // se nao existir o usuario é criado.
      if (
        updateAv !== null &&
        (updateAv?.upsertedCount === 1 || Number(updateAv?.upsertedId) === 1)
      ) {
        return res.status(201).json({ msg: "Avaliação criado com sucesso" });
      }

      return res.status(404).json({ msg: "Erro ao atualizar Avaliação" });
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params as any as { id: number };

      const deleteAv = await AvalicaoAdo.delete(id);
      if (deleteAv === undefined || deleteAv.deletedCount === 0) {
        return res
          .status(404)
          .json({ msg: "não foi encontrado avaliação para deletar" });
      }

      return res.status(200).json({ msg: "Avaliação deletada com sucesso" });
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const avalicao: IAvalicao = req.body;

      if (avalicao.rating < 1 || avalicao.rating > 5) {
        throw { code: -1, msg: "A avalição deve ter um intervalo entre 1 a 5" };
      }

      avalicao.userId = ObjectId.createFromHexString(
        avalicao.userId.toString()
      );
      const result = await AvalicaoAdo.createAvalicao(avalicao);
      if (result === null || result === undefined) {
        return res.status(404).json({ msg: "erro ao criar avaliação" });
      }

      return res.status(201).json({ id: result.insertedId });
    } catch (error: any) {
      console.log(error);

      return res
        .status(500)
        .json({ msg: "Erro ao processar criação da avaliação" });
    }
  }
}

export default new AvalicaoController();
