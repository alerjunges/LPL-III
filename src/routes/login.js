const loginController = require('../Controllers/login')

module.exports = (app) => {
    app.post('/login', loginController.login
        /*   
            #swagger.tags = ["Login"]
            #swagger.summary = 'Autenticação do usuário'
            #swagger.parameters['json'] = {
                in: 'body',
                description: 'Dados para autenticar o usuário',
                type: 'json',
                schema: {
                    username: "alerjunges",
                    senha: "aleale"
                }
            }
            #swagger.responses[200] = {
                description: 'Usuário logado com sucesso'
            }
            #swagger.responses[401] = {
                description: 'Usuário sem permissão'
            }
            #swagger.responses[500] = {
                description: 'Erro de servidor'
            }
        */
    )
}