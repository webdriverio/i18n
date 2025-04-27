---
id: assertion
title: Assertion
---

Le [testrunner WDIO](https://webdriver.io/docs/clioptions) est livré avec une bibliothèque d'assertions intégrée qui vous permet de faire des assertions puissantes sur divers aspects du navigateur ou des éléments de votre application (web). Il étend la fonctionnalité [Matchers de Jest](https://jestjs.io/docs/en/using-matchers) avec des matchers supplémentaires optimisés pour les tests e2e, par exemple :

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

ou

```js
const selectOptions = await $$('form select>option')

// make sure there is at least one option in select
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

Pour la liste complète, consultez la [documentation de l'API expect](/docs/api/expect-webdriverio).

## Migration depuis Chai

[Chai](https://www.chaijs.com/) et [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) peuvent coexister, et avec quelques ajustements mineurs, une transition en douceur vers expect-webdriverio peut être réalisée. Si vous avez mis à niveau vers WebdriverIO v6, vous aurez par défaut accès à toutes les assertions de `expect-webdriverio` prêtes à l'emploi. Cela signifie que globalement, partout où vous utilisez `expect`, vous appelleriez une assertion `expect-webdriverio`. Cela, à moins que vous n'ayez défini [`injectGlobals`](/docs/configuration#injectglobals) sur `false` ou que vous ayez explicitement remplacé le `expect` global pour utiliser Chai. Dans ce cas, vous n'auriez pas accès aux assertions expect-webdriverio sans importer explicitement le package expect-webdriverio là où vous en avez besoin.

Ce guide montrera des exemples de migration depuis Chai s'il a été remplacé localement et comment migrer depuis Chai s'il a été remplacé globalement.

### Local

Supposons que Chai ait été importé explicitement dans un fichier, par exemple :

```js
// myfile.js - original code
import { expect as expectChai } from 'chai'

describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        expectChai(await browser.getUrl()).to.include('/login')
    })
})
```

Pour migrer ce code, supprimez l'importation de Chai et utilisez plutôt la nouvelle méthode d'assertion expect-webdriverio `toHaveUrl` :

```js
// myfile.js - migrated code
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // new expect-webdriverio API method https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

Si vous souhaitez utiliser à la fois Chai et expect-webdriverio dans le même fichier, vous conserveriez l'importation de Chai et `expect` serait par défaut l'assertion expect-webdriverio, par exemple :

```js
// myfile.js
import { expect as expectChai } from 'chai'
import { expect as expectWDIO } from '@wdio/globals'

describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expectChai(isDisplayed).to.equal(true); // Chai assertion
    })
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWDIO($("#element")).not.toBeDisplayed(); // expect-webdriverio assertion
    })
})
```

### Global

Supposons que `expect` ait été globalement remplacé pour utiliser Chai. Pour utiliser les assertions expect-webdriverio, nous devons définir globalement une variable dans le hook "before", par exemple :

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

Maintenant, Chai et expect-webdriverio peuvent être utilisés côte à côte. Dans votre code, vous utiliseriez les assertions Chai et expect-webdriverio comme suit, par exemple :

```js
// myfile.js
describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expect(isDisplayed).to.equal(true); // Chai assertion
    });
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWdio($("#element")).not.toBeDisplayed(); // expect-webdriverio assertion
    });
});
```

Pour migrer, vous déplaceriez progressivement chaque assertion Chai vers expect-webdriverio. Une fois que toutes les assertions Chai ont été remplacées dans la base de code, le hook "before" peut être supprimé. Une recherche et un remplacement global pour remplacer toutes les instances de `wdioExpect` par `expect` termineront alors la migration.