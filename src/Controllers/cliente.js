const clienteService = require('../Services/cliente');

const getCliente = async (req, res, next) => {
    try {
        const retorno = await clienteService.getCliente();
        res.status(200).json(retorno);
    } catch (err) {
        res.status(500).send(err);
    }
};

const getClienteById = async (req, res, next) => {
    try {
        const clienteId = req.params.id;

        const clienteExists = await clienteService.checkClienteExistsById(clienteId);
        if (!clienteExists) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }

        const cliente = await clienteService.getClienteById(clienteId);
        res.status(200).json(cliente);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const postCliente = async (req, res, next) => {
    try {
        const retorno = await clienteService.postCliente(req.body);
        res.status(201).json(retorno);
    } catch (err) {
        res.status(500).send(err);
    }
};

const deleteCliente = async (req, res, next) => {
    try {
        const clienteId = req.params.id;

        const clienteExists = await clienteService.checkClienteExistsById(clienteId);
        if (!clienteExists) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }

        const result = await clienteService.deleteCliente({ id: clienteId });

        res.status(204).send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const patchCliente = async (req, res, next) => {
    try {
        const params = req.body;
        const clienteId = req.params.id;

        const clienteExists = await clienteService.checkClienteExistsById(clienteId);
        if (!clienteExists) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }

        params.id = clienteId;

        const result = await clienteService.patchCliente(params);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    deleteCliente,
    getCliente,
    postCliente,
    patchCliente,
    getClienteById,
};
