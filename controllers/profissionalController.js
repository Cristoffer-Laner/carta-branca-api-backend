import { Profissional } from '../models/Profissional.js'

export const profissionalIndex = async (req, res) => {
  try {
    const profissional = await Profissional.findAll()
    res.status(200).json(profissional)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const profissionalDestaques = async (req, res) => {
  try {
    const profissional = await Profissional.findAll({ where: { destaque: true } })
    res.status(200).json(profissional)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const profissionalDestaca = async (req, res) => {
  const { id } = req.params

  try {
    // posiciona no registro para obter o status atual do campo destaque
    const profissional = await Profissional.findByPk(id)
    // altera com o contrário do atual
    await Profissional.update({ destaque: !profissional.destaque }, { where: { id } })
    res.status(200).json(profissional)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const profissionalCreate = async (req, res) => {
  const { nome, CPF, contato, dataNasc, especialidade, imagem, destaque, soma, num } = req.body

  // se não informou estes atributos
  if (!nome || !CPF || !contato || !dataNasc || !especialidade || !imagem || !destaque || !soma || !num) {
    res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
    return
  }

  try {
    const profissional = await Profissional.create({
      nome, CPF, contato, dataNasc, especialidade, imagem, destaque, soma, num
    });
    res.status(201).json(profissional)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const profissionalDestroy = async (req, res) => {
  const { id } = req.params

  try {
    await Profissional.destroy({ where: { id } });
    res.status(200).json({ msg: "Ok! Removido com Sucesso" })
  } catch (error) {
    res.status(400).send(error)
  }
}

export const profissionalShow = async (req, res) => {
  const { id } = req.params

  try {
    const profissional = await Profissional.findByPk(id)
    res.status(200).json(profissional)
  } catch (error) {
    res.status(400).send(error)
  }
}