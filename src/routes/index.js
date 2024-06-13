const cliente = require('./cliente');
 const produto = require('./produto');
 const compra = require('./compra');
 const compraProduto = require('./compraProduto');
 const vendaProduto = require('./vendaProduto');
 const fornecedor = require('./fornecedor');
 const venda = require('./venda');
 const usuario = require('./usuario');
 const login = require('./login');



module.exports = (app) => {
    cliente(app)
     produto(app)
     compraProduto(app)
     venda(app)
     vendaProduto(app)
     compra(app)
     fornecedor(app)
     usuario(app)
     login(app)
}

