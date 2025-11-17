document.addEventListener('DOMContentLoaded', () => {
    const messageDiv = document.getElementById('message');
    const filmeInfoDiv = document.getElementById('filme-info');
    const btnConfirmar = document.getElementById('btn-confirmar-delete');
    const btnCancelar = document.getElementById('btn-cancelar');
    
    const confirmationBox = document.querySelector('.confirmation-box');

    const urlParams = new URLSearchParams(window.location.search);
    const filmeId = urlParams.get('id');

    if (!filmeId) {
        messageDiv.textContent = 'ID do filme não fornecido.';
        messageDiv.className = 'message error';
        filmeInfoDiv.textContent = '';
        btnConfirmar.disabled = true;
        return;
    }

    async function carregarDadosFilme() {
        try {
            const response = await fetch(`http://localhost:3000/filmes/${filmeId}`);
            if (!response.ok) throw new Error('Filme não encontrado');
            const filme = await response.json();
            
            filmeInfoDiv.textContent = `"${filme.titulo}"`;

        } catch (error) {
            messageDiv.textContent = 'Erro ao carregar dados: ' + error.message;
            messageDiv.className = 'message error';
            filmeInfoDiv.textContent = 'Filme não encontrado';
            btnConfirmar.disabled = true;
        }
    }

    btnCancelar.addEventListener('click', () => {
        window.location.href = 'listar.html';
    });

    btnConfirmar.addEventListener('click', async () => {
        try {
            const response = await fetch(`http://localhost:3000/filmes/${filmeId}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (response.ok) {

                messageDiv.textContent = 'Filme apagado com sucesso!';
                messageDiv.className = 'message success';

                if (confirmationBox) {
                    confirmationBox.style.display = 'none';
                }

                setTimeout(() => {
                    window.location.href = 'listar.html';
                }, 2000);
                

            } else {
                throw new Error(data.message || 'Erro ao apagar filme');
            }

        } catch (error) {
            messageDiv.textContent = error.message;
            messageDiv.className = 'message error';
        }
    });

    carregarDadosFilme();
});