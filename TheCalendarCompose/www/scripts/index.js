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

//IMPLEMENTAÇÃO DAS AÇOES DA 4 ABA LOGIN, CADASTRO E ATUALIZAÇÕES

//Ação do botão Cadastrar Cadastrar Usuario
$("#EnviarCadastro").click(function inserirRegistros() {

    var NovoConsumidor = {};

    NovoConsumidor.nomeUsuario = $('#NomeUsuario').val();
    NovoConsumidor.senha = $('#SenhaUsuario').val();
    NovoConsumidor.sexo = $('input[name=sex-options]:checked').val();
    NovoConsumidor.aniversario = $('#nascimentoUsuario').val();
    NovoConsumidor.NomeCompleto = $('#NomeCompleto').val();
    NovoConsumidor.Email = $('#EmailUsuario').val();
    NovoConsumidor.telefone = $('#CelularUsuario').val();
    NovoConsumidor.RuaUsuario = $('#RuaUsuario').val();
    NovoConsumidor.UF = $('#estado').val();
    NovoConsumidor.Cidade = $('#CidadeUsuario').val();
    NovoConsumidor.Cep = $('#CepUsuario').val();

    alert(NovoConsumidor.nomeUsuario + " , " + NovoConsumidor.senha + " , " + NovoConsumidor.sexo + " , " + NovoConsumidor.aniversario + " , " + NovoConsumidor.NomeCompleto + " , " + NovoConsumidor.Email + " , " + NovoConsumidor.telefone + " , " + NovoConsumidor.RuaUsuario + " , " + NovoConsumidor.UF + " , " + NovoConsumidor.Cidade + " , " + NovoConsumidor.Cep);
    
    if (validarCadastro(NovoConsumidor) == true) {

        alert("validado");
    }
                
});

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

        alert("Login");
 });

//Ação do botão Recuperar
$('#RecuperarSenha').click(function resetarSenha() {

    alert('recuperar');
});




//alert("connection Factory");
//connectionFactory();



//IMPLEMENTAÇÃO DAS AÇOES DA 4 ABA LOGIN, CADASTRO E ATUALIZAÇÕES

$('#AgendarServico').click(function agendarServico() {

    showToast("Agendar Servico");
  
});


function showToast(mensagem) {

    window.plugins.toast.show(mensagem, 'long', 'center');

}