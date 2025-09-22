---
id: service-options
title: Opcje Serwisu
---

Service options to opcje, które można ustawić podczas tworzenia instancji serwisu i będą używane dla każdego wywołania metody.

```js
// wdio.conf.(js|ts)
export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // The options
            },
        ],
    ],
    // ...
};
```

## Opcje domyślne

### `addressBarShadowPadding`

-   **Typ:** `number`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `6`
-   **Wspierane konteksty aplikacji:** Web

Wypełnienie, które musi być dodane do paska adresu na iOS i Android, aby prawidłowo wyciąć obszar widoczny.

### `autoElementScroll`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `true`
-   **Wspierane konteksty aplikacji:** Web, Hybrid App (Webview)

Ta opcja pozwala wyłączyć automatyczne przewijanie elementu do widoku podczas tworzenia zrzutu ekranu elementu.

### `addIOSBezelCorners`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `false`
-   **Wspierane konteksty aplikacji:** Web, Hybrid App (Webview), Native App

Dodaj narożniki ramki i wycięcie/dynamiczną wyspę do zrzutu ekranu dla urządzeń iOS.

:::info UWAGA
Może to być zrobione tylko wtedy, gdy nazwa urządzenia **MOŻE** zostać automatycznie określona i pasuje do poniższej listy znormalizowanych nazw urządzeń. Normalizacja zostanie przeprowadzona przez ten moduł.
**iPhone:**

-   iPhone X: `iphonex`
-   iPhone XS: `iphonexs`
-   iPhone XS Max: `iphonexsmax`
-   iPhone XR: `iphonexr`
-   iPhone 11: `iphone11`
-   iPhone 11 Pro: `iphone11pro`
-   iPhone 11 Pro Max: `iphone11promax`
-   iPhone 12: `iphone12`
-   iPhone 12 Mini: `iphone12mini`
-   iPhone 12 Pro: `iphone12pro`
-   iPhone 12 Pro Max: `iphone12promax`
-   iPhone 13: `iphone13`
-   iPhone 13 Mini: `iphone13mini`
-   iPhone 13 Pro: `iphone13pro`
-   iPhone 13 Pro Max: `iphone13promax`
-   iPhone 14: `iphone14`
-   iPhone 14 Plus: `iphone14plus`
-   iPhone 14 Pro: `iphone14pro`
-   iPhone 14 Pro Max: `iphone14promax`
    **iPady:**
-   iPad Mini 6th Generation: `ipadmini`
-   iPad Air 4th Generation: `ipadair`
-   iPad Air 5th Generation: `ipadair`
-   iPad Pro (11-inch) 1st Generation: `ipadpro11`
-   iPad Pro (11-inch) 2nd Generation: `ipadpro11`
-   iPad Pro (11-inch) 3rd Generation: `ipadpro11`
-   iPad Pro (12.9-inch) 3rd Generation: `ipadpro129`
-   iPad Pro (12.9-inch) 4th Generation: `ipadpro129`
-   iPad Pro (12.9-inch) 5th Generation: `ipadpro129`

:::

### `autoSaveBaseline`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `true`
-   **Wspierane konteksty aplikacji:** Web, Hybrid App (Webview), Native App

Jeśli podczas porównania nie zostanie znaleziony obraz bazowy, obraz jest automatycznie kopiowany do folderu bazowego.

### `baselineFolder`

