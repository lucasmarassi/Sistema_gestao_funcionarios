// Importa o modelo Cargo para verificar se o nome já existe no banco de dados.
const Historico_cargos = require('../model/Historico_cargos');
// Exporta a classe CargoMiddleware, que contém funções de validação para as requisições.
module.exports = class Historico_cargosMiddleware {
// Método para validar o nome do cargo antes de prosseguir com a criação ou atualização.


// Método assíncrono para verificar se já existe um cargo com o mesmo nome cadastrado.
async existe_Cargo(request, response, next) {
    // Recupera o nome do cargo enviado no corpo da requisição (request body).
    const Cargo_novo = request.body.historico_cargos.cargo_novo;
    // Cria uma nova instância do modelo Cargo.
    const objHistorico_cargos = new Historico_cargos();
    // Define o nome do cargo na instância do modelo.
    objHistorico_cargos.cargo_novo = Cargo_novo;
    // Verifica se o cargo já existe no banco de dados chamando o método isCargo().
    const CargoExiste = await objHistorico_cargos.isCargo_novo();
    // Se o cargo já existir no banco de dados, cria um objeto de resposta com o status falso e uma mensagem de erro.
    if (CargoExiste == false) {
    const objResposta = {
    status: false,
    msg: "Não é possível cadastrar um historico_cargos sem um cargo existente"
    }
    // Envia a resposta com status HTTP 200 e a mensagem de erro.
    response.status(200).send(objResposta);
    } else {
    // Caso o nome do cargo seja único, chama o próximo middleware ou rota.
    next(); // Chama o próximo middleware ou rota
    }
    }

    async existe_Id_funcionario(request, response, next) {
        // Recupera o nome do cargo enviado no corpo da requisição (request body).
        const Id_funcionario = request.body.historico_cargos.id_funcionario;
        // Cria uma nova instância do modelo Cargo.
        const objHistorico_cargos = new Historico_cargos();
        // Define o nome do cargo na instância do modelo.
        objHistorico_cargos.id_funcionario = Id_funcionario;
        // Verifica se o cargo já existe no banco de dados chamando o método isCargo().
        const Id_funcionarioExiste = await objHistorico_cargos.isId_funcionario();
        // Se o cargo já existir no banco de dados, cria um objeto de resposta com o status falso e uma mensagem de erro.
        if (Id_funcionarioExiste == false) {
        const objResposta = {
        status: false,
        msg: "Não é possível cadastrar um historico_cargos sem um funcionario existente"
        }
        // Envia a resposta com status HTTP 200 e a mensagem de erro.
        response.status(200).send(objResposta);
        } else {
        // Caso o nome do cargo seja único, chama o próximo middleware ou rota.
        next(); // Chama o próximo middleware ou rota
        }
        }


    

 
    }