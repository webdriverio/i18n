---
id: expect-webdriverio
title: Expect 
custom_edit_url: https://github.com/webdriverio/expect-webdriverio/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


Podczas pisania testów często musisz sprawdzać, czy wartości spełniają określone warunki. `expect` daje ci dostęp do wielu "dopasowań" (matchers), które pozwalają na sprawdzanie różnych rzeczy na obiektach `browser`, `element` lub `mock`.

## Domyślne opcje

Poniższe domyślne opcje są powiązane z opcjami [`waitforTimeout`](https://webdriver.io/docs/options#waitfortimeout) i [`waitforInterval`](https://webdriver.io/docs/options#waitforinterval) ustawionymi w konfiguracji.

Ustaw poniższe opcje tylko wtedy, gdy chcesz czekać określony czas dla swoich asercji.

```js
{
    wait: 2000, // ms do czekania na spełnienie oczekiwania
    interval: 100, // interwał między próbami
}
```

Jeśli chcesz wybrać inne czasy oczekiwania i interwały, ustaw te opcje w następujący sposób:

```js
// wdio.conf.js
import { setOptions } from 'expect-webdriverio'

export const config = {
    // ...
    before () {
        setOptions({ wait: 5000 })
    },
    // ...
}
```

### Opcje dopasowań

Każde dopasowanie może przyjmować kilka opcji, które pozwalają na modyfikację asercji:

##### Opcje komend

| Nazwa | Typ | Szczegóły |
| ---- | ---- | ------- |
| <code><var>wait</var></code> | number | czas w ms do czekania na spełnienie oczekiwania. Domyślnie: `3000` |
| <code><var>interval</var></code> | number | interwał między próbami. Domyślnie: `100` |
| <code><var>beforeAssertion</var></code> | function | funkcja wywoływana przed wykonaniem asercji |
| <code><var>afterAssertion</var></code> | function | funkcja wywoływana po wykonaniu asercji, zawierająca wyniki asercji |
| <code><var>message</var></code> | string | wiadomość użytkownika dodawana przed błędem asercji |

##### Opcje ciągów znaków

Opcje te mogą być stosowane dodatkowo do opcji komend podczas sprawdzania ciągów znaków. 

| Nazwa | Typ | Szczegóły |
| ---- | ---- | ------- |
| <code><var>ignoreCase</var></code> | boolean | zastosuj `toLowerCase` zarówno do wartości rzeczywistych, jak i oczekiwanych |
| <code><var>trim</var></code> | boolean | zastosuj `trim` do wartości rzeczywistej |
| <code><var>replace</var></code> | Replacer \| Replacer[] | zamień części wartości rzeczywistej, które pasują do ciągu znaków/RegExp. Zamiennikiem może być ciąg znaków lub funkcja.
| <code><var>containing</var></code> | boolean | oczekuj, że wartość rzeczywista zawiera wartość oczekiwaną, w przeciwnym razie — ścisła równość. |
| <code><var>asString</var></code> | boolean | może być pomocne do wymuszenia konwersji wartości właściwości na ciąg znaków |
| <code><var>atStart</var></code> | boolean | oczekuj, że wartość rzeczywista rozpoczyna się od wartości oczekiwanej |
| <code><var>atEnd</var></code> | boolean | oczekuj, że wartość rzeczywista kończy się wartością oczekiwaną |
| <code><var>atIndex</var></code> | number | oczekuj, że wartość rzeczywista ma wartość oczekiwaną pod danym indeksem |

##### Opcje liczbowe

Opcje te mogą być stosowane dodatkowo do opcji komend podczas sprawdzania liczb.

| Nazwa | Typ | Szczegóły |
| ---- | ---- | ------- |
| <code><var>eq</var></code> | number | równa się |
| <code><var>lte</var></code> | number | mniejsza lub równa |
| <code><var>gte</var></code> | number | większa lub równa |

### Obsługa encji HTML

Encja HTML to fragment tekstu ("ciąg znaków"), który zaczyna się od znaku ampersand (`&`) i kończy średnikiem (`;`). Encje są często używane do wyświetlania znaków zastrzeżonych (które w przeciwnym razie byłyby interpretowane jako kod HTML) oraz niewidocznych znaków (jak niełamliwe spacje, np. `&nbsp;`).

Aby znaleźć lub wejść w interakcję z takim elementem, użyj odpowiednika Unicode dla encji, np.:

```html
<div data="Some&nbsp;Value">Some&nbsp;Text</div>
```

```js
const myElem = await $('div[data="Some\u00a0Value"]')
await expect(myElem).toHaveAttribute('data', 'div[Some\u00a0Value')
await expect(myElem).toHaveText('Some\u00a0Text')
```

Wszystkie odniesienia do znaków Unicode można znaleźć w [specyfikacji HTML](https://html.spec.whatwg.org/multipage/named-characters.html#named-character-references).

**Uwaga:** Unicode jest niewrażliwy na wielkość liter, więc zarówno `\u00a0`, jak i `\u00A0` działają. Aby znaleźć element w przeglądarce, usuń `u` z kodu Unicode, np.: `div[data="Some\00a0Value"]`

## Dopasowania dla przeglądarki

### toHaveUrl

Sprawdza, czy przeglądarka jest na określonej stronie.

##### Użycie

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveUrl('https://webdriver.io')
```

##### Użycie

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveUrl(expect.stringContaining('webdriver'))
```

### toHaveTitle

Sprawdza, czy strona ma określony tytuł.

##### Użycie

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js')
await expect(browser).toHaveTitle(expect.stringContaining('WebdriverIO'))
```

### toHaveClipboardText

Sprawdza, czy przeglądarka ma określony tekst zapisany w schowku.

##### Użycie

```js
import { Key } from 'webdriverio'

await browser.keys([Key.Ctrl, 'a'])
await browser.keys([Key.Ctrl, 'c'])
await expect(browser).toHaveClipboardText('some clipboard text')
await expect(browser).toHaveClipboardText(expect.stringContaining('clipboard text'))
```

## Dopasowania dla elementów

### toBeDisplayed

Wywołuje [`isDisplayed`](https://webdriver.io/docs/api/element/isDisplayed/) na danym elemencie.

##### Użycie

```js
const elem = await $('#someElem')
await expect(elem).toBeDisplayed()
```

### toExist

Wywołuje [`isExisting`](https://webdriver.io/docs/api/element/isExisting) na danym elemencie.

##### Użycie

```js
const elem = await $('#someElem')
await expect(elem).toExist()
```

### toBePresent

To samo co `toExist`.

##### Użycie

```js
const elem = await $('#someElem')
await expect(elem).toBePresent()
```

### toBeExisting

To samo co `toExist`.

##### Użycie

```js
const elem = await $('#someElem')
await expect(elem).toBeExisting()
```

### toBeFocused

Sprawdza, czy element ma fokus. Ta asercja działa tylko w kontekście strony internetowej.

##### Użycie

```js
const elem = await $('#someElem')
await expect(elem).toBeFocused()
```

### toHaveAttribute

Sprawdza, czy element ma określony atrybut z konkretną wartością.

##### Użycie

```js
const myInput = await $('input')
await expect(myInput).toHaveAttribute('class', 'form-control')
await expect(myInput).toHaveAttribute('class', expect.stringContaining('control'))
```

### toHaveAttr

To samo co `toHaveAttribute`.

##### Użycie

```js
const myInput = await $('input')
await expect(myInput).toHaveAttr('class', 'form-control')
await expect(myInput).toHaveAttr('class', expect.stringContaining('control'))
```

### toHaveElementClass

Sprawdza, czy element ma pojedynczą nazwę klasy. Może być również wywołany z tablicą jako parametrem, gdy element może mieć wiele nazw klas.

##### Użycie

```js
const myInput = await $('input')
await expect(myInput).toHaveElementClass('form-control', { message: 'Not a form control!' })
await expect(myInput).toHaveElementClass(['form-control' , 'w-full'], { message: 'not full width' })
await expect(myInput).toHaveElementClass(expect.stringContaining('form'), { message: 'Not a form control!' })
```

### toHaveElementProperty

Sprawdza, czy element ma określoną właściwość.

##### Użycie

```js
const elem = await $('#elem')
await expect(elem).toHaveElementProperty('height', 23)
await expect(elem).not.toHaveElementProperty('height', 0)
```

### toHaveValue

Sprawdza, czy element wejściowy ma określoną wartość.

##### Użycie

```js
const myInput = await $('input')
await expect(myInput).toHaveValue('admin-user', { ignoreCase: true })
await expect(myInput).toHaveValue(expect.stringContaining('user'), { ignoreCase: true })
```

### toBeClickable

Sprawdza, czy element może zostać kliknięty, wywołując na nim [`isClickable`](https://webdriver.io/docs/api/element/isClickable).

##### Użycie

```js
const elem = await $('#elem')
await expect(elem).toBeClickable()
```

### toBeDisabled

Sprawdza, czy element jest wyłączony, wywołując na nim [`isEnabled`](https://webdriver.io/docs/api/element/isEnabled).

##### Użycie

```js
const elem = await $('#elem')
await expect(elem).toBeDisabled()
// to samo co
await expect(elem).not.toBeEnabled()
```

### toBeEnabled

Sprawdza, czy element jest włączony, wywołując na nim [`isEnabled`](https://webdriver.io/docs/api/element/isEnabled).

##### Użycie

```js
const elem = await $('#elem')
await expect(elem).toBeEnabled()
// to samo co
await expect(elem).not.toBeDisabled()
```

### toBeSelected

Sprawdza, czy element jest wybrany, wywołując na nim [`isSelected`](https://webdriver.io/docs/api/element/isSelected).

##### Użycie

```js
const elem = await $('#elem')
await expect(elem).toBeSelected()
```

### toBeChecked

To samo co `toBeSelected`.

##### Użycie

```js
const elem = await $('#elem')
await expect(elem).toBeChecked()
```

### toHaveComputedLabel

Sprawdza, czy element ma określoną obliczoną etykietę WAI-ARIA. Może być również wywołany z tablicą jako parametrem w przypadku, gdy element może mieć różne etykiety.

##### Użycie

```js
await browser.url('https://webdriver.io/')
const elem = await $('a[href="https://github.com/webdriverio/webdriverio"]')
await expect(elem).toHaveComputedLabel('GitHub repository')
await expect(elem).toHaveComputedLabel(expect.stringContaining('repository'))
```

##### Użycie

```js
await browser.url('https://webdriver.io/')
const elem = await $('a[href="https://github.com/webdriverio/webdriverio"]')
await expect(elem).toHaveComputedLabel(['GitHub repository', 'Private repository'])
await expect(elem).toHaveComputedLabel([expect.stringContaining('GitHub'), expect.stringContaining('Private')])
```

### toHaveComputedRole

Sprawdza, czy element ma określoną obliczoną rolę WAI-ARIA. Może być również wywołany z tablicą jako parametrem w przypadku, gdy element może mieć różne etykiety.

##### Użycie

```js
await browser.url('https://webdriver.io/')
const elem = await $('[aria-label="Skip to main content"]')
await expect(elem).toHaveComputedRole('region')
await expect(elem).toHaveComputedRole(expect.stringContaining('ion'))
```

##### Użycie

```js
await browser.url('https://webdriver.io/')
const elem = await $('[aria-label="Skip to main content"]')
await expect(elem).toHaveComputedRole(['region', 'section'])
await expect(elem).toHaveComputedRole([expect.stringContaining('reg'), expect.stringContaining('sec')])
```

### toHaveHref

Sprawdza, czy element typu link ma określony cel linku.

##### Użycie

```js
const link = await $('a')
await expect(link).toHaveHref('https://webdriver.io')
await expect(link).toHaveHref(expect.stringContaining('webdriver.io'))
```

### toHaveLink

To samo co `toHaveHref`.

##### Użycie

```js
const link = await $('a')
await expect(link).toHaveLink('https://webdriver.io')
await expect(link).toHaveLink(expect.stringContaining('webdriver.io'))
```

### toHaveId

Sprawdza, czy element ma określony atrybut `id`.

##### Użycie

```js
const elem = await $('#elem')
await expect(elem).toHaveId('elem')
```

### toHaveText

Sprawdza, czy element ma określony tekst. Może być również wywołany z tablicą jako parametrem w przypadku, gdy element może mieć różne teksty.

##### Użycie

```js
await browser.url('https://webdriver.io/')
const elem = await $('.container')
await expect(elem).toHaveText('Next-gen browser and mobile automation test framework for Node.js')
await expect(elem).toHaveText(expect.stringContaining('test framework for Node.js'))
await expect(elem).toHaveText(['Next-gen browser and mobile automation test framework for Node.js', 'Get Started'])
await expect(elem).toHaveText([expect.stringContaining('test framework for Node.js'), expect.stringContaining('Started')])
```

W przypadku, gdy w div znajduje się lista elementów:

```
<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul>
```

Możesz sprawdzić je za pomocą tablicy:

```js
const elem = await $$('ul > li')
await expect(elem).toHaveText(['Coffee', 'Tea', 'Milk'])
```

### toHaveHTML

Sprawdza, czy element ma określony tekst. Może być również wywołany z tablicą jako parametrem w przypadku, gdy element może mieć różne teksty.

##### Użycie

```js
await browser.url('https://webdriver.io/')
const elem = await $('.hero__subtitle')
await expect(elem).toHaveHTML('<p class="hero__subtitle">Next-gen browser and mobile automation test framework for Node.js</p>')
await expect(elem).toHaveHTML(expect.stringContaining('Next-gen browser and mobile automation test framework for Node.js'))
await expect(elem).toHaveHTML('Next-gen browser and mobile automation test framework for Node.js', { includeSelectorTag: false })
```

##### Użycie

```js
await browser.url('https://webdriver.io/')
const elem = await $('.hero__subtitle')
await expect(elem).toHaveHTML(['Next-gen browser and mobile automation test framework for Node.js', 'Get Started'], { includeSelectorTag: false })
await expect(elem).toHaveHTML([expect.stringContaining('automation test framework for Node.js'), expect.stringContaining('Started')], { includeSelectorTag: false })
```

### toBeDisplayedInViewport

Sprawdza, czy element znajduje się w obszarze widocznym, wywołując na nim [`isDisplayedInViewport`](https://webdriver.io/docs/api/element/isDisplayedInViewport).

##### Użycie

```js
const elem = await $('#elem')
await expect(elem).toBeDisplayedInViewport()
```

### toHaveChildren

Sprawdza liczbę dzieci pobranego elementu poprzez wywołanie komendy `element.$('./*')`.

##### Użycie

```js
const list = await $('ul')
await expect(list).toHaveChildren() // lista ma co najmniej jeden element
// to samo co
await expect(list).toHaveChildren({ gte: 1 })

await expect(list).toHaveChildren(3) // lista ma 3 elementy
// to samo co 
await expect(list).toHaveChildren({ eq: 3 })
```

### toHaveWidth

Sprawdza, czy element ma określoną szerokość.

##### Użycie

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveWidth(32)
```

### toHaveHeight

Sprawdza, czy element ma określoną wysokość.

##### Użycie

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveHeight(32)
```

### toHaveSize

Sprawdza, czy element ma określony rozmiar.

##### Użycie

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveSize({ width: 32, height: 32 })
```

### toBeElementsArrayOfSize

Sprawdza liczbę pobranych elementów za pomocą komendy [`$$`](https://webdriver.io/docs/api/element/$).

**Uwaga:** To dopasowanie zaktualizuje przekazaną tablicę najnowszymi elementami, jeśli asercja się powiedzie. Jednak jeśli przypisałeś zmienną ponownie, musisz pobrać elementy ponownie.

##### Użycie

```js
const listItems = await $$('ul>li')
await expect(listItems).toBeElementsArrayOfSize(5) // 5 elementów na liście

await expect(listItems).toBeElementsArrayOfSize({ lte: 10 })
// to samo co
assert.ok(listItems.length <= 10)
```

## Dopasowania sieciowe

### toBeRequested

Sprawdza, czy atrapa (mock) została wywołana

##### Użycie

```js
const mock = browser.mock('**/api/todo*')
await expect(mock).toBeRequested()
```

### toBeRequestedTimes

Sprawdza, czy atrapa (mock) została wywołana oczekiwaną liczbę razy

##### Użycie

```js
const mock = browser.mock('**/api/todo*')
await expect(mock).toBeRequestedTimes(2) // await expect(mock).toBeRequestedTimes({ eq: 2 })

await expect(mock).toBeRequestedTimes({ gte: 5, lte: 10 }) // żądanie wywołane co najmniej 5 razy, ale mniej niż 11
```

### toBeRequestedWith

Sprawdza, czy atrapa (mock) została wywołana zgodnie z oczekiwanymi opcjami.

Większość opcji obsługuje częściowe dopasowania expect/jasmine, takie jak [expect.objectContaining](https://jestjs.io/docs/en/expect#expectobjectcontainingobject)

##### Użycie

```js
const mock = browser.mock('**/api/todo*', { method: 'POST' })

await expect(mock).toBeRequestedWith({
    url: 'http://localhost:8080/api/todo',          // [opcjonalnie] string | function | custom matcher
    method: 'POST',                                 // [opcjonalnie] string | array
    statusCode: 200,                                // [opcjonalnie] number | array
    requestHeaders: { Authorization: 'foo' },       // [opcjonalnie] object | function | custom matcher
    responseHeaders: { Authorization: 'bar' },      // [opcjonalnie] object | function | custom matcher
    postData: { title: 'foo', description: 'bar' }, // [opcjonalnie] object | function | custom matcher
    response: { success: true },                    // [opcjonalnie] object | function | custom matcher
})

await expect(mock).toBeRequestedWith({
    url: expect.stringMatching(/.*\/api\/.*/i),
    method: ['POST', 'PUT'], // POST lub PUT
    statusCode: [401, 403],  // 401 lub 403
    requestHeaders: headers => headers.Authorization.startsWith('Bearer '),
    postData: expect.objectContaining({ released: true, title: expect.stringContaining('foobar') }),
    response: r => Array.isArray(r) && r.data.items.length === 20
})
```

## Dopasowanie zrzutów ekranu

WebdriverIO obsługuje podstawowe testy zrzutów ekranu (snapshot tests), a także testy zrzutów DOM.

### toMatchSnapshot

Sprawdza, czy dowolny obiekt pasuje do określonej wartości. Jeśli przekażesz [`WebdriverIO.Element`](https://webdriver.io/docs/api/element), automatycznie zostanie wykonany zrzut stanu [`outerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML).

##### Użycie

```js
// zrzut dowolnych obiektów (nie wymagane tutaj "await")
expect({ foo: 'bar' }).toMatchSnapshot()
// zrzut `outerHTML` WebdriverIO.Element (zrzut DOM, wymaga "await")
await expect($('elem')).toMatchSnapshot()
// zrzut wyniku komendy elementu
await expect($('elem').getCSSProperty('background-color')).toMatchSnapshot()
```

### toMatchInlineSnapshot

Podobnie możesz użyć `toMatchInlineSnapshot()`, aby zapisać zrzut bezpośrednio w pliku testowym. Na przykład:

```js
await expect($('img')).toMatchInlineSnapshot()
```

Zamiast tworzyć plik zrzutu, WebdriverIO bezpośrednio zmodyfikuje plik testowy, aby zaktualizować zrzut jako ciąg znaków:

```js
await expect($('img')).toMatchInlineSnapshot(`"<img src="/public/apple-touch-icon-precomposed.png">"`)
```

## Dopasowania dla zrzutów wizualnych

<!--
    These matchers aren't implemented in the `expect-webdriverio` project and can be found
    here: https://github.com/webdriverio-community/visual-testing/blob/e10f7005c1533f5b06811888a9cbb9020e6e765e/packages/service/src/matcher.ts
-->

Poniższe dopasowania są zaimplementowane jako część wtyczki `@wdio/visual-service` i są dostępne tylko wtedy, gdy usługa jest skonfigurowana. Upewnij się, że postępujesz zgodnie z [instrukcjami konfiguracji](https://webdriver.io/docs/visual-testing).

### toMatchElementSnapshot

Sprawdza, czy dany element pasuje do zrzutu z linii bazowej.

##### Użycie

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot('wdioLogo', 0, {
    // opcje
})
```

Oczekiwany wynik to domyślnie `0`, więc możesz napisać tę samą asercję jako:

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot('wdioLogo', {
    // opcje
})
```

lub nie przekazywać żadnych opcji:

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot()
```

### toMatchScreenSnapshot

Sprawdza, czy bieżący ekran pasuje do zrzutu z linii bazowej.

##### Użycie

```js
await expect(browser).toMatchScreenSnapshot('partialPage', 0, {
    // opcje
})
```

Oczekiwany wynik to domyślnie `0`, więc możesz napisać tę samą asercję jako:

```js
await expect(browser).toMatchScreenSnapshot('partialPage', {
    // opcje
})
```

lub nie przekazywać żadnych opcji:

```js
await expect(browser).toMatchScreenSnapshot('partialPage')
```

### toMatchFullPageSnapshot

Sprawdza, czy zrzut pełnej strony pasuje do zrzutu z linii bazowej.

##### Użycie

```js
await expect(browser).toMatchFullPageSnapshot('fullPage', 0, {
    // opcje
})
```

Oczekiwany wynik to domyślnie `0`, więc możesz napisać tę samą asercję jako:

```js
await expect(browser).toMatchFullPageSnapshot('fullPage', {
    // opcje
})
```

lub nie przekazywać żadnych opcji:

```js
await expect(browser).toMatchFullPageSnapshot('fullPage')
```

### toMatchTabbablePageSnapshot

Sprawdza, czy zrzut pełnej strony zawierający oznaczenia kartek pasuje do zrzutu z linii bazowej.

##### Użycie

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable', 0, {
    // opcje
})
```

Oczekiwany wynik to domyślnie `0`, więc możesz napisać tę samą asercję jako:

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable', {
    // opcje
})
```

lub nie przekazywać żadnych opcji:

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable')
```

## Używanie wyrażeń regularnych

Możesz również bezpośrednio używać wyrażeń regularnych dla wszystkich dopasowań, które porównują tekst.

##### Użycie

```js
await browser.url('https://webdriver.io/')
const elem = await $('.container')
await expect(elem).toHaveText(/node\.js/i)
await expect(elem).toHaveText([/node\.js/i, 'Get Started'])
await expect(browser).toHaveTitle(/webdriverio/i)
await expect(browser).toHaveUrl(/webdriver\.io/)
await expect(elem).toHaveElementClass(/Container/i)
```

## Domyślne dopasowania

Oprócz dopasowań `expect-webdriverio` możesz używać wbudowanych asercji Jest [expect](https://jestjs.io/docs/en/expect) lub [expect/expectAsync](https://jasmine.github.io/api/3.5/global.html#expect) dla Jasmine.

## Asymetryczne dopasowania

WebdriverIO obsługuje użycie asymetrycznych dopasowań wszędzie tam, gdzie porównujesz wartości tekstowe, np.:

```ts
await expect(browser).toHaveTitle(expect.stringContaining('some title'))
```

lub

```ts
await expect(browser).toHaveTitle(expect.not.stringContaining('some title'))
```

## TypeScript

Jeśli używasz [WDIO Testrunner](https://webdriver.io/docs/clioptions), wszystko zostanie automatycznie skonfigurowane. Po prostu postępuj zgodnie z [instrukcją konfiguracji](https://webdriver.io/docs/typescript#framework-setup) z dokumentacji. Jednak jeśli uruchamiasz WebdriverIO z innym testrunnerem lub w prostym skrypcie Node.js, musisz dodać `expect-webdriverio` do `types` w `tsconfig.json`.

- `"expect-webdriverio"` dla wszystkich poza użytkownikami Jasmine/Jest.
- `"expect-webdriverio/jasmine"` dla Jasmine
- `"expect-webdriverio/jest"` dla Jest

## JavaScript (VSCode)

Wymagane jest utworzenie `jsconfig.json` w głównym katalogu projektu i odniesienie do definicji typów, aby działało automatyczne uzupełnianie w czystym js.

```json
{
  "include": [
    "**/*.js",
    "**/*.json",
    "node_modules/expect-webdriverio"
  ]
}
```

## Dodawanie własnych dopasowań

Podobnie jak `expect-webdriverio` rozszerza dopasowania Jasmine/Jest, możliwe jest dodanie niestandardowych dopasowań.

- Jasmine: sprawdź dokumentację [custom matchers](https://jasmine.github.io/2.5/custom_matcher.html)
- Dla pozostałych: sprawdź [expect.extend](https://jestjs.io/docs/en/expect#expectextendmatchers) w Jest

Niestandardowe dopasowania powinny być dodane w hooku `before` wdio

```js
// wdio.conf.js
{
    async before () {
        const { addCustomMatchers } = await import('./myMatchers')
        addCustomMatchers()
    }
}
```

```js
// myMatchers.js - przykład dla Jest
export function addCustomMatchers () {
    if (global.expect.expect !== undefined) { // Tymczasowe obejście. Zobacz https://github.com/webdriverio/expect-webdriverio/issues/835
        global.expect = global.expect.expect;
    }

    expect.extend({
        myMatcher (actual, expected) {
            return { pass: actual === expected, message: () => 'some message' }
        }
    })
}
```