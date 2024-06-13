const fornecedorController = require('../Controllers/fornecedor');
const autenticacao = require('../autenticacao/autenticacao');

module.exports = (app) => {
  app.get('/fornecedor', autenticacao, fornecedorController.getFornecedor
    /* 
      #swagger.tags = ["FORNECEDOR"]
      #swagger.summary = "Retorna todos os fornecedores"
      #swagger.responses[200] = {
          description: 'Consulta realizada com sucesso',
          schema: {
              fornecedor_id: 1,
              nome: "Nome do Fornecedor",
              endereco: "Endereço do Fornecedor",
              telefone: "(00) 00000-0000",
              email: "fornecedor@example.com",
              cnpj: "12345678901234"
          }
      }
      #swagger.responses[400] = {
          description: 'Dados inválidos'
      }
    */
  );

  app.get('/fornecedor/:id', autenticacao, fornecedorController.getFornecedorById
  /* 
    #swagger.tags = ["FORNECEDOR"]
    #swagger.summary = "Retorna os fornecedores pelo ID"
    #swagger.responses[200] = {
        description: 'Consulta realizada com sucesso',
        schema: {
            fornecedor_id: 1,
            nome: "Nome do Fornecedor",
            endereco: "Endereço do Fornecedor",
            telefone: "(00) 00000-0000",
            email: "fornecedor@example.com",
            cnpj: "12345678901234"
        }
    }
    #swagger.responses[400] = {
        description: 'Dados inválidos'
    }
  */
);

  app.post('/fornecedor', autenticacao, fornecedorController.postFornecedor
    /* 
      #swagger.tags = ["FORNECEDOR"]
      #swagger.summary = "Insere um fornecedor"
      #swagger.parameters['json'] = {
          in: 'body',
          description: 'Dados para inserir um novo fornecedor',
          type: 'json',
          schema: {
              nome: "Nome do Fornecedor",
              endereco: "Endereço do Fornecedor",
              telefone: "(00) 00000-0000",
              email: "fornecedor@example.com",
              cnpj: "12345678901234"
          }
      }
      #swagger.responses[201] = {
          description: 'Fornecedor criado com sucesso',
          schema: {
              fornecedor_id: 1,
              nome: "Nome do Fornecedor",
              endereco: "Endereço do Fornecedor",
              telefone: "(00) 00000-0000",
              email: "fornecedor@example.com",
              cnpj: "12345678901234"
          }
      }
      #swagger.responses[400] = {
          description: 'Dados inválidos'
      }
    */
  );

  app.delete('/fornecedor/:id', autenticacao, fornecedorController.deleteFornecedor
    /* 
      #swagger.tags = ["FORNECEDOR"]
      #swagger.summary = "Deleta um fornecedor"
      #swagger.parameters['id'] = {
          in: 'path',
          description: 'ID do Fornecedor',
          required: true,
          type: 'integer'
      }
      #swagger.responses[204] = {
          description: 'Fornecedor deletado com sucesso'
      }
      #swagger.responses[404] = {
          description: 'Fornecedor não encontrado'
      }
    */
  );


  app.patch('/fornecedor/:id', autenticacao, fornecedorController.patchFornecedor
    /* 
      #swagger.tags = ["FORNECEDOR"]
      #swagger.summary = "Atualiza parcialmente um fornecedor"
      #swagger.parameters['id'] = {
          in: 'path',
          description: 'ID do Fornecedor',
          required: true,
          type: 'integer'
      }
      #swagger.parameters['json'] = {
          in: 'body',
          description: 'Dados para atualizar parcialmente um Fornecedor',
          type: 'json',
          schema: {
              nome: "Nome do Fornecedor",
              endereco: "Endereço do Fornecedor",
              telefone: "(00) 00000-0000",
              email: "fornecedor@example.com",
              cnpj: "12345678901234"
          }
      }
      #swagger.responses[200] = {
          description: 'Fornecedor atualizado com sucesso',
          schema: {
              fornecedor_id: 1,
              nome: "Nome do Fornecedor",
              endereco: "Endereço do Fornecedor",
              telefone: "(00) 00000-0000",
              email: "fornecedor@example.com",
              cnpj: "12345678901234"
          }
      }
            #swagger.responses[400] = {
          description: 'Dados inválidos'
      }
      #swagger.responses[404] = {
          description: 'Fornecedor não encontrado'
      }
    */
  );
}
