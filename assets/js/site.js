// Abre e fecha o detalhe de cada cargo no gráfico da trajetória.
// Sem JavaScript, todos os detalhes ficam visíveis.
document.querySelectorAll('button.cargo__linha').forEach((botao) => {
    const detalhe = document.getElementById(botao.getAttribute('aria-controls'));
    if (!detalhe) return;

    detalhe.hidden = botao.getAttribute('aria-expanded') !== 'true';

    botao.addEventListener('click', () => {
        const aberto = botao.getAttribute('aria-expanded') === 'true';
        botao.setAttribute('aria-expanded', String(!aberto));
        detalhe.hidden = aberto;
    });
});
