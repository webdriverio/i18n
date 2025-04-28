---
id: element
title: Obiekt Element
---

Obiekt Element to obiekt reprezentujący element na zdalnym agencie użytkownika, np. [węzeł DOM](https://developer.mozilla.org/en-US/docs/Web/API/Element) podczas uruchamiania sesji w przeglądarce lub [element mobilny](https://developer.apple.com/documentation/swift/sequence/element) dla urządzeń mobilnych. Można go otrzymać za pomocą jednego z wielu poleceń zapytania o element, np. [`$`](/docs/api/element/$), [`custom$`](/docs/api/element/custom$), [`react$`](/docs/api/element/react$) lub [`shadow$`](/docs/api/element/shadow$).

## Właściwości

Obiekt elementu ma następujące właściwości:

| Nazwa | Typ | Szczegóły |
| ---- | ---- | ------- |
| `sessionId` | `String` | Identyfikator sesji przypisany przez zdalny serwer. |
| `elementId` | `String` | Powiązane [odniesienie do elementu webowego](https://w3c.github.io/webdriver/#elements), które może być używane do interakcji z elementem na poziomie protokołu |
| `selector` | `String` | [Selektor](/docs/selectors) używany do zapytania o element. |
| `parent` | `Object` | Albo [Obiekt Przeglądarki](/docs/api/browser), gdy element został pobrany z niej (np. `const elem = browser.$('selector')`) lub [Obiekt Element](/docs/api/element), jeśli został pobrany z zakresu elementu (np. `elem.$('selector')`) |
| `options` | `Object` | [Opcje](/docs/configuration) WebdriverIO zależne od sposobu utworzenia obiektu przeglądarki. Zobacz więcej [typów konfiguracji](/docs/setuptypes). |

## Metody
Obiekt elementu udostępnia wszystkie metody z sekcji protokołu, np. protokół [WebDriver](/docs/api/webdriver), a także polecenia wymienione w sekcji elementu. Dostępne polecenia protokołu zależą od typu sesji. Jeśli uruchamiasz zautomatyzowaną sesję przeglądarki, żadne z poleceń Appium [commands](/docs/api/appium) nie będą dostępne i odwrotnie.

Dodatkowo dostępne są następujące polecenia:

| Nazwa | Parametry | Szczegóły |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (Typ: `String`)<br />- `fn` (Typ: `Function`) | Pozwala na definiowanie niestandardowych poleceń, które mogą być wywoływane z obiektu przeglądarki w celach kompozycyjnych. Przeczytaj więcej w przewodniku [Własne Polecenia](/docs/customcommands). |
| `overwriteCommand` | - `commandName` (Typ: `String`)<br />- `fn` (Typ: `Function`) | Pozwala na nadpisanie dowolnego polecenia przeglądarki niestandardową funkcjonalnością. Używaj ostrożnie, ponieważ może to dezorientować użytkowników frameworka. Przeczytaj więcej w przewodniku [Własne Polecenia](/docs/customcommands#overwriting-native-commands). |

## Uwagi

### Łańcuch Elementów

Podczas pracy z elementami WebdriverIO zapewnia specjalną składnię, która upraszcza zapytania o nie i tworzy złożone, zagnieżdżone wyszukiwania elementów. Ponieważ obiekty elementów pozwalają znaleźć elementy w ich gałęzi drzewa za pomocą typowych metod zapytań, użytkownicy mogą pobierać zagnieżdżone elementy w następujący sposób:

```js
const header = await $('#header')
const headline = await header.$('#headline')
console.log(await headline.getText()) // outputs "I am a headline"
```

W przypadku głęboko zagnieżdżonych struktur, przypisywanie każdego zagnieżdżonego elementu do tablicy, aby następnie go używać, może być dość rozwlekłe. Dlatego WebdriverIO ma koncepcję łańcuchowych zapytań o elementy, które pozwalają na pobieranie zagnieżdżonych elementów w taki sposób:

```js
console.log(await $('#header').$('#headline').getText())
```

Działa to również podczas pobierania zestawu elementów, np.:

```js
// get the text of the 3rd headline within the 2nd header
console.log(await $$('#header')[1].$$('#headline')[2].getText())
```

Podczas pracy z zestawem elementów może to być szczególnie przydatne, gdy próbujesz z nimi wchodzić w interakcję, zamiast robić:

```js
const elems = await $$('div')
const locations = await Promise.all(
    elems.map((el) => el.getLocation())
)
```

Możesz bezpośrednio wywołać metody Array na łańcuchu elementów, np.:

```js
const location = await $$('div').map((el) => el.getLocation())
```

tak samo jak:

```js
const divs = await $$('div')
const location = await divs.map((el) => el.getLocation())
```

WebdriverIO używa niestandardowej implementacji, która obsługuje asynchroniczne iteratory pod maską, więc wszystkie polecenia z ich API są również obsługiwane w tych przypadkach.

__Uwaga:__ wszystkie asynchroniczne iteratory zwracają obietnicę, nawet jeśli twój callback nie zwraca obietnicy, np.:

```ts
const divs = await $$('div')
console.log(divs.map((div) => div.selector)) // ❌ zwraca "Promise<string>[]"
console.log(await divs.map((div) => div.selector)) // ✅ zwraca "string[]"
```

### Własne Polecenia

Możesz ustawić niestandardowe polecenia w zakresie przeglądarki, aby uprościć często używane przepływy pracy. Sprawdź nasz przewodnik na temat [Własnych Poleceń](/docs/customcommands#adding-custom-commands), aby uzyskać więcej informacji.