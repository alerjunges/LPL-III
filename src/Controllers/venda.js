const vendaService = require('../Services/venda');

const getVenda = async (req, res, next) => {
    try {
        const retorno = await vendaService.getVenda();
        res.status(200).json(retorno);
    } catch (err) {
        res.status(500).send(err);
    }
};

const getVendaById = async (req, res, next) => {
    try {
        const vendaId = req.params.id;

        const vendaExists = await vendaService.checkVendaExistsById(vendaId);
        if (!vendaExists) {
            return res.status(404).json({ message: 'Venda não encontrada' });
        }

        const venda = await vendaService.getVendaById(vendaId);
        res.status(200).json(venda);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const postVenda = async (req, res, next) => {
    try {
        const retorno = await vendaService.postVenda(req.body);
        res.status(201).json(retorno);
    } catch (err) {
        res.status(500).send(err);
    }
};

const deleteVenda = async (req, res, next) => {
    try {
        const vendaId = req.params.id;

        const vendaExists = await vendaService.checkVendaExistsById(vendaId);
        if (!vendaExists) {
            return res.status(404).json({ message: 'Venda não encontrada' });
        }

        const result = await vendaService.deleteVenda({ id: vendaId });

        res.status(204).send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const patchVenda = async (req, res, next) => {
    try {
        const params = req.body;
        const vendaId = req.params.id;

        const vendaExists = await vendaService.checkVendaExistsById(vendaId);
        if (!vendaExists) {
            return res.status(404).json({ message: 'Venda não encontrada' });
        }

        params.id = vendaId;

        const result = await vendaService.patchVenda(params);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    deleteVenda,
    getVenda,
    getVendaById,
    postVenda,
    patchVenda,
};
