# danielsouza-data.github.io

Portfólio de Daniel Souza, publicado em <https://danielsouza-data.github.io/>.

Site estático em HTML, CSS e JavaScript puros, sem etapa de build. O GitHub Pages publica o conteúdo da branch `main`.

## Estrutura

- `index.html`: página única com abertura, projetos, trajetória, textos do LinkedIn, ferramentas, formação e contato.
- `assets/css/site.css`: estilos, com tema claro e escuro conforme o sistema.
- `assets/js/site.js`: abre e fecha o detalhe de cada cargo na trajetória.
- `assets/img/`: avatar em pixel art.
- `docs/`: currículos em português e em inglês para download.
- `404.html`: página de endereço não encontrado.

## Rodar localmente

```
python -m http.server 8000
```

Depois, abra <http://localhost:8000>.

## Editar a trajetória

Cada cargo é um `<li class="cargo">` em `index.html`. A posição da barra vem de `--s` (início) e `--e` (fim), em porcentagem do eixo de 2017 a 2027:

```
(ano + (mês - 1) / 12 - 2017) / 10 * 100
```

Para o fim de um cargo, use o mês seguinte ao último mês trabalhado.
