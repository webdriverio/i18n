---
id: browsingContext
title: Obiekt BrowsingContext
description: Przechowuj kartę, okno lub ramkę jako obiekt i wykonuj w nich polecenia bezpośrednio, bez przełączania do nich sesji.
---

Kontekst przeglądania (browsing context) to karta, okno lub ramka, którą przechowujesz jako obiekt. Polecenia wywołane na nim są wykonywane w tej karcie lub ramce, podczas gdy sesja i wszystkie inne konteksty pozostają tam, gdzie są. Od wersji v10 WebdriverIO w ten sposób obsługuje karty, okna i ramki w sesji WebDriver BiDi i zastępuje tam `switchWindow()` oraz `switchFrame()`.

```ts title="test/specs/tabs.e2e.ts"
import { browser, expect } from '@wdio/globals'

describe('browsing contexts', () => {
    it('works with two tabs and a frame at the same time', async () => {
        const page = await browser.url('https://the-internet.herokuapp.com/nested_frames')
        const docs = await browser.newWindow('https://webdriver.io/docs/api', { type: 'tab' })

        const top = await page.frame({ selector: 'frame[name="frame-top"]' })
        const middle = await top.frame({ selector: 'frame[name="frame-middle"]' })

        await expect(middle.$('#content')).toHaveText('MIDDLE')
        await expect(docs.$('h1')).toBeDisplayed()
        console.log(await page.getTitle(), await docs.getTitle())
    })
})
```

## Uzyskiwanie kontekstu przeglądania

| Wywołanie | Zwraca |
| --- | --- |
| [`browser.url(url)`](/docs/api/browser/url) | Pierwszy kontekst najwyższego poziomu sesji, po nawigacji do podanego adresu. `browser.url()` zawsze nawiguje ten kontekst. |
| [`browser.newWindow(url, { type })`](/docs/api/browser/newWindow) | Nową kartę (`type: 'tab'`) lub okno, po załadowaniu strony. Sesja nie przełącza się do niego. |
| [`browser.browsingContexts()`](/docs/api/browser/browsingContexts) | Wszystkie otwarte konteksty najwyższego poziomu (karty i okna, nie ramki), np. kartę, którą strona otworzyła sama. |
| [`context.frame(query)`](/docs/api/browsingContext/frame) | Ramkę kontekstu, również ramki z innego źródła (cross-origin) i zagnieżdżone. |

Zachowaj obiekt i wywołuj na nim polecenia. Nie istnieje „bieżąca” karta ani ramka, między którymi trzeba się przełączać, dzięki czemu konteksty mogą być używane również równolegle:

```ts
const [titleA, titleB] = await Promise.all([pageA.getTitle(), pageB.getTitle()])
```

## Sesje WebDriver BiDi i Classic

Konteksty przeglądania wymagają sesji WebDriver BiDi, która od wersji v10 jest domyślna dla Chrome, Edge i Firefox. W sesji WebDriver Classic, np. z Appium lub Safari, istnieje tylko bieżący kontekst sesji. W takim przypadku:

- `browser.url()` zwraca obiekt zastępczy dla przeglądarki. Polecenia takie jak `$`, `execute` czy `getTitle` są wykonywane na przeglądarce, `url`, `isFrame` i `parent` opisują bieżącą stronę, a `contextId` ma wartość `undefined`.
- `frame()`, `navigate()` i `activate()` są odrzucane i wskazują polecenie Classic, którego należy użyć zamiast nich: [`browser.switchFrame()`](/docs/api/browser/switchFrame), [`browser.url()`](/docs/api/browser/url) lub [`browser.switchWindow()`](/docs/api/browser/switchWindow).

Sprawdzaj `browser.isBidi`, gdy ten sam kod działa w obu rodzajach sesji.

## Właściwości

| Nazwa | Typ | Szczegóły |
| ---- | ---- | ------- |
| `contextId` | `String` | Identyfikator kontekstu przeglądania WebDriver BiDi. `undefined` w sesji Classic. |
| `url` | `String` | Adres URL, do którego kontekst był ostatnio nawigowany za pomocą `browser.url()`, `navigate()` lub `newWindow()`. Nawigacje wykonywane przez samą stronę (linki, `location`, `history.pushState`) są widoczne dopiero po wywołaniu [`getUrl()`](/docs/api/browsingContext/getUrl). |
| `isFrame` | `Boolean` | `true` dla ramki, `false` dla karty lub okna. |
| `parent` | `BrowsingContext \| undefined` | Dla ramki: kontekst, na którym wywołano `frame()` (lub ramka pośrednia w przypadku ramki zagnieżdżonej głębiej). `undefined` dla karty lub okna. |
| `browser` | `Browser` | [Obiekt przeglądarki](/docs/api/browser) sesji. |
| `request` | `Request \| undefined` | Informacje o ładowaniu ostatniej nawigacji wykonanej przez `browser.url()` lub `navigate()`: URL, nagłówki, odpowiedź, przekierowania oraz żądania wykonane przez stronę. |
| `sessionId` | `String` | Identyfikator sesji, taki sam jak `browser.sessionId`. |
| `capabilities` | `Object` | Capabilities sesji, takie same jak `browser.capabilities`. |
| `options` | `Object` | Opcje WebdriverIO, takie same jak `browser.options`. |
| `isBidi` | `Boolean` | Czy sesja używa WebDriver BiDi. |
| `isMobile` | `Boolean` | Czy sesja automatyzuje urządzenie mobilne. |

