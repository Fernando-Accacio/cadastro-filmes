CREATE TABLE IF NOT EXISTS filmes_streaming (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    genero VARCHAR(50),
    ano_lancamento INT,
    plataforma_streaming VARCHAR(50)
);
