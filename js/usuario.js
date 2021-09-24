$("#edtcpf").inputmask({
  mask: ['999.999.999-99', '99.999.999/9999-99'],
  keepStatic: true
});
$("#edttelefone").inputmask('(99) 99999-9999');
$(document).ready(function() {
  $("#btnsalvar").click(function() {
    $('#frmusuario').validate({
      errorElement: 'span',
      errorPlacement: function(error, element) {
        error.addClass('invalid-feedback');
        element.closest('.form-group').append(error);
      },
      highlight: function(element, errorClass, validClass) {
        $(element).addClass('is-invalid');
      },
      unhighlight: function(element, errorClass, validClass) {
        $(element).removeClass('is-invalid');
      }
    });
    var valida = $('#frmusuario').valid();
    if (valida == true) {
      $.ajax({
        url: "controleusuario.php",
        type: "POST",
        data: $("#frmusuario").serialize(),
        beforeSend: function() {
          document.getElementById("alerta").className = 'callout callout-info  small';
          document.getElementById("malerta").innerHTML = "Enviando dados...";
          document.getElementById("palerta").className = 'progress';

        },
        success: function(data) {
          if (data == 'true') {
            setTimeout(function() {
              document.getElementById("alerta").className = 'callout callout-success small';
              document.getElementById("malerta").innerHTML = "Cadastro realisado com sucesso!";
              document.getElementById("palerta").className = 'progress';
              location.replace("listausuario");
            }, 3000);
          } else {
            document.getElementById("alerta").className = 'callout callout-danger small';
            document.getElementById("malerta").innerHTML = " Falha no cadastro!";
            document.getElementById("palerta").className = 'progress d-none';
          }
        }
      });
    }
  });

  $('#isenha').click(function() {
    var isenha = $("#edtsenha").attr('type');
    if (isenha == 'password') {
      $("#edtsenha").attr("type", "text");
      document.getElementById("isenha").className = "fa fa-eye-slash";
      //após 3 segundo o input retornará as suas configurações iniciais.
      setTimeout(function() {
        $("#edtsenha").attr("type", "password");
        document.getElementById("isenha").className = "fa fa-eye";
      }, 6000);
    } else {
      $("#edtsenha").attr("type", "text");
      document.getElementById("isenha").className = "fa fa-eye-slash";
      //após 3 segundo o input retornará as suas configurações iniciais.
      setTimeout(function() {
        $("#edtsenha").attr("type", "password");
        document.getElementById("isenha").className = "fa fa-eye";
      }, 100);
    }
  });

});