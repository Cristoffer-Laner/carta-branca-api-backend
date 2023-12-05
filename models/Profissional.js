import { DataTypes } from 'sequelize';
import { sequelize } from '../databases/conecta.js';
import { Especialidade } from './Especialidade.js';

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
    type: DataTypes.DATE,
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

//um profissional pertence a uma especialidade

//uma especialidade tem muitos profissionais
// Especialidade.hasMany(Profissional, {
//   foreignKey: "especialidade_id",
// });

Especialidade.hasMany(Profissional, {
	foreignKey: {
	  name: "especialidade_id",
	  allowNull: true,
	},
	onDelete: "RESTRICT",
	onUpdate: "CASCADE",
});

Profissional.belongsTo(Especialidade, {
	foreignKey: {
		name: "especialidade_id",
		allowNull: true,
	}
})