---
id: method-options
title: Opcje metod
description: "Ustawiaj dla poszczególnych metod testowania wizualnego opcje zapisu, porównywania i folderów, które nadpisują opcje na poziomie usługi."
---

Opcje metod to opcje, które można ustawić dla każdej [metody](./methods) z osobna. Jeśli opcja ma ten sam klucz co opcja ustawiona podczas inicjalizacji wtyczki, opcja metody nadpisze wartość opcji wtyczki.

:::info UWAGA

-   Wszystkie opcje z sekcji [Opcje zapisu](#save-options) mogą być używane z metodami [porównywania](#compare-check-options)
-   Wszystkie opcje porównywania mogą być używane podczas inicjalizacji usługi __lub__ dla każdej pojedynczej metody sprawdzającej. Jeśli opcja metody ma ten sam klucz co opcja ustawiona podczas inicjalizacji usługi, wówczas opcja porównywania metody nadpisze wartość opcji porównywania usługi.
- Wszystkie opcje mogą być używane w poniższych kontekstach aplikacji, chyba że zaznaczono inaczej:
    - Web
    - Aplikacja hybrydowa
    - Aplikacja natywna
- Poniższe przykłady wykorzystują metody `save*`, ale mogą być również używane z metodami `check*`

:::

# Opcje zapisu

## Wyświetlanie i renderowanie

---

### `hideScrollBars`

<Option type="boolean" default="true" required="No">

- **Używane z:** Wszystkimi [metodami](./methods)
- **Obsługiwane konteksty aplikacji:** Web, aplikacja hybrydowa (Webview)

Ukrywa pasek(paski) przewijania w aplikacji. Jeśli ustawiono na true, wszystkie paski przewijania zostaną wyłączone przed wykonaniem zrzutu ekranu. Domyślnie ustawione na `true`, aby zapobiec dodatkowym problemom.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideScrollBars: false
    }
)
```

</Option>
### `disableBlinkingCursor`

<Option type="boolean" default="false" required="No">

- **Używane z:** Wszystkimi [metodami](./methods)
- **Obsługiwane konteksty aplikacji:** Web, aplikacja hybrydowa (Webview)

Włącza/wyłącza „miganie” kursora we wszystkich elementach `input`, `textarea`, `[contenteditable]` w aplikacji. Jeśli ustawiono na `true`, kursor zostanie ustawiony na `transparent` przed wykonaniem zrzutu ekranu
i przywrócony po zakończeniu.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableBlinkingCursor: true
    }
)
```

</Option>
### `disableCSSAnimation`

<Option type="boolean" default="false" required="No">

- **Używane z:** Wszystkimi [metodami](./methods)
- **Obsługiwane konteksty aplikacji:** Web, aplikacja hybrydowa (Webview)

Włącza/wyłącza wszystkie animacje CSS w aplikacji. Jeśli ustawiono na `true`, wszystkie animacje zostaną wyłączone przed wykonaniem zrzutu ekranu
i przywrócone po zakończeniu

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableCSSAnimation: true
    }
)
```

</Option>
### `enableLayoutTesting`

<Option type="boolean" default="false" required="No">

- **Używane z:** Wszystkimi [metodami](./methods)
- **Obsługiwane konteksty aplikacji:** Web, aplikacja hybrydowa (Webview)

Ukrywa cały tekst na stronie, dzięki czemu do porównania używany będzie wyłącznie układ. Ukrywanie odbywa się poprzez dodanie stylu `'color': 'transparent !important'` do __każdego__ elementu.

Wynik można zobaczyć w sekcji [Wyniki testów](./test-output#enablelayouttesting).

:::info
Przy użyciu tej flagi każdy element zawierający tekst (czyli nie tylko `p, h1, h2, h3, h4, h5, h6, span, a, li`, ale także `div|button|..`) otrzyma tę właściwość. __Nie ma__ możliwości dostosowania tego zachowania.
:::

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLayoutTesting: true
    }
)
```

