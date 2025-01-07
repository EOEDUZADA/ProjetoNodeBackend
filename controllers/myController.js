const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    // Proprietários 
    async listarProprietarios(req, res) {
        try {
            const proprietarios = await prisma.Proprietario.findMany();
            res.status(200).json({ message: "Proprietários listados com sucesso", data: proprietarios });
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Erro ao listar os proprietários", error: error.message });
        }
    },


    async listarProprietarioNome(req, res) {
        try {
            const proprietarios = await prisma.user.findMany({
                where: {
                    nome: {
                        endsWith: nome ,
                    },
                    posts: {
                        some: {
                            published: true,
                        },
                    },
                },
                include: {
                    posts: {
                        where: {
                            published: true,
                        },
                    },
                },
            })
            
            res.status(200).json({ message: "Proprietários listados com sucesso", data: proprietarios });
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Erro ao listar os proprietários", error: error.message });
        }
    },



    async inserirProprietario(req, res) {
        try {
            const { nome, email} = req.body;

           

            const novoProprietario = await prisma.Proprietario.create({
                data: {
                    nome,
                    email
                },
            });

            res.status(201).json({ message: "Proprietário criado com sucesso", data: novoProprietario });
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Erro ao criar proprietário", error: error.message });
        }
    },

    async deletarProprietario(req, res) {
        try {
            const { id } = req.params;
            const proprietario = await prisma.Proprietario.delete({
                where: { id: Number(id) }
            });

            res.status(200).json({ message: "Proprietário deletado com sucesso", data: proprietario });
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Erro ao deletar proprietário", error: error.message });
        }
    },

    async editarProprietario(req, res) {
        try {
            const { id } = req.params;
            const { nome, email } = req.body;

            

            const proprietario = await prisma.Proprietario.update({
                where: { id: Number(id) },
                data: {
                    nome,
                    email
                }
            });

            res.status(200).json({ message: "Proprietário editado com sucesso", data: proprietario });
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Erro ao editar proprietário", error: error.message });
        }
    },

    // Produtos 
    async listarProdutos(req, res) {
        try {
            const produtos = await prisma.Produto.findMany();
            res.status(200).json({ message: "Produtos listados com sucesso", data: produtos });
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Erro ao listar os produtos", error: error.message });
        }
    },

    async inserirProduto(req, res) {
        try {
            const { descricao, quantidade, valor, proprietario_id } = req.body;

            
            const novoProduto = await prisma.Produto.create({
                data: {
                    descricao,
                    quantidade,
                    valor,
                    proprietario_id
                },
            });

            res.status(201).json({ message: "Produto criado com sucesso", data: novoProduto });
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Erro ao criar produto", error: error.message });
        }
    },

    async deletarProduto(req, res) {
        try {
            const { id } = req.params;
            const produto = await prisma.Produto.delete({
                where: { id: Number(id) }
            });

            res.status(200).json({ message: "Produto deletado com sucesso", data: produto });
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Erro ao deletar produto", error: error.message });
        }
    },

    async editarProduto(req, res) {
        try {
            const { id } = req.params;
            const { descricao, quantidade, valor, proprietario_id } = req.body;


            const produto = await prisma.Produto.update({
                where: { id: Number(id) },
                data: {
                    descricao,
                    quantidade,
                    valor,
                    proprietario_id
                }
            });

            res.status(200).json({ message: "Produto editado com sucesso", data: produto });
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Erro ao editar produto", error: error.message });
        }
    },


    // Pesquisas
    async produtoMaiorQuantidade(req, res) {
        try {
            const produto = await prisma.Produto.findFirst({
                orderBy: { quantidade: 'desc' }
            });
            res.status(200).json({ message: "Produto com maior quantidade", data: produto });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao pesquisar produto de maior quantidade", error: error.message });
        }
    },

    async produtoMaiorValor(req, res) {
        try {
            const produto = await prisma.Produto.findFirst({
                orderBy: { valor: 'desc' }
            });
            res.status(200).json({ message: "Produto com maior valor", data: produto });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao pesquisar produto de maior valor", error: error.message });
        }
    },


    async produtoMaiorValorTotal(req, res) {
        try {
            const produto = await prisma.Produto.findFirst({
                orderBy: [
                    { quantidade: 'desc' },
                    { valor: 'desc' }
                ]
            });

            const totalValue = produto.quantidade * produto.valor;

            res.status(200).json({
                message: "Produto com maior valor total",
                data: { ...produto, total_value: totalValue }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao pesquisar produto de maior valor total", error: error.message });
        }
    },
    
    async pesquisarProprietarioPorNome(req, res) {
        try {
            const { nome } = req.params; // Obtém o parâmetro 'nome' da query string
            if (!nome) {
                return res.status(400).json({ message: "O parâmetro 'nome' é necessário" });
            }

            const proprietarios = await prisma.Proprietario.findMany({
                where: {
                    nome: {
                        contains: nome
                    },
                },
            });

            res.status(200).json({ message: "Proprietários encontrados", data: proprietarios });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao pesquisar proprietários", error: error.message });
        }
    },

    async pesquisarProprietarioMaiorNumeroProdutos(req, res) {
        try {
            // Consulta para obter o proprietário com o maior número de produtos
            const proprietario = await prisma.proprietario.findMany({
                orderBy: {
                    produtos: {
                        _count: 'desc', // Ordena pela quantidade de produtos
                    },
                },
                include: {
                    produtos: true, // Inclui os produtos para poder contar
                },
                take: 1, // Limita para retornar apenas o proprietário com o maior número de produtos
            });

            // Verifica se não encontrou nenhum proprietário
            if (proprietario.length === 0) {
                return res.status(404).json({ message: "Nenhum proprietário encontrado" });
            }

            // Retorna o proprietário com o maior número de produtos
            return res.status(200).json(proprietario[0]);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao buscar proprietário", error });
        }
    }



};
