---
id: assertion
title: Asercja
---

[Testrunner WDIO](https://webdriver.io/docs/clioptions) zawiera wbudowaną bibliotekę asercji, która pozwala tworzyć potężne asercje dotyczące różnych aspektów przeglądarki lub elementów w Twojej aplikacji (webowej). Rozszerza ona funkcjonalność [Jests Matchers](https://jestjs.io/docs/en/using-matchers) o dodatkowe, zoptymalizowane dla testów e2e, dopasowania, np.:

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

lub

```js
const selectOptions = await $$('form select>option')

// upewnij się, że jest co najmniej jedna opcja w selekcie
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

Pełną listę znajdziesz w [dokumentacji API expect](/docs/api/expect-webdriverio).

## Miękkie asercje

WebdriverIO domyślnie zawiera miękkie asercje z expect-webdriver(5.2.0). Miękkie asercje pozwalają testom kontynuować działanie nawet gdy asercja nie powiedzie się. Wszystkie niepowodzenia są zbierane i raportowane na końcu testu.

### Użycie

```js
// Te nie wyrzucą błędu natychmiast jeśli się nie powiodą
await expect.soft(await $('h1').getText()).toEqual('Basketball Shoes');
await expect.soft(await $('#price').getText()).toMatch(/€\d+/);

// Zwykłe asercje nadal wyrzucają błąd natychmiast
await expect(await $('.add-to-cart').isClickable()).toBe(true);
```

## Migracja z Chai

[Chai](https://www.chaijs.com/) i [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) mogą współistnieć, a przy niewielkich korektach można osiągnąć płynne przejście na expect-webdriverio. Jeśli zaktualizowałeś do WebdriverIO v6, to domyślnie będziesz mieć dostęp do wszystkich asercji z `expect-webdriverio` od razu. Oznacza to, że globalnie wszędzie tam, gdzie używasz `expect`, wywołasz asercję `expect-webdriverio`. Chyba że ustawiłeś [`injectGlobals`](/docs/configuration#injectglobals) na `false` lub wyraźnie nadpisałeś globalne `expect`, aby używać Chai. W takim przypadku nie miałbyś dostępu do żadnych asercji expect-webdriverio bez jawnego importowania pakietu expect-webdriverio tam, gdzie go potrzebujesz.

Ten przewodnik pokaże przykłady, jak migrować z Chai, jeśli zostało ono nadpisane lokalnie, i jak migrować z Chai, jeśli zostało nadpisane globalnie.

### Lokalne

Załóżmy, że Chai zostało jawnie zaimportowane w pliku, np.:

```js
// myfile.js - oryginalny kod
import { expect as expectChai } from 'chai'

describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        expectChai(await browser.getUrl()).to.include('/login')
    })
})
```

Aby zmigrować ten kod, usuń import Chai i zamiast tego użyj nowej metody asercji expect-webdriverio `toHaveUrl`:

```js
// myfile.js - zmigrowany kod
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // nowa metoda API expect-webdriverio https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

Jeśli chciałbyś używać zarówno Chai, jak i expect-webdriverio w tym samym pliku, zachowałbyś import Chai, a `expect` domyślnie korzystałby z asercji expect-webdriverio, np.:

```js
// myfile.js
import { expect as expectChai } from 'chai'
import { expect as expectWDIO } from '@wdio/globals'

describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expectChai(isDisplayed).to.equal(true); // asercja Chai
    })
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWDIO($("#element")).not.toBeDisplayed(); // asercja expect-webdriverio
    })
})
```

### Globalne

Załóżmy, że `expect` zostało globalnie nadpisane, aby używać Chai. Aby używać asercji expect-webdriverio, musimy globalnie ustawić zmienną w hooku "before", np.:

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

Teraz Chai i expect-webdriverio mogą być używane obok siebie. W swoim kodzie używałbyś asercji Chai i expect-webdriverio w następujący sposób, np.:

```js
// myfile.js
describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expect(isDisplayed).to.equal(true); // asercja Chai
    });
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWdio($("#element")).not.toBeDisplayed(); // asercja expect-webdriverio
    });
});
```

Aby przeprowadzić migrację, należy stopniowo przenosić każdą asercję Chai do expect-webdriverio. Po zastąpieniu wszystkich asercji Chai w całej bazie kodu, hook "before" można usunąć. Globalne wyszukiwanie i zastąpienie wszystkich wystąpień `wdioExpect` na `expect` zakończy migrację.