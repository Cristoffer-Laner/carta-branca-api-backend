import { Op } from "sequelize"
import { sequelize } from '../databases/conecta.js'
import { Avaliacao } from '../models/Avaliacao.js';
import { Cliente } from '../models/Cliente.js';
import { Profissional } from '../models/Profissional.js';

export const avaliacaoIndex = async (req, res) => {

  try {
    const avaliacoes = await Avaliacao.findAll({
      include: [Cliente, Profissional],
      order: [['id', 'desc']]
    });
    res.status(200).json(avaliacoes)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const avaliacaoProfissional = async (req, res) => {

  const { profissional_id } = req.params

  try {
    const avaliacoes = await Avaliacao.findAll({
      where: { profissional_id },
      include: Cliente,
      order: [['id', 'desc']]
    });
    res.status(200).json(avaliacoes)
  } catch (error) {
    res.status(400).send(error)
  }
}


export const avaliacaoGraphEstrelas = async (req, res) => {

  try {
    const avaliacoes = await Avaliacao.findAll({
      attributes: ['estrelas',
        [sequelize.fn('count', sequelize.col('id')), 'num']],
      group: 'estrelas'
    });
    res.status(200).json(avaliacoes)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const avaliacaoGraphDias = async (req, res) => {

  const data = new Date()           // obtém a data atual
  data.setDate(data.getDate() - 7)  // subtrai 7 dias 

  const dia = data.getDate().toString().padStart(2, "0")
  const mes = (data.getMonth() + 1).toString().padStart(2, "0")
  const ano = data.getFullYear()

  const atras_7 = ano + "-" + mes + "-" + dia

  try {
    const avaliacoes = await Avaliacao.findAll({
      attributes: [
        [sequelize.fn('DAY', sequelize.col('data')), "dia"],
        [sequelize.fn('MONTH', sequelize.col('data')), "mes"],
        'estrelas',
        [sequelize.fn('count', sequelize.col('id')), 'num']],
      group: [
        sequelize.fn('DAY', sequelize.col('data')),
        sequelize.fn('MONTH', sequelize.col('data')),
        'estrelas'],
      where: { data: { [Op.gte]: atras_7 } }
    });
    res.status(200).json(avaliacoes)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const avaliacaoCreate = async (req, res) => {
  const { profissional_id, cliente_id, comentario, estrelas } = req.body

  // se não informou estes atributos
  if (!profissional_id || !cliente_id || !comentario || !estrelas) {
    res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
    return
  }

  const t = await sequelize.transaction();

  try {

    const avaliacao = await Avaliacao.create({
      profissional_id, cliente_id, comentario, estrelas, data: new Date()
    }, { transaction: t });

    await Profissional.increment('soma',
      { by: estrelas, where: { id: profissional_id }, transaction: t }
    );

    await Profissional.increment('num',
      { by: 1, where: { id: profissional_id }, transaction: t }
    );

    await t.commit();
    res.status(201).json(avaliacao)

  } catch (error) {

    await t.rollback();
    res.status(400).json({ "id": 0, "Erro": error })

  }
}

export const avaliacaoDestroy = async (req, res) => {
  const { id } = req.params

  const t = await sequelize.transaction();

  try {

    const avaliacao = await Avaliacao.findByPk(id)

    await Profissional.decrement('soma',
      {
        by: avaliacao.estrelas,
        where: { id: avaliacao.profissional_id },
        transaction: t
      }
    );

    await Profissional.decrement('num',
      {
        by: 1,
        where: { id: avaliacao.profissional_id },
        transaction: t
      }
    );

    await Avaliacao.destroy({
      where: { id }
    });

    await t.commit();
    res.status(200).json({ msg: "Ok! Avaliação Excluída com Sucesso" })

  } catch (error) {

    await t.rollback();
    res.status(400).json({ "id": 0, "Erro": error })

  }
}

export const dadosGerais = async (req, res) => {

  // new Date().toISOString() retorna "2023-11-21T21:12:05"
  // com o split, separamos pelo "T" e pegamos só a 1ª parte
  const dataAtual = new Date().toISOString().split("T")[0]

  try {
    const clientes = await Cliente.count()
    const profissional = await Profissional.count()
    const media = await Profissional.findOne({
      attributes: [[sequelize.fn('avg', sequelize.col('preco')), 'preco']]
    })
    const avaliacoes = await Avaliacao.count()
    const avaliacoes_dia = await Avaliacao.count({
      where: { data: { [Op.gte]: dataAtual } }
    })
    //    res.status(200).json({ clientes, profissional, media: media ? media.preco : 0, avaliacoes, avaliacoes_dia })
    res.status(200).json({ clientes, profissional, media, avaliacoes, avaliacoes_dia })
  } catch (error) {
    res.status(400).send(error)
  }
}