CREATE TABLE Clientes (
    cliente_id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    telefone VARCHAR(20),  
    endereco VARCHAR(255),  
    cpf VARCHAR(14) NOT NULL UNIQUE,
);

CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    salt TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE Produtos (
    produto_id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL,
    quantidade_disponivel INT NOT NULL,
    tamanho VARCHAR(50),  
    cor VARCHAR(50),     
    tipo VARCHAR(50)     
);

CREATE TABLE Fornecedores (
    fornecedor_id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    endereco VARCHAR(255),
    telefone VARCHAR(20),
    email VARCHAR(255),
    cnpj VARCHAR(14) NOT NULL UNIQUE
);

CREATE TABLE Compras (
    compra_id SERIAL PRIMARY KEY,
    cliente_id INTEGER NOT NULL,
    data_compra DATE NOT NULL DEFAULT CURRENT_DATE,
    valor_total DECIMAL(10, 2) NOT NULL,
    desconto DECIMAL(5, 2) DEFAULT 0.00,
    forma_pagamento VARCHAR(50),  
    endereco_entrega VARCHAR(255), 
    observacao TEXT,  
    FOREIGN KEY (cliente_id) REFERENCES Clientes(cliente_id)
);

CREATE TABLE Vendas (
    venda_id SERIAL PRIMARY KEY,
    cliente_id INTEGER NOT NULL,
    data_venda DATE NOT NULL DEFAULT CURRENT_DATE,
    valor_total DECIMAL(10, 2) NOT NULL,
    desconto DECIMAL(5, 2) DEFAULT 0.00,
    forma_pagamento VARCHAR(50),  
    endereco_entrega VARCHAR(255), 
    observacao TEXT,  
    FOREIGN KEY (cliente_id) REFERENCES Clientes(cliente_id)
);

CREATE TABLE Venda_Produtos (
    venda_id INTEGER NOT NULL,
    produto_id INTEGER NOT NULL,
    venda_produto_id SERIAL PRIMARY KEY,
    quantidade INT NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    preco_unitario DECIMAL(10, 2) NOT NULL,
    desconto DECIMAL(5, 2) DEFAULT 0.00,
    FOREIGN KEY (venda_id) REFERENCES Vendas(venda_id),
    FOREIGN KEY (produto_id) REFERENCES Produtos(produto_id)
);

CREATE TABLE Compra_Produtos (
    compra_id INTEGER NOT NULL,
    produto_id INTEGER NOT NULL,
    compra_produto_id SERIAL PRIMARY KEY,
    quantidade INT NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    preco_unitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (compra_id) REFERENCES Compras(compra_id),
    FOREIGN KEY (produto_id) REFERENCES Produtos(produto_id)
);

CREATE TABLE Produtos_Fornecedores (
    produto_id INTEGER NOT NULL,
    fornecedor_id INTEGER NOT NULL,
    produtos_fornecedores_id SERIAL PRIMARY KEY,
    preco_compra DECIMAL(10, 2) NOT NULL,
    data_ultima_compra DATE,
    quantidade_ultima_compra INT,
    FOREIGN KEY (produto_id) REFERENCES Produtos(produto_id),
    FOREIGN KEY (fornecedor_id) REFERENCES Fornecedores(fornecedor_id)
);
