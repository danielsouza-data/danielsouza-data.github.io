# danielsouza-data.github.io

Portfólio de Daniel Souza, publicado em <https://danielsouza-data.github.io/>.

Site estático em HTML, CSS e JavaScript puros, sem etapa de build. O GitHub Pages publica o conteúdo da branch `main`.

## Estrutura

- `index.html`: página única com abertura, projetos, trajetória, textos do LinkedIn, ferramentas, formação e contato.
- `assets/css/site.css`: estilos. O tema escuro é o padrão; o claro entra com `data-theme="light"` no `<html>`.
- `assets/js/site.js`: detalhe dos cargos na trajetória, botão de tema e "Voltar ao topo".
- `assets/img/`: avatar em pixel art.
- `docs/`: currículos em português e em inglês para download.
- `404.html`: página de endereço não encontrado.
- `robots.txt` e `sitemap.xml`: liberam o site para buscadores e listam a página e os currículos.
- `llms.txt`: resumo do portfólio em texto para assistentes de IA (ChatGPT, Claude, Perplexity, Gemini).
- `cb8757302f35cd93ef7155ef0ecdf690.txt`: chave do IndexNow, que avisa o Bing e outros buscadores quando o site muda.

## SEO

Os dados estruturados (JSON-LD com `WebSite`, `ProfilePage` e `Person`) ficam no `<head>` do `index.html`. Ao mudar o conteúdo, atualize o `dateModified` do JSON-LD, o `<lastmod>` do `sitemap.xml` e, se for o caso, o `llms.txt`. Depois do push, avise o IndexNow:

```
curl "https://api.indexnow.org/indexnow?url=https://danielsouza-data.github.io/&key=cb8757302f35cd93ef7155ef0ecdf690"
```

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
