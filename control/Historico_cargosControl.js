const express = require('express');
const Historico_cargos = require('../model/Historico_cargos');
const MeuTokenJWT = require('../model/MeuTokenJWT');
const meutoken = new MeuTokenJWT();

module.exports = class Historico_cargosControl {



    

    // Método assíncrono para criar um novo aluno.
    async historico_cargos_create_control(request, response) {
        const authorization = request.headers['authorization'];
        
        // Valida o token antes de continuar
        if (meutoken.validarToken(authorization) == false) {
            return response.status(401).send({
                cod: 1,
                status: false,
                msg: 'Token inválido'
            });
        }

        var historico_cargos = new Historico_cargos();
        historico_cargos.id_funcionario = request.body.historico_cargos.id_funcionario;
        historico_cargos.cargo_anterior = request.body.historico_cargos.cargo_anterior;
        historico_cargos.cargo_novo = request.body.historico_cargos.cargo_novo;
        historico_cargos.data_alteracao = request.body.historico_cargos.data_alteracao;

        const isCreated = await historico_cargos.create();
        const objResposta = {
            cod: 1,
            status: isCreated,
            msg: isCreated ? 'historico_cargos criado com sucesso' : 'Erro ao criar o historico_cargos'
        };
        response.status(200).send(objResposta);
    }

   


    // Método assíncrono para buscar todos os alunos.
    async historico_cargos_read_all_control(request, response) {
        const authorization = request.headers['authorization'];
        
        // Valida o token antes de continuar
        if (meutoken.validarToken(authorization) == false) {
            return response.status(401).send({
                cod: 1,
                status: false,
                msg: 'Token inválido'
            });
        }

        var historico_cargos = new Historico_cargos();
        const resultado = await historico_cargos.readAll();
       const payloadRecuperado=meutoken.getPayload();
       const novoToken=meutoken.gerarToken(payloadRecuperado);
        const objResposta = {
            cod: 1,
            status: true,
            msg: 'Executado com sucesso',
            Historico_cargos: resultado,
            token: novoToken
        };
        response.status(200).send(objResposta);
    }

    // Método assíncrono para obter um aluno pelo ID.
    async historico_cargos_read_by_id_control(request, response) {
        const authorization = request.headers['authorization'];
        
        // Valida o token antes de continuar
        if (meutoken.validarToken(authorization) == false) {
            return response.status(401).send({
                cod: 1,
                status: false,
                msg: 'Token inválido'
            });
        }

        var historico_cargos = new Historico_cargos();
        historico_cargos.id_funcionario = request.params.id_funcionario;
        const resultado = await historico_cargos.readByID();
       const payloadRecuperado=meutoken.getPayload();
       const token=meutoken.gerarToken(payloadRecuperado);
       const historico_cargosEncontrado =  resultado.length > 0;

       // Define a resposta com base no resultado encontrado
       const objResposta = {
           cod:historico_cargosEncontrado ? 1 : 0,  // Usa código 0 se não encontrar o professor
           status:historico_cargosEncontrado,       // Define status como true ou false baseado no resultado
           msg: historico_cargosEncontrado ? 'historico_cargos do funcionario encontrado' : 'historico_cargos do funcionario não encontrado',
           aluno: historico_cargosEncontrado ? resultado : null,
           token:historico_cargosEncontrado ? novoToken : "sem token"  // Retorna null para o professor se não encontrado
       };
   
       // Define o código de resposta como 200 se encontrado, 404 se não encontrado
       response.status(historico_cargosEncontrado ? 200 : 404).send(objResposta);
    }
};
