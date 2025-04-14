// Importa o modelo Cargo para verificar se o nome já existe no banco de dados.
const Funcionario = require('../model/Funcionario');
// Exporta a classe CargoMiddleware, que contém funções de validação para as requisições.
module.exports = class FuncionarioMiddleware {
// Método para validar o nome do cargo antes de prosseguir com a criação ou atualização.
validar_NomeFuncionario(request, response, next) {
// Recupera o nome do cargo enviado no corpo da requisição (request body).
const nome = request.body.funcionario.nome;

// Verifica se o nome do cargo tem menos de 3 caracteres.
if (nome.length < 3) {
// Se o nome for inválido, cria um objeto de resposta com o status falso e a mensagem de erro.
const objResposta = {
status: false,
msg: "O nome deve ter mais do que 3 letras"
}
// Envia a resposta com status HTTP 200 e a mensagem de erro.
response.status(200).send(objResposta);
} else {
// Caso o nome seja válido, chama o próximo middleware ou a rota definida.
next(); // Chama o próximo middleware ou rota
}
}






async validar_EmailFuncionario2(request, response, next) {
    const email = request.body.funcionario.email;
    const id_func=request.params.id_func;
    const objFuncionario = new Funcionario();
    objFuncionario.email = email;
    objFuncionario.id_func = id_func;

    const emailExiste = await objFuncionario.isEmail2();

    if (emailExiste== true) {
        // Define uma flag para pular o próximo middleware
        request.skipValidarEmailFuncionario = true;
    }
    
    // Continua para o próximo middleware ou controlador
    next();
}



async validar_EmailFuncionario(request, response, next) {

    if (request.skipValidarEmailFuncionario==true) {

        return next();
    }
    // Recupera o nome do cargo enviado no corpo da requisição (request body).
    const email = request.body.funcionario.email;
    // Cria uma nova instância do modelo Cargo.
    const objFuncionario = new Funcionario();
    // Define o nome do cargo na instância do modelo.
    objFuncionario.email = email;
    // Verifica se o cargo já existe no banco de dados chamando o método isCargo().
    const emailExiste = await objFuncionario.isEmail();
    // Se o cargo já existir no banco de dados, cria um objeto de resposta com o status falso e uma mensagem de erro.
    if (emailExiste == true) {
    const objResposta = {
    status: false,
    msg: "Não é possível cadastrar um funcionario com o mesmo email ja cadastrado em outro"
    }
    // Envia a resposta com status HTTP 200 e a mensagem de erro.
    response.status(200).send(objResposta);
    } else {
    // Caso o nome do cargo seja único, chama o próximo middleware ou rota.
    next(); // Chama o próximo middleware ou rota
    }
    }








    async validar_Id_supervisor(request, response, next) {

        
        // Recupera o nome do cargo enviado no corpo da requisição (request body).
        const id_supervisor = request.body.funcionario.id_supervisor;
        if (id_supervisor==null) {
    
            return next();
        }
        // Cria uma nova instância do modelo Cargo.
        const objFuncionario = new Funcionario();
        // Define o nome do cargo na instância do modelo.
        objFuncionario.id_supervisor = id_supervisor;
        // Verifica se o cargo já existe no banco de dados chamando o método isCargo().
        const id_supervisorExiste = await objFuncionario.isId_supervisor();
        // Se o cargo já existir no banco de dados, cria um objeto de resposta com o status falso e uma mensagem de erro.
        if (id_supervisorExiste == false) {
        const objResposta = {
        status: false,
        msg: "Não é possível cadastrar um funcionario com um supervisor nao existente"
        }
        // Envia a resposta com status HTTP 200 e a mensagem de erro.
        response.status(200).send(objResposta);
        } else {
        // Caso o nome do cargo seja único, chama o próximo middleware ou rota.
        next(); // Chama o próximo middleware ou rota
        }
        }


// Método assíncrono para verificar se já existe um cargo com o mesmo nome cadastrado.
async existe_Id_departamento(request, response, next) {
    // Recupera o nome do cargo enviado no corpo da requisição (request body).
    const Id_departamento = request.body.funcionario.id_departamento;
    // Cria uma nova instância do modelo Cargo.
    const objFuncionario = new Funcionario();
    // Define o nome do cargo na instância do modelo.
    objFuncionario.id_departamento = Id_departamento;
    // Verifica se o cargo já existe no banco de dados chamando o método isCargo().
    const departamentoExiste = await objFuncionario.isId_departamento();
    // Se o cargo já existir no banco de dados, cria um objeto de resposta com o status falso e uma mensagem de erro.
    if (departamentoExiste == false) {
    const objResposta = {
    status: false,
    msg: "Não é possível cadastrar um funcionario sem um departamento existente"
    }
    // Envia a resposta com status HTTP 200 e a mensagem de erro.
    response.status(200).send(objResposta);
    } else {
    // Caso o nome do cargo seja único, chama o próximo middleware ou rota.
    next(); // Chama o próximo middleware ou rota
    }
    }




 
    }