---
id: multi-framework-support
title: Suporte Multi-Framework
---

O DevTools funciona automaticamente com Mocha, Jasmine e Cucumber sem necessitar de configurações específicas para cada framework. Simplesmente adicione o serviço ao seu arquivo de configuração WebDriverIO e todos os recursos funcionam perfeitamente independentemente de qual framework de teste você esteja utilizando.

**Frameworks Suportados:**
- **Mocha** - Execução a nível de teste e suíte com filtragem por grep
- **Jasmine** - Integração completa com filtragem baseada em grep
- **Cucumber** - Execução a nível de cenário e exemplo com direcionamento feature:line

A mesma interface de depuração, re-execução de testes e recursos de visualização funcionam consistentemente em todos os frameworks.

## Configuration

```js
// wdio.conf.js
export const config = {
    framework: 'mocha', // or 'jasmine' or 'cucumber'
    services: ['devtools'],
    // ...
};
```