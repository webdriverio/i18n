---
id: service-options
title: Opcje serwisu
---

Opcje serwisu to opcje, które można ustawić podczas instancjonowania serwisu i będą używane dla każdego wywołania metody.

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
-   **Obsługiwane konteksty aplikacji:** Web

Padding, który należy dodać do paska adresu w systemach iOS i Android, aby prawidłowo wyciąć widok.

### `autoElementScroll`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `true`
-   **Obsługiwane konteksty aplikacji:** Web, Hybrid App (Webview)

Ta opcja pozwala wyłączyć automatyczne przewijanie elementu do widoku podczas tworzenia zrzutu ekranu elementu.

### `addIOSBezelCorners`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `false`
-   **Obsługiwane konteksty aplikacji:** Web, Hybrid App (Webview), Native App

Dodaj narożniki ramki i wcięcie/dynamiczną wyspę do zrzutu ekranu urządzeń iOS.

:::info UWAGA
Można to zrobić tylko wtedy, gdy nazwa urządzenia **MOŻE** zostać automatycznie określona i pasuje do poniższej listy znormalizowanych nazw urządzeń. Normalizacja zostanie wykonana przez ten moduł.
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
-   **Obsługiwane konteksty aplikacji:** Web, Hybrid App (Webview), Native App

Jeśli podczas porównania nie zostanie znalezione bazowe zdjęcie, obraz jest automatycznie kopiowany do folderu bazowego.

### `alwaysSaveActualImage`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `true`
-   **Obsługiwane konteksty aplikacji:** Wszystkie

Ustawienie tej opcji na `false` spowoduje:

- nie zapisywanie aktualnego obrazu, gdy **nie ma** różnicy
- nie zapisywanie pliku raportu JSON, gdy `createJsonReportFiles` jest ustawione na `true`. W logach pojawi się również ostrzeżenie, że `createJsonReportFiles` jest wyłączone

Powinno to zapewnić lepszą wydajność, ponieważ żadne pliki nie są zapisywane do systemu, i powinno zapewnić, że w folderze `actual` nie ma zbyt wielu niepotrzebnych plików.

### `baselineFolder`

-   **Typ:** `string|()=> string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `.path/to/testfile/__snapshots__/`
-   **Obsługiwane konteksty aplikacji:** Web, Hybrid App (Webview), Native App

Katalog, który będzie przechowywać wszystkie obrazy bazowe używane podczas porównania. Jeśli nie zostanie ustawiony, zostanie użyta domyślna wartość, która przechowa pliki w folderze `__snapshots__/` obok specyfikacji wykonującej testy wizualne. Funkcja zwracająca `string` może również służyć do ustawienia wartości `baselineFolder`:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// ALBO
{
    baselineFolder: () => {
        // Zrób jakąś magię tutaj
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `false`
-   **Obsługiwane konteksty aplikacji:** Web, Hybrid App (Webview), Native App

Usuń folder wykonawczy (`actual` & `diff) podczas inicjalizacji

