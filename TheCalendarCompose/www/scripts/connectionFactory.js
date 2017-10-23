var db;


function connectionFactory() {
    alert("device Ready")
    var db = window.openDatabase("DataBase", "1.0", "TheCalendar", 2000000);
    db.transaction(populateDB, errorDB, sucessDB);
}

function populateDB(tx) {
    tx.executeSql('DROP TABLE IF EXISTS tb_pessoa');
    tx.executeSql('CREATE TABLE IF NOT EXISTS tb_pessoa( id_pessoa INTEGER PRIMARY KEY AUTOINCREMENT, nomeUsuario TEXT NOT NULL, senha TEXT NOT NULL, nome_pessoa TEXT NOT NULL, nascimento DATETIME NOT NULL, sexo TEXT NOT NULL, email TEXT, celular TEXT, endereco_rua TEXT, endereco_cidade TEXT, endereco_cep INTEGER, endereco_estado TEXT, data_cadastro DATETIME DEFALT CURRENT_TIMESTAMP)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS tb_foto_pessoa(id_foto_pessoa INTEGER PRIMARY KEY AUTOINCREMENT, fk_id_pessoa INTEGER, imagem_pessoa BLOB, FOREIGN KEY (fk_id_pessoa) REFERENCES tb_pessoa (id_pessoa))');
    tx.executeSql('CREATE TABLE IF NOT EXISTS tb_servicos(id_servico INTEGER PRIMARY KEY AUTOINCREMENT, fk_id_pessoa_prestador INTEGER, nome_servico TEXT NOT NULL, descricao_servico TEXT NOT NULL, valor_servico REAL, servico_ativo REAL, categoria TEXT, FOREIGN KEY (fk_id_pessoa_prestador) REFERENCES tb_pessoa (id_pessoa))');
    tx.executeSql('CREATE TABLE IF NOT EXISTS tb_foto_servico(id_foto_servico INTEGER PRIMARY KEY AUTOINCREMENT, fk_id_servico INTEGER NOT NULL, imagem_servico BLOB, FOREIGN KEY (fk_id_servico) REFERENCES tb_servicos (id_servico))');
    tx.executeSql('CREATE TABLE IF NOT EXISTS tb_agendamentos(id_agendamento INTEGER PRIMARY KEY AUTOINCREMENT, fk_id_servico INTEGER NOT NULL, fk_id_pessoa_consumidor INTEGER NOT NULL, horario_dia_agendamento DATETIME, local_agendamento TEXT, valor_agendamento REAL, doc_consumidor TEXT, FOREIGN KEY (fk_id_pessoa_consumidor) REFERENCES tb_pessoa(id_pessoa), FOREIGN KEY (fk_id_servico) REFERENCES tb_servicos (id_servico) )');
    alert("populate");
}

function errorDB(err) {
    alert("erro: " + err.code);
}

function sucessDB() {
    alert("Sucesso");
}

$('#Mostrar').click(show);

function show() {

    var db = window.openDatabase("DataBase", "1.0", "TheCalendar", 2000000);
    db.transaction(mostrarRegistros, errorDB);

}

function mostrarRegistros(tx) {
    tx.executeSql('SELECT * FROM pessoa', [], sucess, errorDB)
}




function sucess(tx, results) {
    alert("Sucesso");

    var len = results.rows.length;
    alert(len + " Linhas Encontradas");
    for (var i = 0; i < len; i++) {
        alert("ID: " + results.rows.item(i).id_pessoa + ";  Pesssoa: " + results.rows.item(i).nome);
    }
}