-   **Typ:** `string|()=> string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `.path/to/testfile/__snapshots__/`
-   **Wspierane konteksty aplikacji:** Web, Hybrid App (Webview), Native App

Katalog, który będzie przechowywał wszystkie obrazy bazowe używane podczas porównania. Jeśli nie jest ustawiony, zostanie użyta domyślna wartość, która zapisze pliki w folderze `__snapshots__/` obok specyfikacji wykonującej testy wizualne. Można również użyć funkcji zwracającej `string`, aby ustawić wartość `baselineFolder`:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// LUB
{
    baselineFolder: () => {
        // Wykonaj jakąś magię tutaj
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `false`
-   **Wspierane konteksty aplikacji:** Web, Hybrid App (Webview), Native App

Usuń folder środowiska wykonawczego (`actual` i `diff`) podczas inicjalizacji

:::info UWAGA
To zadziała tylko wtedy, gdy [`screenshotPath`](#screenshotpath) jest ustawione w opcjach wtyczki i **NIE ZADZIAŁA**, gdy ustawisz foldery w metodach
:::

### `createJsonReportFiles` **(NOWOŚĆ)**

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `false`

Masz teraz możliwość eksportowania wyników porównania do pliku raportu JSON. Podając opcję `createJsonReportFiles: true`, każdy porównywany obraz utworzy raport przechowywany w folderze `actual`, obok każdego wyniku obrazu `actual`. Wynik będzie wyglądał następująco:

```json
{
    "parent": "check methods",
    "test": "should fail comparing with a baseline",
    "tag": "examplePageFail",
    "instanceData": {
        "browser": {
            "name": "chrome-headless-shell",
            "version": "126.0.6478.183"
        },
        "platform": {
            "name": "mac",
            "version": "not-known"
        }
    },
    "commandName": "checkScreen",
    "boundingBoxes": {
        "diffBoundingBoxes": [
            {
                "left": 1088,
                "top": 717,
                "right": 1186,
                "bottom": 730
            }
            //....
        ],
        "ignoredBoxes": [
            {
                "left": 159,
                "top": 652,
                "right": 356,
                "bottom": 703
            }
            //...
        ]
    },
    "fileData": {
        "actualFilePath": "/Users/wdio/visual-testing/.tmp/actual/desktop_chrome-headless-shellexamplePageFail-local-chrome-latest-1366x768.png",
        "baselineFilePath": "/Users/wdio/visual-testing/localBaseline/desktop_chrome-headless-shellexamplePageFail-local-chrome-latest-1366x768.png",
        "diffFilePath": "/Users/wdio/visual-testing/.tmp/diff/desktop_chrome-headless-shell/examplePageFail-local-chrome-latest-1366x768png",
        "fileName": "examplePageFail-local-chrome-latest-1366x768.png",
        "size": {
            "actual": {
                "height": 768,
                "width": 1366
            },
            "baseline": {
                "height": 768,
                "width": 1366
            },
            "diff": {
                "height": 768,
                "width": 1366
            }
        }
    },
    "misMatchPercentage": "12.90",
    "rawMisMatchPercentage": 12.900729014153246
}
```

Po wykonaniu wszystkich testów, nowy plik JSON z kolekcją porównań zostanie wygenerowany i można go znaleźć w katalogu głównym folderu `actual`. Dane są pogrupowane według:

-   `describe` dla Jasmine/Mocha lub `Feature` dla CucumberJS
-   `it` dla Jasmine/Mocha lub `Scenario` dla CucumberJS
    a następnie posortowane według:
-   `commandName`, czyli nazw metod porównawczych używanych do porównywania obrazów
-   `instanceData`, najpierw przeglądarka, potem urządzenie, następnie platforma
    będzie to wyglądać tak

```json
[
    {
        "description": "check methods",
        "data": [
            {
                "test": "should fail comparing with a baseline",
                "data": [
                    {
                        "tag": "examplePageFail",
                        "instanceData": {},
                        "commandName": "checkScreen",
                        "framework": "mocha",
                        "boundingBoxes": {
                            "diffBoundingBoxes": [],
                            "ignoredBoxes": []
                        },
                        "fileData": {},
                        "misMatchPercentage": "14.34",
                        "rawMisMatchPercentage": 14.335403703025868
                    },
                    {
                        "tag": "exampleElementFail",
                        "instanceData": {},
                        "commandName": "checkElement",
                        "framework": "mocha",
                        "boundingBoxes": {
                            "diffBoundingBoxes": [],
                            "ignoredBoxes": []
                        },
                        "fileData": {},
                        "misMatchPercentage": "1.34",
                        "rawMisMatchPercentage": 1.335403703025868
                    }
                ]
            }
        ]
    }
]
```

Dane raportu dadzą Ci możliwość zbudowania własnego raportu wizualnego bez konieczności wykonywania całej magii i samodzielnego zbierania danych.

:::info UWAGA
Musisz używać `@wdio/visual-testing` w wersji `5.2.0` lub wyższej
:::

### `disableBlinkingCursor`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `false`
-   **Wspierane konteksty aplikacji:** Web, Hybrid App (Webview)

Włącza/Wyłącza "miganie" kursora we wszystkich `input`, `textarea`, `[contenteditable]` w aplikacji. Jeśli ustawione na `true`, kursor zostanie ustawiony na `transparent` przed wykonaniem zrzutu ekranu i zresetowany po zakończeniu

### `disableCSSAnimation`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `false`
-   **Wspierane konteksty aplikacji:** Web, Hybrid App (Webview)

Włącza/Wyłącza wszystkie animacje CSS w aplikacji. Jeśli ustawione na `true`, wszystkie animacje zostaną wyłączone przed wykonaniem zrzutu ekranu i zresetowane po zakończeniu

### `enableLayoutTesting`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `false`
-   **Wspierane konteksty aplikacji:** Web

Ukryje cały tekst na stronie, więc do porównania zostanie użyty tylko układ. Ukrywanie będzie dokonane przez dodanie stylu `'color': 'transparent !important'` do **każdego** elementu.

Zobacz wynik w [Test Output](/docs/visual-testing/test-output#enablelayouttesting)

:::info
Używając tej flagi, każdy element zawierający tekst (więc nie tylko `p, h1, h2, h3, h4, h5, h6, span, a, li`, ale również `div|button|..`) otrzyma tę właściwość. Nie ma opcji dostosowania tego.
:::

### `formatImageName`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **Wspierane konteksty aplikacji:** Web, Hybrid App (Webview), Native App

Nazwę zapisanych obrazów można dostosować, przekazując parametr `formatImageName` z ciągiem formatu, jak:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

Następujące zmienne można przekazać do formatowania ciągu i zostaną automatycznie odczytane z możliwości instancji.
Jeśli nie można ich określić, zostaną użyte wartości domyślne.

-   `browserName`: Nazwa przeglądarki z dostarczonych możliwości
-   `browserVersion`: Wersja przeglądarki podana w możliwościach
-   `deviceName`: Nazwa urządzenia z możliwości
-   `dpr`: Współczynnik pikseli urządzenia
-   `height`: Wysokość ekranu
-   `logName`: Nazwa dziennika z możliwości
-   `mobile`: Dodaje `_app` lub nazwę przeglądarki po `deviceName`, aby odróżnić zrzuty ekranu aplikacji od zrzutów ekranu przeglądarki
-   `platformName`: Nazwa platformy w dostarczonych możliwościach
-   `platformVersion`: Wersja platformy podana w możliwościach
-   `tag`: Tag dostarczony w wywoływanej metodzie
-   `width`: Szerokość ekranu

:::info

Nie możesz podać niestandardowych ścieżek/folderów w `formatImageName`. Jeśli chcesz zmienić ścieżkę, sprawdź zmianę następujących opcji:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) dla każdej metody

:::

### `fullPageScrollTimeout`

-   **Typ:** `number`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `1500`
-   **Wspierane konteksty aplikacji:** Web

Czas oczekiwania w milisekundach po przewinięciu. Może to pomóc w identyfikacji stron z leniwym ładowaniem.

:::info

To zadziała tylko wtedy, gdy opcja serwisu/metody `userBasedFullPageScreenshot` jest ustawiona na `true`, zobacz także [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)

:::

### `hideScrollBars`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `true`
-   **Wspierane konteksty aplikacji:** Web, Hybrid App (Webview)

Ukryj paski przewijania w aplikacji. Jeśli ustawione na true, wszystkie paski przewijania zostaną wyłączone przed wykonaniem zrzutu ekranu. Jest to domyślnie ustawione na `true`, aby zapobiec dodatkowym problemom.

### `logLevel`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `info`
-   **Wspierane konteksty aplikacji:** Web, Hybrid App (Webview), Native App

Dodaje dodatkowe logi, opcje to `debug | info | warn | silent`

Błędy są zawsze zapisywane w konsoli.

### `savePerInstance`

-   **Typ:** `boolean`
-   **Domyślnie:** `false`
-   **Obowiązkowe:** nie
-   **Wspierane konteksty aplikacji:** Web, Hybrid App (Webview), Native App

Zapisuj obrazy dla każdej instancji w osobnym folderze, np. wszystkie zrzuty ekranu Chrome będą zapisywane w folderze Chrome, takim jak `desktop_chrome`.

### `screenshotPath`

-   **Typ:** `string | () => string`
-   **Domyślnie:** `.tmp/`
-   **Obowiązkowe:** nie
-   **Wspierane konteksty aplikacji:** Web, Hybrid App (Webview), Native App

Katalog, który będzie przechowywał wszystkie aktualne/różne zrzuty ekranu. Jeśli nie jest ustawiony, zostanie użyta wartość domyślna. Funkcja, która
zwraca ciąg znaków, może być również używana do ustawienia wartości screenshotPath:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// LUB
{
    screenshotPath: () => {
        // Wykonaj jakąś magię tutaj
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **Typ:** `number`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `6` dla Androida i `15` dla iOS (`6` domyślnie i `9` zostanie dodane automatycznie dla możliwego paska domowego w iPhone'ach z wycięciem lub iPadach z paskiem domowym)
-   **Wspierane konteksty aplikacji:** Web

Wypełnienie, które musi być dodane do paska narzędzi na iOS i Androidzie, aby prawidłowo wyciąć obszar widoczny.

### `userBasedFullPageScreenshot`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `false`
-   **Wspierane konteksty aplikacji:** Web, Hybrid App (Webview) **Wprowadzone w visual-service@7.0.0**

Domyślnie, pełnoekranowe zrzuty ekranu na pulpicie web są przechwytywane za pomocą protokołu WebDriver BiDi, który umożliwia szybkie, stabilne i spójne zrzuty ekranu bez przewijania.
Gdy userBasedFullPageScreenshot jest ustawione na true, proces tworzenia zrzutu ekranu symuluje rzeczywistego użytkownika: przewija stronę, przechwytuje zrzuty ekranu o rozmiarze okna i łączy je razem. Ta metoda jest przydatna dla stron z leniwie ładowaną zawartością lub dynamicznym renderowaniem, które zależy od pozycji przewijania.

Użyj tej opcji, jeśli Twoja strona opiera się na ładowaniu treści podczas przewijania lub jeśli chcesz zachować zachowanie starszych metod tworzenia zrzutów ekranu.

### `waitForFontsLoaded`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `true`
-   **Wspierane konteksty aplikacji:** Web, Hybrid App (Webview)

Czcionki, w tym czcionki zewnętrzne, mogą być ładowane synchronicznie lub asynchronicznie. Asynchroniczne ładowanie oznacza, że czcionki mogą być ładowane po tym, jak WebdriverIO określi, że strona została w pełni załadowana. Aby zapobiec problemom z renderowaniem czcionek, ten moduł domyślnie poczeka na załadowanie wszystkich czcionek przed wykonaniem zrzutu ekranu.

## Opcje nawigacji tabulatorem

:::info UWAGA

Ten moduł obsługuje również rysowanie sposobu, w jaki użytkownik używałby klawiatury do _nawigacji_ przez stronę, rysując linie i kropki od elementu dostępnego przez tabulację do elementu dostępnego przez tabulację.<br/>
Praca została zainspirowana postem na blogu [Viv Richards](https://github.com/vivrichards600) o ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br/>
Sposób, w jaki elementy dostępne przez tabulację są wybierane, opiera się na module [tabbable](https://github.com/davidtheclark/tabbable). Jeśli występują jakiekolwiek problemy związane z nawigacją tabulatorem, sprawdź [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) i szczególnie sekcję [More details](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

### `tabbableOptions`

-   **Typ:** `object`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) dla wszystkich wartości domyślnych
-   **Wspierane konteksty aplikacji:** Web

Opcje, które można zmienić dla linii i kropek, jeśli używasz metod `{save|check}Tabbable`. Opcje są wyjaśnione poniżej.

#### `tabbableOptions.circle`

-   **Typ:** `object`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) dla wszystkich wartości domyślnych
-   **Wspierane konteksty aplikacji:** Web

Opcje zmiany koła.

##### `tabbableOptions.circle.backgroundColor`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) dla wszystkich wartości domyślnych
-   **Wspierane konteksty aplikacji:** Web

Kolor tła koła.

##### `tabbableOptions.circle.borderColor`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) dla wszystkich wartości domyślnych
-   **Wspierane konteksty aplikacji:** Web

Kolor obramowania koła.

##### `tabbableOptions.circle.borderWidth`

-   **Typ:** `number`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) dla wszystkich wartości domyślnych
-   **Wspierane konteksty aplikacji:** Web

Szerokość obramowania koła.

##### `tabbableOptions.circle.fontColor`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) dla wszystkich wartości domyślnych
-   **Wspierane konteksty aplikacji:** Web

Kolor czcionki tekstu w kole. Będzie to pokazane tylko jeśli [`showNumber`](./#tabbableoptionscircleshownumber) jest ustawione na `true`.

##### `tabbableOptions.circle.fontFamily`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) dla wszystkich wartości domyślnych
-   **Wspierane konteksty aplikacji:** Web

Rodzina czcionki tekstu w kole. Będzie to pokazane tylko jeśli [`showNumber`](./#tabbableoptionscircleshownumber) jest ustawione na `true`.

Upewnij się, że ustawiasz czcionki, które są obsługiwane przez przeglądarki.

##### `tabbableOptions.circle.fontSize`

-   **Typ:** `number`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) dla wszystkich wartości domyślnych
-   **Wspierane konteksty aplikacji:** Web

Rozmiar czcionki tekstu w kole. Będzie to pokazane tylko jeśli [`showNumber`](./#tabbableoptionscircleshownumber) jest ustawione na `true`.

##### `tabbableOptions.circle.size`

-   **Typ:** `number`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) dla wszystkich wartości domyślnych
-   **Wspierane konteksty aplikacji:** Web

Rozmiar koła.

##### `tabbableOptions.circle.showNumber`

-   **Typ:** `showNumber`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) dla wszystkich wartości domyślnych
-   **Wspierane konteksty aplikacji:** Web

Pokaż numer sekwencji tabulacji w kole.

#### `tabbableOptions.line`

-   **Typ:** `object`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) dla wszystkich wartości domyślnych
-   **Wspierane konteksty aplikacji:** Web

Opcje zmiany linii.

##### `tabbableOptions.line.color`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) dla wszystkich wartości domyślnych
-   **Wspierane konteksty aplikacji:** Web

Kolor linii.

##### `tabbableOptions.line.width`

-   **Typ:** `number`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) dla wszystkich wartości domyślnych
-   **Wspierane konteksty aplikacji:** Web

Szerokość linii.

## Opcje porównywania

### `compareOptions`

-   **Typ:** `object`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) dla wszystkich wartości domyślnych
-   **Wspierane konteksty aplikacji:** Web, Hybrid App (Webview), Native App (Zobacz [Opcje porównywania metod](./method-options#compare-check-options) dla większej ilości informacji)

Opcje porównywania mogą być również ustawione jako opcje serwisu, są one opisane w [Opcje porównywania metod](/docs/visual-testing/method-options#compare-check-options)