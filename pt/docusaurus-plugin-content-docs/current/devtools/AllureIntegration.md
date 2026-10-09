---
id: allure
title: Integração com Allure
description: "Anexe automaticamente ao seu relatório Allure os artefatos do modo trace do DevTools, como arquivos zip de trace, capturas de tela e vídeos."
---

Os artefatos do modo trace — o zip do trace e a captura de tela e o vídeo de cada teste — são anexados automaticamente a um relatório Allure, para que você possa abri-los diretamente a partir do relatório. Consulte [Modo Trace](/docs/devtools/wdio/trace-mode) para saber como ativar o modo trace e gerar esses artefatos.

Quando um reporter do Allure está presente, os artefatos do modo trace são anexados automaticamente ao relatório Allure — sem nenhuma configuração adicional:

- **`traceGranularity: 'test'`** — o `trace.zip` de cada teste (`application/zip`, um download que abre no `show-trace`), a `screenshot` (`image/png`, inline) e o `video` (`video/webm`, inline) são anexados ao card desse teste. Esta é a granularidade a ser usada para um relatório Allure por teste.
- **`traceGranularity: 'session'` / `'spec'`** — um trace que abrange a sessão/spec é gravado em disco e listado no [manifesto de artefatos](/docs/devtools/wdio/trace-mode#artifacts-manifest--emitartifactsmanifest), mas **não** é anexado aos cards de teste individuais: um trace de sessão/spec só é finalizado depois que todos os seus testes foram executados, momento em que os cards do Allure já estão fechados e não há nenhum teste aberto ao qual anexá-lo. Para exibi-lo mesmo assim, faça o pós-processamento do manifesto no seu próprio hook `onComplete`.

Suporte por adaptador:

| Adaptador | Mecanismo de anexação |
|---|---|
| **WebdriverIO** | Suporte nativo via `addAttachment` do `@wdio/allure-reporter`. |
| **Selenium** | Via `attachment()` do `allure-js-commons` — independente de runtime, anexa sob qualquer adaptador de runner do Allure, condicionado a um runtime ativo do `allure-js-commons`. |
| **Nightwatch** | **Apenas geração** — os arquivos e o manifesto são gravados, mas não anexados inline (não há API de anexação do Allure em tempo real). |

**Visualizador de trace incorporado.** Como o arquivo usa um formato em disco portátil e padrão de visualizador de trace, o próprio **visualizador de trace incorporado** de um relatório Allure (Allure ≥ 2.35) pode abrir o `trace.zip` anexado diretamente dentro do relatório.

**Ruído no relatório.** No modo trace, a captura executa um `takeScreenshot` por ação para construir a linha do tempo; o Allure registra cada comando WebDriver como um step e uma captura de tela por `takeScreenshot`. Silencie esse excesso com as próprias opções do reporter — os anexos de trace / captura de tela / vídeo não são afetados:

```ts
reporters: [
  ['allure', {
    outputDir: 'allure-results',
    disableWebdriverStepsReporting: true,
    disableWebdriverScreenshotsReporting: true
  }]
]
```