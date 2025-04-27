---
id: browserstack
title: Testes de Acessibilidade BrowserStack
---

# BrowserStack Accessibility Testing

Você pode facilmente integrar testes de acessibilidade em suas suítes de teste WebdriverIO usando o [recurso de testes automatizados do BrowserStack Accessibility Testing](https://www.browserstack.com/docs/accessibility/automated-tests?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

## Vantagens dos Testes Automatizados no BrowserStack Accessibility Testing

Para usar testes automatizados no BrowserStack Accessibility Testing, seus testes devem estar rodando no BrowserStack Automate.

As seguintes vantagens dos testes automatizados são:

* Integra-se perfeitamente à sua suíte de testes de automação pré-existente.
* Não são necessárias alterações de código nos casos de teste.
* Requer zero manutenção adicional para testes de acessibilidade.
* Entenda tendências históricas e obtenha insights dos casos de teste.

## Comece com o BrowserStack Accessibility Testing

Siga estes passos para integrar suas suítes de teste WebdriverIO com o Accessibility Testing do BrowserStack:

1. Instale o pacote npm `@wdio/browserstack-service`.

```bash npm2yarn
npm install --save-dev @wdio/browserstack-service
```

2. Atualize o arquivo de configuração `wdio.conf.js`.

```javascript
exports.config = {
    //...
    user: '<browserstack_username>' || process.env.BROWSERSTACK_USERNAME,
    key: '<browserstack_access_key>' || process.env.BROWSERSTACK_ACCESS_KEY,
    commonCapabilities: {
      'bstack:options': {
        projectName: "Your static project name goes here",
        buildName: "Your static build/job name goes here"
      }
    },
    services: [
      ['browserstack', {
        accessibility: true,
        // Optional configuration options
        accessibilityOptions: {
          'wcagVersion': 'wcag21a',
          'includeIssueType': {
            'bestPractice': false,
            'needsReview': true
          },
          'includeTagsInTestingScope': ['Specify tags of test cases to be included'],
          'excludeTagsInTestingScope': ['Specify tags of test cases to be excluded']
        },
      }]
    ],
    //...
  };
```

Você pode ver instruções detalhadas [aqui](https://www.browserstack.com/docs/accessibility/automated-tests/get-started/webdriverio?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).