## Metody

### Polecenia kontekstu przeglądania

Te polecenia działają na kontekście, na którym zostały wywołane. Każde z nich ma własną stronę dokumentacji.

| Polecenie | Szczegóły |
| --- | --- |
| [`frame`](/docs/api/browsingContext/frame) | Pobiera ramkę tego kontekstu jako osobny kontekst przeglądania. |
| [`navigate`](/docs/api/browsingContext/navigate) | Nawiguje ten kontekst, z tymi samymi opcjami co `browser.url()`. |
| [`refresh`](/docs/api/browsingContext/refresh) | Przeładowuje ten kontekst. Ramka przeładowuje tylko własny dokument. |
| [`back`](/docs/api/browsingContext/back) / [`forward`](/docs/api/browsingContext/forward) | Porusza się po historii tej karty lub okna. |
| [`activate`](/docs/api/browsingContext/activate) | Przenosi tę kartę lub okno na pierwszy plan. |
| [`closeWindow`](/docs/api/browsingContext/closeWindow) | Zamyka tę kartę lub okno. |
| [`getTitle`](/docs/api/browsingContext/getTitle) / [`getUrl`](/docs/api/browsingContext/getUrl) | Odczytuje tytuł lub URL dokumentu wyświetlanego w tym kontekście. |
| [`acceptAlert`](/docs/api/browsingContext/acceptAlert) / [`dismissAlert`](/docs/api/browsingContext/dismissAlert) / [`getAlertText`](/docs/api/browsingContext/getAlertText) | Odpowiada na okno dialogowe otwarte w tym kontekście lub odczytuje jego treść. |

### Polecenia przeglądarki wykonywane w kontekście

Są to [polecenia przeglądarki](/docs/api/browser) o tej samej nazwie, stosowane do tego kontekstu zamiast do pierwszego kontekstu sesji. Przyjmują te same argumenty.

| Polecenie | W kontekście przeglądania |
| --- | --- |
| [`$`](/docs/api/browser/$), [`$$`](/docs/api/browser/$$), [`custom$`](/docs/api/browser/custom$), [`custom$$`](/docs/api/browser/custom$$), [`react$`](/docs/api/browser/react$), [`react$$`](/docs/api/browser/react$$) | Wyszukuje elementy w dokumencie tego kontekstu. |
| [`execute`](/docs/api/browser/execute) | Uruchamia skrypt w dokumencie tego kontekstu. |
| [`action`](/docs/api/browser/action), [`actions`](/docs/api/browser/actions), [`keys`](/docs/api/browser/keys), [`scroll`](/docs/api/browser/scroll) | Wysyła dane wejściowe do tego kontekstu, również gdy jest on kartą w tle. |
| [`saveScreenshot`](/docs/api/browser/saveScreenshot), [`savePDF`](/docs/api/browser/savePDF) | Przechwytuje ten kontekst. |
| [`getCookies`](/docs/api/browser/getCookies), [`setCookies`](/docs/api/browser/setCookies), [`deleteCookies`](/docs/api/browser/deleteCookies) | Odczytuje i zmienia pliki cookie partycji magazynu tego kontekstu. |
| [`setViewport`](/docs/api/browser/setViewport) | Zmienia rozmiar widoku tej karty lub okna. |
| [`addInitScript`](/docs/api/browser/addInitScript) | Uruchamia skrypt przed skryptami strony, tylko w tej karcie lub oknie. |
| [`mock`](/docs/api/browser/mock), [`mockClearAll`](/docs/api/browser/mockClearAll), [`mockRestoreAll`](/docs/api/browser/mockRestoreAll) | Mockuje żądania tylko tej karty lub okna. Mock kończy działanie po zamknięciu jego karty. |
| [`emulate`](/docs/api/browser/emulate) | Emuluje właściwość urządzenia, np. geolokalizację lub zegar, tylko w tej karcie lub oknie. |
| [`restore`](/docs/api/browser/restore) | Przywraca emulacje, tak samo jak `browser.restore()`. |
| [`waitUntil`](/docs/api/browser/waitUntil), [`pause`](/docs/api/browser/pause) | Tak samo jak w przeglądarce. |

