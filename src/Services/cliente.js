const db = require('../configs/pg');
const { isValidEmail, isValidCPF, isValidTelefone } = require('../validate/validation');

const checkClienteExistsById = async (clienteId) => {
    const result = await db.query('SELECT * FROM Clientes WHERE cliente_id = $1', [clienteId]);
    return result.rowCount > 0;
};

const sql_get = `
    SELECT cliente_id,
           nome,
           email,
           telefone,
           endereco,
           cpf
    FROM Clientes`;

const getCliente = async () => {
    let cliente = {};
    await db.query(sql_get)
        .then(ret => cliente = { total: ret.rows.length, cliente: ret.rows })
        .catch(err => cliente = err.stack);
    return cliente;
};

const sql_getById = `
    SELECT cliente_id,
           nome,
           email,
           telefone,
           endereco,
           cpf
    FROM Clientes
    WHERE cliente_id = $1`;

const getClienteById = async (id) => {
    try {
        const result = await db.query(sql_getById, [id]);
        if (result.rows.length === 0) {
            throw new Error('Cliente não encontrado');
        }
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao obter o cliente:', error);
        throw error;
    }
};

const sql_insert = `
    INSERT INTO Clientes (nome, email, telefone, endereco, cpf)
    VALUES ($1, $2, $3, $4, $5)`;

const postCliente = async (params) => {
    try {
        const { nome, email, telefone, endereco, cpf } = params;

        if (!isValidEmail(email)) {
            throw new Error('E-mail inválido');
        }

        if (!isValidCPF(cpf)) {
            throw new Error('CPF inválido');
        }

        if (!isValidTelefone(telefone)) {
            throw new Error('Telefone inválido');
        }

        const result = await db.query(sql_insert, [nome, email, telefone, endereco, cpf]);
        return result;
    } catch (error) {
        console.error('Erro ao inserir um novo Cliente:', error);
        throw error;
    }
};

const sql_delete = 'DELETE FROM Clientes WHERE cliente_id = $1';

const deleteCliente = async (params) => {
    try {
        const { id } = params;
        const result = await db.query(sql_delete, [id]);
        return result.rowCount > 0;
    } catch (error) {
        console.error('Erro ao deletar o Cliente:', error);
        throw error;
    }
};

const sql_patch = 'update Clientes set '
const patchCliente = async (params) => {
    let fields = '';
    let binds = [];
    binds.push(params.id);
    let countParams = 1;

    if (params.nome) {
        countParams++;
        fields += `nome = $${countParams} `;
        binds.push(params.nome);
    }
    if (params.email) {
        if (!isValidEmail(params.email)) {
            throw new Error('E-mail inválido');
        }
        countParams++;
        fields += (fields ? ',' : '') + `email = $${countParams} `;
        binds.push(params.email);
    }
    if (params.telefone) {
        if (!isValidTelefone(params.telefone)) {
            throw new Error('Telefone inválido');
        }
        countParams++;
        fields += (fields ? ',' : '') + `telefone = $${countParams} `;
        binds.push(params.telefone);
    }
    if (params.endereco) {
        countParams++;
        fields += (fields ? ',' : '') + `endereco = $${countParams} `;
        binds.push(params.endereco);
    }
    if (params.cpf) {
        if (!isValidCPF(params.cpf)) {
            throw new Error('CPF inválido');
        }
        countParams++;
        fields += (fields ? ',' : '') + `cpf = $${countParams} `;
        binds.push(params.cpf);
    }

    if (fields === '') {
        throw new Error('Nenhum campo válido para atualizar');
    }

    let sql = sql_patch + fields + ' WHERE cliente_id = $1 RETURNING *;';
    try {
        const result = await db.query(sql, binds);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao atualizar o cliente:', error);
        throw error;
    }
};

module.exports = {
    checkClienteExistsById,
    getCliente,
    getClienteById,
    postCliente,
    deleteCliente,
    patchCliente,
};
