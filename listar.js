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
        html += '<thead><tr><th>ID</th><th>Título</th><th>Gênero</th><th>Ano</th><th>Plataforma</th><th>Ações</th></tr></thead>';
        html += '<tbody>';

        respostaObtida.forEach(filme => {
            html += `<tr>
                        <td>${filme.id}</td>
                        <td>${filme.titulo}</td>
                        <td>${filme.genero}</td>
                        <td>${filme.ano_lancamento}</td>
                        <td>${filme.plataforma_streaming}</td>
                        <td>
                            <button class="btn-edit" onclick="editarFilme(${filme.id})">
                                Editar
                            </button>
                            <button class="btn-delete" onclick="navegarParaDeletar(${filme.id})">
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

function editarFilme(id) {
    window.location.href = `editar.html?id=${id}`;
}

function navegarParaDeletar(id) {
    window.location.href = `deletar.html?id=${id}`;
}