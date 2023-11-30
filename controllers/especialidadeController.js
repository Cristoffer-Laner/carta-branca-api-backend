import { Especialidade } from "../models/Especialidade.js";

export const especialidadeIndex = async (req, res) => {
  try {
    const especialidade = await Especialidade.findAll();
    res.status(200).json(especialidade);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const especialidadeCreate = async (req, res) => {
  const { descricao } = req.body;
  console.log("aquiiiiiii");
  if (!descricao) {
    console.log("aquiiiiiii");
    res.status(400).json({ id: 0, msg: "Erro... Informe os dados" });
    return;
  }

  try {
    const especialidade = await Especialidade.create({
      descricao,
    });
    res.status(201).json(especialidade);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
