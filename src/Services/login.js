const db = require('../configs/pg');
const jwt = require('jsonwebtoken');
const { comparePassword } = require('../configs/myCrypto');
const fs = require('fs');
const path = require('path');

const sql_get = `SELECT username, password, salt FROM Users WHERE username = $1`;

const login = async (params) => {
    try {
        const result = await db.query(sql_get, [params.username]);

        if (result.rows.length === 0) {
            console.log('Usuário não encontrado');
            return { success: false, message: 'Usuário não encontrado' };
        }

        const user = result.rows[0];
        const { password: storedPassword, salt } = user;

        const isPasswordValid = comparePassword(storedPassword, salt, params.senha);

        if (isPasswordValid) {
            console.log('Logado com sucesso');
            const privateKeyPath = path.join(__dirname, '../private/private_key.pem');
            const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
            const token = jwt.sign({ user: user.username }, privateKey, { algorithm: 'RS256', expiresIn: '7d' });
            return { success: true, message: 'Logado com sucesso', user: user.username, token: token };
        } else {
            console.log('Usuário sem acesso');
            return { success: false, message: 'Usuário sem acesso' };
        }
    } catch (error) {
        console.error('Erro ao autenticar usuário:', error);
        throw new Error('Erro ao autenticar usuário');
    }
};

module.exports = { login };
