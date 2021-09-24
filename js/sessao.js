function finalizar_sessao() {
  $("#btnsair").click(function() {
    $.ajax({
      url: 'controlelogin.php',
      type: 'post',
      data: { edtacao: "s" },
      success: function(data) {
        window.location.replace('login');
      }
    });
  });
}