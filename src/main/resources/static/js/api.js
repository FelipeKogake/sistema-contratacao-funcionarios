const API_BASE = '/funcionarios';

async function listarFuncionarios() {
    return fetch(`${API_BASE}`).then(resposta => {
      if (!resposta.ok) throw new Error('Não foi possível buscar os funcionários');
      return resposta.json();
});
}

async function buscarFuncionario(id) {
  return fetch(`${API_BASE}/${id}`).then(resposta => {
      if (!resposta.ok) throw new Error('Não foi possível buscar o funcionário');
      return resposta.json();
  });
}

async function criarFuncionario(dados) {
  return fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
  }).then(resposta => {
      if (!resposta.ok) throw new Error('Não foi possível criar o funcionário');
      return resposta.json();
  });
}

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
