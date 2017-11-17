//Variaveis de usuario
UsuarioLogado = new Usuario();
UsuarioLogado.id_pessoa = null;
//alert(user1.nomeUsuario);
// Funções da aplicação
    document.addEventListener("deviceready", connectionFactory, false);


//para carregar no navegador 
connectionFactory();

// Função que realiza troca de telas
function alterarTela() {
    $('.targetPage').click(function () {
        var target = $(this).attr('dt-page');
        var atual = $(this).attr('dt-atual');
        $(atual).removeClass('page-active');
        $(target).addClass('page-active');
    });
    }
alterarTela();
//IMPLEMENTAÇÃO DAS AÇÕES DA 1 ABA: CATALOGO DE SERVIÇOS

//função responsavel por gerar conteudo dinamico na tela inicial do app, 
function mostraPrimeiraTela(ListaTodosServicos) {

    $('#todosServicos').html('');

    for (i = 0; i < ListaTodosServicos.length; i++) {

        $('#todosServicos').append('<div class="mdl-cell mdl-cell--4-col-phone mdl-cell--4-col-tablet">' +
            '<div class="servicoCard">' +
            '<div class="mdl-card mdl-shadow--2dp">' +
            '<div class="mdl-card__title">' +
            '<h2 class="mdl-card__title-text">' + ListaTodosServicos[i].nomeServico + '</h2>' +
            '</div>' +
            '<div class="mdl-card__supporting-text">' + ListaTodosServicos[i].descricao_servico + '</div > ' +
            '<div class="mdl-card__actions mdl-card--border">' +
            '<button class="mdl-button mdl-js-button mdl-js-ripple-effect" onclick="telaDeAgendamento(' + ListaTodosServicos[i].idServico + ',' + ListaTodosServicos[i].valor_servico + ',' + ("'" + ListaTodosServicos[i].nomeServico + "'") + ',' + ("'" + ListaTodosServicos[i].local_servico + "'") + ')">' +
            '<i class="material-icons">check_circle</i> Agendar </button>' +
            '<button class="mdl-button mdl-js-button mdl-js-ripple-effec" onclick="detalharParaAgendar('+ ("'" + ListaTodosServicos[i].nomeServico + "'") + ',' + ("'" + ListaTodosServicos[i].descricao_servico + "'") + ',' + ("'" + ListaTodosServicos[i].valor_servico + "'") + ',' + ("'" + ListaTodosServicos[i].categoria + "'") + ',' + ("'" + ListaTodosServicos[i].local_servico + "'") + ')">' +
            '<i id="iconDetalhes" class="material-icons">details</i> Detalhes</button>' +
            '</div></div></div ></div>');

    }
}

function detalharParaAgendar(nomeServico, descricao, valor, categoria, local) {
    $('#servicos').removeClass('page-active');
    $('#tela-detalhes').addClass('page-active');

    $('#tela-detalhes').html('');

    $('#tela-detalhes').append('<ul class="demo-list-icon mdl-list">' +
        '<li class="mdl-list__item">' +
        '<span class="mdl-list__item-primary-content">' +
        '<i class="material-icons mdl-list__item-icon">room_service</i>Serviço: ' + nomeServico +
        '</span>' +
        '</li >' +
        '<li class="mdl-list__item">' +
        '<span class="mdl-list__item-primary-content">' +
        '<i class="material-icons mdl-list__item-icon">attach_money</i> Valor : R$' + valor +
        '</span>' +
        '</li>' +
        '<li class="mdl-list__item">' +
        '<span class="mdl-list__item-primary-content">' +
        '<i class="material-icons mdl-list__item-icon">place</i> Local : ' + local +
        '</span>' +
        '</li>' +
        '<li class="mdl-list__item">' +
        '<span class="mdl-list__item-primary-content">' +
        '<i class="material-icons mdl-list__item-icon">format_list_bulleted</i> Tipo de Serviço : ' + categoria +
        '</span>' +
        '</li>' +
        '<li class="mdl-list__item">' +
        '<span class="mdl-list__item-primary-content">' +
        '<i class="material-icons mdl-list__item-icon">description</i> Sobre : ' + descricao +
        '</span>' +
        '</li>' +
        '</ul>');


    document.addEventListener("backbutton", function (e) {
        e.preventDefault();
        $('#tela-detalhes').removeClass('page-active');
        $('#servicos').addClass('page-active');
        return;
    }, false);
}

