//Função que troca as telas
function alterarTela() {
    $('.targetPage').click(function () {
        var target = $(this).attr('dt-page');
        $('.page').removeClass('page-active');
        $(target).addClass('page-active');
    });
}

alterarTela();