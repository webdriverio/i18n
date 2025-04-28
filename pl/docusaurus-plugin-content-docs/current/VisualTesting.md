---
id: visual-testing
title: Testowanie Wizualne
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Co potrafi?

WebdriverIO zapewnia porównywanie obrazów ekranów, elementów lub całych stron dla

-   🖥️ Przeglądarek desktopowych (Chrome / Firefox / Safari / Microsoft Edge)
-   📱 Przeglądarek mobilnych / tabletowych (Chrome na emulatorach Androida / Safari na symulatorach iOS / Symulatory / prawdziwe urządzenia) poprzez Appium
-   📱 Natywnych aplikacji (emulatory Androida / symulatory iOS / prawdziwe urządzenia) poprzez Appium (🌟 **NOWOŚĆ** 🌟)
-   📳 Aplikacji hybrydowych poprzez Appium

za pomocą [`@wdio/visual-service`](https://www.npmjs.com/package/@wdio/visual-service), która jest lekką usługą WebdriverIO.

Pozwala to na:

-   zapisywanie lub porównywanie **ekranów/elementów/pełnych stron** z bazą odniesienia
-   automatyczne **tworzenie bazy odniesienia**, gdy takowa nie istnieje
-   **blokowanie niestandardowych regionów** a nawet **automatyczne wykluczanie** paska statusu i/lub pasków narzędziowych (tylko mobilne) podczas porównania
-   zwiększanie wymiarów zrzutów ekranu elementów
-   **ukrywanie tekstu** podczas porównywania stron internetowych, aby:
    -   **poprawić stabilność** i zapobiec problemom z renderowaniem czcionek
    -   skupić się tylko na **układzie** strony internetowej
-   używanie **różnych metod porównania** i zestawu **dodatkowych matcherów** dla lepiej czytelnych testów
-   weryfikację jak Twoja strona **obsługuje nawigację za pomocą klawisza Tab**, zobacz również [Nawigacja po stronie za pomocą tabulatora](#tabbing-through-a-website)
-   i wiele więcej, zobacz opcje [usługi](./visual-testing/service-options) i [metody](./visual-testing/method-options)

Usługa jest lekkim modułem do pobierania potrzebnych danych i zrzutów ekranu dla wszystkich przeglądarek/urządzeń. Moc porównawcza pochodzi z [ResembleJS](https://github.com/Huddle/Resemble.js). Jeśli chcesz porównać obrazy online, możesz sprawdzić [narzędzie online](http://rsmbl.github.io/Resemble.js/).

:::info UWAGA dotycząca aplikacji natywnych/hybrydowych
Metody `saveScreen`, `saveElement`, `checkScreen`, `checkElement` oraz matchery `toMatchScreenSnapshot` i `toMatchElementSnapshot` mogą być używane dla aplikacji natywnych/kontekstu.

Proszę użyć właściwości `isHybridApp:true` w ustawieniach usługi, gdy chcesz używać jej dla aplikacji hybrydowych.
:::

## Instalacja

Najprostszym sposobem jest utrzymanie `@wdio/visual-service` jako dev-dependency w twoim `package.json`, poprzez:

```sh
npm install --save-dev @wdio/visual-service
```

## Użycie

`@wdio/visual-service` może być używany jako normalna usługa. Możesz skonfigurować go w swoim pliku konfiguracyjnym w następujący sposób:

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
                // Niektóre opcje, zobacz dokumentację, aby uzyskać więcej informacji
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

Więcej opcji usługi można znaleźć [tutaj](/docs/visual-testing/service-options).

Po skonfigurowaniu w konfiguracji WebdriverIO możesz przejść do dodawania asercji wizualnych do [swoich testów](/docs/visual-testing/writing-tests).

### Możliwości
Aby korzystać z modułu testowania wizualnego, **nie musisz dodawać żadnych dodatkowych opcji do swoich capabilities**. Jednak w niektórych przypadkach, możesz chcieć dodać dodatkowe metadane do swoich testów wizualnych, takie jak `logName`.

`logName` pozwala przypisać niestandardową nazwę do każdego capability, która może być następnie uwzględniona w nazwach plików obrazów. Jest to szczególnie przydatne do rozróżniania zrzutów ekranu wykonanych na różnych przeglądarkach, urządzeniach lub konfiguracjach.

Aby to włączyć, możesz zdefiniować `logName` w sekcji `capabilities` i upewnić się, że opcja `formatImageName` w usłudze testowania wizualnego odwołuje się do niej. Oto jak możesz to skonfigurować:

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
                logName: 'chrome-mac-15', // Niestandardowa nazwa dla Chrome
            },
        }
        {
            browserName: 'firefox',
            'wdio-ics:options': {
                logName: 'firefox-mac-15', // Niestandardowa nazwa dla Firefox
            },
        }
    ],
    services: [
        [
            "visual",
            {
                // Niektóre opcje, zobacz dokumentację, aby uzyskać więcej informacji
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                screenshotPath: path.join(process.cwd(), "tmp"),
                // Poniższy format będzie używać `logName` z capabilities
                formatImageName: "{tag}-{logName}-{width}x{height}",
                // ... więcej opcji
            },
        ],
    ],
    // ...
};
```

#### Jak to działa
1. Konfiguracja `logName`:

    - W sekcji `capabilities` przypisz unikalną `logName` do każdej przeglądarki lub urządzenia. Na przykład, `chrome-mac-15` identyfikuje testy uruchamiane na Chrome na macOS w wersji 15.

2. Niestandardowe nazewnictwo obrazów:

    - Opcja `formatImageName` integruje `logName` w nazwach plików zrzutów ekranu. Na przykład, jeśli `tag` to homepage, a rozdzielczość to `1920x1080`, wynikowa nazwa pliku może wyglądać tak:

        `homepage-chrome-mac-15-1920x1080.png`

3. Korzyści niestandardowego nazewnictwa:

    - Rozróżnianie między zrzutami ekranu z różnych przeglądarek lub urządzeń staje się znacznie łatwiejsze, szczególnie przy zarządzaniu bazami odniesienia i debugowaniu rozbieżności.

4. Uwaga o domyślnych wartościach:

    -Jeśli `logName` nie jest ustawione w capabilities, opcja `formatImageName` pokaże ją jako pusty ciąg w nazwach plików (`homepage--15-1920x1080.png`)

### WebdriverIO MultiRemote

Wspieramy również [MultiRemote](https://webdriver.io/docs/multiremote/). Aby to działało poprawnie, upewnij się, że dodałeś `wdio-ics:options` do swoich
capabilities, jak możesz zobaczyć poniżej. Zapewni to, że każdy zrzut ekranu będzie miał swoją własną unikalną nazwę.

[Pisanie testów](/docs/visual-testing/writing-tests) nie będzie różnić się w porównaniu do korzystania z [testrunner](https://webdriver.io/docs/testrunner)

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

### Uruchamianie programistyczne

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

// "Uruchom" usługę, aby dodać niestandardowe polecenia do `browser`
visualService.remoteSetup(browser);

await browser.url("https://webdriver.io/");

// lub użyj tego do TYLKO zapisania zrzutu ekranu
await browser.saveFullPageScreen("examplePaged", {});

// lub użyj tego do walidacji. Obie metody nie muszą być łączone, patrz FAQ
await browser.checkFullPageScreen("examplePaged", {});

await browser.deleteSession();
```

