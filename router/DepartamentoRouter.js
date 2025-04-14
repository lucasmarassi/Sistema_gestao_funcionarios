// Importa o módulo 'express', que é necessário para criar o roteador.
const express = require('express');
// Importa a classe 'CargoControl', que contém a lógica de controle para as operações relacionadas a cargos.
const DepartamentoControl = require('../control/DepartamentoControl');
// Importa a classe 'CargoMiddleware', que contém validações e verificações antes das operações de controle.
const DepartamentoMiddleware = require('../middleware/DepartamentoMiddleware');
// Exporta a classe 'CargoRouter', que define as rotas relacionadas ao recurso "Cargo".
module.exports = class DepartamentoRouter {
// O construtor inicializa o roteador, o controle e o middleware de cargos.
constructor() {
// Cria uma instância do roteador do Express para definir as rotas.
this._router = express.Router();
// Cria uma instância de 'CargoControl', que gerencia a lógica de negócios para os cargos.
this._departamentoControl = new DepartamentoControl();
// Cria uma instância de 'CargoMiddleware', que valida e executa verificações antes das ações principais.
this.departamentoMiddleware = new DepartamentoMiddleware();
}
// Método para criar e configurar as rotas relacionadas ao recurso "Cargo".

criarRotasDepartamento() {
    // Define uma rota HTTP GET para listar todos os cargos.
    this._router.get('/',
    // Usa o método 'cargo_read_all_control' do controle para obter todos os cargos.
    this._departamentoControl.departamento_read_all_control
    );
    // Define uma rota HTTP GET para buscar um cargo específico pelo ID.
    this._router.get('/:id_d',
    // Usa o método 'cargo_read_by_id_control' do controle para obter um cargo pelo seu ID.
    this._departamentoControl.departamento_read_by_id_control
    );
    // Define uma rota HTTP POST para criar um novo cargo.
    this._router.post('/',
    // Middleware para validar o nome do cargo no corpo da requisição.
    this.departamentoMiddleware.validar_NomeDepartamento,

    this._departamentoControl.departamento_create_control
    );
  
    // Define uma rota HTTP DELETE para remover um cargo pelo ID.
    this._router.delete('/:id_d',
    // Usa o método 'cargo_delete_control' do controle para deletar um cargo pelo seu ID.
    this._departamentoControl.departamento_delete_control
    );
    // Define uma rota HTTP PUT para atualizar um cargo pelo ID.
    this._router.put('/:id_d',
    // Usa o método 'cargo_update_control' do controle para atualizar os dados de um cargo específico.
    this.departamentoMiddleware.validar_NomeDepartamento2,
    this.departamentoMiddleware.validar_NomeDepartamento,
    this._departamentoControl.departamento_update_control
    );
    // Retorna o roteador configurado com todas as rotas para cargos.
    return this._router;
    }
    }