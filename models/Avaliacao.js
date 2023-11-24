import { DataTypes } from 'sequelize';
import { sequelize } from '../databases/conecta.js';
import { Cliente } from './Cliente.js';
import { Profissional } from './Profissional.js'

export const Avaliacao = sequelize.define('avaliacao', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  comentario: {
    type: DataTypes.STRING(255),
  },
  estrelas: {
    type: DataTypes.INTEGER(2),
    allowNull: false
  },
  data: {
    type: DataTypes.DATE(),
    allowNull: false
  }
}, {
  tableName: "avaliacoes"
});

Avaliacao.belongsTo(Profissional, {
  foreignKey: {
    name: 'profissional_id',
    allowNull: false
  },
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
})

Profissional.hasMany(Avaliacao, {
  foreignKey: 'profissional_id'
})

Avaliacao.belongsTo(Cliente, {
  foreignKey: {
    name: 'cliente_id',
    allowNull: false
  },
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
})

Cliente.hasMany(Avaliacao, {
  foreignKey: 'cliente_id'
})