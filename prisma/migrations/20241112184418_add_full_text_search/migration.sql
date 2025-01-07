-- CreateIndex
CREATE FULLTEXT INDEX `Produto_descricao_quantidade_valor_proprietario_id_idx` ON `Produto`(`descricao`, `quantidade`, `valor`, `proprietario_id`);

-- CreateIndex
CREATE FULLTEXT INDEX `Proprietario_nome_email_idx` ON `Proprietario`(`nome`, `email`);
