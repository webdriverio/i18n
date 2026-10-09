---
id: assertion
title: Assertion
description: "Écrivez des assertions sur l'état du navigateur et des éléments avec la bibliothèque intégrée expect-webdriverio, utilisez les assertions souples et migrez depuis Chai."
---

Le [testrunner WDIO](https://webdriver.io/docs/clioptions) est livré avec une bibliothèque d'assertions intégrée qui vous permet de faire des assertions puissantes sur divers aspects du navigateur ou des éléments de votre application (web). Elle étend les fonctionnalités des [Matchers de Jest](https://jestjs.io/docs/en/using-matchers) avec des matchers supplémentaires, optimisés pour les tests e2e, par exemple :

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

ou

```js
const selectOptions = await $$('form select>option')

// s'assurer qu'il y a au moins une option dans le select
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

Pour la liste complète, consultez la [documentation de l'API expect](/docs/api/expect-webdriverio).

:::info Jasmine

Avec le framework Jasmine, `expect` combine les matchers de Jasmine et les matchers de WebdriverIO. Les matchers synchrones de Jasmine n'ont pas besoin de `await`, et les parties Jest de `expect`, comme `expect.soft()`, ne sont pas disponibles. Voir [Utiliser Jasmine](/docs/frameworks#assertions).

:::

## Assertions souples

WebdriverIO inclut par défaut les assertions souples (soft assertions) de `expect-webdriverio` (depuis la version 5.2.0). Les assertions souples permettent à vos tests de poursuivre leur exécution même lorsqu'une assertion échoue. Tous les échecs sont collectés et rapportés à la fin du test.

### Utilisation

```js
// Celles-ci ne lèveront pas d'erreur immédiatement si elles échouent
await expect.soft(await $('h1').getText()).toEqual('Basketball Shoes');
await expect.soft(await $('#price').getText()).toMatch(/€\d+/);

// Les assertions classiques lèvent toujours une erreur immédiatement
await expect(await $('.add-to-cart').isClickable()).toBe(true);
```

## Migrer depuis Chai

[Chai](https://www.chaijs.com/) et [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) peuvent coexister, et avec quelques ajustements mineurs, une transition en douceur vers expect-webdriverio peut être réalisée. Si vous avez mis à niveau vers WebdriverIO v6, vous aurez par défaut accès à toutes les assertions de `expect-webdriverio` directement. Cela signifie que partout où vous utilisez `expect` globalement, vous appelez une assertion `expect-webdriverio`. Sauf si vous avez défini [`injectGlobals`](/docs/configuration#injectglobals) sur `false` ou si vous avez explicitement remplacé le `expect` global pour utiliser Chai. Dans ce cas, vous n'auriez accès à aucune des assertions expect-webdriverio sans importer explicitement le package expect-webdriverio là où vous en avez besoin.

Ce guide présente des exemples de migration depuis Chai lorsqu'il a été remplacé localement, et lorsqu'il a été remplacé globalement.

### Local

Supposons que Chai ait été importé explicitement dans un fichier, par exemple :

```js
// myfile.js - code original
import { expect as expectChai } from 'chai'

describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        expectChai(await browser.getUrl()).to.include('/login')
    })
})
```

Pour migrer ce code, supprimez l'import de Chai et utilisez à la place la nouvelle méthode d'assertion expect-webdriverio `toHaveUrl` :

```js
// myfile.js - code migré
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // nouvelle méthode de l'API expect-webdriverio https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

Si vous souhaitez utiliser à la fois Chai et expect-webdriverio dans le même fichier, vous conserveriez l'import de Chai et `expect` correspondrait par défaut à l'assertion expect-webdriverio, par exemple :

```js
// myfile.js
import { expect as expectChai } from 'chai'
import { expect as expectWDIO } from '@wdio/globals'

describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expectChai(isDisplayed).to.equal(true); // assertion Chai
    })
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWDIO($("#element")).not.toBeDisplayed(); // assertion expect-webdriverio
    })
})
```

### Global

Supposons que `expect` ait été remplacé globalement pour utiliser Chai. Afin d'utiliser les assertions expect-webdriverio, nous devons définir globalement une variable dans le hook « before », par exemple :

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

Désormais, Chai et expect-webdriverio peuvent être utilisés côte à côte. Dans votre code, vous utiliseriez les assertions Chai et expect-webdriverio comme suit, par exemple :

```js
// myfile.js
describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expect(isDisplayed).to.equal(true); // assertion Chai
    });
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWdio($("#element")).not.toBeDisplayed(); // assertion expect-webdriverio
    });
});
```

Pour migrer, vous convertiriez progressivement chaque assertion Chai en expect-webdriverio. Une fois toutes les assertions Chai remplacées dans l'ensemble du code, le hook « before » peut être supprimé. Une recherche et un remplacement global de toutes les occurrences de `wdioExpect` par `expect` finaliseront alors la migration.