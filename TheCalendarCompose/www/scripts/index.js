//Variaveis de usuario
UsuarioLogado = new Usuario();

//alert(user1.nomeUsuario);
// Funções da aplicação
   // document.addEventListener("deviceready", connectionFactory, false);


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

            '<button class="mdl-button mdl-js-button mdl-js-ripple-effect" id="servico[' + ListaServicos[i].idServico + ']" name="btnEditar" onclick="editarServico(' + ListaServicos[i].idServico + ',' + ListaServicos[i].idPrestador + ',' + ("'" + ListaServicos[i].nomeServico + "'") + ',' + ("'" + ListaServicos[i].descricao_servico + "'") + ',' + ("'" + ListaServicos[i].categoria + "'") + ',' + ListaServicos[i].valor_servico + ',' + ListaServicos[i].servico_ativo + ')">' +
            '<i class="material-icons">build</i> Editar' +
            '</button>' +

            '<button class="mdl-button mdl-js-button mdl-js-ripple-effect" name="btnDeletar" onclick="deletarServico(' + ListaServicos[i].idServico + ')">' +
            '<i id="iconDetalhes" class="material-icons">delete_forever</i> Excluir' +
            '</button></div></div></div>');
    }


}

function editarServico(idServico, idPrestador, nomeServico, descricao_servico, categoria, valor_servico, servico_ativo, imagem) {
    
    $('#tela_servicos').removeClass('page-active');
    $('#tela-cadastro-servico').addClass('page-active');
    
    $('#NomeNovoServico').val(nomeServico);
    $('#descricaoNovoServico').val(descricao_servico);
    $('#ValorNovoServico').val(valor_servico);
    $('#categoriaNovoServico').val(categoria);

    $('#btnCadastrarNovoServico').click(function deletarAnterior() {
        deletarServico(idServico);
    });
    
}




//FUNÇÃO PARA A INSERÇÃO DE UM NOVO SERVICO
$('#btnCadastrarNovoServico').click(function inserirNovoServico(){
    var novoServico = new Servico();
    
    novoServico.idPrestador = UsuarioLogado.id_pessoa;
    novoServico.nomeServico = $('#NomeNovoServico').val();
    novoServico.descricao_servico = $('#descricaoNovoServico').val();
    novoServico.valor_servico = $('#ValorNovoServico').val();
    novoServico.servico_ativo = true;
    novoServico.categoria = $('#categoriaNovoServico').val();
    novoServico.imagem = document.getElementById('imagemNovoServico').files[0];

    if (ValidarServico(novoServico) == true) {
        adicionarServico(novoServico);
        //showToast("Adiconado com Sucesso !");
        $('#tela-cadastro-servico').removeClass('page-active');
        criarTela(UsuarioLogado);
    }

});


//Função para validar os campos do serviço a ser adicionado
function ValidarServico(novoServico) {
       
    if (novoServico.nomeServico == '') {
        showToast("Insira um nome");
        return false;
    } else if (novoServico.descricao_servico == '') {
        showToast("Insira uma descrição")
        return false;
    } else if (novoServico.valor_servico == '' || novoServico.valor_servico == 0) {
        showToast("Insira o valor do serviço");
        return false;
    } else if (novoServico.categoria == '') {
        showToast("Insira uma categoria");
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

    alert(NovoConsumidor.nomeUsuario + " , " + NovoConsumidor.senha + " , " + NovoConsumidor.sexo + " , " + NovoConsumidor.aniversario + " , " + NovoConsumidor.nomePessoa + " , " + NovoConsumidor.Email + " , " + NovoConsumidor.telefone + " , " + NovoConsumidor.RuaUsuario + " , " + NovoConsumidor.UF + " , " + NovoConsumidor.Cidade + " , " + NovoConsumidor.Cep);
    
    if (validarCadastro(NovoConsumidor) == true) {
        inserirUsuario(NovoConsumidor);
        showToast("Validado");
        $('#tela-cadastro').removeClass('page-active');
        $('#tela-login').addClass('page-active');
    }
                
});

//validarCadastro: ultilizado para impedir que seja realizado cadastros sem nunhuma informação
function validarCadastro(NovoConsumidor) {

    if (NovoConsumidor.nomeUsuario == '') {
        return false;
    } else if (NovoConsumidor.senha != $('#SenhaUsuarioConfirma').val()) {
        showToast("Senhas não Concidem");
        return false;
    } else if (NovoConsumidor.aniversario == '') {
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

    var UsuarioEntrando = new Usuario();

    UsuarioEntrando.nomeUsuario = $('#user').val();
    UsuarioEntrando.senha = $('#pass').val();

    if (UsuarioEntrando.nomeUsuario != '' || UsuarioEntrando.senha != '') {
        login(UsuarioEntrando);
    }
});

function invalido() {
    showToast("usuario ou senha incorretos ");
}




//Ação do botão Recuperar
$('#RecuperarSenha').click(function resetarSenha() {

    alert('recuperar');
});


//IMPLEMENTAÇÃO DAS AÇOES DA 4 ABA LOGIN, CADASTRO E ATUALIZAÇÕES

$('#AgendarServico').click(function agendarServico() {

    showToast("Agendar Servico");
  
});

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