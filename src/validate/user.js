const validateUser = (userData) => {
    const errors = [];

    if (!userData.username) {
        errors.push('O nome de usuário é obrigatório');
    }

    if (!userData.salt) {
        errors.push('O salt é obrigatório');
    }

    if (!userData.password) {
        errors.push('A senha é obrigatória');
    }

    return errors;
};

module.exports = {
    validateUser
};
