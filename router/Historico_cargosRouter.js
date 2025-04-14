// Importa o módulo 'express', que é necessário para criar o roteador.
const express = require('express');
// Importa a classe 'CargoControl', que contém a lógica de controle para as operações relacionadas a cargos.
const Historico_cargosControl = require('../control/Historico_cargosControl');
// Importa a classe 'CargoMiddleware', que contém validações e verificações antes das operações de controle.
const Historico_cargosMiddleware = require('../middleware/Historico_cargosMiddleware');
// Exporta a classe 'CargoRouter', que define as rotas relacionadas ao recurso "Cargo".
module.exports = class Historico_cargosRouter {
// O construtor inicializa o roteador, o controle e o middleware de cargos.
constructor() {
// Cria uma instância do roteador do Express para definir as rotas.
this._router = express.Router();
// Cria uma instância de 'CargoControl', que gerencia a lógica de negócios para os cargos.
this._historico_cargosControl = new Historico_cargosControl();
// Cria uma instância de 'CargoMiddleware', que valida e executa verificações antes das ações principais.
this._historico_cargosMiddleware = new Historico_cargosMiddleware();
}
// Método para criar e configurar as rotas relacionadas ao recurso "Cargo".

criarRotasHistorico_cargos() {
    // Define uma rota HTTP GET para listar todos os cargos.
    this._router.get('/',
    // Usa o método 'cargo_read_all_control' do controle para obter todos os cargos.
    this._historico_cargosControl.historico_cargos_read_all_control
    );
    // Define uma rota HTTP GET para buscar um cargo específico pelo ID.
    this._router.get('/:id_funcionario',
    // Usa o método 'cargo_read_by_id_control' do controle para obter um cargo pelo seu ID.
    this._historico_cargosControl.historico_cargos_read_by_id_control
    );
    // Define uma rota HTTP POST para criar um novo cargo.
    this._router.post('/',
    // Middleware para validar o nome do cargo no corpo da requisição.
   
    this._historico_cargosMiddleware.existe_Cargo,
    this._historico_cargosMiddleware.existe_Id_funcionario,
    
    this._historico_cargosControl.historico_cargos_create_control
    );
    
    
    
    // Retorna o roteador configurado com todas as rotas para cargos.
    return this._router;
    }
    }