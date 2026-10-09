---
id: assertion
title: Assertion
description: "Schreiben Sie Assertions zum Zustand von Browser und Elementen mit der integrierten expect-webdriverio-Bibliothek, verwenden Sie Soft Assertions und migrieren Sie von Chai."
---

Der [WDIO-Testrunner](https://webdriver.io/docs/clioptions) wird mit einer integrierten Assertion-Bibliothek ausgeliefert, mit der Sie aussagekräftige Assertions zu verschiedenen Aspekten des Browsers oder von Elementen innerhalb Ihrer (Web-)Anwendung formulieren können. Sie erweitert die Funktionalität von [Jests Matchers](https://jestjs.io/docs/en/using-matchers) um zusätzliche, für E2E-Tests optimierte Matcher, z. B.:

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

oder

```js
const selectOptions = await $$('form select>option')

// make sure there is at least one option in select
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

Die vollständige Liste finden Sie in der [expect-API-Dokumentation](/docs/api/expect-webdriverio).

:::info Jasmine

Mit dem Jasmine-Framework kombiniert `expect` die Matcher von Jasmine mit den WebdriverIO-Matchern. Die synchronen Matcher von Jasmine benötigen kein `await`, und die Jest-Bestandteile von `expect`, wie z. B. `expect.soft()`, sind nicht verfügbar. Siehe [Jasmine verwenden](/docs/frameworks#assertions).

:::

## Soft Assertions

WebdriverIO enthält standardmäßig Soft Assertions aus `expect-webdriverio` (seit 5.2.0). Soft Assertions ermöglichen es Ihren Tests, die Ausführung fortzusetzen, auch wenn eine Assertion fehlschlägt. Alle Fehler werden gesammelt und am Ende des Tests gemeldet.

### Verwendung

```js
// These won't throw immediately if they fail
await expect.soft(await $('h1').getText()).toEqual('Basketball Shoes');
await expect.soft(await $('#price').getText()).toMatch(/€\d+/);

// Regular assertions still throw immediately
await expect(await $('.add-to-cart').isClickable()).toBe(true);
```

## Migration von Chai

[Chai](https://www.chaijs.com/) und [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) können nebeneinander existieren, und mit einigen kleinen Anpassungen lässt sich ein reibungsloser Übergang zu expect-webdriverio erreichen. Wenn Sie auf WebdriverIO v6 aktualisiert haben, haben Sie standardmäßig sofort Zugriff auf alle Assertions von `expect-webdriverio`. Das bedeutet, dass Sie überall, wo Sie global `expect` verwenden, eine `expect-webdriverio`-Assertion aufrufen. Es sei denn, Sie haben [`injectGlobals`](/docs/configuration#injectglobals) auf `false` gesetzt oder das globale `expect` explizit überschrieben, um Chai zu verwenden. In diesem Fall hätten Sie keinen Zugriff auf die expect-webdriverio-Assertions, ohne das expect-webdriverio-Paket dort, wo Sie es benötigen, explizit zu importieren.

Diese Anleitung zeigt Beispiele, wie Sie von Chai migrieren, wenn es lokal überschrieben wurde, und wie Sie von Chai migrieren, wenn es global überschrieben wurde.

### Lokal

Angenommen, Chai wurde explizit in einer Datei importiert, z. B.:

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

Um diesen Code zu migrieren, entfernen Sie den Chai-Import und verwenden stattdessen die neue expect-webdriverio-Assertion-Methode `toHaveUrl`:

```js
// myfile.js - migrated code
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // new expect-webdriverio API method https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

Wenn Sie sowohl Chai als auch expect-webdriverio in derselben Datei verwenden möchten, behalten Sie den Chai-Import bei, und `expect` verwendet standardmäßig die expect-webdriverio-Assertion, z. B.:

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

Angenommen, `expect` wurde global überschrieben, um Chai zu verwenden. Um expect-webdriverio-Assertions zu verwenden, müssen wir im „before“-Hook global eine Variable setzen, z. B.:

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

Jetzt können Chai und expect-webdriverio nebeneinander verwendet werden. In Ihrem Code würden Sie Chai- und expect-webdriverio-Assertions wie folgt verwenden, z. B.:

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

Für die Migration würden Sie nach und nach jede Chai-Assertion auf expect-webdriverio umstellen. Sobald alle Chai-Assertions in der gesamten Codebasis ersetzt wurden, kann der „before“-Hook gelöscht werden. Ein globales Suchen und Ersetzen, bei dem alle Vorkommen von `wdioExpect` durch `expect` ersetzt werden, schließt die Migration dann ab.