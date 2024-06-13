const { validateNewUser, checkUsernameExists } = require('../validate/usuario');
const usuarioService = require('../services/usuario');

const newUser = async (req, res, next) => {
    const usernameExists = await checkUsernameExists(req.body.username);
    if (usernameExists) {
        return res.status(400).json({ errors: ['O nome de usuário já está em uso'] });
    }

    const errors = validateNewUser(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    try {
        const retorno = await usuarioService.newUser(req.body);
        res.status(201).json(retorno);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getUser = async (req, res, next) => {
    try {
        const retorno = await usuarioService.getUser();
        res.status(200).json(retorno);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const patchUser = async (req, res, next) => {
    try {
        const params = req.body;
        const userId = req.params.id;

        const userExists = await usuarioService.checkUserExistsById(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        if (params.username) {
            const usernameExists = await checkUsernameExists(params.username);
            if (usernameExists) {
                return res.status(400).json({ errors: ['O nome de usuário já está em uso'] });
            }
        }

        params.id = userId;

        const result = await usuarioService.patchUser(params);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;

        const userExists = await usuarioService.checkUserExistsById(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const result = await usuarioService.deleteUser({ id: userId });

        res.status(204).send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    newUser,
    getUser,
    patchUser,
    deleteUser
};
