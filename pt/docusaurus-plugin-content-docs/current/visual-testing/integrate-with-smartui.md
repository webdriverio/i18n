---
id: integrate-with-smartui
title: SmartUI
---

TestMu AI (Anteriormente LambdaTest) [SmartUI](https://www.testmuai.com/support/docs/smart-visual-testing/) fornece testes de regressão visual com tecnologia de IA para seus testes WebdriverIO. Ele captura screenshots, compara-os com as linhas de base e destaca diferenças visuais com algoritmos de comparação inteligentes.

## Configuração

**Crie um projeto SmartUI**

[Faça login](https://accounts.lambdatest.com/register) no TestMu AI (Anteriormente LambdaTest) e navegue até [Projetos SmartUI](https://smartui.lambdatest.com/) para criar um novo projeto. Selecione **Web** como plataforma e configure o nome do seu projeto, aprovadores e tags.

**Configure suas credenciais**

Obtenha seu `LT_USERNAME` e `LT_ACCESS_KEY` do painel do TestMu AI (Anteriormente LambdaTest) e defina-os como variáveis de ambiente:

```sh
export LT_USERNAME="<your username>"
export LT_ACCESS_KEY="<your access key>"
```

**Instale o SDK SmartUI**

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

Veja os resultados no [Painel SmartUI](https://smartui.lambdatest.com/).

## Opções Avançadas

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

| Recurso                                                                                          | Descrição                                |
|--------------------------------------------------------------------------------------------------|------------------------------------------|
| [Documentação Oficial](https://www.testmuai.com/support/docs/smart-ui-cypress/)               | Documentação do SmartUI                   |
| [Painel SmartUI](https://smartui.lambdatest.com/)                                                | Acesse seus projetos e builds do SmartUI  |
| [Configurações Avançadas](https://www.testmuai.com/support/docs/test-settings-options/)       | Configure a sensibilidade de comparação  |
| [Opções de Build](https://www.testmuai.com/support/docs/smart-ui-build-options/)              | Configuração avançada de build           |