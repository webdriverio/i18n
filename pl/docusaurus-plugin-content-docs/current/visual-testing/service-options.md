---
id: service-options
title: Opcje Usługi
---

Opcje usługi to opcje, które można ustawić podczas tworzenia instancji usługi i będą używane dla każdego wywołania metody.

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

## Domyślne Opcje

### `addressBarShadowPadding`

-   **Typ:** `number`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `6`
-   **Wspierane:** Web

Padding, który musi być dodany do paska adresu na iOS i Android, aby poprawnie wyciąć viewport.

### `autoElementScroll`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `true`
-   **Wspierane:** Web, Hybrid App (Webview)

Ta opcja pozwala wyłączyć automatyczne przewijanie elementu do widoku podczas tworzenia zrzutu ekranu elementu.

### `addIOSBezelCorners`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `false`
-   **Wspierane:** Web, Hybrid App (Webview), Native App

Dodaj narożniki ramki i wcięcie/dynamiczną wyspę do zrzutu ekranu dla urządzeń iOS.

:::info UWAGA
To może być zrobione tylko wtedy, gdy nazwa urządzenia **MOŻE** być automatycznie określona i pasuje do następującej listy znormalizowanych nazw urządzeń. Normalizacja zostanie wykonana przez ten moduł.
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
    **iPads:**
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
-   **Wspierane:** Web, Hybrid App (Webview), Native App

Jeśli podczas porównania nie zostanie znaleziony obraz bazowy, obraz jest automatycznie kopiowany do folderu bazowego.

### `baselineFolder`

