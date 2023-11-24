import { Router } from "express"
import { clienteCreate, clienteIndex } from "./controllers/clienteController.js"
import { profissionalCreate, profissionalDestaca, profissionalDestaques, profissionalIndex, profissionalShow } from "./controllers/profissionalController.js"
import { avaliacaoCreate, avaliacaoDestroy, avaliacaoProfissional, avaliacaoGraphDias, avaliacaoGraphEstrelas, avaliacaoIndex, dadosGerais } from "./controllers/avaliacaoController.js"
import { loginCliente } from "./controllers/loginController.js"

const router = Router()

router.get('/clientes', clienteIndex)
      .post('/clientes', clienteCreate)
      .post('/login', loginCliente)

router.get('/profissionais', profissionalIndex)
      .get('/profissionais/destaques', profissionalDestaques)
      .post('/profissionais', profissionalCreate)
      .get('/profissionais/:id', profissionalShow)
      .patch('/profissionais/destaca/:id', profissionalDestaca)

router.get('/avaliacoes', avaliacaoIndex)
      .post('/avaliacoes', avaliacaoCreate)
      .delete('/avaliacoes/:id', avaliacaoDestroy)
      .get('/avaliacoes/graph', avaliacaoGraphEstrelas)
      .get('/avaliacoes/graph_dias', avaliacaoGraphDias)
      .get('/avaliacoes/profissionais/:profissional_id', avaliacaoProfissional)

router.get('/dados_gerais', dadosGerais)

export default router