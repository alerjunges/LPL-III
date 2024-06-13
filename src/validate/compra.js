const validateCompra = (compraData) => {
    const errors = [];

    if (!compraData.cliente_id) {
        errors.push('O ID do cliente é obrigatório');
    }

    if (!compraData.data_compra) {
        errors.push('A data da compra é obrigatória');
    }

    if (!compraData.valor_total) {
        errors.push('O valor total da compra é obrigatório');
    }

    return errors;
};

module.exports = {
    validateCompra
};
