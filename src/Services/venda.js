const db = require('../configs/pg');

const checkClienteExistsById = async (clienteId) => {
    const result = await db.query('SELECT * FROM Clientes WHERE cliente_id = $1', [clienteId]);
    return result.rowCount > 0;
};

const checkVendaExistsById = async (vendaId) => {
    const result = await db.query('SELECT * FROM Vendas WHERE venda_id = $1', [vendaId]);
    return result.rowCount > 0;
};

const sql_get = `
    SELECT venda_id,
           cliente_id,
           data_venda,
           valor_total
    FROM Vendas`;

const getVenda = async () => {
    let venda = {};
    await db.query(sql_get)
        .then(ret => venda = { total: ret.rows.length, venda: ret.rows })
        .catch(err => venda = err.stack);
    return venda;
};

const sql_getById = `
    SELECT venda_id,
           cliente_id,
           data_venda,
           valor_total
    FROM Vendas
    WHERE venda_id = $1`;

const getVendaById = async (id) => {
    try {
        const result = await db.query(sql_getById, [id]);
        if (result.rows.length === 0) {
            throw new Error('Venda não encontrada');
        }
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao obter a venda:', error);
        throw error;
    }
};

const sql_insert = `
    INSERT INTO Vendas (cliente_id, data_venda, valor_total)
    VALUES ($1, $2, $3)`;

const postVenda = async (params) => {
    const { cliente_id, data_venda, valor_total } = params;
    try {
        const clienteExists = await checkClienteExistsById(cliente_id);
        if (!clienteExists) {
            throw new Error('Cliente não encontrado');
        }

        const result = await db.query(sql_insert, [cliente_id, data_venda, valor_total]);
        return result;
    } catch (error) {
        console.error('Erro ao inserir uma nova venda:', error);
        throw error;
    }
};

const sql_delete = 'DELETE FROM Vendas WHERE venda_id = $1';

const deleteVenda = async (params) => {
    try {
        const { id } = params;
        const result = await db.query(sql_delete, [id]);
        return result.rowCount > 0;
    } catch (error) {
        console.error('Erro ao deletar a venda:', error);
        throw error;
    }
};

const sql_patch = 'UPDATE Vendas SET ';
const patchVenda = async (params) => {
    let fields = '';
    let binds = [];
    binds.push(params.id);
    let countParams = 1;

    if (params.cliente_id) {
        countParams++;
        fields += `cliente_id = $${countParams} `;
        binds.push(params.cliente_id);
    }
    if (params.data_venda) {
        countParams++;
        fields += (fields ? ',' : '') + `data_venda = $${countParams} `;
        binds.push(params.data_venda);
    }
    if (params.valor_total) {
        countParams++;
        fields += (fields ? ',' : '') + `valor_total = $${countParams} `;
        binds.push(params.valor_total);
    }

    if (fields === '') {
        throw new Error('Nenhum campo válido para atualizar');
    }

    let sql = sql_patch + fields + ' WHERE venda_id = $1 RETURNING *';
    try {
        const result = await db.query(sql, binds);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao atualizar a venda:', error);
        throw error;
    }
};

module.exports = {
    checkClienteExistsById,
    checkVendaExistsById,
    getVenda,
    getVendaById,
    postVenda,
    deleteVenda,
    patchVenda,
};