//função responsavel por alterar para a tela de agendamento de servico
function telaDeAgendamento(idServico, valorServico, nome_servico, local_servico) {
    if (UsuarioLogado.id_pessoa === null || UsuarioLogado.id_pessoa === '') {

        showToast("Realize login para agendar um serviço");
    }
    else {

        $('#servicos').removeClass('page-active');
        $('#form-agendar').addClass('page-active');

        if (local_servico == 'ND') {
            $('#endereco-domicilio').removeClass('hidden');
            local_servico = $('#enderecoDomicilio').val();
        } else {
            $('#endereco-domicilio').addClass('hidden');
        }

        $('#AgendarServico').click(function PrepararAgendamentoServico() {

            var agendar = new Agendamento();

            agendar.fk_id_servico = idServico;
            agendar.valor_agendamento = valorServico;
            agendar.fk_id_pessoa_consumidor = UsuarioLogado.id_pessoa;
            agendar.nome_consumidor = $('#NomeConsumidor').val();
            agendar.horario_dia_agendamento = ($('#dataReserva').val().split("T").join(" "));
            agendar.doc_consumidor = $('#identidade').val();
            agendar.nome_servico = nome_servico;
            agendar.local_agendamento = local_servico;

            if (validarCamposAgendamento(agendar)) {

                validarHorario(agendar);

            }

        });
        

    }

}

function validarCamposAgendamento(agendar) {
    if (agendar.nome_consumidor === '') {
        showToast("Insira o nome da pessoa que irá ultilizar a reserva");
        return false;
    }
    if (agendar.horario_dia_agendamento === '') {
        showToast("Insira o horario que você predende ser atendido");
        return false;
    } 
    if (agendar.doc_consumidor === '') {
        showToast("Insira um RG ou CPF da pessoa ultilizara a reserva");
        return false;
    }
    else {
        return true;
    }

}

//IMPLEMENTAÇÃO DAS AÇÕES DA 2 ABA: 
//MEUS AGENDAMENTOS -> MEUS PRESTADORES
function mostraSegundaTela(ListaAgendamento) {
    $('#pagina-agendamentos').addClass('page-active');
    

    $('#meusAgendamentos').html('');

        for(i = 0; i < ListaAgendamento.length; i++) {

        $('#meusAgendamentos').append('<div class="mdl-cell mdl-cell--4-col-phone mdl-cell--8-col-tablet">' +
            '<div class="agendamentoCard">' +
            '<div class="mdl-card mdl-shadow--2dp">' +
            '<div class="mdl-card__title">' +
            '<h1 class="mdl-card__title-text">' + ListaAgendamento[i].nome_servico + '</h1>' +
            '</div>' +
            '<div class="mdl-card__supporting-text">Agendado para o dia: ' + (ListaAgendamento[i].horario_dia_agendamento.slice(0, 10).split("-").reverse().join("/")) + ', ás ' + (ListaAgendamento[i].horario_dia_agendamento.slice(10, 16))+'</div> ' +
            '<div class="mdl-card__actions mdl-card--border">' +
            '<button class="mdl-button mdl-js-button mdl-js-ripple-effect" onclick="btnCancelarAgendamento(' + ListaAgendamento[i].id_agendamento + ')">' +
            '<i class="material-icons mdl-color-text--red-A700">cancel</i> Cancelar Agendamento </button>' +
            '<button class="mdl-button mdl-js-button mdl-js-ripple-effec" onclick="detalhesMeusPrestadores(' + ("'" + ListaAgendamento[i].nome_consumido + "'") + ',' + ("'" + ListaAgendamento[i].doc_consumidor + "'") + ',' + ("'" + ListaAgendamento[i].nome_servico + "'") + ',' + ("'" + ListaAgendamento[i].horario_dia_agendamento.slice(10, 16) + "'") + ',' + ("'" + ListaAgendamento[i].horario_dia_agendamento.slice(0, 10).split("-").reverse().join("/") + "'") + ',' + ListaAgendamento[i].valor_agendamento + ',' + ("'" +ListaAgendamento[i].local_agendamento +"'")+')">' +
            '<i id="iconDetalhes" class="material-icons">details</i> Detalhes Agendamento</button>' +
            '</div></div></div ></div>');

    }
}

