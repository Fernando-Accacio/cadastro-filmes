document.getElementById('form-cadastro').addEventListener('submit', async function (e) {
    e.preventDefault(); 

    const titulo = document.getElementById('titulo').value;
    const genero = document.getElementById('genero').value;
    const ano_lancamento = document.getElementById('ano_lancamento').value;
    const plataforma_streaming = document.getElementById('plataforma_streaming').value;

    const messageDiv = document.getElementById('message');

    try {
        const response = await fetch('http://localhost:3000/filmes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo, genero, ano_lancamento, plataforma_streaming })
        });

        const data = await response.json();

        if (response.ok) {
            messageDiv.textContent = 'Filme cadastrado com sucesso!';
            messageDiv.className = 'message success';
            document.getElementById('form-cadastro').reset();
        } else {
            throw new Error(data.error || 'Erro ao cadastrar');
        }
    } catch (error) {
        messageDiv.textContent = 'Erro: ' + error.message;
        messageDiv.className = 'message error';
    }
});