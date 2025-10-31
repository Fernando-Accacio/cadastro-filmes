const mysql = require('mysql2');
// NOVIDADE: Carrega as variáveis do arquivo .env
require('dotenv').config();

const acessaBancoNoServidor = mysql.createConnection({
    // Lê as variáveis do process.env
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

acessaBancoNoServidor.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL!');
});

module.exports = acessaBancoNoServidor;