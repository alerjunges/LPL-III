const db = require('../configs/pg');

const checkVendaExistsById = async (vendaId) => {
    const result = await db.query('SELECT * FROM Vendas WHERE venda_id = $1', [vendaId]);
    return result.rowCount > 0;
};

const checkProdutoExistsById = async (produtoId) => {
    const result = await db.query('SELECT * FROM Produtos WHERE produto_id = $1', [produtoId]);
    return result.rowCount > 0;
};

const checkVendaProdutoExistsById = async (vendaId, produtoId) => {
    const result = await db.query('SELECT * FROM Venda_Produtos WHERE venda_id = $1 AND produto_id = $2', [vendaId, produtoId]);
    return result.rowCount > 0;
};

const sql_get = `
    SELECT venda_id,
           produto_id,
           quantidade,
           subtotal,
           preco_unitario,
           desconto
    FROM Venda_Produtos`;

const getVendaProduto = async () => {
    let vendaProduto = {};
    await db.query(sql_get)
        .then(ret => vendaProduto = { total: ret.rows.length, vendaProduto: ret.rows })
        .catch(err => vendaProduto = err.stack);
    return vendaProduto;
};

const validateVendaProduto = (params) => {
    const { quantidade, subtotal, preco_unitario, desconto } = params;

    if (quantidade <= 0) {
        throw new Error('Quantidade deve ser maior que zero');
    }

    // Verifica se o subtotal fornecido é igual ao calculado com base nos outros parâmetros
    const calculatedSubtotal = quantidade * preco_unitario * (1 - (desconto / 100));
    if (subtotal !== parseFloat(calculatedSubtotal.toFixed(2))) {
        throw new Error('Subtotal incorreto');
    }
    
    if (desconto < 0 || desconto > 100) {
        throw new Error('Desconto deve ser entre 0 e 100%');
    }
};

const sql_insert = `
    INSERT INTO Venda_Produtos (venda_id, produto_id, quantidade, subtotal, preco_unitario, desconto)
    VALUES ($1, $2, $3, $4, $5, $6)`;

const postVendaProduto = async (params) => {
    const { venda_id, produto_id, quantidade, subtotal, preco_unitario, desconto } = params;
    try {
        const vendaExists = await checkVendaExistsById(venda_id);
        if (!vendaExists) {
            throw new Error('Venda não encontrada');
        }

        const produtoExists = await checkProdutoExistsById(produto_id);
        if (!produtoExists) {
            throw new Error('Produto não encontrado');
        }

        validateVendaProduto(params);

        const result = await db.query(sql_insert, [venda_id, produto_id, quantidade, subtotal, preco_unitario, desconto]);
        return result;
    } catch (error) {
        console.error('Erro ao inserir uma nova Venda de Produto:', error);
        throw error;
    }
};

const sql_delete = 'DELETE FROM Venda_Produtos WHERE venda_id = $1 AND produto_id = $2';
const deleteVendaProduto = async (params) => {
    try {
        const { venda_id, produto_id } = params;
        const result = await db.query(sql_delete, [venda_id, produto_id]);
        return result.rowCount > 0;
    } catch (error) {
        console.error('Erro ao deletar a Venda de Produto:', error);
        throw error;
    }
};

const sql_patch = 'UPDATE Venda_Produtos SET ';
const patchVendaProduto = async (params) => {
    let fields = '';
    let binds = [params.venda_id, params.produto_id];
    let countParams = 2;

    if (params.quantidade) {
        countParams++;
        fields += `quantidade = $${countParams} `;
        binds.push(params.quantidade);
    }
    if (params.subtotal) {
        countParams++;
        fields += (fields ? ',' : '') + `subtotal = $${countParams} `;
        binds.push(params.subtotal);
    }
    if (params.preco_unitario) {
        countParams++;
        fields += (fields ? ',' : '') + `preco_unitario = $${countParams} `;
        binds.push(params.preco_unitario);
    }
    if (params.desconto) {
        countParams++;
        fields += (fields ? ',' : '') + `desconto = $${countParams} `;
        binds.push(params.desconto);
    }

    if (fields === '') {
        throw new Error('Nenhum campo válido para atualizar');
    }

    validateVendaProduto(params);

    let sql = sql_patch + fields + ' WHERE venda_id = $1 AND produto_id = $2 RETURNING *';
    try {
        const result = await db.query(sql, binds);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao atualizar a venda do produto:', error);
        throw error;
    }
};

const sql_getById = `
    SELECT venda_id,
           produto_id,
           quantidade,
           subtotal,
           preco_unitario,
           desconto
    FROM Venda_Produtos
    WHERE venda_id = $1 AND produto_id = $2`;

const getVendaProdutoById = async (vendaId, produtoId) => {
    try {
        const result = await db.query(sql_getById, [vendaId, produtoId]);
        if (result.rows.length === 0) {
            throw new Error('Venda de Produto não encontrada');
        }
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao obter a venda do produto:', error);
        throw error;
    }
};

module.exports = {
    checkVendaExistsById,
    checkProdutoExistsById,
    checkVendaProdutoExistsById,
    getVendaProduto,
    postVendaProduto,
    deleteVendaProduto,
    patchVendaProduto,
    getVendaProdutoById
};