-   **Typ:** `string|()=> string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `.path/to/testfile/__snapshots__/`
-   **Wspierane:** Web, Hybrid App (Webview), Native App

Katalog, który będzie zawierał wszystkie obrazy bazowe używane podczas porównania. Jeśli nie jest ustawiony, zostanie użyta domyślna wartość, która przechowa pliki w folderze `__snapshots__/` obok specyfikacji, która wykonuje testy wizualne. Funkcja zwracająca `string` może być również użyta do ustawienia wartości `baselineFolder`:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// LUB
{
    baselineFolder: () => {
        // Tu wykonaj magię
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `false`
-   **Wspierane:** Web, Hybrid App (Webview), Native App

Usuń folder runtime (`actual` & `diff`) podczas inicjalizacji

:::info UWAGA
To zadziała tylko wtedy, gdy [`screenshotPath`](#screenshotpath) jest ustawione w opcjach wtyczki i **NIE ZADZIAŁA**, gdy ustawisz foldery w metodach
:::

### `createJsonReportFiles` **(NOWE)**

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `false`

Masz teraz możliwość eksportu wyników porównania do pliku raportu JSON. Podając opcję `createJsonReportFiles: true`, każdy porównywany obraz utworzy raport zapisany w folderze `actual`, obok każdego wyniku obrazu `actual`. Wynik będzie wyglądał tak:

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

Po wykonaniu wszystkich testów, nowy plik JSON z kolekcją porównań zostanie wygenerowany i będzie dostępny w głównym katalogu folderu `actual`. Dane są pogrupowane według:

-   `describe` dla Jasmine/Mocha lub `Feature` dla CucumberJS
-   `it` dla Jasmine/Mocha lub `Scenario` dla CucumberJS
    a następnie posortowane według:
-   `commandName`, które są nazwami metod porównujących używanymi do porównywania obrazów
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

Dane raportu dadzą Ci możliwość zbudowania własnego raportu wizualnego bez konieczności wykonywania całej magii i zbierania danych samodzielnie.

:::info UWAGA
Potrzebujesz wersji `@wdio/visual-testing` 5.2.0 lub wyższej
:::

### `disableBlinkingCursor`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `false`
-   **Wspierane:** Web, Hybrid App (Webview)

Włącz/Wyłącz wszystkie "migające" kursory w `input`, `textarea`, `[contenteditable]` w aplikacji. Jeśli ustawione na `true`, kursor zostanie ustawiony na `transparent` przed wykonaniem zrzutu ekranu
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
-   **Wspierane:** Web

To ukryje cały tekst na stronie, więc tylko układ będzie używany do porównania. Ukrywanie będzie wykonane przez dodanie stylu `'color': 'transparent !important'` do **każdego** elementu.

Aby zobaczyć wynik, zobacz [Test Output](/docs/visual-testing/test-output#enablelayouttesting)

:::info
Używając tej flagi, każdy element zawierający tekst (więc nie tylko `p, h1, h2, h3, h4, h5, h6, span, a, li`, ale także `div|button|..`) otrzyma tę właściwość. NIE ma opcji dostosowania tego.
:::

### `formatImageName`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **Wspierane:** Web, Hybrid App (Webview), Native App

Nazwa zapisanych obrazów może być dostosowana przez przekazanie parametru `formatImageName` z formatem ciągu jak:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

Następujące zmienne mogą być przekazane do formatowania ciągu i będą automatycznie odczytane z możliwości instancji.
Jeśli nie mogą być określone, zostaną użyte domyślne wartości.

-   `browserName`: Nazwa przeglądarki w podanych możliwościach
-   `browserVersion`: Wersja przeglądarki podana w możliwościach
-   `deviceName`: Nazwa urządzenia z możliwości
-   `dpr`: Stosunek pikseli urządzenia
-   `height`: Wysokość ekranu
-   `logName`: LogName z możliwości
-   `mobile`: To doda `_app` lub nazwę przeglądarki po `deviceName`, aby odróżnić zrzuty ekranu aplikacji od zrzutów ekranu przeglądarki
-   `platformName`: Nazwa platformy w podanych możliwościach
-   `platformVersion`: Wersja platformy podana w możliwościach
-   `tag`: Tag, który jest dostarczany w wywoływanych metodach
-   `width`: Szerokość ekranu

:::info

Nie można podać niestandardowych ścieżek/folderów w `formatImageName`. Jeśli chcesz zmienić ścieżkę, sprawdź zmianę następujących opcji:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) na metodę

:::

### `fullPageScrollTimeout`

-   **Typ:** `number`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `1500`
-   **Wspierane:** Web

Timeout w milisekundach oczekiwania po przewinięciu. To może pomóc zidentyfikować strony z leniwym ładowaniem.

:::info

To zadziała tylko, gdy opcja usługi/metody `userBasedFullPageScreenshot` jest ustawiona na `true`, zobacz również [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)

:::

### `hideScrollBars`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `true`
-   **Wspierane:** Web, Hybrid App (Webview)

Ukryj paski przewijania w aplikacji. Jeśli ustawione na true, wszystkie paski przewijania zostaną wyłączone przed wykonaniem zrzutu ekranu. Jest to domyślnie ustawione na `true`, aby zapobiec dodatkowym problemom.

### `logLevel`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `info`
-   **Wspierane:** Web, Hybrid App (Webview), Native App

Dodaje dodatkowe logi, opcje to `debug | info | warn | silent`

Błędy są zawsze rejestrowane w konsoli.

### `savePerInstance`

-   **Typ:** `boolean`
-   **Domyślnie:** `false`
-   **Obowiązkowe:** nie
-   **Wspierane:** Web, Hybrid App (Webview), Native App

Zapisz obrazy na instancję w osobnym folderze, więc na przykład wszystkie zrzuty ekranu Chrome zostaną zapisane w folderze Chrome jak `desktop_chrome`.

### `screenshotPath`

-   **Typ:** `string | () => string`
-   **Domyślnie:** `.tmp/`
-   **Obowiązkowe:** nie
-   **Wspierane:** Web, Hybrid App (Webview), Native App

Katalog, który będzie zawierał wszystkie rzeczywiste/różne zrzuty ekranu. Jeśli nie jest ustawiony, zostanie użyta domyślna wartość. Funkcja, która
zwraca ciąg znaków, może być również użyta do ustawienia wartości screenshotPath:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// LUB
{
    screenshotPath: () => {
        // Tu wykonaj magię
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **Typ:** `number`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `6` dla Androida i `15` dla iOS (`6` domyślnie i `9` zostanie dodane automatycznie dla możliwego paska głównego na iPhone'ach z notchem lub iPadach, które mają pasek główny)
-   **Wspierane:** Web

Padding, który musi być dodany do paska narzędzi na iOS i Android, aby poprawnie wyciąć viewport.

### `userBasedFullPageScreenshot`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `false`
-   **Wspierane:** Web, Hybrid App (Webview) **Wprowadzone w visual-service@7.0.0**

Domyślnie, zrzuty ekranu całej strony na komputerach są przechwytywane za pomocą protokołu WebDriver BiDi, co umożliwia szybkie, stabilne i spójne zrzuty ekranu bez przewijania.
Gdy userBasedFullPageScreenshot jest ustawione na true, proces wykonywania zrzutu ekranu symuluje prawdziwego użytkownika: przewija stronę, przechwytuje zrzuty ekranu wielkości viewportu i łączy je razem. Ta metoda jest przydatna dla stron z leniwie ładowaną zawartością lub dynamicznym renderowaniem, które zależy od pozycji przewinięcia.

Użyj tej opcji, jeśli Twoja strona opiera się na ładowaniu treści podczas przewijania lub jeśli chcesz zachować zachowanie starszych metod wykonywania zrzutów ekranu.

### `waitForFontsLoaded`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `true`
-   **Wspierane:** Web, Hybrid App (Webview)

Czcionki, w tym czcionki firm trzecich, mogą być ładowane synchronicznie lub asynchronicznie. Asynchroniczne ładowanie oznacza, że czcionki mogą załadować się po tym, jak WebdriverIO stwierdzi, że strona została w pełni załadowana. Aby zapobiec problemom z renderowaniem czcionek, ten moduł domyślnie będzie czekał na załadowanie wszystkich czcionek przed wykonaniem zrzutu ekranu.

## Opcje Tabbable

:::info UWAGA

Ten moduł obsługuje również rysowanie sposobu, w jaki użytkownik użyłby klawiatury do _tab_ przez stronę internetową, rysując linie i kropki od elementu tabbable do elementu tabbable.<br/>
Praca jest inspirowana wpisem na blogu [Viv Richards](https://github.com/vivrichards600) o ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br/>
Sposób wyboru elementów tabbable opiera się na module [tabbable](https://github.com/davidtheclark/tabbable). Jeśli istnieją jakiekolwiek problemy dotyczące tabulacji, sprawdź [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md), a zwłaszcza sekcję [More details](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

### `tabbableOptions`

-   **Typ:** `object`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) dla wszystkich wartości domyślnych
-   **Wspierane:** Web

Opcje, które można zmienić dla linii i kropek, jeśli używasz metod `{save|check}Tabbable`. Opcje są wyjaśnione poniżej.

#### `tabbableOptions.circle`

-   **Typ:** `object`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) dla wszystkich wartości domyślnych
-   **Wspierane:** Web

Opcje zmiany koła.

##### `tabbableOptions.circle.backgroundColor`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) dla wszystkich wartości domyślnych
-   **Wspierane:** Web

Kolor tła koła.

##### `tabbableOptions.circle.borderColor`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) dla wszystkich wartości domyślnych
-   **Wspierane:** Web

Kolor obramowania koła.

##### `tabbableOptions.circle.borderWidth`

-   **Typ:** `number`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) dla wszystkich wartości domyślnych
-   **Wspierane:** Web

Szerokość obramowania koła.

##### `tabbableOptions.circle.fontColor`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) dla wszystkich wartości domyślnych
-   **Wspierane:** Web

Kolor czcionki tekstu w kole. To będzie widoczne tylko, jeśli [`showNumber`](./#tabbableoptionscircleshownumber) jest ustawione na `true`.

##### `tabbableOptions.circle.fontFamily`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) dla wszystkich wartości domyślnych
-   **Wspierane:** Web

Rodzina czcionki tekstu w kole. To będzie widoczne tylko, jeśli [`showNumber`](./#tabbableoptionscircleshownumber) jest ustawione na `true`.

Upewnij się, że ustawione czcionki są obsługiwane przez przeglądarki.

##### `tabbableOptions.circle.fontSize`

-   **Typ:** `number`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) dla wszystkich wartości domyślnych
-   **Wspierane:** Web

Rozmiar czcionki tekstu w kole. To będzie widoczne tylko, jeśli [`showNumber`](./#tabbableoptionscircleshownumber) jest ustawione na `true`.

##### `tabbableOptions.circle.size`

-   **Typ:** `number`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) dla wszystkich wartości domyślnych
-   **Wspierane:** Web

Rozmiar koła.

##### `tabbableOptions.circle.showNumber`

-   **Typ:** `showNumber`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) dla wszystkich wartości domyślnych
-   **Wspierane:** Web

Pokaż numer sekwencji tab w kole.

#### `tabbableOptions.line`

-   **Typ:** `object`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) dla wszystkich wartości domyślnych
-   **Wspierane:** Web

Opcje zmiany linii.

##### `tabbableOptions.line.color`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) dla wszystkich wartości domyślnych
-   **Wspierane:** Web

Kolor linii.

##### `tabbableOptions.line.width`

-   **Typ:** `number`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) dla wszystkich wartości domyślnych
-   **Wspierane:** Web

Szerokość linii.

## Opcje porównania

### `compareOptions`

-   **Typ:** `object`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) dla wszystkich wartości domyślnych
-   **Wspierane:** Web, Hybrid App (Webview), Native App (Zobacz [Opcje porównania metod](./method-options#compare-check-options) dla więcej informacji)

Opcje porównania mogą być również ustawione jako opcje usługi, są one opisane w [Opcje porównania metod](/docs/visual-testing/method-options#compare-check-options)