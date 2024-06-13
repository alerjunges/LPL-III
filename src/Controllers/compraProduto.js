const compraProdutoService = require('../Services/compraProduto');

const getCompraProduto = async (req, res, next) => {
    try {
        const retorno = await compraProdutoService.getCompraProduto();
        res.status(200).json(retorno);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getCompraProdutoById = async (req, res, next) => {
    try {
        const compraProdutoId = req.params.id;

        const compraProdutoExists = await compraProdutoService.checkCompraProdutoExistsById(compraProdutoId);
        if (!compraProdutoExists) {
            return res.status(404).json({ message: 'Compra do produto não encontrada' });
        }

        const compraProduto = await compraProdutoService.getCompraProdutoById(compraProdutoId);
        res.status(200).json(compraProduto);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const postCompraProduto = async (req, res, next) => {
    try {
        const retorno = await compraProdutoService.postCompraProduto(req.body);
        res.status(201).json(retorno);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const deleteCompraProduto = async (req, res, next) => {
    try {
        const compraProdutoId = req.params.id;

        const compraProdutoExists = await compraProdutoService.checkCompraProdutoExistsById(compraProdutoId);
        if (!compraProdutoExists) {
            return res.status(404).json({ message: 'Compra do produto não encontrada' });
        }

        const result = await compraProdutoService.deleteCompraProduto({ id: compraProdutoId });

        res.status(204).send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const patchCompraProduto = async (req, res, next) => {
    try {
        const params = req.body;
        const compraProdutoId = req.params.id;

        const compraProdutoExists = await compraProdutoService.checkCompraProdutoExistsById(compraProdutoId);
        if (!compraProdutoExists) {
            return res.status(404).json({ message: 'Compra do produto não encontrada' });
        }

        params.id = compraProdutoId;

        const result = await compraProdutoService.patchCompraProduto(params);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    deleteCompraProduto,
    getCompraProduto,
    postCompraProduto,
    patchCompraProduto,
    getCompraProdutoById,
};
