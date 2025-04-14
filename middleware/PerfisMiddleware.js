// Importa o modelo Cargo para verificar se o nome já existe no banco de dados.
const Perfis = require('../model/Perfis');
// Exporta a classe CargoMiddleware, que contém funções de validação para as requisições.
module.exports = class PerfisMiddleware {
// Método para validar o nome do cargo antes de prosseguir com a criação ou atualização.






// Método assíncrono para verificar se já existe um cargo com o mesmo nome cadastrado.
async existe_Id_funcionario(request, response, next) {
    // Recupera o nome do cargo enviado no corpo da requisição (request body).
    const Id_funcionario = request.body.perfis.id_funcionario;
    // Cria uma nova instância do modelo Cargo.
    const objPerfis = new Perfis();
    // Define o nome do cargo na instância do modelo.
    objPerfis.id_funcionario = Id_funcionario;
    // Verifica se o cargo já existe no banco de dados chamando o método isCargo().
    const funcionarioExiste = await objPerfis.existe_Id_funcionario();
    // Se o cargo já existir no banco de dados, cria um objeto de resposta com o status falso e uma mensagem de erro.
    if (funcionarioExiste == false) {
    const objResposta = {
    status: false,
    msg: "Não é possível  sem um funcionario ou sem um departamento existente"
    }
    // Envia a resposta com status HTTP 200 e a mensagem de erro.
    response.status(200).send(objResposta);
    } else {
    // Caso o nome do cargo seja único, chama o próximo middleware ou rota.
    next(); // Chama o próximo middleware ou rota
    }
    }





    validar_TelefonePerfis(request, response, next) {
        const telefone = request.body.perfis.telefone;
    
        // Remove qualquer caractere que não seja número
        const telefoneLimpo = String(telefone).replace(/\D/g, '');
    
        if (telefoneLimpo.length !== 11) {
            const objResposta = {
                status: false,
                msg: "O telefone deve conter exatamente 11 dígitos numéricos."
            };
            response.status(200).send(objResposta);
        } else {
            next(); // Chama o próximo middleware ou rota
        }
    }
    



    async validar_IdadePerfis(request, response, next) {
        // Recupera o nome do cargo enviado no corpo da requisição (request body).
            const idade = request.body.perfis.idade;
        
            // Verifica se o nome do cargo tem menos de 3 caracteres.
            if (idade<=0 || idade>=100) {
            // Se o nome for inválido, cria um objeto de resposta com o status falso e a mensagem de erro.
            const objResposta = {
            status: false,
            msg: "O idade deve estar entre 1 e 100"
            }
            // Envia a resposta com status HTTP 200 e a mensagem de erro.
            response.status(200).send(objResposta);
            } else {
            // Caso o nome seja válido, chama o próximo middleware ou a rota definida.
            next(); // Chama o próximo middleware ou rota
            }
        }
        






        async validar_IdFuncionario2(request, response, next) {
            const id_funcionario = request.body.perfis.id_funcionario;
            const id_perfil=request.params.id_perfil;
            const objPerfis = new Perfis();
            objPerfis.id_funcionario = id_funcionario;
            objPerfis.id_perfil = id_perfil;
        
            const id_funcionarioExiste = await objPerfis.validar_IdFuncionario2();
        
            if (id_funcionarioExiste=== true) {
                // Define uma flag para pular o próximo middleware
                request.skipValidarIdFuncionario = true;
            }
            
            // Continua para o próximo middleware ou controlador
            next();
        }
        
        
        
        async validar_IdFuncionario(request, response, next) {
        
            if (request.skipValidarIdFuncionario === true) {
        
                return next();
            }
            // Recupera o nome do cargo enviado no corpo da requisição (request body).
            const id_funcionario = request.body.perfis.id_funcionario;
            // Cria uma nova instância do modelo Cargo.
            const objPerfis = new Perfis();
            // Define o nome do cargo na instância do modelo.
            objPerfis.id_funcionario = id_funcionario;
            // Verifica se o cargo já existe no banco de dados chamando o método isCargo().
            const id_funcionarioExiste = await objPerfis.validar_IdFuncionario();
            // Se o cargo já existir no banco de dados, cria um objeto de resposta com o status falso e uma mensagem de erro.
            if (id_funcionarioExiste == true) {
            const objResposta = {
            status: false,
            msg: "Não é possível cadastrar um perfil com o mesmo id funcionario ja cadastrado em outro"
            }
            // Envia a resposta com status HTTP 200 e a mensagem de erro.
            response.status(200).send(objResposta);
            } else {
            // Caso o nome do cargo seja único, chama o próximo middleware ou rota.
            next(); // Chama o próximo middleware ou rota
            }
            }




 
    }