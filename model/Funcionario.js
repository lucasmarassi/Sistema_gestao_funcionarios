// Importa o módulo Banco para realizar conexões com o banco de dados.
const Banco = require('./Banco');

// Define a classe Cargo para representar a entidade Cargo.
class Funcionario {
    // Construtor da classe Cargo que inicializa as propriedades.
    constructor() {
        this._id_func = null; // ID do cargo, inicialmente nulo.
        this._nome = ''; // Nome do cargo, inicialmente uma string vazia.
        this._email = '';
        this._cpf = '';
        this._cargo = '';
        this._salario = '';
        this._data_contratacao = '';
        this._id_departamento = '';
        this._id_supervisor= '';
        this._senha = '';
    }

    // Método assíncrono para criar um novo cargo no banco de dados.
   // Método assíncrono para criar um novo aluno no banco de dados.
async create() {
    const banco = new Banco(); // Cria uma nova instância da classe Banco
    const conexao = banco.getConexao(); // Obtém a conexão com o banco de dados

    const SQL = 'INSERT INTO funcionario (nome, email,cpf,cargo,salario,data_contratacao,id_departamento,id_supervisor, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);';

    try {
        // Passa os valores como um array no segundo argumento.
        const [result] = await conexao.promise().execute(SQL, [this._nome, this._email,this._cpf, this._cargo,this._salario,this._data_contratacao, this._id_departamento,this._id_supervisor, this._senha]);
        
        this._id_func = result.insertId; // Armazena o ID gerado pelo banco de dados
        return result.affectedRows > 0; // Retorna true se a inserção afetou alguma linha
    } catch (error) {
        console.error('Erro ao criar o funcionario:', error); // Exibe erro no console se houver falha
        return false; // Retorna false caso ocorra um erro
    }
}

    // Método assíncrono para excluir um cargo do banco de dados.
    async delete() {
        const banco = new Banco(); // Cria uma nova instância da classe Banco
        banco.conectar(); // Estabelece a conexão com o banco de dados
        const conexao = banco.getConexao(); // Obtém a conexão com o banco de dados

        const SQL = 'DELETE FROM funcionario WHERE id_func = ?;'; // Query SQL para deletar um cargo pelo ID.
        try {
            const [result] = await conexao.promise().execute(SQL, [this._id_func]); // Executa a query de exclusão.
            return result.affectedRows > 0; // Retorna true se alguma linha foi afetada (cargo deletado).
        } catch (error) {
            console.error('Erro ao excluir o funcionario:', error); // Exibe erro no console se houver falha.
            return false; // Retorna false caso ocorra um erro.
        }
    }

    // Método assíncrono para atualizar os dados de um cargo no banco de dados.
    async update() {
        const banco = new Banco(); // Cria uma nova instância da classe Banco
        banco.conectar(); // Estabelece a conexão com o banco de dados
        const conexao = banco.getConexao(); // Obtém a conexão com o banco de dados

        const SQL = 'UPDATE funcionario SET nome = ?, email= ?, cpf= ?, cargo=?, salario=?, data_contratacao=?, id_departamento=?, id_supervisor=?, senha=?  WHERE id_func = ?;'; // Query SQL para atualizar o nome de um cargo.
        try {
            const [result] = await conexao.promise().execute(SQL, [this._nome,this._email,this._cpf, this._cargo, this._salario, this._data_contratacao,this._id_departamento,this._id_supervisor,this._senha, this._id_func]); // Executa a query de atualização.
            return result.affectedRows > 0; // Retorna true se a atualização afetou alguma linha.
        } catch (error) {
            console.error('Erro ao atualizar o funcionario:', error); // Exibe erro no console se houver falha.
            return false; // Retorna false caso ocorra um erro.
        }
    }

    // Método assíncrono para verificar se um cargo já existe no banco de dados.
    async isEmail() {
        const banco = new Banco(); // Cria uma nova instância da classe Banco
        banco.conectar(); // Estabelece a conexão com o banco de dados
        const conexao = banco.getConexao(); // Obtém a conexão com o banco de dados

        const SQL = 'SELECT COUNT(*) AS qtd FROM funcionario WHERE email = ?;'; // Query SQL para contar cargos com o mesmo nome.
        try {
            const [rows] = await conexao.promise().execute(SQL, [this._email]); // Executa a query.
            return rows[0].qtd > 0; // Retorna true se houver algum cargo com o mesmo nome.
        } catch (error) {
            console.error('Erro ao verificar o email:', error); // Exibe erro no console se houver falha.
            return false; // Retorna false caso ocorra um erro.
        }
    }





