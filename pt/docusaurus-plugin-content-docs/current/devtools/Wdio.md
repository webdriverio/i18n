---
id: wdio
title: WebDriverIO DevTools
description: "Instale e configure o serviço WebdriverIO DevTools para depurar testes com replay do DOM, capturas de tela, captura de rede e console, e screencasts."
---

Um serviço do WebdriverIO que fornece uma interface de ferramentas de desenvolvedor para executar, depurar e inspecionar testes de automação de navegador. Os recursos incluem replay de mutações do DOM, capturas de tela por comando, inspeção de requisições de rede, captura de logs do console e gravação de screencast da sessão.

## Instalação

```sh
npm install @wdio/devtools-service --save-dev
```

## Uso

### Test Runner

```ts
// wdio.conf.ts
export const config = {
  services: ['devtools'],
}
```

### Standalone

```ts
import { remote } from 'webdriverio'
import { setupForDevtools } from '@wdio/devtools-service'

const browser = await remote(setupForDevtools({
  capabilities: { browserName: 'chrome' }
}))
await browser.url('https://example.com')
await browser.deleteSession()
```

## Opções do Serviço

```ts
services: [['devtools', options]]
```

| Opção | Tipo | Padrão | Descrição |
|---|---|---|---|
| `port` | `number` | aleatório | Porta em que o servidor da interface do DevTools escuta |
| `hostname` | `string` | `'localhost'` | Hostname ao qual o servidor da interface do DevTools se vincula |
| `devtoolsCapabilities` | `Capabilities` | Chrome 1600x1200 | Capabilities usadas para abrir a janela da interface do DevTools |
| `screencast` | `ScreencastOptions` | - | Gravação de vídeo da sessão ([veja Screencast](/docs/devtools/wdio/screencast)) |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` abre a interface do DevTools; `trace` a ignora e grava um artefato portátil em seu lugar ([veja Trace Mode](/docs/devtools/wdio/trace-mode)) |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Layout do artefato de trace — arquivo único vs diretório descompactado. Aplica-se apenas quando `mode: 'trace'` |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Um trace por sessão / arquivo de spec / teste. `'test'` grava cada um em `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. Aplica-se apenas quando `mode: 'trace'` ([veja Trace Mode](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity)) |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Quais traces manter. Combina com `traceGranularity: 'test'`. Aplica-se apenas quando `mode: 'trace'` |
| `filmstrip` | `boolean` | `true` | Grava um filmstrip de screencast denso e contínuo *dentro* do trace para uma reprodução suave e navegável no player — frames densos junto aos frames por ação, reduzidos e endereçados por conteúdo na exportação. Aplica-se apenas quando `mode: 'trace'` |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Captura de tela por teste, anexada inline ao Allure (`image/png`). Requer `mode: 'trace'` + `traceGranularity: 'test'` |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Vídeo de screencast por teste, retido conforme a política informada e anexado inline ao Allure (`video/webm`). Requer `mode: 'trace'` + `traceGranularity: 'test'` |
| `emitArtifactsManifest` | `boolean` | `false` | Grava `devtools-artifacts-<sessionId>.json` — um índice genérico de todos os artefatos produzidos mais o estado de cada teste, para reporters/CI. Habilitado automaticamente quando `@wdio/allure-reporter` está na configuração. Aplica-se apenas quando `mode: 'trace'` |
| `captureAssertions` | `boolean` | `true` | Captura asserções como linhas de ação no trace — `node:assert` mais matchers `expect(...)` que passam/falham. Defina `false` para desativar |

## Primeiros Passos

1. Execute seus testes WebdriverIO
2. A interface do DevTools abre automaticamente em uma janela de navegador externa
3. Os testes começam a ser executados imediatamente com visualização em tempo real
4. Veja a pré-visualização do navegador ao vivo, o progresso dos testes e a execução dos comandos
5. Após a conclusão da execução inicial, use os botões de play para reexecutar testes ou suítes individuais
6. Clique no botão de parar a qualquer momento para encerrar os testes em execução
7. Explore ações, metadados, logs do console e código-fonte nas abas do workbench

## Recursos

Explore os recursos do WebDriverIO DevTools em detalhes:

- **[Reexecução Interativa de Testes e Visualização](/docs/devtools/wdio/interactive-test-rerunning)** - Pré-visualizações do navegador em tempo real com reexecução de testes
- **[Preservar e Reexecutar (Comparar)](/docs/devtools/wdio/preserve-and-rerun)** - Tire um snapshot de um teste com falha, reexecute-o e compare as duas execuções lado a lado
- **[Suporte a Múltiplos Frameworks](/docs/devtools/wdio/multi-framework-support)** - Funciona com Mocha, Jasmine e Cucumber
- **[Logs do Console](/docs/devtools/wdio/console-logs)** - Capture e inspecione a saída do console do navegador
- **[Logs de Rede](/docs/devtools/wdio/network-logs)** - Monitore chamadas de API e atividade de rede
- **[Metadados](/docs/devtools/wdio/metadata)** - Capabilities da sessão, ambiente e tempos por sessão de navegador
- **[TestLens](/docs/devtools/wdio/testlens)** - Navegue até o código-fonte com navegação de código inteligente
- **[Screencast da Sessão](/docs/devtools/wdio/screencast)** - Gravação automática de vídeo das sessões do navegador
- **[Trace Mode](/docs/devtools/wdio/trace-mode)** - Caminho de captura headless que produz um artefato portátil `trace.zip` (sem janela de interface); suporta os formatos de saída `zip` e `ndjson-directory`, granularidade por sessão/spec/teste, políticas de retenção cientes de retries e um `filmstrip` denso opcional, tudo visualizável no player oficial `show-trace`

## Trace Player

Um trace gravado com `mode: 'trace'` abre no player oficial `show-trace` (`npx show-trace path/to/trace.zip`) — viagem no tempo pelo DOM, a aba A11y e a sobreposição de elementos do pick-locator, a aba Transcript com Copy-for-LLM, as abas Errors / Console / Network / Source e uma linha do tempo navegável (filmstrip denso, aninhamento Cucumber Feature → Scenario → Step).

Veja a página **[Trace Player](/docs/devtools/trace-player)** para o passo a passo completo e outros visualizadores compatíveis.

## Relatórios com Allure

Com `@wdio/allure-reporter` na configuração, os artefatos do trace mode (o zip do trace, além da captura de tela e do vídeo por teste com `traceGranularity: 'test'`) são anexados automaticamente ao relatório do Allure, e `emitArtifactsManifest` é habilitado automaticamente.

Veja **[Integração com Allure](/docs/devtools/allure)** para os detalhes dos anexos e as opções de silenciamento de steps do reporter.