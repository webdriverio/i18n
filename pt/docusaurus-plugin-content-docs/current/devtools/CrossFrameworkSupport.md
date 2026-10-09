---
id: cross-framework
title: Suporte Entre Frameworks
description: "Compare o quão completamente o modo de trace do DevTools captura execuções do WebdriverIO, Selenium e Nightwatch, e quais lacunas cada adaptador possui."
---

O formato de trace e o player `show-trace` são idênticos entre WebdriverIO / Selenium / Nightwatch; esta página mostra onde a completude da captura difere. Para a referência completa do modo de trace, consulte [Trace Mode](/docs/devtools/wdio/trace-mode).

As transformações que constroem um trace ficam em [`@wdio/devtools-trace`](https://github.com/webdriverio/devtools/tree/main/packages/trace), uma camada abaixo dos adaptadores, então **o formato de trace e o player `show-trace` são idênticos para todos os adaptadores** — o mesmo `.zip` (ou diretório) abre no mesmo player, independentemente de qual o produziu. Os três adaptadores abaixo também compartilham as opções principais (`mode`, `traceGranularity`, `tracePolicy`, `traceFormat`, `filmstrip`, `emitArtifactsManifest`, `captureAssertions`).

**A completude da captura varia por adaptador**, no entanto — o WebdriverIO é o mais completo; Selenium e Nightwatch cobrem o fluxo principal com as lacunas indicadas abaixo. A sintaxe de ativação específica de cada framework está na página de cada adaptador — consulte [Selenium](/docs/devtools/selenium#trace-mode) e [Nightwatch](/docs/devtools/nightwatch#trace-mode).

O adaptador Python (veja as abas **Python** na página do [Selenium](/docs/devtools/selenium)) grava o mesmo arquivo e abre no mesmo player, mas não está nesta tabela: ele não executa JavaScript no processo de teste, então o backend constrói seu trace a partir do stream capturado, em vez de o adaptador construí-lo no próprio processo. Granularidade e retenção têm equivalentes em Python — `--devtools-trace-granularity session|test` e `--devtools-trace-policy`, este último com seus valores sensíveis a retentativas degradando para `retain-on-failure`, porque nada nesse canal carrega um número de tentativa. As linhas sem equivalente em Python são as de artefatos por teste: `screenshot`, `video` e anexo inline ao Allure. O que ele captura - DOM time-travel, o filmstrip denso, a árvore A11y e o overlay de elementos, comandos, console, rede, asserções, controles de execução e Preserve & Rerun - está em sua própria página.

| Recurso | WebdriverIO | Selenium | Nightwatch |
|---|---|---|---|
| Modo de trace + player `show-trace` | ✅ | ✅ | ✅ |
| DOM time-travel (captura de mutações) | ✅ | ✅ ¹ | ✅ |
| Aba A11y + overlay de seleção de locator (player de trace) | ✅ | ✅ | ✅ |
| Transcrição + Copy-for-LLM | ✅ | ✅ | ✅ |
| `screenshot` / `video` por teste | ✅ Allure inline | ✅ Allure inline | ⚠️ apenas produção ² |
| Detecção automática de `emitArtifactsManifest` | ✅ | ✅ | ⚠️ apenas opt-in |
| `tracePolicy` sensível a retentativas | ✅ | ✅ | ⚠️ apenas `retain-on-failure` ³ |
| `traceGranularity: 'test'` | ✅ | ✅ | ⚠️ Cucumber / exports-object; BDD `describe/it` é reduzido a uma fatia de sessão |
| Aninhamento Cucumber Feature→Scenario→Step | Scenario→Step ⁴ | ✅ completo | Feature→Scenario ⁵ |
| Captura BiDi (console / rede / exceções) | ✅ automática | ✅ automática | ⚠️ opt-in (`bidi: true` + `webSocketUrl`) |
| Screencast (filmstrip / vídeo) | CDP push | CDP push | apenas polling |
| Aba A11y + overlay no dashboard ao vivo | ✅ | apenas player de trace | apenas player de trace |

¹ O Selenium reconstrói o DOM a cada navegação; o tempo de ancoragem é aproximado (o snapshot de uma navegação pode atrasar em relação ao comando que a disparou).
² O Nightwatch não possui uma API de anexo ao vivo do Allure, então os artefatos por teste são gravados no diretório de saída do trace e listados no manifesto, mas não são anexados a um teste do Allure.
³ O `--retries` do Nightwatch executa novamente um teste internamente sem disparar novamente os hooks por teste do plugin, então as políticas sensíveis a retentativas (`on-first-retry`, `retain-on-first-failure`, …) degradam para `retain-on-failure`.
⁴ O WebdriverIO ainda não carrega a ancestralidade no nível de feature, então seu aninhamento Cucumber é Scenario→Step.
⁵ O Nightwatch ainda não registra o aninhamento por step (apenas Feature→Scenario).