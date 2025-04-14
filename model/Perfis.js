// Importa o módulo Banco para realizar conexões com o banco de dados.
const Banco = require('./Banco');

// Define a classe Cargo para representar a entidade Cargo.
class Perfis {
    // Construtor da classe Cargo que inicializa as propriedades.
    constructor() {
        this._id_perfil = null;
        this._id_funcionario = ''; // ID do cargo, inicialmente nulo.
        this._idade = ''; // Nome do cargo, inicialmente uma string vazia.
        this._endereco = '';
        this._telefone = '';
        this._genero = '';
        this._estado_civil = '';

    }

    // Método assíncrono para criar um novo cargo no banco de dados.
   // Método assíncrono para criar um novo aluno no banco de dados.
   async create() {
    const banco = new Banco();
    const conexao = banco.getConexao();

    const SQL = `
        INSERT INTO perfis (id_funcionario, idade, endereco, telefone, genero, estado_civil)
        VALUES (?, ?, ?, ?, ?, ?);
    `;

    try {
        const [result] = await conexao.promise().execute(SQL, [
            this._id_funcionario,
            this._idade,
            this._endereco,
            this._telefone,
            this._genero,
            this._estado_civil
        ]);

        this._id_perfil = result.insertId; // ID do novo perfil inserido
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao criar o perfil:', error);
        return false;
    }
}

    // Método assíncrono para excluir um cargo do banco de dados.
    async delete() {
        const banco = new Banco(); // Cria uma nova instância da classe Banco
        banco.conectar(); // Estabelece a conexão com o banco de dados
        const conexao = banco.getConexao(); // Obtém a conexão com o banco de dados

        const SQL = 'DELETE FROM perfis WHERE id_funcionario = ?;'; // Query SQL para deletar um cargo pelo ID.
        try {
            const [result] = await conexao.promise().execute(SQL, [this._id_funcionario]); // Executa a query de exclusão.
            return result.affectedRows > 0; // Retorna true se alguma linha foi afetada (cargo deletado).
        } catch (error) {
            console.error('Erro ao excluir o perfil:', error); // Exibe erro no console se houver falha.
            return false; // Retorna false caso ocorra um erro.
        }
    }

