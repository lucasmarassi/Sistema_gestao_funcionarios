// Importa o módulo 'express', que é necessário para criar o roteador.
const express = require('express');
// Importa a classe 'CargoControl', que contém a lógica de controle para as operações relacionadas a cargos.
const FuncionarioControl = require('../control/FuncionarioControl');
// Importa a classe 'CargoMiddleware', que contém validações e verificações antes das operações de controle.
const FuncionarioMiddleware = require('../middleware/FuncionarioMiddleware');
// Exporta a classe 'CargoRouter', que define as rotas relacionadas ao recurso "Cargo".
module.exports = class FuncionarioRouter {
// O construtor inicializa o roteador, o controle e o middleware de cargos.
constructor() {
// Cria uma instância do roteador do Express para definir as rotas.
this._router = express.Router();
// Cria uma instância de 'CargoControl', que gerencia a lógica de negócios para os cargos.
this._funcionarioControl = new FuncionarioControl();
// Cria uma instância de 'CargoMiddleware', que valida e executa verificações antes das ações principais.
this._funcionarioMiddleware = new FuncionarioMiddleware();
}
// Método para criar e configurar as rotas relacionadas ao recurso "Cargo".

criarRotasFuncionario() {
    // Define uma rota HTTP GET para listar todos os cargos.
    this._router.get('/',
    // Usa o método 'cargo_read_all_control' do controle para obter todos os cargos.
    this._funcionarioControl.funcionario_read_all_control
    );

   

    this._router.get('/resumo/estatistico',
        // Usa o método 'cargo_read_all_control' do controle para obter todos os cargos.
        this._funcionarioControl.funcionario_resumo_control
        );

    this._router.get('/media_salario_departamento',
            // Usa o método 'cargo_read_all_control' do controle para obter todos os cargos.
        this._funcionarioControl.relatorio_media_salario_control
        );
    // Define uma rota HTTP GET para buscar um cargo específico pelo ID.
    this._router.get('/:id_func',
    // Usa o método 'cargo_read_by_id_control' do controle para obter um cargo pelo seu ID.
    this._funcionarioControl.funcionario_read_by_id_control
    );
    // Define uma rota HTTP POST para criar um novo cargo.
    this._router.post('/',
    // Middleware para validar o nome do cargo no corpo da requisição.
    this._funcionarioMiddleware.validar_NomeFuncionario,

    this._funcionarioMiddleware.validar_EmailFuncionario,
    // Middleware para verificar se o nome do cargo já existe no banco de dados.
    this._funcionarioMiddleware.validar_Id_supervisor,
    this._funcionarioMiddleware.existe_Id_departamento,
    
    
  
    // Usa o método 'cargo_create_control' do controle para criar um novo cargo.
    this._funcionarioControl.funcionario_create_control
    );
    this._router.post('/login',
        // Usa o método 'cargo_read_all_control' do controle para obter todos os cargos.
        this._funcionarioControl.funcionario_login_control
        );
    // Define uma rota HTTP DELETE para remover um cargo pelo ID.
    this._router.delete('/:id_func',
    // Usa o método 'cargo_delete_control' do controle para deletar um cargo pelo seu ID.
    this._funcionarioControl.funcionario_delete_control
    );
    // Define uma rota HTTP PUT para atualizar um cargo pelo ID.
    this._router.put('/:id_func',
    // Usa o método 'cargo_update_control' do controle para atualizar os dados de um cargo específico.
    this._funcionarioMiddleware.validar_NomeFuncionario,
    this._funcionarioMiddleware.validar_EmailFuncionario2,
    this._funcionarioMiddleware.validar_EmailFuncionario,
    this._funcionarioControl.funcionario_update_control
    );
    // Retorna o roteador configurado com todas as rotas para cargos.
    return this._router;
    }
    }