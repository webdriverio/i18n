---
id: coverage
title: Couverture de code
---

Le runner de navigateur de WebdriverIO prend en charge les rapports de couverture de code à l'aide d'[`istanbul`](https://istanbul.js.org/). Le testrunner instrumentera automatiquement votre code et capturera la couverture de code pour vous.

## Configuration

Pour activer les rapports de couverture de code, activez-le via la configuration du runner de navigateur WebdriverIO, par exemple :

```js title=wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: process.env.WDIO_PRESET,
        coverage: {
            enabled: true
        }
    }],
    // ...
}
```

Consultez toutes les [options de couverture](/docs/runner#coverage-options) pour apprendre comment les configurer correctement.

## Ignorer du code

Il peut y avoir certaines sections de votre code que vous souhaitez délibérément exclure du suivi de couverture. Pour ce faire, vous pouvez utiliser les indications d'analyse suivantes :

- `/* istanbul ignore if */` : ignore la prochaine instruction if.
- `/* istanbul ignore else */` : ignore la partie else d'une instruction if.
- `/* istanbul ignore next */` : ignore la prochaine chose dans le code source (fonctions, instructions if, classes, etc.).
- `/* istanbul ignore file */` : ignore un fichier source entier (ceci doit être placé en haut du fichier).

:::info

Il est recommandé d'exclure vos fichiers de test des rapports de couverture car cela pourrait causer des erreurs, par exemple lors de l'appel des commandes `execute` ou `executeAsync`. Si vous souhaitez les conserver dans votre rapport, assurez-vous de les exclure de l'instrumentation via :

```ts
await browser.execute(/* istanbul ignore next */() => {
    // ...
})
```

:::