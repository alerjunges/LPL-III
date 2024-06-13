const usuariosController = require('../Controllers/usuario')

module.exports = (app) => {
    app.post('/user', usuariosController.newUser
        /*   
            #swagger.tags = ["Usuário"]
            #swagger.summary = 'Cria um novo usuário'
            #swagger.parameters['json'] = {
                in: 'body',
                description: 'Dados para criar um novo usuário',
                type: 'json',
                schema: {
                    username : "alexandre",
                    password : "alealeale",
                    salt : "alealeale"
                }
            }
            #swagger.responses[201] = {
                description: 'Usuário criado com sucesso',
                schema: {
                    id: 1,
                    username : "alexandre",
                    password : "alealeale",
                    salt : "alealeale"
                }
            }
            #swagger.responses[400] = {
                description: 'Dados inválidos'
            }
        */
    )
    app.get('/user', usuariosController.getUser
        /* 
            #swagger.tags = ["Usuário"]
            #swagger.summary = 'Obtém a lista de usuários'
            #swagger.responses[200] = {
                description: 'Lista de usuários',
                schema: [
                    {
                    usuario_id: 1,
                    username : "alexandre",
                    password : "alealeale",
                    salt : "alealeale"
                    }
                ]
            }
        */
    )
    app.patch('/user/:id', usuariosController.patchUser
    /* 
        #swagger.tags = ["Usuário"]
        #swagger.summary = 'Atualiza um usuário'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID do usuário a ser atualizado',
            required: true,
            type: 'integer',
            example: 1
        }
        #swagger.parameters['json'] = {
            in: 'body',
            description: 'Dados do usuário a serem atualizados',
            type: 'json',
            schema: {
                    username : "alexandre",
                    password : "alealeale",
                    salt : "alealeale"
            }
        }
        #swagger.responses[200] = {
            description: 'Usuário atualizado com sucesso',
            schema: {
                    id: 1,
                    username : "Exemplo Nome",
                    password : "alealeale",
                    salt : "alealeale"
            }
        }
        #swagger.responses[400] = {
            description: 'Dados inválidos'
        }
        #swagger.responses[404] = {
            description: 'Usuário não encontrado'
        }
        #swagger.responses[500] = {
            description: 'Erro ao atualizar usuário'
        }
    */
)
    app.delete('/user/:id', usuariosController.deleteUser
        /* 
            #swagger.tags = ["Usuário"]
            #swagger.summary = 'Remove um usuário'
            #swagger.parameters['id'] = {
                in: 'path',
                description: 'ID do usuário a ser removido',
                required: true,
                type: 'integer',
                example: 1
            }
            #swagger.responses[404] = {
                description: 'Usuário não encontrado'
            }
        */
    )
}