</Option>
### `enableLegacyScreenshotMethod`

<Option type="boolean" default="false" required="No">

- **Używane z:** Wszystkimi [metodami](./methods)
- **Obsługiwane konteksty aplikacji:** Web, aplikacja hybrydowa (Webview)

Użyj tej opcji, aby powrócić do „starszej” metody wykonywania zrzutów ekranu opartej na protokole W3C-WebDriver. Może to być pomocne, jeśli Twoje testy opierają się na istniejących obrazach bazowych lub jeśli działasz w środowiskach, które nie w pełni obsługują nowsze zrzuty ekranu oparte na BiDi.
Pamiętaj, że włączenie tej opcji może skutkować zrzutami ekranu o nieco innej rozdzielczości lub jakości.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLegacyScreenshotMethod: true
    }
)
```

</Option>
### `ignoreRegionPadding`

<Option type="number" default="1" required="No">

- **Używane z:** Wszystkimi [metodami](./methods)
- **Obsługiwane konteksty aplikacji:** Web, aplikacja hybrydowa (Webview)

Margines w pikselach urządzenia dodawany do każdej strony ignorowanych regionów, przez co każdy region staje się szerszy i wyższy o dwukrotność tej wartości. Pomaga to uniknąć różnic na granicach o wielkości 1 px, które mogą pojawiać się na wyświetlaczach o wysokim DPR lub przy użyciu protokołu zrzutów ekranu BiDi. Ustaw na `0`, aby wyłączyć.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        ignoreRegionPadding: 0
    }
)
```

</Option>
### `waitForFontsLoaded`

<Option type="boolean" default="true" required="No">

- **Używane z:** Wszystkimi [metodami](./methods)
- **Obsługiwane konteksty aplikacji:** Web, aplikacja hybrydowa (Webview)