function detalhesMeusPrestadores(nomeAgendamento, doc ,nome, hora, dia, valor, local) {
    $('#meusPrestadores').removeClass('page-active');
    $('#detalhesPrestadores').addClass('page-active');
    $('#detalhesPrestadores').html('');
    $('#detalhesPrestadores').append('<ul class="demo-list-icon mdl-list">' +
        '<li class="mdl-list__item">' +
        '<span class="mdl-list__item-primary-content">' +
        '<i class="material-icons mdl-list__item-icon">verified_user</i>Em nome: ' + nomeAgendamento +
        '</span>' +
        '</li >' +
        '<li class="mdl-list__item">' +
        '<span class="mdl-list__item-primary-content">' +
        '<i class="material-icons mdl-list__item-icon">credit_card</i>Documento: ' + doc +
        '</span>' +
        '</li >' +
        '<li class="mdl-list__item">' +
        '<span class="mdl-list__item-primary-content">' +
        '<i class="material-icons mdl-list__item-icon">room_service</i>Serviço: ' + nome +
        '</span>' +
        '</li >' +
        '<li class="mdl-list__item">' +
        '<span class="mdl-list__item-primary-content">' +
        '<i class="material-icons mdl-list__item-icon">today</i>Data: ' + dia +
        '</span>' +
        '</li>' +
        '<li class="mdl-list__item">' +
        '<span class="mdl-list__item-primary-content">' +
        '<i class="material-icons mdl-list__item-icon">alarm_on</i>Horario: ' + hora +
        '</span>' +
        '</li>' +
        '<li class="mdl-list__item">' +
        '<span class="mdl-list__item-primary-content">' +
        '<i class="material-icons mdl-list__item-icon">attach_money</i> Valor : R$' + valor +
        '</span>' +
        '</li>' +
        '<li class="mdl-list__item">' +
        '<span class="mdl-list__item-primary-content">' +
        '<i class="material-icons mdl-list__item-icon">place</i> Local : '+ local +
        '</span>' +
        '</li>' +
        '</ul>');

        document.addEventListener("backbutton", function (e) {
            e.preventDefault();
            $('#detalhesPrestadores').removeClass('page-active');
            $('#meusPrestadores').addClass('page-active');
        return;
    }, false);

}


//IMPLEMENTAÇÃO DO BATÃO DE CANCELAR AGENDAMENTO
function btnCancelarAgendamento(idAgendamento) {
    cancelarAgendamento(idAgendamento);
}



//MEUS AGENDAMENTOS -> MEUS PRESTADORES
function mostraSegundaTelaDois(ListaAgendamento) {
    $('#pagina-agendamentos').addClass('page-active');


    $('#meusAgendamentosClientes').html('');

    for (i = 0; i < ListaAgendamento.length; i++) {

        $('#meusAgendamentosClientes').append('<div class="mdl-cell mdl-cell--4-col-phone mdl-cell--4-col-tablet">' +
            '<div class="agendamentoCard">' +
            '<div class="mdl-card mdl-shadow--2dp">' +
            '<div class="mdl-card__title">' +
            '<h1 class="mdl-card__title-text"> Dia:' + (ListaAgendamento[i].horario_dia_agendamento.slice(0, 10).split("-").reverse().join("/")) + ' , ' + (ListaAgendamento[i].horario_dia_agendamento.slice(10, 16)) + '</h1>' +
            '</div>' +
            '<div class="mdl-card__supporting-text">Cliente: ' + ListaAgendamento[i].nome_consumido + '</p> Serviço: '+ ListaAgendamento[i].nome_servico  + '</div > ' +
            '<div class="mdl-card__actions mdl-card--border">' +
            '<button class="mdl-button mdl-js-button mdl-js-ripple-effec" onclick="detalhesMeusClientes(' + ("'" + ListaAgendamento[i].nome_consumido + "'") + ',' + ("'" + ListaAgendamento[i].doc_consumidor + "'") + ',' + ("'" + ListaAgendamento[i].nome_servico + "'") + ',' + ("'" + ListaAgendamento[i].valor_agendamento + "'") + ',' + ("'" + ListaAgendamento[i].horario_dia_agendamento.slice(0, 10).split("-").reverse().join("/") + "'") + ',' + ("'" + ListaAgendamento[i].horario_dia_agendamento.slice(10, 16) + "'") +')">' +
            '<i id="iconDetalhes" class="material-icons">details</i> Detalhes Para Atendimento</button>' +
            '</div></div></div ></div>');

    }
}


