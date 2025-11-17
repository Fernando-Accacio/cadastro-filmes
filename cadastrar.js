document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-cadastro');
    const messageDiv = document.getElementById('message');

    /**
     * @param {string} inputId
     * @param {string} contadorId 
     * @param {number} limite
     * @returns {Function}
     */
    function setupContador(inputId, contadorId, limite) {
        const input = document.getElementById(inputId);
        const contador = document.getElementById(contadorId);

        if (!input || !contador) return () => {};

        const atualizarContagem = () => {
            const contagem = input.value.length;
            contador.textContent = `${contagem}/${limite}`;
            
            if (contagem >= limite) {
                contador.style.color = '#ff3b30';
            } else {
                contador.style.color = 'var(--netflix-light-gray)';
            }
        };

        input.addEventListener('input', atualizarContagem);
        return atualizarContagem;
    }

    const atualizarContadorTitulo = setupContador('titulo', 'contador-titulo', 100);
    const atualizarContadorGenero = setupContador('genero', 'contador-genero', 50);
    const atualizarContadorPlataforma = setupContador('plataforma_streaming', 'contador-plataforma', 50);

    form.addEventListener('submit', async function (e) {
        e.preventDefault(); 

        const dadosFilme = {
            titulo: document.getElementById('titulo').value,
            genero: document.getElementById('genero').value,
            ano_lancamento: document.getElementById('ano_lancamento').value,
            plataforma_streaming: document.getElementById('plataforma_streaming').value
        };

        const url = 'http://localhost:3000/filmes';
        const method = 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosFilme)
            });

            const data = await response.json();

            if (response.ok) {
                messageDiv.textContent = 'Filme cadastrado com sucesso!';
                messageDiv.className = 'message success';
                form.reset();
                
                atualizarContadorTitulo();
                atualizarContadorGenero();
                atualizarContadorPlataforma();

                const submitButton = form.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.disabled = true;
                }

                setTimeout(() => {
                    window.location.href = 'listar.html';
                }, 2000);
                
            } else {
                throw new Error(data.error || data.message || 'Erro ao cadastrar');
            }
        } catch (error) {
            messageDiv.textContent = 'Erro: ' + error.message;
            messageDiv.className = 'message error';
        }
    });
});