Czcionki, w tym czcionki zewnętrzne, mogą być ładowane synchronicznie lub asynchronicznie. Ładowanie asynchroniczne oznacza, że czcionki mogą zostać załadowane po tym, jak WebdriverIO uzna, że strona została w pełni załadowana. Aby zapobiec problemom z renderowaniem czcionek, ten moduł domyślnie czeka na załadowanie wszystkich czcionek przed wykonaniem zrzutu ekranu.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        waitForFontsLoaded: true
    }
)
```

</Option>
## Widoczność elementów

---

### `hideElements`

<Option type="array" required="No">

- **Używane z:** Wszystkimi [metodami](./methods)
- **Obsługiwane konteksty aplikacji:** Web, aplikacja hybrydowa (Webview)

Ta metoda może ukryć jeden lub wiele elementów poprzez dodanie do nich właściwości `visibility: hidden`, przekazując tablicę elementów.

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

</Option>
### `removeElements`

<Option type="array" required="No">

- **Używane z:** Wszystkimi [metodami](./methods)
- **Obsługiwane konteksty aplikacji:** Web, aplikacja hybrydowa (Webview)

Ta metoda może _usunąć_ jeden lub wiele elementów poprzez dodanie do nich właściwości `display: none`, przekazując tablicę elementów.

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

</Option>
## Opcje specyficzne dla elementów

---

### `resizeDimensions`

<Option type="object" default={`{ top: 0, right: 0, bottom: 0, left: 0}`} required="No">

- **Używane z:** Tylko z [`saveElement`](./methods#saveelement) lub [`checkElement`](./methods#checkelement)
- **Obsługiwane konteksty aplikacji:** Web, aplikacja hybrydowa (Webview), aplikacja natywna

Obiekt, który musi zawierać liczbę pikseli `top`, `right`, `bottom` i `left`, o które ma zostać powiększony wycinek elementu.

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

</Option>
### `biDiOrigin`

<Option type="'document' | 'viewport'" default="'document'" required="No">

- **Używane z:** Tylko z [`saveElement`](./methods#saveelement) lub [`checkElement`](./methods#checkelement)
- **Obsługiwane konteksty aplikacji:** Web, aplikacja hybrydowa (Webview)

Opcja dostępna wyłącznie dla BiDi, która określa, jaki punkt odniesienia współrzędnych jest używany podczas wykonywania zrzutów ekranu elementów za pomocą protokołu WebDriver BiDi.

- `'document'` _(domyślnie)_: renderuje układ dokumentu. Działa dla dowolnej pozycji elementu, ale **nie** przechwytuje warstw kompozytowych (np. pasków przewijania, nakładek fixed/sticky, elementów z `will-change`).
- `'viewport'`: przechwytuje skomponowaną klatkę w takiej postaci, w jakiej została namalowana, łącznie z paskami przewijania i nakładkami. Wymaga, aby element był **w pełni widoczny** w obszarze widoku; zgłasza opisowy błąd, gdy element znajduje się poza obszarem widoku lub jest od niego większy.

```typescript
await browser.saveElement(
    await $('#my-element'),
    'sample-tag',
    {
        biDiOrigin: 'viewport'
    }
)
```

</Option>
## Opcje specyficzne dla całej strony

---

### `userBasedFullPageScreenshot`

<Option type="boolean" default="false" required="No">

- **Używane z:** Tylko z [`saveFullPageScreen`](./methods#savefullpagescreen), [`saveTabbablePage`](./methods#savetabbablepage), [`checkFullPageScreen`](./methods#checkfullpagescreen) lub [`checkTabbablePage`](./methods#checktabbablepage)
- **Obsługiwane konteksty aplikacji:** Web, aplikacja hybrydowa (Webview)

Po ustawieniu na `true` ta opcja włącza **strategię przewijania i łączenia** (scroll-and-stitch) do wykonywania zrzutów ekranu całej strony.
Zamiast korzystać z natywnych możliwości przeglądarki do wykonywania zrzutów ekranu, przewija ona stronę ręcznie i łączy wiele zrzutów ekranu w jeden.
Ta metoda jest szczególnie przydatna w przypadku stron z **leniwie ładowaną zawartością** (lazy loading) lub złożonymi układami, które wymagają przewijania, aby w pełni się wyrenderować.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        userBasedFullPageScreenshot: true
    }
)
```

</Option>
### `fullPageScrollTimeout`

<Option type="number" default="1500" required="No">

