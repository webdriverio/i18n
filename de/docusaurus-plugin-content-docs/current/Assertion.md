---
id: assertion
title: Behauptung
---

Der [WDIO Testrunner](https://webdriver.io/docs/clioptions) kommt mit einer eingebauten Assertion-Bibliothek, die es dir ermöglicht, leistungsstarke Behauptungen über verschiedene Aspekte des Browsers oder Elemente innerhalb deiner (Web-)Anwendung aufzustellen. Sie erweitert die Funktionalität von [Jests Matchers](https://jestjs.io/docs/en/using-matchers) mit zusätzlichen, für E2E-Tests optimierten Matchern, z.B.:

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

Die vollständige Liste findest du in der [expect API-Dokumentation](/docs/api/expect-webdriverio).

## Soft Assertions

WebdriverIO enthält standardmäßig Soft Assertions von expect-webdriver(5.2.0). Soft Assertions ermöglichen es deinen Tests, die Ausführung fortzusetzen, auch wenn eine Assertion fehlschlägt. Alle Fehler werden gesammelt und am Ende des Tests gemeldet.

### Verwendung

```js
// These won't throw immediately if they fail
await expect.soft(await $('h1').getText()).toEqual('Basketball Shoes');
await expect.soft(await $('#price').getText()).toMatch(/€\d+/);

// Regular assertions still throw immediately
await expect(await $('.add-to-cart').isClickable()).toBe(true);
```

## Migration von Chai

[Chai](https://www.chaijs.com/) und [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) können nebeneinander existieren, und mit einigen kleinen Anpassungen kann ein reibungsloser Übergang zu expect-webdriverio erreicht werden. Wenn du auf WebdriverIO v6 aktualisiert hast, hast du standardmäßig Zugriff auf alle Assertions von `expect-webdriverio`. Das bedeutet, dass du überall, wo du `expect` verwendest, eine `expect-webdriverio`-Assertion aufrufst. Es sei denn, du hast [`injectGlobals`](/docs/configuration#injectglobals) auf `false` gesetzt oder das globale `expect` explizit überschrieben, um Chai zu verwenden. In diesem Fall hättest du keinen Zugriff auf die expect-webdriverio-Assertions, ohne das expect-webdriverio-Paket explizit dort zu importieren, wo du es benötigst.

Diese Anleitung zeigt Beispiele, wie du von Chai migrieren kannst, wenn es lokal überschrieben wurde, und wie du von Chai migrieren kannst, wenn es global überschrieben wurde.

### Lokal

Angenommen, Chai wurde explizit in einer Datei importiert, z.B.:

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

Um diesen Code zu migrieren, entferne den Chai-Import und verwende stattdessen die neue expect-webdriverio-Assertion-Methode `toHaveUrl`:

```js
// myfile.js - migrated code
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // new expect-webdriverio API method https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

Wenn du sowohl Chai als auch expect-webdriverio in derselben Datei verwenden möchtest, würdest du den Chai-Import beibehalten und `expect` würde standardmäßig zur expect-webdriverio-Assertion, z.B.:

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

Angenommen, `expect` wurde global überschrieben, um Chai zu verwenden. Um expect-webdriverio-Assertions zu verwenden, müssen wir global eine Variable im "before"-Hook setzen, z.B.:

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

Jetzt können Chai und expect-webdriverio nebeneinander verwendet werden. In deinem Code würdest du Chai- und expect-webdriverio-Assertions wie folgt verwenden, z.B.:

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

Um zu migrieren, würdest du nach und nach jede Chai-Assertion zu expect-webdriverio umstellen. Sobald alle Chai-Assertions im gesamten Codebase ersetzt wurden, kann der "before"-Hook gelöscht werden. Eine globale Suche und Ersetzung aller Instanzen von `wdioExpect` durch `expect` wird dann die Migration abschließen.