---
id: coverage
title: Couverture de code
description: "Collectez la couverture de code pour les tests de composants avec le browser runner, qui instrumente votre code avec istanbul via Vite."
---

Le browser runner de WebdriverIO prend en charge les rapports de couverture de code en utilisant [`istanbul`](https://istanbul.js.org/). Le testrunner instrumentera automatiquement votre code en utilisant Vite et capturera la couverture de code pour vous.

## Comment ça fonctionne

Le `@wdio/browser-runner` utilise Vite pour servir votre application. Lorsque vous activez la couverture, il ajoute un plugin au serveur Vite qui tente d'instrumenter votre code source à la volée lorsqu'il est demandé par le navigateur.

:::warning Important
**Ne quittez pas la page du test runner !**

La couverture de code repose sur le fait que les fichiers sont servis et instrumentés par le serveur Vite local démarré par WebdriverIO.
Si vous utilisez `browser.url('http://...')` ou `browser.url('file://...')` pour naviguer vers une autre page, vous quittez l'environnement instrumenté. Votre code s'exécutera, mais **aucune couverture ne sera collectée**.

**Approche correcte (tests de composants) :**
Effectuez le rendu de votre composant ou importez votre module directement dans le fichier de test.

```js
import { myFunction } from '../src/utils.js'

it('should cover my function', () => {
    myFunction() // Ceci est couvert
})
```

**Approche incorrecte (style E2E) :**
```js
it('will not have coverage', async () => {
    // ❌ naviguer ailleurs casse l'instrumentation
    await browser.url('http://localhost:3000')
})
```
:::

## Configuration

Afin d'activer les rapports de couverture de code, activez-les via la configuration du browser runner de WebdriverIO, par exemple :

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

Consultez toutes les [options de couverture](/docs/runner#coverage-options) pour apprendre à la configurer correctement.

:::tip Conseils de configuration
Si vous testez des fichiers non standard (comme des scripts intégrés dans des fichiers `.html`) ou si vos fichiers ne sont pas pris en compte, vous devrez peut-être vérifier explicitement vos options `include` et `extension` :

```js
coverage: {
    enabled: true,
    // Ciblez explicitement vos fichiers sources si la résolution par défaut échoue
    include: ['src/**/*.js', 'src/**/*.vue'],
    // Ajoutez .html si vous avez des scripts intégrés
    extension: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.html']
}
```
:::

## Ignorer du code

Il peut y avoir certaines sections de votre base de code que vous souhaitez délibérément exclure du suivi de couverture. Pour ce faire, vous pouvez utiliser les indications d'analyse suivantes :

- `/* istanbul ignore if */` : ignore la prochaine instruction if.
- `/* istanbul ignore else */` : ignore la partie else d'une instruction if.
- `/* istanbul ignore next */` : ignore l'élément suivant dans le code source (fonctions, instructions if, classes, etc.).
- `/* istanbul ignore file */` : ignore un fichier source entier (ceci doit être placé en haut du fichier).

:::info

Il est recommandé d'exclure vos fichiers de test des rapports de couverture car cela pourrait provoquer des erreurs, par exemple lors de l'appel de la commande `execute`. Si vous souhaitez les conserver dans votre rapport, assurez-vous d'exclure leur instrumentation via :

```ts
await browser.execute(/* istanbul ignore next */() => {
    // ...
})
```

:::