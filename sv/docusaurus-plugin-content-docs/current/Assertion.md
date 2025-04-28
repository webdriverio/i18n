---
id: assertion
title: Bekräftelse
---

[WDIO testrunner](https://webdriver.io/docs/clioptions) kommer med ett inbyggt bekräftelsebibliotek som låter dig göra kraftfulla bekräftelser på olika aspekter av webbläsaren eller element i din (webb)applikation. Det utökar [Jests Matchers](https://jestjs.io/docs/en/using-matchers) funktionalitet med ytterligare matchare som är optimerade för e2e-testning, t.ex.:

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

För den fullständiga listan, se [expect API-dokumentationen](/docs/api/expect-webdriverio).

## Migrering från Chai

[Chai](https://www.chaijs.com/) och [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) kan samexistera, och med några mindre justeringar kan en smidig övergång till expect-webdriverio uppnås. Om du har uppgraderat till WebdriverIO v6 kommer du som standard att ha tillgång till alla bekräftelser från `expect-webdriverio` direkt. Detta innebär att globalt var du än använder `expect` skulle du anropa en `expect-webdriverio`-bekräftelse. Det vill säga, såvida du inte ställer in [`injectGlobals`](/docs/configuration#injectglobals) till `false` eller uttryckligen har åsidosatt det globala `expect` för att använda Chai. I detta fall skulle du inte ha tillgång till några av expect-webdriverio-bekräftelserna utan att uttryckligen importera expect-webdriverio-paketet där du behöver det.

Denna guide visar exempel på hur man migrerar från Chai om det har åsidosatts lokalt och hur man migrerar från Chai om det har åsidosatts globalt.

### Lokalt

Anta att Chai importerades explicit i en fil, t.ex.:

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

För att migrera denna kod, ta bort Chai-importen och använd den nya expect-webdriverio-bekräftelsemetoden `toHaveUrl` istället:

```js
// myfile.js - migrated code
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // new expect-webdriverio API method https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

Om du vill använda både Chai och expect-webdriverio i samma fil skulle du behålla Chai-importen och `expect` skulle som standard använda expect-webdriverio-bekräftelsen, t.ex.:

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

Anta att `expect` globalt åsidosattes för att använda Chai. För att använda expect-webdriverio-bekräftelser behöver vi globalt ställa in en variabel i "before"-hooken, t.ex.:

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

Nu kan Chai och expect-webdriverio användas tillsammans. I din kod skulle du använda Chai och expect-webdriverio-bekräftelser enligt följande, t.ex.:

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

För att migrera skulle du långsamt flytta över varje Chai-bekräftelse till expect-webdriverio. När alla Chai-bekräftelser har ersatts i hela kodbasen kan "before"-hooken tas bort. En global sökning och ersättning för att ersätta alla instanser av `wdioExpect` till `expect` kommer då att avsluta migreringen.