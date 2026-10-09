---
id: assertion
title: Assertion
description: "Skriv assertions om webbläsarens och elementens tillstånd med det inbyggda biblioteket expect-webdriverio, använd soft assertions och migrera från Chai."
---

[WDIO-testrunnern](https://webdriver.io/docs/clioptions) levereras med ett inbyggt assertion-bibliotek som låter dig göra kraftfulla assertions om olika aspekter av webbläsaren eller element i din (webb)applikation. Det utökar funktionaliteten i [Jests Matchers](https://jestjs.io/docs/en/using-matchers) med ytterligare matchers optimerade för e2e-testning, t.ex.:

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

eller

```js
const selectOptions = await $$('form select>option')

// se till att det finns minst ett alternativ i select
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

För den fullständiga listan, se [expect API-dokumentationen](/docs/api/expect-webdriverio).

:::info Jasmine

Med Jasmine-ramverket kombinerar `expect` Jasmines matchers och WebdriverIO:s matchers. Jasmines synkrona matchers behöver inte `await`, och Jest-delarna av `expect`, såsom `expect.soft()`, är inte tillgängliga. Se [Använda Jasmine](/docs/frameworks#assertions).

:::

## Soft Assertions

WebdriverIO inkluderar soft assertions som standard från `expect-webdriverio` (sedan 5.2.0). Soft assertions gör att dina tester kan fortsätta köras även när en assertion misslyckas. Alla fel samlas in och rapporteras i slutet av testet.

### Användning

```js
// Dessa kastar inte ett fel direkt om de misslyckas
await expect.soft(await $('h1').getText()).toEqual('Basketball Shoes');
await expect.soft(await $('#price').getText()).toMatch(/€\d+/);

// Vanliga assertions kastar fortfarande fel direkt
await expect(await $('.add-to-cart').isClickable()).toBe(true);
```

## Migrera från Chai

[Chai](https://www.chaijs.com/) och [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) kan samexistera, och med några mindre justeringar kan en smidig övergång till expect-webdriverio uppnås. Om du har uppgraderat till WebdriverIO v6 har du som standard tillgång till alla assertions från `expect-webdriverio` direkt. Det innebär att var du än använder `expect` globalt anropar du en `expect-webdriverio`-assertion. Det gäller såvida du inte har satt [`injectGlobals`](/docs/configuration#injectglobals) till `false` eller uttryckligen har skrivit över den globala `expect` för att använda Chai. I så fall har du inte tillgång till några av expect-webdriverio-assertionerna utan att uttryckligen importera expect-webdriverio-paketet där du behöver det.

Den här guiden visar exempel på hur du migrerar från Chai om det har skrivits över lokalt och hur du migrerar från Chai om det har skrivits över globalt.

### Lokalt

Anta att Chai importerades uttryckligen i en fil, t.ex.:

```js
// myfile.js - ursprunglig kod
import { expect as expectChai } from 'chai'

describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        expectChai(await browser.getUrl()).to.include('/login')
    })
})
```

För att migrera den här koden tar du bort Chai-importen och använder den nya expect-webdriverio-assertionmetoden `toHaveUrl` istället:

```js
// myfile.js - migrerad kod
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // ny expect-webdriverio API-metod https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

Om du vill använda både Chai och expect-webdriverio i samma fil behåller du Chai-importen, och `expect` kommer som standard att vara expect-webdriverio-assertionen, t.ex.:

```js
// myfile.js
import { expect as expectChai } from 'chai'
import { expect as expectWDIO } from '@wdio/globals'

describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expectChai(isDisplayed).to.equal(true); // Chai-assertion
    })
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWDIO($("#element")).not.toBeDisplayed(); // expect-webdriverio-assertion
    })
})
```

### Globalt

Anta att `expect` har skrivits över globalt för att använda Chai. För att kunna använda expect-webdriverio-assertions behöver vi sätta en global variabel i "before"-hooken, t.ex.:

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

Nu kan Chai och expect-webdriverio användas sida vid sida. I din kod använder du Chai- och expect-webdriverio-assertions på följande sätt, t.ex.:

```js
// myfile.js
describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expect(isDisplayed).to.equal(true); // Chai-assertion
    });
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWdio($("#element")).not.toBeDisplayed(); // expect-webdriverio-assertion
    });
});
```

För att migrera flyttar du successivt över varje Chai-assertion till expect-webdriverio. När alla Chai-assertions har ersatts i hela kodbasen kan "before"-hooken tas bort. En global sök-och-ersätt som ersätter alla förekomster av `wdioExpect` med `expect` slutför sedan migreringen.