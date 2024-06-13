const db = require('../configs/pg');
const cript = require('../configs/myCrypto');

const sql_insert = `
    INSERT INTO Users (username, salt, password)
    VALUES ($1, $2, $3)
    RETURNING user_id, username;
`;

const newUser = async (params) => {
    const { username, password } = params;
    const { salt, hashedPassword } = cript.criarUsuario(password);
    const result = await db.query(sql_insert, [username, salt, hashedPassword]);
    return result.rows[0];
};

const sql_get = `SELECT user_id, username FROM Users`;

const getUser = async () => {
    const result = await db.query(sql_get, []);
    return {
        total: result.rows.length,
        usuarios: result.rows
    };
};

const sql_patch = `UPDATE Users SET`;

const patchUser = async (params) => {
    let fields = '';
    let binds = [];
    let countParams = 1;

    if (params.username) {
        fields += ` username = $${countParams} `;
        binds.push(params.username);
        countParams++;
    }
    if (params.password) {
        const { salt, hashedPassword } = cript.criarUsuario(params.password);
        fields += (fields ? ', ' : '') + ` salt = $${countParams}, password = $${countParams + 1} `;
        binds.push(salt, hashedPassword);
        countParams += 2;
    }

    if (fields === '') {
        throw new Error('Nenhum campo válido para atualizar');
    }

    try {
        const sql = `${sql_patch} ${fields} WHERE user_id = $${countParams} RETURNING user_id, username`;
        binds.push(params.id);
        const result = await db.query(sql, binds);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        throw error;
    }
};

const sql_delete = `DELETE FROM Users WHERE user_id = $1`;

const deleteUser = async (params) => {
    try {
        await db.query(sql_delete, [params.id]);
        return true;
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        throw error;
    }
};

const checkUserExistsById = async (userId) => {
    const result = await db.query('SELECT 1 FROM Users WHERE user_id = $1', [userId]);
    return result.rows.length > 0;
};

module.exports = {
    newUser,
    getUser,
    patchUser,
    deleteUser,
    checkUserExistsById
};