```ts title="test/specs/mock.e2e.ts"
import { browser, expect } from '@wdio/globals'

it('mocks the requests of one tab only', async () => {
    const page = await browser.url('https://webdriver.io')
    const tab = await browser.newWindow('https://webdriver.io', { type: 'tab' })

    const mock = await tab.mock('**/api/users')
    mock.respond([{ name: 'Mocked user' }])

    // żądania z `tab` otrzymują zamockowaną odpowiedź, żądania z `page` docierają do serwera
})
```

### Tylko najwyższy poziom {#top-level-only}

Ramka współdzieli historię, widok, sieć i emulację ze swoją kartą, dlatego te polecenia wywołane na ramce są odrzucane z komunikatem `` `<command>` is only available on a top-level browsing context ``. Wywołaj je na karcie: `frame.parent` aż do momentu, gdy `parent` ma wartość `undefined`, lub na kontekście, na którym wywołano `frame()`.

`back`, `forward`, `activate`, `closeWindow`, `setViewport`, `addInitScript`, `mock`, `mockClearAll`, `mockRestoreAll`, `emulate`, `restore`

### Niedostępne w kontekście przeglądania

Polecenia sesji, takie jak `deleteSession`, `newWindow` czy `browsingContexts`, są dostępne tylko w [obiekcie przeglądarki](/docs/api/browser). Dotyczy to również poleceń niestandardowych: [`addCommand`](/docs/customcommands) i `overwriteCommand` są odrzucane w kontekście — rejestruj je na `browser`.

### Zdarzenia

`on`, `once`, `off`, `emit`, `removeListener` i `removeAllListeners` rejestrują nasłuchiwacze w przeglądarce, więc zdarzenia dotyczą całej sesji. Na przykład zdarzenie [`dialog`](/docs/api/dialog) jest wywoływane dla okna dialogowego w dowolnej karcie lub ramce.

## Elementy kontekstu przeglądania

Element uzyskany przez kontekst należy do tego kontekstu. Polecenia elementu, takie jak `click`, `setValue` czy `getText`, są wykonywane w dokumencie tego kontekstu, również gdy jest on kartą w tle lub ramką. Są zgodne ze specyfikacją WebDriver, tak jak sterowniki, więc zwracają te same wyniki i te same błędy (np. `element click intercepted`) co dla elementu strony na pierwszym planie. `getComputedRole` i `getComputedLabel` są odrzucane dla elementu z kontekstu innego niż pierwszy kontekst sesji.

```ts
const page = await browser.url('https://the-internet.herokuapp.com/nested_frames')
const bottom = await page.frame({ selector: 'frame[name="frame-bottom"]' })
const body = await bottom.$('body')
console.log(await body.getText()) // wypisuje: "BOTTOM"
```

## Rozwiązywanie problemów

| Błąd | Przyczyna i rozwiązanie |
| --- | --- |
| `` `switchFrame` was removed for WebDriver BiDi sessions in WebdriverIO v10. `` | Wywołaj [`frame()`](/docs/api/browsingContext/frame) na kontekście zwróconym przez `browser.url()` lub `browser.newWindow()`. |
| `` `switchWindow` was removed for WebDriver BiDi sessions in WebdriverIO v10. `` | Zachowaj kontekst zwrócony przez `browser.url()` lub `browser.newWindow()` albo znajdź go za pomocą `browser.browsingContexts()`. |
| `` `frame()` needs a WebDriver BiDi session, but this session uses WebDriver Classic `` | Sesja jest sesją Classic (np. Appium lub Safari). Użyj polecenia Classic wskazanego w komunikacie. |
| `` `<command>` is only available on a top-level browsing context `` | Polecenie zostało wywołane na ramce. Wywołaj je na karcie ramki, zobacz [Tylko najwyższy poziom](#top-level-only). |
| `` `addCommand` is only available on the browser, not on a browsing context `` | Rejestruj polecenia niestandardowe na `browser`. |
| `no such frame: the frame "…" was discarded because the page it belongs to navigated away` | Strona zawierająca ramkę przeszła do innego adresu. Pobierz ramkę ponownie za pomocą `frame()` na nowej stronie. |

## Powiązane

- [Obiekt Browser](/docs/api/browser)
- [Migracja do v10: `switchToFrame`](/docs/v10-migration#switchtoframe)
- [Okna dialogowe](/docs/api/dialog)