- **Używane z:** Tylko z [`saveFullPageScreen`](./methods#savefullpagescreen) lub [`saveTabbablePage`](./methods#savetabbablepage)
- **Obsługiwane konteksty aplikacji:** Web, aplikacja hybrydowa (Webview)

Czas oczekiwania w milisekundach po przewinięciu. Może to pomóc w przypadku stron z leniwym ładowaniem.

> **UWAGA:** Działa to tylko wtedy, gdy `userBasedFullPageScreenshot` jest ustawione na `true`

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        fullPageScrollTimeout: 3 * 1000
    }
)
```

</Option>
### `hideAfterFirstScroll`

<Option type="array" required="No">

- **Używane z:** Tylko z [`saveFullPageScreen`](./methods#savefullpagescreen) lub [`saveTabbablePage`](./methods#savetabbablepage)
- **Obsługiwane konteksty aplikacji:** Web, aplikacja hybrydowa (Webview)

Ta metoda ukryje jeden lub wiele elementów poprzez dodanie do nich właściwości `visibility: hidden`, przekazując tablicę elementów.
Jest to przydatne, gdy strona zawiera na przykład elementy przyklejone (sticky), które przewijają się razem ze stroną, ale powodują irytujący efekt podczas wykonywania zrzutu ekranu całej strony

> **UWAGA:** Działa to tylko wtedy, gdy `userBasedFullPageScreenshot` jest ustawione na `true`

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

# Opcje porównywania (Check)

Opcje porównywania to opcje, które wpływają na sposób wykonywania porównania.

</Option>
## Czułość wizualna

---

:::info Historia wersji opcji `ignore*`
Zachowanie tych ustawień predefiniowanych zmieniło się raz, jako zmiana niekompatybilna wstecz (breaking change), gdy silnik porównywania został zmieniony z ResembleJS (v9 i niższe) na Pixelmatch (v10 i wyższe). Szczegóły znajdziesz w [tabeli historii wersji](./compare-options#visual-sensitivity) na stronie Opcje porównywania. Wszystko od v10.0.0 jest oznaczone notatką „Od” przy odpowiedniej opcji poniżej.
:::

**Kolejność „ostatni wygrywa”:** gdy jednocześnie włączona jest więcej niż jedna flaga `ignore*`, stosowane jest tylko jedno ustawienie predefiniowane, zgodnie z następującą kolejnością (późniejsze wygrywa): `ignoreAlpha` → `ignoreAntialiasing` → `ignoreColors` → `ignoreLess` → `ignoreNothing`. Od wersji `v10.1.0` logowane jest ostrzeżenie wskazujące, które ustawienie wygrało.

### `ignoreColors`

<Option type="boolean" default="false" required="No">

- **Używane z:** Wszystkimi [metodami sprawdzającymi](./methods#check-methods)
- **Obsługiwane konteksty aplikacji:** Wszystkie
- **Od:** `v10.1.0`: porównanie wyłącznie jasności z użyciem wag luminancji resemble (`0.3/0.59/0.11`).

Porównuje wyłącznie jasność (wagi luminancji resemble `0.3/0.59/0.11`), ignorując różnice odcienia/koloru. Użyj tej opcji, gdy sam kolor może się zmieniać, ale nadal chcesz wychwytywać zmiany układu lub jasności.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreColors: true
    }
)
```

</Option>
### `ignoreAlpha`

<Option type="boolean" default="false" required="No">

- **Używane z:** Wszystkimi [metodami sprawdzającymi](./methods#check-methods)
- **Obsługiwane konteksty aplikacji:** Wszystkie
- **Od:** `v10.1.0`: stosuje własną regułę progu/AA niezależnie od innych flag `ignore*`.

Porównuje obrazy, pomijając różnice w kanale alfa. Użyj tej opcji, gdy renderowanie przezroczystości/krycia jest niestabilne, ale kolory pikseli pod spodem mają znaczenie.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAlpha: true
    }
)
```

</Option>
### `ignoreAntialiasing`

<Option type="boolean" default="true" required="No">

- **Używane z:** Wszystkimi [metodami sprawdzającymi](./methods#check-methods)
- **Obsługiwane konteksty aplikacji:** Wszystkie
- **Od:** `v10`: wartość domyślna zmieniona na `true` (w v9 i niższych było `false`).

Ignoruje piksele wygładzane (anti-aliasing) podczas porównywania. Ustaw na `false`, aby uzyskać ścisłe porównanie, w którym piksele wygładzane są liczone jako niezgodności. Rozwiązuje to najczęstsze źródło niestabilności testów wizualnych: krawędzie tekstu/kształtów renderowane z nieco innym wygładzaniem na różnych maszynach, mimo że nic się nie zmieniło.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAntialiasing: true
    }
)
```

</Option>
### `ignoreLess`

<Option type="boolean" default="false" required="No">

