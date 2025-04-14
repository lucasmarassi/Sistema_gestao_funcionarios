const express = require('express');
const Perfis = require('../model/Perfis');
const MeuTokenJWT = require('../model/MeuTokenJWT');
const meutoken = new MeuTokenJWT();

module.exports = class PerfisControl {



 
    
    

    // Método assíncrono para criar um novo aluno.
    async perfis_create_control(request, response) {
        const authorization = request.headers['authorization'];
        
        // Valida o token antes de continuar
        if (meutoken.validarToken(authorization) == false) {
            return response.status(401).send({
                cod: 1,
                status: false,
                msg: 'Token inválido'
            });
        }

        const perfis = new Perfis();

        perfis.id_funcionario = request.body.perfis.id_funcionario;
        perfis.idade = request.body.perfis.idade;
        perfis.endereco = request.body.perfis.endereco;
        perfis.telefone = request.body.perfis.telefone;
        perfis.genero = request.body.perfis.genero;
        perfis.estado_civil = request.body.perfis.estado_civil;

        const isCreated = await perfis.create();
        const objResposta = {
            cod: 1,
            status: isCreated,
            msg: isCreated ? 'Perfil criado com sucesso' : 'Erro ao criar o Perfil'
        };
        response.status(200).send(objResposta);
    }

    // Método assíncrono para excluir um aluno existente.
    async perfis_delete_control(request, response) {
        const authorization = request.headers['authorization'];
        
        // Valida o token antes de continuar
        if (meutoken.validarToken(authorization) == false) {
            return response.status(401).send({
                cod: 1,
                status: false,
                msg: 'Token inválido'
            });
        }

        var perfis = new Perfis();
        perfis.id_funcionario = request.params.id_funcionario;
        const isDeleted = await perfis.delete();
        const payloadRecuperado=meutoken.getPayload();
       const novoToken=meutoken.gerarToken(payloadRecuperado);
        const objResposta = {
            cod: 1,
            status: isDeleted,
            msg: isDeleted ? 'Perfil excluído com sucesso' : 'Erro ao excluir o Perfil',
            token: novoToken
        };
        response.status(200).send(objResposta);
    }

    // Método assíncrono para atualizar um aluno existente.
    async perfis_update_control(request, response) {
        const authorization = request.headers['authorization'];
        
        // Valida o token antes de continuar
        if (meutoken.validarToken(authorization) == false) {
            return response.status(401).send({
                cod: 1,
                status: false,
                msg: 'Token inválido'
            });
        }

        const perfis = new Perfis();
        
        perfis.id_funcionario = request.params.id_funcionario;
        perfis.idade = request.body.perfis.idade;
        perfis.endereco = request.body.perfis.endereco;
        perfis.telefone = request.body.perfis.telefone;
        perfis.genero = request.body.perfis.genero;
        perfis.estado_civil = request.body.perfis.estado_civil;


        const isUpdated = await perfis.update();
        const payloadRecuperado=meutoken.getPayload();
        const  novoToken=meutoken.gerarToken(payloadRecuperado);
        const objResposta = {
            cod: 1,
            status: true,
            msg: isUpdated ? 'Perfil atualizado com sucesso' : 'Erro ao atualizar o Perfil',
            token: novoToken
        };
        response.status(200).send(objResposta);
    }

    // Método assíncrono para buscar todos os alunos.
    async perfis_read_all_control(request, response) {
        const authorization = request.headers['authorization'];
        
        // Valida o token antes de continuar
        if (meutoken.validarToken(authorization) == false) {
            return response.status(401).send({
                cod: 1,
                status: false,
                msg: 'Token inválido'
            });
        }

        var perfis = new Perfis();
        const resultado = await perfis.readAll();
        const payloadRecuperado=meutoken.getPayload();
        const  novoToken=meutoken.gerarToken(payloadRecuperado);
        const objResposta = {
            cod: 1,
            status: true,
            msg: 'Executado com sucesso',
            perfis: resultado,
            token: novoToken
        };
        response.status(200).send(objResposta);
    }

    // Método assíncrono para obter um aluno pelo ID.
    async perfis_read_by_id_control(request, response) {
        const authorization = request.headers['authorization'];
        
        // Valida o token antes de continuar
        if (meutoken.validarToken(authorization) == false) {
            return response.status(401).send({
                cod: 1,
                status: false,
                msg: 'Token inválido'
            });
        }

        var perfis = new Perfis();
        perfis.id_funcionario = request.params.id_funcionario;
        const resultado = await perfis.readByID();
        const payloadRecuperado=meutoken.getPayload();
        const token=meutoken.gerarToken(payloadRecuperado);
        const perfilEncontrado =  resultado.length > 0;

        // Define a resposta com base no resultado encontrado
        const objResposta = {
            cod: perfilEncontrado ? 1 : 0,  // Usa código 0 se não encontrar o professor
            status: perfilEncontrado,       // Define status como true ou false baseado no resultado
            msg: perfilEncontrado ? 'Perfil encontrado' : 'Perfil não encontrado',
            professor: perfilEncontrado ? resultado : null,
            token:perfilEncontrado ? novoToken : "sem token"  // Retorna null para o professor se não encontrado
        };
    
        // Define o código de resposta como 200 se encontrado, 404 se não encontrado
        response.status(perfilEncontrado ? 200 : 404).send(objResposta);
    }






    async relatorio_media_idade_control(request, response) {
        const authorization = request.headers['authorization'];
        
        // Valida o token antes de continuar
        if (meutoken.validarToken(authorization) == false) {
            return response.status(401).send({
                cod: 1,
                status: false,
                msg: 'Token inválido'
            });
        }

        var perfis = new Perfis();
        const resultado = await perfis.media_idade();
        const payloadRecuperado=meutoken.getPayload();
        const  novoToken=meutoken.gerarToken(payloadRecuperado);
        const objResposta = {
            cod: 1,
            status: true,
            msg: 'Executado com sucesso',
            perfis: resultado,
            token: novoToken
        };
        response.status(200).send(objResposta);
    }

};
