import { DataTypes } from "sequelize";
import { sequelize } from "../databases/conecta.js";
import { Profissional } from "./Profissional.js";

export const Especialidade = sequelize.define(
  "especialidade",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descricao: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    paranoid: true,
  }
);

//UMA ESPECIALIDADE PERTECE A UM PROFISSIONAL
Especialidade.hasOne(Profissional, {
  foreignKey: {
    name: "especialidade_id",
    allowNull: false,
  },
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
