---
id: dashboard
title: O Dashboard
description: "Acompanhe execuções de testes ao vivo no dashboard do DevTools, execute novamente testes individuais ou suítes e configure a janela e o backend do dashboard."
---

O modo live abre a UI do DevTools em uma janela externa do navegador e transmite a execução dos seus testes em tempo real. Ele é a contraparte interativa do [Trace Mode](/docs/devtools/wdio/trace-mode), que dispensa a UI e, em vez disso, grava um artefato offline portátil. O modo live é ativado por padrão (`mode: 'live'`), portanto basta executar seus testes WebdriverIO para iniciar o dashboard.

Ao executar seus testes, a UI do DevTools abre automaticamente em uma janela externa do navegador e os testes começam a ser executados imediatamente com visualização em tempo real. Após a conclusão da execução inicial, use os botões de play para executar novamente testes individuais ou suítes, e o botão de parar para encerrar os testes em execução a qualquer momento.

## O que o dashboard mostra

- **Pré-visualização do navegador ao vivo** — observe o navegador sob teste enquanto os comandos são executados.
- **Progresso dos testes** — suítes e testes são atualizados conforme são executados.
- **Execução de comandos** — cada ação é transmitida à medida que acontece.
- **Abas do Workbench** — explore Actions, Console, Network, Metadata e Source para o teste selecionado.

## Recursos do modo live

- **[Reexecução e Visualização Interativa de Testes](/docs/devtools/wdio/interactive-test-rerunning)** — Pré-visualizações do navegador em tempo real com reexecução de testes
- **[Preservar e Reexecutar (Comparar)](/docs/devtools/wdio/preserve-and-rerun)** — Capture um snapshot de um teste com falha, execute-o novamente e compare as duas execuções lado a lado
- **[Console Logs](/docs/devtools/wdio/console-logs)** — Capture e inspecione a saída do console do navegador
- **[Network Logs](/docs/devtools/wdio/network-logs)** — Monitore chamadas de API e atividade de rede
- **[Metadata](/docs/devtools/wdio/metadata)** — Capabilities da sessão, ambiente e tempos por sessão do navegador
- **[TestLens](/docs/devtools/wdio/testlens)** — Navegue até o código-fonte com navegação inteligente de código
- **[Suporte a Múltiplos Frameworks](/docs/devtools/wdio/multi-framework-support)** — Funciona com Mocha, Jasmine e Cucumber
- **[Screencast da Sessão](/docs/devtools/wdio/screencast)** — Gravação automática de vídeo das sessões do navegador

## Configurando a janela do dashboard

As opções `port`, `hostname` e `devtoolsCapabilities` controlam o servidor da UI do DevTools e a janela em que ela é aberta. Consulte a [Referência de Configuração](/docs/devtools/reference) para mais detalhes.

## Executando o backend de forma independente

Os adapters iniciam o servidor do dashboard no mesmo processo, então normalmente você nunca precisa mexer nele. Ele também é distribuído como um binário independente, que é o que você precisa quando o dashboard deve sobreviver a uma única execução - ou quando os testes não são em JavaScript, como no caso do adapter Python (veja a página [Selenium](/docs/devtools/selenium)).

```bash
npx @wdio/devtools-backend
```

```
Usage: devtools-backend [options]

Options:
  --port <number>     Preferred port; a free one is chosen if it is taken
  --hostname <host>   Host to bind (default: localhost)
  -h, --help          Show this message
```

`--port` é uma *preferência*, não uma garantia: se essa porta estiver ocupada, o servidor se vincula a uma porta livre em vez de falhar. Ele imprime a porta à qual realmente se vinculou, e é essa linha que você deve ler, e não a porta que você solicitou:

```
devtools-backend listening at http://localhost:3000
```

Aponte uma execução para um servidor que já esteja escutando com `DEVTOOLS_PORT` (todos os adapters respeitam essa variável), e a execução se conectará a ele em vez de iniciar um segundo servidor.

Um segundo binário, `show-trace`, abre um arquivo de trace no player offline - veja [Trace Player](/docs/devtools/trace-player).