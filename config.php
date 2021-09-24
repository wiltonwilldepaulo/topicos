<?php
if (session_status() !== PHP_SESSION_ACTIVE) :
    session_start();
endif;
#FAZEMOS O AUTOLOAD DAS NOSSAS CLASSES
function __autoload($nomeClasse)
{
    include_once './classes/' . $nomeClasse . '.class.php';
}
$modulo = Url::getURL(0);
//SETAMOS COMO DEFAULT O TIME ZONE DE PORTO VELHO.
date_default_timezone_set('America/Porto_Velho');
function dateConvert($dateSql)
{
    $ano = substr($dateSql, 6);
    $mes = substr($dateSql, 3, -5);
    $dia = substr($dateSql, 0, -8);
    return $ano . "-" . $mes . "-" . $dia;
}
//constantes do projeto
define('EMAIL', [
    "host" => "",
    "port" => 465,
    "usuario" => "",
    "senha" => ""
]);

define('PROJETO', 'atron');
define('ICONE', 'imagens/icone.svg');
define('BASE_URL', 'https://localhost/');
define('HOME', BASE_URL . 'home');
define('LOGIN', BASE_URL . 'login');
define('URL', BASE_URL);
define('BUSCA', BASE_URL . 'busca');
define('ERRO', BASE_URL . '404');
define('EMPRESA', 'Sua empresa');
if ($modulo == null or $modulo == '')
    echo "<script>window.location.replace('" . HOME . "');</script>";
if (file_exists($modulo . ".php")) :
    include_once __DIR__ . DIRECTORY_SEPARATOR . $modulo . '.php';
else :
//echo "<script>window.location.replace('404.php');</script>";
endif;
