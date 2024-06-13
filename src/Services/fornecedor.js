const db = require('../configs/pg');
const { isValidEmail, isValidCNPJ, isValidTelefone } = require('../validate/validation');

const checkFornecedorExistsById = async (fornecedorId) => {
    const result = await db.query('SELECT * FROM Fornecedores WHERE fornecedor_id = $1', [fornecedorId]);
    return result.rowCount > 0;
};

const sql_get = `
    SELECT fornecedor_id,
           nome,
           endereco,
           telefone,
           email,
           cnpj
    FROM Fornecedores`;

const getFornecedor = async () => {
    try {
        const result = await db.query(sql_get);
        return result.rows;
    } catch (error) {
        console.error('Erro ao obter os fornecedores:', error);
        throw error;
    }
};

const sql_insert = `
    INSERT INTO Fornecedores (nome, endereco, telefone, email, cnpj)
    VALUES ($1, $2, $3, $4, $5)`;

const postFornecedor = async (params) => {
    try {
        const { nome, endereco, telefone, email, cnpj } = params;

        if (!isValidEmail(email)) {
            throw new Error('E-mail inválido');
        }

        if (!isValidCNPJ(cnpj)) {
            throw new Error('CNPJ inválido');
        }

        if (!isValidTelefone(telefone)) {
            throw new Error('Telefone inválido');
        }

        const result = await db.query(sql_insert, [nome, endereco, telefone, email, cnpj]);
        return result.rows;
    } catch (error) {
        console.error('Erro ao inserir um novo fornecedor:', error);
        throw error;
    }
};

const sql_delete = 'DELETE FROM Fornecedores WHERE fornecedor_id = $1';

const deleteFornecedor = async (params) => {
    try {
        const { id } = params;
        const result = await db.query(sql_delete, [id]);
        return result.rowCount > 0;
    } catch (error) {
        console.error('Erro ao deletar o fornecedor:', error);
        throw error;
    }
};

const sql_patch = 'UPDATE Fornecedores SET ';
const patchFornecedor = async (params) => {
    let fields = '';
    let binds = [];
    binds.push(params.id);
    let countParams = 1;

    if (params.nome) {
        countParams++;
        fields += `nome = $${countParams} `;
        binds.push(params.nome);
    }
    if (params.endereco) {
        countParams++;
        fields += (fields ? ',' : '') + `endereco = $${countParams} `;
        binds.push(params.endereco);
    }
    if (params.telefone) {
        countParams++;
        fields += (fields ? ',' : '') + `telefone = $${countParams} `;
        binds.push(params.telefone);
    }
    if (params.email) {
        if (!isValidEmail(params.email)) {
            throw new Error('E-mail inválido');
        }
        countParams++;
        fields += (fields ? ',' : '') + `email = $${countParams} `;
        binds.push(params.email);
    }
    if (params.cnpj) {
        if (!isValidCNPJ(params.cnpj)) {
            throw new Error('CNPJ inválido');
        }
        countParams++;
        fields += (fields ? ',' : '') + `cnpj = $${countParams} `;
        binds.push(params.cnpj);
    }

    if (fields === '') {
        throw new Error('Nenhum campo válido para atualizar');
    }

    let sql = sql_patch + fields + ' WHERE fornecedor_id = $1 RETURNING *';
    try {
        const result = await db.query(sql, binds);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao atualizar o fornecedor:', error);
        throw error;
    }
};

const sql_getById = `
    SELECT fornecedor_id,
           nome,
           endereco,
           telefone,
           email,
           cnpj
    FROM Fornecedores
    WHERE fornecedor_id = $1`;

const getFornecedorById = async (id) => {
    try {
        const result = await db.query(sql_getById, [id]);
        if (result.rowCount === 0) {
            throw new Error('Fornecedor não encontrado');
        }
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao obter o fornecedor:', error);
        throw error;
    }
};

module.exports = {
    checkFornecedorExistsById,
    getFornecedor,
    postFornecedor,
    deleteFornecedor,
    patchFornecedor,
    getFornecedorById
};