//DETALHES MEUS CLIENTES
function detalhesMeusClientes(nomeConsumidor, doc, nomeServico, valor, hora, dia) {

    $('#meusClientes').removeClass('page-active');
    $('#detalhesClientes').addClass('page-active');

    $('#detalhesClientes').html('');

    $('#detalhesClientes').append('<ul class="demo-list-icon mdl-list">' +
        '<li class="mdl-list__item">' +
        '<span class="mdl-list__item-primary-content">' +
        '<i class="material-icons mdl-list__item-icon">verified_user</i>Em nome: ' + nomeConsumidor +
        '</span>' +
        '</li >' +
        '<li class="mdl-list__item">' +
        '<span class="mdl-list__item-primary-content">' +
        '<i class="material-icons mdl-list__item-icon">credit_card</i>Documento: ' + doc +
        '</span>' +
        '</li >' +
        '<li class="mdl-list__item">' +
        '<span class="mdl-list__item-primary-content">' +
        '<i class="material-icons mdl-list__item-icon">attach_money</i> Valor Inicial : R$' + valor +
        '</span>' +
        '</li>' +
        '<li class="mdl-list__item">' +
        '<span class="mdl-list__item-primary-content">' +
        '<i class="material-icons mdl-list__item-icon">room_service</i>Serviço: ' + nomeServico +
        '</span>' +
        '</li >' +
        '<li class="mdl-list__item">' +
        '<span class="mdl-list__item-primary-content">' +
        '<i class="material-icons mdl-list__item-icon">today</i>Data: ' + dia +
        '</span>' +
        '</li>' +
        '<li class="mdl-list__item">' +
        '<span class="mdl-list__item-primary-content">' +
        '<i class="material-icons mdl-list__item-icon">alarm_on</i>Horario: ' + hora +
        '</span>' +
        '</li>' +
        '</ul>');

    document.addEventListener("backbutton", function (e) {
        e.preventDefault();
        $('#detalhesClientes').removeClass('page-active');
        $('#meusClientes').addClass('page-active');
        return;
    }, false);

}



//IMPLEMTENTAÇÃO DAS AÇÕES DA 3 ABA: MEUS SERVICOS

//FUNÇÃO PARA PREEENCHER ABA "MEUS SERVIÇOS"
function preencherTelaServicos(ListaServicos) {

    $('#meuServicos').html('');
    for (var i = 0; i < ListaServicos.length; i++) {


        $('#meuServicos').append('<div class="servicoCard mdl-cell mdl-cell--4-col-phone mdl-cell--8-col-tablet">' +
            '<div class="mdl-card mdl-shadow--2dp">' +

            '<div class="mdl-card__title">' +
            '<h2 class="mdl-card__title-text">' + ListaServicos[i].nomeServico + '</h2>' +
            '</div>' +
            '<div class="mdl-card__supporting-text">' +
            '<div class="servicoCard-descricao"></div>' + ListaServicos[i].descricao_servico + '</div>' +
            '<div class="mdl-card__actions mdl-card--border">' +

            '<button class="mdl-button mdl-js-button mdl-js-ripple-effect" id="servico[' + ListaServicos[i].idServico + ']" name="btnEditar" onclick="editarServico(' + ListaServicos[i].idServico + ',' + ListaServicos[i].idPrestador + ',' + ("'" + ListaServicos[i].nomeServico + "'") + ',' + ("'" + ListaServicos[i].descricao_servico + "'") + ',' + ("'" + ListaServicos[i].categoria + "'") + ',' + ListaServicos[i].valor_servico + ',' + ListaServicos[i].servico_ativo + ',' + ("'"+ListaServicos[i].local_servico+"'") + ')">' +
            '<i class="material-icons">build</i> Editar' +
            '</button>' +

            '<button class="mdl-button mdl-js-button mdl-js-ripple-effect" name="btnDeletar" onclick="deletarServico(' + ListaServicos[i].idServico + ')">' +
            '<i id="iconDetalhes" class="material-icons">delete_forever</i> Excluir' +
            '</button></div></div></div>');
    }


}

function editarServico(idServico, idPrestador, nomeServico, descricao_servico, categoria, valor_servico, servico_ativo, local ,imagem) {
    
    $('#tela_servicos').removeClass('page-active');
    $('#tela-cadastro-servico').addClass('page-active');
    
    $('#NomeNovoServico').val(nomeServico);
    $('#descricaoNovoServico').val(descricao_servico);
    $('#novoServico.local_servico').val(local);
    $('#ValorNovoServico').val(valor_servico);
    $('#categoriaNovoServico').val(categoria);

    $('#btnCadastrarNovoServico').click(function deletarAnterior() {
        deletarServico(idServico);
        showToast("Alterado com Sucesso");
    });
    
}




