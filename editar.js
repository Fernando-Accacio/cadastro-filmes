document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-edicao');
    const messageDiv = document.getElementById('message');
    const formButton = form.querySelector('button[type="submit"]');
    const headerTitle = document.getElementById('header-titulo');
    const headerSubtitle = document.getElementById('header-subtitulo');

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

    const urlParams = new URLSearchParams(window.location.search);
    const filmeId = urlParams.get('id');

    if (filmeId) {
        carregarDadosParaEdicao(filmeId);
    } else {
        messageDiv.textContent = 'ID do filme não fornecido.';
        messageDiv.className = 'message error';
        form.style.display = 'none';
    }

    async function carregarDadosParaEdicao(id) {
        try {
            const response = await fetch(`http://localhost:3000/filmes/${id}`);
            if (!response.ok) throw new Error('Filme não encontrado');
            const filme = await response.json();

            document.getElementById('titulo').value = filme.titulo;
            document.getElementById('genero').value = filme.genero;
            document.getElementById('ano_lancamento').value = filme.ano_lancamento;
            document.getElementById('plataforma_streaming').value = filme.plataforma_streaming;

            atualizarContadorTitulo();
            atualizarContadorGenero();
            atualizarContadorPlataforma();

        } catch (error) {
            messageDiv.textContent = 'Erro ao carregar dados: ' + error.message;
            messageDiv.className = 'message error';
        }
    }

    form.addEventListener('submit', async function (e) {
        e.preventDefault(); 

        const dadosFilme = {
            titulo: document.getElementById('titulo').value,
            genero: document.getElementById('genero').value,
            ano_lancamento: document.getElementById('ano_lancamento').value,
            plataforma_streaming: document.getElementById('plataforma_streaming').value
        };

        const url = `http://localhost:3000/filmes/${filmeId}`;
        const method = 'PUT';

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosFilme)
            });

            const data = await response.json();

            if (response.ok) {
                messageDiv.textContent = 'Filme atualizado com sucesso!';
                messageDiv.className = 'message success';

                if (formButton) {
                    formButton.disabled = true;
                }

                setTimeout(() => {
                    window.location.href = 'listar.html';
                }, 2000);
                
            } else {
                throw new Error(data.error || data.message || 'Erro ao atualizar');
            }
        } catch (error) {
            messageDiv.textContent = 'Erro: ' + error.message;
            messageDiv.className = 'message error';
        }
    });
});