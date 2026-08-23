const API_BASE = '/funcionarios';

function atualizarFuncionario(id, dados) {
    return fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    }).then(resposta => {
        if (!resposta.ok) throw new Error('Não foi possível atualizar o funcionário');
        return resposta.json();
    });
}

async function atualizarParcial(id, dados) {
    return fetch(`${API_BASE}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    }).then(resposta => {
        if (!resposta.ok) throw new Error('Não foi possível atualizar o status do funcionário');
        return resposta.json();
    });
}

async function excluirFuncionario(id) {
    return fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
    }).then(resposta => {
        if (!resposta.ok) throw new Error('Não foi possível deletar o funcionário');
    });
}
