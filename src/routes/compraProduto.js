const compraProdutoController = require('../Controllers/compraProduto');
const autenticacao = require('../autenticacao/autenticacao');

module.exports = (app) => {
  app.get('/compraProduto', autenticacao, compraProdutoController.getCompraProduto
/*
#swagger.tags = ["COMPRA PRODUTO"]
#swagger.summary = "Consulta os detalhes das compras de produtos"
#swagger.responses[200] = {
    description: 'Consulta realizada com sucesso',
    schema: {
        compra_id: 1,
        produto_id: 1,
        quantidade: 10,
        subtotal: 100.00,
        preco_unitario: 10.00
    }
}
*/
  )

  app.get('/compraProduto/:id', autenticacao, compraProdutoController.getCompraProdutoById
  /*
  #swagger.tags = ["COMPRA PRODUTO"]
  #swagger.summary = "Consulta os detalhes das compras de produtos pelo ID"
  #swagger.responses[200] = {
      description: 'Consulta realizada com sucesso',
      schema: {
          compra_id: 1,
          produto_id: 1,
          quantidade: 10,
          subtotal: 100.00,
          preco_unitario: 10.00
      }
  }
  */
    )

  app.post('/compraProduto', autenticacao, compraProdutoController.postCompraProduto
/*
#swagger.tags = ["COMPRA PRODUTO"]
#swagger.summary = "Insere uma nova compra de produtos"
#swagger.parameters['json'] = {
    in: 'body',
    description: 'Dados para inserir uma nova compra de produtos',
    type: 'json',
    schema: {
        compra_id: 1,
        produto_id: 1,
        quantidade: 10,
        subtotal: 100.00,
        preco_unitario: 10.00
    }
}
#swagger.responses[201] = {
    description: 'Compra de produtos criada com sucesso',
    schema: {
        compra_id: 1,
        produto_id: 1,
        quantidade: 10,
        subtotal: 100.00,
        preco_unitario: 10.00
    }
}
#swagger.responses[400] = {
    description: 'Dados inválidos'
}
*/
  )
  app.delete('/compraProduto/:id', autenticacao, compraProdutoController.deleteCompraProduto
/*
#swagger.tags = ["COMPRA PRODUTO"]
#swagger.summary = "Deleta uma compra de produtos pelo ID"
#swagger.parameters['id'] = {
    in: 'path',
    description: 'ID da compra de produtos',
    required: true,
    type: 'integer'
}
#swagger.responses[204] = {
    description: 'Compra de produtos deletada com sucesso'
}
#swagger.responses[404] = {
    description: 'Compra de produtos não encontrada'
}
*/
  )

  app.patch('/compraProduto/:id', autenticacao, compraProdutoController.patchCompraProduto
/*
#swagger.tags = ["COMPRA PRODUTO"]
#swagger.summary = "Atualiza parcialmente uma compra de produtos pelo ID"
#swagger.parameters['id'] = {
    in: 'path',
    description: 'ID da compra de produtos',
    required: true,
    type: 'integer'
}
#swagger.parameters['json'] = {
    in: 'body',
    description: 'Dados para atualizar parcialmente uma compra de produtos',
    type: 'json',
    schema: {
        quantidade: 15
    }
}
#swagger.responses[200] = {
    description: 'Compra de produtos atualizada com sucesso',
    schema: {
        compra_id: 1,
        produto_id: 1,
        quantidade: 15,
        subtotal: 150.00,
        preco_unitario: 10.00
    }
}
#swagger.responses[400] = {
    description: 'Dados inválidos'
}
#swagger.responses[404] = {
    description: 'Compra de produtos não encontrada'
}
*/
  )
}


