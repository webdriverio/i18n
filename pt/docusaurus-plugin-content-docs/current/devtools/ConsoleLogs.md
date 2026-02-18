---
id: console-logs
title: Logs do Console
---

Capture e inspecione toda a saída do console do navegador durante a execução do teste. O DevTools registra mensagens do console da sua aplicação (`console.log()`, `console.warn()`, `console.error()`, `console.info()`, `console.debug()`) assim como logs do framework WebDriverIO baseados no `logLevel` configurado no seu `wdio.conf.ts`.

**Recursos:**
- Captura de mensagens do console em tempo real durante a execução do teste
- Logs do console do navegador (log, warn, error, info, debug)
- Logs do framework WebDriverIO filtrados pelo `logLevel` configurado (trace, debug, info, warn, error, silent)
- Carimbos de data/hora mostrando exatamente quando cada mensagem foi registrada
- Logs do console exibidos junto com as etapas de teste e capturas de tela do navegador para contexto

**Configuração:**
```js
// wdio.conf.ts
export const config = {
    // Nível de verbosidade do registro: trace | debug | info | warn | error | silent
    logLevel: 'info', // Controla quais logs do framework são capturados
    // ...
};
```

Isso facilita a depuração de erros JavaScript, o acompanhamento do comportamento da aplicação e a visualização das operações internas do WebDriverIO durante a execução do teste.

## Demo

### >_ Logs do Console
![Console Logs](./demo/console-logs.gif)