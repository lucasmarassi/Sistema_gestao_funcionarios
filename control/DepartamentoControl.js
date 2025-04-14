const express = require('express');
const Departamento = require('../model/Departamento');
const MeuTokenJWT = require('../model/MeuTokenJWT');
const meutoken = new MeuTokenJWT();

module.exports = class DepartamentoControl {



    

    // Método assíncrono para criar um novo aluno.
    async departamento_create_control(request, response) {
        const authorization = request.headers['authorization'];
        
        // Valida o token antes de continuar
        if (meutoken.validarToken(authorization) == false) {
            return response.status(401).send({
                cod: 1,
                status: false,
                msg: 'Token inválido'
            });
        }

        var departamento= new Departamento();
        departamento.nome = request.body.departamento.nome;
        departamento.orcamento = request.body.departamento.orcamento;
        departamento.localizacao = request.body.departamento.localizacao;
        departamento.data_criacao = request.body.departamento.data_criacao;

        const isCreated = await departamento.create();
        const objResposta = {
            cod: 1,
            status: isCreated,
            msg: isCreated ? 'departamento criado com sucesso' : 'Erro ao criar o departamento'
        };
        response.status(200).send(objResposta);
    }

    // Método assíncrono para excluir um aluno existente.
    async departamento_delete_control(request, response) {
        const authorization = request.headers['authorization'];
        
        // Valida o token antes de continuar
        if (meutoken.validarToken(authorization) == false) {
            return response.status(401).send({
                cod: 1,
                status: false,
                msg: 'Token inválido'
            });
        }

        var departamento = new Departamento();
        departamento.id_d= request.params.id_d;
        const isDeleted = await departamento.delete();
       const payloadRecuperado=meutoken.getPayload();
       const novoToken=meutoken.gerarToken(payloadRecuperado);
        const objResposta = {
            cod: 1,
            status: isDeleted,
            msg: isDeleted ? 'departamento excluído com sucesso' : 'Erro ao excluir o departamento',
            novotoken: novoToken
        };
        response.status(200).send(objResposta);
    }

    // Método assíncrono para atualizar um aluno existente.
    async departamento_update_control(request, response) {
        const authorization = request.headers['authorization'];
        
        // Valida o token antes de continuar
        if (meutoken.validarToken(authorization) == false) {
            return response.status(401).send({
                cod: 1,
                status: false,
                msg: 'Token inválido'
            });
        }

        var departamento = new Departamento();
        departamento.id_d= request.params.id_d;
        departamento.nome = request.body.departamento.nome;
        departamento.orcamento = request.body.departamento.orcamento;
        departamento.localizacao = request.body.departamento.localizacao;
        departamento.data_criacao = request.body.departamento.data_criacao;

        const isUpdated = await departamento.update();
        const payloadRecuperado=meutoken.getPayload();
       const  novoToken=meutoken.gerarToken(payloadRecuperado);
        const objResposta = {
            cod: 1,
            status: true,
            msg: isUpdated ? 'departamento atualizado com sucesso' : 'Erro ao atualizar o departamento',
            novotoken: novoToken
        };
        response.status(200).send(objResposta);
    }

    // Método assíncrono para buscar todos os alunos.
    async departamento_read_all_control(request, response) {
        const authorization = request.headers['authorization'];
        
        // Valida o token antes de continuar
        if (meutoken.validarToken(authorization) == false) {
            return response.status(401).send({
                cod: 1,
                status: false,
                msg: 'Token inválido'
            });
        }

        var departamento = new Departamento();
        const resultado = await departamento.readAll();
       const payloadRecuperado=meutoken.getPayload();
       const novoToken=meutoken.gerarToken(payloadRecuperado);
        const objResposta = {
            cod: 1,
            status: true,
            msg: 'Executado com sucesso',
            departamentos: resultado,
            novotoken: novoToken
        };
        response.status(200).send(objResposta);
    }

    // Método assíncrono para obter um aluno pelo ID.
    async departamento_read_by_id_control(request, response) {
        const authorization = request.headers['authorization'];
        
        // Valida o token antes de continuar
        if (meutoken.validarToken(authorization) == false) {
            return response.status(401).send({
                cod: 1,
                status: false,
                msg: 'Token inválido'
            });
        }

        var departamento = new Departamento();
        departamento.id_d = request.params.id_d;
        const resultado = await departamento.readByID();
       const payloadRecuperado=meutoken.getPayload();
       const novoToken=meutoken.gerarToken(payloadRecuperado);
       const departamentoEncontrado =  resultado.length > 0;

       // Define a resposta com base no resultado encontrado
       const objResposta = {
           cod:departamentoEncontrado ? 1 : 0,  // Usa código 0 se não encontrar o professor
           status:departamentoEncontrado,       // Define status como true ou false baseado no resultado
           msg: departamentoEncontrado ? ' departamento encontrado' : 'departamento não encontrado',
           aluno: departamentoEncontrado ? resultado : null,
           novoToken:departamentoEncontrado ? novoToken : "sem token"  // Retorna null para o professor se não encontrado
       };
   
       // Define o código de resposta como 200 se encontrado, 404 se não encontrado
       response.status(departamentoEncontrado ? 200 : 404).send(objResposta);
    }
};
