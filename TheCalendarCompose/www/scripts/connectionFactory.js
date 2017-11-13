//db variavel global que é ultilizada para acessar a conexão com o banco de dados criado pela função connectioFactory
var db;

//  ConnectionFactory: esta função cria a conexão com o banco SQLITE do dispositivo, ele mantem a mesma em uma variavel global chamada db.
function connectionFactory() {
    db = window.openDatabase("DataBase", "1.0", "TheCalendar", 2000000);
    db.transaction(populateDB, errorDB, sucessDB);
    criarPrimeiraTela();
}

// populateDB: esta função é chamada pela connectionFactory. Ela cria as tabelas e realiza alguns inserts
function populateDB(tx) {
    //tx.executeSql('DROP TABLE IF EXISTS tb_pessoa'); tx.executeSql('DROP TABLE IF EXISTS tb_foto_pessoa'); tx.executeSql('DROP TABLE IF EXISTS tb_servicos');
    //tx.executeSql('DROP TABLE IF EXISTS tb_foto_servico');tx.executeSql('DROP TABLE IF EXISTS tb_agendamentos');
    tx.executeSql('CREATE TABLE IF NOT EXISTS tb_pessoa( id_pessoa INTEGER PRIMARY KEY AUTOINCREMENT, nomeUsuario  TEXT NOT NULL UNIQUE, senha TEXT NOT NULL, nome_pessoa TEXT NOT NULL, nascimento DATETIME NOT NULL, sexo TEXT NOT NULL, email TEXT, celular TEXT, endereco_rua TEXT, endereco_cidade TEXT, endereco_cep INTEGER, endereco_estado TEXT, data_cadastro DATETIME DEFALT CURRENT_TIMESTAMP)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS tb_foto_pessoa(id_foto_pessoa INTEGER PRIMARY KEY AUTOINCREMENT, fk_id_pessoa INTEGER, imagem_pessoa BLOB, FOREIGN KEY (fk_id_pessoa) REFERENCES tb_pessoa (id_pessoa))');
    tx.executeSql('CREATE TABLE IF NOT EXISTS tb_servicos(id_servico INTEGER PRIMARY KEY AUTOINCREMENT, fk_id_pessoa_prestador INTEGER, nome_servico TEXT NOT NULL, descricao_servico TEXT NOT NULL, valor_servico REAL, servico_ativo REAL, categoria TEXT, FOREIGN KEY (fk_id_pessoa_prestador) REFERENCES tb_pessoa (id_pessoa))');
    tx.executeSql('CREATE TABLE IF NOT EXISTS tb_foto_servico(id_foto_servico INTEGER PRIMARY KEY AUTOINCREMENT, fk_id_servico INTEGER NOT NULL, imagem_servico BLOB, FOREIGN KEY (fk_id_servico) REFERENCES tb_servicos (id_servico))');
    tx.executeSql('CREATE TABLE IF NOT EXISTS tb_agendamentos(id_agendamento INTEGER PRIMARY KEY AUTOINCREMENT, fk_id_servico INTEGER NOT NULL, fk_id_pessoa_consumidor INTEGER NOT NULL, nome_consumidor TEXT NOT NULL ,horario_dia_agendamento DATETIME, valor_agendamento REAL, doc_consumidor TEXT, nome_servico TEXT, FOREIGN KEY (fk_id_pessoa_consumidor) REFERENCES tb_pessoa(id_pessoa), FOREIGN KEY (fk_id_servico) REFERENCES tb_servicos (id_servico) )');
    //tx.executeSql("INSERT INTO tb_pessoa (nomeUsuario, senha, nome_pessoa, sexo ,nascimento, email, celular, endereco_rua, endereco_cidade, endereco_cep, endereco_estado) VALUES ('mc','he',' Matheus Guilherme de Araujo Vicente ',' Maculino ',' 1999-02-24 ',' mvicente@outlook.com.br ',' (11) 5121-3599 ',' Irmão nicolau da fonseca ',' São Paulo ', 03590-170,' SP ')");
    //tx.executeSql("INSERT INTO tb_servicos (fk_id_pessoa_prestador, nome_servico, descricao_servico) VALUES (1,'HE GAY',' Matheus Guilherme de Araujo Vicente ')");
    //tx.executeSql("INSERT INTO tb_servicos (fk_id_pessoa_prestador, nome_servico, descricao_servico) VALUES (1,'Barbie',' A boneca que é a alegria da garotada ')");

}

