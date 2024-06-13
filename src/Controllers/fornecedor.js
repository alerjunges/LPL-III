const fornecedorService = require('../Services/fornecedor');

const getFornecedor = async (req, res, next) => {
    try {
        const retorno = await fornecedorService.getFornecedor();
        res.status(200).json(retorno);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getFornecedorById = async (req, res, next) => {
    try {
        const fornecedorId = req.params.id;

        const fornecedorExists = await fornecedorService.checkFornecedorExistsById(fornecedorId);
        if (!fornecedorExists) {
            return res.status(404).json({ message: 'Fornecedor não encontrado' });
        }

        const fornecedor = await fornecedorService.getFornecedorById(fornecedorId);
        res.status(200).json(fornecedor);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const postFornecedor = async (req, res, next) => {
    try {
        const retorno = await fornecedorService.postFornecedor(req.body);
        res.status(201).json(retorno);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const deleteFornecedor = async (req, res, next) => {
    try {
        const fornecedorId = req.params.id;

        const fornecedorExists = await fornecedorService.checkFornecedorExistsById(fornecedorId);
        if (!fornecedorExists) {
            return res.status(404).json({ message: 'Fornecedor não encontrado' });
        }

        const result = await fornecedorService.deleteFornecedor({ id: fornecedorId });

        res.status(204).send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const patchFornecedor = async (req, res, next) => {
    try {
        const params = req.body;
        const fornecedorId = req.params.id;

        const fornecedorExists = await fornecedorService.checkFornecedorExistsById(fornecedorId);
        if (!fornecedorExists) {
            return res.status(404).json({ message: 'Fornecedor não encontrado' });
        }

        params.id = fornecedorId;

        const result = await fornecedorService.patchFornecedor(params);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    getFornecedor,
    postFornecedor,
    deleteFornecedor,
    patchFornecedor,
    getFornecedorById
};
