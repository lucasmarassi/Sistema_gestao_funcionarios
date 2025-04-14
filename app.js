const express = require('express');
const path = require('path');

const FuncionarioRouter = require('./router/FuncionarioRouter');
const PerfisRouter = require('./router/PerfisRouter');
const DepartamentoRouter = require('./router/DepartamentoRouter');
const Historico_cargosRouter = require('./router/Historico_cargosRouter');

const app = express();
const portaServico = 8080;

// Middleware para JSON
app.use(express.json());

// ✅ Middleware para arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rotas da API
const funcionarioRoteador = new FuncionarioRouter();
const perfisRoteador = new PerfisRouter(); 
const departamentoRoteador = new DepartamentoRouter();
const historico_cargosRoteador = new Historico_cargosRouter()

app.use('/funcionario', funcionarioRoteador.criarRotasFuncionario());
app.use('/perfis', perfisRoteador.criarRotasPerfis());
app.use('/departamento', departamentoRoteador.criarRotasDepartamento());
app.use('/historico_cargos', historico_cargosRoteador.criarRotasHistorico_cargos());

// Rota opcional
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.listen(portaServico, () => {
    console.log(`API rodando no endereço: http://localhost:${portaServico}/`);
});
