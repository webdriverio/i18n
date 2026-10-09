---
id: async-migration
title: Od synchronicznego do asynchronicznego
description: "Migruj testy WebdriverIO z synchronicznego do asynchronicznego wykonywania poleceń krok po kroku, włącznie z pętlami forEach, asercjami i synchronicznymi obiektami stron."
---

Z powodu zmian w V8 zespół WebdriverIO [ogłosił](https://webdriver.io/blog/2021/07/28/sync-api-deprecation) wycofanie synchronicznego wykonywania poleceń do kwietnia 2023 roku. Zespół ciężko pracował, aby przejście było jak najłatwiejsze. W tym przewodniku wyjaśniamy, jak stopniowo migrować zestaw testów z trybu synchronicznego do asynchronicznego. Jako przykładowy projekt używamy [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate), ale podejście jest takie samo we wszystkich innych projektach.

## Obietnice (Promises) w JavaScript

Synchroniczne wykonywanie było popularne w WebdriverIO, ponieważ eliminuje złożoność związaną z obsługą obietnic. Szczególnie jeśli pochodzisz z innych języków, w których ta koncepcja nie istnieje w takiej formie, na początku może to być mylące. Jednak obietnice (Promises) są bardzo potężnym narzędziem do obsługi kodu asynchronicznego, a współczesny JavaScript sprawia, że praca z nimi jest naprawdę łatwa. Jeśli nigdy nie pracowałeś z obietnicami, zalecamy zapoznanie się z [przewodnikiem MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), ponieważ ich wyjaśnienie wykraczałoby poza zakres tego dokumentu.

## Przejście na tryb asynchroniczny

Testrunner WebdriverIO potrafi obsługiwać wykonywanie asynchroniczne i synchroniczne w ramach tego samego zestawu testów. Oznacza to, że możesz stopniowo migrować swoje testy i obiekty stron (PageObjects) krok po kroku we własnym tempie. Na przykład Cucumber Boilerplate definiuje [duży zestaw definicji kroków](https://github.com/webdriverio/cucumber-boilerplate/tree/main/src/support/action), które możesz skopiować do swojego projektu. Możemy migrować jedną definicję kroku lub jeden plik naraz.

:::tip

WebdriverIO oferuje [codemod](https://github.com/webdriverio/codemod), który pozwala przekształcić kod synchroniczny w kod asynchroniczny niemal w pełni automatycznie. Najpierw uruchom codemod zgodnie z opisem w dokumentacji, a w razie potrzeby skorzystaj z tego przewodnika do ręcznej migracji.

:::

W wielu przypadkach wystarczy oznaczyć funkcję, w której wywołujesz polecenia WebdriverIO, jako `async` i dodać `await` przed każdym poleceniem. Patrząc na pierwszy plik do przekształcenia w projekcie boilerplate, `clearInputField.ts`, przekształcamy kod z:

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

To wszystko. Pełny commit ze wszystkimi przykładami przepisania możesz zobaczyć tutaj:

#### Commity:

- _przekształcenie wszystkich definicji kroków_ [[af6625f]](https://github.com/webdriverio/cucumber-boilerplate/pull/481/commits/af6625fcd01dc087479e84562f237ecf38b3537d)

:::info
To przejście jest niezależne od tego, czy używasz TypeScript, czy nie. Jeśli używasz TypeScript, upewnij się tylko, że ostatecznie zmienisz właściwość `types` w pliku `tsconfig.json` z `webdriverio/sync` na `@wdio/globals/types`. Upewnij się również, że docelowa wersja kompilacji jest ustawiona co najmniej na `ES2018`.
:::

## Przypadki szczególne

Oczywiście zawsze istnieją przypadki szczególne, na które trzeba zwrócić nieco większą uwagę.

### Pętle ForEach

Jeśli masz pętlę `forEach`, np. do iterowania po elementach, musisz upewnić się, że callback iteratora jest prawidłowo obsługiwany w sposób asynchroniczny, np.:

```js
const elems = $$('div')
elems.forEach((elem) => {
    elem.click()
})
```

Funkcja przekazywana do `forEach` jest funkcją iteratora. W świecie synchronicznym kliknęłaby wszystkie elementy, zanim przejdzie dalej. Jeśli przekształcimy to w kod asynchroniczny, musimy zapewnić, że czekamy na zakończenie wykonywania każdej funkcji iteratora. Po dodaniu `async`/`await` te funkcje iteratora będą zwracać obietnicę, którą musimy rozwiązać. W takiej sytuacji `forEach` nie jest już idealny do iterowania po elementach, ponieważ nie zwraca wyniku funkcji iteratora, czyli obietnicy, na którą musimy poczekać. Dlatego musimy zastąpić `forEach` metodą `map`, która zwraca tę obietnicę. Metoda `map`, podobnie jak wszystkie inne metody iteracyjne tablic, takie jak `find`, `every`, `reduce` i inne, są zaimplementowane tak, aby respektowały obietnice wewnątrz funkcji iteratora, dzięki czemu ich użycie w kontekście asynchronicznym jest uproszczone. Powyższy przykład po przekształceniu wygląda następująco:

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
 * zwraca:
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

Jeśli wydaje się to zbyt skomplikowane, możesz rozważyć użycie prostych pętli for, np.:

```js
const elems = await $$('div')
for (const elem of elems) {
    await elem.click()
}
```

`$$` zwraca [`ElementArray`](/docs/api/browser/$$). Możesz również iterować po niej przed oczekiwaniem na listę:

```js
for await (const elem of $$('div')) {
    await elem.click()
}
```

`for (const elem of $$('div'))` zgłasza błąd, dopóki lista nie zostanie rozwiązana, ponieważ pętla synchroniczna nie może czekać na zapytanie. Najpierw poczekaj na listę (`await`), jak w powyższym przykładzie, lub użyj `for await`.

### Asercje WebdriverIO

Jeśli używasz pomocnika asercji WebdriverIO [`expect-webdriverio`](https://webdriver.io/docs/api/expect-webdriverio), upewnij się, że przed każdym wywołaniem `expect` umieszczasz `await`, np.:

```ts
expect($('input')).toHaveAttribute('class', expect.stringContaining('form'))
```

należy przekształcić na:

```ts
await expect($('input')).toHaveAttribute('class', expect.stringContaining('form'))
```

### Synchroniczne metody PageObject i testy asynchroniczne

Jeśli pisałeś obiekty stron (PageObjects) w swoim zestawie testów w sposób synchroniczny, nie będziesz już mógł ich używać w testach asynchronicznych. Jeśli musisz używać metody PageObject zarówno w testach synchronicznych, jak i asynchronicznych, zalecamy zduplikowanie metody i udostępnienie jej dla obu środowisk, np.:

```js
class MyPageObject extends Page {
    /**
     * definiowanie elementów
     */
    get btnStart () { return $('button=Start') }
    get loadedPage () { return $('#finish') }

    someMethod () {
        // kod synchroniczny
    }

    someMethodAsync () {
        // asynchroniczna wersja MyPageObject.someMethod()
    }
}
```

Po zakończeniu migracji możesz usunąć synchroniczne metody PageObject i uporządkować nazewnictwo.

Jeśli nie chcesz utrzymywać dwóch różnych wersji metody PageObject, możesz również zmigrować cały PageObject do trybu asynchronicznego i użyć [`browser.call`](https://webdriver.io/docs/api/browser/call), aby wykonać metodę w środowisku synchronicznym, np.:

```js
// przed:
// MyPageObject.someMethod()
// po:
browser.call(() => MyPageObject.someMethod())
```

Polecenie `call` zapewni, że asynchroniczna metoda `someMethod` zostanie rozwiązana przed przejściem do następnego polecenia.

## Podsumowanie

Jak widać w [wynikowym PR z przepisanym kodem](https://github.com/webdriverio/cucumber-boilerplate/pull/481/files), złożoność tego przepisania jest dość niewielka. Pamiętaj, że możesz przepisywać jedną definicję kroku naraz. WebdriverIO doskonale radzi sobie z obsługą wykonywania synchronicznego i asynchronicznego w ramach jednego frameworka.