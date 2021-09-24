<?php
include_once 'Conexao.class.php';
include_once 'Crud.class.php';

class Aluno extends Crud
{
    private $nome;
    private $email;
    private $whatsapp;
    private $data_colacao;
    private $ativo;
    protected $tabela = 'aluno';

    public function pesquisa($campo, $valor)
    {
        $sql = "SELECT * FROM $this->tabela WHERE $campo = :valor";
        $stmt = Conexao::prepare($sql);
        $stmt->bindParam(':valor', $valor, PDO::PARAM_STR);
        $stmt->execute();
        return $stmt->fetch();
    }

    /**
     * Inserirmos um novo registro ao banco de dados
     *
     * @return  self
     */
    public function insert()
    {
        $sql = "INSERT INTO $this->tabela (NOME,EMAIL,WHATSAPP,DATA_COLACAO,ATIVO) VALUES (:NOME,:EMAIL,:WHATSAPP,:DATA_COLACAO,:ATIVO);";
        $stmt = Conexao::prepare($sql);
        $stmt->bindParam(':NOME', $this->nome,   PDO::PARAM_STR);
        $stmt->bindParam(':EMAIL', $this->email,   PDO::PARAM_STR);
        $stmt->bindParam(':WHATSAPP', $this->whatsapp,   PDO::PARAM_STR);
        $stmt->bindParam(':DATA_COLACAO', $this->data_colacao,   PDO::PARAM_STR);
        $stmt->bindParam(':ATIVO', $this->ativo,   PDO::PARAM_STR);
        try {
            if ($stmt->execute()) {
                return "true";
            } else {
                return "false";
            }
        } catch (Exception $e) {
            switch ($e->getCode()) {
                case 23000:
                    return 'Cliente ja cadastrado!';
                    break;
                default:
                    return 'Falha no cadastro ' . $e->getMessage() . "!";
                    break;
            }
        }
    }
    /**
     * Deletar o regitro com esta função deve ser passado o código do regitro por parâmetro.
     *
     * @return  self
     */
    public function deleta($id)
    {
        $sql = "DELETE FROM $this->tabela WHERE IDALUNOE = :ID";
        $stmt = Conexao::prepare($sql);
        $stmt->bindParam(':ID', $id);
        if ($stmt->execute()) {
            return "true";
        } else {
            return "false";
        }
    }
    /**
     * Atualizamos o cadastro deve ser passados o campo e a condição Ex. ID = 1
     *
     * @return  self
     */
    public function update($campo, $id)
    {
        $sql = "UPDATE $this->tabela SET NOME = :NOME, EMAIL = :EMAIL, WHATSAPP = :WHATSAPP, DATA_PAGAMENTO = :DATA_PAGAMENTO, ATIVO = :ATIVO WHERE IDCLIENTE = :ID;
        ";
        $stmt = Conexao::prepare($sql);
        $stmt->bindParam(':NOME', $this->nome,   PDO::PARAM_STR);
        $stmt->bindParam(':EMAIL', $this->email,   PDO::PARAM_STR);
        $stmt->bindParam(':WHATSAPP', $this->whatsapp,   PDO::PARAM_STR);
        $stmt->bindParam(':DATA_PAGAMENTO', $this->data_pagamento,   PDO::PARAM_STR);
        $stmt->bindParam(':ATIVO', $this->ativo,   PDO::PARAM_STR);
        $stmt->bindParam(':ID', $id);
        try {
            if ($stmt->execute()) {
                return "true";
            } else {
                return "false";
            }
        } catch (Exception $e) {
            switch ($e->getCode()) {
                case 23000:
                    return 'Cliente já cadastrado!';
                    break;
                default:
                    return 'Falha ao atualizar ' . $e->getMessage() . "!";
                    break;
            }
        }
    }
    public function id()
    {
        $sql = "SELECT MAX(IDALUNO) AS ID FROM $this->tabela ";
        $stmt = Conexao::prepare($sql);
        $stmt->execute();
        return $stmt->fetch();
    }


    /**
     * Get the value of ativo
     */
    public function getAtivo()
    {
        return $this->ativo;
    }

    /**
     * Set the value of ativo
     *
     * @return  self
     */
    public function setAtivo($ativo)
    {
        $this->ativo = $ativo;

        return $this;
    }

    /**
     * Get the value of data_colacao
     */
    public function getData_colacao()
    {
        return $this->data_pagamento;
    }

    /**
     * Set the value of data_colacao
     *
     * @return  self
     */
    public function setData_colacao($data_colacao)
    {
        $this->data_colacao = $data_colacao;

        return $this;
    }

    /**
     * Get the value of whatsapp
     */
    public function getWhatsapp()
    {
        return $this->whatsapp;
    }

    /**
     * Set the value of whatsapp
     *
     * @return  self
     */
    public function setWhatsapp($whatsapp)
    {
        $this->whatsapp = $whatsapp;

        return $this;
    }

    /**
     * Get the value of email
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set the value of email
     *
     * @return  self
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get the value of nome
     */
    public function getNome()
    {
        return $this->nome;
    }

    /**
     * Set the value of nome
     *
     * @return  self
     */
    public function setNome($nome)
    {
        $this->nome = $nome;

        return $this;
    }
}
