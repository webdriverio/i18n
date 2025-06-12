---
id: assertion
title: Påstående
---

[WDIO testrunner](https://webdriver.io/docs/clioptions) kommer med ett inbyggt påståendebibliotek som låter dig göra kraftfulla påståenden om olika aspekter av webbläsaren eller element inom din (webb) applikation. Det utökar [Jests Matchers](https://jestjs.io/docs/en/using-matchers) funktionalitet med ytterligare, för e2e-testning optimerade, matchers, t.ex.:

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

eller

```js
const selectOptions = await $$('form select>option')

// make sure there is at least one option in select
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

För hela listan, se [expect API-dokumentationen](/docs/api/expect-webdriverio).

## Mjuka påståenden

WebdriverIO inkluderar mjuka påståenden som standard från expect-webdriver(5.2.0). Mjuka påståenden tillåter dina tester att fortsätta köras även när ett påstående misslyckas. Alla misslyckanden samlas in och rapporteras i slutet av testet.

### Användning

```js
// These won't throw immediately if they fail
await expect.soft(await $('h1').getText()).toEqual('Basketball Shoes');
await expect.soft(await $('#price').getText()).toMatch(/€\d+/);

// Regular assertions still throw immediately
await expect(await $('.add-to-cart').isClickable()).toBe(true);
```

## Migrering från Chai

[Chai](https://www.chaijs.com/) och [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) kan samexistera, och med några mindre justeringar kan en smidig övergång till expect-webdriverio uppnås. Om du har uppgraderat till WebdriverIO v6 har du som standard tillgång till alla påståenden från `expect-webdriverio` direkt. Detta innebär att globalt där du använder `expect` skulle du anropa ett `expect-webdriverio`-påstående. Detta gäller såvida du inte ställer in [`injectGlobals`](/docs/configuration#injectglobals) till `false` eller uttryckligen har åsidosatt den globala `expect` för att använda Chai. I detta fall skulle du inte ha tillgång till några av expect-webdriverio-påståendena utan att uttryckligen importera expect-webdriverio-paketet där du behöver det.

Denna guide visar exempel på hur man migrerar från Chai om det har åsidosatts lokalt och hur man migrerar från Chai om det har åsidosatts globalt.

### Lokalt

Anta att Chai importerades uttryckligen i en fil, t.ex.:

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

För att migrera denna kod, ta bort Chai-importen och använd den nya expect-webdriverio påståendemetoden `toHaveUrl` istället:

```js
// myfile.js - migrated code
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // new expect-webdriverio API method https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

Om du ville använda både Chai och expect-webdriverio i samma fil skulle du behålla Chai-importen och `expect` skulle som standard använda expect-webdriverio-påståendet, t.ex.:

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

### Globalt

Anta att `expect` globalt åsidosattes för att använda Chai. För att använda expect-webdriverio-påståenden måste vi globalt ställa in en variabel i "before"-kroken, t.ex.:

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

Nu kan Chai och expect-webdriverio användas tillsammans. I din kod skulle du använda Chai och expect-webdriverio-påståenden enligt följande, t.ex.:

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

För att migrera skulle du långsamt flytta varje Chai-påstående över till expect-webdriverio. När alla Chai-påståenden har ersatts i hela kodbasen kan "before"-kroken tas bort. En global sök och ersätt för att ersätta alla instanser av `wdioExpect` med `expect` kommer sedan att avsluta migreringen.