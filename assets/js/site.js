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

// Alterna entre o tema escuro (padrão) e o claro, e lembra a escolha.
const raiz = document.documentElement;
const botaoTema = document.querySelector('[data-tema]');
const corDoNavegador = document.querySelector('meta[name="theme-color"]');

function aplicarTema(claro) {
    if (claro) {
        raiz.dataset.theme = 'light';
    } else {
        delete raiz.dataset.theme;
    }
    if (botaoTema) botaoTema.textContent = claro ? 'Modo escuro' : 'Modo claro';
    if (corDoNavegador) corDoNavegador.content = claro ? '#F2F4F8' : '#0E1730';
}

aplicarTema(raiz.dataset.theme === 'light');

if (botaoTema) {
    botaoTema.addEventListener('click', () => {
        const claro = raiz.dataset.theme !== 'light';
        aplicarTema(claro);
        try {
            localStorage.setItem('tema', claro ? 'light' : 'dark');
        } catch (e) { }
    });
}

// Mostra o "Voltar ao topo" depois que a abertura sai da tela.
const voltar = document.querySelector('.voltar');
const abertura = document.querySelector('.abertura');

if (voltar && abertura && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entrada]) => {
        voltar.classList.toggle('is-visivel', !entrada.isIntersecting);
    }).observe(abertura);
} else if (voltar) {
    voltar.classList.add('is-visivel');
}
