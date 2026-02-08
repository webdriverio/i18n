---
id: integrate-with-smartui
title: SmartUI
---

TestMu AI (ex LambdaTest) [SmartUI](https://www.testmuai.com/support/docs/smart-visual-testing/) fornisce test di regressione visiva basati su IA per i tuoi test WebdriverIO. Cattura screenshot, li confronta con le linee di base e evidenzia le differenze visive con algoritmi di confronto intelligenti.

## Configurazione

**Crea un progetto SmartUI**

[Accedi](https://accounts.lambdatest.com/register) a TestMu AI (ex LambdaTest) e naviga su [SmartUI Projects](https://smartui.lambdatest.com/) per creare un nuovo progetto. Seleziona **Web** come piattaforma e configura il nome del tuo progetto, gli approvatori e i tag.

**Configura le credenziali**

Ottieni il tuo `LT_USERNAME` e `LT_ACCESS_KEY` dalla dashboard di TestMu AI (ex LambdaTest) e impostali come variabili d'ambiente:

```sh
export LT_USERNAME="<your username>"
export LT_ACCESS_KEY="<your access key>"
```

**Installa SmartUI SDK**

```sh
npm install @lambdatest/wdio-driver
```

**Configura WebdriverIO**

Aggiorna il tuo `wdio.conf.js`:

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

## Utilizzo

Usa `browser.execute('smartui.takeScreenshot')` per catturare screenshot:

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

**Esegui i test**

```sh
npx wdio wdio.conf.js
```

Visualizza i risultati nella [Dashboard SmartUI](https://smartui.lambdatest.com/).

## Opzioni Avanzate

**Ignorare elementi**

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

**Selezionare aree specifiche**

```javascript
await browser.execute('smartui.takeScreenshot', {
  screenshotName: 'Compare Specific Area',
  selectDOM: {
    id: ['main-content']
  }
});
```

## Risorse

| Risorsa                                                                                          | Descrizione                                  |
|--------------------------------------------------------------------------------------------------|---------------------------------------------|
| [Documentazione Ufficiale](https://www.testmuai.com/support/docs/smart-ui-cypress/)              | Documentazione SmartUI                      |
| [Dashboard SmartUI](https://smartui.lambdatest.com/)                                             | Accedi ai tuoi progetti e build SmartUI     |
| [Impostazioni Avanzate](https://www.testmuai.com/support/docs/test-settings-options/)            | Configura la sensibilità di confronto       |
| [Opzioni di Build](https://www.testmuai.com/support/docs/smart-ui-build-options/)                | Configurazione avanzata delle build         |