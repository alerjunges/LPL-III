// Validação de e-mail
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isValidCPF = (cpf) => {
    const cpfRegex = /^\d{11}$/;
    return cpfRegex.test(cpf);
};

const isValidCNPJ = (cnpj) => {
    const cnpjRegex = /^\d{14}$/;
    return cnpjRegex.test(cnpj);
};

const isValidTelefone = (telefone) => {
    const telefoneRegex = /^\d{11}$/;
    return telefoneRegex.test(telefone);
};

module.exports.isValidCNPJ = isValidCNPJ
module.exports.isValidCPF = isValidCPF
module.exports.isValidEmail = isValidEmail
module.exports.isValidTelefone = isValidTelefone