//FUNÇÃO PARA A INSERÇÃO DE UM NOVO SERVICO
$('input[name=home-options]').click(function verificarLocal() {

    if ($('input[name=home-options]:checked').val() !== 'sim') {
        $('#endereco_novo_servico').removeClass('hidden');
    }
    if ($('input[name=home-options]:checked').val() === 'sim') {
        $('#endereco_novo_servico').addClass('hidden');
    }
});


$('#btnCadastrarNovoServico').click(function inserirNovoServico(){
    var novoServico = new Servico();
    
    novoServico.idPrestador = UsuarioLogado.id_pessoa;
    novoServico.nomeServico = $('#NomeNovoServico').val();
    novoServico.descricao_servico = $('#descricaoNovoServico').val();
    novoServico.valor_servico = $('#ValorNovoServico').val();
    novoServico.servico_ativo = true;
    novoServico.categoria = $('#categoriaNovoServico').val();

    if ($('input[name=home-options]:checked').val() !== 'sim') {
        novoServico.local_servico = $('#enderecoNovoServico').val();
    } else {
        novoServico.local_servico = "ND";
    }
    
    //novoServico.imagem = document.getElementById('imagemNovoServico').files[0];

    if (ValidarServico(novoServico) === true) {
        adicionarServico(novoServico);
        showToast("Adiconado com Sucesso !");
        $('#tela-cadastro-servico').removeClass('page-active');
        criarTela(UsuarioLogado);
    }

});


//Função para validar os campos do serviço a ser adicionado
function ValidarServico(novoServico) {
       
    if (novoServico.nomeServico === '') {
        showToast("Insira um nome");
        return false;
    } else if (novoServico.descricao_servico === '') {
        showToast("Insira uma descrição")
        return false;
    } else if (novoServico.valor_servico === '' || novoServico.valor_servico === 0) {
        showToast("Insira o valor do serviço");
        return false;
    } else if (novoServico.categoria === '') {
        showToast("Insira uma categoria");
        return false;
    } else if (novoServico.local_servico === '' && $('input[name=home-options]:checked').val() !== 'sim') {
        showToast("È necessario o endereço");
        return false;
    } else {
          return true;
    }
}

//Tratando imagem a ser pega no formulario novo serviço
$('#imagemNovoServico').change(function getImagefile() {
    var arquivo = document.getElementById('imagemNovoServico').files[0];
 
    var img = document.createElement("img");
    img.file = arquivo;
    //lendo arquivo selecionado
    document.getElementById('img-novo-servico').appendChild(img);
    var reader = new FileReader();
    reader.onload = (function (aImg) {
        return function (e) {
            aImg.src = e.target.result;
        };
    })(img);
    reader.readAsDataURL(arquivo);

});

//IMPLEMENTAÇÃO DAS AÇOES DA 4 ABA: LOGIN, CADASTRO E ATUALIZAÇÕES

//Ação do botão Cadastrar Cadastrar Usuario
$("#EnviarCadastro").click(function inserirRegistros() {

    var NovoConsumidor = new Usuario()

    NovoConsumidor.nomeUsuario = $('#NomeUsuario').val();
    NovoConsumidor.senha = $('#SenhaUsuario').val();
    NovoConsumidor.sexo = $('input[name=sex-options]:checked').val();
    NovoConsumidor.aniversario = $('#nascimentoUsuario').val();
    NovoConsumidor.nomePessoa = $('#NomeCompleto').val();
    NovoConsumidor.Email = $('#EmailUsuario').val();
    NovoConsumidor.telefone = $('#CelularUsuario').val();
    NovoConsumidor.RuaUsuario = $('#RuaUsuario').val();
    NovoConsumidor.UF = $('#estado').val();
    NovoConsumidor.Cidade = $('#CidadeUsuario').val();
    NovoConsumidor.Cep = $('#CepUsuario').val();
    NovoConsumidor.data_cadastro = new Date();

    //alert(NovoConsumidor.nomeUsuario + " , " + NovoConsumidor.senha + " , " + NovoConsumidor.sexo + " , " + NovoConsumidor.aniversario + " , " + NovoConsumidor.nomePessoa + " , " + NovoConsumidor.Email + " , " + NovoConsumidor.telefone + " , " + NovoConsumidor.RuaUsuario + " , " + NovoConsumidor.UF + " , " + NovoConsumidor.Cidade + " , " + NovoConsumidor.Cep);
    
    if (validarCadastro(NovoConsumidor) === true) {
        inserirUsuario(NovoConsumidor);
        showToast("Validado");
        $('#tela-cadastro').removeClass('page-active');
        $('#tela-login').addClass('page-active');
    }
                
});