- **Używane z:** Wszystkimi [metodami sprawdzającymi](./methods#check-methods)
- **Obsługiwane konteksty aplikacji:** Wszystkie
- **Od:** `v10.1.0`: stosuje własną regułę progu/AA niezależnie od innych flag `ignore*`.

Porównuje obrazy z użyciem złagodzonej tolerancji RGB (~16/255 na kanał w przestrzeni YIQ). Wygładzanie nie jest ignorowane. Użyj tej opcji, aby uzyskać nieco swobody wobec szumu renderowania (artefakty kompresji, zaokrąglenia kolorów) bez ignorowania wygładzania.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreLess: true
    }
)
```

</Option>
### `ignoreNothing`

<Option type="boolean" default="false" required="No">

- **Używane z:** Wszystkimi [metodami sprawdzającymi](./methods#check-methods)
- **Obsługiwane konteksty aplikacji:** Wszystkie
- **Od:** `v10.1.0`: stosuje własną regułę progu/AA niezależnie od innych flag `ignore*`.

Stosuje zerową tolerancję: każda różnica pikseli jest liczona jako niezgodność, łącznie z wygładzaniem. Użyj tej opcji, gdy potrzebujesz dowodu z dokładnością co do piksela, że absolutnie nic się nie zmieniło.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreNothing: true
    }
)
```

</Option>
### `pixelmatch`

<Option type="object" default="undefined" required="No">

- **Używane z:** Wszystkimi [metodami sprawdzającymi](./methods#check-methods)
- **Obsługiwane konteksty aplikacji:** Wszystkie
- **Dodano w:** `v10.1.0`

Nadpisuje tryb porównywania dla pojedynczego wywołania `check*` bezpośrednimi ustawieniami [pixelmatch](https://github.com/mapbox/pixelmatch) (`threshold`, `includeAA`, `diffColor`, `aaColor`, `diffColorAlt`, `alpha`, `diffMask`, `checkerboard`) zamiast ustawienia predefiniowanego `ignore*`. Użyj tej opcji, gdy ustawienia predefiniowane są zbyt ogólne dla jednego konkretnego testu, np. potrzebuje on własnej wartości progu lub koloru różnic, który faktycznie wyróżnia się w raporcie. Pełny opis pól i problemów, które każde z nich rozwiązuje, znajdziesz w sekcji [Bezpośrednia kontrola pixelmatch](./compare-options#direct-pixelmatch-control).

Nie można jej łączyć z opcjami `ignore*` w tym samym obiekcie opcji wywołania: powoduje to zgłoszenie `CompareOptionsConflictError`. Może ona jednak nadpisać konfigurację usługi korzystającą z ustawień predefiniowanych `ignore*` (lub odwrotnie); gdy wywołanie metody zmienia w ten sposób tryb porównywania, logowane jest ostrzeżenie.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        pixelmatch: { threshold: 0.05 }
    }
)
```

</Option>
### `scaleImagesToSameSize`

<Option type="boolean" default="false" required="No">

- **Używane z:** Wszystkimi [metodami sprawdzającymi](./methods#check-methods)
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

</Option>
## Zasłanianie na urządzeniach mobilnych

---

### `blockOutStatusBar`

<Option type="boolean" default="true" required="No">

- **Używane z:** _Tylko na **urządzeniach mobilnych**_
- **Obsługiwane konteksty aplikacji:** Aplikacje hybrydowe (część natywna) i natywne

Automatycznie zasłania pasek stanu i pasek adresu podczas porównań. Zapobiega to błędom wynikającym z godziny, statusu Wi-Fi lub baterii.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutStatusBar: true
    }
)
```

</Option>
### `blockOutToolBar`

<Option type="boolean" default="true" required="No">

- **Używane z:** _Tylko na **urządzeniach mobilnych**_
- **Obsługiwane konteksty aplikacji:** Aplikacje hybrydowe (część natywna) i natywne

Automatycznie zasłania pasek narzędzi.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutToolBar: true
    }
)
```

</Option>
### `blockOutSideBar`

<Option type="boolean" default="true" required="No">

- **Używane z:** _Może być używane tylko z `checkScreen()`. Tylko na **iPadach**_
- **Obsługiwane konteksty aplikacji:** Wszystkie

Automatycznie zasłania pasek boczny na iPadach w trybie poziomym podczas porównań. Zapobiega to błędom związanym z natywnym komponentem kart/trybu prywatnego/zakładek.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutSideBar: true
    }
)
```

</Option>
## Obsługa regionów

