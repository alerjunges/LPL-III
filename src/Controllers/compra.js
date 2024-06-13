const compraService = require('../Services/compra');

const getCompra = async (req, res, next) => {
    try {
        const retorno = await compraService.getCompra();
        res.status(200).json(retorno);
    } catch (err) {
        res.status(500).send(err);
    }
};

const getCompraById = async (req, res, next) => {
    try {
        const compraId = req.params.id;

        const compraExists = await compraService.checkCompraExistsById(compraId);
        if (!compraExists) {
            return res.status(404).json({ message: 'Compra não encontrada' });
        }

        const compra = await compraService.getCompraById(compraId);
        res.status(200).json(compra);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const postCompra = async (req, res, next) => {
    try {
        const retorno = await compraService.postCompra(req.body);
        res.status(201).json(retorno);
    } catch (err) {
        res.status(500).send(err);
    }
};

const deleteCompra = async (req, res, next) => {
    try {
        const compraId = req.params.id;

        const compraExists = await compraService.checkCompraExistsById(compraId);
        if (!compraExists) {
            return res.status(404).json({ message: 'Compra não encontrada' });
        }

        const result = await compraService.deleteCompra({ id: compraId });

        res.status(204).send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const patchCompra = async (req, res, next) => {
    try {
        const params = req.body;
        const compraId = req.params.id;

        const compraExists = await compraService.checkCompraExistsById(compraId);
        if (!compraExists) {
            return res.status(404).json({ message: 'Compra não encontrada' });
        }

        params.id = compraId;

        const result = await compraService.patchCompra(params);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    deleteCompra,
    getCompra,
    getCompraById,
    postCompra,
    patchCompra,
};
