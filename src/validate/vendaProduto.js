const validateVendaProduto = (vendaProdutoData) => {
    const errors = [];

    if (!vendaProdutoData.venda_id) {
        errors.push('O ID da venda é obrigatório');
    }

    if (!vendaProdutoData.produto_id) {
        errors.push('O ID do produto é obrigatório');
    }

    if (!vendaProdutoData.quantidade) {
        errors.push('A quantidade do produto é obrigatória');
    }

    if (!vendaProdutoData.subtotal) {
        errors.push('O subtotal é obrigatório');
    }

    if (!vendaProdutoData.preco_unitario) {
        errors.push('O preço unitário é obrigatório');
    }

    if (!vendaProdutoData.desconto && vendaProdutoData.desconto !== 0) {
        errors.push('O desconto é obrigatório');
    }

    return errors;
};

module.exports = {
    validateVendaProduto
};
