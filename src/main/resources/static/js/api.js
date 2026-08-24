const API_BASE = '/funcionarios';

/**
 * TODO: implementar.
 * Fazer um fetch GET em API_BASE e retornar a lista de funcionários (array).
 * Dica: o back-end retorna 204 (sem corpo) quando a lista está vazia — trate esse caso
 * retornando [] em vez de tentar fazer .json() de uma resposta vazia.
 */
async function listarFuncionarios() {
    return fetch(`${API_BASE}`).then(resposta => {
      if (!resposta.ok) throw new Error('Não foi possível buscar os funcionários');
      return resposta.json();
});}

/**
 * TODO: implementar.
 * Fazer um fetch GET em `${API_BASE}/${id}` e retornar o funcionário encontrado,
 * ou null se a resposta vier 404.
 */
async function buscarFuncionario(id) {
  return fetch(`${API_BASE}/${id}`).then(resposta => {
      if (!resposta.ok) throw new Error('Não foi possível buscar o funcionário');
      return resposta.json();
  });
}

/**
 * TODO: implementar.
 * Fazer um fetch POST em API_BASE, enviando `dados` como JSON no body
 * (não esquece do header 'Content-Type': 'application/json'),
 * e retornar o funcionário criado pelo back-end (já com o id gerado).
 */
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

/**
 * TODO: implementar.
 * Fazer um fetch PUT em `${API_BASE}/${id}`, enviando `dados` completos como JSON,
 * e retornar o funcionário atualizado.
 */
async function atualizarFuncionario(id, dados) {
    throw new Error('atualizarFuncionario() ainda não foi implementada — veja o TODO em api.js');
}

/**
 * TODO: implementar.
 * Fazer um fetch PATCH em `${API_BASE}/${id}`, enviando só os campos que mudaram
 * (ex: { status: 'APROVADO' }) como JSON, e retornar o funcionário atualizado.
 */
async function atualizarParcial(id, dados) {
    throw new Error('atualizarParcial() ainda não foi implementada — veja o TODO em api.js');
}

/**
 * TODO: implementar.
 * Fazer um fetch DELETE em `${API_BASE}/${id}`.
 */
async function excluirFuncionario(id) {
    throw new Error('excluirFuncionario() ainda não foi implementada — veja o TODO em api.js');
}
