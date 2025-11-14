document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-cadastro');
    const messageDiv = document.getElementById('message');
    const formButton = form.querySelector('button[type="submit"]');
    const headerTitle = document.querySelector('header h1');
    const headerSubtitle = document.querySelector('header p');

    // Verifica se há um ID de filme na URL
    const urlParams = new URLSearchParams(window.location.search);
    const filmeId = urlParams.get('id');

    let isEditMode = false;

    // Se houver um ID, estamos no modo de edição
    if (filmeId) {
        isEditMode = true;
        carregarDadosParaEdicao(filmeId);
    }

    // Função para buscar e preencher os dados do filme
    async function carregarDadosParaEdicao(id) {
        try {
            const response = await fetch(`http://localhost:3000/filmes/${id}`);
            if (!response.ok) throw new Error('Filme não encontrado');
            const filme = await response.json();

            // Preenche o formulário
            document.getElementById('titulo').value = filme.titulo;
            document.getElementById('genero').value = filme.genero;
            document.getElementById('ano_lancamento').value = filme.ano_lancamento;
            document.getElementById('plataforma_streaming').value = filme.plataforma_streaming;

            // Atualiza a interface para "Modo Edição"
            headerTitle.textContent = 'Editar Filme';
            headerSubtitle.textContent = 'Altere os dados do filme abaixo.';
            formButton.textContent = 'Salvar Alterações';

        } catch (error) {
            messageDiv.textContent = 'Erro ao carregar dados: ' + error.message;
            messageDiv.className = 'message error';
        }
    }

    // Adiciona o listener ao formulário
    form.addEventListener('submit', async function (e) {
        e.preventDefault(); 

        const dadosFilme = {
            titulo: document.getElementById('titulo').value,
            genero: document.getElementById('genero').value,
            ano_lancamento: document.getElementById('ano_lancamento').value,
            plataforma_streaming: document.getElementById('plataforma_streaming').value
        };

        // Se for modo edição, usa PUT. Senão, usa POST.
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
                    // Opcional: redirecionar para a lista após editar
                    // setTimeout(() => window.location.href = 'lista.html', 1500);
                } else {
                    messageDiv.textContent = 'Filme cadastrado com sucesso!';
                    form.reset();
                }
                messageDiv.className = 'message success';
            } else {
                throw new Error(data.error || (isEditMode ? 'Erro ao atualizar' : 'Erro ao cadastrar'));
            }
        } catch (error) {
            messageDiv.textContent = 'Erro: ' + error.message;
            messageDiv.className = 'message error';
        }
    });
});