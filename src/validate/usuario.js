const db = require('../configs/pg');

const validateNewUser = (userData) => {
    const errors = [];

    if (!userData.username) {
        errors.push('O nome de usuário é obrigatório');
    }

    if (!userData.password) {
        errors.push('A senha é obrigatória');
    } else if (userData.password.length < 8) {
        errors.push('A senha deve ter pelo menos 8 caracteres');
    }
    
    return errors;
};

const checkUsernameExists = async (username) => {
    try {
        const result = await db.query('SELECT 1 FROM Users WHERE username = $1', [username]);
        return result.rows.length > 0;
    } catch (error) {
        console.error('Erro ao verificar se o nome de usuário existe:', error);
        throw new Error('Erro ao verificar se o nome de usuário existe');
    }
};

module.exports = {
    validateNewUser,
    checkUsernameExists
};
