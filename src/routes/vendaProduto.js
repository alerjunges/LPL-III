const vendaProdutoController = require('../Controllers/vendaProduto');
const autenticacao = require('../autenticacao/autenticacao');

module.exports = (app) => {
  app.get('/vendaProduto', autenticacao, vendaProdutoController.getVendaProduto
    /* 
      #swagger.tags = ["VENDA PRODUTO"]
      #swagger.summary = "Consulta os detalhes das vendas de produtos"
      #swagger.responses[200] = {
          description: 'Consulta realizada com sucesso',
          schema: {
              venda_id: 1,
              produto_id: 1,
              quantidade: 5,
              subtotal: 50.00,
              preco_unitario: 10.00,
              desconto: 0.00
          }
      }
      #swagger.responses[400] = {
          description: 'Dados inválidos'
      }
    */
  );

  app.get('/vendaProduto/:vendaId/:produtoId', autenticacao, vendaProdutoController.getVendaProdutoById
    /* 
      #swagger.tags = ["VENDA PRODUTO"]
      #swagger.summary = "Consulta os detalhes das vendas de produtos pelo ID"
      #swagger.responses[200] = {
          description: 'Consulta realizada com sucesso',
          schema: {
              venda_id: 1,
              produto_id: 1,
              quantidade: 5,
              subtotal: 50.00,
              preco_unitario: 10.00,
              desconto: 0.00
          }
      }
      #swagger.responses[400] = {
          description: 'Dados inválidos'
      }
    */
  );

  app.post('/vendaProduto', autenticacao, vendaProdutoController.postVendaProduto
    /* 
      #swagger.tags = ["VENDA PRODUTO"]
      #swagger.summary = "Insere uma nova venda de produtos"
      #swagger.parameters['json'] = {
          in: 'body',
          description: 'Dados para inserir um novo item de Venda',
          type: 'json',
          schema: {
              venda_id: 1,
              produto_id: 1,
              quantidade: 5,
              subtotal: 50.00,
              preco_unitario: 10.00,
              desconto: 0.00
          }
      }
      #swagger.responses[201] = {
          description: 'Item de venda criado com sucesso',
          schema: {
              venda_id: 1,
              produto_id: 1,
              quantidade: 5,
              subtotal: 50.00,
              preco_unitario: 10.00,
              desconto: 0.00
          }
      }
      #swagger.responses[400] = {
          description: 'Dados inválidos'
      }
    */
  );

  app.delete('/vendaProduto/:vendaId/:produtoId', autenticacao, vendaProdutoController.deleteVendaProduto
    /* 
      #swagger.tags = ["VENDA PRODUTO"]
      #swagger.summary = "Deleta uma venda de produtos pelo ID"
      #swagger.parameters['vendaId'] = {
          in: 'path',
          description: 'ID da Venda',
          required: true,
          type: 'integer'
      }
      #swagger.parameters['produtoId'] = {
          in: 'path',
          description: 'ID do Produto',
          required: true,
          type: 'integer'
      }
      #swagger.responses[204] = {
          description: 'Item de venda deletado com sucesso'
      }
      #swagger.responses[404] = {
          description: 'Item de venda não encontrado'
      }
    */
  );

  app.patch('/vendaProduto/:vendaId/:produtoId', autenticacao, vendaProdutoController.patchVendaProduto
    /* 
      #swagger.tags = ["VENDA PRODUTO"]
      #swagger.summary = "Atualiza parcialmente uma venda de produtos pelo ID"
      #swagger.parameters['vendaId'] = {
          in: 'path',
          description: 'ID da Venda',
          required: true,
          type: 'integer'
      }
      #swagger.parameters['produtoId'] = {
          in: 'path',
          description: 'ID do Produto',
          required: true,
          type: 'integer'
      }
      #swagger.parameters['json'] = {
          in: 'body',
          description: 'Dados para atualizar parcialmente um item de Venda',
          type: 'json',
          schema: {
              quantidade: 10
          }
      }
      #swagger.responses[200] = {
          description: 'Item de venda atualizado com sucesso',
          schema: {
              venda_id: 1,
              produto_id: 1,
              quantidade: 10,
              subtotal: 50.00,
              preco_unitario: 5.00,
              desconto: 0.00
          }
      }
      #swagger.responses[400] = {
          description: 'Dados inválidos'
      }
      #swagger.responses[404] = {
          description: 'Item de venda não encontrado'
      }
    */
  );
}
