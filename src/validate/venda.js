const validateVenda = (vendaData) => {
    const errors = [];

    if (!vendaData.cliente_id) {
        errors.push('O ID do cliente é obrigatório');
    }

    if (!vendaData.data_venda) {
        errors.push('A data da venda é obrigatória');
    }

    if (!vendaData.valor_total) {
        errors.push('O valor total da venda é obrigatório');
    }

    return errors;
};

module.exports = {
    validateVenda
};
