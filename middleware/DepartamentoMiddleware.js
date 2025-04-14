// Importa o modelo Cargo para verificar se o nome já existe no banco de dados.
const Departamento = require('../model/Departamento');
// Exporta a classe CargoMiddleware, que contém funções de validação para as requisições.
module.exports = class FuncionarioMiddleware {
// Método para validar o nome do cargo antes de prosseguir com a criação ou atualização.







async validar_NomeDepartamento2(request, response, next) {
    const nome = request.body.departamento.nome;
    const id_d=request.params.id_d;
    const objDepartamento = new Departamento();
    objDepartamento.nome = nome;
    objDepartamento.id_d = id_d;

    const nomeExiste = await objDepartamento.isNome2();

    if (nomeExiste== true) {
        // Define uma flag para pular o próximo middleware
        request.skipValidarNomeDepartamento = true;
    }
    
    // Continua para o próximo middleware ou controlador
    next();
}



async validar_NomeDepartamento(request, response, next) {

    if (request.skipValidarNomeDepartamento==true) {

        return next();
    }
    // Recupera o nome do cargo enviado no corpo da requisição (request body).
    const nome = request.body.departamento.nome;
    // Cria uma nova instância do modelo Cargo.
    const objDepartamento = new Departamento();
    // Define o nome do cargo na instância do modelo.
    objDepartamento.nome = nome;
    // Verifica se o cargo já existe no banco de dados chamando o método isCargo().
    const nomeExiste = await objDepartamento.isNome();
    // Se o cargo já existir no banco de dados, cria um objeto de resposta com o status falso e uma mensagem de erro.
    if (nomeExiste == true) {
    const objResposta = {
    status: false,
    msg: "Não é possível cadastrar um departamento com o mesmo nome ja cadastrado em outro"
    }
    // Envia a resposta com status HTTP 200 e a mensagem de erro.
    response.status(200).send(objResposta);
    } else {
    // Caso o nome do cargo seja único, chama o próximo middleware ou rota.
    next(); // Chama o próximo middleware ou rota
    }
    }


// Método assíncrono para verificar se já existe um cargo com o mesmo nome cadastrado.





 
    }