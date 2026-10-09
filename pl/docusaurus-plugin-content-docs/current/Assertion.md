---
id: assertion
title: Asercje
description: "Pisz asercje dotyczące stanu przeglądarki i elementów za pomocą wbudowanej biblioteki expect-webdriverio, korzystaj z miękkich asercji i migruj z Chai."
---

[Testrunner WDIO](https://webdriver.io/docs/clioptions) zawiera wbudowaną bibliotekę asercji, która pozwala na tworzenie zaawansowanych asercji dotyczących różnych aspektów przeglądarki lub elementów w Twojej aplikacji (webowej). Rozszerza ona funkcjonalność [Matcherów Jest](https://jestjs.io/docs/en/using-matchers) o dodatkowe matchery zoptymalizowane pod kątem testów e2e, np.:

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

lub

```js
const selectOptions = await $$('form select>option')

// upewnij się, że w select jest co najmniej jedna opcja
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

Pełną listę znajdziesz w [dokumentacji API expect](/docs/api/expect-webdriverio).

:::info Jasmine

W przypadku frameworka Jasmine `expect` łączy matchery Jasmine i matchery WebdriverIO. Synchroniczne matchery Jasmine nie wymagają `await`, a części `expect` pochodzące z Jest, takie jak `expect.soft()`, nie są dostępne. Zobacz [Korzystanie z Jasmine](/docs/frameworks#assertions).

:::

## Miękkie asercje

WebdriverIO domyślnie zawiera miękkie asercje z `expect-webdriverio` (od wersji 5.2.0). Miękkie asercje pozwalają testom kontynuować wykonywanie nawet wtedy, gdy asercja się nie powiedzie. Wszystkie niepowodzenia są zbierane i raportowane na końcu testu.

### Użycie

```js
// Te asercje nie zgłoszą błędu natychmiast, jeśli się nie powiodą
await expect.soft(await $('h1').getText()).toEqual('Basketball Shoes');
await expect.soft(await $('#price').getText()).toMatch(/€\d+/);

// Zwykłe asercje nadal zgłaszają błąd natychmiast
await expect(await $('.add-to-cart').isClickable()).toBe(true);
```

## Migracja z Chai

[Chai](https://www.chaijs.com/) i [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) mogą współistnieć, a dzięki kilku drobnym zmianom można osiągnąć płynne przejście na expect-webdriverio. Jeśli zaktualizowałeś WebdriverIO do wersji v6, domyślnie będziesz mieć dostęp do wszystkich asercji z `expect-webdriverio` od razu. Oznacza to, że globalnie, wszędzie tam, gdzie używasz `expect`, wywołujesz asercję `expect-webdriverio`. Dzieje się tak, chyba że ustawisz [`injectGlobals`](/docs/configuration#injectglobals) na `false` lub jawnie nadpiszesz globalne `expect`, aby używało Chai. W takim przypadku nie będziesz mieć dostępu do żadnych asercji expect-webdriverio bez jawnego zaimportowania pakietu expect-webdriverio tam, gdzie go potrzebujesz.

Ten przewodnik pokaże przykłady migracji z Chai, jeśli zostało ono nadpisane lokalnie, oraz migracji z Chai, jeśli zostało nadpisane globalnie.

### Lokalnie

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

Jeśli chcesz używać zarówno Chai, jak i expect-webdriverio w tym samym pliku, zachowaj import Chai, a `expect` będzie domyślnie odnosić się do asercji expect-webdriverio, np.:

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

### Globalnie

Załóżmy, że `expect` zostało globalnie nadpisane, aby używać Chai. Aby korzystać z asercji expect-webdriverio, musimy globalnie ustawić zmienną w hooku "before", np.:

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

Aby przeprowadzić migrację, stopniowo przenosisz każdą asercję Chai na expect-webdriverio. Gdy wszystkie asercje Chai zostaną zastąpione w całej bazie kodu, hook "before" można usunąć. Globalne wyszukanie i zastąpienie wszystkich wystąpień `wdioExpect` na `expect` zakończy wtedy migrację.