---
id: devtools
title: DevTools
description: "Visualize, controle e inspecione execuções de testes em uma interface de depuração baseada em navegador que funciona com WebdriverIO, Nightwatch.js e Selenium WebDriver."
---

DevTools é uma poderosa interface de depuração baseada em navegador para visualizar, controlar e inspecionar as execuções dos seus testes em tempo real. Funciona com **WebdriverIO**, **Nightwatch.js** e **Selenium WebDriver** (qualquer runner) — mesmo backend, mesma interface, mesma infraestrutura de captura.

## O Que Oferece

- **Reexecute testes seletivamente** - Clique em qualquer caso de teste ou suíte para reexecutá-lo instantaneamente ([detalhes](/docs/devtools/wdio/interactive-test-rerunning))
- **Preserve & Rerun (Comparar)** - Tire um snapshot de um teste com falha, reexecute-o e compare as duas execuções lado a lado, alinhadas por comando ([detalhes](/docs/devtools/wdio/preserve-and-rerun))
- **Depure visualmente** - Veja pré-visualizações ao vivo do navegador com capturas de tela automáticas após cada comando
- **Acompanhe a execução** - Visualize logs detalhados de comandos com timestamps e resultados
- **Monitore rede e console** - Inspecione chamadas de API e logs de JavaScript ([rede](/docs/devtools/wdio/network-logs) · [console](/docs/devtools/wdio/console-logs))
- **Navegue até o código** - Vá diretamente para os arquivos-fonte dos testes com o TestLens ([detalhes](/docs/devtools/wdio/testlens))
- **Grave sessões** - Vídeo contínuo `.webm` do navegador, por sessão ([detalhes](/docs/devtools/wdio/screencast))
- **Modo trace** - Caminho de captura headless que produz um artefato portátil `trace.zip` para reprodução offline ou consumo por agentes ([detalhes](/docs/devtools/wdio/trace-mode))

## Como Funciona

1. Inicie seus testes normalmente
2. O DevTools abre automaticamente uma janela do navegador em `http://localhost:3000`
3. A interface mostra a hierarquia de testes, a pré-visualização do navegador, a linha do tempo de comandos e os logs em tempo real
4. Após a conclusão dos testes, clique em qualquer teste para reexecutá-lo individualmente na mesma sessão do navegador

## Escolha Seu Framework

- **[WebDriverIO](/docs/devtools/wdio)** - Use `@wdio/devtools-service` com Mocha, Jasmine ou Cucumber
- **[Nightwatch](/docs/devtools/nightwatch)** - Use `@wdio/nightwatch-devtools` sem nenhuma alteração no código dos testes
- **[Selenium](/docs/devtools/selenium)** - Use `@wdio/selenium-devtools` com Mocha, Jest, Cucumber ou scripts Node simples