---

### `blockOut`

<Option type="array" required="No">

- **Używane z:** Wszystkimi [metodami sprawdzającymi](./methods#check-methods)
- **Obsługiwane konteksty aplikacji:** Wszystkie

Tablica prostokątnych obszarów do zasłonięcia przed porównaniem. Każdy wpis musi być obiektem z wartościami `x`, `y`, `width` i `height` (w pikselach). Zasłonięte obszary są zamalowywane przed obliczeniem różnic, dzięki czemu te regiony nie wpływają na procent niezgodności.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOut: [
            { x: 0, y: 0, width: 100, height: 50 },
            { x: 300, y: 200, width: 80, height: 80 },
        ]
    }
)
```

</Option>
### `ignore`

<Option type="array" required="No">

- **Używane z:** Tylko z metodą `checkScreen`, **NIE** z metodą `checkElement`
- **Obsługiwane konteksty aplikacji:** Aplikacja natywna

Ta metoda automatycznie zasłoni elementy lub obszar na ekranie na podstawie tablicy elementów lub obiektu `x|y|width|height`.

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

</Option>
## Wyniki i raportowanie

---

### `rawMisMatchPercentage`

<Option type="boolean" default="false" required="No">

- **Używane z:** Wszystkimi [metodami sprawdzającymi](./methods#check-methods)
- **Obsługiwane konteksty aplikacji:** Wszystkie

Jeśli ustawiono na true, zwracany procent będzie miał postać `0.12345678`, domyślnie jest to `0.12`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        rawMisMatchPercentage: true
    }
)
```

</Option>
### `returnAllCompareData`

<Option type="boolean" default="false" required="No">

- **Używane z:** Wszystkimi [metodami sprawdzającymi](./methods#check-methods)
- **Obsługiwane konteksty aplikacji:** Wszystkie

Zwraca wszystkie dane porównania, a nie tylko procent niezgodności, zobacz także [Wynik w konsoli](./test-output#console-output-1)

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        returnAllCompareData: true
    }
)
```

</Option>
### `saveAboveTolerance`

<Option type="number" default="0" required="No">

- **Używane z:** Wszystkimi [metodami sprawdzającymi](./methods#check-methods)
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

</Option>
### `diffPixelBoundingBoxProximity`

<Option type="number" default="5" required="No">

- **Używane z:** Wszystkimi [metodami sprawdzającymi](./methods#check-methods)
- **Obsługiwane konteksty aplikacji:** Wszystkie

Odległość w pikselach używana do grupowania pikseli różnic w raportach JSON. Wyższe wartości grupują więcej pikseli w mniejszą liczbę obszarów ograniczających; niższe wartości dają dokładniejsze, ale liczniejsze obszary. Ma znaczenie tylko wtedy, gdy włączona jest opcja [`createJsonReportFiles`](/docs/visual-testing/service-options#createjsonreportfiles).

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        diffPixelBoundingBoxProximity: 10
    }
)
```

# Opcje folderów

---

Folder obrazów bazowych oraz foldery zrzutów ekranu (actual, diff) to opcje, które można ustawić podczas inicjalizacji wtyczki lub w metodzie. Aby ustawić opcje folderów dla konkretnej metody, przekaż opcje folderów do obiektu opcji metody. Można to wykorzystać w:

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

// Możesz użyć tego dla wszystkich metod
await expect(
    await browser.checkFullPageScreen("checkFullPage", methodOptions)
).toEqual(0)
```

</Option>
### `actualFolder`

<Option type="string" required="No" contexts="All">

Folder na zrzut ekranu wykonany podczas testu.

</Option>
### `baselineFolder`

<Option type="string" required="No" contexts="All">

Folder na obraz bazowy, z którym wykonywane jest porównanie.

</Option>
### `diffFolder`

<Option type="string" required="No" contexts="All">

Folder na obraz różnic wygenerowany podczas porównania.

</Option>