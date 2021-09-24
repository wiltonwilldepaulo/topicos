function proximo_segundo() {
    var hoje = new Date
    var hora = hoje.getHours()
    var minutos = hoje.getMinutes()
    var segundos = hoje.getSeconds()
    relogio = document.getElementById('relogio')
    relogio.value = hora + ":" + minutos + ":" + segundos
    setTimeout('proximo_segundo()', 1000)
}
//ATUALIZA O RELOGIO DO GRÁFICO
proximo_segundo();
//FUNÇÃO DO GRÁFICO
function gafico(label, atendimento_em_aberto, atendimento_finalizado) {
    var ctx = document.getElementById('gfc_atendimento').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: label,
            datasets: [
                {
                    label: 'Atendimentos em aberto',
                    data: atendimento_em_aberto,
                    backgroundColor: [
                        '#d13624'
                    ],
                    borderColor: [
                        '#d13624'
                    ],
                    borderWidth: 2
                },
                {
                    label: 'Atendimentos finalizados',
                    data: atendimento_finalizado,
                    backgroundColor: [
                        '#00a65a'
                    ],
                    borderColor: [
                        '#00a65a'
                    ],
                    borderWidth: 2
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}
//FUNÇÃO ATUALIZA O GRÁFICO
function atualiza_dados() {
    var hoje = new Date
    var hora = hoje.getHours();
    var minutos = hoje.getMinutes();
    var segundos = hoje.getSeconds();
    //VARIAVEL DE LABEL ARAMAZENA O NOME DOS RESULTADOS
    var label = [hora + ':' + minutos + ':' + (parseInt(segundos) - 4), hora + ':' + minutos + ':' + (parseInt(segundos) - 4), hora + ':' + minutos + ':' + (parseInt(segundos) - 4), hora + ':' + minutos + ':' + (parseInt(segundos) - 4)];
    //NUMERO DE ATENDIMENTOS EM ABERTO
    var atendimento_em_aberto = [10, 75, 22, 102];
    //NUMERO DE ATENDIMENTOS FINALIZADOS
    var atendimento_finalizado = [208, 6, 177, 129];
    const formulario = document.getElementById('frmpainel');
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
            //AQUI DEVEMOS SUBSTITUIR OS VALORES DAS VARIAVEIS
            gafico(label, atendimento_em_aberto, atendimento_finalizado);
            //alert(label);
        },
        complete: function () {
            //AQUI DEVEMOS CHAMAR A FUNÇÃO COM OS VALORES ATUALIZADOS.
            gafico(label, atendimento_em_aberto, atendimento_finalizado);
            //alert(label);
        }
    });
}
//CHAMA A FUNÇÃO QUE ATUALIZA OS VALOR DO GRAFICO A 
//CADA 3 SEGUNDOS.
var intervalo = window.setInterval(function () {
    //A FUNÇÃO IRÁ CONSULTAR NO BANCO DE DADOS, TODOS OS ATENDIMENTO
    //REALIZADO DAS ULTIMAS 24 HORAS CONTANDO APARTIR,
    //DA HORA MINUTOS E SENGUNDO ATUAL 
    atualiza_dados();
}, 5000);



