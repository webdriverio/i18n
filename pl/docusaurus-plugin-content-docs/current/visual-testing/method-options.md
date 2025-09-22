---
id: method-options
title: Opcje metody
---

Opcje metody to opcje, które można ustawić dla każdej [metody](./methods). Jeśli opcja ma ten sam klucz co opcja ustawiona podczas inicjalizacji wtyczki, ta opcja metody zastąpi wartość opcji wtyczki.

:::info UWAGA

-   Wszystkie opcje z [Opcji zapisu](#save-options) mogą być używane dla metod [Porównywania](#compare-check-options)
-   Wszystkie opcje porównywania mogą być używane podczas inicjalizacji usługi __lub__ dla każdej pojedynczej metody sprawdzania. Jeśli opcja metody ma ten sam klucz co opcja ustawiona podczas inicjalizacji usługi, wtedy opcja porównywania metody zastąpi wartość opcji porównywania usługi.
- Wszystkie opcje mogą być używane dla poniższych kontekstów aplikacji, chyba że zaznaczono inaczej:
    - Web
    - Aplikacja hybrydowa
    - Aplikacja natywna
- Poniższe przykłady dotyczą metod `save*`, ale mogą być również używane z metodami `check*`

:::

## Save Options

### `disableBlinkingCursor`

- **Typ:** `boolean`
- **Obowiązkowy:** Nie
- **Domyślnie:** `false`
- **Używane z:** Wszystkie [metody](./methods)
- **Obsługiwane konteksty aplikacji:** Web, Aplikacja hybrydowa (Webview)

Włącza/wyłącza miganie kursora w elementach `input`, `textarea`, `[contenteditable]` w aplikacji. Jeśli ustawione na `true`, kursor zostanie ustawiony na `transparent` przed wykonaniem zrzutu ekranu
i przywrócony po zakończeniu.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableBlinkingCursor: true
    }
)
```

### `disableCSSAnimation`

- **Typ:** `boolean`
- **Obowiązkowy:** Nie
- **Domyślnie:** `false`
- **Używane z:** Wszystkie [metody](./methods)
- **Obsługiwane konteksty aplikacji:** Web, Aplikacja hybrydowa (Webview)

Włącza/wyłącza wszystkie animacje CSS w aplikacji. Jeśli ustawione na `true`, wszystkie animacje zostaną wyłączone przed wykonaniem zrzutu ekranu
i przywrócone po zakończeniu

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableCSSAnimation: true
    }
)
```

### `enableLegacyScreenshotMethod`

- **Typ:** `boolean`
- **Obowiązkowy:** Nie
- **Domyślnie:** `false`
- **Używane z:** Wszystkie [metody](./methods)
- **Obsługiwane konteksty aplikacji:** Web, Aplikacja hybrydowa (Webview)

Użyj tej opcji, aby przełączyć się na "starszą" metodę zrzutu ekranu opartą na protokole W3C-WebDriver. Może to być pomocne, jeśli Twoje testy opierają się na istniejących obrazach bazowych lub jeśli działasz w środowiskach, które nie w pełni obsługują nowsze zrzuty ekranu oparte na BiDi.
Pamiętaj, że włączenie tej opcji może skutkować zrzutami ekranu o nieco innej rozdzielczości lub jakości.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLegacyScreenshotMethod: true
    }
)
```

### `enableLayoutTesting`

- **Typ:** `boolean`
- **Obowiązkowy:** Nie
- **Domyślnie:** `false`
- **Używane z:** Wszystkie [metody](./methods)
- **Obsługiwane konteksty aplikacji:** Web, Aplikacja hybrydowa (Webview)

Ukryje cały tekst na stronie, dzięki czemu do porównania zostanie użyty tylko układ. Ukrywanie zostanie wykonane przez dodanie stylu `'color': 'transparent !important'` do __każdego__ elementu.

Aby zobaczyć wynik, zobacz [Test Output](./test-output#enablelayouttesting).

:::info
Używając tej flagi, każdy element zawierający tekst (nie tylko `p, h1, h2, h3, h4, h5, h6, span, a, li`, ale również `div|button|..`) otrzyma tę właściwość. NIE ma opcji dostosowania tego.
:::

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLayoutTesting: true
    }
)
```

### `hideScrollBars`

- **Typ:** `boolean`
- **Obowiązkowy:** Nie
- **Domyślnie:** `true`
- **Używane z:** Wszystkie [metody](./methods)
- **Obsługiwane konteksty aplikacji:** Web, Aplikacja hybrydowa (Webview)

