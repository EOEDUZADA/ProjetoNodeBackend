/*
  Warnings:

  - You are about to drop the `funcionario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `funcionario`;

-- CreateTable
CREATE TABLE `Produto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,
    `quantidade` VARCHAR(191) NOT NULL,
    `valor` DOUBLE NOT NULL,
    `proprietario_id` INTEGER NOT NULL,

    UNIQUE INDEX `Produto_quantidade_key`(`quantidade`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Proprietario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Proprietario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_proprietario_id_fkey` FOREIGN KEY (`proprietario_id`) REFERENCES `Proprietario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
