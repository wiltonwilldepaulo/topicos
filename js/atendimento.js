function atualiza_servico() {
    const acao = document.querySelectorAll("#edtacao");
    let act = acao.value;
    acao.value = "ls";
    const formulario = document.getElementById('frmatendimento');
    // Instância o FormData passando como parâmetro o formulário
    const formData = new FormData(formulario);
    $.ajax({
        type: "post",
        url: "controleatendimento.php",
        data: formData,
        //dataType: 'json',
        processData: false,
        contentType: false,
        success: function (response) {
            document.getElementById("listaservico").innerHTML = response;
        },
        complete: function () {
            document.getElementById("salvandoservico").className = "d-none";
            document.getElementById("listaservico").className = "";
            acao.value = act;
        }
    });
}
function controle_form(ativo = true) {
    if (ativo === true) {
        $('button, input, select, textarea, a').attr("disabled", false);
    } else {
        $('button, input, select, textarea, a').attr("disabled", true);
    }
}
function salva_atendimento() {
    const formulario = document.getElementById("frmatendimento");
    // Instância o FormData passando como parâmetro o formulário
    const formData = new FormData(formulario);
    let id = document.querySelector("#edtid");
    let acao = document.querySelector("#edtacao");
    if (id.value == "") {
        $.ajax({
            type: "post",
            url: "controleatendimento.php",
            data: formData,
            //dataType: 'json',
            processData: false,
            contentType: false,
            success: function (response) {
                if (response != "false") {
                    //ADICIONAMOS ID DO DO ATENDIMENTO A URL.
                    window.history.pushState('Object', 'Categoria JavaScript', 'atendimento?id=' + response);
                    //ALTERAMOS O VALOR COM CAMPO ID.
                    if ((response != "true") && (response != "false")) {
                        id.value = response;
                    }
                    return "true";
                } else {
                    document.getElementById("alerta").className = 'callout callout-danger small';
                    document.getElementById("malerta").innerHTML = " Falha no do atendimento cadastro!";
                    document.getElementById("palerta").className = 'progress d-none';
                    return "false";
                }
            },
            complete: function () {
                controle_form(true);
            }
        });
    } else {
        acao.value = 'e';
        $.ajax({
            type: "post",
            url: "controleatendimento.php",
            data: formData,
            //dataType: 'json',
            processData: false,
            contentType: false,
            success: function (response) {
                acao.value = "ls";
                if (response != "false") {
                    return "true";
                } else {
                    document.getElementById("alerta").className = 'callout callout-danger small';
                    document.getElementById("malerta").innerHTML = " Falha no do atendimento cadastro!";
                    document.getElementById("palerta").className = 'progress d-none';
                    return "false";
                }
            },
            complete: function () {
                $('html, body').animate({ scrollTop: 0 }, 'slow');
                document.getElementById('alerta').className = 'callout callout-success';
                document.getElementById('palerta').className = 'progress d-none';
                document.getElementById("malerta").innerHTML = 'Cadastro reliazado com sucesso!';
                controle_form(false);
                link = 'relatorio?id=' + document.getElementById("edtid").value;
                if (document.getElementById("edtstatus").value == "2") {
                    window.open(link, '_blank');
                }
                setTimeout(function () {
                    window.location.replace('listaatendimento');
                }, 1000);
            }
        });
    }
}
function salva_servico() {
    let id = document.querySelector("#edtid");
    const formulario = document.getElementById('frmatendimento');
    // Instância o FormData passando como parâmetro o formulário
    const formData = new FormData(formulario);
    let acao = document.querySelector("#edtacao");
    if (id.value != "") {
        $.ajax({
            type: "post",
            url: "controleatendimento.php",
            data: formData,
            //dataType: 'json',
            processData: false,
            contentType: false,
            beforeSend: function () {
                document.getElementById("salvandoservico").className = "";
                document.getElementById("listaservico").className = "d-none";
            },
            success: function (response) {
                acao.value = "ls";
                atualiza_servico();
                if (response != "false") {
                    if ((response != "true") && (response != "false")) {
                        document.getElementById("edtid").value = response;
                    }
                } else {
                    document.getElementById("alerta").className = 'callout callout-danger small';
                    document.getElementById("malerta").innerHTML = " Falha no do atendimento cadastro!";
                    document.getElementById("palerta").className = 'progress d-none';
                }
            }
        });
    }
}
function busca_servico() {
    const formulario = document.getElementById("frmatendimento");
    // Instância o FormData passando como parâmetro o formulário
    const formData = new FormData(formulario);
    let servico = document.querySelector("#edtservico");
    let valorbruto = document.querySelector("#edtservicovalorbruto");
    let valorliquido = document.querySelector("#edtservicovalorliquido");
    let desconto = document.querySelector("#edtservicovalordesconto");
    if (servico.value !== "") {
        $.ajax({
            type: "post",
            url: "controleatendimento.php",
            data: formData,
            //dataType: 'json',
            processData: false,
            contentType: false,
            beforeSend: function () {
                $('#btnsalvarservico').attr("disabled", true);
                document.getElementById("edtservicovalorbruto").value = '0';
                document.getElementById("edtservicovalordesconto").value = '0';
                document.getElementById("edtservicovalorliquido").value = '0';
            },
            success: function (response) {
                if (response != "false") {
                    let json = JSON.parse(response);
                    valorbruto.value = json[0].VALOR;
                    valorliquido.value = json[0].VALOR;
                    desconto.value = '0';
                    desconto.focus();
                }
            },
            complete: function () {
                $('#btnsalvarservico').attr("disabled", false);
                $('#edtservicovalordesconto').focus();
            }
        });
    }
}
function calcula_total_liquido(total_bruto, desconto) {
    var TOTAL = parseFloat(total_bruto) - parseFloat(desconto);
    return TOTAL;
}
function deletar_servico(id) {
    document.getElementById("edtidservicoatendimento").value = id;
    let acao = document.getElementById("edtacao").value;
    document.getElementById("edtacao").value = "ds";
    if (id != "") {
        const formulario = document.getElementById('frmatendimento');
        // Instância o FormData passando como parâmetro o formulário
        const formData = new FormData(formulario);
        $.ajax({
            type: "post",
            url: "controleatendimento.php",
            data: formData,
            //dataType: 'json',
            processData: false,
            contentType: false,
            success: function (response) {
                $("#listaatendimento" + id).remove();
            },
            complete: function () {
                document.getElementById("edtacao").value = acao;
            }
        });
    }
}
$(document).ready(function () {
    //Mascaras monetarias.
    $("#edtservicovalordesconto").inputmask("decimal", {
        "alias": "numeric",
        "groupSeparator": ".",
        "autoGroup": true,
        "digits": 2,
        //"radixPoint": ".",
        "digitsOptional": true,
        "allowMinus": true
    });
    $("#edtservico").change(function (e) {
        e.preventDefault();
        let acao = document.querySelector('#edtacao');
        let valoracao = acao.value;
        acao.value = 'bs';
        busca_servico();
        acao.value = valoracao;
    });
    $("#edtservicovalordesconto").keypress(function (e) {
        let desconto = document.querySelector("#edtservicovalordesconto");
        let total_bruto = document.querySelector("#edtservicovalorbruto");
        let total_liquido = document.querySelector("#edtservicovalorliquido");
        if (
            (String(desconto.value) !== "") &&
            (String(total_bruto.value) !== "") &&
            (parseFloat(desconto.value) > 0) &&
            (parseFloat(total_bruto.value) > 0)
        ) {
            total_liquido.value = "0";
            total_liquido.value = calcula_total_liquido(total_bruto.value, desconto.value);
        } else {
            total_liquido.value = total_bruto.value;
        }
    });
    $('#frmatendimento').validate({
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
    //configuração expecifica de cada select.
    $('#edtsolicitante').select2({
        theme: "bootstrap",
        placeholder: "Selecione o solicitante",
        width: "resolve"
    });
    $('#edtcliente').select2({
        theme: "bootstrap",
        placeholder: "Selecione o cliente",
        width: "resolve"
    });
    $('#edtservico').select2({
        theme: 'bootstrap',
        placeholder: "Selecione o serviço",
        width: "resolve"
    });
    $("#btnsalvar").click(function (e) {
        var link;
        e.preventDefault();
        if ($("#frmatendimento").valid()) {
            if (
                (document.getElementById("edtid").value != "") &&
                (document.getElementById("edtacao").value == "e")
            ) {
                salva_atendimento();
                $('html, body').animate({ scrollTop: 0 }, 'slow');
                document.getElementById('alerta').className = 'callout callout-success';
                document.getElementById('palerta').className = 'progress d-none';
                document.getElementById("malerta").innerHTML = 'Cadastro reliazado com sucesso!';
                controle_form(false);
                link = 'relatorio?id=' + document.getElementById("edtid").value;
                if (document.getElementById("edtstatus").value == "2") {
                    window.open(link, '_blank');
                }
                setTimeout(function () {
                    window.location.replace('listaatendimento');
                }, 1000);
            } else {
                salva_atendimento();
            }
        }
    });
    $("#btnsalvarservico").click(function (e) {
        e.preventDefault();
        var valida = $('#frmatendimento').valid();
        if (valida == true) {
            let acao = document.querySelector("#edtacao");
            let id = document.querySelector("#edtid");
            const formulario = document.getElementById("frmatendimento");
            // Instância o FormData passando como parâmetro o formulário
            const formData = new FormData(formulario);
            //controle_form(false);//DESABILITAMOS TODOS OS CAMPOS.
            if ((acao.value != "c") && (id.value != "")) {
                acao.value = "cs";
                salva_servico();
            } else {
                acao.value = "c";
                $.ajax({
                    type: "post",
                    url: "controleatendimento.php",
                    data: formData,
                    //dataType: 'json',
                    processData: false,
                    contentType: false,
                    beforeSend: function () {
                        document.getElementById("salvandoservico").className = "";
                        document.getElementById("listaservico").className = "d-none";
                    },
                    success: function (response) {
                        if (response != "false") {
                            //ADICIONAMOS ID DO DO ATENDIMENTO A URL.
                            window.history.pushState('Object', 'Categoria JavaScript', 'atendimento?id=' + response);
                            //ALTERAMOS O VALOR COM CAMPO ID.
                            if ((response != "true") && (response != "false")) {
                                id.value = response;
                                acao.value = "cs";
                            }
                            return "true";
                        } else {
                            document.getElementById("alerta").className = 'callout callout-danger small';
                            document.getElementById("malerta").innerHTML = " Falha no do atendimento cadastro!";
                            document.getElementById("palerta").className = 'progress d-none';
                            alert(response);
                            return "false";
                        }
                    },
                    complete: function () {
                        salva_servico();
                    }
                });
            }
        }
    });
});