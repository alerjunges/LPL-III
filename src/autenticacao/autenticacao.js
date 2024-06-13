
const jwt = require('jsonwebtoken'); // Importa o módulo jsonwebtoken para manipulação de tokens JWT.
const fs = require('fs'); // Importa o módulo fs para operações de leitura/escrita de arquivos.
const path = require('path'); // Importa o módulo path para manipulação de caminhos de arquivo.

const publicKeyPath = path.join(__dirname, '../private/public_key.pem'); // Define o caminho para a chave pública usada para verificar o token JWT.
const publicKey = fs.readFileSync(publicKeyPath, 'utf8'); // Lê o conteúdo da chave pública do arquivo especificado.

const autenticacao = (req, res, next) => {
    const token = req.cookies.auth; // Obtém o token JWT dos cookies da requisição.

    if (!token) { // Verifica se o token não está presente.
        return res.status(401).json({ message: 'Autenticação necessária' }); // Retorna um erro 401 se o token não estiver presente.
    }

    try {
        const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] }); // Verifica e decodifica o token usando a chave pública e o algoritmo RS256.
        req.user = decoded.user; // Armazena as informações do usuário decodificado na requisição para uso posterior.
        next(); // Chama a próxima função middleware na cadeia.
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido ou expirado' }); // Retorna um erro 401 se o token for inválido ou expirado.
    }
};

module.exports = autenticacao; // Exporta a função de autenticação para uso em outros módulos.
