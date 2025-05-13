---
id: method-options
title: Opcje Metod
---

Opcje metod to opcje, które można ustawić dla każdej [metody](./methods). Jeśli opcja ma taki sam klucz jak opcja ustawiona podczas instancjonowania wtyczki, ta opcja metody zastąpi wartość opcji wtyczki.

## Opcje Zapisywania

### `disableBlinkingCursor`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `false`
-   **Obsługiwane przez:** Web, Hybrid App (Webview)

Włącza/Wyłącza "miganie" kursora we wszystkich elementach `input`, `textarea`, `[contenteditable]` w aplikacji. Jeśli ustawiono na `true`, kursor zostanie ustawiony jako `transparent` przed wykonaniem zrzutu ekranu
i przywrócony po zakończeniu

### `disableCSSAnimation`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `false`
-   **Obsługiwane przez:** Web, Hybrid App (Webview)

Włącza/Wyłącza wszystkie animacje CSS w aplikacji. Jeśli ustawiono na `true`, wszystkie animacje zostaną wyłączone przed wykonaniem zrzutu ekranu
i przywrócone po zakończeniu

### `enableLegacyScreenshotMethod`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `false`
-   **Obsługiwane przez:** Web, Hybrid App (Webview)

Użyj tej opcji, aby powrócić do "starszej" metody zrzutów ekranu opartej na protokole W3C-WebDriver. Może to być pomocne, jeśli Twoje testy opierają się na istniejących obrazach bazowych lub jeśli pracujesz w środowiskach, które nie w pełni obsługują nowsze zrzuty ekranu oparte na BiDi.
Pamiętaj, że włączenie tego może generować zrzuty ekranu o nieco innej rozdzielczości lub jakości.

### `enableLayoutTesting`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `false`
-   **Używane z:** Wszystkie [metody](./methods)
-   **Obsługiwane przez:** Web

Ukryje cały tekst na stronie, dzięki czemu do porównania będzie używany tylko układ. Ukrywanie będzie realizowane przez dodanie stylu `'color': 'transparent !important'` do __każdego__ elementu.

