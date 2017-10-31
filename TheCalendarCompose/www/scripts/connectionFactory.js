//db variavel global que é ultilizada para acessar a conexão com o banco de dados criado pela função connectioFactory
var db;

//  ConnectionFactory: esta função cria a conexão com o banco SQLITE do dispositivo, ele mantem a mesma em uma variavel global chamada db.
function connectionFactory() {
    db = window.openDatabase("DataBase", "1.0", "TheCalendar", 2000000);
    db.transaction(populateDB, errorDB, sucessDB);  
}

// populateDB: esta função é chamada pela connectionFactory. Ela cria as tabelas e realiza alguns inserts
function populateDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS tb_pessoa( id_pessoa INTEGER PRIMARY KEY AUTOINCREMENT, nomeUsuario TEXT NOT NULL, senha TEXT NOT NULL, nome_pessoa TEXT NOT NULL, nascimento DATETIME NOT NULL, sexo TEXT NOT NULL, email TEXT, celular TEXT, endereco_rua TEXT, endereco_cidade TEXT, endereco_cep INTEGER, endereco_estado TEXT, data_cadastro DATETIME DEFALT CURRENT_TIMESTAMP)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS tb_foto_pessoa(id_foto_pessoa INTEGER PRIMARY KEY AUTOINCREMENT, fk_id_pessoa INTEGER, imagem_pessoa BLOB, FOREIGN KEY (fk_id_pessoa) REFERENCES tb_pessoa (id_pessoa))');
    tx.executeSql('CREATE TABLE IF NOT EXISTS tb_servicos(id_servico INTEGER PRIMARY KEY AUTOINCREMENT, fk_id_pessoa_prestador INTEGER, nome_servico TEXT NOT NULL, descricao_servico TEXT NOT NULL, valor_servico REAL, servico_ativo REAL, categoria TEXT, FOREIGN KEY (fk_id_pessoa_prestador) REFERENCES tb_pessoa (id_pessoa))');
    tx.executeSql('CREATE TABLE IF NOT EXISTS tb_foto_servico(id_foto_servico INTEGER PRIMARY KEY AUTOINCREMENT, fk_id_servico INTEGER NOT NULL, imagem_servico BLOB, FOREIGN KEY (fk_id_servico) REFERENCES tb_servicos (id_servico))');
    tx.executeSql('CREATE TABLE IF NOT EXISTS tb_agendamentos(id_agendamento INTEGER PRIMARY KEY AUTOINCREMENT, fk_id_servico INTEGER NOT NULL, fk_id_pessoa_consumidor INTEGER NOT NULL, horario_dia_agendamento DATETIME, local_agendamento TEXT, valor_agendamento REAL, doc_consumidor TEXT, FOREIGN KEY (fk_id_pessoa_consumidor) REFERENCES tb_pessoa(id_pessoa), FOREIGN KEY (fk_id_servico) REFERENCES tb_servicos (id_servico) )');
    tx.executeSql("INSERT INTO tb_pessoa (nomeUsuario, senha, nome_pessoa, nascimento, sexo, email, celular, endereco_rua, endereco_cidade, endereco_cep, endereco_estado) VALUES ('mc','he',' Maculino ',' 1999-02-24 ',' Matheus Guilherme de Araujo Vicente ',' mvicente@outlook.com.br ',' (11) 5121-3599 ',' Irmão nicolau da fonseca ',' São Paulo ', 03590-170,' SP ')");
}

// errorDB: é chamada em qualquer função que realize um transição com o banco. ela somente é chamada quando a um erro na execução do comando, alertando qual foi o erro.
function errorDB(err) {
    alert("erro: " + err.code);
}

//sucessDB: é igual a errorDB, porém é chamada quando o comando sql é realizado com sucesso
function sucessDB(err) {
    alert("Sucesso ao executar query");
}

//inserirUsuario: função que recebe os dados do index.js e insere no banco de dados.
function inserirUsuario(novoUsuario) {
    alert(novoUsuario.nomeUsuario + " , " + novoUsuario.senha + " , " + novoUsuario.sexo + " , " + novoUsuario.aniversario + " , " + novoUsuario.NomeCompleto + " , " + novoUsuario.Email + " , " + novoUsuario.telefone + " , " + novoUsuario.RuaUsuario + " , " + novoUsuario.UF + " , " + novoUsuario.Cidade + " , " + novoUsuario.Cep);
    db.transaction(function DBnoUsuario(tx) {
        tx.executeSql('INSERT INTO tb_pessoa (nomeUsuario, senha, nome_pessoa, nascimento, sexo, email, celular, endereco_rua, endereco_cidade, endereco_cep, endereco_estado) VALUES (?,?,?,?,?,?,?,?,?,?,? )', [novoUsuario.nomeUsuario, novoUsuario.senha, novoUsuario.sexo, novoUsuario.aniversario, novoUsuario.NomeCompleto, novoUsuario.Email, novoUsuario.telefone, novoUsuario.RuaUsuario, novoUsuario.Cidade, novoUsuario.Cep, novoUsuario.UF]);
    }, errorDB, sucessDB);
 }

//show: pode ser ultilizado para recolher todos os registros da tabela indicada
function show() {
    db.transaction(function mostrarRegistros(tx) {
        tx.executeSql('SELECT * FROM tb_pessoa', [], select, errorDB);
    }, errorDB);
}

//select: realiza a leitura dos resultados de uma query SELECT, pode ser chamada por qualquer função que ultilize este comando do sql
function select(tx, results) {
    var len = results.rows.length;
    alert(len + " Linhas Encontradas");
    for (var i = 0; i < len; i++) {
        alert("ID: " + results.rows.item(i).id_pessoa + ";  Pesssoa: " + results.rows.item(i).nomeUsuario + ";  Senha: " + results.rows.item(i).senha + ";  email: " + results.rows.item(i).email + ";  Celular: " + results.rows.item(i).celular + ";  Rua: " + results.rows.item(i).endereco_rua + ";  Cidade: " + results.rows.item(i).endereco_cidade + ";  Estado: " + results.rows.item(i).endereco_estado + ";  CEP: " + results.rows.item(i).endereco_cep + ";  Data Cadastro: " + results.rows.item(i).data_cadastro);
    }
}

//login: ultilizado para realizar o login de um usuario no sistema.
function login(userLogin) {
    db.transaction(function dataLogin(tx) {
        tx.executeSql('SELECT * FROM tb_pessoa WHERE nomeUsuario = ? AND senha = ?', [userLogin.nomeUsuario, userLogin.senha], select, errorDB);
    }, errorDB);
 }
