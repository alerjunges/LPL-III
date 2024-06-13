const produtoService = require('../Services/produto');

const getProduto = async (req, res, next) => {
    try {
        const retorno = await produtoService.getProduto();
        res.status(200).json(retorno);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getProdutoById = async (req, res, next) => {
    try {
        const produtoId = req.params.id;

        const produtoExists = await produtoService.checkProdutoExistsById(produtoId);
        if (!produtoExists) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        const produto = await produtoService.getProdutoById(produtoId);
        res.status(200).json(produto);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const postProduto = async (req, res, next) => {
    try {
        const retorno = await produtoService.postProduto(req.body);
        res.status(201).json(retorno);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const deleteProduto = async (req, res, next) => {
    try {
        const produtoId = req.params.id;

        const produtoExists = await produtoService.checkProdutoExistsById(produtoId);
        if (!produtoExists) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        const result = await produtoService.deleteProduto({ id: produtoId });

        res.status(204).send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const patchProduto = async (req, res, next) => {
    try {
        const params = req.body;
        const produtoId = req.params.id;

        const produtoExists = await produtoService.checkProdutoExistsById(produtoId);
        if (!produtoExists) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        params.id = produtoId;

        const result = await produtoService.patchProduto(params);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    getProduto,
    postProduto,
    deleteProduto,
    patchProduto,
    getProdutoById
};
