---
id: integrate-with-smartui
title: SmartUI
description: "Aggiungi test di regressione visiva basati sull'IA ai test WebdriverIO con SmartUI di TestMu AI (precedentemente LambdaTest), inclusi configurazione e opzioni."
---

[SmartUI](https://www.testmuai.com/support/docs/smart-visual-testing/) di TestMu AI (precedentemente LambdaTest) offre test di regressione visiva basati sull'IA per i tuoi test WebdriverIO. Acquisisce screenshot, li confronta con le baseline ed evidenzia le differenze visive grazie ad algoritmi di confronto intelligenti.

## Configurazione

**Crea un progetto SmartUI**

[Accedi](https://accounts.lambdatest.com/register) a TestMu AI (precedentemente LambdaTest) e vai a [SmartUI Projects](https://smartui.lambdatest.com/) per creare un nuovo progetto. Seleziona **Web** come piattaforma e configura il nome del progetto, gli approvatori e i tag.

**Configura le credenziali**

Ottieni il tuo `LT_USERNAME` e la tua `LT_ACCESS_KEY` dalla dashboard di TestMu AI (precedentemente LambdaTest) e impostali come variabili d'ambiente:

```sh
export LT_USERNAME="<your username>"
export LT_ACCESS_KEY="<your access key>"
```

**Installa l'SDK di SmartUI**

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

Usa `browser.execute('smartui.takeScreenshot')` per acquisire screenshot:

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

Visualizza i risultati nella [SmartUI Dashboard](https://smartui.lambdatest.com/).

## Opzioni avanzate

**Ignora elementi**

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

**Seleziona aree specifiche**

```javascript
await browser.execute('smartui.takeScreenshot', {
  screenshotName: 'Compare Specific Area',
  selectDOM: {
    id: ['main-content']
  }
});
```

## Risorse

| Risorsa                                                                                           | Descrizione                                   |
|---------------------------------------------------------------------------------------------------|-----------------------------------------------|
| [Documentazione ufficiale](https://www.testmuai.com/support/docs/smart-ui-cypress/)            | Documentazione di SmartUI                     |
| [SmartUI Dashboard](https://smartui.lambdatest.com/)                                              | Accedi ai tuoi progetti e build SmartUI       |
| [Impostazioni avanzate](https://www.testmuai.com/support/docs/test-settings-options/)          | Configura la sensibilità del confronto        |
| [Opzioni di build](https://www.testmuai.com/support/docs/smart-ui-build-options/)              | Configurazione avanzata delle build           |