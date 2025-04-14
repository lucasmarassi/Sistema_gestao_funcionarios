// Importa o módulo 'express', necessário para criar o roteador.
const express = require('express');
// Importa a classe 'ProfessorControl', que contém a lógica de controle para as operações relacionadas a professores.
const PerfisControl = require('../control/PerfisControl');
// Importa a classe 'ProfessorMiddleware', que contém validações e verificações antes das operações de controle.
const PerfisMiddleware = require('../middleware/PerfisMiddleware');

// Exporta a classe 'ProfessorRouter', que define as rotas relacionadas ao recurso "Professor".
module.exports = class PerfisRouter {
    // O construtor inicializa o roteador, o controle e o middleware de professores.
    constructor() {
        // Cria uma instância do roteador do Express para definir as rotas.
        this._router = express.Router();
        // Cria uma instância de 'ProfessorControl', que gerencia a lógica de negócios para professores.
        this._perfisControl = new PerfisControl();
        // Cria uma instância de 'ProfessorMiddleware', que valida e executa verificações antes das ações principais.
        this._perfisMiddleware = new PerfisMiddleware();
    }

    // Método para criar e configurar as rotas relacionadas ao recurso "Professor".
    criarRotasPerfis() {
        // Define uma rota HTTP GET para listar todos os professores.
        this._router.get('/',
            this._perfisControl.perfis_read_all_control
        );
         //  Mova essa rota para cima
        this._router.get('/media_idade_departamento',
            this._perfisControl.relatorio_media_idade_control
        );
        // Define uma rota HTTP GET para buscar um professor específico pelo ID.
        this._router.get('/:id_funcionario',
            this._perfisControl.perfis_read_by_id_control
        );
       

        // Define uma rota HTTP POST para criar um novo professor.
        this._router.post('/',
            // Middleware para validar o nome do professor no corpo da requisição.
            
            // Middleware para validar o email do professor.
            this._perfisMiddleware.existe_Id_funcionario,
            this._perfisMiddleware.validar_IdFuncionario,
            this._perfisMiddleware.validar_IdadePerfis,
            this._perfisMiddleware.validar_TelefonePerfis,
            
            // Método para criar um novo professor.
            this._perfisControl.perfis_create_control
        );

        // Define uma rota HTTP POST para login do professor.
       

        // Define uma rota HTTP DELETE para remover um professor pelo ID.
        this._router.delete('/:id_funcionario',
            this._perfisControl.perfis_delete_control
        );

        // Define uma rota HTTP PUT para atualizar um professor pelo ID.
        this._router.put('/:id_funcionario',
            
            this._perfisMiddleware.validar_IdadePerfis,
            this._perfisMiddleware.validar_TelefonePerfis,
            this._perfisControl.perfis_update_control

        );

        // Retorna o roteador configurado com todas as rotas para professores.
        return this._router;
    }
}
