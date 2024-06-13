const swaggerAutogen = require('swagger-autogen')('pt-BR');

const doc = {
    info: {
        version: "1.0.0",
        title: "Brechó Kismet",
        description: "API para controle de compra e venda"
    },
    host: 'localhost:3000',
    basePath: "",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
};

const outputFile = './src/docs/swagger.yaml';
const endpointsFiles = [
    './src/routes/cliente.js',
    './src/routes/compra.js',
    './src/routes/compraProduto.js',
    './src/routes/fornecedor.js',
    './src/routes/produto.js',
    './src/routes/venda.js',
    './src/routes/vendaProduto.js',
    './src/routes/login.js',
    './src/routes/usuario.js'
];

swaggerAutogen(outputFile, endpointsFiles, doc);