Aby zobaczyć wynik, przejdź do [Test Output](./test-output#enablelayouttesting)

:::info
Używając tej flagi, każdy element zawierający tekst (nie tylko `p, h1, h2, h3, h4, h5, h6, span, a, li`, ale także `div|button|..`) otrzyma tę właściwość. __Nie ma__ opcji dostosowania tego.
:::

### `hideScrollBars`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `true`
-   **Używane z:** Wszystkie [metody](./methods)
-   **Obsługiwane przez:** Web, Hybrid App (Webview)

Ukrywa paski przewijania w aplikacji. Jeśli ustawiono na true, wszystkie paski przewijania zostaną wyłączone przed wykonaniem zrzutu ekranu. Domyślnie ustawione na `true`, aby zapobiec dodatkowym problemom.

### `hideElements`

-   **Typ:** `array`
-   **Obowiązkowe:** nie
-   **Używane z:** Wszystkie [metody](./methods)
-   **Obsługiwane przez:** Web, Hybrid App (Webview), Native App

Ta metoda może ukryć jeden lub wiele elementów, dodając do nich właściwość `visibility: hidden`, poprzez dostarczenie tablicy elementów.

### `removeElements`

-   **Typ:** `array`
-   **Obowiązkowe:** nie
-   **Używane z:** Wszystkie [metody](./methods)
-   **Obsługiwane przez:** Web, Hybrid App (Webview), Native App

Ta metoda może _usunąć_ jeden lub wiele elementów, dodając do nich właściwość `display: none`, poprzez dostarczenie tablicy elementów.

### `resizeDimensions`

-   **Typ:** `object`
-   **Obowiązkowe:** nie
-   **Domyślnie:** `{ top: 0, right: 0, bottom: 0, left: 0}`
-   **Używane z:** Tylko dla [`saveElement`](./methods#saveelement) lub [`checkElement`](./methods#checkelement)
-   **Obsługiwane przez:** Web, Hybrid App (Webview), Native App

Obiekt, który musi zawierać liczbę pikseli `top`, `right`, `bottom` i `left`, które mają powiększyć wycięty element.

### `userBasedFullPageScreenshot`

* **Typ:** `boolean`
* **Obowiązkowe:** Nie
* **Domyślnie:** `false`
* **Obsługiwane przez:** Web, Hybrid App (Webview)

Gdy ustawione na `true`, ta opcja włącza **strategię przewijania i łączenia** do tworzenia zrzutów pełnej strony.
Zamiast korzystać z natywnych możliwości zrzutu ekranu przeglądarki, ręcznie przewija stronę i łączy wiele zrzutów ekranu.
Ta metoda jest szczególnie przydatna dla stron z **zawartością ładowaną leniwie** lub złożonymi układami, które wymagają przewijania, aby w pełni się wyświetlić.

### `fullPageScrollTimeout`

-   **Typ:** `number`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `1500`
-   **Używane z:** Tylko dla [`saveFullPageScreen`](./methods#savefullpagescreen) lub [`saveTabbablePage`](./methods#savetabbablepage)
-   **Obsługiwane przez:** Web

Limit czasu w milisekundach do oczekiwania po przewinięciu. Może to pomóc w identyfikacji stron z leniwym ładowaniem.

> **UWAGA:** Działa tylko gdy `userBasedFullPageScreenshot` jest ustawione na `true`

### `hideAfterFirstScroll`

-   **Typ:** `array`
-   **Obowiązkowe:** nie
-   **Używane z:** Tylko dla [`saveFullPageScreen`](./methods#savefullpagescreen) lub [`saveTabbablePage`](./methods#savetabbablepage)
-   **Obsługiwane przez:** Web

Ta metoda ukryje jeden lub wiele elementów, dodając właściwość `visibility: hidden` poprzez dostarczenie tablicy elementów.
Jest to przydatne, gdy strona zawiera na przykład przyklejone elementy, które przewijają się razem ze stroną, ale dają irytujący efekt przy tworzeniu zrzutu pełnej strony.

> **UWAGA:** Działa tylko gdy `userBasedFullPageScreenshot` jest ustawione na `true`

### `waitForFontsLoaded`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `true`
-   **Używane z:** Wszystkie [metody](./methods)
-   **Obsługiwane przez:** Web, Hybrid App (Webview)

Czcionki, w tym czcionki firm trzecich, mogą być ładowane synchronicznie lub asynchronicznie. Ładowanie asynchroniczne oznacza, że czcionki mogą załadować się po tym, jak WebdriverIO określi, że strona została w pełni załadowana. Aby zapobiec problemom z renderowaniem czcionek, ten moduł domyślnie będzie czekał na załadowanie wszystkich czcionek przed wykonaniem zrzutu ekranu.

## Opcje Porównywania (Sprawdzania)

Opcje porównywania to opcje, które wpływają na sposób wykonywania porównania przez [ResembleJS](https://github.com/Huddle/Resemble.js).

:::info UWAGA

-   Wszystkie opcje z [Opcji Zapisywania](#opcje-zapisywania) mogą być używane dla metod porównywania
-   Wszystkie opcje porównywania mogą być używane podczas inicjalizacji usługi __lub__ dla każdej pojedynczej metody sprawdzania. Jeśli opcja metody ma taki sam klucz jak opcja ustawiona podczas inicjalizacji usługi, wówczas opcja porównywania metody zastąpi wartość opcji porównywania usługi.
- Wszystkie opcje mogą być używane dla:
    - Web
    - Hybrid App
    - Native App

:::

### `ignoreAlpha`

-   **Typ:** `boolean`
-   **Domyślnie:** `false`
-   **Obowiązkowe:** nie

Porównuje obrazy i pomija kanał alfa.

### `blockOutSideBar`

-   **Typ:** `boolean`
-   **Domyślnie:** `true`
-   **Obowiązkowe:** nie
-   **Uwaga:** _Może być używane tylko dla `checkScreen()`. Dotyczy to **tylko iPada**_

Automatycznie blokuje pasek boczny dla iPadów w trybie poziomym podczas porównań. Zapobiega to błędom na natywnym komponencie karty/prywatnym/zakładki.

### `blockOutStatusBar`

-   **Typ:** `boolean`
-   **Domyślnie:** `true`
-   **Obowiązkowe:** nie
-   **Uwaga:** _Dotyczy to **tylko urządzeń mobilnych**_

Automatycznie blokuje pasek stanu i pasek adresu podczas porównań. Zapobiega to błędom związanym z czasem, statusem WiFi lub baterii.

### `blockOutToolBar`

-   **Typ:** `boolean`
-   **Domyślnie:** `true`
-   **Obowiązkowe:** nie
-   **Uwaga:** _Dotyczy to **tylko urządzeń mobilnych**_

Automatycznie blokuje pasek narzędzi.

### `ignoreAntialiasing`

-   **Typ:** `boolean`
-   **Domyślnie:** `false`
-   **Obowiązkowe:** nie

Porównuje obrazy i pomija antyaliasing.

### `ignoreColors`

-   **Typ:** `boolean`
-   **Domyślnie:** `false`
-   **Obowiązkowe:** nie

Nawet jeśli obrazy są kolorowe, porównanie będzie porównywać 2 czarno-białe obrazy.

### `ignoreLess`

-   **Typ:** `boolean`
-   **Domyślnie:** `false`
-   **Obowiązkowe:** nie

Porównuje obrazy z parametrami `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

### `ignoreNothing`

-   **Typ:** `boolean`
-   **Domyślnie:** `false`
-   **Obowiązkowe:** nie

Porównuje obrazy z parametrami `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

### `rawMisMatchPercentage`

-   **Typ:** `boolean`
-   **Domyślnie:** `false`
-   **Obowiązkowe:** nie

Jeśli true, zwracana wartość procentowa będzie w formacie `0.12345678`, domyślnie jest `0.12`

### `returnAllCompareData`

-   **Typ:** `boolean`
-   **Domyślnie:** `false`
-   **Obowiązkowe:** nie

Zwraca wszystkie dane porównania, nie tylko procent niezgodności.

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
Podając liczbę pikseli (większą niż 0), algorytm porównawczy pomija piksele, gdy szerokość lub wysokość obrazu jest większa niż `largeImageThreshold` pikseli.

### `scaleImagesToSameSize`

-   **Typ:** `boolean`
-   **Domyślnie:** `false`
-   **Obowiązkowe:** nie

Skaluje 2 obrazy do tego samego rozmiaru przed wykonaniem porównania. Zdecydowanie zaleca się włączenie `ignoreAntialiasing` i `ignoreAlpha`

## Opcje folderów

Folder bazowy i foldery zrzutów ekranu (aktualny, różnicowy) to opcje, które można ustawić podczas instancjowania wtyczki lub metody. Aby ustawić opcje folderów dla konkretnej metody, przekaż opcje folderów do obiektu opcji metody. Można to wykorzystać dla:

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

// Możesz użyć tego dla wszystkich metod
await expect(
    await browser.checkFullPageScreen("checkFullPage", methodOptions)
).toEqual(0)
```

### `actualFolder`

-   **Typ:** `string`
-   **Obowiązkowe:** nie

Folder dla zrzutu ekranu, który został przechwycony w teście.

### `baselineFolder`

-   **Typ:** `string`
-   **Obowiązkowe:** nie

Folder dla obrazu bazowego, który jest używany do porównania.

### `diffFolder`

-   **Typ:** `string`
-   **Obowiązkowe:** nie

Folder dla obrazu różnicowego generowanego przez ResembleJS.