const vendaProdutoService = require('../Services/vendaProduto');

const getVendaProduto = async (req, res, next) => {
    try {
        const retorno = await vendaProdutoService.getVendaProduto();
        res.status(200).json(retorno);
    } catch (err) {
        res.status(500).send(err);
    }
};

const getVendaProdutoById = async (req, res, next) => {
    try {
        const { vendaId, produtoId } = req.params;

        const vendaProdutoExists = await vendaProdutoService.checkVendaProdutoExistsById(vendaId, produtoId);
        if (!vendaProdutoExists) {
            return res.status(404).json({ message: 'Venda de Produto não encontrada' });
        }

        const vendaProduto = await vendaProdutoService.getVendaProdutoById(vendaId, produtoId);
        res.status(200).json(vendaProduto);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const postVendaProduto = async (req, res, next) => {
    try {
        const retorno = await vendaProdutoService.postVendaProduto(req.body);
        res.status(201).json(retorno);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const deleteVendaProduto = async (req, res, next) => {
    try {
        const { vendaId, produtoId } = req.params;

        const vendaProdutoExists = await vendaProdutoService.checkVendaProdutoExistsById(vendaId, produtoId);
        if (!vendaProdutoExists) {
            return res.status(404).json({ message: 'Venda de Produto não encontrada' });
        }

        const result = await vendaProdutoService.deleteVendaProduto({ venda_id: vendaId, produto_id: produtoId });

        res.status(204).send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const patchVendaProduto = async (req, res, next) => {
    try {
        const params = req.body;
        const { vendaId, produtoId } = req.params;

        const vendaProdutoExists = await vendaProdutoService.checkVendaProdutoExistsById(vendaId, produtoId);
        if (!vendaProdutoExists) {
            return res.status(404).json({ message: 'Venda de Produto não encontrada' });
        }

        params.venda_id = vendaId;
        params.produto_id = produtoId;

        const result = await vendaProdutoService.patchVendaProduto(params);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    getVendaProduto,
    getVendaProdutoById,
    postVendaProduto,
    deleteVendaProduto,
    patchVendaProduto,
};
