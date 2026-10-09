---
id: visual-testing
title: Testowanie wizualne
description: "Porównuj zrzuty ekranów, elementów lub całych stron z obrazami bazowymi za pomocą @wdio/visual-service, w tym instalacja i użycie."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Co to potrafi?

WebdriverIO zapewnia porównywanie obrazów ekranów, elementów lub całych stron dla

-   🖥️ Przeglądarek desktopowych (Chrome / Firefox / Safari / Microsoft Edge)
-   📱 Przeglądarek mobilnych / tabletów (Chrome na emulatorach Androida / Safari na symulatorach iOS / symulatorach / prawdziwych urządzeniach) za pośrednictwem Appium
-   📱 Aplikacji natywnych (emulatory Androida / symulatory iOS / prawdziwe urządzenia) za pośrednictwem Appium (🌟 **NOWOŚĆ** 🌟)
-   📳 Aplikacji hybrydowych za pośrednictwem Appium

poprzez [`@wdio/visual-service`](https://www.npmjs.com/package/@wdio/visual-service), który jest lekkim serwisem WebdriverIO.

Pozwala to na:

-   zapisywanie lub porównywanie zrzutów **ekranów/elementów/całych stron** z obrazem bazowym
-   automatyczne **tworzenie obrazu bazowego**, gdy go nie ma
-   **zasłanianie niestandardowych obszarów**, a nawet **automatyczne wykluczanie** paska stanu i/lub pasków narzędzi (tylko urządzenia mobilne) podczas porównania
-   zwiększanie wymiarów zrzutów ekranu elementów
-   **ukrywanie tekstu** podczas porównywania stron internetowych, aby:
    -   **poprawić stabilność** i zapobiec niestabilności renderowania czcionek
    -   skupić się wyłącznie na **układzie** strony internetowej
-   używanie **różnych metod porównania** oraz zestawu **dodatkowych matcherów** dla bardziej czytelnych testów
-   weryfikację, jak Twoja strona internetowa będzie **obsługiwać nawigację klawiszem Tab)**, zobacz także [Nawigacja klawiszem Tab po stronie internetowej](#tabbing-through-a-website)
-   i wiele więcej, zobacz opcje [serwisu](./visual-testing/service-options) i [metod](./visual-testing/method-options)

Serwis jest lekkim modułem służącym do pobierania potrzebnych danych i zrzutów ekranu dla wszystkich przeglądarek/urządzeń. Moc porównywania pochodzi z [Pixelmatch](https://github.com/mapbox/pixelmatch), szybkiej i dokładnej biblioteki do percepcyjnego porównywania obrazów, wykorzystującej przestrzeń barw YIQ. Obrazy są przetwarzane za pomocą [fast-png](https://github.com/image-js/fast-png), kodeka PNG bez natywnych zależności.

:::info UWAGA dla aplikacji natywnych/hybrydowych
Metody `saveScreen`, `saveElement`, `checkScreen`, `checkElement` oraz matchery `toMatchScreenSnapshot` i `toMatchElementSnapshot` mogą być używane dla aplikacji natywnych/kontekstu natywnego.

Użyj właściwości `isHybridApp:true` w ustawieniach serwisu, jeśli chcesz używać go dla aplikacji hybrydowych.
:::

:::caution Aktualizujesz z wersji v9 (lub starszej)?

`@wdio/visual-service` **v10** zmienił silnik porównywania z **ResembleJS** na **[Pixelmatch](https://github.com/mapbox/pixelmatch)**. Pixelmatch używa percepcyjnego modelu kolorów (YIQ) zamiast surowego RGB, więc procenty niezgodności będą się różnić od tych w v9. Oznacza to, że:

-   **Twój kod testów nie wymaga zmian.** Wszystkie nazwy metod, nazwy opcji i matchery są identyczne.
-   **Twoje obrazy bazowe mogą wymagać aktualizacji.** Po aktualizacji uruchom zestaw testów i przejrzyj wszelkie różnice wizualne. Możesz zaktualizować pojedyncze nieudane obrazy bazowe za pomocą `--update-visual-baseline` lub usunąć cały folder z obrazami bazowymi i pozwolić `autoSaveBaseline` odtworzyć go od zera. Szczegóły znajdziesz w [FAQ](/docs/visual-testing/faq#my-visual-tests-fail-with-a-difference-how-can-i-update-my-baseline).

:::

## Instalacja

Najprostszym sposobem jest dodanie `@wdio/visual-service` jako zależności deweloperskiej (dev-dependency) w pliku `package.json` za pomocą:

```sh
npm install --save-dev @wdio/visual-service
```

## Użycie

`@wdio/visual-service` może być używany jak zwykły serwis. Możesz go skonfigurować w pliku konfiguracyjnym w następujący sposób:

```js
import path from "node:path";

// wdio.conf.ts
export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // Niektóre opcje, więcej w dokumentacji
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                formatImageName: "{tag}-{logName}-{width}x{height}",
                screenshotPath: path.join(process.cwd(), "tmp"),
                savePerInstance: true,
                // ... więcej opcji
            },
        ],
    ],
    // ...
};
```

Więcej opcji serwisu znajdziesz [tutaj](/docs/visual-testing/service-options).

Po skonfigurowaniu w konfiguracji WebdriverIO możesz dodawać asercje wizualne do [swoich testów](/docs/visual-testing/writing-tests).

### Capabilities
Aby używać modułu Visual Testing, **nie musisz dodawać żadnych dodatkowych opcji do swoich capabilities**. Jednak w niektórych przypadkach możesz chcieć dodać dodatkowe metadane do testów wizualnych, takie jak `logName`.

`logName` pozwala przypisać niestandardową nazwę do każdej capability, którą następnie można uwzględnić w nazwach plików obrazów. Jest to szczególnie przydatne do rozróżniania zrzutów ekranu wykonanych w różnych przeglądarkach, na różnych urządzeniach lub w różnych konfiguracjach.

Aby to włączyć, możesz zdefiniować `logName` w sekcji `capabilities` i upewnić się, że opcja `formatImageName` w serwisie Visual Testing się do niej odwołuje. Oto jak możesz to skonfigurować:

```js
import path from "node:path";

// wdio.conf.ts
export const config = {
    // ...
    // =====
    // Setup
    // =====
    capabilities: [
        {
            browserName: 'chrome',
            'wdio-ics:options': {
                logName: 'chrome-mac-15', // Niestandardowa nazwa logu dla Chrome
            },
        }
        {
            browserName: 'firefox',
            'wdio-ics:options': {
                logName: 'firefox-mac-15', // Niestandardowa nazwa logu dla Firefox
            },
        }
    ],
    services: [
        [
            "visual",
            {
                // Niektóre opcje, więcej w dokumentacji
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                screenshotPath: path.join(process.cwd(), "tmp"),
                // Poniższy format użyje `logName` z capabilities
                formatImageName: "{tag}-{logName}-{width}x{height}",
                // ... więcej opcji
            },
        ],
    ],
    // ...
};
```

#### Jak to działa
1. Ustawienie `logName`:

    - W sekcji `capabilities` przypisz unikalny `logName` do każdej przeglądarki lub urządzenia. Na przykład `chrome-mac-15` identyfikuje testy uruchamiane w Chrome na macOS w wersji 15.

2. Niestandardowe nazewnictwo obrazów:

    - Opcja `formatImageName` włącza `logName` do nazw plików zrzutów ekranu. Na przykład, jeśli `tag` to homepage, a rozdzielczość to `1920x1080`, wynikowa nazwa pliku może wyglądać tak:

        `homepage-chrome-mac-15-1920x1080.png`

3. Korzyści z niestandardowego nazewnictwa:

    - Rozróżnianie zrzutów ekranu z różnych przeglądarek lub urządzeń staje się znacznie łatwiejsze, szczególnie podczas zarządzania obrazami bazowymi i debugowania rozbieżności.

4. Uwaga dotycząca wartości domyślnych:

    -Jeśli `logName` nie jest ustawiony w capabilities, opcja `formatImageName` wyświetli go jako pusty ciąg znaków w nazwach plików (`homepage--15-1920x1080.png`)

### WebdriverIO multi-remote

Obsługujemy również [multi-remote](https://webdriver.io/docs/multiremote/). Aby działało to poprawnie, upewnij się, że dodajesz `wdio-ics:options` do swoich
capabilities, jak widać poniżej. Zapewni to, że każdy zrzut ekranu będzie miał własną unikalną nazwę.

[Pisanie testów](/docs/visual-testing/writing-tests) nie będzie się niczym różnić w porównaniu do korzystania z [testrunnera](https://webdriver.io/docs/testrunner)

```js
// wdio.conf.js
export const config = {
    capabilities: {
        chromeBrowserOne: {
            capabilities: {
                browserName: "chrome",
                "goog:chromeOptions": {
                    args: ["disable-infobars"],
                },
                // TO!!!
                "wdio-ics:options": {
                    logName: "chrome-latest-one",
                },
            },
        },
        chromeBrowserTwo: {
            capabilities: {
                browserName: "chrome",
                "goog:chromeOptions": {
                    args: ["disable-infobars"],
                },
                // TO!!!
                "wdio-ics:options": {
                    logName: "chrome-latest-two",
                },
            },
        },
    },
};
```

### Uruchamianie programowe

Oto minimalny przykład użycia `@wdio/visual-service` za pomocą opcji `remote`:

```js
import { remote } from "webdriverio";
import VisualService from "@wdio/visual-service";

let visualService = new VisualService({
    autoSaveBaseline: true,
});

const browser = await remote({
    logLevel: "silent",
    capabilities: {
        browserName: "chrome",
    },
});

// "Uruchom" serwis, aby dodać niestandardowe komendy do `browser`
visualService.remoteSetup(browser);

await browser.url("https://webdriver.io/");

// lub użyj tego, aby TYLKO zapisać zrzut ekranu
await browser.saveFullPageScreen("examplePaged", {});

// lub użyj tego do walidacji. Obu metod nie trzeba łączyć, zobacz FAQ
await browser.checkFullPageScreen("examplePaged", {});

await browser.deleteSession();
```

### Tabbing through a website

Możesz sprawdzić, czy strona internetowa jest dostępna przy użyciu klawisza <kbd>TAB</kbd>. Testowanie tej części dostępności zawsze było czasochłonnym (ręcznym) zadaniem i dość trudnym do zautomatyzowania.
Dzięki metodom `saveTabbablePage` i `checkTabbablePage` możesz teraz rysować linie i kropki na swojej stronie, aby zweryfikować kolejność nawigacji klawiszem Tab.

Pamiętaj, że jest to przydatne tylko dla przeglądarek desktopowych i **NIE\*\*** dla urządzeń mobilnych. Wszystkie przeglądarki desktopowe obsługują tę funkcję.

:::note

Ta praca jest inspirowana wpisem na blogu [Viv Richards](https://github.com/vivrichards600) zatytułowanym ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).

Sposób wybierania elementów, do których można przejść klawiszem Tab, opiera się na module [tabbable](https://github.com/davidtheclark/tabbable). Jeśli wystąpią jakiekolwiek problemy związane z nawigacją klawiszem Tab, sprawdź [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md), a zwłaszcza sekcję [More ](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details)Details.

:::

#### Jak to działa

Obie metody utworzą element `canvas` na Twojej stronie i narysują linie oraz kropki, aby pokazać, dokąd przejdzie fokus po naciśnięciu TAB, gdyby użytkownik końcowy go użył. Następnie wykonają zrzut ekranu całej strony, aby dać Ci dobry przegląd przepływu.

:::important

**Używaj `saveTabbablePage` tylko wtedy, gdy potrzebujesz utworzyć zrzut ekranu i NIE chcesz go porównywać **z **obrazem bazowym**.\*\*\*\*

:::

Jeśli chcesz porównać przepływ nawigacji klawiszem Tab z obrazem bazowym, możesz użyć metody `checkTabbablePage`. **NIE** musisz używać obu metod razem. Jeśli obraz bazowy już został utworzony, co może nastąpić automatycznie poprzez podanie `autoSaveBaseline: true` podczas tworzenia instancji serwisu,
`checkTabbablePage` najpierw utworzy _aktualny_ obraz, a następnie porówna go z obrazem bazowym.

##### Opcje

Obie metody używają tych samych opcji co `saveFullPageScreen` lub `compareFullPageScreen`.

#### Przykład

Oto przykład, jak działa nawigacja klawiszem Tab na naszej [stronie testowej (guinea pig)](https://guinea-pig.webdriver.io/image-compare.html):

![WDIO tabbing example](/img/visual/tabbable-chrome-latest-1366x768.png)

### Automatyczna aktualizacja nieudanych zrzutów wizualnych

Zaktualizuj obrazy bazowe z poziomu wiersza poleceń, dodając argument `--update-visual-baseline`. Spowoduje to

-   automatyczne skopiowanie aktualnie wykonanego zrzutu ekranu i umieszczenie go w folderze z obrazami bazowymi
-   jeśli wystąpią różnice, test zostanie zaliczony, ponieważ obraz bazowy został zaktualizowany

**Użycie:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

Przy uruchomieniu z logami w trybie info/debug zobaczysz dodane następujące logi

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

## Obsługa TypeScript

Ten moduł zawiera obsługę TypeScript, dzięki czemu możesz korzystać z autouzupełniania, bezpieczeństwa typów i lepszego doświadczenia programistycznego podczas korzystania z serwisu Visual Testing.

### Krok 1: Dodaj definicje typów
Aby TypeScript rozpoznawał typy modułu, dodaj następujący wpis do pola types w pliku tsconfig.json:

```json
{
    "compilerOptions": {
        "types": ["@wdio/visual-service"]
    }
}
```

### Krok 2: Włącz bezpieczeństwo typów dla opcji serwisu
Aby wymusić sprawdzanie typów opcji serwisu, zaktualizuj konfigurację WebdriverIO:

```ts
// wdio.conf.ts
import { join } from 'node:path';
// Zaimportuj definicję typu
import type { VisualServiceOptions } from '@wdio/visual-service';

export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // Opcje serwisu
                baselineFolder: join(process.cwd(), './__snapshots__/'),
                formatImageName: '{tag}-{logName}-{width}x{height}',
                screenshotPath: join(process.cwd(), '.tmp/'),
            } satisfies VisualServiceOptions, // Zapewnia bezpieczeństwo typów
        ],
    ],
    // ...
};
```

## Wymagania systemowe

### Wersja 10 i nowsze (aktualna)

W wersji 10 i nowszych ten moduł nie ma dodatkowych zależności systemowych poza ogólnymi [wymaganiami projektu](/docs/gettingstarted#system-requirements). Używa [Pixelmatch](https://github.com/mapbox/pixelmatch) do percepcyjnego porównywania obrazów oraz [fast-png](https://github.com/image-js/fast-png) do kodowania/dekodowania obrazów. Obie biblioteki są napisane w czystym JavaScript i nie mają natywnych zależności.

### Wersje od 5 do 9 (starsze)

Wersje od 5 do 9 używały [Jimp](https://github.com/jimp-dev/jimp), biblioteki do przetwarzania obrazów dla Node napisanej w całości w JavaScript, bez natywnych zależności. Nie były wymagane żadne dodatkowe zależności systemowe.

### Wersja 4 i starsze

W wersji 4 i starszych ten moduł opiera się na [Canvas](https://github.com/Automattic/node-canvas), implementacji canvas dla Node.js. Canvas zależy od [Cairo](https://cairographics.org/).

#### Szczegóły instalacji

Domyślnie pliki binarne dla macOS, Linux i Windows zostaną pobrane podczas wykonywania `npm install` w Twoim projekcie. Jeśli nie masz obsługiwanego systemu operacyjnego lub architektury procesora, moduł zostanie skompilowany w Twoim systemie. Wymaga to kilku zależności, w tym Cairo i Pango.

Szczegółowe informacje dotyczące instalacji znajdziesz na [wiki node-canvas](https://github.com/Automattic/node-canvas/wiki/_pages). Poniżej znajdują się jednowierszowe instrukcje instalacji dla popularnych systemów operacyjnych. Zwróć uwagę, że `libgif/giflib`, `librsvg` i `libjpeg` są opcjonalne i potrzebne tylko odpowiednio do obsługi GIF, SVG i JPEG. Wymagane jest Cairo w wersji v1.10.0 lub nowszej.

<Tabs
defaultValue="osx"
values={[
{label: 'OS', value: 'osx'},
{label: 'Ubuntu', value: 'ubuntu'},
{label: 'Fedora', value: 'fedora'},
{label: 'Solaris', value: 'solaris'},
{label: 'OpenBSD', value: 'openbsd'},
{label: 'Window', value: 'windows'},
{label: 'Others', value: 'others'},
]}

> <TabItem value="osx">

     Używając [Homebrew](https://brew.sh/):

     ```sh
     brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman
     ```

    **Mac OS X v10.11+:** Jeśli niedawno zaktualizowałeś system do Mac OS X v10.11+ i masz problemy z kompilacją, uruchom następujące polecenie: `xcode-select --install`. Więcej o tym problemie przeczytasz [na Stack Overflow](http://stackoverflow.com/a/32929012/148072).
    Jeśli masz zainstalowany Xcode 10.0 lub nowszy, do budowania ze źródeł potrzebujesz NPM 6.4.1 lub nowszego.

</TabItem>
<TabItem value="ubuntu">

    ```sh
    sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
    ```

</TabItem>
<TabItem value="fedora">

    ```sh
    sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel
    ```

</TabItem>
<TabItem value="solaris">

    ```sh
    pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto
    ```

</TabItem>
<TabItem value="openbsd">

    ```sh
    doas pkg_add cairo pango png jpeg giflib
    ```

</TabItem>
<TabItem value="windows">

    Zobacz [wiki](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows)

</TabItem>
<TabItem value="others">

    Zobacz [wiki](https://github.com/Automattic/node-canvas/wiki)

</TabItem>
</Tabs>