    // Método assíncrono para atualizar os dados de um cargo no banco de dados.
    async update() {
        const banco = new Banco();
        banco.conectar();
        const conexao = banco.getConexao();
    
        const SQL = `
            UPDATE perfis
            SET idade = ?, endereco = ?, telefone = ?, genero = ?, estado_civil = ?
            WHERE id_funcionario = ?;
        `;
    
        try {
            const [result] = await conexao.promise().execute(SQL, [
                
                this._idade,
                this._endereco,
                this._telefone,
                this._genero,
                this._estado_civil,
                this._id_funcionario
            ]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao atualizar o perfil:', error);
            return false;
        }
    }

    // Método assíncrono para verificar se um cargo já existe no banco de dados.
   

    async validar_IdFuncionario2() {
        const banco = new Banco(); // Cria uma nova instância da classe Banco
        banco.conectar(); // Estabelece a conexão com o banco de dados
        const conexao = banco.getConexao(); // Obtém a conexão com o banco de dados

        const SQL = 'SELECT COUNT(*) AS qtd FROM perfis WHERE id_perfil = ? AND id_funcionario=?;';
        // Query SQL para contar cargos com o mesmo nome.
        try {
            const [rows] = await conexao.promise().execute(SQL, [this._id_perfil, this._id_funcionario]); // Executa a query.
            return rows[0].qtd > 0;
             // Retorna true se houver algum cargo com o mesmo nome.
        } catch (error) {
            console.error('Este id_funcionario nao é o mesmo de antes:', error); // Exibe erro no console se houver falha.
            return false; // Retorna false caso ocorra um erro.
        }
    }

    async validar_IdFuncionario() {
        const banco = new Banco(); // Cria uma nova instância da classe Banco
        banco.conectar(); // Estabelece a conexão com o banco de dados
        const conexao = banco.getConexao(); // Obtém a conexão com o banco de dados

        const SQL = 'SELECT COUNT(*) AS qtd FROM perfis WHERE id_funcionario = ?;'; // Query SQL para contar cargos com o mesmo nome.
        try {
            const [rows] = await conexao.promise().execute(SQL, [this._id_funcionario]); // Executa a query.
            return rows[0].qtd > 0; // Retorna true se houver algum cargo com o mesmo nome.
        } catch (error) {
            console.error('id_funcionario ja existente em um perfil:', error); // Exibe erro no console se houver falha.
            return false; // Retorna false caso ocorra um erro.
        }
    }


    async existe_Id_funcionario() {
        const banco = new Banco(); // Cria uma nova instância da classe Banco
        banco.conectar(); // Estabelece a conexão com o banco de dados
        const conexao = banco.getConexao(); // Obtém a conexão com o banco de dados

        const SQL = 'SELECT COUNT(*) AS qtd FROM funcionario WHERE id_func = ?;'; // Query SQL para contar cargos com o mesmo nome.
        try {
            const [rows] = await conexao.promise().execute(SQL, [this._id_funcionario]); // Executa a query.
            return rows[0].qtd > 0; // Retorna true se houver algum cargo com o mesmo nome.
        } catch (error) {
            console.error('Erro ao verificar o id_funcionario na tabela funcionario:', error); // Exibe erro no console se houver falha.
            return false; // Retorna false caso ocorra um erro.
        }
    }

   
 



    // Método assíncrono para ler todos os cargos do banco de dados.
    async readAll() {
        const banco = new Banco(); // Cria uma nova instância da classe Banco
        banco.conectar(); // Estabelece a conexão com o banco de dados
        const conexao = banco.getConexao(); // Obtém a conexão com o banco de dados

        const SQL = 'SELECT id_perfil,id_funcionario,idade,endereco,telefone,genero,estado_civil FROM perfis ORDER BY id_perfil;'; // Query SQL para selecionar todos os cargos ordenados pelo nome.
        try {
            const [rows] = await conexao.promise().execute(SQL); // Executa a query de seleção.
            
            return rows; // Retorna a lista de cargos.
        } catch (error) {
            console.error('Erro ao ler perfis:', error); // Exibe erro no console se houver falha.
            return []; // Retorna uma lista vazia caso ocorra um erro.
        }
    }

    // Método assíncrono para ler um cargo pelo seu ID.
    async readByID() {
        const banco = new Banco(); // Cria uma nova instância da classe Banco
        banco.conectar(); // Estabelece a conexão com o banco de dados
        const conexao = banco.getConexao(); // Obtém a conexão com o banco de dados
       
        const SQL = 'SELECT * FROM perfis WHERE id_funcionario = ?;'; // Query SQL para selecionar um cargo pelo ID.
        try {
            const [rows] = await conexao.promise().execute(SQL, [this._id_funcionario]); // Executa a query de seleção.
            return rows; // Retorna o cargo correspondente ao ID.
        } catch (error) {
            console.error('Erro ao ler perfil pelo ID:', error); // Exibe erro no console se houver falha.
            return null; // Retorna null caso ocorra um erro.
        }
    }



    async media_idade() {
        const banco = new Banco();
        banco.conectar();
        const conexao = banco.getConexao();
    
        const SQL = `
          SELECT 
            d.nome AS departamento,
            AVG(p.idade) AS media_idade
          FROM perfis p
          JOIN funcionario f ON p.id_funcionario = f.id_func
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
    

    get id_perfil() {
        return this._id_perfil;
    }
    
    set id_perfil(id_perfil) {
        this._id_perfil = id_perfil;
    }
    
    get id_funcionario() {
        return this._id_funcionario;
    }
    
    set id_funcionario(id_funcionario) {
        this._id_funcionario = id_funcionario;
    }
    
    get idade() {
        return this._idade;
    }
    
    set idade(idade) {
        this._idade = idade;
    }
    
    get endereco() {
        return this._endereco;
    }
    
    set endereco(endereco) {
        this._endereco = endereco;
    }
    
    get telefone() {
        return this._telefone;
    }
    
    set telefone(telefone) {
        this._telefone = telefone;
    }
    
    get genero() {
        return this._genero;
    }
    
    set genero(genero) {
        this._genero = genero;
    }
    
    get estado_civil() {
        return this._estado_civil;
    }
    
    set estado_civil(estado_civil) {
        this._estado_civil = estado_civil;
    }
    
}

// Exporta a classe Cargo para que possa ser utilizada em outros módulos.
module.exports = Perfis;
