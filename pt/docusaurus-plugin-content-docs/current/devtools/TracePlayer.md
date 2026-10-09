---
id: trace-player
title: Reprodutor de Traces
description: "Abra artefatos do modo trace no reprodutor show-trace para reprodução e revisão offline, ou carregue-os em outros visualizadores de trace."
---

O reprodutor `show-trace` abre qualquer trace produzido no [Modo Trace](/docs/devtools/wdio/trace-mode) na própria interface do WebdriverIO DevTools — um modo **player** dedicado e somente leitura para reprodução offline, revisão e comparação (diffing) por agentes de IA.

## Demonstração

![Trace Player Demo](/img/devtools/trace-player.gif)

## `show-trace` — o reprodutor oficial

Abra um trace na interface do DevTools:

```sh
show-trace trace-<sessionId>.zip          # bin on PATH after install
npx show-trace trace-<sessionId>.zip      # or via npx
pnpm show-trace trace-<sessionId>.zip     # from the devtools monorepo
```

O bin `show-trace` é distribuído com cada adaptador (`@wdio/devtools-service`, `@wdio/nightwatch-devtools`, `@wdio/selenium-devtools`), portanto está disponível em qualquer projeto que instale um deles — sem dependência extra. Ele inicializa a mesma interface do DevTools em um modo **player** dedicado e a abre no seu navegador:

- **Lista de ações** (esquerda) — os comandos capturados, com uma aba **Metadata** ao lado.
- **Painel do navegador** (centro) — a página reconstruída para a ação selecionada (veja [viagem no tempo do DOM](#trace-player-features) abaixo). Quando o trace contém um filmstrip/vídeo, um botão **Snapshot / Screencast** alterna para o vídeo gravado.
- **Faixa de timeline** (topo) — um filmstrip de miniaturas em suas posições de tempo real, além de uma barra de navegação com um cursor de reprodução arrastável. Clique em uma miniatura ou arraste para qualquer lugar para navegar.
- **Barra de controles** — reproduzir/pausar, avançar passo a passo e velocidade.
- **Abas do dock** (parte inferior) — **Source**, **Log**, **Console**, **Network**, **Errors** (cada uma com um indicador de contagem), além das abas exclusivas do player **A11y** e **Transcript**. Clique em uma linha de **Network** para ver os detalhes da requisição (headers, timing, status).
- **Atalhos de teclado** — `Space` reproduzir/pausar, `←`/`→` navegar entre ações, `Home`/`End` ir para a primeira/última, `,`/`.` alterar a velocidade, `/` focar no filtro, `?` mostrar todos os atalhos.

> Aceita apenas `.zip`. Os mesmos atalhos funcionam no dashboard ao vivo (`←`/`→` percorrem a lista de comandos, `?` mostra a ajuda).

### Recursos do reprodutor de traces

Além da navegação estática quadro a quadro, o player reconstrói e faz referências cruzadas da execução:

- **Viagem no tempo do DOM** — o painel do navegador reproduz o fluxo capturado de mutações do DOM (e o estado dos campos de formulário — `value` de inputs, `checked` de checkboxes, incluindo campos limpos de volta ao vazio) para reconstruir o DOM *real* no momento da ação selecionada, e não apenas uma captura de tela. Pontos que não possuem quadro capturado (asserções, esperas estáticas) ainda mostram o estado verdadeiro da página.
- **Aba A11y + sobreposição de elementos ("pick locator")** — a aba **A11y** mostra a árvore de acessibilidade (roles + nomes acessíveis) capturada para o comando selecionado. Ative a sobreposição de elementos no chrome do navegador para destacar cada elemento com o qual o teste interagiu; **passe o mouse** sobre uma caixa para destacar sua linha na árvore A11y, **clique** para copiar um localizador resiliente. A ligação é bidirecional — passar o mouse sobre uma linha da árvore destaca o elemento de volta no snapshot.
- **Aba Transcript + Copy-for-LLM** — a aba **Transcript** renderiza o `transcript.md` da execução (um resumo legível por humanos/LLMs em ordem de execução). Um **Copy** com um clique agrupa o transcript com os erros de quaisquer comandos com falha como contexto pronto para colar em um LLM.
- **Marcadores de entrada na timeline** — cada ação é marcada na barra de navegação por tipo: ações de teclado como uma barra verde, ações de ponteiro (que possuem um ponto de clique) como um ponto azul, e as demais como uma marcação simples — assim você pode ler o ritmo das interações de relance.
- **Aninhamento do Cucumber** — execuções do Cucumber são aninhadas como Feature → Scenario → Step na árvore de ações, de modo que os steps ficam sob seu cenário e feature.
- **Navegação densa no filmstrip** — com [`filmstrip`](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) habilitado, a timeline agrupa os quadros densos para uma navegação suave, em vez de saltos de um quadro por ação.

## Outros visualizadores de trace

Como o artefato usa um formato em disco portátil e padrão de visualizadores de trace, o mesmo `.zip` (ou diretório) também abre em **visualizadores de trace standalone** compatíveis e — por compartilhar esse formato — dentro do **visualizador de trace embutido de um relatório Allure** (Allure ≥ 2.35). Eles exibem:
- Timeline de ações com tempos
- Capturas de tela por ação
- Snapshots de elementos
- Waterfall de rede
- Eventos do console

Para consumo por LLMs / agentes, leia o `transcript.md` diretamente — ele é uma renderização compacta em Markdown das ações com seletores e valores.

O pipeline de trace (mapeamento de ações, serializadores de snapshot, escritor NDJSON, escritor de zip / diretório) é compartilhado entre os adaptadores via [`@wdio/devtools-core`](https://github.com/webdriverio/devtools/tree/main/packages/core), de modo que o formato do artefato é idêntico independentemente de qual adaptador o produziu — veja [Suporte Multi-Framework](/docs/devtools/cross-framework).