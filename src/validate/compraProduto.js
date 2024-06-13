const validateCompraProduto = (compraProdutoData) => {
    const errors = [];

    if (!compraProdutoData.compra_id) {
        errors.push('O ID da compra é obrigatório');
    }

    if (!compraProdutoData.produto_id) {
        errors.push('O ID do produto é obrigatório');
    }

    if (!compraProdutoData.quantidade) {
        errors.push('A quantidade do produto é obrigatória');
    }

    if (!compraProdutoData.subtotal) {
        errors.push('O subtotal é obrigatório');
    }

    if (!compraProdutoData.preco_unitario) {
        errors.push('O preço unitário é obrigatório');
    }

    return errors;
};

module.exports = {
    validateCompraProduto
};
