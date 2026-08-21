document.addEventListener('DOMContentLoaded', async () => {
    // TODO: quando listarFuncionarios() estiver implementada em api.js, troque a linha abaixo por:
    // const candidatos = await listarFuncionarios();
    const candidatos = CANDIDATOS_EXEMPLO;

    document.getElementById('statTotal').textContent = candidatos.length;
    document.getElementById('statAnalise').textContent = candidatos.filter(c => c.status === 'EM_ANALISE').length;
    document.getElementById('statAprovado').textContent = candidatos.filter(c => c.status === 'APROVADO').length;
    document.getElementById('statReprovado').textContent = candidatos.filter(c => c.status === 'REPROVADO').length;
    document.getElementById('statContratado').textContent = candidatos.filter(c => c.status === 'CONTRATADO').length;
});
