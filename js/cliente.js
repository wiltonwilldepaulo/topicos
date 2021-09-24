$("#edtwhatsapp").inputmask({
  mask: ['(99)9999.9999', '(99)9 9999-9999'],
  keepStatic: true
});
$("#edtliberacao").inputmask({
  mask: '99/99/9999'
});
$('#edtdatapagamento').datepicker({
  language: "pt-BR",
  autoclose: true
});

function deleta(codigo) {
  let acao = document.getElementById("edtacao");
  let id = document.getElementById("edtid");
  acao.value = 'd';
  id.value = codigo;
  const formulario = document.getElementById('frmcliente');
  // Instância o FormData passando como parâmetro o formulário
  const formData = new FormData(formulario);
  $.ajax({
    type: "post",
    url: "controlecliente.php",
    data: formData,
    //dataType: 'json',
    processData: false,
    contentType: false,
    success: function (data) {
      if (data == 'true') {
        $("#" + codigo).remove();
      }
    }
  });
}

$(document).ready(function () {
  $('#frmcliente').validate({
    rules: {
      edtimagems: {
        required: true,
        file: true,
      },
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
    let valida = $('#frmcliente').valid();
    // let acao = document.getElementById("edtacao");
    if (valida == true) {
      let acao = document.getElementById("edtacao");
      const formulario = document.getElementById('frmcliente');
      // Instância o FormData passando como parâmetro o formulário
      const formData = new FormData(formulario);
      $('html, body').animate({ scrollTop: 0 }, 800);
      $.ajax({
        type: "post",
        url: "controlecliente.php",
        data: formData,
        //dataType: 'json',
        processData: false,
        contentType: false,
        success: function (data) {
          if (data != 'Falha no cadastro') {
            document.getElementById('alerta').className = 'callout callout-success small';
            document.getElementById('palerta').className = 'progress d-none';
            if (acao.value == 'c') {
              document.getElementById("malerta").innerHTML = 'Cadastro realizado com sucesso!';
              setTimeout(function () {
                window.location.replace('listacliente');
              }, 1000);
            } else {
              document.getElementById("malerta").innerHTML = 'Alterações realizado com sucesso!';
              setTimeout(function () {
                window.location.replace('listacliente');
              }, 1000);
            }
          } else {
            document.getElementById('alerta').className = 'callout callout-success small';
            document.getElementById('palerta').className = 'progress d-none';
            document.getElementById("malerta").innerHTML = data;
          }
        }
      });
    }
  });
});