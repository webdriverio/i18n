---
id: assertion
title: Assertion
---

Der [WDIO Testrunner](https://webdriver.io/docs/clioptions) kommt mit einer eingebauten Assertion-Bibliothek, die es Ihnen ermöglicht, leistungsstarke Behauptungen über verschiedene Aspekte des Browsers oder Elemente innerhalb Ihrer (Web-)Anwendung aufzustellen. Es erweitert die Funktionalität von [Jests Matchers](https://jestjs.io/docs/en/using-matchers) mit zusätzlichen, für E2E-Tests optimierten Matchern, z.B.:

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

Die vollständige Liste finden Sie in der [expect API-Dokumentation](/docs/api/expect-webdriverio).

## Migration von Chai

[Chai](https://www.chaijs.com/) und [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) können koexistieren, und mit einigen kleinen Anpassungen kann ein reibungsloser Übergang zu expect-webdriverio erreicht werden. Wenn Sie auf WebdriverIO v6 aktualisiert haben, haben Sie standardmäßig Zugriff auf alle Assertions von `expect-webdriverio` direkt aus der Box. Das bedeutet, dass überall, wo Sie global `expect` verwenden, eine `expect-webdriverio`-Assertion aufgerufen wird. Es sei denn, Sie haben [`injectGlobals`](/docs/configuration#injectglobals) auf `false` gesetzt oder das globale `expect` explizit überschrieben, um Chai zu verwenden. In diesem Fall hätten Sie keinen Zugriff auf die expect-webdriverio-Assertions, ohne das expect-webdriverio-Paket explizit dort zu importieren, wo Sie es benötigen.

Diese Anleitung zeigt Beispiele, wie man von Chai migriert, wenn es lokal überschrieben wurde, und wie man von Chai migriert, wenn es global überschrieben wurde.

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

Um diesen Code zu migrieren, entfernen Sie den Chai-Import und verwenden Sie stattdessen die neue expect-webdriverio-Assertionsmethode `toHaveUrl`:

```js
// myfile.js - migrated code
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // new expect-webdriverio API method https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

Wenn Sie sowohl Chai als auch expect-webdriverio in derselben Datei verwenden möchten, würden Sie den Chai-Import beibehalten und `expect` würde standardmäßig auf die expect-webdriverio-Assertion verweisen, z.B.:

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

Angenommen, `expect` wurde global überschrieben, um Chai zu verwenden. Um expect-webdriverio-Assertions zu verwenden, müssen wir im "before"-Hook eine globale Variable setzen, z.B.:

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

Jetzt können Chai und expect-webdriverio nebeneinander verwendet werden. In Ihrem Code würden Sie Chai- und expect-webdriverio-Assertions wie folgt verwenden, z.B.:

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

Für die Migration würden Sie nach und nach jede Chai-Assertion zu expect-webdriverio umstellen. Sobald alle Chai-Assertions in der gesamten Codebasis ersetzt wurden, kann der "before"-Hook gelöscht werden. Eine globale Suchen-und-Ersetzen-Funktion, um alle Instanzen von `wdioExpect` durch `expect` zu ersetzen, wird dann die Migration abschließen.