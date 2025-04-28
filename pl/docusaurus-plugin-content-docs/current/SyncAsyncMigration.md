---
id: async-migration
title: Z synchronicznego do asynchronicznego
---

Ze względu na zmiany w V8, zespół WebdriverIO [ogłosił](https://webdriver.io/blog/2021/07/28/sync-api-deprecation) wycofanie synchronicznego wykonywania poleceń do kwietnia 2023 roku. Zespół ciężko pracował, aby ułatwić przejście. W tym przewodniku wyjaśniamy, jak można stopniowo migrować zestaw testów z synchronicznego na asynchroniczny. Jako przykładowy projekt używamy [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate), ale podejście jest takie samo dla wszystkich innych projektów.

## Obietnice w JavaScript

Powodem, dla którego synchroniczne wykonywanie było popularne w WebdriverIO, jest to, że usuwa złożoność obsługi obietnic (promises). Szczególnie jeśli pochodzisz z innych języków, w których ta koncepcja nie istnieje w taki sposób, może to być początkowo mylące. Jednak obietnice są bardzo potężnym narzędziem do obsługi kodu asynchronicznego, a dzisiejszy JavaScript sprawia, że ich obsługa jest właściwie łatwa. Jeśli nigdy nie pracowałeś z obietnicami, zalecamy zapoznanie się z [przewodnikiem referencyjnym MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), ponieważ wyjaśnienie tego tutaj wykraczałoby poza zakres.

## Przejście na asynchroniczność

Testrunner WebdriverIO może obsługiwać asynchroniczne i synchroniczne wykonywanie w tym samym zestawie testów. Oznacza to, że możesz stopniowo migrować swoje testy i PageObjects krok po kroku w swoim tempie. Na przykład, Cucumber Boilerplate ma zdefiniowany [duży zestaw definicji kroków](https://github.com/webdriverio/cucumber-boilerplate/tree/main/src/support/action) do skopiowania do twojego projektu. Możemy przejść i migrować jedną definicję kroku lub jeden plik na raz.

:::tip

WebdriverIO oferuje [codemod](https://github.com/webdriverio/codemod), który pozwala przekształcić kod synchroniczny na asynchroniczny prawie w pełni automatycznie. Uruchom codemod zgodnie z opisem w dokumentacji i skorzystaj z tego przewodnika do ręcznej migracji, jeśli to konieczne.

:::

W wielu przypadkach wszystko, co trzeba zrobić, to dodać `async` do funkcji, w której wywołujesz polecenia WebdriverIO i dodać `await` przed każdym poleceniem. Patrząc na pierwszy plik `clearInputField.ts` do przekształcenia w projekcie boilerplate, transformujemy z:

```ts
export default (selector: Selector) => {
    $(selector).clearValue();
};
```

na:

```ts
export default async (selector: Selector) => {
    await $(selector).clearValue();
};
```

To wszystko. Możesz zobaczyć kompletny commit ze wszystkimi przykładami przepisania tutaj:

#### Commity:

- _transform all step definitions_ [[af6625f]](https://github.com/webdriverio/cucumber-boilerplate/pull/481/commits/af6625fcd01dc087479e84562f237ecf38b3537d)

:::info
Ta transformacja jest niezależna od tego, czy używasz TypeScript, czy nie. Jeśli używasz TypeScript, upewnij się, że ostatecznie zmienisz właściwość `types` w swoim pliku `tsconfig.json` z `webdriverio/sync` na `@wdio/globals/types`. Upewnij się również, że cel kompilacji jest ustawiony na co najmniej `ES2018`.
:::

## Szczególne przypadki

Oczywiście zawsze istnieją szczególne przypadki, na które trzeba zwrócić nieco więcej uwagi.

### Pętle ForEach

Jeśli masz pętlę `forEach`, np. do iteracji po elementach, musisz upewnić się, że funkcja zwrotna iteratora jest odpowiednio obsługiwana w sposób asynchroniczny, np.:

```js
const elems = $$('div')
elems.forEach((elem) => {
    elem.click()
})
```

Funkcja, którą przekazujemy do `forEach`, jest funkcją iteratora. W świecie synchronicznym kliknąłaby na wszystkie elementy, zanim przejdzie dalej. Jeśli przekształcimy to w kod asynchroniczny, musimy upewnić się, że czekamy na zakończenie wykonania każdej funkcji iteratora. Dodając `async`/`await`, te funkcje iteratora będą zwracać obietnicę, którą musimy rozwiązać. Teraz `forEach` nie jest już idealny do iteracji po elementach, ponieważ nie zwraca wyniku funkcji iteratora, obietnicy, na którą musimy czekać. Dlatego musimy zastąpić `forEach` przez `map`, który zwraca tę obietnicę. Metoda `map`, jak również wszystkie inne metody iteracyjne tablic, takie jak `find`, `every`, `reduce` i inne, są zaimplementowane tak, że respektują obietnice w funkcjach iteracyjnych i są przez to uproszczone do używania w kontekście asynchronicznym. Powyższy przykład po przekształceniu wygląda tak:

```js
const elems = await $$('div')
await elems.forEach((elem) => {
    return elem.click()
})
```

Na przykład, aby pobrać wszystkie elementy `<h3 />` i uzyskać ich zawartość tekstową, możesz uruchomić:

```js
await browser.url('https://webdriver.io')

const h3Texts = await browser.$$('h3').map((img) => img.getText())
console.log(h3Texts);
/**
 * returns:
 * [
 *   'Extendable',
 *   'Compatible',
 *   'Feature Rich',
 *   'Who is using WebdriverIO?',
 *   'Support for Modern Web and Mobile Frameworks',
 *   'Google Lighthouse Integration',
 *   'Watch Talks about WebdriverIO',
 *   'Get Started With WebdriverIO within Minutes'
 * ]
 */
```

Jeśli to wygląda zbyt skomplikowanie, możesz rozważyć użycie prostych pętli for, np.:

```js
const elems = await $$('div')
for (const elem of elems) {
    await elem.click()
}
```

### Asercje WebdriverIO

Jeśli używasz pomocnika asercji WebdriverIO [`expect-webdriverio`](https://webdriver.io/docs/api/expect-webdriverio), upewnij się, że umieszczasz `await` przed każdym wywołaniem `expect`, np.:

```ts
expect($('input')).toHaveAttributeContaining('class', 'form')
```

musi zostać przekształcone na:

```ts
await expect($('input')).toHaveAttributeContaining('class', 'form')
```

### Synchroniczne metody PageObject i asynchroniczne testy

Jeśli pisałeś PageObjects w swoim zestawie testów w sposób synchroniczny, nie będziesz mógł już używać ich w testach asynchronicznych. Jeśli potrzebujesz używać metody PageObject zarówno w synchronicznych jak i asynchronicznych testach, zalecamy duplikowanie metody i oferowanie ich dla obu środowisk, np.:

```js
class MyPageObject extends Page {
    /**
     * define elements
     */
    get btnStart () { return $('button=Start') }
    get loadedPage () { return $('#finish') }

    someMethod () {
        // sync code
    }

    someMethodAsync () {
        // async version of MyPageObject.someMethod()
    }
}
```

Po zakończeniu migracji możesz usunąć synchroniczne metody PageObject i uporządkować nazewnictwo.

Jeśli nie chcesz utrzymywać dwóch różnych wersji metody PageObject, możesz również zmigrować cały PageObject na asynchroniczny i użyć [`browser.call`](https://webdriver.io/docs/api/browser/call) do wykonania metody w środowisku synchronicznym, np.:

```js
// before:
// MyPageObject.someMethod()
// after:
browser.call(() => MyPageObject.someMethod())
```

Polecenie `call` zapewni, że asynchroniczna metoda `someMethod` zostanie rozwiązana przed przejściem do następnego polecenia.

## Podsumowanie

Jak widać w [wynikowym PR z przepisania](https://github.com/webdriverio/cucumber-boilerplate/pull/481/files), złożoność tego przepisania jest dość prosta. Pamiętaj, że możesz przepisać jedną definicję kroku na raz. WebdriverIO jest doskonale w stanie obsługiwać synchroniczne i asynchroniczne wykonanie w jednym frameworku.