//validarCadastro: ultilizado para impedir que seja realizado cadastros sem nunhuma informação
function validarCadastro(NovoConsumidor) {

    if (NovoConsumidor.nomeUsuario === '') {
        return false;
    } else if (NovoConsumidor.senha !== $('#SenhaUsuarioConfirma').val()) {
        showToast("Senhas não Concidem");
        return false;
    } else if (NovoConsumidor.aniversario === '') {
        return false;
    } else if (NovoConsumidor.NomeCompleto === '') {
        return false;
    } else if (NovoConsumidor.Email === '') {
        return false;
    } else if (NovoConsumidor.telefone === '') {
        return false;
    } else if (NovoConsumidor.RuaUsuario === '') {
        return false;
    } else if (NovoConsumidor.UF === '') {
        return false;
    } else if (NovoConsumidor.Cidade === '') {
        return false;
    } else if (NovoConsumidor.Cep === '') {
        return false;
    } else
        return true;
}

//Ação do botão Entrar
$('#RealizarLogin').click(function realizarLogin() {

    var UsuarioEntrando = new Usuario();

    UsuarioEntrando.nomeUsuario = $('#user').val();
    UsuarioEntrando.senha = $('#pass').val();

    if (UsuarioEntrando.nomeUsuario !== '' || UsuarioEntrando.senha !== '') {
        login(UsuarioEntrando);
    } else {
        invalido();
    }
});

function invalido() {
    showToast("Usuario ou senha incorretos ");
}




//Ação do botão Recuperar
$('#RecuperarSenha').click(function resetarSenha() {

    alert('recuperar');
});


//IMPLEMENTAÇÃO DAS AÇOES DA 4 ABA LOGIN, CADASTRO E ATUALIZAÇÕES

function criarTela(UsuarioLogado) {   
        $('#tela-login').removeClass('page-active');
        $('#tela-usuario-principal').addClass('page-active');
        $('#tela_servicos').addClass('page-active');
        $('#tela-servicos-off').removeClass('page-active');
        
        $('#PUserImagem').html('');
        
        $('#PUserName').html('<ul class="demo-list-icon mdl-list"><li class="mdl-list__item"> <span class="mdl-list__item-primary-content"> <i class="material-icons mdl-list__item-icon">person</i>@' + this.UsuarioLogado.nomeUsuario + '</span> </li></ul>' +
            '<ul class="demo-list-icon mdl-list"><li class="mdl-list__item"> <span class="mdl-list__item-primary-content"> <i class="material-icons mdl-list__item-icon">perm_identity</i>' + this.UsuarioLogado.nomePessoa + '</span> </li></ul>' +
            '<ul class="demo-list-icon mdl-list"><li class="mdl-list__item"> <span class="mdl-list__item-primary-content"> <i class="material-icons mdl-list__item-icon">email</i>' + this.UsuarioLogado.email + '</span> </li></ul>'+
            '<ul class="demo-list-icon mdl-list"><li class="mdl-list__item"> <span class="mdl-list__item-primary-content"> <i class="material-icons mdl-list__item-icon">contact_phone</i>' + this.UsuarioLogado.celular + '</span> </li></ul>' +
            '<ul class="demo-list-icon mdl-list"><li class="mdl-list__item"> <span class="mdl-list__item-primary-content"> <i class="material-icons mdl-list__item-icon">place</i>Rua: ' + this.UsuarioLogado.endereco_rua + '<br> Estado: ' + this.UsuarioLogado.endereco_estado + '<br> Cidade: ' + this.UsuarioLogado.endereco_cidade + '<br> CEP: ' + this.UsuarioLogado.endereco_cep + '</span > </li ></ul > ');
        procurarMeusServicos(this.UsuarioLogado.id_pessoa);
        UsuarioLogado = this.UsuarioLogado;
}

$('#btnSair').click(function reload() {
    location.reload();
})


//FUNÇÃO DE TOAST UNIVELSAL
function showToast(mensagem) {

    window.plugins.toast.show(mensagem, 'long', 'center');

}