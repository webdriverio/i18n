---
id: integrate-with-smartui
title: SmartUI
---

TestMu AI (Anciennement LambdaTest) [SmartUI](https://www.testmuai.com/support/docs/smart-visual-testing/) fournit des tests de régression visuelle alimentés par l'IA pour vos tests WebdriverIO. Il capture des captures d'écran, les compare aux références de base et met en évidence les différences visuelles avec des algorithmes de comparaison intelligents.

## Configuration

**Créer un projet SmartUI**

[Connectez-vous](https://accounts.lambdatest.com/register) à TestMu AI (Anciennement LambdaTest) et naviguez vers [SmartUI Projects](https://smartui.lambdatest.com/) pour créer un nouveau projet. Sélectionnez **Web** comme plateforme et configurez le nom de votre projet, les approbateurs et les tags.

**Configurer les identifiants**

Obtenez votre `LT_USERNAME` et `LT_ACCESS_KEY` depuis le tableau de bord TestMu AI (Anciennement LambdaTest) et définissez-les comme variables d'environnement :

```sh
export LT_USERNAME="<your username>"
export LT_ACCESS_KEY="<your access key>"
```

**Installer SmartUI SDK**

```sh
npm install @lambdatest/wdio-driver
```

**Configurer WebdriverIO**

Mettez à jour votre `wdio.conf.js` :

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

## Utilisation

Utilisez `browser.execute('smartui.takeScreenshot')` pour capturer des captures d'écran :

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

**Exécuter les tests**

```sh
npx wdio wdio.conf.js
```

Consultez les résultats dans le [SmartUI Dashboard](https://smartui.lambdatest.com/).

## Options avancées

**Ignorer des éléments**

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

**Sélectionner des zones spécifiques**

```javascript
await browser.execute('smartui.takeScreenshot', {
  screenshotName: 'Compare Specific Area',
  selectDOM: {
    id: ['main-content']
  }
});
```

## Ressources

| Ressource                                                                                       | Description                                 |
|-------------------------------------------------------------------------------------------------|---------------------------------------------|
| [Documentation officielle](https://www.testmuai.com/support/docs/smart-ui-cypress/)          | Documentation SmartUI                       |
| [Tableau de bord SmartUI](https://smartui.lambdatest.com/)                                      | Accédez à vos projets et builds SmartUI     |
| [Paramètres avancés](https://www.testmuai.com/support/docs/test-settings-options/)           | Configurer la sensibilité de comparaison    |
| [Options de build](https://www.testmuai.com/support/docs/smart-ui-build-options/)            | Configuration avancée des builds            |