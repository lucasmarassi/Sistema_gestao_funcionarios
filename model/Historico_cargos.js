// Importa o módulo Banco para realizar conexões com o banco de dados.
const Banco = require('./Banco');

// Define a classe Cargo para representar a entidade Cargo.
class Historico_cargos {
    // Construtor da classe Cargo que inicializa as propriedades.
    constructor() {
        this._id_h = null; // ID do cargo, inicialmente nulo.
        this._id_funcionario = ''; // Nome do cargo, inicialmente uma string vazia.
        this._cargo_anterior = '';
        this._cargo_novo = '';
        this._data_alteracao = '';
        
    }

    // Método assíncrono para criar um novo cargo no banco de dados.
   // Método assíncrono para criar um novo aluno no banco de dados.
async create() {
    const banco = new Banco(); // Cria uma nova instância da classe Banco
    const conexao = banco.getConexao(); // Obtém a conexão com o banco de dados

    const SQL = 'INSERT INTO historico_cargos (id_funcionario,cargo_anterior,cargo_novo,data_alteracao) VALUES (?, ?, ?, ?);';

    try {
        // Passa os valores como um array no segundo argumento.
        const [result] = await conexao.promise().execute(SQL, [this._id_funcionario, this._cargo_anterior,this._cargo_novo, this._data_alteracao]);
        
        this._id_func = result.insertId; // Armazena o ID gerado pelo banco de dados
        return result.affectedRows > 0; // Retorna true se a inserção afetou alguma linha
    } catch (error) {
        console.error('Erro ao criar o Historico de cargos:', error); // Exibe erro no console se houver falha
        return false; // Retorna false caso ocorra um erro
    }
}

    

  





    
    async isCargo_novo() {
        const banco = new Banco(); // Cria uma nova instância da classe Banco
        banco.conectar(); // Estabelece a conexão com o banco de dados
        const conexao = banco.getConexao(); // Obtém a conexão com o banco de dados

        const SQL = 'SELECT COUNT(*) AS qtd FROM funcionario WHERE cargo = ?;'; // Query SQL para contar cargos com o mesmo nome.
        try {
            const [rows] = await conexao.promise().execute(SQL, [this._cargo_novo]); // Executa a query.
            return rows[0].qtd > 0; // Retorna true se houver algum cargo com o mesmo nome.
        } catch (error) {
            console.error('Erro nao existe cargo cadastrado na tabela funcionarios:', error); // Exibe erro no console se houver falha.
            return false; // Retorna false caso ocorra um erro.
        }
    }


    async isId_funcionario() {
        const banco = new Banco(); // Cria uma nova instância da classe Banco
        banco.conectar(); // Estabelece a conexão com o banco de dados
        const conexao = banco.getConexao(); // Obtém a conexão com o banco de dados

        const SQL = 'SELECT COUNT(*) AS qtd FROM funcionario WHERE id_func = ?;'; // Query SQL para contar cargos com o mesmo nome.
        try {
            const [rows] = await conexao.promise().execute(SQL, [this._id_funcionario]); // Executa a query.
            return rows[0].qtd > 0; // Retorna true se houver algum cargo com o mesmo nome.
        } catch (error) {
            console.error('Erro nao existe esse id funcionario cadastrado na tabela funcionarios:', error); // Exibe erro no console se houver falha.
            return false; // Retorna false caso ocorra um erro.
        }
    }




    // Método assíncrono para ler todos os cargos do banco de dados.
    async readAll() {
        const banco = new Banco(); // Cria uma nova instância da classe Banco
        banco.conectar(); // Estabelece a conexão com o banco de dados
        const conexao = banco.getConexao(); // Obtém a conexão com o banco de dados

        const SQL = 'SELECT id_h, id_funcionario, cargo_anterior, cargo_novo,data_alteracao FROM historico_cargos ORDER BY id_funcionario;'; // Query SQL para selecionar todos os cargos ordenados pelo nome.
        try {
            const [rows] = await conexao.promise().execute(SQL); // Executa a query de seleção.
            
            return rows; // Retorna a lista de cargos.
        } catch (error) {
            console.error('Erro ao ler Historico de cargos:', error); // Exibe erro no console se houver falha.
            return []; // Retorna uma lista vazia caso ocorra um erro.
        }
    }

    // Método assíncrono para ler um cargo pelo seu ID.
    async readByID() {
        const banco = new Banco(); // Cria uma nova instância da classe Banco
        banco.conectar(); // Estabelece a conexão com o banco de dados
        const conexao = banco.getConexao(); // Obtém a conexão com o banco de dados
       
        const SQL = 'SELECT * FROM historico_cargos WHERE id_funcionario = ?;'; // Query SQL para selecionar um cargo pelo ID.
        try {
            const [rows] = await conexao.promise().execute(SQL, [this._id_funcionario]); // Executa a query de seleção.
            return rows; // Retorna o cargo correspondente ao ID.
        } catch (error) {
            console.error('Erro ao ler historico_cargos pelo ID do funcionario:', error); // Exibe erro no console se houver falha.
            return null; // Retorna null caso ocorra um erro.
        }
    }

    // Getter para obter o valor de idCargo.
     // Métodos de acesso

     get id_h() {
        return this._id_h;
    }

    set id_h(id_h) {
        this._id_h = id_h;
    }

    get id_funcionario() {
        return this._id_funcionario;
    }

    set id_funcionario(id_funcionario) {
        this._id_funcionario = id_funcionario;
    }

    get cargo_anterior() {
        return this._cargo_anterior;
    }

    set cargo_anterior(cargo_anterior) {
        this._cargo_anterior = cargo_anterior;
    }

    get cargo_novo() {
        return this._cargo_novo;
    }

    set cargo_novo(cargo_novo) {
        this._cargo_novo = cargo_novo;
    }

    get data_alteracao() {
        return this._data_alteracao;
    }

    set data_alteracao(data_alteracao) {
        this._data_alteracao = data_alteracao;
    }
}

// Exporta a classe Cargo para que possa ser utilizada em outros módulos.
module.exports = Historico_cargos;
