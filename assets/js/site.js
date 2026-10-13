const raiz = document.documentElement;

// Avisa o CSS e o script do <head> de que este arquivo carregou.
window.sitePronto = true;
raiz.classList.add('pronto');

// Abre e fecha o detalhe de cada cargo no gráfico da trajetória.
// Sem JavaScript, todos os detalhes ficam visíveis.
document.querySelectorAll('button.cargo__linha').forEach((botao) => {
    const detalhe = document.getElementById(botao.getAttribute('aria-controls'));
    if (!detalhe) return;

    detalhe.toggleAttribute('data-aberto', botao.getAttribute('aria-expanded') === 'true');

    botao.addEventListener('click', () => {
        const abrir = botao.getAttribute('aria-expanded') !== 'true';
        botao.setAttribute('aria-expanded', String(abrir));
        detalhe.toggleAttribute('data-aberto', abrir);
    });
});

// Alterna entre o tema escuro (padrão) e o claro, e lembra a escolha.
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
        try {
            localStorage.setItem('tema', claro ? 'light' : 'dark');
        } catch (e) { }

        if (!document.startViewTransition) {
            aplicarTema(claro);
            return;
        }

        // O tema novo se abre em círculo a partir do botão
        // (com movimento reduzido no sistema, o CSS troca por um esmaecimento).
        const caixa = botaoTema.getBoundingClientRect();
        raiz.style.setProperty('--vx', `${caixa.left + caixa.width / 2}px`);
        raiz.style.setProperty('--vy', `${caixa.top + caixa.height / 2}px`);
        document.startViewTransition(() => aplicarTema(claro));
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

// Entradas ao rolar: marca cada bloco com is-visto quando ele chega à tela.
// A lista de seletores é a mesma usada em site.css.
if (raiz.classList.contains('anima')) {
    const blocos = '.secao__cabeca, .caso, .legenda, .ferramentas > div, .textos li, .textos__mais, .formacao__grau, .formacao__cursos > div, .contato > *';

    const aoEntrar = new IntersectionObserver((entradas, observador) => {
        let ordem = 0;
        entradas.forEach((entrada) => {
            if (!entrada.isIntersecting) return;
            // Blocos que chegam juntos entram em cascata.
            entrada.target.style.setProperty('--d', Math.min(ordem++, 6));
            entrada.target.classList.add('is-visto');
            observador.unobserve(entrada.target);
        });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

    document.querySelectorAll(blocos).forEach((bloco) => aoEntrar.observe(bloco));

    // O gráfico e o caminho do dado têm sequência própria.
    const aoEntrarSequencia = new IntersectionObserver((entradas, observador) => {
        entradas.forEach((entrada) => {
            if (!entrada.isIntersecting) return;
            entrada.target.classList.add('is-visto');
            observador.unobserve(entrada.target);
        });
    }, { threshold: 0.25 });

    document.querySelectorAll('.grafico, .fluxo').forEach((sequencia) => aoEntrarSequencia.observe(sequencia));
}
