//Função que troca as telas
function alterarTela() {
    $('.targetPage').click(function () {
        var target = $(this).attr('dt-page');
        $('.page').removeClass('page-active');
        $(target).addClass('page-active');
        alert(target);
    });
    }

alterarTela();

    (function () {
            'use strict';
        window['counter'] = 0;
        var snackbarContainer = document.querySelector('#demo-toast-example');
        var showToastButton = document.querySelector('#demo-show-toast');
        showToastButton.addEventListener('click', function () {
                'use strict';
                var data = {message: 'Example Message # ' + ++counter };
                    snackbarContainer.MaterialSnackbar.showSnackbar(data);
        });
}());
