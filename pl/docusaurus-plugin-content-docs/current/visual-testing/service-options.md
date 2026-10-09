---
id: service-options
title: Opcje serwisu
description: "Skonfiguruj domyślne opcje serwisu wizualnego, w tym przechwytywanie zrzutów ekranu, zrzuty całej strony, obrazy bazowe, foldery i raportowanie."
---

Opcje serwisu to opcje, które można ustawić podczas tworzenia instancji serwisu i które będą używane przy każdym wywołaniu metody.

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

# Opcje domyślne

## Przechwytywanie zrzutów ekranu

---

### `hideScrollBars`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

Ukrywa paski przewijania w aplikacji. Jeśli ustawione na true, wszystkie paski przewijania zostaną wyłączone przed wykonaniem zrzutu ekranu. Domyślnie ustawione na `true`, aby zapobiec dodatkowym problemom.

</Option>
### `disableBlinkingCursor`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview)">

Włącza/wyłącza „miganie” kursora we wszystkich elementach `input`, `textarea`, `[contenteditable]` w aplikacji. Jeśli ustawione na `true`, kursor zostanie ustawiony na `transparent` przed wykonaniem zrzutu ekranu
i przywrócony po jego zakończeniu

</Option>
### `disableCSSAnimation`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview)">

Włącza/wyłącza wszystkie animacje CSS w aplikacji. Jeśli ustawione na `true`, wszystkie animacje zostaną wyłączone przed wykonaniem zrzutu ekranu
i przywrócone po jego zakończeniu

</Option>
### `enableLayoutTesting`

<Option type="boolean" default="false" required="No" contexts="Web">

Ukrywa cały tekst na stronie, dzięki czemu do porównania używany będzie tylko układ (layout). Ukrywanie odbywa się poprzez dodanie stylu `'color': 'transparent !important'` do **każdego** elementu.