// errorDB: é chamada em qualquer função que realize um transição com o banco. ela somente é chamada quando a um erro na execução do comando, alertando qual foi o erro.
function errorDB(err) {
    alert("erro: " + err.code);
}

//sucessDB: é igual a errorDB, porém é chamada quando o comando sql é realizado com sucesso
function sucessDB(err) {
    //alert("Sucesso ao executar query");
}

//inserirUsuario: função que recebe os dados do index.js e insere no banco de dados.
function inserirUsuario(novoUsuario) {
    //alert(novoUsuario.nomeUsuario + " , " + novoUsuario.senha + " , " + novoUsuario.sexo + " , " + novoUsuario.aniversario + " , " + novoUsuario.NomeCompleto + " , " + novoUsuario.Email + " , " + novoUsuario.telefone + " , " + novoUsuario.RuaUsuario + " , " + novoUsuario.UF + " , " + novoUsuario.Cidade + " , " + novoUsuario.Cep);
    db.transaction(function DBnoUsuario(tx) {
        tx.executeSql('INSERT INTO tb_pessoa (nomeUsuario, senha, nome_pessoa, sexo ,nascimento, email, celular, endereco_rua, endereco_cidade, endereco_cep, endereco_estado) VALUES (?,?,?,?,?,?,?,?,?,?,? )', [novoUsuario.nomeUsuario, novoUsuario.senha, novoUsuario.nomePessoa, novoUsuario.aniversario, novoUsuario.NomeCompleto, novoUsuario.Email, novoUsuario.telefone, novoUsuario.RuaUsuario, novoUsuario.Cidade, novoUsuario.Cep, novoUsuario.UF]);
    }, errorDB, sucessDB);
 }

//show: pode ser ultilizado para recolher todos os registros da tabela indicada
function show() {
    db.transaction(function mostrarRegistros(tx) {
        tx.executeSql('SELECT * FROM tb_foto_servico', [], select, errorDB);
    }, errorDB);
}

//select: realiza a leitura dos resultados de uma query SELECT, pode ser chamada por qualquer função que ultilize este comando do sql
function select(tx, results) {
    var len = results.rows.length;
    alert(len + " Linhas Encontradas");
    for (var i = 0; i < len; i++) {
        alert("ID: " + results.rows.item(i).id_foto_servico + "; Id fk Servico: " + results.rows.item(i).fk_id_servico + "; BLOB " + results.rows.item(i).imagem_servico);

        //alert("ID: " + results.rows.item(i).id_servico + ";  Prestador: " + results.rows.item(i).fk_id_pessoa_prestador + ";  nome Servico: " + results.rows.item(i).nome_servico + "; Descrição: " + results.rows.item(i).descricao_servico + ";  Valor: " + results.rows.item(i).valor_servico + ";  Catoria: " + results.rows.item(i).categoria + ";  Ativo: " + results.rows.item(i).servico_ativo);
}
}

//login: ultilizado para realizar o login de um usuario no sistema.
function login(LoginUsuario) {

    var UsuarioLogado = new Usuario();

    db.transaction(function dataLogin(tx) {
        tx.executeSql('SELECT * FROM tb_pessoa WHERE nomeUsuario = ? AND senha = ?', [LoginUsuario.nomeUsuario, LoginUsuario.senha], function select(tx, results) {
            try {
                this.UsuarioLogado.entrou = true;
                this.UsuarioLogado.id_pessoa = results.rows.item(0).id_pessoa;
                this.UsuarioLogado.nomeUsuario = results.rows.item(0).nomeUsuario;
                this.UsuarioLogado.nomePessoa = results.rows.item(0).nome_pessoa;
                this.UsuarioLogado.senha = results.rows.item(0).senha;
                this.UsuarioLogado.nascimento = results.rows.item(0).nascimento;
                this.UsuarioLogado.email = results.rows.item(0).email;
                this.UsuarioLogado.celular = results.rows.item(0).celular;
                this.UsuarioLogado.endereco_rua = results.rows.item(0).endereco_rua;
                this.UsuarioLogado.endereco_cidade = results.rows.item(0).endereco_cidade;
                this.UsuarioLogado.endereco_estado = results.rows.item(0).endereco_estado;
                this.UsuarioLogado.endereco_cep = results.rows.item(0).endereco_cep;
                this.UsuarioLogado.data_cadastro = results.rows.item(0).data_cadastro;

                //Dentro desde try deve ser chamado as funções do banco que criam as demais telas
                
                criarTela(this.UsuarioLogado);
                selecionarAgendamentos(this.UsuarioLogado.id_pessoa);

            } catch (DOMException) {
                invalido();
            }
        }, errorDB);
    });    
}

