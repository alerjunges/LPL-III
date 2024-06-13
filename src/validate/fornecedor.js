const validateFornecedor = (fornecedorData) => {
    const errors = [];

    if (!fornecedorData.nome) {
        errors.push('O nome do fornecedor é obrigatório');
    }

    if (!fornecedorData.endereco) {
        errors.push('O endereço do fornecedor é obrigatório');
    }

    if (!fornecedorData.telefone) {
        errors.push('O telefone do fornecedor é obrigatório');
    }

    if (!fornecedorData.email) {
        errors.push('O email do fornecedor é obrigatório');
    }

    if (!fornecedorData.cnpj) {
        errors.push('O CNPJ do fornecedor é obrigatório');
    }

    return errors;
};

module.exports = {
    validateFornecedor
};
