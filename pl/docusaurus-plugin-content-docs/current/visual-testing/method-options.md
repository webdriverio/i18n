---
id: method-options
title: Opcje Metody
---

Opcje metod to opcje, które można ustawić dla każdej [metody](./methods). Jeśli opcja ma ten sam klucz co opcja ustawiona podczas tworzenia instancji pluginu, ta opcja metody nadpisze wartość opcji pluginu.

## Opcje Zapisu

### `disableBlinkingCursor`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `false`
-   **Wspierane:** Web, Hybrid App (Webview)

Włącz/Wyłącz "miganie" kursora we wszystkich elementach `input`, `textarea`, `[contenteditable]` w aplikacji. Jeśli ustawione na `true`, kursor zostanie ustawiony jako `transparent` przed wykonaniem zrzutu ekranu
i zresetowany po zakończeniu

### `disableCSSAnimation`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `false`
-   **Wspierane:** Web, Hybrid App (Webview)

Włącz/Wyłącz wszystkie animacje CSS w aplikacji. Jeśli ustawione na `true`, wszystkie animacje zostaną wyłączone przed wykonaniem zrzutu ekranu
i zresetowane po zakończeniu

### `enableLayoutTesting`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `false`
-   **Używane z:** Wszystkimi [metodami](./methods)
-   **Wspierane:** Web

Ta opcja ukryje cały tekst na stronie, więc tylko układ będzie używany do porównania. Ukrywanie zostanie wykonane przez dodanie stylu `'color': 'transparent !important'` do __każdego__ elementu.

