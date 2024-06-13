
const clienteController = require('../Controllers/cliente');
const autenticacao = require('../autenticacao/autenticacao');

module.exports = (app) => {

  app.get('/cliente', autenticacao, clienteController.getCliente
  /*   
        #swagger.tags = ["Cliente"]
        #swagger.summary = 'Retorna todos os Clientes'
        #swagger.responses[200] = {
            description: 'Clientes retornados com sucesso',
            schema: [
                {
                    cliente_id: 1,
                    nome: "Alexandre",
                    email: "alexandrejunges09@gamil.com",
                    telefone: "(49)999870844",
                    endereco: "Rua São Luiz",
                    cpf: "07643505950"
                }
            ]
        }
        #swagger.responses[500] = {
            description: 'Erro no servidor'
        }
    */
  );

  app.get('/cliente/:id', autenticacao, clienteController.getClienteById
  /*   
        #swagger.tags = ["Cliente"]
        #swagger.summary = 'Retorna os Clientes pelo ID'
        #swagger.responses[200] = {
            description: 'Clientes retornados com sucesso',
            schema: [
                {
                    cliente_id: 1,
                    nome: "Alexandre",
                    email: "alexandrejunges09@gamil.com",
                    telefone: "(49)999870844",
                    endereco: "Rua São Luiz",
                    cpf: "07643505950"
                }
            ]
        }
        #swagger.responses[500] = {
            description: 'Erro no servidor'
        }
    */
  );

  app.post('/cliente', autenticacao, clienteController.postCliente
  /*   
        #swagger.tags = ["Cliente"]
        #swagger.summary = 'Insere um Cliente'
        #swagger.parameters['json'] = {
            in: 'body',
            description: 'Dados para inserir um novo Cliente',
            type: 'json',
            schema: {
                nome: "Alexandre",
                email: "alexandrejunges09@gamil.com",
                telefone: "(49)999870844",
                endereco: "Rua São Luiz",
                cpf: "07643505950"
            }
        }
        #swagger.responses[201] = {
            description: 'Cliente criado com sucesso',
            schema: {
                cliente_id: 1,
                nome: "Alexandre",
                email: "alexandrejunges09@gamil.com",
                telefone: "(49)999870844",
                endereco: "Rua São Luiz",
                cpf: "07643505950"
            }
        }
        #swagger.responses[400] = {
            description: 'Dados inválidos'
        }
    */
  );

  app.delete('/cliente/:id', autenticacao, clienteController.deleteCliente
  /*   
        #swagger.tags = ["Cliente"]
        #swagger.summary = 'Deleta um Cliente'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID do Cliente',
            required: true,
            type: 'integer'
        }
        #swagger.responses[204] = {
            description: 'Cliente deletado com sucesso'
        }
        #swagger.responses[500] = {
            description: 'Erro no servidor'
        }
    */
  );


  app.patch('/cliente/:id', autenticacao, clienteController.patchCliente
  /*   
        #swagger.tags = ["Cliente"]
        #swagger.summary = 'Atualiza parcialmente um Cliente'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID do Cliente',
            required: true,
            type: 'integer'
        }
        #swagger.parameters['json'] = {
            in: 'body',
            description: 'Dados para atualizar parcialmente o Cliente',
            type: 'json',
            schema: {
                nome: "Alexandre"
            }
        }
        #swagger.responses[200] = {
            description: 'Cliente atualizado parcialmente com sucesso',
            schema: {
                cliente_id: 1,
                nome: "Alexandre",
                email: "alexandrejunges09@gamil.com",
                telefone: "(49)999870844",
                endereco: "Rua São Luiz",
                cpf: "07643505950"
            }
        }
        #swagger.responses[400] = {
            description: 'Dados inválidos'
        }
    */
  );
}