### Nawigacja po stronie za pomocą tabulatora

Możesz sprawdzić, czy strona internetowa jest dostępna, używając klawisza <kbd>TAB</kbd>. Testowanie tej części dostępności zawsze było czasochłonnym (ręcznym) zadaniem i dość trudnym do zautomatyzowania.
Dzięki metodom `saveTabbablePage` i `checkTabbablePage` możesz teraz narysować linie i kropki na swojej stronie, aby zweryfikować kolejność tabulatorów.

Pamiętaj, że jest to przydatne tylko dla przeglądarek desktopowych i **NIE\*\*** dla urządzeń mobilnych. Wszystkie przeglądarki desktopowe obsługują tę funkcję.

:::note

Praca jest inspirowana postem na blogu [Viva Richardsa](https://github.com/vivrichards600) o ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).

Sposób wybierania elementów podlegających nawigacji za pomocą tabulatora opiera się na module [tabbable](https://github.com/davidtheclark/tabbable). Jeśli są jakiekolwiek problemy dotyczące tabulacji, sprawdź [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md), a zwłaszcza sekcję [More Details](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

#### Jak to działa

Obie metody utworzą element `canvas` na Twojej stronie i narysują linie i kropki, aby pokazać Ci, gdzie poszedłby Twój TAB, gdyby użytkownik końcowy go użył. Następnie zostanie wykonany zrzut ekranu całej strony, aby dać Ci dobry przegląd przepływu.

:::important

**Używaj `saveTabbablePage` tylko wtedy, gdy potrzebujesz utworzyć zrzut ekranu i NIE chcesz go porównywać **z obrazem **bazowym**.\*\*\*\*

:::

Gdy chcesz porównać przepływ tabulacji z bazą odniesienia, możesz użyć metody `checkTabbablePage`. **NIE** musisz używać obu metod razem. Jeśli już istnieje obraz bazowy, który może zostać automatycznie utworzony poprzez dostarczenie `autoSaveBaseline: true` podczas inicjalizacji usługi,
`checkTabbablePage` najpierw utworzy obraz _rzeczywisty_, a następnie porówna go z bazą odniesienia.

##### Opcje

Obie metody używają tych samych opcji co [`saveFullPageScreen`](https://github.com/wswebcreation/webdriver-image-comparison/blob/master/docs/OPTIONS.md#savefullpagescreen-or-savetabbablepage) lub
[`compareFullPageScreen`](https://github.com/wswebcreation/webdriver-image-comparison/blob/master/docs/OPTIONS.md#comparefullpagescreen-or-comparetabbablepage).

#### Przykład

Oto przykład działania tabulacji na naszej [testowej stronie](https://guinea-pig.webdriver.io/image-compare.html):

![WDIO przykład tabulacji](/img/visual/tabbable-chrome-latest-1366x768.png)

### Automatycznie aktualizuj nieudane zrzuty wizualne

Aktualizuj obrazy bazowe przez wiersz poleceń, dodając argument `--update-visual-baseline`. Spowoduje to

-   automatyczne skopiowanie aktualnego zrzutu ekranu i umieszczenie go w folderze bazowym
-   jeśli są różnice, test przejdzie, ponieważ baza odniesienia została zaktualizowana

**Użycie:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

Podczas uruchamiania w trybie logów info/debug zobaczysz następujące dodane logi

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

## Wsparcie dla TypeScript

Ten moduł zawiera wsparcie dla TypeScript, pozwalając korzystać z auto-uzupełniania, bezpieczeństwa typów i ulepszonego środowiska programistycznego podczas korzystania z usługi testowania wizualnego.

### Krok 1: Dodaj definicje typów
Aby upewnić się, że TypeScript rozpoznaje typy modułu, dodaj następujący wpis do pola types w swoim tsconfig.json:

```json
{
    "compilerOptions": {
        "types": ["@wdio/visual-service"]
    }
}
```

### Krok 2: Włącz bezpieczeństwo typów dla opcji usługi
Aby wymusić sprawdzanie typów na opcjach usługi, zaktualizuj swoją konfigurację WebdriverIO:

```ts
// wdio.conf.ts
import { join } from 'node:path';
// Importuj definicję typu
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
                // Opcje usługi
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

### Wersja 5 i wyższe

Dla wersji 5 i wyższych, moduł ten jest czysto oparty na JavaScript bez dodatkowych zależności systemowych poza ogólnymi [wymaganiami projektu](/docs/gettingstarted#system-requirements). Używa [Jimp](https://github.com/jimp-dev/jimp), który jest biblioteką przetwarzania obrazów dla Node napisaną całkowicie w JavaScript, bez natywnych zależności.

### Wersja 4 i niższe

Dla wersji 4 i niższych, moduł ten opiera się na [Canvas](https://github.com/Automattic/node-canvas), implementacji canvas dla Node.js. Canvas zależy od [Cairo](https://cairographics.org/).

#### Szczegóły instalacji

Domyślnie, binaria dla macOS, Linux i Windows zostaną pobrane podczas instalacji `npm install` twojego projektu. Jeśli nie masz obsługiwanego systemu operacyjnego lub architektury procesora, moduł zostanie skompilowany na twoim systemie. Wymaga to kilku zależności, w tym Cairo i Pango.

Szczegółowe informacje na temat instalacji znajdziesz w [wiki node-canvas](https://github.com/Automattic/node-canvas/wiki/_pages). Poniżej znajdują się jednolinijkowe instrukcje instalacji dla popularnych systemów operacyjnych. Zauważ, że `libgif/giflib`, `librsvg` i `libjpeg` są opcjonalne i potrzebne tylko dla obsługi GIF, SVG i JPEG. Wymagany jest Cairo v1.10.0 lub nowszy.

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

    **Mac OS X v10.11+:** Jeśli niedawno zaktualizowałeś do Mac OS X v10.11+ i doświadczasz problemów podczas kompilacji, uruchom następujące polecenie: `xcode-select --install`. Przeczytaj więcej o problemie [na Stack Overflow](http://stackoverflow.com/a/32929012/148072).
    Jeśli masz zainstalowany Xcode 10.0 lub nowszy, aby zbudować ze źródeł potrzebujesz NPM 6.4.1 lub nowszego.

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