Ukryj paski przewijania w aplikacji. Jeśli ustawione na true, wszystkie paski przewijania zostaną wyłączone przed wykonaniem zrzutu ekranu. Domyślnie jest ustawione na `true`, aby zapobiec dodatkowym problemom.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideScrollBars: false
    }
)
```

### `hideElements`

- **Typ:** `array`
- **Obowiązkowy:** Nie
- **Używane z:** Wszystkie [metody](./methods)
- **Obsługiwane konteksty aplikacji:** Web, Aplikacja hybrydowa (Webview)

Ta metoda może ukryć 1 lub wiele elementów, dodając do nich właściwość `visibility: hidden`, podając tablicę elementów.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideElements: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

### `removeElements`

- **Typ:** `array`
- **Obowiązkowy:** Nie
- **Używane z:** Wszystkie [metody](./methods)
- **Obsługiwane konteksty aplikacji:** Web, Aplikacja hybrydowa (Webview)

Ta metoda może _usunąć_ 1 lub wiele elementów, dodając do nich właściwość `display: none`, podając tablicę elementów.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        removeElements: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

### `resizeDimensions`

- **Typ:** `object`
- **Obowiązkowy:** Nie
- **Domyślnie:** `{ top: 0, right: 0, bottom: 0, left: 0}`
- **Używane z:** Tylko dla [`saveElement`](./methods#saveelement) lub [`checkElement`](./methods#checkelement)
- **Obsługiwane konteksty aplikacji:** Web, Aplikacja hybrydowa (Webview), Aplikacja natywna

Obiekt, który musi zawierać wartości `top`, `right`, `bottom` i `left` w pikselach, które mają powiększyć wycięty obszar elementu.

```typescript
await browser.saveElement(
    'sample-tag',
    {
        resizeDimensions: {
            top: 50,
            left: 100,
            right: 10,
            bottom: 90,
        },
    }
)
```

### `userBasedFullPageScreenshot`

- **Typ:** `boolean`
- **Obowiązkowy:** Nie
- **Domyślnie:** `false`
- **Używane z:** Tylko dla [`saveFullPageScreen`](./methods#savefullpagescreen), [`saveTabbablePage`](./methods#savetabbablepage), [`checkFullPageScreen`](./methods#checkfullpagescreen) lub [`checkTabbablePage`](./methods#checktabbablepage)
- **Obsługiwane konteksty aplikacji:** Web, Aplikacja hybrydowa (Webview)

Gdy ustawione na `true`, ta opcja włącza **strategię przewijania i łączenia** do wykonywania zrzutów pełnej strony.
Zamiast używać natywnych funkcji przeglądarki do wykonywania zrzutów ekranu, przewija stronę ręcznie i łączy wiele zrzutów ekranu razem.
Ta metoda jest szczególnie przydatna dla stron z **leniwie ładowaną zawartością** lub złożonymi układami, które wymagają przewijania, aby w pełni się wyrenderować.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        userBasedFullPageScreenshot: true
    }
)
```

### `fullPageScrollTimeout`

- **Typ:** `number`
- **Obowiązkowy:** Nie
- **Domyślnie:** `1500`
- **Używane z:** Tylko dla [`saveFullPageScreen`](./methods#savefullpagescreen) lub [`saveTabbablePage`](./methods#savetabbablepage)
- **Obsługiwane konteksty aplikacji:** Web, Aplikacja hybrydowa (Webview)

Limit czasu w milisekundach, jaki należy odczekać po przewinięciu. Może to pomóc w identyfikacji stron z leniwie ładowaną zawartością.

> **UWAGA:** Działa tylko gdy `userBasedFullPageScreenshot` jest ustawione na `true`

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        fullPageScrollTimeout: 3 * 1000
    }
)
```

### `hideAfterFirstScroll`

- **Typ:** `array`
- **Obowiązkowy:** Nie
- **Używane z:** Tylko dla [`saveFullPageScreen`](./methods#savefullpagescreen) lub [`saveTabbablePage`](./methods#savetabbablepage)
- **Obsługiwane konteksty aplikacji:** Web, Aplikacja hybrydowa (Webview)

Ta metoda ukryje jeden lub wiele elementów, dodając do nich właściwość `visibility: hidden` przez podanie tablicy elementów.
Jest to przydatne, gdy strona na przykład zawiera przyklejone elementy, które przewijają się wraz ze stroną, ale dają irytujący efekt przy wykonywaniu zrzutu pełnej strony.

> **UWAGA:** Działa tylko gdy `userBasedFullPageScreenshot` jest ustawione na `true`

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        hideAfterFirstScroll: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

### `waitForFontsLoaded`

- **Typ:** `boolean`
- **Obowiązkowy:** Nie
- **Domyślnie:** `true`
- **Używane z:** Wszystkie [metody](./methods)
- **Obsługiwane konteksty aplikacji:** Web, Aplikacja hybrydowa (Webview)

Czcionki, w tym czcionki zewnętrzne, mogą być ładowane synchronicznie lub asynchronicznie. Ładowanie asynchroniczne oznacza, że czcionki mogą załadować się po tym, jak WebdriverIO stwierdzi, że strona w pełni się załadowała. Aby zapobiec problemom z renderowaniem czcionek, ten moduł domyślnie poczeka na załadowanie wszystkich czcionek przed wykonaniem zrzutu ekranu.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        waitForFontsLoaded: true
    }
)
```

