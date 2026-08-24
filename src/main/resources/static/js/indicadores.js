// Os números que aparecem em indicadores.html estão fixos no próprio HTML por enquanto
// (3 candidatos de exemplo). Quando listarFuncionarios() estiver implementada em api.js,
// você pode substituir esses números fixos por valores calculados de verdade, assim:
//
// document.addEventListener('DOMContentLoaded', async () => {
//     const candidatos = await listarFuncionarios();
//     document.getElementById('statTotal').textContent = candidatos.length;
//     document.getElementById('statAnalise').textContent = candidatos.filter(c => c.status === 'EM_ANALISE').length;
//     document.getElementById('statAprovado').textContent = candidatos.filter(c => c.status === 'APROVADO').length;
//     document.getElementById('statReprovado').textContent = candidatos.filter(c => c.status === 'REPROVADO').length;
//     document.getElementById('statContratado').textContent = candidatos.filter(c => c.status === 'CONTRATADO').length;
// });
