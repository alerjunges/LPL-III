const vendaController = require('../Controllers/venda');
const autenticacao = require('../autenticacao/autenticacao');

module.exports = (app) => {
  app.get('/venda', autenticacao, vendaController.getVenda
    /* 
      #swagger.tags = ["VENDA"]
      #swagger.summary = "Retorna todos as vendas"
      #swagger.responses[200] = {
          description: 'Consulta realizada com sucesso',
          schema: {
              venda_id: 1,
              cliente_id: 1,
              data_venda: "2023-05-21",
              valor_total: 100.00
          }
      }
      #swagger.responses[400] = {
          description: 'Dados inválidos'
      }
    */
  );

  app.get('/venda/:id', autenticacao, vendaController.getVenda
  /* 
    #swagger.tags = ["VENDA"]
    #swagger.summary = "Retorna as vendas pelo ID"
    #swagger.responses[200] = {
        description: 'Consulta realizada com sucesso',
        schema: {
            venda_id: 1,
            cliente_id: 1,
            data_venda: "2023-05-21",
            valor_total: 100.00
        }
    }
    #swagger.responses[400] = {
        description: 'Dados inválidos'
    }
  */
);

  app.post('/venda', autenticacao, vendaController.postVenda
    /* 
      #swagger.tags = ["VENDA"]
      #swagger.summary = "Insere uma venda"
      #swagger.parameters['json'] = {
          in: 'body',
          description: 'Dados para inserir uma nova Venda',
          type: 'json',
          schema: {
              cliente_id: 1,
              data_venda: "2023-05-21",
              valor_total: 100.00
          }
      }
      #swagger.responses[201] = {
          description: 'Venda criada com sucesso',
          schema: {
              venda_id: 1,
              cliente_id: 1,
              data_venda: "2023-05-21",
              valor_total: 100.00
          }
      }
      #swagger.responses[400] = {
          description: 'Dados inválidos'
      }
    */
  );

  app.delete('/venda/:id', autenticacao, vendaController.deleteVenda
    /* 
      #swagger.tags = ["VENDA"]
      #swagger.summary = "Deleta uma venda"
      #swagger.parameters['id'] = {
          in: 'path',
          description: 'ID da Venda',
          required: true,
          type: 'integer'
      }
      #swagger.responses[204] = {
          description: 'Venda deletada com sucesso'
      }
      #swagger.responses[404] = {
          description: 'Venda não encontrada'
      }
    */
  );


  app.patch('/venda/:id', autenticacao, vendaController.patchVenda
    /* 
      #swagger.tags = ["VENDA"]
      #swagger.summary = "Atualiza parcialmente uma venda"
      #swagger.parameters['id'] = {
          in: 'path',
          description: 'ID da Venda',
          required: true,
          type: 'integer'
      }
      #swagger.parameters['json'] = {
          in: 'body',
          description: 'Dados para atualizar parcialmente uma Venda',
          type: 'json',
          schema: {
              valor_total: 100.00
          }
      }
      #swagger.responses[200] = {
          description: 'Venda atualizada com sucesso',
          schema: {
              venda_id: 1,
              cliente_id: 1,
              data_venda: "2023-05-21",
              valor_total: 100.00
          }
      }
      #swagger.responses[400] = {
          description: 'Dados inválidos'
      }
      #swagger.responses[404] = {
          description: 'Venda não encontrada'
      }
    */
  );
}
