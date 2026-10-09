---
id: console-logs
title: Logs do Console
description: "Capture e inspecione mensagens do console do navegador e logs do framework WebdriverIO registrados pelo DevTools durante a execução dos testes."
---

Capture e inspecione toda a saída do console do navegador durante a execução dos testes. O DevTools registra as mensagens do console da sua aplicação (`console.log()`, `console.warn()`, `console.error()`, `console.info()`, `console.debug()`), bem como os logs do framework WebDriverIO com base no `logLevel` configurado no seu `wdio.conf.ts`.

**Funcionalidades:**
- Captura em tempo real das mensagens do console durante a execução dos testes
- Logs do console do navegador (log, warn, error, info, debug)
- Logs do framework WebDriverIO filtrados pelo `logLevel` configurado (trace, debug, info, warn, error, silent)
- Timestamps mostrando exatamente quando cada mensagem foi registrada
- Logs do console exibidos junto aos passos do teste e às capturas de tela do navegador para fornecer contexto

**Configuração:**
```js
// wdio.conf.ts
export const config = {
    // Nível de verbosidade dos logs: trace | debug | info | warn | error | silent
    logLevel: 'info', // Controla quais logs do framework são capturados
    // ...
};
```

Isso facilita depurar erros de JavaScript, acompanhar o comportamento da aplicação e visualizar as operações internas do WebDriverIO durante a execução dos testes.

## Demonstração

### >_ Logs do Console
![Console Logs](/img/devtools/console-logs.gif)