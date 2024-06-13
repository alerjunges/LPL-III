const db = require('../configs/pg');

const checkCompraExistsById = async (compraId) => {
    const result = await db.query('SELECT * FROM Compras WHERE compra_id = $1', [compraId]);
    return result.rowCount > 0;
};

const checkProdutoExistsById = async (produtoId) => {
    const result = await db.query('SELECT * FROM Produtos WHERE produto_id = $1', [produtoId]);
    return result.rowCount > 0;
};

const checkCompraProdutoExistsById = async (compraProdutoId) => {
    const result = await db.query('SELECT * FROM Compra_Produtos WHERE compra_id = $1', [compraProdutoId]);
    return result.rowCount > 0;
};

const sql_get = `
    SELECT compra_id,
           produto_id,
           quantidade,
           subtotal,
           preco_unitario
    FROM Compra_Produtos`;

const getCompraProduto = async () => {
    let compraProduto = {};
    await db.query(sql_get)
        .then(ret => compraProduto = { total: ret.rows.length, compraProduto: ret.rows })
        .catch(err => compraProduto = err.stack);
    return compraProduto;
};

const sql_insert = `
    INSERT INTO Compra_Produtos (compra_id, produto_id, quantidade, subtotal, preco_unitario)
    VALUES ($1, $2, $3, $4, $5)`;

const postCompraProduto = async (params) => {
    const { compra_id, produto_id, quantidade, subtotal, preco_unitario } = params;
    try {
        const compraExists = await checkCompraExistsById(compra_id);
        if (!compraExists) {
            throw new Error('Compra não encontrada');
        }

        const produtoExists = await checkProdutoExistsById(produto_id);
        if (!produtoExists) {
            throw new Error('Produto não encontrado');
        }

        const result = await db.query(sql_insert, [compra_id, produto_id, quantidade, subtotal, preco_unitario]);
        return result;
    } catch (error) {
        console.error('Erro ao inserir uma nova Compra de Produto:', error);
        throw error;
    }
};

const sql_delete = 'DELETE FROM Compra_Produtos WHERE compra_id = $1';
const deleteCompraProduto = async (params) => {
    try {
        const { id } = params;
        const result = await db.query(sql_delete, [id]);
        return result.rowCount > 0;
    } catch (error) {
        console.error('Erro ao deletar a Compra de Produto:', error);
        throw error;
    }
};

const sql_patch = 'UPDATE Compra_Produtos SET ';
const patchCompraProduto = async (params) => {
    let fields = '';
    let binds = [];
    binds.push(params.id);
    let countParams = 1;

    if (params.produto_id) {
        countParams++;
        fields += `produto_id = $${countParams} `;
        binds.push(params.produto_id);
    }
    if (params.quantidade) {
        countParams++;
        fields += (fields ? ',' : '') + `quantidade  = $${countParams} `;
        binds.push(params.quantidade );
    }
    if (params.subtotal ) {
        countParams++;
        fields += (fields ? ',' : '') + `subtotal  = $${countParams} `;
        binds.push(params.subtotal );
    }
    if (params.preco_unitario) {
        countParams++;
        fields += (fields ? ',' : '') + `preco_unitario = $${countParams} `;
        binds.push(params.preco_unitario);
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

const sql_getById = `
    SELECT compra_id,
           produto_id,
           quantidade,
           subtotal,
           preco_unitario
    FROM Compra_Produtos
    WHERE compra_id = $1`;

const getCompraProdutoById = async (id) => {
    try {
        const result = await db.query(sql_getById, [id]);
        if (result.rows.length === 0) {
            throw new Error('Compra do produto não encontrada');
        }
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao obter a compra do produto:', error);
        throw error;
    }
};

module.exports = {
    checkCompraExistsById,
    checkProdutoExistsById,
    checkCompraProdutoExistsById,
    getCompraProduto,
    postCompraProduto,
    deleteCompraProduto,
    patchCompraProduto,
    getCompraProdutoById
};
