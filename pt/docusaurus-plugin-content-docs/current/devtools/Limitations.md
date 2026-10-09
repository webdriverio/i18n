---
id: limitations
title: Limitações do Modo Trace
description: "Veja o que o modo trace do DevTools deliberadamente não captura e as limitações conhecidas nos adaptadores WebdriverIO, Selenium e Nightwatch."
---

O que o [Modo Trace](/docs/devtools/wdio/trace-mode) deliberadamente ignora, além das lacunas conhecidas entre os adaptadores.

## O que o modo trace ignora

- **Janela da UI do DevTools** — nenhuma instância do Chrome é aberta para o dashboard.
- **Port-bind do backend** — nenhuma porta localhost é reservada (paridade entre os três adaptadores a partir da v1.2+).
- **`screencast.enabled`** — a gravação contínua `.webm` do modo live é ignorada no modo trace (um aviso é registrado no log). Em vez disso, o modo trace grava um [`filmstrip`](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) denso no arquivo **por padrão** (defina `filmstrip: false` para um frame por ação), além de trechos de [`video`](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) por teste quando habilitado. Os campos de **ajuste** do screencast (`quality`, `maxWidth`, `pollIntervalMs`, …) ainda se aplicam a qualquer gravador que estiver em execução.
- **Dump `wdio-trace-<sessionId>.json`** — removido completamente. O JSON monolítico legado que o modo live do WDIO costumava gravar não existe mais; o modo live agora faz streaming para o dashboard e não grava nada em disco, e o `trace.zip` é o único artefato de trace.

## Limitações conhecidas

- **Nightwatch BDD `describe/it`** — `traceGranularity: 'test'` se reduz a um **único trecho com escopo de sessão**: o Nightwatch executa os `it`s individuais internamente sem um hook por teste que o plugin possa ver, então o trecho é associado ao primeiro teste. A captura de metadados (estado por testcase no manifesto) não é afetada, mas a associação de trace/screenshot/video por `it` e a retenção com reconhecimento de retries são reduzidas ao escopo de sessão para essa interface. As interfaces **exports-object** e **Cucumber** do Nightwatch expõem hooks por cenário/por teste e obtêm uma divisão real por teste. (WebdriverIO mocha/cucumber e Selenium mocha não são afetados.)
- **Retenção com reconhecimento de retries no Nightwatch** — apenas `retain-on-failure` funciona; outras políticas com reconhecimento de retries são degradadas porque o Nightwatch reexecuta um testcase internamente com `--retries` sem disparar novamente os hooks por teste. Veja [Retenção](/docs/devtools/wdio/trace-mode#retention--tracepolicy).
- **Anexo do Allure no Nightwatch** — `screenshot`/`video` por teste são apenas produzidos (arquivos + manifesto), não anexados inline; veja [Integração com Allure](/docs/devtools/allure).
- **Video/filmstrip fora do Chrome** — em navegadores sem um caminho de push via CDP, o gravador faz polling de `takeScreenshot`, o que adiciona round-trips do WebDriver e (com o Allure) inunda o log de steps; combine com as opções de silenciamento de steps do reporter.