---
id: multi-framework-support
title: Suporte a Múltiplos Frameworks
description: "Use o serviço DevTools com Mocha, Jasmine ou Cucumber sem configuração específica de framework."
---

O DevTools funciona automaticamente com Mocha, Jasmine e Cucumber sem exigir nenhuma configuração específica de framework. Basta adicionar o serviço à sua configuração do WebDriverIO e todos os recursos funcionarão perfeitamente, independentemente do framework de teste que você estiver usando.

**Frameworks Suportados:**
- **Mocha** - Execução em nível de teste e de suite com filtragem por grep
- **Jasmine** - Integração completa com filtragem baseada em grep
- **Cucumber** - Execução em nível de cenário e de exemplo com direcionamento por feature:line

A mesma interface de depuração, reexecução de testes e recursos de visualização funcionam de forma consistente em todos os frameworks.

## Configuração

```js
// wdio.conf.js
export const config = {
    framework: 'mocha', // ou 'jasmine' ou 'cucumber'
    services: ['devtools'],
    // ...
};
```