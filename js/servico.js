$(document).ready(function () {
    //Mascaras monetarias.
    $('#edtvalor').inputmask('decimal', {
        'alias': 'numeric',
        'groupSeparator': '.',
        'autoGroup': true,
        'digits': 2,
        'radixPoint': ',',
        'digitsOptional': true,
        'allowMinus': true,
        'prefix': 'R$ ',
        'placeholder': ''
    });
    $('#frmservico').validate({
        rules: {
            agree: "required"
        },
        errorElement: 'span',
        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        }
    });
    $("#btnsalvar").click(function () {
        let valida = $('#frmservico').valid();
        // let acao = document.getElementById("edtacao");
        if (valida == true) {
            let acao = document.getElementById("edtacao");
            const formulario = document.getElementById('frmservico');
            // Instância o FormData passando como parâmetro o formulário
            const formData = new FormData(formulario);
            $('html, body').animate({ scrollTop: 0 }, 800);
            $.ajax({
                type: "post",
                url: "controleservico.php",
                data: formData,
                //dataType: 'json',
                processData: false,
                contentType: false,
                beforeSend: function () {
                    $("input, button, textarea").attr("disabled", true);
                    document.getElementById("alerta").className = 'callout callout-success  small';
                    document.getElementById("malerta").innerHTML = "Enviando dados...";
                    document.getElementById("palerta").className = 'progress';
                },
                success: function (data) {
                    if (data != 'Falha no cadastro') {
                        document.getElementById('alerta').className = 'callout callout-success small';
                        document.getElementById('palerta').className = 'progress d-none';
                        if (acao.value == 'c') {
                            document.getElementById("malerta").innerHTML = 'Cadastro realizado com sucesso!';
                            setTimeout(function () {
                                window.location.replace('listaservico');
                            }, 1000);
                        } else {
                            document.getElementById("malerta").innerHTML = 'Alterações realizado com sucesso!';
                            setTimeout(function () {
                                window.location.replace('listaservico');
                            }, 1000);
                        }
                    } else {
                        document.getElementById('alerta').className = 'callout callout-success small';
                        document.getElementById('palerta').className = 'progress d-none';
                        document.getElementById("malerta").innerHTML = data;
                    }
                },
                complete: function () {
                    $("input, button, textarea").attr("disabled", false);
                }
            });
        }
    });


});