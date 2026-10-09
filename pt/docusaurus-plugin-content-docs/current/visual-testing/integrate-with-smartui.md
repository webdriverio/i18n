---
id: integrate-with-smartui
title: SmartUI
description: "Adicione testes de regressão visual com IA aos testes do WebdriverIO com o SmartUI da TestMu AI (anteriormente LambdaTest), incluindo configuração e opções."
---

O [SmartUI](https://www.testmuai.com/support/docs/smart-visual-testing/) da TestMu AI (anteriormente LambdaTest) oferece testes de regressão visual com IA para seus testes do WebdriverIO. Ele captura screenshots, compara-as com as baselines e destaca diferenças visuais com algoritmos de comparação inteligentes.

## Configuração

**Crie um projeto SmartUI**

[Faça login](https://accounts.lambdatest.com/register) na TestMu AI (anteriormente LambdaTest) e navegue até [SmartUI Projects](https://smartui.lambdatest.com/) para criar um novo projeto. Selecione **Web** como plataforma e configure o nome do projeto, os aprovadores e as tags.

**Configure as credenciais**

Obtenha seu `LT_USERNAME` e `LT_ACCESS_KEY` no painel da TestMu AI (anteriormente LambdaTest) e defina-os como variáveis de ambiente:

```sh
export LT_USERNAME="<your username>"
export LT_ACCESS_KEY="<your access key>"
```

**Instale o SDK do SmartUI**

```sh
npm install @lambdatest/wdio-driver
```

**Configure o WebdriverIO**

Atualize seu `wdio.conf.js`:

```javascript
exports.config = {
  user: process.env.LT_USERNAME,
  key: process.env.LT_ACCESS_KEY,

  capabilities: [{
    browserName: 'chrome',
    browserVersion: 'latest',
    'LT:Options': {
      platform: 'Windows 10',
      build: 'SmartUI Build',
      name: 'SmartUI Test',
      smartUI.project: '<Your Project Name>',
      smartUI.build: '<Your Build Name>',
      smartUI.baseline: false
    }
  }]
}
```

## Uso

Use `browser.execute('smartui.takeScreenshot')` para capturar screenshots:

```javascript
describe('WebdriverIO SmartUI Test', () => {
  it('should capture screenshot for visual testing', async () => {
    await browser.url('https://webdriver.io');

    await browser.execute('smartui.takeScreenshot', {
      screenshotName: 'Homepage Screenshot'
    });

    await browser.execute('smartui.takeScreenshot', {
      screenshotName: 'Homepage with Options',
      ignoreDOM: {
        id: ['dynamic-element-id'],
        class: ['ad-banner']
      }
    });
  });
});
```

**Execute os testes**

```sh
npx wdio wdio.conf.js
```

Veja os resultados no [SmartUI Dashboard](https://smartui.lambdatest.com/).

## Opções avançadas

**Ignorar elementos**

```javascript
await browser.execute('smartui.takeScreenshot', {
  screenshotName: 'Ignore Dynamic Elements',
  ignoreDOM: {
    id: ['element-id'],
    class: ['dynamic-class'],
    xpath: ['//div[@class="ad"]']
  }
});
```

**Selecionar áreas específicas**

```javascript
await browser.execute('smartui.takeScreenshot', {
  screenshotName: 'Compare Specific Area',
  selectDOM: {
    id: ['main-content']
  }
});
```

## Recursos

| Recurso                                                                                           | Descrição                                     |
|---------------------------------------------------------------------------------------------------|-----------------------------------------------|
| [Documentação oficial](https://www.testmuai.com/support/docs/smart-ui-cypress/)                 | Documentação do SmartUI                       |
| [SmartUI Dashboard](https://smartui.lambdatest.com/)                                              | Acesse seus projetos e builds do SmartUI      |
| [Configurações avançadas](https://www.testmuai.com/support/docs/test-settings-options/)         | Configure a sensibilidade da comparação       |
| [Opções de build](https://www.testmuai.com/support/docs/smart-ui-build-options/)                | Configuração avançada de builds               |