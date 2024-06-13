const db = require('../configs/pg');

const checkClienteExistsById = async (clienteId) => {
    const result = await db.query('SELECT * FROM Clientes WHERE cliente_id = $1', [clienteId]);
    return result.rowCount > 0;
};

const checkCompraExistsById = async (compraId) => {
    const result = await db.query('SELECT * FROM Compras WHERE compra_id = $1', [compraId]);
    return result.rowCount > 0;
};

const sql_get = `
    SELECT compra_id,
           cliente_id,
           data_compra,
           valor_total
    FROM Compras`;

const getCompra = async () => {
    let compra = {};
    await db.query(sql_get)
        .then(ret => compra = { total: ret.rows.length, compra: ret.rows })
        .catch(err => compra = err.stack);
    return compra;
};

const sql_getById = `
    SELECT compra_id,
           cliente_id,
           data_compra,
           valor_total
    FROM Compras
    WHERE compra_id = $1`;

const getCompraById = async (id) => {
    try {
        const result = await db.query(sql_getById, [id]);
        if (result.rows.length === 0) {
            throw new Error('Compra não encontrada');
        }
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao obter a compra:', error);
        throw error;
    }
};

const sql_insert = `
    INSERT INTO Compras (cliente_id, data_compra, valor_total)
    VALUES ($1, $2, $3)`;

const postCompra = async (params) => {
    const { cliente_id, data_compra, valor_total } = params;
    try {
        const clienteExists = await checkClienteExistsById(cliente_id);
        if (!clienteExists) {
            throw new Error('Cliente não encontrado');
        }

        const result = await db.query(sql_insert, [cliente_id, data_compra, valor_total]);
        return result;
    } catch (error) {
        console.error('Erro ao inserir uma nova compra:', error);
        throw error;
    }
};

const sql_delete = 'DELETE FROM Compras WHERE compra_id = $1';

const deleteCompra = async (params) => {
    try {
        const { id } = params;
        const result = await db.query(sql_delete, [id]);
        return result.rowCount > 0;
    } catch (error) {
        console.error('Erro ao deletar a compra:', error);
        throw error;
    }
};

const sql_patch = 'UPDATE Compras SET ';
const patchCompra = async (params) => {
    let fields = '';
    let binds = [];
    binds.push(params.id);
    let countParams = 1;

    if (params.cliente_id) {
        countParams++;
        fields += `cliente_id = $${countParams} `;
        binds.push(params.cliente_id);
    }
    if (params.data_compra) {
        countParams++;
        fields += (fields ? ',' : '') + `data_compra = $${countParams} `;
        binds.push(params.data_compra);
    }
    if (params.valor_total) {
        countParams++;
        fields += (fields ? ',' : '') + `valor_total = $${countParams} `;
        binds.push(params.valor_total);
    }

    if (fields === '') {
        throw new Error('Nenhum campo válido para atualizar');
    }

    let sql = sql_patch + fields + ' WHERE compra_id = $1 RETURNING *';
    try {
        const result = await db.query(sql, binds);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao atualizar a compra:', error);
        throw error;
    }
};

module.exports = {
    checkClienteExistsById,
    checkCompraExistsById,
    getCompra,
    getCompraById,
    postCompra,
    deleteCompra,
    patchCompra,
};