## Compare (Check) Options

Opcje porównywania to opcje, które wpływają na sposób wykonywania porównania przez [ResembleJS](https://github.com/Huddle/Resemble.js).

### `ignoreAlpha`

- **Typ:** `boolean`
- **Domyślnie:** `false`
- **Obowiązkowy:** Nie
- **Używane z:** Wszystkie [metody Check](./methods#check-methods)
- **Obsługiwane konteksty aplikacji:** Wszystkie

Porównuje obrazy i ignoruje kanał alfa.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAlpha: true
    }
)
```

### `blockOutSideBar`

- **Typ:** `boolean`
- **Domyślnie:** `true`
- **Obowiązkowy:** Nie
- **Używane z:** _Może być używane tylko z `checkScreen()`. Dotyczy to **tylko iPada**_
- **Obsługiwane konteksty aplikacji:** Wszystkie

Automatycznie blokuje pasek boczny dla iPadów w trybie poziomym podczas porównań. Zapobiega to niepowodzeniom na natywnym komponencie karty/prywatnym/zakładek.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutSideBar: true
    }
)
```

### `blockOutStatusBar`

- **Typ:** `boolean`
- **Domyślnie:** `true`
- **Obowiązkowy:** Nie
- **Używane z:** _Dotyczy to **tylko urządzeń mobilnych**_
- **Obsługiwane konteksty aplikacji:** Hybrydowe (część natywna) i aplikacje natywne

Automatycznie blokuje pasek statusu i adresu podczas porównań. Zapobiega to niepowodzeniom związanym z czasem, stanem WiFi czy baterią.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutStatusBar: true
    }
)
```

### `blockOutToolBar`

- **Typ:** `boolean`
- **Domyślnie:** `true`
- **Obowiązkowy:** Nie
- **Używane z:** _Dotyczy to **tylko urządzeń mobilnych**_
- **Obsługiwane konteksty aplikacji:** Hybrydowe (część natywna) i aplikacje natywne

Automatycznie blokuje pasek narzędzi.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutToolBar: true
    }
)
```

### `ignoreAntialiasing`

- **Typ:** `boolean`
- **Domyślnie:** `false`
- **Obowiązkowy:** Nie
- **Używane z:** Wszystkie [metody Check](./methods#check-methods)
- **Obsługiwane konteksty aplikacji:** Wszystkie

Porównuje obrazy i ignoruje antyaliasing.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAntialiasing: true
    }
)
```

### `ignoreColors`

- **Typ:** `boolean`
- **Domyślnie:** `false`
- **Obowiązkowy:** Nie
- **Używane z:** Wszystkie [metody Check](./methods#check-methods)
- **Obsługiwane konteksty aplikacji:** Wszystkie

Mimo że obrazy są kolorowe, porównanie porówna 2 obrazy czarno-białe.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreColors: true
    }
)
```

### `ignoreLess`

