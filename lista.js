async function listarFilmes() {
    const resultadoDiv = document.getElementById('resultado-lista');
    resultadoDiv.innerHTML = '<p>Carregando...</p>';

    try {
        const buscaNoBancoDeDados = await fetch('http://localhost:3000/filmes');
        
        if (!buscaNoBancoDeDados.ok) {
            throw new Error('Falha ao buscar dados do servidor');
        }

        const respostaObtida = await buscaNoBancoDeDados.json();

        if (respostaObtida.length === 0) {
            resultadoDiv.innerHTML = '<p>Nenhum filme cadastrado ainda.</p>';
            return;
        }

        let html = '<table>';
        html += '<thead><tr><th>ID</th><th>Título</th><th>Gênero</th><th>Ano</th><th>Plataforma</th><th>Ação</th></tr></thead>';
        html += '<tbody>';

        respostaObtida.forEach(filme => {
            html += `<tr>
                        <td>${filme.id}</td>
                        <td>${filme.titulo}</td>
                        <td>${filme.genero}</td>
                        <td>${filme.ano_lancamento}</td>
                        <td>${filme.plataforma_streaming}</td>
                        <td>
                            <button class="btn-delete" onclick="apagarFilme(${filme.id})">
                                Apagar
                            </button>
                        </td>
                     </tr>`;
        });

        html += '</tbody></table>';
        resultadoDiv.innerHTML = html;

    } catch (error) {
        resultadoDiv.innerHTML = `<p class="message error">Erro ao carregar lista: ${error.message}</p>`;
    }
}

async function apagarFilme(id) {
    if (!confirm('Tem certeza que deseja apagar este filme?')) {
        return; 
    }

    try {
        const response = await fetch(`http://localhost:3000/filmes/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (response.ok) {
            alert('Filme apagado com sucesso!');
            listarFilmes(); 
        } else {
            throw new Error(data.message || 'Erro ao apagar filme');
        }

    } catch (error) {
        alert(error.message);
    }
}