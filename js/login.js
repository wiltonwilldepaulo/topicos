$(document).ready(function () {
  $("#btnsalvasenha").click(function () {
    let edtacao = document.querySelector("#edtacao");
    let edtsenha = document.querySelector("#edtsenha");
    let acao = edtacao.value;
    edtacao.value = 'us';
    edtsenha.value = '**********';
    if ($('#frmlogin').valid() == true) {
      edtsenha.value = '';
      $.ajax({
        url: 'controlelogin.php',
        type: 'post',
        data: $("#frmlogin").serialize(),
        beforeSend: function () {
          document.getElementById('alert').className = 'callout callout-info small';
          document.getElementById("progresso").className = 'progress';
          document.getElementById("msg").innerHTML = 'Alterando sua senha aguarde...';
          $('#edtcodigologin').attr("disabled", true);
          $('#edtnovasenha').attr("disabled", true);
        },
        success: function (data) {
          edtacao.value = 'l';
          if (data == "true") {
            document.getElementById('alert').className = 'callout callout-success small';
            document.getElementById("progresso").className = 'progress d-none';
            document.getElementById("msg").innerHTML = 'Senha alterada com sucesso!';
            setTimeout(function () {
              window.location.replace('login');
            }, 2000);
          } else {
            document.getElementById('alert').className = 'callout callout-danger small';
            document.getElementById('progresso').className = 'progress d-none';
            document.getElementById("msg").innerHTML = data;
            setTimeout(function () {
              document.getElementById('alert').className = 'callout callout-warning small';
              document.getElementById("progresso").className = 'progress d-none';
              document.getElementById("msg").innerHTML = 'Campos sinalizados com * são obrigatórios!';
              $('#edtcodigo').attr("disabled", false);
              $('#edtnovasenha').attr("disabled", false);
            }, 5000);
          }
        },
        complete: function () {
          edtacao.value = acao;
          $('#edtcodigo').attr("disabled", false);
          $('#edtnovasenha').attr("disabled", false);
        }
      });
    }
  });
  $("#btnalterarsenha").click(function () {
    let email = document.querySelector("#edtlogin");
    let acao = document.querySelector("#edtacao");
    if (email.value) {
      acao.value = 'a';
      $.ajax({
        url: 'controlelogin.php',
        type: 'post',
        data: $("#frmlogin").serialize(),
        beforeSend: function () {
          document.getElementById('alert').className = 'callout callout-info small';
          document.getElementById("progresso").className = 'progress';
          document.getElementById("msg").innerHTML = 'Gerando código de autenticação!';
          $('#edtcodigo').attr("disabled", true);
          $('#edtnovasenha').attr("disabled", true);
        },
        success: function (data) {
          if (data == "true") {
            document.getElementById('alert').className = 'callout callout-info small';
            document.getElementById("progresso").className = 'progress d-none';
            document.getElementById("msg").innerHTML = 'Insira o código que enviamos para o e-mail ' + document.querySelector("#edtlogin").value + ' e crie uma nova senha.';
            $('#edtcodigo').attr("disabled", false);
            $('#edtnovasenha').attr("disabled", false);
          } else {
            document.getElementById('alert').className = 'callout callout-info small';
            document.getElementById("progresso").className = 'progress d-none';
            document.getElementById("msg").innerHTML = 'Falha ao enviar o código para o e-mail ' + document.querySelector("#edtlogin").value;
            $('#edtcodigo').attr("disabled", false);
            $('#edtnovasenha').attr("disabled", false);
          }
        },
        complete: function () {
          acao.value = 'l';
        }
      });
    } else {
      document.getElementById('alerta').className = 'callout callout-danger small';
      document.getElementById('palerta').className = 'progress d-none';
      document.getElementById("malerta").innerHTML = 'Preciso saber a conta de email para alterar a senha!';
      email.focus();
      setTimeout(function () {
        document.getElementById('alerta').className = 'callout callout-warning small';
        document.getElementById('palerta').className = 'progress d-none';
        document.getElementById("malerta").innerHTML = 'Campos sinalizados com * são obrigatórios!';
      }, 10000);
      return false;
    }
  });
  $('#frmlogin').validate({
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
  $("#btnsenha").click(function () {
    document.getElementById('iconesenha').className = 'fas fa-eye-slash';
    document.getElementById('edtsenha').type = 'text';
    setTimeout(function () {
      document.getElementById('iconesenha').className = 'fas fa-eye';
      document.getElementById('edtsenha').type = 'password';
    }, 3000);
  });
  $("#btnalterasenha").click(function () {
    document.getElementById('iconealterasenha').className = 'fas fa-eye-slash';
    document.getElementById('edtnovasenha').type = 'text';
    setTimeout(function () {
      document.getElementById('iconealterasenha').className = 'fas fa-eye';
      document.getElementById('edtnovasenha').type = 'password';
    }, 3000);
  });
  $("#btnlogin").click(function () {

    if ($('#frmlogin').valid() == true) {
      $.ajax({
        url: 'controlelogin.php',
        type: 'post',
        data: $("#frmlogin").serialize(),
        beforeSend: function () {
          document.getElementById('alerta').className = 'callout callout-info small';
          document.getElementById("malerta").innerHTML = 'Autenticando!';
          document.getElementById('palerta').className = 'progress';
          $('#btnlogin').attr("disabled", true);
          $('#edtsenha').attr("disabled", true);
          $('#edtlogin').attr("disabled", true);
        },
        success: function (data) {
          if (data == "1" || data == "2") {
            document.getElementById('alerta').className = 'callout callout-success small';
            document.getElementById("malerta").innerHTML = 'Seja bem-vindo de volta!';
            document.getElementById('palerta').className = 'progress d-none';
            setTimeout(function () {
              window.location.replace('painel');
            }, 1000);
          } else {
            document.getElementById('alerta').className = 'callout callout-danger small';
            document.getElementById("malerta").innerHTML = 'Usuário ou senha inválido!';
            document.getElementById('palerta').className = 'progress d-none';
            $('#btnlogin').attr("disabled", false);
            $('#edtsenha').attr("disabled", false);
            $('#edtlogin').attr("disabled", false);
            setTimeout(function () {
              document.getElementById('alerta').className = 'callout callout-warning small';
              document.getElementById("malerta").innerHTML = 'Campos sinalizados com * são obrigatórios!';
              document.getElementById('palerta').className = 'progress d-none';
            }, 5000);
          }
        }
      });
    } else {
      document.getElementById('alerta').className = 'callout callout-danger small';
      document.getElementById('palerta').className = 'progress d-none';
      document.getElementById("malerta").innerHTML = 'Informe todos os campo requeridos para o login!';
      $('#btnlogin').attr("disabled", false);
      $('#edtsenha').attr("disabled", false);
      $('#edtlogin').attr("disabled", false);
      setTimeout(function () {
        document.getElementById('alerta').className = 'callout callout-warning small';
        document.getElementById('palerta').className = 'progress d-none';
        document.getElementById("malerta").innerHTML = 'Campos sinalizados com * são obrigatórios!';
      }, 10000);
    }
  });
});