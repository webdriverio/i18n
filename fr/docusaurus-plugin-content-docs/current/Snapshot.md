---
id: snapshot
title: Snapshot
---

Les tests de snapshot peuvent être très utiles pour vérifier simultanément un large éventail d'aspects de votre composant ou de votre logique. Dans WebdriverIO, vous pouvez prendre des snapshots de n'importe quel objet arbitraire ainsi que de la structure DOM d'un WebElement ou des résultats de commandes WebdriverIO.

Comme pour d'autres frameworks de test, WebdriverIO prendra un snapshot de la valeur donnée, puis le comparera à un fichier de snapshot de référence stocké à côté du test. Le test échouera si les deux snapshots ne correspondent pas : soit le changement est inattendu, soit le snapshot de référence doit être mis à jour vers la nouvelle version du résultat.

:::info Prise en charge multiplateforme

Ces fonctionnalités de snapshot sont disponibles pour l'exécution de tests end-to-end dans l'environnement Node.js ainsi que pour l'exécution de tests [unitaires et de composants](/docs/component-testing) dans le navigateur ou sur des appareils mobiles.

:::

## Utiliser les Snapshots
Pour prendre un snapshot d'une valeur, vous pouvez utiliser `toMatchSnapshot()` de l'API [`expect()`](/docs/api/expect-webdriverio) :

```ts
import { browser, expect } from '@wdio/globals'

it('can take a DOM snapshot', () => {
    await browser.url('https://guinea-pig.webdriver.io/')
    await expect($('.findme')).toMatchSnapshot()
})
```

La première fois que ce test est exécuté, WebdriverIO crée un fichier de snapshot qui ressemble à ceci :

```js
// Snapshot v1

exports[`main suite 1 > can take a DOM snapshot 1`] = `"<h1 class="findme">Test CSS Attributes</h1>"`;
```

L'artefact de snapshot doit être validé avec les modifications de code et examiné dans le cadre de votre processus de revue de code. Lors des exécutions de test suivantes, WebdriverIO comparera le résultat rendu avec le snapshot précédent. S'ils correspondent, le test réussira. S'ils ne correspondent pas, soit le test a trouvé un bug dans votre code qui doit être corrigé, soit l'implémentation a changé et le snapshot doit être mis à jour.

Pour mettre à jour le snapshot, passez le flag `-s` (ou `--updateSnapshot`) à la commande `wdio`, par exemple :

```sh
npx wdio run wdio.conf.js -s
```

__Remarque :__ si vous exécutez des tests avec plusieurs navigateurs en parallèle, un seul snapshot est créé et comparé. Si vous souhaitez avoir un snapshot distinct par capacité, veuillez [créer un ticket](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Idea+%F0%9F%92%A1%2CNeeds+Triaging+%E2%8F%B3&projects=&template=feature-request.yml&title=%5B%F0%9F%92%A1+Feature%5D%3A+%3Ctitle%3E) et nous informer de votre cas d'utilisation.

## Snapshots Inline

De même, vous pouvez utiliser `toMatchInlineSnapshot()` pour stocker le snapshot en ligne dans le fichier de test.

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

Au lieu de créer un fichier de snapshot, Vitest modifiera directement le fichier de test pour mettre à jour le snapshot sous forme de chaîne :

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
    const elem = $('.container')
    await expect(elem.getCSSProperty()).toMatchInlineSnapshot(`
        {
            "parsed": {
                "alpha": 0,
                "hex": "#000000",
                "rgba": "rgba(0,0,0,0)",
                "type": "color",
            },
            "property": "background-color",
            "value": "rgba(0,0,0,0)",
        }
    `)
})
```

Cela vous permet de voir directement le résultat attendu sans avoir à naviguer entre différents fichiers.

## Snapshots Visuels

Prendre un snapshot DOM d'un élément peut ne pas être la meilleure idée, surtout si la structure DOM est trop grande et contient des propriétés d'élément dynamiques. Dans ces cas, il est recommandé de s'appuyer sur des snapshots visuels pour les éléments.

Pour activer les snapshots visuels, ajoutez le `@wdio/visual-service` à votre configuration. Vous pouvez suivre les instructions de configuration dans la [documentation](/docs/visual-testing#installation) pour les tests visuels.

Vous pouvez ensuite prendre un snapshot visuel via `toMatchElementSnapshot()`, par exemple :

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

Une image est alors stockée dans le répertoire de référence. Consultez la section [Tests Visuels](/docs/visual-testing) pour plus d'informations.