const validateCliente = (clienteData) => {
    const errors = [];

    if (!clienteData.nome) {
        errors.push('O nome do cliente é obrigatório');
    }

    if (!clienteData.email) {
        errors.push('O email do cliente é obrigatório');
    }

    if (!clienteData.telefone) {
        errors.push('O telefone do cliente é obrigatório');
    }

    if (!clienteData.endereco) {
        errors.push('O endereço do cliente é obrigatório');
    }

    if (!clienteData.cpf) {
        errors.push('O CPF do cliente é obrigatório');
    }

    return errors;
};

module.exports = {
    validateCliente
};
