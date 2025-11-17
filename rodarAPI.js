const express = require('express');
const cors = require('cors');
const acessaBancoNoServidor = require('./acessaBancoNoServidor'); 

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.')); 

// Rota POST (Cadastrar)
app.post('/filmes', (req, res) => {
    const { titulo, genero, ano_lancamento, plataforma_streaming } = req.body;
    const codigoDoMySQL = 'INSERT INTO filmes_streaming (titulo, genero, ano_lancamento, plataforma_streaming) VALUES (?, ?, ?, ?)';

    acessaBancoNoServidor.query(codigoDoMySQL, [titulo, genero, ano_lancamento, plataforma_streaming], (err, results) => {
        if (err) {
            console.error('Erro ao inserir filme:', err);
            return res.status(500).json({ error: 'Erro ao cadastrar filme' });
        }
        console.log('Filme cadastrado com sucesso!');
        res.status(201).json({ message: 'Filme cadastrado!', data: results });
    });
});

// Rota GET (Listar todos)
app.get('/filmes', (req, res) => {
    const codigoDoMySQL = 'SELECT * FROM filmes_streaming';

    acessaBancoNoServidor.query(codigoDoMySQL, (err, results) => {
        if (err) {
            console.error('Erro ao buscar filmes:', err);
            return res.status(500).json({ error: 'Erro ao buscar filmes' });
        }
        res.status(200).json(results);
    });
});

// Rota GET (Buscar UM filme por ID) - Para a página de edição
app.get('/filmes/:id', (req, res) => {
    const { id } = req.params;
    const codigoDoMySQL = 'SELECT * FROM filmes_streaming WHERE id = ?';

    acessaBancoNoServidor.query(codigoDoMySQL, [id], (err, results) => {
        if (err) {
            console.error('Erro ao buscar filme:', err);
            return res.status(500).json({ error: 'Erro ao buscar filme' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Filme não encontrado' });
        }
        res.status(200).json(results[0]);
    });
});

// Rota PUT (Atualizar) - Para salvar a edição
app.put('/filmes/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, genero, ano_lancamento, plataforma_streaming } = req.body;

    const codigoDoMySQL = 'UPDATE filmes_streaming SET titulo = ?, genero = ?, ano_lancamento = ?, plataforma_streaming = ? WHERE id = ?';
    const valores = [titulo, genero, ano_lancamento, plataforma_streaming, id];

    acessaBancoNoServidor.query(codigoDoMySQL, valores, (err, results) => {
        if (err) {
            console.error('Erro ao atualizar filme:', err);
            return res.status(500).json({ error: 'Erro ao atualizar filme' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Filme não encontrado' });
        }
        console.log('Filme atualizado com sucesso!');
        res.status(200).json({ message: 'Filme atualizado com sucesso!' });
    });
});

// Rota DELETE (Apagar)
app.delete('/filmes/:id', (req, res) => {
    const { id } = req.params; 

    const codigoDoMySQL = 'DELETE FROM filmes_streaming WHERE id = ?';

    acessaBancoNoServidor.query(codigoDoMySQL, [id], (err, results) => {
        if (err) {
            console.error('Erro ao apagar filme:', err);
            return res.status(500).json({ error: 'Erro ao apagar filme' });
        }
        
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Filme não encontrado' });
        }

        console.log('Filme apagado com sucesso!');
        res.status(200).json({ message: 'Filme apagado com sucesso!' });
    });
});


app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
    console.log('Para cadastrar, acesse: http://localhost:3000/cadastrar.html');
    console.log('Para listar, acesse: http://localhost:3000/listar.html');
});