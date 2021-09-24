<?php

class Conexao
{

    public function __construct()
    {
    }
    public static function open($name)
    {
        if (file_exists("./{$name}.ini")) {
            $db = parse_ini_file("./{$name}.ini");
        } else {
            throw new Exception("Arquivo '$name' nao encontrado");
        }
        $usuario    = isset($db['user']) ? $db['user'] : NULL;
        $senha      = isset($db['pass']) ? $db['pass'] : NULL;
        $banco      = isset($db['name']) ? $db['name'] : NULL;
        $servidor   = isset($db['host']) ? $db['host'] : NULL;
        $conexao    = isset($db['type']) ? $db['type'] : NULL;
        $porta      = isset($db['port']) ? $db['port'] : NULL;
        switch ($conexao) {
            case 'pgsql':
                $conn = new PDO("pgsql:dbname={$banco}; user={$usuario}; "
                    . "password={$senha};host=$servidor;port={$porta}");
                break;
            case 'mysql':
                $conn = new PDO(
                    "mysql:host={$servidor};port={$porta};dbname={$banco}",
                    $usuario,
                    $senha,
                    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")
                );
                break;
            case 'sqlite':
                $conn = new PDO("sqlite:{$banco}");
                break;
            case 'ibase':
                $conn = new PDO("firebird:dbname={$name}", $usuario, $senha);
                break;
            case 'mssql':
                $conn = new PDO(
                    "mssql:host={$servidor},{$porta};dbname={$banco}",
                    $usuario,
                    $senha
                );
                break;
        }
        $conn->setAttribute(
            PDO::ATTR_ERRMODE,
            PDO::ERRMODE_EXCEPTION
        );
        $conn->setAttribute(
            PDO::ATTR_DEFAULT_FETCH_MODE,
            PDO::FETCH_OBJ
        );
        return $conn;
    }
    public static function prepare($sql)
    {
        return self::open('dadosconexao')->prepare($sql);
    }
}