//inserirNovo serviço e sua foto
function adicionarServico(novoServico) {
    alert("ID: " + novoServico.id_servico + ";  Prestador: " + novoServico.idPrestador + ";  nome Servico: " + novoServico.nomeServico + ";  Valor: " + novoServico.valor_servico + ";  Catoria: " + novoServico.categoria + ";  Ativo: " + novoServico.servico_ativo);
    db.transaction(function InserirServicoDB(tx) {
        tx.executeSql('INSERT INTO tb_servicos(fk_id_pessoa_prestador , nome_servico , descricao_servico , valor_servico , servico_ativo , categoria) VALUES (?,?,?,?,?,?)', [novoServico.idPrestador, novoServico.nomeServico, novoServico.descricao_servico, novoServico.valor_servico, novoServico.servico_ativo, novoServico.categoria]);
        tx.executeSql('INSERT INTO tb_foto_servico (fk_id_servico, imagem_servico) VALUES (last_insert_rowid(), ?)', [novoServico.imagem]);
    }, errorDB, sucessDB);
}

//função para selecionar servicos de usuario logado

function procurarMeusServicos(id_usuarioLogado) {  

    db.transaction(function dataLogin(tx) {
        tx.executeSql('SELECT * FROM tb_servicos WHERE fk_id_pessoa_prestador = ?', [id_usuarioLogado], function select(tx, results) {
        var ListaServicos = [];

        var len = results.rows.length;
        for (var i = 0; i < len; i++) {
            var servicos = new Servico();
            try {
                servicos.idServico = results.rows.item(i).id_servico;
                servicos.idPrestador = results.rows.item(i).fk_id_pessoa_prestador;
                servicos.nomeServico = results.rows.item(i).nome_servico;
                servicos.descricao_servico = results.rows.item(i).descricao_servico;
                servicos.valor_servico = results.rows.item(i).valor_servico;
                servicos.servico_ativo = results.rows.item(i).servico_ativo;
                servicos.categoria = results.rows.item(i).categoria;
 

            } catch (DOMException) { }
            ListaServicos[i] = servicos;
            
        }
        preencherTelaServicos(ListaServicos);
        
    }, errorDB);
});    
}

//FUNÇÃO PARA DELETAR UM SERVIÇO
function deletarServico(idServico) {
    db.transaction(function deleteService(tx) {
        tx.executeSql('DELETE FROM tb_servicos WHERE id_servico = ?', [idServico]);
    }, errorDB, sucessDB);
    procurarMeusServicos(UsuarioLogado.id_pessoa);
}

//FUNÇÃO PARA SELECIONAR TODOS OS SERVIÇOS DO BANCO
function criarPrimeiraTela(){
    db.transaction(function selectAll(tx) {
        tx.executeSql('SELECT * FROM tb_servicos',[], function select(tx, results) {
            var ListaServicos = [];

            var len = results.rows.length;
            for (var i = 0; i < len; i++) {
                var servicos = new Servico();
                try {
                    servicos.idServico = results.rows.item(i).id_servico;
                    servicos.idPrestador = results.rows.item(i).fk_id_pessoa_prestador;
                    servicos.nomeServico = results.rows.item(i).nome_servico;
                    servicos.descricao_servico = results.rows.item(i).descricao_servico;
                    servicos.valor_servico = results.rows.item(i).valor_servico;
                    servicos.servico_ativo = results.rows.item(i).servico_ativo;
                    servicos.categoria = results.rows.item(i).categoria;


                } catch (DOMException) { }
                ListaServicos[i] = servicos;

            }
            mostraPrimeiraTela(ListaServicos);

        }, errorDB);
    });    
}


