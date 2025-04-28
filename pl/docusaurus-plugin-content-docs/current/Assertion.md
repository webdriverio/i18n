---
id: assertion
title: Asercje
---

[WDIO testrunner](https://webdriver.io/docs/clioptions) zawiera wbudowaną bibliotekę asercji, która umożliwia tworzenie mocnych asercji dotyczących różnych aspektów przeglądarki lub elementów w Twojej aplikacji (internetowej). Rozszerza ona funkcjonalność [Jests Matchers](https://jestjs.io/docs/en/using-matchers) o dodatkowe, zoptymalizowane pod kątem testów end-to-end dopasowania, np.:

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

lub

```js
const selectOptions = await $$('form select>option')

// upewnij się, że istnieje co najmniej jedna opcja wyboru
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

Pełną listę można znaleźć w [dokumentacji API expect](/docs/api/expect-webdriverio).

## Migracja z Chai

[Chai](https://www.chaijs.com/) i [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) mogą współistnieć, a dzięki niewielkim modyfikacjom można osiągnąć płynne przejście na expect-webdriverio. Jeśli zaktualizowałeś do WebdriverIO v6, to domyślnie będziesz mieć dostęp do wszystkich asercji z `expect-webdriverio` od razu. Oznacza to, że globalnie wszędzie tam, gdzie używasz `expect` będziesz wywoływać asercję `expect-webdriverio`. Dzieje się tak, chyba że ustawiłeś [`injectGlobals`](/docs/configuration#injectglobals) na `false` lub jawnie nadpisałeś globalny `expect`, aby używać Chai. W takim przypadku nie będziesz mieć dostępu do żadnych asercji expect-webdriverio bez jawnego importowania pakietu expect-webdriverio w miejscach, gdzie go potrzebujesz.

Ten przewodnik pokaże przykłady, jak przeprowadzić migrację z Chai, jeśli zostało ono nadpisane lokalnie, oraz jak przeprowadzić migrację z Chai, jeśli zostało ono nadpisane globalnie.

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

Aby migrować ten kod, usuń import Chai i użyj nowej metody asercji expect-webdriverio `toHaveUrl` zamiast tego:

```js
// myfile.js - kod po migracji
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // nowa metoda API expect-webdriverio https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

Jeśli chciałbyś używać zarówno Chai, jak i expect-webdriverio w tym samym pliku, zachowaj import Chai, a `expect` domyślnie będzie odwoływać się do asercji expect-webdriverio, np.:

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

Teraz Chai i expect-webdriverio mogą być używane obok siebie. W swoim kodzie użyłbyś asercji Chai i expect-webdriverio w następujący sposób, np.:

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

Aby wykonać migrację, powoli przenosiłbyś każdą asercję Chai na expect-webdriverio. Gdy wszystkie asercje Chai zostaną zastąpione w całej bazie kodu, hook "before" można usunąć. Globalne wyszukiwanie i zamiana wszystkich wystąpień `wdioExpect` na `expect` zakończy migrację.