const produtoController = require('../Controllers/produto');
const autenticacao = require('../autenticacao/autenticacao');

module.exports = (app) => {
  app.get('/produto', autenticacao, produtoController.getProduto
    /* 
      #swagger.tags = ["PRODUTO"]
      #swagger.summary = "Retorna todos os produtos"
      #swagger.responses[200] = {
          description: 'Consulta realizada com sucesso',
          schema: {
              produto_id: 1,
              nome: "Produto",
              descricao: "Descrição do produto",
              preco: 100.00,
              quantidade_disponivel: 10,
              tamanho: "M",
              cor: "Azul",
              tipo: "Eletrônico"
          }
      }
      #swagger.responses[400] = {
          description: 'Dados inválidos'
      }
    */
  );

  app.get('/produto/:id', autenticacao, produtoController.getProduto
  /* 
    #swagger.tags = ["PRODUTO"]
    #swagger.summary = "Retorna os produtos pelo ID"
    #swagger.responses[200] = {
        description: 'Consulta realizada com sucesso',
        schema: {
            produto_id: 1,
            nome: "Produto",
            descricao: "Descrição do produto",
            preco: 100.00,
            quantidade_disponivel: 10,
            tamanho: "M",
            cor: "Azul",
            tipo: "Eletrônico"
        }
    }
    #swagger.responses[400] = {
        description: 'Dados inválidos'
    }
  */
);

  app.post('/produto', autenticacao, produtoController.postProduto
    /* 
      #swagger.tags = ["PRODUTO"]
      #swagger.summary = "Insere um produto"
      #swagger.parameters['json'] = {
          in: 'body',
          description: 'Dados para inserir um novo Produto',
          type: 'json',
          schema: {
              nome: "Produto",
              descricao: "Descrição do produto",
              preco: 100.00,
              quantidade_disponivel: 10,
              tamanho: "M",
              cor: "Azul",
              tipo: "Eletrônico"
          }
      }
      #swagger.responses[201] = {
          description: 'Produto criado com sucesso',
          schema: {
              produto_id: 1,
              nome: "Produto",
              descricao: "Descrição do produto",
              preco: 100.00,
              quantidade_disponivel: 10,
              tamanho: "M",
              cor: "Azul",
              tipo: "Eletrônico"
          }
      }
      #swagger.responses[400] = {
          description: 'Dados inválidos'
      }
    */
  );

  app.delete('/produto/:id', autenticacao, produtoController.deleteProduto
    /* 
      #swagger.tags = ["PRODUTO"]
      #swagger.summary = "Deleta um produto"
      #swagger.parameters['id'] = {
          in: 'path',
          description: 'ID do Produto',
          required: true,
          type: 'integer'
      }
      #swagger.responses[204] = {
          description: 'Produto deletado com sucesso'
      }
      #swagger.responses[404] = {
          description: 'Produto não encontrado'
      }
    */
  );


  app.patch('/produto/:id', autenticacao, produtoController.patchProduto
    /* 
      #swagger.tags = ["PRODUTO"]
      #swagger.summary = "Atualiza parcialmente um produto"
      #swagger.parameters['id'] = {
          in: 'path',
          description: 'ID do Produto',
          required: true,
          type: 'integer'
      }
      #swagger.parameters['json'] = {
          in: 'body',
          description: 'Dados para atualizar parcialmente um Produto',
          type: 'json',
          schema: {
              preco: 150.00
          }
      }
      #swagger.responses[200] = {
          description: 'Produto atualizado com sucesso',
          schema: {
              produto_id: 1,
              nome: "Produto",
              descricao: "Descrição do produto",
              preco: 150.00,
              quantidade_disponivel: 10,
              tamanho: "M",
              cor: "Azul",
              tipo: "Eletrônico"
          }
      }
      #swagger.responses[400] = {
          description: 'Dados inválidos'
      }
      #swagger.responses[404] = {
          description: 'Produto não encontrado'
      }
    */
  );
}
