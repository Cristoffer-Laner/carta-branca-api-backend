import express from 'express'
import cors from "cors"
import routes from './routes.js'

import { sequelize } from './databases/conecta.js'
import { Cliente } from './models/Cliente.js'
import { Profissional } from './models/Profissional.js'
import { Avaliacao } from './models/Avaliacao.js'

const app = express()
const port = 3004

app.use(express.json())
app.use(cors())
app.use(routes)

async function conecta_db() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com banco de dados realizada com sucesso');
    await Cliente.sync()
    await Profissional.sync()
    await Avaliacao.sync()
  } catch (error) {
    console.error('Erro na conexão com o banco: ', error);
  }
}
conecta_db()

app.get('/', (req, res) => {
  res.send('API Projeto Next - Filmes')
})

app.listen(port, () => {
  console.log(`Servidor Rodando na Porta: ${port}`)
})