    async isId_supervisor() {
        const banco = new Banco(); // Cria uma nova instância da classe Banco
        banco.conectar(); // Estabelece a conexão com o banco de dados
        const conexao = banco.getConexao(); // Obtém a conexão com o banco de dados

        const SQL = 'SELECT COUNT(*) AS qtd FROM funcionario WHERE id_func = ?;'; // Query SQL para contar cargos com o mesmo nome.
        try {
            const [rows] = await conexao.promise().execute(SQL, [this._id_supervisor]); // Executa a query.
            return rows[0].qtd > 0; // Retorna true se houver algum cargo com o mesmo nome.
        } catch (error) {
            console.error('Erro ao verificar o id_supervisor:', error); // Exibe erro no console se houver falha.
            return false; // Retorna false caso ocorra um erro.
        }
    }

    async isId_departamento() {
        const banco = new Banco(); // Cria uma nova instância da classe Banco
        banco.conectar(); // Estabelece a conexão com o banco de dados
        const conexao = banco.getConexao(); // Obtém a conexão com o banco de dados

        const SQL = 'SELECT COUNT(*) AS qtd FROM departamento WHERE id_d = ?;'; // Query SQL para contar cargos com o mesmo nome.
        try {
            const [rows] = await conexao.promise().execute(SQL, [this._id_departamento]); // Executa a query.
            return rows[0].qtd > 0; // Retorna true se houver algum cargo com o mesmo nome.
        } catch (error) {
            console.error('Erro ao verificar o id_departamento:', error); // Exibe erro no console se houver falha.
            return false; // Retorna false caso ocorra um erro.
        }
    }


   
    
    async isEmail2() {
        const banco = new Banco(); // Cria uma nova instância da classe Banco
        banco.conectar(); // Estabelece a conexão com o banco de dados
        const conexao = banco.getConexao(); // Obtém a conexão com o banco de dados

        const SQL = 'SELECT COUNT(*) AS qtd FROM funcionario WHERE email = ? AND id_func=?;';
        // Query SQL para contar cargos com o mesmo nome.
        try {
            const [rows] = await conexao.promise().execute(SQL, [this._email, this._id_func]); // Executa a query.
            return rows[0].qtd > 0;
             // Retorna true se houver algum cargo com o mesmo nome.
        } catch (error) {
            console.error('Erro ao verificar o email:', error); // Exibe erro no console se houver falha.
            return false; // Retorna false caso ocorra um erro.
        }
    }



    async login() {
        const banco = new Banco(); // Cria uma nova instância da classe Banco
        banco.conectar(); // Estabelece a conexão com o banco de dados
        const conexao = banco.getConexao(); // Obtém a conexão com o banco de dados

        const SQL = 'SELECT COUNT(*) AS qtd FROM funcionario WHERE email = ? AND senha = ?;'; // Query SQL para contar cargos com o mesmo nome.
        try {
            const [rows] = await conexao.promise().execute(SQL, [this._email,this._senha]); // Executa a query.
            return rows[0].qtd > 0; // Retorna true se houver algum cargo com o mesmo nome.
        } catch (error) {
            console.error('Erro ao verificar ao logar:', error); // Exibe erro no console se houver falha.
            return false; // Retorna false caso ocorra um erro.
        }
    }



    // Método assíncrono para ler todos os cargos do banco de dados.
    async readAll() {
        const banco = new Banco(); // Cria uma nova instância da classe Banco
        banco.conectar(); // Estabelece a conexão com o banco de dados
        const conexao = banco.getConexao(); // Obtém a conexão com o banco de dados

        const SQL = 'SELECT id_func, nome, email, cpf, cargo, salario, data_contratacao, id_departamento, id_supervisor FROM funcionario ORDER BY nome;'; // Query SQL para selecionar todos os cargos ordenados pelo nome.
        try {
            const [rows] = await conexao.promise().execute(SQL); // Executa a query de seleção.
            
            return rows; // Retorna a lista de cargos.
        } catch (error) {
            console.error('Erro ao ler funcionarios:', error); // Exibe erro no console se houver falha.
            return []; // Retorna uma lista vazia caso ocorra um erro.
        }
    }

