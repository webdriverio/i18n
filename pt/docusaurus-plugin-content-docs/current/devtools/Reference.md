---
id: reference
title: Referência de Configuração
description: "Consulte todas as opções do DevTools para o modo live e o modo trace nos adaptadores WebdriverIO, Selenium e Nightwatch, com os valores padrão."
---

Todas as opções do DevTools em um só lugar, nos três adaptadores. Os **nomes, tipos e valores padrão das opções são idênticos** em todos os adaptadores; onde o comportamento difere, isso é indicado. Para a explicação completa de cada opção de trace, consulte a seção correspondente na página [Trace Mode](/docs/devtools/wdio/trace-mode).

Passe as opções da forma que cada adaptador as recebe:

- **WebdriverIO** — `services: [['devtools', { … }]]`
- **Selenium** — `DevTools.configure({ … })`
- **Nightwatch** — `globals: nightwatchDevtools({ … })`

## Opções de modo e do modo live

| Opção | Tipo / valores | Padrão | Observações |
|---|---|---|---|
| `mode` | `'live' \| 'trace'` | `'live'` | `'live'` abre o painel da interface do DevTools; `'trace'` o ignora e grava um artefato portátil. Os dois são mutuamente exclusivos. |
| `port` | `number` | aleatória | Porta à qual a interface / backend do DevTools se vincula. Apenas no modo live. |
| `hostname` | `string` | `'localhost'` | Hostname ao qual o servidor se vincula. Apenas no modo live. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | Vídeo contínuo da sessão (`.webm`). Apenas no modo live — para o modo trace, use `video`. Veja [Screencast](/docs/devtools/wdio/screencast). |
| `devtoolsCapabilities` | `Capabilities` | Chrome 1600×1200 | Capabilities usadas para abrir a janela da interface do DevTools. WebdriverIO, apenas no modo live. |

## Opções do modo trace

Aplicam-se somente quando `mode: 'trace'`.

| Opção | Tipo / valores | Padrão | Detalhes |
|---|---|---|---|
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Arquivo único vs. um diretório descompactado. [Formato de saída](/docs/devtools/wdio/trace-mode#output-format--traceformat) |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Um trace por sessão / arquivo de spec / teste. `'test'` é necessário para screenshot/vídeo por teste e anexação inline no Allure. [Granularidade do trace](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity) |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Quais traces manter. Combina com `traceGranularity: 'test'`. [Retenção](/docs/devtools/wdio/trace-mode#retention--tracepolicy) |
| `filmstrip` | `boolean` | `true` | Screencast denso e contínuo no trace para uma navegação suave; `false` grava um quadro por ação. [Filmstrip denso](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Screenshot por teste (requer `traceGranularity: 'test'`). Opção do serviço WebdriverIO. [Screenshot e vídeo por teste](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `video` | `'off' \| <tracePolicy value>` | `'off'` | Trecho de vídeo por teste (requer `traceGranularity: 'test'`). Opção do serviço WebdriverIO. [Screenshot e vídeo por teste](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `emitArtifactsManifest` | `boolean` | `false` | Grava `devtools-artifacts-<sessionId>.json`. Ativado automaticamente quando um reporter Allure é detectado (opt-in no Nightwatch). [Manifesto de artefatos](/docs/devtools/wdio/trace-mode#artifacts-manifest--emitartifactsmanifest) |
| `captureAssertions` | `boolean` | `true` | Captura `node:assert` (e matchers `expect` do framework, quando suportados) como ações do trace. [Asserções](/docs/devtools/wdio/trace-mode#assertions--captureassertions) |

## Exclusivo do Nightwatch

| Opção | Tipo / valores | Padrão | Observações |
|---|---|---|---|
| `bidi` | `boolean` | `false` | Ativa a captura via WebDriver BiDi (console + exceções JS + rede). Requer `webSocketUrl: true` nas capabilities. No WebdriverIO e no Selenium, o BiDi é anexado automaticamente. Veja [Nightwatch → Captura BiDi](/docs/devtools/nightwatch#bidi-capture-opt-in). |

## Diferenças entre adaptadores

Alguns recursos de trace são degradados em determinados adaptadores — consulte a [matriz de suporte entre frameworks](/docs/devtools/cross-framework) para o panorama completo. Os mais relevantes:

- **Retenção com reconhecimento de retries no Nightwatch** — apenas `retain-on-failure` é confiável; os outros valores de `tracePolicy` são degradados para ele.
- **BDD `describe/it` no Nightwatch** — `traceGranularity: 'test'` é reduzido a um único trecho no escopo da sessão.
- **Anexação no Allure no Nightwatch** — `screenshot`/`video` por teste são apenas gerados (arquivos + manifesto), não anexados inline.