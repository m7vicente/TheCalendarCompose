// Função que realiza troca de telas
function alterarTela() {
    $('.targetPage').click(function () {
        var target = $(this).attr('dt-page');
        $('.page').removeClass('page-active');
        $(target).addClass('page-active');
    });
    }

alterarTela();

//IMPLEMENTAÇÃO DAS AÇOES DA 4 ABA LOGIN, CADASTRO E ATUALIZAÇÕES

//Ação do botão Cadastrar Cadastrar Usuario
$("#EnviarCadastro").click(function inserirRegistros() {

    var NovoConsumidor = {};

    NovoConsumidor.nomeUsuario = $('#NomeUsuario').val();
    NovoConsumidor.senha = $('#SenhaUsuario').val();
    NovoConsumidor.sexo = $("#sexoUsuario").val()
    NovoConsumidor.aniversario = $('#NascimentoUsuario').val();
    NovoConsumidor.NomeCompleto = $('#NomeCompleto').val();
    NovoConsumidor.Email = $('#EmailUsuario').val();
    NovoConsumidor.telefone = $('#CelularUsuario').val();
    NovoConsumidor.RuaUsuario = $('#RuaUsuario').val();
    NovoConsumidor.UF = $('#estado').val();
    NovoConsumidor.Cidade = $('#CidadeUsuario').val();
    NovoConsumidor.Cep = $('#CepUsuario').val();


    if (validarCadastro(NovoConsumidor) === true) {

        alert(validado);
    }
                
});

function validarCadastro(NovoConsumidor) {

    if (NovoConsumidor.nomeUsuario == '') {
        return false;
    } else if (NovoConsumidor.senha != $('#SenhaUsuarioConfirma').val()) {
        //invocar toast aqui alertando
        return false;
    } else if (NovoConsumidor.aniversario == null || aniversario == '') {
        return false;
    } else if (NovoConsumidor.NomeCompleto == '') {
        return false;
    } else if (NovoConsumidor.Email == '') {
        return false;
    } else if (NovoConsumidor.telefone == '') {
        return false;
    } else if (NovoConsumidor.RuaUsuario == '') {
        return false;
    } else if (NovoConsumidor.UF == '') {
        return false;
    } else if (NovoConsumidor.Cidade == '') {
        return false;
    } else if (NovoConsumidor.Cep == '') {
        return false;
    } else
        return true;

}


//Ação do botão Entrar
$('#RealizarLogin').click(function realizarLogin() {

        alert("Login");
 });

//Ação do botão Recuperar
$('#RecuperarSenha').click(function resetarSenha() {

    alert('recuperar');
});


//IMPLEMENTAÇÃO DAS AÇOES DA 4 ABA LOGIN, CADASTRO E ATUALIZAÇÕES

$('#AgendarServico').click(function agendarServico() {

    alert("Realizar Agendamento");
});


$('#btnNovoServico').click(onDeviceReady);


function onDeviceReady() {
    alert("device Ready")
    var db = window.openDatabase("DataBase", "1.0", "TheCalendar", 2000000);
    db.transaction(populateDB, errorDB, sucessDB);
}

function populateDB(tx) {
    tx.executeSql('DROP TABLE IF EXISTS pessoa');
    tx.executeSql('CREATE TABLE pessoa ( id_pessoa INTEGER PRIMARY KEY, nome)');
    tx.executeSql('INSERT INTO pessoa (id_pessoa, nome) VALUES (1, "Ronaldo")');
    tx.executeSql('INSERT INTO pessoa (id_pessoa, nome) VALUES (2, "Maria")');
    tx.executeSql('INSERT INTO pessoa (id_pessoa, nome) VALUES (3, "Eduardo")');
    alert("populate")
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
    tx.executeSql('SELECT * FROM pessoa', [] ,sucess, errorDB )
}




function sucess(tx, results) {
    alert("Sucesso");

    var len = results.rows.length;
    alert(len + " Linhas Encontradas");
    for (var i = 0; i < len; i++) {
        alert("ID: " + results.rows.item(i).id_pessoa + ";  Pesssoa: " + results.rows.item(i).nome);
    }
}