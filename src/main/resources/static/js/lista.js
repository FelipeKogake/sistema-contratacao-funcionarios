let candidatos = [];
let idEmEdicao = null;
let idParaExcluir = null;

const STATUS_LABEL = {
    EM_ANALISE: 'Em análise',
    APROVADO: 'Aprovado',
    REPROVADO: 'Reprovado',
    CONTRATADO: 'Contratado'
};

document.addEventListener('DOMContentLoaded', () => {
    carregarCandidatos();

    document.getElementById('btnNovoCandidato').addEventListener('click', abrirModalCriacao);
    document.getElementById('formCandidato').addEventListener('submit', salvarCandidato);
    document.getElementById('btnConfirmarExclusao').addEventListener('click', confirmarExclusao);

    document.getElementById('filtroNome').addEventListener('input', renderizarTabela);
    document.getElementById('filtroCargo').addEventListener('input', renderizarTabela);
    document.getElementById('filtroStatus').addEventListener('change', renderizarTabela);
});

async function carregarCandidatos() {
    // TODO: quando listarFuncionarios() estiver implementada em api.js, troque a linha abaixo por:
    // candidatos = await listarFuncionarios();
    candidatos = CANDIDATOS_EXEMPLO;
    renderizarTabela();
}

function renderizarTabela() {
    const nomeFiltro = document.getElementById('filtroNome').value.toLowerCase();
    const cargoFiltro = document.getElementById('filtroCargo').value.toLowerCase();
    const statusFiltro = document.getElementById('filtroStatus').value;

    const filtrados = candidatos.filter(c =>
        (c.nome || '').toLowerCase().includes(nomeFiltro) &&
        (c.cargo || '').toLowerCase().includes(cargoFiltro) &&
        (statusFiltro === '' || c.status === statusFiltro)
    );

    const corpo = document.getElementById('corpoTabela');
    const estadoVazio = document.getElementById('estadoVazio');
    corpo.innerHTML = '';

    if (filtrados.length === 0) {
        estadoVazio.classList.remove('d-none');
        return;
    }
    estadoVazio.classList.add('d-none');

    filtrados.forEach(c => {
        const salario = c.salario != null
            ? Number(c.salario).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            : '-';

        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>
                <div class="fw-semibold">${escapeHtml(c.nome)}</div>
                <div class="text-muted small">${escapeHtml(c.email || '')}</div>
            </td>
            <td>${escapeHtml(c.cargo || '-')}</td>
            <td>${escapeHtml(c.departamento || '-')}</td>
            <td>${escapeHtml(c.cidade || '-')}</td>
            <td>${salario}</td>
            <td>
                <select class="form-select form-select-sm status-select status-${c.status}" data-id="${c.id}">
                    ${Object.entries(STATUS_LABEL).map(([valor, label]) =>
                        `<option value="${valor}" ${valor === c.status ? 'selected' : ''}>${label}</option>`
                    ).join('')}
                </select>
            </td>
            <td class="text-end">
                <button class="btn btn-sm btn-icon btn-editar" data-id="${c.id}" title="Editar">
                    <i class="bi bi-pencil-fill"></i>
                </button>
                <button class="btn btn-sm btn-icon btn-excluir" data-id="${c.id}" data-nome="${escapeHtml(c.nome)}" title="Excluir">
                    <i class="bi bi-trash3-fill"></i>
                </button>
            </td>
        `;
        corpo.appendChild(linha);
    });

    document.querySelectorAll('.status-select').forEach(select => select.addEventListener('change', mudarStatus));
    document.querySelectorAll('.btn-editar').forEach(btn =>
        btn.addEventListener('click', () => abrirModalEdicao(Number(btn.dataset.id))));
    document.querySelectorAll('.btn-excluir').forEach(btn =>
        btn.addEventListener('click', () => abrirModalExclusao(Number(btn.dataset.id), btn.dataset.nome)));
}

function escapeHtml(texto) {
    const div = document.createElement('div');
    div.textContent = texto ?? '';
    return div.innerHTML;
}

async function mudarStatus(evento) {
    const id = Number(evento.target.dataset.id);
    const novoStatus = evento.target.value;
    try {
        await atualizarParcial(id, { status: novoStatus });
        const candidato = candidatos.find(c => c.id === id);
        if (candidato) candidato.status = novoStatus;
        evento.target.className = `form-select form-select-sm status-select status-${novoStatus}`;
    } catch (erro) {
        alert('Não foi possível atualizar o status: ' + erro.message);
    }
}

function abrirModalCriacao() {
    idEmEdicao = null;
    document.getElementById('formCandidato').reset();
    document.getElementById('candidatoId').value = '';
    document.getElementById('modalFormTitulo').innerHTML =
        '<i class="bi bi-person-plus-fill me-2"></i>Novo Candidato';
    document.getElementById('campoStatus').value = 'EM_ANALISE';
}

function abrirModalEdicao(id) {
    const candidato = candidatos.find(c => c.id === id);
    if (!candidato) return;

    idEmEdicao = id;
    document.getElementById('candidatoId').value = id;
    document.getElementById('campoNome').value = candidato.nome || '';
    document.getElementById('campoEmail').value = candidato.email || '';
    document.getElementById('campoTelefone').value = candidato.telefone || '';
    document.getElementById('campoCargo').value = candidato.cargo || '';
    document.getElementById('campoDepartamento').value = candidato.departamento || '';
    document.getElementById('campoCidade').value = candidato.cidade || '';
    document.getElementById('campoSalario').value = candidato.salario ?? '';
    document.getElementById('campoStatus').value = candidato.status || 'EM_ANALISE';
    document.getElementById('modalFormTitulo').innerHTML =
        '<i class="bi bi-pencil-fill me-2"></i>Editar Candidato';

    new bootstrap.Modal(document.getElementById('modalForm')).show();
}

async function salvarCandidato(evento) {
    evento.preventDefault();

    const dados = {
        nome: document.getElementById('campoNome').value,
        email: document.getElementById('campoEmail').value,
        telefone: document.getElementById('campoTelefone').value,
        cargo: document.getElementById('campoCargo').value,
        departamento: document.getElementById('campoDepartamento').value,
        cidade: document.getElementById('campoCidade').value,
        salario: document.getElementById('campoSalario').value
            ? Number(document.getElementById('campoSalario').value)
            : null,
        status: document.getElementById('campoStatus').value
    };

    const botao = document.getElementById('btnSalvarCandidato');
    botao.disabled = true;

    try {
        if (idEmEdicao) {
            await atualizarFuncionario(idEmEdicao, dados);
        } else {
            await criarFuncionario(dados);
        }
        bootstrap.Modal.getInstance(document.getElementById('modalForm')).hide();
        await carregarCandidatos();
    } catch (erro) {
        alert('Erro ao salvar candidato: ' + erro.message);
    } finally {
        botao.disabled = false;
    }
}

function abrirModalExclusao(id, nome) {
    idParaExcluir = id;
    document.getElementById('nomeExcluir').textContent = nome;
    new bootstrap.Modal(document.getElementById('modalDelete')).show();
}

async function confirmarExclusao() {
    if (!idParaExcluir) return;
    try {
        await excluirFuncionario(idParaExcluir);
        bootstrap.Modal.getInstance(document.getElementById('modalDelete')).hide();
        await carregarCandidatos();
    } catch (erro) {
        alert('Erro ao excluir candidato: ' + erro.message);
    }
}
