import { DataTypes } from 'sequelize';
import { sequelize } from '../databases/conecta.js';

export const Profissional = sequelize.define('profissional', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  CPF: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  contato: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  dataNasc: {
    type: DataTypes.DATE(),
    allowNull: false
  },
  especialidade: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  imagem: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  destaque: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0
  },
  soma: {
    type: DataTypes.INTEGER(5),
    defaultValue: 0
  },
  num: {
    type: DataTypes.INTEGER(5),
    defaultValue: 0
  },
}, {
  paranoid: true
});