    // Método assíncrono para ler um cargo pelo seu ID.
    async readByID() {
        const banco = new Banco(); // Cria uma nova instância da classe Banco
        banco.conectar(); // Estabelece a conexão com o banco de dados
        const conexao = banco.getConexao(); // Obtém a conexão com o banco de dados
       
        const SQL = 'SELECT * FROM funcionario WHERE id_func = ?;'; // Query SQL para selecionar um cargo pelo ID.
        try {
            const [rows] = await conexao.promise().execute(SQL, [this._id_func]); // Executa a query de seleção.
            return rows; // Retorna o cargo correspondente ao ID.
        } catch (error) {
            console.error('Erro ao ler funcionario pelo ID:', error); // Exibe erro no console se houver falha.
            return null; // Retorna null caso ocorra um erro.
        }
    }



    async resumoEstatistico() {
        const banco = new Banco(); // Cria uma nova instância da classe Banco
        banco.conectar(); // Estabelece a conexão com o banco de dados
        const conexao = banco.getConexao();
        const sql = `
          SELECT 
            COUNT(*) AS total_funcionarios,
            AVG(salario) AS media_salarial,
            MAX(salario) AS maior_salario,
            MIN(salario) AS menor_salario
          FROM funcionario
        `;
        const [linhas] = await conexao.promise().execute(sql);

        return linhas[0]; // retorna um objeto com os valores
      }




      async media_salario() {
        const banco = new Banco();
        banco.conectar();
        const conexao = banco.getConexao();
    
        const SQL = `
          SELECT 
            d.nome AS departamento,
            AVG(f.salario) AS media_salario
          FROM funcionario f
          
          JOIN departamento d ON f.id_departamento = d.id_d
          GROUP BY d.nome;
        `;
    
        try {
            const [rows] = await conexao.promise().execute(SQL);
            return rows;
        } catch (error) {
            console.error('Erro ao ler perfis:', error);
            return [];
        }
    }
      

    // Getter para obter o valor de idCargo.
    get id_func() {
        return this._id_func;
    }

    // Setter para definir o valor de idCargo.
    set id_func(id_func) {
        this._id_func = id_func;
    }

    // Getter para obter o valor de nomeCargo.
    get nome() {
        return this._nome;
    }

    // Setter para definir o valor de nomeCargo.
    set nome(nome) {
        this._nome = nome;
    }


    get email() {
        return this._email;
    }

    // Setter para definir o valor de nomeCargo.
    set email(email) {
        this._email = email;
    }


    get cpf() {
        return this._cpf;
    }

    // Setter para definir o valor de nomeCargo.
    set cpf(cpf) {
        this._cpf = cpf;
    }

    get cargo() {
        return this._cargo;
    }

    // Setter para definir o valor de nomeCargo.
    set cargo(cargo) {
        this._cargo = cargo;
    }

    get salario() {
        return this._salario;
    }

    // Setter para definir o valor de nomeCargo.
    set salario(salario) {
        this._salario = salario;
    }

    get data_contratacao() {
        return this._data_contratacao;
    }

    // Setter para definir o valor de nomeCargo.
    set data_contratacao(data_contratacao) {
        this._data_contratacao = data_contratacao;
    }


    get id_departamento() {
        return this._id_departamento;
    }

    // Setter para definir o valor de nomeCargo.
    set id_departamento(id_departamento) {
        this._id_departamento = id_departamento;
    }

    get id_supervisor() {
        return this._id_supervisor;
    }

    // Setter para definir o valor de nomeCargo.
    set id_supervisor(id_supervisor) {
        this._id_supervisor = id_supervisor;
    }


    get senha() {
        return this._senha;
    }

    // Setter para definir o valor de nomeCargo.
    set senha(senha) {
        this._senha = senha;
    }
}

// Exporta a classe Cargo para que possa ser utilizada em outros módulos.
module.exports = Funcionario;