:::info UWAGA
To zadziała tylko wtedy, gdy [`screenshotPath`](#screenshotpath) jest ustawiony poprzez opcje wtyczki i **NIE ZADZIAŁA**, gdy ustawisz foldery w metodach
:::

### `createJsonReportFiles` **(NOWOŚĆ)**

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `false`

Teraz masz możliwość eksportu wyników porównania do pliku raportu JSON. Podając opcję `createJsonReportFiles: true`, dla każdego porównywanego obrazu zostanie utworzony raport przechowywany w folderze `actual`, obok każdego wyniku obrazu `actual`. Wynik będzie wyglądać tak:

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

Po wykonaniu wszystkich testów zostanie wygenerowany nowy plik JSON z kolekcją porównań, który można znaleźć w katalogu głównym folderu `actual`. Dane są pogrupowane według:

-   `describe` dla Jasmine/Mocha lub `Feature` dla CucumberJS
-   `it` dla Jasmine/Mocha lub `Scenario` dla CucumberJS
    a następnie posortowane według:
-   `commandName`, czyli nazw metod porównania używanych do porównywania obrazów
-   `instanceData`, najpierw przeglądarka, potem urządzenie, potem platforma
    będzie to wyglądać tak:

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

Dane raportu dadzą ci możliwość zbudowania własnego raportu wizualnego bez konieczności wykonywania całej magii i zbierania danych samodzielnie.

:::info UWAGA
Musisz używać wersji `@wdio/visual-testing` 5.2.0 lub nowszej
:::

### `disableBlinkingCursor`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `false`
-   **Obsługiwane konteksty aplikacji:** Web, Hybrid App (Webview)

Włącz/wyłącz "miganie" kursora w elementach `input`, `textarea`, `[contenteditable]` w aplikacji. Jeśli ustawiono na `true`, kursor zostanie ustawiony na `transparent` przed wykonaniem zrzutu ekranu i zresetowany po zakończeniu

### `disableCSSAnimation`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `false`
-   **Obsługiwane konteksty aplikacji:** Web, Hybrid App (Webview)

Włącz/wyłącz wszystkie animacje CSS w aplikacji. Jeśli ustawiono na `true`, wszystkie animacje zostaną wyłączone przed wykonaniem zrzutu ekranu i zresetowane po zakończeniu

### `enableLayoutTesting`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `false`
-   **Obsługiwane konteksty aplikacji:** Web

Ta opcja ukryje cały tekst na stronie, więc do porównania będzie używany tylko układ. Ukrywanie będzie realizowane poprzez dodanie stylu `'color': 'transparent !important'` do **każdego** elementu.

Aby zobaczyć wynik, zobacz [Test Output](/docs/visual-testing/test-output#enablelayouttesting)

:::info
Używając tej flagi, każdy element zawierający tekst (nie tylko `p, h1, h2, h3, h4, h5, h6, span, a, li`, ale także `div|button|..`) otrzyma tę właściwość. Nie ma możliwości dostosowania tego.
:::

### `formatImageName`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **Obsługiwane konteksty aplikacji:** Web, Hybrid App (Webview), Native App

Nazwę zapisanych obrazów można dostosować, przekazując parametr `formatImageName` z formatem ciągu, takim jak:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

Następujące zmienne mogą być przekazane do formatowania ciągu i będą automatycznie odczytywane z możliwości instancji. Jeśli nie można ich określić, użyte zostaną wartości domyślne.

-   `browserName`: Nazwa przeglądarki w dostarczonych możliwościach
-   `browserVersion`: Wersja przeglądarki podana w możliwościach
-   `deviceName`: Nazwa urządzenia z możliwości
-   `dpr`: Współczynnik pikseli urządzenia
-   `height`: Wysokość ekranu
-   `logName`: LogName z możliwości
-   `mobile`: Doda `_app` lub nazwę przeglądarki po `deviceName`, aby odróżnić zrzuty ekranu aplikacji od zrzutów przeglądarki
-   `platformName`: Nazwa platformy w dostarczonych możliwościach
-   `platformVersion`: Wersja platformy podana w możliwościach
-   `tag`: Tag, który jest dostarczany w wywoływanych metodach
-   `width`: Szerokość ekranu

:::info

Nie można podawać niestandardowych ścieżek/folderów w `formatImageName`. Jeśli chcesz zmienić ścieżkę, sprawdź zmianę następujących opcji:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) na metodę

:::

### `fullPageScrollTimeout`

-   **Typ:** `number`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `1500`
-   **Obsługiwane konteksty aplikacji:** Web

Czas oczekiwania w milisekundach po przewinięciu strony. Może to pomóc w identyfikacji stron z opóźnionym ładowaniem treści.

:::info

To zadziała tylko wtedy, gdy opcja serwisu/metody `userBasedFullPageScreenshot` jest ustawiona na `true`, zobacz także [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)

:::

### `hideScrollBars`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `true`
-   **Obsługiwane konteksty aplikacji:** Web, Hybrid App (Webview)

Ukryj paski przewijania w aplikacji. Jeśli ustawione na true, wszystkie paski przewijania zostaną wyłączone przed wykonaniem zrzutu ekranu. Domyślnie ustawione na `true`, aby zapobiec dodatkowym problemom.

### `logLevel`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `info`
-   **Obsługiwane konteksty aplikacji:** Web, Hybrid App (Webview), Native App

Dodaje dodatkowe logi, opcje to `debug | info | warn | silent`

Błędy są zawsze rejestrowane w konsoli.

### `savePerInstance`

-   **Typ:** `boolean`
-   **Domyślnie:** `false`
-   **Obowiązkowe:** nie
-   **Obsługiwane konteksty aplikacji:** Web, Hybrid App (Webview), Native App

Zapisuj obrazy dla każdej instancji w osobnym folderze, na przykład wszystkie zrzuty ekranu Chrome będą zapisywane w folderze Chrome, takim jak `desktop_chrome`.

### `screenshotPath`

-   **Typ:** `string | () => string`
-   **Domyślnie:** `.tmp/`
-   **Obowiązkowe:** nie
-   **Obsługiwane konteksty aplikacji:** Web, Hybrid App (Webview), Native App

Katalog, który będzie przechowywać wszystkie rzeczywiste/różne zrzuty ekranu. Jeśli nie zostanie ustawiony, zostanie użyta domyślna wartość. Funkcja, która
zwraca ciąg znaków, może również służyć do ustawienia wartości screenshotPath:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// ALBO
{
    screenshotPath: () => {
        // Zrób jakąś magię tutaj
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **Typ:** `number`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `6` dla Androida i `15` dla iOS (`6` domyślnie i `9` zostanie dodane automatycznie dla możliwego paska domowego w iPhone'ach z wycięciem lub iPadach, które mają pasek domowy)
-   **Obsługiwane konteksty aplikacji:** Web

Padding, który należy dodać do paska narzędzi w iOS i Androidzie, aby prawidłowo wyciąć widok.

### `userBasedFullPageScreenshot`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `false`
-   **Obsługiwane konteksty aplikacji:** Web, Hybrid App (Webview) **Wprowadzone w visual-service@7.0.0**

Domyślnie, pełnoekranowe zrzuty ekranu w wersji desktopowej są przechwytywane za pomocą protokołu WebDriver BiDi, który umożliwia szybkie, stabilne i spójne zrzuty ekranu bez przewijania.
Gdy userBasedFullPageScreenshot jest ustawione na true, proces wykonywania zrzutu ekranu symuluje rzeczywistego użytkownika: przewija stronę, przechwytuje zrzuty ekranu o wielkości okna i łączy je razem. Ta metoda jest przydatna dla stron z zawartością ładowaną dynamicznie lub dynamicznym renderowaniem, które zależy od pozycji przewijania.

Użyj tej opcji, jeśli Twoja strona wymaga ładowania treści podczas przewijania lub jeśli chcesz zachować zachowanie starszych metod wykonywania zrzutów ekranu.

### `waitForFontsLoaded`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `true`
-   **Obsługiwane konteksty aplikacji:** Web, Hybrid App (Webview)

Czcionki, w tym czcionki firm zewnętrznych, mogą być ładowane synchronicznie lub asynchronicznie. Ładowanie asynchroniczne oznacza, że czcionki mogą zostać załadowane po tym, jak WebdriverIO określi, że strona została w pełni załadowana. Aby zapobiec problemom z renderowaniem czcionek, ten moduł domyślnie będzie czekał na załadowanie wszystkich czcionek przed wykonaniem zrzutu ekranu.

## Opcje Tabbable

:::info UWAGA

Ten moduł obsługuje również rysowanie sposobu, w jaki użytkownik używałby klawiatury do przechodzenia przez stronę za pomocą klawisza _tab_, rysując linie i kropki od elementu do elementu, które można wybrać klawiszem tab.<br/>
Praca została zainspirowana postem na blogu [Viva Richardsa](https://github.com/vivrichards600) ["AUTOMATYZACJA TABULACJI STRONY (CZY TO JEST SŁOWO?) ZA POMOCĄ TESTÓW WIZUALNYCH"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br/>
Sposób wybierania elementów tabulacji jest oparty na module [tabbable](https://github.com/davidtheclark/tabbable). Jeśli występują problemy związane z tabulacją, sprawdź [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md), a zwłaszcza sekcję [Więcej szczegółów](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

### `tabbableOptions`

-   **Typ:** `object`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) wszystkie wartości domyślne
-   **Obsługiwane konteksty aplikacji:** Web

Opcje, które można zmienić dla linii i kropek, jeśli używasz metod `{save|check}Tabbable`. Opcje są wyjaśnione poniżej.

#### `tabbableOptions.circle`

-   **Typ:** `object`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) wszystkie wartości domyślne
-   **Obsługiwane konteksty aplikacji:** Web

Opcje zmiany koła.

##### `tabbableOptions.circle.backgroundColor`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) wszystkie wartości domyślne
-   **Obsługiwane konteksty aplikacji:** Web

Kolor tła koła.

##### `tabbableOptions.circle.borderColor`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) wszystkie wartości domyślne
-   **Obsługiwane konteksty aplikacji:** Web

Kolor obramowania koła.

##### `tabbableOptions.circle.borderWidth`

-   **Typ:** `number`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) wszystkie wartości domyślne
-   **Obsługiwane konteksty aplikacji:** Web

Szerokość obramowania koła.

##### `tabbableOptions.circle.fontColor`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) wszystkie wartości domyślne
-   **Obsługiwane konteksty aplikacji:** Web

Kolor czcionki tekstu w kole. Będzie wyświetlany tylko wtedy, gdy [`showNumber`](./#tabbableoptionscircleshownumber) jest ustawione na `true`.

##### `tabbableOptions.circle.fontFamily`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) wszystkie wartości domyślne
-   **Obsługiwane konteksty aplikacji:** Web

Rodzina czcionki tekstu w kole. Będzie wyświetlany tylko wtedy, gdy [`showNumber`](./#tabbableoptionscircleshownumber) jest ustawione na `true`.

Upewnij się, że ustawione są czcionki obsługiwane przez przeglądarki.

##### `tabbableOptions.circle.fontSize`

-   **Typ:** `number`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) wszystkie wartości domyślne
-   **Obsługiwane konteksty aplikacji:** Web

Rozmiar czcionki tekstu w kole. Będzie wyświetlany tylko wtedy, gdy [`showNumber`](./#tabbableoptionscircleshownumber) jest ustawione na `true`.

##### `tabbableOptions.circle.size`

-   **Typ:** `number`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) wszystkie wartości domyślne
-   **Obsługiwane konteksty aplikacji:** Web

Rozmiar koła.

##### `tabbableOptions.circle.showNumber`

-   **Typ:** `showNumber`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) wszystkie wartości domyślne
-   **Obsługiwane konteksty aplikacji:** Web

Pokaż numer sekwencji tabulacji w kole.

#### `tabbableOptions.line`

-   **Typ:** `object`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) wszystkie wartości domyślne
-   **Obsługiwane konteksty aplikacji:** Web

Opcje zmiany linii.

##### `tabbableOptions.line.color`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) wszystkie wartości domyślne
-   **Obsługiwane konteksty aplikacji:** Web

Kolor linii.

##### `tabbableOptions.line.width`

-   **Typ:** `number`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) wszystkie wartości domyślne
-   **Obsługiwane konteksty aplikacji:** Web

Szerokość linii.

## Opcje porównywania

### `compareOptions`

-   **Typ:** `object`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Zobacz [tutaj](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) wszystkie wartości domyślne
-   **Obsługiwane konteksty aplikacji:** Web, Hybrid App (Webview), Native App (Więcej informacji w [Opcje porównywania metod](./method-options#compare-check-options))

Opcje porównywania można również ustawić jako opcje serwisu, są one opisane w [Opcje porównywania metod](/docs/visual-testing/method-options#compare-check-options)