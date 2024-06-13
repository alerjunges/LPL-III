const db = require('../configs/pg');

const checkProdutoExistsById = async (produtoId) => {
    const result = await db.query('SELECT * FROM Produtos WHERE produto_id = $1', [produtoId]);
    return result.rowCount > 0;
};

const sql_get = `
    SELECT produto_id,
           nome,
           descricao,
           preco,
           quantidade_disponivel,
           tamanho,
           cor,
           tipo
    FROM Produtos`;

const getProduto = async () => {
    let produto = {};
    await db.query(sql_get)
        .then(ret => produto = { total: ret.rows.length, produtos: ret.rows })
        .catch(err => produto = err.stack);
    return produto;
};

const sql_getById = `
    SELECT produto_id,
           nome,
           descricao,
           preco,
           quantidade_disponivel,
           tamanho,
           cor,
           tipo
    FROM Produtos
    WHERE produto_id = $1`;

const getProdutoById = async (id) => {
    try {
        const result = await db.query(sql_getById, [id]);
        if (result.rows.length === 0) {
            throw new Error('Produto não encontrado');
        }
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao obter o produto:', error);
        throw error;
    }
};

const sql_insert = `
    INSERT INTO Produtos (nome, descricao, preco, quantidade_disponivel, tamanho, cor, tipo)
    VALUES ($1, $2, $3, $4, $5, $6, $7)`;

const postProduto = async (params) => {
    try {
        const { nome, descricao, preco, quantidade_disponivel, tamanho, cor, tipo } = params;

        const result = await db.query(sql_insert, [nome, descricao, preco, quantidade_disponivel, tamanho, cor, tipo]);
        return result;
    } catch (error) {
        console.error('Erro ao inserir um novo Produto:', error);
        throw error;
    }
};

const sql_delete = 'DELETE FROM Produtos WHERE produto_id = $1';

const deleteProduto = async (params) => {
    try {
        const { id } = params;
        const result = await db.query(sql_delete, [id]);
        return result.rowCount > 0;
    } catch (error) {
        console.error('Erro ao deletar o Produto:', error);
        throw error;
    }
};

const sql_patch = 'UPDATE Produtos SET ';
const patchProduto = async (params) => {
    let fields = '';
    let binds = [];
    binds.push(params.id);
    let countParams = 1;

    if (params.nome) {
        countParams++;
        fields += `nome = $${countParams} `;
        binds.push(params.nome);
    }
    if (params.descricao) {
        countParams++;
        fields += (fields ? ',' : '') + `descricao = $${countParams} `;
        binds.push(params.descricao);
    }
    if (params.preco) {
        countParams++;
        fields += (fields ? ',' : '') + `preco = $${countParams} `;
        binds.push(params.preco);
    }
    if (params.quantidade_disponivel) {
        countParams++;
        fields += (fields ? ',' : '') + `quantidade_disponivel = $${countParams} `;
        binds.push(params.quantidade_disponivel);
    }
    if (params.tamanho) {
        countParams++;
        fields += (fields ? ',' : '') + `tamanho = $${countParams} `;
        binds.push(params.tamanho);
    }
    if (params.cor) {
        countParams++;
        fields += (fields ? ',' : '') + `cor = $${countParams} `;
        binds.push(params.cor);
    }
    if (params.tipo) {
        countParams++;
        fields += (fields ? ',' : '') + `tipo = $${countParams} `;
        binds.push(params.tipo);
    }

    if (fields === '') {
        throw new Error('Nenhum campo válido para atualizar');
    }

    let sql = sql_patch + fields + ' WHERE produto_id = $1 RETURNING *';
    try {
        const result = await db.query(sql, binds);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao atualizar o produto:', error);
        throw error;
    }
};

module.exports = {
    checkProdutoExistsById,
    getProduto,
    getProdutoById,
    postProduto,
    deleteProduto,
    patchProduto,
};
