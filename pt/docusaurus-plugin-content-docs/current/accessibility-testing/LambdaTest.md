---
id: testmuai
title: Testes de Acessibilidade com TestMu AI (Anteriormente LambdaTest)
description: "Habilite os testes de acessibilidade do TestMu AI (anteriormente LambdaTest) na sua suíte WebdriverIO, configure as opções de varredura e visualize os relatórios de acessibilidade."
---

# Testes de Acessibilidade com TestMu AI

Você pode integrar facilmente testes de acessibilidade em suas suítes de teste WebdriverIO usando o [TestMu AI Accessibility Testing](https://www.testmuai.com/support/docs/accessibility-automation-settings/).

## Vantagens dos Testes de Acessibilidade com TestMu AI

O TestMu AI Accessibility Testing ajuda você a identificar e corrigir problemas de acessibilidade em suas aplicações web. A seguir estão as principais vantagens:

* Integra-se perfeitamente com sua automação de testes WebdriverIO existente.
* Varredura automatizada de acessibilidade durante a execução dos testes.
* Relatórios abrangentes de conformidade com WCAG.
* Rastreamento detalhado de problemas com orientações de correção.
* Suporte a vários padrões WCAG (WCAG 2.0, WCAG 2.1, WCAG 2.2).
* Insights de acessibilidade em tempo real no painel do TestMu AI.

## Comece a Usar os Testes de Acessibilidade com TestMu AI

Siga estas etapas para integrar suas suítes de teste WebdriverIO com o Accessibility Testing do TestMu AI:

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
            accessibility: true, // Habilita os testes de acessibilidade
            accessibilityOptions: {
                wcagVersion: 'wcag21a', // Versão WCAG (wcag20, wcag21a, wcag21aa, wcag22aa)
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

3. Execute seus testes normalmente. O TestMu AI fará automaticamente a varredura de problemas de acessibilidade durante a execução dos testes.

```bash
npx wdio run wdio.conf.js
```

## Opções de Configuração

O objeto `accessibilityOptions` suporta os seguintes parâmetros:

* **wcagVersion**: Especifica a versão do padrão WCAG a ser usada nos testes
  - `wcag20` - WCAG 2.0 Nível A
  - `wcag21a` - WCAG 2.1 Nível A
  - `wcag21aa` - WCAG 2.1 Nível AA (padrão)
  - `wcag22aa` - WCAG 2.2 Nível AA

* **bestPractice**: Inclui recomendações de boas práticas (padrão: `false`)

* **needsReview**: Inclui problemas que precisam de revisão manual (padrão: `true`)

## Visualizando Relatórios de Acessibilidade

Após a conclusão dos seus testes, você pode visualizar relatórios detalhados de acessibilidade no [Painel do TestMu AI](https://automation.lambdatest.com/):

1. Navegue até a execução do seu teste
2. Clique na aba "Accessibility"
3. Revise os problemas identificados com seus níveis de gravidade
4. Obtenha orientações de correção para cada problema

Para informações mais detalhadas, visite a [documentação do TestMu AI Accessibility Automation](https://www.testmuai.com/support/docs/accessibility-automation-settings/).