//FUNÇÃO PARA INSERIR AGENDAMENTOS NO BANCO DE DADOS

function agendarServico(agendar) {
 db.transaction(function novoAgendamento(tx) {
     tx.executeSql('INSERT INTO tb_agendamentos (fk_id_servico,fk_id_pessoa_consumidor, nome_consumidor, horario_dia_agendamento, valor_agendamento, doc_consumidor, nome_servico) VALUES (?,?,?,?,?,?,?)', [agendar.fk_id_servico, agendar.fk_id_pessoa_consumidor, agendar.nome_consumidor, agendar.horario_dia_agendamento, agendar.valor_agendamento, agendar.doc_consumidor, agendar.nome_servico]);                                               
    }, errorDB, sucessDB);
 selecionarAgendamentos(agendar.fk_id_pessoa_consumidor);
}


function selecionarAgendamentos(idUsuarioLogado) {
    //deve ser removido daqui

    var ListaAgendamento = [];
    var ListaMeusAgendamento = [];

    db.transaction(function selectAll(tx) {
        tx.executeSql('SELECT * FROM tb_agendamentos WHERE fk_id_pessoa_consumidor = ? ', [idUsuarioLogado], function select(tx, results) {

            var len = results.rows.length;
            for (var i = 0; i < len; i++) {

                var agendamento = new Agendamento();

                try {
                    agendamento.id_agendamento = results.rows.item(i).id_agendamento;
                    agendamento.fk_id_servico = results.rows.item(i).fk_id_servico;
                    agendamento.fk_id_pessoa_consumidor = results.rows.item(i).fk_id_pessoa_consumidor;
                    agendamento.nome_consumido = results.rows.item(i).nome_consumidor;
                    agendamento.horario_dia_agendamento = results.rows.item(i).horario_dia_agendamento;
                    agendamento.local_agendamento = results.rows.item(i).local_agendamento;
                    agendamento.valor_agendamento = results.rows.item(i).valor_agendamento;
                    agendamento.doc_consumidor = results.rows.item(i).doc_consumidor;
                    agendamento.nome_servico = results.rows.item(i).nome_servico;

                } catch (DOMException) {
                    alert("error");
                }
                ListaAgendamento[i] = agendamento;

            }
            mostraSegundaTela(ListaAgendamento);


        }, errorDB);
    });

    db.transaction(function selectAll(tx) {
        tx.executeSql('SELECT * FROM tb_agendamentos WHERE fk_id_servico = (SELECT id_servico FROM tb_servicos WHERE fk_id_pessoa_prestador = ?)', [idUsuarioLogado], function select(tx, results) {

            var len = results.rows.length;
            for (var i = 0; i < len; i++) {

                var agendamento = new Agendamento();

                try {
                    agendamento.id_agendamento = results.rows.item(i).id_agendamento;
                    agendamento.fk_id_servico = results.rows.item(i).fk_id_servico;
                    agendamento.fk_id_pessoa_consumidor = results.rows.item(i).fk_id_pessoa_consumidor;
                    agendamento.nome_consumido = results.rows.item(i).nome_consumidor;
                    agendamento.horario_dia_agendamento = results.rows.item(i).horario_dia_agendamento;
                    agendamento.local_agendamento = results.rows.item(i).local_agendamento;
                    agendamento.valor_agendamento = results.rows.item(i).valor_agendamento;
                    agendamento.doc_consumidor = results.rows.item(i).doc_consumidor;
                    agendamento.nome_servico = results.rows.item(i).nome_servico;

                } catch (DOMException) {
                    alert("error");
                }
                ListaMeusAgendamento[i] = agendamento;

            }
            mostraSegundaTelaDois(ListaMeusAgendamento);

        }, errorDB);
    });
}