Aby zobaczyć wynik, sprawdź [Test Output](./test-output#enablelayouttesting)

:::info
Używając tej flagi, każdy element zawierający tekst (nie tylko `p, h1, h2, h3, h4, h5, h6, span, a, li`, ale także `div|button|..`) otrzyma tę właściwość. Nie ma __żadnej__ opcji dostosowania tego.
:::

### `hideScrollBars`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `true`
-   **Używane z:** Wszystkimi [metodami](./methods)
-   **Wspierane:** Web, Hybrid App (Webview)

Ukryj paski przewijania w aplikacji. Jeśli ustawione na true, wszystkie paski przewijania zostaną wyłączone przed wykonaniem zrzutu ekranu. Domyślnie ustawione na `true`, aby zapobiec dodatkowym problemom.

### `hideElements`

-   **Typ:** `array`
-   **Obowiązkowe:** nie
-   **Używane z:** Wszystkimi [metodami](./methods)
-   **Wspierane:** Web, Hybrid App (Webview), Native App

Ta metoda może ukryć 1 lub wiele elementów, dodając właściwość `visibility: hidden` do nich poprzez dostarczenie tablicy elementów.

### `removeElements`

-   **Typ:** `array`
-   **Obowiązkowe:** nie
-   **Używane z:** Wszystkimi [metodami](./methods)
-   **Wspierane:** Web, Hybrid App (Webview), Native App

Ta metoda może _usunąć_ 1 lub wiele elementów, dodając właściwość `display: none` do nich poprzez dostarczenie tablicy elementów.

### `resizeDimensions`

-   **Typ:** `object`
-   **Obowiązkowe:** nie
-   **Domyślnie:** `{ top: 0, right: 0, bottom: 0, left: 0}`
-   **Używane z:** Tylko dla [`saveElement`](./methods#saveelement) lub [`checkElement`](./methods#checkelement)
-   **Wspierane:** Web, Hybrid App (Webview), Native App

Obiekt, który musi zawierać ilość pikseli `top`, `right`, `bottom` i `left`, które mają powiększyć wycięty element.

### `fullPageScrollTimeout`

-   **Typ:** `number`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `1500`
-   **Używane z:** Tylko dla [`saveFullPageScreen`](./methods#savefullpagescreen) lub [`saveTabbablePage`](./methods#savetabbablepage)
-   **Wspierane:** Web

Limit czasu w milisekundach, przez który należy czekać po przewinięciu. Może to pomóc w identyfikacji stron z leniwym ładowaniem.

### `hideAfterFirstScroll`

-   **Typ:** `array`
-   **Obowiązkowe:** nie
-   **Używane z:** Tylko dla [`saveFullPageScreen`](./methods#savefullpagescreen) lub [`saveTabbablePage`](./methods#savetabbablepage)
-   **Wspierane:** Web

Ta metoda ukryje jeden lub wiele elementów poprzez dodanie właściwości `visibility: hidden` do nich poprzez dostarczenie tablicy elementów.
Jest to przydatne, gdy strona zawiera na przykład elementy przyklejone, które będą przewijać się wraz ze stroną, ale dadzą nieprzyjemny efekt podczas wykonywania pełnego zrzutu ekranu strony.

### `waitForFontsLoaded`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `true`
-   **Używane z:** Wszystkimi [metodami](./methods)
-   **Wspierane:** Web, Hybrid App (Webview)

Czcionki, w tym czcionki firm trzecich, mogą być ładowane synchronicznie lub asynchronicznie. Ładowanie asynchroniczne oznacza, że czcionki mogą zostać załadowane po tym, jak WebdriverIO ustali, że strona została w pełni załadowana. Aby zapobiec problemom z renderowaniem czcionek, domyślnie ten moduł poczeka na załadowanie wszystkich czcionek przed wykonaniem zrzutu ekranu.

## Opcje Porównania (Sprawdzania)

Opcje porównania to opcje, które wpływają na sposób wykonywania porównania przez [ResembleJS](https://github.com/Huddle/Resemble.js).

:::info UWAGA

-   Wszystkie opcje z [Opcji Zapisu](#opcje-zapisu) mogą być używane dla metod Porównania
-   Wszystkie opcje porównania mogą być używane podczas tworzenia instancji usługi __lub__ dla każdej pojedynczej metody sprawdzania. Jeśli opcja metody ma ten sam klucz co opcja ustawiona podczas tworzenia instancji usługi, opcja porównania metody nadpisze wartość opcji porównania usługi.
- Wszystkie opcje mogą być używane dla:
    - Web
    - Hybrid App
    - Native App

:::

### `ignoreAlpha`

-   **Typ:** `boolean`
-   **Domyślnie:** `false`
-   **Obowiązkowe:** nie

Porównaj obrazy i pomiń kanał alfa.

### `blockOutSideBar`

-   **Typ:** `boolean`
-   **Domyślnie:** `true`
-   **Obowiązkowe:** nie
-   **Uwaga:** _Może być używane tylko dla `checkScreen()`. To jest **tylko dla iPada**_

Automatycznie blokuje pasek boczny dla iPadów w trybie poziomym podczas porównań. Zapobiega to błędom w natywnym komponencie karty/prywatnym/zakładki.

### `blockOutStatusBar`

-   **Typ:** `boolean`
-   **Domyślnie:** `true`
-   **Obowiązkowe:** nie
-   **Uwaga:** _To jest **tylko dla urządzeń mobilnych**_

Automatycznie blokuje pasek statusu i pasek adresu podczas porównań. Zapobiega to błędom związanym z czasem, WiFi lub stanem baterii.

### `blockOutToolBar`

-   **Typ:** `boolean`
-   **Domyślnie:** `true`
-   **Obowiązkowe:** nie
-   **Uwaga:** _To jest **tylko dla urządzeń mobilnych**_

Automatycznie blokuje pasek narzędzi.

### `ignoreAntialiasing`

-   **Typ:** `boolean`
-   **Domyślnie:** `false`
-   **Obowiązkowe:** nie

Porównaj obrazy i pomiń antyaliasing.

### `ignoreColors`

-   **Typ:** `boolean`
-   **Domyślnie:** `false`
-   **Obowiązkowe:** nie

Nawet jeśli obrazy są kolorowe, porównanie będzie porównywać 2 czarno-białe obrazy.

### `ignoreLess`

-   **Typ:** `boolean`
-   **Domyślnie:** `false`
-   **Obowiązkowe:** nie

Porównaj obrazy z parametrami `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

### `ignoreNothing`

-   **Typ:** `boolean`
-   **Domyślnie:** `false`
-   **Obowiązkowe:** nie

Porównaj obrazy z parametrami `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

### `rawMisMatchPercentage`

-   **Typ:** `boolean`
-   **Domyślnie:** `false`
-   **Obowiązkowe:** nie

Jeśli true, zwrócony procent będzie jak `0.12345678`, domyślnie jest `0.12`

### `returnAllCompareData`

-   **Typ:** `boolean`
-   **Domyślnie:** `false`
-   **Obowiązkowe:** nie

Zwróci wszystkie dane porównania, nie tylko procent niezgodności.

### `saveAboveTolerance`

-   **Typ:** `number`
-   **Domyślnie:** `0`
-   **Obowiązkowe:** nie

Dopuszczalna wartość `misMatchPercentage`, która zapobiega zapisywaniu obrazów z różnicami.

### `largeImageThreshold`

-   **Typ:** `number`
-   **Domyślnie:** `0`
-   **Obowiązkowe:** nie

Porównywanie dużych obrazów może prowadzić do problemów z wydajnością.
Gdy podana jest liczba pikseli (większa niż 0), algorytm porównania pomija piksele, gdy szerokość lub wysokość obrazu jest większa niż `largeImageThreshold` pikseli.

### `scaleImagesToSameSize`

-   **Typ:** `boolean`
-   **Domyślnie:** `false`
-   **Obowiązkowe:** nie

Skaluje 2 obrazy do tego samego rozmiaru przed wykonaniem porównania. Zdecydowanie zaleca się włączenie `ignoreAntialiasing` i `ignoreAlpha`

## Opcje folderów

Folder bazowy i foldery zrzutów ekranu (aktualny, różnica) to opcje, które można ustawić podczas tworzenia instancji pluginu lub metody. Aby ustawić opcje folderów dla konkretnej metody, przekaż opcje folderów do obiektu opcji metody. Można to używać dla:

- Web
- Hybrid App
- Native App

```ts
import path from 'node:path'

const methodOptions = {
    actualFolder: path.join(process.cwd(), 'customActual'),
    baselineFolder: path.join(process.cwd(), 'customBaseline'),
    diffFolder: path.join(process.cwd(), 'customDiff'),
}

// You can use this for all methods
await expect(
    await browser.checkFullPageScreen("checkFullPage", methodOptions)
).toEqual(0)
```

### `actualFolder`

-   **Typ:** `string`
-   **Obowiązkowe:** nie

Folder na zrzut ekranu, który został przechwycony w teście.

### `baselineFolder`

-   **Typ:** `string`
-   **Obowiązkowe:** nie

Folder dla obrazu bazowego, który jest używany do porównania.

### `diffFolder`

-   **Typ:** `string`
-   **Obowiązkowe:** nie

Folder na różnice obrazów generowane przez ResembleJS.