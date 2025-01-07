const express = require('express');
const myController = require('../controllers/myController');

const router = express.Router();


router.get('/listarProprietarios', myController.listarProprietarios);
router.post('/inserirProprietario', myController.inserirProprietario);
router.delete('/proprietario/deletar/:id', myController.deletarProprietario);
router.put('/proprietario/:id', myController.editarProprietario);

// **Novas rotas de pesquisa para proprietários**
router.get('/proprietarios/pesquisar/:nome', myController.pesquisarProprietarioPorNome); // Pesquisar proprietário por pedaço do nome
router.get('/proprietarios/maior-produtos', myController.pesquisarProprietarioMaiorNumeroProdutos); // Proprietário com o maior número de produtos

// Produtos (Products) CRUD operations
router.get('/produtos', myController.listarProdutos);
router.post('/inserirProduto', myController.inserirProduto);
router.delete('/produto/deletar/:id', myController.deletarProduto);
router.put('/editarProduto/:id', myController.editarProduto);

// **Novas rotas de pesquisa para produtos**
router.get('/produtos/maior-quantidade', myController.produtoMaiorQuantidade);
router.get('/produtos/maior-valor', myController.produtoMaiorValor);
router.get('/produtos/maior-valor-total', myController.produtoMaiorValorTotal);

module.exports = router;
