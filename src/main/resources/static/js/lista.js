let idParaExcluir = null;

const STATUS_LABEL = {
    EM_ANALISE: 'Em análise',
    APROVADO: 'Aprovado',
    REPROVADO: 'Reprovado',
    CONTRATADO: 'Contratado'
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnSalvarCandidato').addEventListener('click', abrirModalCriacao);
    document.getElementById('formCandidato').addEventListener('submit', salvarCandidato);
    document.getElementById('btnConfirmarExclusao').addEventListener('click', confirmarExclusao);

    document.getElementById('filtroNome').addEventListener('input', filtrarTabela);
    document.getElementById('filtroCargo').addEventListener('input', filtrarTabela);
    document.getElementById('filtroStatus').addEventListener('change', filtrarTabela);

    // As linhas da tabela já vêm prontas do servidor (th:each no lista.html) — só liga os botões delas.
    ativarBotoesDaLinha(document);
});

function ativarBotoesDaLinha(escopo) {
    escopo.querySelectorAll('.status-select').forEach(select =>
        select.addEventListener('change', mudarStatus));
    escopo.querySelectorAll('.btn-editar').forEach(btn =>
        btn.addEventListener('click', () => abrirModalEdicao(btn.dataset.id)));
    escopo.querySelectorAll('.btn-excluir').forEach(btn =>
        btn.addEventListener('click', () => abrirModalExclusao(btn.dataset.id, btn.dataset.nome)));
}

function filtrarTabela() {
    const nomeFiltro = document.getElementById('filtroNome').value.toLowerCase();
    const cargoFiltro = document.getElementById('filtroCargo').value.toLowerCase();
    const statusFiltro = document.getElementById('filtroStatus').value;

    const linhas = document.querySelectorAll('#corpoTabela tr');
    let algumaVisivel = false;

    linhas.forEach(linha => {
        const nome = (linha.dataset.nome || '').toLowerCase();
        const cargo = (linha.dataset.cargo || '').toLowerCase();
        const status = linha.querySelector('.status-select').value;
        const combina = nome.includes(nomeFiltro) && cargo.includes(cargoFiltro) &&
            (statusFiltro === '' || status === statusFiltro);
        linha.style.display = combina ? '' : 'none';
        if (combina) algumaVisivel = true;
    });

    document.getElementById('estadoVazio').classList.toggle('d-none', algumaVisivel);
}

function escapeHtml(texto) {
    const div = document.createElement('div');
    div.textContent = texto ?? '';
    return div.innerHTML;
}

function formatarSalario(valor) {
    return valor !== null && valor !== undefined && valor !== ''
        ? Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        : '-';
}

async function mudarStatus(evento) {
    const id = evento.target.dataset.id;
    const novoStatus = evento.target.value;
    try {
        await atualizarParcial(id, { status: novoStatus });
        evento.target.className = `form-select form-select-sm status-select status-${novoStatus}`;
    } catch (erro) {
        alert('Não foi possível atualizar o status: ' + erro.message);
    }
}

function abrirModalCriacao() {
    document.getElementById('formCandidato').reset();
    document.getElementById('candidatoId').value = '';
    document.getElementById('modalFormTitulo').innerHTML =
        '<i class="bi bi-person-plus-fill me-2"></i>Novo Candidato';
    document.getElementById('campoStatus').value = 'EM_ANALISE';
}

function abrirModalEdicao(id) {
    const linha = document.querySelector(`tr[data-id="${id}"]`);
    if (!linha) return;

    document.getElementById('candidatoId').value = id;
    document.getElementById('campoNome').value = linha.dataset.nome;
    document.getElementById('campoEmail').value = linha.dataset.email;
    document.getElementById('campoTelefone').value = linha.dataset.telefone;
    document.getElementById('campoCargo').value = linha.dataset.cargo;
    document.getElementById('campoDepartamento').value = linha.dataset.departamento;
    document.getElementById('campoCidade').value = linha.dataset.cidade;
    document.getElementById('campoSalario').value = linha.dataset.salario;
    document.getElementById('campoStatus').value = linha.querySelector('.status-select').value;

    new bootstrap.Modal(document.getElementById('modalForm')).show();
}

function montarConteudoLinha(id, dados) {
    return `
        <td>
            <div class="fw-semibold">${escapeHtml(dados.nome)}</div>
            <div class="text-muted small">${escapeHtml(dados.email || '')}</div>
        </td>
        <td>${escapeHtml(dados.cargo || '-')}</td>
        <td>${escapeHtml(dados.departamento || '-')}</td>
        <td>${escapeHtml(dados.cidade || '-')}</td>
        <td>${formatarSalario(dados.salario)}</td>
        <td>
            <select class="form-select form-select-sm status-select status-${dados.status}" data-id="${id}">
                ${Object.entries(STATUS_LABEL).map(([valor, label]) =>
                    `<option value="${valor}" ${valor === dados.status ? 'selected' : ''}>${label}</option>`
                ).join('')}
            </select>
        </td>
        <td class="text-end">
            <button class="btn btn-sm btn-icon btn-editar" data-id="${id}" title="Editar">
                <i class="bi bi-pencil-fill"></i>
            </button>
            <button class="btn btn-sm btn-icon btn-excluir" data-id="${id}" data-nome="${escapeHtml(dados.nome)}" title="Excluir">
                <i class="bi bi-trash3-fill"></i>
            </button>
        </td>
    `;
}

function preencherDadosNaLinha(linha, id, dados) {
    linha.dataset.id = id;
    linha.dataset.nome = dados.nome;
    linha.dataset.email = dados.email || '';
    linha.dataset.telefone = dados.telefone || '';
    linha.dataset.cargo = dados.cargo || '';
    linha.dataset.departamento = dados.departamento || '';
    linha.dataset.cidade = dados.cidade || '';
    linha.dataset.salario = dados.salario ?? '';
    linha.innerHTML = montarConteudoLinha(id, dados);
    ativarBotoesDaLinha(linha);
}

async function salvarCandidato(evento) {
    evento.preventDefault();

    const id = document.getElementById('candidatoId').value;
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
        await atualizarFuncionario(id, dados);
        const linha = document.querySelector(`tr[data-id="${id}"]`);
        if (linha) preencherDadosNaLinha(linha, id, dados);
        bootstrap.Modal.getInstance(document.getElementById('modalForm')).hide();
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
        document.querySelector(`tr[data-id="${idParaExcluir}"]`)?.remove();
        if (document.querySelectorAll('#corpoTabela tr').length === 0) {
            document.getElementById('estadoVazio').classList.remove('d-none');
        }
        bootstrap.Modal.getInstance(document.getElementById('modalDelete')).hide();
    } catch (erro) {
        alert('Erro ao excluir candidato: ' + erro.message);
    }
}
