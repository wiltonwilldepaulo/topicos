<?php

include_once 'Conexao.class.php';

abstract class Crud
{
    protected $tabela;
    abstract public function insert();
    abstract public function deleta($id);
    abstract public function update($campo, $id);
    public function busca($campo, $id)
    {
        $sql = "SELECT * FROM $this->tabela "
            . "WHERE $campo = :parametro";
        $stmt = Conexao::prepare($sql);
        $stmt->bindParam(':parametro', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch();
    }
    public function buscatudo()
    {
        $sql = "SELECT * FROM $this->tabela";
        $stmt = Conexao::prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll();
    }
}
