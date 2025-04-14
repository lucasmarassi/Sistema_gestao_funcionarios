const express = require('express');
const Funcionario = require('../model/Funcionario');
const MeuTokenJWT = require('../model/MeuTokenJWT');
const meutoken = new MeuTokenJWT();

module.exports = class FuncionarioControl {



    async funcionario_login_control(request, response) {
        var funcionario = new Funcionario();
       
        funcionario.email = request.body.funcionario.email;
        funcionario.senha = request.body.funcionario.senha;
       
        const resultado = await funcionario.login();
        // Verifica o login antes de gerar o token
        if (resultado==true) {
            const objectClaimsToken = new Object();
            objectClaimsToken.email = funcionario.email;
            objectClaimsToken.senha = funcionario.senha;
            
    
            const novoToken = meutoken.gerarToken(objectClaimsToken);
    
            // Envia a resposta com o novo token
            response.status(200).send({
                cod: 1,
                status: true,
                msg: 'Login realizado com sucesso',
                token: novoToken
            });
        } else {
            // Se o login falhar, envia uma resposta de erro
            response.status(401).send({
                cod: 0,
                status: false,
                msg: 'Falha no login: credenciais inválidas'
            });
        }
    }
    

    // Método assíncrono para criar um novo aluno.
    async funcionario_create_control(request, response) {
        const authorization = request.headers['authorization'];
        
        // Valida o token antes de continuar
        if (meutoken.validarToken(authorization) == false) {
            return response.status(401).send({
                cod: 1,
                status: false,
                msg: 'Token inválido'
            });
        }

        var funcionario = new Funcionario();
        funcionario.nome = request.body.funcionario.nome;
        funcionario.email = request.body.funcionario.email;
        funcionario.cpf = request.body.funcionario.cpf;
        funcionario.cargo = request.body.funcionario.cargo;
        funcionario.salario = request.body.funcionario.salario;
        funcionario.data_contratacao = request.body.funcionario.data_contratacao;
        funcionario.id_departamento = request.body.funcionario.id_departamento;
        funcionario.id_supervisor = request.body.funcionario.id_supervisor ?? null;
        funcionario.senha = request.body.funcionario.senha;

        const isCreated = await funcionario.create();
        const objResposta = {
            cod: 1,
            status: isCreated,
            msg: isCreated ? 'Funcionario criado com sucesso' : 'Erro ao criar o Funcionario'
        };
        response.status(200).send(objResposta);
    }

    // Método assíncrono para excluir um aluno existente.
    async funcionario_delete_control(request, response) {
        const authorization = request.headers['authorization'];
        
        // Valida o token antes de continuar
        if (meutoken.validarToken(authorization) == false) {
            return response.status(401).send({
                cod: 1,
                status: false,
                msg: 'Token inválido'
            });
        }

        var funcionario = new Funcionario();
        funcionario.id_func = request.params.id_func;
        const isDeleted = await funcionario.delete();
       const payloadRecuperado=meutoken.getPayload();
       const novoToken=meutoken.gerarToken(payloadRecuperado);
        const objResposta = {
            cod: 1,
            status: isDeleted,
            msg: isDeleted ? 'Funcionario excluído com sucesso' : 'Erro ao excluir o Funcionario',
            novotoken: novoToken
        };
        response.status(200).send(objResposta);
    }

    // Método assíncrono para atualizar um aluno existente.
    async funcionario_update_control(request, response) {
        const authorization = request.headers['authorization'];
        
        // Valida o token antes de continuar
        if (meutoken.validarToken(authorization) == false) {
            return response.status(401).send({
                cod: 1,
                status: false,
                msg: 'Token inválido'
            });
        }

        var funcionario = new Funcionario();
        funcionario.id_func = request.params.id_func;
        funcionario.nome = request.body.funcionario.nome;
        funcionario.email = request.body.funcionario.email;
        funcionario.cpf = request.body.funcionario.cpf;
        funcionario.cargo = request.body.funcionario.cargo;
        funcionario.salario = request.body.funcionario.salario;
        funcionario.data_contratacao = request.body.funcionario.data_contratacao;
        funcionario.id_departamento = request.body.funcionario.id_departamento;
        funcionario.id_supervisor = request.body.funcionario.id_supervisor;
        funcionario.senha = request.body.funcionario.senha;

        const isUpdated = await funcionario.update();
        const payloadRecuperado=meutoken.getPayload();
       const  novoToken=meutoken.gerarToken(payloadRecuperado);
        const objResposta = {
            cod: 1,
            status: true,
            msg: isUpdated ? 'Funcionario atualizado com sucesso' : 'Erro ao atualizar o Funcionario',
            novotoken: novoToken
        };
        response.status(200).send(objResposta);
    }

    // Método assíncrono para buscar todos os alunos.
    async funcionario_read_all_control(request, response) {
        const authorization = request.headers['authorization'];
        
        // Valida o token antes de continuar
        if (meutoken.validarToken(authorization) == false) {
            return response.status(401).send({
                cod: 1,
                status: false,
                msg: 'Token inválido'
            });
        }

        var funcionario = new Funcionario();
        const resultado = await funcionario.readAll();
       const payloadRecuperado=meutoken.getPayload();
       const novoToken=meutoken.gerarToken(payloadRecuperado);
        const objResposta = {
            cod: 1,
            status: true,
            msg: 'Executado com sucesso',
            funcionarios: resultado,
            token: novoToken


            
        };
        response.status(200).send(objResposta);
    }

    // Método assíncrono para obter um aluno pelo ID.
    async funcionario_read_by_id_control(request, response) {
        const authorization = request.headers['authorization'];
        
        // Valida o token antes de continuar
        if (meutoken.validarToken(authorization) == false) {
            return response.status(401).send({
                cod: 1,
                status: false,
                msg: 'Token inválido'
                
            });
        }

        var funcionario = new Funcionario();
        funcionario.id_func = request.params.id_func;
        const resultado = await funcionario.readByID();
       const payloadRecuperado=meutoken.getPayload();
       const novoToken=meutoken.gerarToken(payloadRecuperado);
       const funcionarioEncontrado =  resultado.length > 0;

       // Define a resposta com base no resultado encontrado
       const objResposta = {
           cod:funcionarioEncontrado ? 1 : 0,  // Usa código 0 se não encontrar o professor
           status:funcionarioEncontrado,       // Define status como true ou false baseado no resultado
           msg: funcionarioEncontrado ? 'Funcionario encontrado' : 'Funcionario não encontrado',
           funcionario: funcionarioEncontrado ? resultado : null,
           token:funcionarioEncontrado ? novoToken : "sem token"  // Retorna null para o professor se não encontrado



           
       };
   
       // Define o código de resposta como 200 se encontrado, 404 se não encontrado
       response.status(funcionarioEncontrado ? 200 : 404).send(objResposta);
    }


    async funcionario_resumo_control(req, res) {
        const authorization = req.headers['authorization'];
        if (meutoken.validarToken(authorization) == false) {
          return res.status(401).send({ status: false, msg: "Token inválido" });
        }
      
        const funcionario = new Funcionario();
        const resumo = await funcionario.resumoEstatistico();
        const payloadRecuperado=meutoken.getPayload();
        const novoToken=meutoken.gerarToken(payloadRecuperado);
      
        return res.status(200).send({
          status: true,
          msg: "Resumo estatístico gerado",
          resumo,
          token: novoToken
        });
      }




      async relatorio_media_salario_control(request, response) {
        const authorization = request.headers['authorization'];
        
        // Valida o token antes de continuar
        if (meutoken.validarToken(authorization) == false) {
            return response.status(401).send({
                cod: 1,
                status: false,
                msg: 'Token inválido'
            });
        }

        var funcionario = new Funcionario();
        const resultado = await funcionario.media_salario();
        const payloadRecuperado=meutoken.getPayload();
        const  novoToken=meutoken.gerarToken(payloadRecuperado);
        const objResposta = {
            cod: 1,
            status: true,
            msg: 'Executado com sucesso',
            funcionario: resultado,
            token: novoToken
        };
        response.status(200).send(objResposta);
    }
      
};