Wynik możesz zobaczyć w [Wynik testów](/docs/visual-testing/test-output#enablelayouttesting)

:::info
Przy użyciu tej flagi każdy element zawierający tekst (czyli nie tylko `p, h1, h2, h3, h4, h5, h6, span, a, li`, ale także `div|button|..`) otrzyma tę właściwość. **Nie** ma możliwości dostosowania tego zachowania.
:::

</Option>
### `ignoreRegionPadding`

<Option type="number" default="1" required="No" contexts="Web, Hybrid App (Webview)">

Margines w pikselach urządzenia dodawany do każdej strony ignorowanych obszarów, przez co każdy obszar staje się szerszy i wyższy o dwukrotność tej wartości. Pomaga to uniknąć różnic na granicach wielkości 1 px, które mogą pojawiać się na wyświetlaczach o wysokim DPR lub przy użyciu protokołu zrzutów ekranu BiDi. Ustaw na `0`, aby wyłączyć.

</Option>
### `waitForFontsLoaded`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

Czcionki, w tym czcionki zewnętrzne, mogą być ładowane synchronicznie lub asynchronicznie. Ładowanie asynchroniczne oznacza, że czcionki mogą zostać załadowane po tym, jak WebdriverIO uzna, że strona została w pełni załadowana. Aby zapobiec problemom z renderowaniem czcionek, ten moduł domyślnie czeka na załadowanie wszystkich czcionek przed wykonaniem zrzutu ekranu.

</Option>
## Zrzuty całej strony

---

### `userBasedFullPageScreenshot`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview) **Introduced in visual-service@7.0.0">

Domyślnie zrzuty całej strony w przeglądarkach desktopowych są wykonywane przy użyciu protokołu WebDriver BiDi, który umożliwia szybkie, stabilne i spójne zrzuty ekranu bez przewijania.
Gdy userBasedFullPageScreenshot jest ustawione na true, proces wykonywania zrzutu ekranu symuluje prawdziwego użytkownika: przewija stronę, wykonuje zrzuty o rozmiarze widocznego obszaru (viewport) i łączy je ze sobą. Ta metoda jest przydatna dla stron z leniwie ładowaną zawartością (lazy loading) lub dynamicznym renderowaniem zależnym od pozycji przewinięcia.

Użyj tej opcji, jeśli Twoja strona ładuje zawartość podczas przewijania lub jeśli chcesz zachować zachowanie starszych metod wykonywania zrzutów ekranu.

</Option>
### `fullPageScrollTimeout`

<Option type="number" default="1500" required="No" contexts="Web">

Czas oczekiwania w milisekundach po przewinięciu. Może to pomóc w obsłudze stron z leniwym ładowaniem (lazy loading).

:::info

Działa to tylko wtedy, gdy opcja serwisu/metody `userBasedFullPageScreenshot` jest ustawiona na `true`, zobacz także [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedfullpagescreenshot)

:::

</Option>
## Urządzenia mobilne

---

### `isHybridApp`

<Option type="boolean" default="false" required="No" contexts="Hybrid App (Webview)">

Ustaw na `true` podczas testowania aplikacji hybrydowej (natywnej powłoki z jednym lub kilkoma osadzonymi webview). Dostosowuje to sposób, w jaki moduł obsługuje wycinanie paska stanu i paska adresu dla ekranów opartych na webview, przechodząc na bezpieczne wartości domyślne, gdy natywne dane o prostokątach urządzenia są niedostępne.

</Option>
### `addIOSBezelCorners`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview), Native App">

Dodaje zaokrąglone narożniki ramki oraz notch/dynamic island do zrzutu ekranu dla urządzeń iOS.

:::info UWAGA
Jest to możliwe tylko wtedy, gdy nazwa urządzenia **MOŻE** zostać automatycznie określona i pasuje do poniższej listy znormalizowanych nazw urządzeń. Normalizacja zostanie wykonana przez ten moduł.
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
-   iPad Mini 6. generacji: `ipadmini`
-   iPad Air 4. generacji: `ipadair`
-   iPad Air 5. generacji: `ipadair`
-   iPad Pro (11 cali) 1. generacji: `ipadpro11`
-   iPad Pro (11 cali) 2. generacji: `ipadpro11`
-   iPad Pro (11 cali) 3. generacji: `ipadpro11`
-   iPad Pro (12,9 cala) 3. generacji: `ipadpro129`
-   iPad Pro (12,9 cala) 4. generacji: `ipadpro129`
-   iPad Pro (12,9 cala) 5. generacji: `ipadpro129`
:::

</Option>
### `addressBarShadowPadding`

<Option type="number" default="6" required="No" contexts="Web">

Margines, który należy dodać do paska adresu na iOS i Androidzie, aby prawidłowo wyciąć widoczny obszar (viewport).

</Option>
### `toolBarShadowPadding`

<Option type="number" default={`6 for Android and \`15\` for iOS (\`6\` by default and \`9\` will be added automatically for the possible home bar on iPhones with a notch or iPads that have a home bar)`} required="No" contexts="Web">

Margines, który należy dodać do paska narzędzi na iOS i Androidzie, aby prawidłowo wyciąć widoczny obszar (viewport).

</Option>
## Zarządzanie plikami i folderami

---

### `baselineFolder`

<Option type="string|()=> string" default=".path/to/testfile/__snapshots__/" required="No" contexts="Web, Hybrid App (Webview), Native App">

Katalog, w którym przechowywane będą wszystkie obrazy bazowe używane podczas porównania. Jeśli nie zostanie ustawiony, użyta zostanie wartość domyślna, która zapisze pliki w folderze `__snapshots__/` obok pliku spec wykonującego testy wizualne. Do ustawienia wartości `baselineFolder` można również użyć funkcji zwracającej `string`:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// OR
{
    baselineFolder: () => {
        // Do some magic here
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

</Option>
### `screenshotPath`

<Option type="string | () => string" default=".tmp/" required="no" contexts="Web, Hybrid App (Webview), Native App">

Katalog, w którym przechowywane będą wszystkie aktualne zrzuty ekranu oraz zrzuty różnic. Jeśli nie zostanie ustawiony, użyta zostanie wartość domyślna. Do ustawienia wartości screenshotPath można również użyć funkcji
zwracającej string:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// OR
{
    screenshotPath: () => {
        // Do some magic here
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

</Option>
### `clearRuntimeFolder`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview), Native App">

Usuwa folder uruchomieniowy (`actual` i `diff`) podczas inicjalizacji

:::info UWAGA
Działa to tylko wtedy, gdy [`screenshotPath`](#screenshotpath) jest ustawiony w opcjach pluginu, i **NIE ZADZIAŁA**, gdy ustawisz foldery w metodach
:::

</Option>
### `savePerInstance`

<Option type="boolean" default="false" required="no" contexts="Web, Hybrid App (Webview), Native App">

Zapisuje obrazy dla każdej instancji w osobnym folderze, dzięki czemu na przykład wszystkie zrzuty ekranu z Chrome zostaną zapisane w folderze Chrome, takim jak `desktop_chrome`.

</Option>
### `formatImageName`

<Option type="string" default={`{tag}-{browserName}-{width}x{height}-dpr-{dpr}`} required="No" contexts="Web, Hybrid App (Webview), Native App">

Nazwę zapisywanych obrazów można dostosować, przekazując parametr `formatImageName` z ciągiem formatującym, takim jak:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

Do sformatowania ciągu można użyć następujących zmiennych, które zostaną automatycznie odczytane z capabilities instancji.
Jeśli nie da się ich określić, zostaną użyte wartości domyślne.

-   `browserName`: Nazwa przeglądarki w podanych capabilities
-   `browserVersion`: Wersja przeglądarki podana w capabilities
-   `deviceName`: Nazwa urządzenia z capabilities
-   `dpr`: Współczynnik pikseli urządzenia (device pixel ratio)
-   `height`: Wysokość ekranu
-   `logName`: logName z capabilities
-   `mobile`: Dodaje `_app` lub nazwę przeglądarki po `deviceName`, aby odróżnić zrzuty ekranu aplikacji od zrzutów ekranu przeglądarki
-   `platformName`: Nazwa platformy w podanych capabilities
-   `platformVersion`: Wersja platformy podana w capabilities
-   `tag`: Tag podany w wywoływanej metodzie
-   `width`: Szerokość ekranu

:::info

W `formatImageName` nie można podawać niestandardowych ścieżek/folderów. Jeśli chcesz zmienić ścieżkę, sprawdź możliwość zmiany następujących opcji:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) dla każdej metody

:::

</Option>
## Obrazy bazowe i zachowanie zapisu

---

### `autoSaveBaseline`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview), Native App">

Jeśli podczas porównania nie zostanie znaleziony obraz bazowy, obraz zostanie automatycznie skopiowany do folderu bazowego.

</Option>
### `autoElementScroll`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

Ta opcja pozwala wyłączyć automatyczne przewijanie elementu do widoku podczas tworzenia zrzutu ekranu elementu.

</Option>
### `alwaysSaveActualImage`

<Option type="boolean" default="true" required="No" contexts="All">

Ustawienie tej opcji na `false` spowoduje, że:

- aktualny obraz nie zostanie zapisany, gdy **nie** ma różnic
- plik raportu JSON nie zostanie zapisany, gdy `createJsonReportFiles` jest ustawione na `true`. W logach pojawi się również ostrzeżenie, że `createJsonReportFiles` jest wyłączone

Powinno to zapewnić lepszą wydajność, ponieważ żadne pliki nie są zapisywane w systemie, a także zapobiec nadmiarowi zbędnych plików w folderze `actual`.

</Option>
## Raportowanie

---

### `createJsonReportFiles` **(NOWOŚĆ)**

<Option type="boolean" default="false" required="No">

Masz teraz możliwość eksportowania wyników porównania do pliku raportu JSON. Po podaniu opcji `createJsonReportFiles: true` dla każdego porównywanego obrazu zostanie utworzony raport zapisany w folderze `actual`, obok każdego wyniku obrazu `actual`. Wynik będzie wyglądał następująco:

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

Po wykonaniu wszystkich testów zostanie wygenerowany nowy plik JSON zawierający zbiór porównań, który można znaleźć w katalogu głównym folderu `actual`. Dane są grupowane według:

-   `describe` dla Jasmine/Mocha lub `Feature` dla CucumberJS
-   `it` dla Jasmine/Mocha lub `Scenario` dla CucumberJS
    a następnie sortowane według:
-   `commandName`, czyli nazw metod porównujących użytych do porównania obrazów
-   `instanceData`, najpierw przeglądarka, potem urządzenie, a następnie platforma
    będzie to wyglądać następująco

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

Dane raportu dają możliwość zbudowania własnego raportu wizualnego bez konieczności samodzielnego wykonywania całej „magii” i zbierania danych.

:::info UWAGA
Musisz użyć `@wdio/visual-testing` w wersji `5.2.0` lub nowszej
:::

</Option>
### `diffPixelBoundingBoxProximity`

<Option type="number" default="5" required="No" contexts="Web, Hybrid App (Webview), Native App">

Odległość w pikselach używana do grupowania pikseli różnic w raporcie JSON generowanym przez [`createJsonReportFiles`](#createjsonreportfiles). Wyższe wartości grupują więcej pikseli w mniejszą liczbę prostokątów ograniczających; niższe wartości dają dokładniejsze, ale liczniejsze prostokąty.

</Option>
## Ogólne

---

### `logLevel`

<Option type="string" default="info" required="No" contexts="Web, Hybrid App (Webview), Native App">

Dodaje dodatkowe logi, dostępne opcje to `debug | info | warn | silent`

Błędy są zawsze logowane w konsoli.

</Option>
## Opcje tabulacji

:::info UWAGA

Ten moduł obsługuje również rysowanie sposobu, w jaki użytkownik używałby klawiatury do przechodzenia (_tab_) po stronie internetowej, poprzez rysowanie linii i kropek od jednego elementu dostępnego przez tabulację do kolejnego.<br/>
Ta funkcjonalność została zainspirowana wpisem na blogu [Viva Richardsa](https://github.com/vivrichards600) zatytułowanym ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br/>
Sposób wybierania elementów dostępnych przez tabulację opiera się na module [tabbable](https://github.com/davidtheclark/tabbable). W przypadku jakichkolwiek problemów z tabulacją sprawdź [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md), a zwłaszcza [sekcję More details](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

### `tabbableOptions`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Opcje linii i kropek, które można zmienić, jeśli używasz metod `{save|check}Tabbable`. Opcje zostały opisane poniżej.

</Option>
#### `tabbableOptions.circle`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Opcje zmiany okręgu.

</Option>
##### `tabbableOptions.circle.backgroundColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Kolor tła okręgu.

</Option>
##### `tabbableOptions.circle.borderColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Kolor obramowania okręgu.

</Option>
##### `tabbableOptions.circle.borderWidth`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Szerokość obramowania okręgu.

</Option>
##### `tabbableOptions.circle.fontColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Kolor czcionki tekstu w okręgu. Będzie wyświetlany tylko wtedy, gdy [`showNumber`](./#tabbableoptionscircleshownumber) jest ustawione na `true`.

</Option>
##### `tabbableOptions.circle.fontFamily`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Rodzina czcionki tekstu w okręgu. Będzie wyświetlana tylko wtedy, gdy [`showNumber`](./#tabbableoptionscircleshownumber) jest ustawione na `true`.

Upewnij się, że ustawiasz czcionki obsługiwane przez przeglądarki.

</Option>
##### `tabbableOptions.circle.fontSize`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Rozmiar czcionki tekstu w okręgu. Będzie wyświetlany tylko wtedy, gdy [`showNumber`](./#tabbableoptionscircleshownumber) jest ustawione na `true`.

</Option>
##### `tabbableOptions.circle.size`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Rozmiar okręgu.

</Option>
##### `tabbableOptions.circle.showNumber`

<Option type="showNumber" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Wyświetla numer kolejności tabulacji w okręgu.

</Option>
#### `tabbableOptions.line`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Opcje zmiany linii.

</Option>
##### `tabbableOptions.line.color`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Kolor linii.

</Option>
##### `tabbableOptions.line.width`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Szerokość linii.

</Option>
## Opcje porównania

### `compareOptions`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) for all default values" required="No" contexts="Web, Hybrid App (Webview), Native App (See [Method Compare options](./method-options#compare-check-options) for more information)">

Opcje porównania można również ustawić jako opcje serwisu. Zostały one opisane w sekcji [Opcje porównania metod](/docs/visual-testing/method-options#compare-check-options)

</Option>