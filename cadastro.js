document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-cadastro');
    const messageDiv = document.getElementById('message');
    const formButton = form.querySelector('button[type="submit"]');
    const headerTitle = document.querySelector('header h1');
    const headerSubtitle = document.querySelector('header p');

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
    let isEditMode = false;

    if (filmeId) {
        isEditMode = true;
        carregarDadosParaEdicao(filmeId);
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

            headerTitle.textContent = 'Editar Filme';
            headerSubtitle.textContent = 'Altere os dados do filme abaixo.';
            formButton.textContent = 'Salvar Alterações';

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

        const url = isEditMode ? `http://localhost:3000/filmes/${filmeId}` : 'http://localhost:3000/filmes';
        const method = isEditMode ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosFilme)
            });

            const data = await response.json();

            if (response.ok) {
                if (isEditMode) {
                    messageDiv.textContent = 'Filme atualizado com sucesso!';
                } else {
                    messageDiv.textContent = 'Filme cadastrado com sucesso!';
                    form.reset();
                    
                    atualizarContadorTitulo();
                    atualizarContadorGenero();
                    atualizarContadorPlataforma();
                }
                messageDiv.className = 'message success';
            } else {
                throw new Error(data.error || data.message || (isEditMode ? 'Erro ao atualizar' : 'Erro ao cadastrar'));
            }
        } catch (error) {
            messageDiv.textContent = 'Erro: ' + error.message;
            messageDiv.className = 'message error';
        }
    });
});