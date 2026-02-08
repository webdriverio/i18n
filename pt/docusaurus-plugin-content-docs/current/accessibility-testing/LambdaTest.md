---
id: testmuai
title: Teste de Acessibilidade TestMu AI (Anteriormente LambdaTest)
description: Teste de Acessibilidade TestMu AI
---

# Teste de Acessibilidade TestMu AI

Você pode facilmente integrar testes de acessibilidade em suas suítes de teste WebdriverIO usando o [Teste de Acessibilidade TestMu AI](https://www.testmuai.com/support/docs/accessibility-automation-settings/).

## Vantagens do Teste de Acessibilidade TestMu AI

O Teste de Acessibilidade TestMu AI ajuda você a identificar e corrigir problemas de acessibilidade em suas aplicações web. As principais vantagens são:

* Integra-se perfeitamente com a sua automação de testes WebdriverIO existente.
* Análise automatizada de acessibilidade durante a execução do teste.
* Relatórios abrangentes de conformidade com WCAG.
* Rastreamento detalhado de problemas com orientações para correção.
* Suporte para múltiplos padrões WCAG (WCAG 2.0, WCAG 2.1, WCAG 2.2).
* Informações de acessibilidade em tempo real no painel do TestMu AI.

## Comece com o Teste de Acessibilidade TestMu AI

Siga estas etapas para integrar suas suítes de teste WebdriverIO com o Teste de Acessibilidade do TestMu AI:

1. Instale o pacote de serviço WebdriverIO do TestMu AI.

```bash npm2yarn
npm install --save-dev @lambdatest/wdio-lambdatest-service
```

2. Atualize seu arquivo de configuração `wdio.conf.js`.

```javascript
exports.config = {
    //...
    user: process.env.LT_USERNAME || '<lambdatest_username>',
    key: process.env.LT_ACCESS_KEY || '<lambdatest_access_key>',

    capabilities: [{
        browserName: 'chrome',
        'LT:Options': {
            platform: 'Windows 10',
            version: 'latest',
            accessibility: true, // Enable accessibility testing
            accessibilityOptions: {
                wcagVersion: 'wcag21a', // WCAG version (wcag20, wcag21a, wcag21aa, wcag22aa)
                bestPractice: false,
                needsReview: true
            }
        }
    }],

    services: [
        ['lambdatest', {
            tunnel: false
        }]
    ],
    //...
};
```

3. Execute seus testes normalmente. O TestMu AI escaneará automaticamente problemas de acessibilidade durante a execução do teste.

```bash
npx wdio run wdio.conf.js
```

## Opções de Configuração

O objeto `accessibilityOptions` suporta os seguintes parâmetros:

* **wcagVersion**: Especifica a versão do padrão WCAG para testar
  - `wcag20` - WCAG 2.0 Nível A
  - `wcag21a` - WCAG 2.1 Nível A
  - `wcag21aa` - WCAG 2.1 Nível AA (padrão)
  - `wcag22aa` - WCAG 2.2 Nível AA

* **bestPractice**: Inclui recomendações de melhores práticas (padrão: `false`)

* **needsReview**: Inclui problemas que precisam de revisão manual (padrão: `true`)

## Visualizando Relatórios de Acessibilidade

Após a conclusão dos testes, você pode visualizar relatórios detalhados de acessibilidade no [Painel do TestMu AI](https://automation.lambdatest.com/):

1. Navegue até a execução do seu teste
2. Clique na aba "Accessibility"
3. Revise os problemas identificados com níveis de severidade
4. Obtenha orientações para correção de cada problema

Para informações mais detalhadas, visite a [documentação de Automação de Acessibilidade do TestMu AI](https://www.testmuai.com/support/docs/accessibility-automation-settings/).