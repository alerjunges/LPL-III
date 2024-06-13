const compraController = require('../Controllers/compra');
const autenticacao = require('../autenticacao/autenticacao');

module.exports = (app) => {
  app.get('/compra', autenticacao, compraController.getCompra
    /* 
      #swagger.tags = ["COMPRA"]
      #swagger.summary = "Retorna todos as compras"
      #swagger.responses[200] = {
          description: 'Consulta realizada com sucesso',
          schema: [{
              compra_id: 1,
              cliente_id: 1,
              data_compra: "2023-05-21",
              valor_total: 100.00
          }]
      }
      #swagger.responses[400] = {
          description: 'Dados inválidos'
      }
    */
  );

  app.get('/compra/:id', autenticacao, compraController.getCompraById
      /* 
      #swagger.tags = ["COMPRA"]
      #swagger.summary = "Retorna as compras pelo ID"
      #swagger.responses[200] = {
          description: 'Consulta realizada com sucesso',
          schema: [{
              compra_id: 1,
              cliente_id: 1,
              data_compra: "2023-05-21",
              valor_total: 100.00
          }]
      }
      #swagger.responses[400] = {
          description: 'Dados inválidos'
      }
    */
    );

  app.post('/compra', autenticacao, compraController.postCompra
    /* 
      #swagger.tags = ["COMPRA"]
      #swagger.summary = "Insere uma compra"
      #swagger.parameters['json'] = {
          in: 'body',
          description: 'Dados para inserir uma nova Compra',
          required: true,
          type: 'json',
          schema: {
              cliente_id: 1,
              data_compra: "2023-05-21",
              valor_total: 100.00
          }
      }
      #swagger.responses[201] = {
          description: 'Compra criada com sucesso',
          schema: {
              compra_id: 1,
              cliente_id: 1,
              data_compra: "2023-05-21",
              valor_total: 100.00
          }
      }
      #swagger.responses[400] = {
          description: 'Dados inválidos'
      }
    */
  );

  app.delete('/compra/:id', autenticacao, compraController.deleteCompra
    /* 
      #swagger.tags = ["COMPRA"]
      #swagger.summary = "Deleta uma compra"
      #swagger.parameters['id'] = {
          in: 'path',
          description: 'ID da Compra',
          required: true,
          type: 'integer'
      }
      #swagger.responses[204] = {
          description: 'Compra deletada com sucesso'
      }
      #swagger.responses[404] = {
          description: 'Compra não encontrada'
      }
    */
  );


  app.patch('/compra/:id', autenticacao, compraController.patchCompra
    /* 
      #swagger.tags = ["COMPRA"]
      #swagger.summary = "Atualiza parcialmente uma compra"
      #swagger.parameters['id'] = {
          in: 'path',
          description: 'ID da Compra',
          required: true,
          type: 'integer'
      }
      #swagger.parameters['json'] = {
          in: 'body',
          description: 'Dados para atualizar parcialmente uma Compra',
          required: true,
          type: 'json',
          schema: {
              valor_total: 100.00
          }
      }
      #swagger.responses[200] = {
          description: 'Compra atualizada com sucesso',
          schema: {
              compra_id: 1,
              cliente_id: 1,
              data_compra: "2023-05-21",
              valor_total: 100.00
          }
      }
      #swagger.responses[400] = {
          description: 'Dados inválidos'
      }
      #swagger.responses[404] = {
          description: 'Compra não encontrada'
      }
    */
  );
}
