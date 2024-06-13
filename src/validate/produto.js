const validateProduto = (produtoData) => {
    const errors = [];

    if (!produtoData.nome) {
        errors.push('O nome do produto é obrigatório');
    }

    if (!produtoData.descricao) {
        errors.push('A descrição do produto é obrigatória');
    }

    if (!produtoData.preco) {
        errors.push('O preço do produto é obrigatório');
    }

    if (!produtoData.quantidade_disponivel) {
        errors.push('A quantidade disponível do produto é obrigatória');
    }

    if (!produtoData.tamanho) {
        errors.push('O tamanho do produto é obrigatório');
    }

    if (!produtoData.cor) {
        errors.push('A cor do produto é obrigatória');
    }

    if (!produtoData.tipo) {
        errors.push('O tipo do produto é obrigatório');
    }

    return errors;
};

module.exports = {
    validateProduto
};