- **Typ:** `boolean`
- **Domyślnie:** `false`
- **Obowiązkowy:** Nie
- **Używane z:** Wszystkie [metody Check](./methods#check-methods)
- **Obsługiwane konteksty aplikacji:** Wszystkie

Porównuje obrazy z parametrami `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreLess: true
    }
)
```

### `ignoreNothing`

- **Typ:** `boolean`
- **Domyślnie:** `false`
- **Obowiązkowy:** Nie
- **Używane z:** Wszystkie [metody Check](./methods#check-methods)
- **Obsługiwane konteksty aplikacji:** Wszystkie

Porównuje obrazy z parametrami `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreNothing: true
    }
)
```

### `rawMisMatchPercentage`

- **Typ:** `boolean`
- **Domyślnie:** `false`
- **Obowiązkowy:** Nie
- **Używane z:** Wszystkie [metody Check](./methods#check-methods)
- **Obsługiwane konteksty aplikacji:** Wszystkie

Jeśli true, zwracany procent będzie w formacie `0.12345678`, domyślnie jest `0.12`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        rawMisMatchPercentage: true
    }
)
```

### `returnAllCompareData`

- **Typ:** `boolean`
- **Domyślnie:** `false`
- **Obowiązkowy:** Nie
- **Używane z:** Wszystkie [metody Check](./methods#check-methods)
- **Obsługiwane konteksty aplikacji:** Wszystkie

Zwróci wszystkie dane porównania, nie tylko procent niezgodności, zobacz także [Wyjście konsoli](./test-output#console-output-1)

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        returnAllCompareData: true
    }
)
```

### `saveAboveTolerance`

- **Typ:** `number`
- **Domyślnie:** `0`
- **Obowiązkowy:** Nie
- **Używane z:** Wszystkie [metody Check](./methods#check-methods)
- **Obsługiwane konteksty aplikacji:** Wszystkie

Dopuszczalna wartość `misMatchPercentage`, która zapobiega zapisywaniu obrazów z różnicami

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        saveAboveTolerance: 0.25
    }
)
```

### `largeImageThreshold`

- **Typ:** `number`
- **Domyślnie:** `0`
- **Obowiązkowy:** Nie
- **Używane z:** Wszystkie [metody Check](./methods#check-methods)
- **Obsługiwane konteksty aplikacji:** Wszystkie

Porównywanie dużych obrazów może prowadzić do problemów z wydajnością.
Gdy podana jest liczba pikseli (większa niż 0), algorytm porównywania pomija piksele, gdy szerokość lub wysokość obrazu jest większa niż `largeImageThreshold` pikseli.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        largeImageThreshold: 1500
    }
)
```

### `scaleImagesToSameSize`

- **Typ:** `boolean`
- **Domyślnie:** `false`
- **Obowiązkowy:** Nie
- **Używane z:** Wszystkie [metody Check](./methods#check-methods)
- **Obsługiwane konteksty aplikacji:** Wszystkie

Skaluje 2 obrazy do tego samego rozmiaru przed wykonaniem porównania. Zdecydowanie zaleca się włączenie `ignoreAntialiasing` i `ignoreAlpha`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        scaleImagesToSameSize: true
    }
)
```

### `ignore`

- **Typ:** `array`
- **Obowiązkowy:** Nie
- **Używane z:** Tylko z metodą `checkScreen`, **NIE** z metodą `checkElement`
- **Obsługiwane konteksty aplikacji:** Aplikacja natywna

Ta metoda automatycznie blokuje elementy lub obszar na ekranie na podstawie tablicy elementów lub obiektu `x|y|width|height`.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignore: [
            $('~element-1'),
            await $('~element-2'),
            {
                x: 150,
                y: 250,
                width: 100,
                height: 100,
            }
        ]
    }
)
```

## Folder options

Folder bazowy i foldery zrzutów ekranu (aktualny, różnica) to opcje, które można ustawić podczas inicjowania wtyczki lub metody. Aby ustawić opcje folderu dla konkretnej metody, przekaż opcje folderu do obiektu opcji metody. Można to wykorzystać dla:

- Web
- Aplikacja hybrydowa
- Aplikacja natywna

```ts
import path from 'node:path'

const methodOptions = {
    actualFolder: path.join(process.cwd(), 'customActual'),
    baselineFolder: path.join(process.cwd(), 'customBaseline'),
    diffFolder: path.join(process.cwd(), 'customDiff'),
}

// Możesz tego użyć dla wszystkich metod
await expect(
    await browser.checkFullPageScreen("checkFullPage", methodOptions)
).toEqual(0)
```

### `actualFolder`

- **Typ:** `string`
- **Obowiązkowy:** Nie
- **Obsługiwane konteksty aplikacji:** Wszystkie

Folder na zrzut ekranu, który został wykonany w teście.

### `baselineFolder`

- **Typ:** `string`
- **Obowiązkowy:** Nie
- **Obsługiwane konteksty aplikacji:** Wszystkie

Folder na obraz bazowy, który jest używany do porównania.

### `diffFolder`

- **Typ:** `string`
- **Obowiązkowy:** Nie
- **Obsługiwane konteksty aplikacji:** Wszystkie

Folder na różnicę obrazu wygenerowaną przez ResembleJS.