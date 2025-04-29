---
id: wdio-ocr-service
title: Usługa Testowania OCR
custom_edit_url: https://github.com/webdriverio/visual-testing/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @wdio/ocr-service to pakiet zewnętrzny, aby uzyskać więcej informacji, zobacz [GitHub](https://github.com/webdriverio/visual-testing) | [npm](https://www.npmjs.com/package/@wdio/ocr-service)

Dokumentację dotyczącą testowania wizualnego z WebdriverIO można znaleźć w [dokumentacji](https://webdriver.io/docs/visual-testing). Ten projekt zawiera wszystkie istotne moduły do przeprowadzania testów wizualnych z WebdriverIO. W katalogu `./packages` znajdziesz:

-   `@wdio/visual-testing`: usługa WebdriverIO do integracji testów wizualnych
-   `webdriver-image-comparison`: moduł porównywania obrazów, który może być używany dla różnych frameworków do automatyzacji testów NodeJS obsługujących protokół WebDriver

## Storybook Runner (BETA)

<details>
  <summary>Kliknij, aby dowiedzieć się więcej o Storybook Runner BETA</summary>

> Storybook Runner jest nadal w fazie BETA, dokumentacja zostanie później przeniesiona na strony dokumentacji [WebdriverIO](https://webdriver.io/docs/visual-testing).

Ten moduł teraz obsługuje Storybook z nowym Visual Runner. Runner ten automatycznie skanuje lokalną/zdalną instancję storybook i tworzy zrzuty ekranu elementów dla każdego komponentu. Można to zrobić, dodając

```ts
export const config: WebdriverIO.Config = {
    // ...
    services: ["visual"],
    // ....
};
```

do twoich `services` i uruchamiając `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook` w wierszu poleceń.
Domyślnie użyje Chrome w trybie headless jako domyślnej przeglądarki.

> [!NOTE]
>
> -   Większość opcji Visual Testing będzie również działać dla Storybook Runner, zobacz dokumentację [WebdriverIO](https://webdriver.io/docs/visual-testing).
> -   Storybook Runner nadpisze wszystkie twoje capabilities i może działać tylko na przeglądarkach, które obsługuje, zobacz [`--browsers`](#browsers).
> -   Storybook Runner nie obsługuje istniejącej konfiguracji, która używa możliwości Multiremote i wyrzuci błąd.
> -   Storybook Runner obsługuje tylko Desktop Web, nie Mobile Web.

### Opcje usługi Storybook Runner

Opcje usługi można dostarczyć w ten sposób

```ts
export const config: WebdriverIO.Config  = {
    // ...
    services: [
      [
        'visual',
        {
            // Kilka domyślnych opcji
            baselineFolder: join(process.cwd(), './__snapshots__/'),
            debug: true,
            // Opcje storybooka, zobacz opcje cli dla opisu
            storybook: {
                additionalSearchParams: new URLSearchParams({foo: 'bar', abc: 'def'}),
                clip: false,
                clipSelector: ''#some-id,
                numShards: 4,
                // `skipStories` może być stringiem ('example-button--secondary'),
                // tablicą (['example-button--secondary', 'example-button--small'])
                // lub wyrażeniem regularnym, które musi być podane jako string ("/.*button.*/gm")
                skipStories: ['example-button--secondary', 'example-button--small'],
                url: 'https://www.bbc.co.uk/iplayer/storybook/',
                version: 6,
                // Opcjonalnie - Pozwala na nadpisanie ścieżki do baseline. Domyślnie grupuje baseline według kategorii i komponentu (np. forms/input/baseline.png)
                getStoriesBaselinePath: (category, component) => `path__${category}__${component}`,
            },
        },
      ],
    ],
    // ....
}
```

### Opcje CLI Storybook Runner

#### `--additionalSearchParams`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** ''
-   **Przykład:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --additionalSearchParams="foo=bar&abc=def"`

Dodaje dodatkowe parametry wyszukiwania do URL Storybooka.
Zobacz dokumentację [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) po więcej informacji. String musi być prawidłowym stringiem URLSearchParams.

> [!NOTE]
> Podwójne cudzysłowy są potrzebne, aby zapobiec interpretacji `&` jako separatora poleceń.
> Na przykład z `--additionalSearchParams="foo=bar&abc=def"` wygeneruje następujący URL Storybooka dla testów historii: `http://storybook.url/iframe.html?id=story-id&foo=bar&abc=def`.

#### `--browsers`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `chrome`, możesz wybrać spośród `chrome|firefox|edge|safari`
-   **Przykład:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --browsers=chrome,firefox,edge,safari`
-   **UWAGA:** Dostępne tylko przez CLI

Użyje podanych przeglądarek do wykonywania zrzutów ekranu komponentów

> [!NOTE]
> Upewnij się, że masz zainstalowane przeglądarki, które chcesz używać na swoim lokalnym komputerze

#### `--clip`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `true`
-   **Przykład:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --clip=false`

Gdy wyłączone, stworzy zrzut ekranu widoku. Gdy włączone, stworzy zrzuty ekranu elementów na podstawie [`--clipSelector`](#clipselector), co zmniejszy ilość białej przestrzeni wokół zrzutu ekranu komponentu i zmniejszy rozmiar zrzutu ekranu.

#### `--clipSelector`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `#storybook-root > :first-child` dla Storybook V7 i `#root > :first-child:not(script):not(style)` dla Storybook V6, zobacz także [`--version`](#version)
-   **Przykład:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --clipSelector="#some-id"`

Jest to selektor, który będzie używany:

-   do wyboru elementu, którego zrzut ekranu ma być wykonany
-   dla elementu, który ma być widoczny przed wykonaniem zrzutu ekranu

#### `--devices`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Możesz wybrać z [`deviceDescriptors.ts`](https://github.com/webdriverio/visual-testing/blob/main/./packages/service/src/storybook/deviceDescriptors.ts)
-   **Przykład:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --devices="iPhone 14 Pro Max","Pixel 3 XL"`
-   **UWAGA:** Dostępne tylko przez CLI

Użyje podanych urządzeń, które pasują do [`deviceDescriptors.ts`](https://github.com/webdriverio/visual-testing/blob/main/./packages/service/src/storybook/deviceDescriptors.ts) do wykonywania zrzutów ekranu komponentów

> [!NOTE]
>
> -   Jeśli brakuje Ci konfiguracji urządzenia, możesz śmiało przesłać [Feature request](https://github.com/webdriverio/visual-testing/issues/new?assignees=&labels=&projects=&template=--feature-request.md)
> -   To będzie działać tylko z Chrome:
>     -   jeśli podasz `--devices`, wszystkie instancje Chrome będą działać w trybie **emulacji mobilnej**
>     -   jeśli podasz również inne przeglądarki niż Chrome, np. `--devices --browsers=firefox,safari,edge`, automatycznie doda Chrome w trybie emulacji mobilnej
> -   Runner Storybook domyślnie tworzy zrzuty ekranu elementów, jeśli chcesz zobaczyć pełny zrzut ekranu emulacji mobilnej, podaj `--clip=false` w wierszu poleceń
> -   Nazwa pliku będzie np. `__snapshots__/example/button/desktop_chrome/example-button--large-local-chrome-iPhone-14-Pro-Max-430x932-dpr-3.png`
> -   **[ŹRÓDŁO:](https://chromedriver.chromium.org/mobile-emulation#h.p_ID_167)** Testowanie strony mobilnej na komputerze za pomocą emulacji mobilnej może być przydatne, ale testerzy powinni pamiętać, że istnieje wiele subtelnych różnic, takich jak:
>     -   całkowicie inny GPU, co może prowadzić do dużych zmian w wydajności;
>     -   interfejs mobilny nie jest emulowany (w szczególności, ukrywanie paska adresu wpływa na wysokość strony);
>     -   okienko wyboru (gdzie wybierasz jeden z kilku celów dotykowych) nie jest obsługiwane;
>     -   wiele API sprzętowych (na przykład zdarzenie orientationchange) jest niedostępnych.

#### `--headless`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `true`
-   **Przykład:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --headless=false`
-   **UWAGA:** Dostępne tylko przez CLI

Domyślnie uruchomi testy w trybie headless (jeśli przeglądarka go obsługuje) lub może być wyłączony

#### `--numShards`

-   **Typ:** `number`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `true`
-   **Przykład:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --numShards=10`

To będzie liczba równoległych instancji, które będą używane do uruchamiania historii. Będzie to ograniczone przez `maxInstances` w pliku `wdio.conf`.

> [!IMPORTANT]
> Przy uruchamianiu w trybie `headless` nie zwiększaj liczby powyżej 20, aby zapobiec niestabilności z powodu ograniczeń zasobów

#### `--skipStories`

-   **Typ:** `string|regex`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** null
-   **Przykład:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --skipStories="/.*button.*/gm"`

Może to być:

-   string (`example-button--secondary,example-button--small`)
-   lub regex (`"/.*button.*/gm"`)

aby pominąć określone historie. Użyj `id` historii, które można znaleźć w URL historii. Na przykład, `id` w tym URL `http://localhost:6006/?path=/story/example-page--logged-out` to `example-page--logged-out`

#### `--url`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `http://127.0.0.1:6006`
-   **Przykład:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --url="https://example.com"`

URL, na którym hostowana jest twoja instancja Storybook.

#### `--version`

-   **Typ:** `number`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** 7
-   **Przykład:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --version=6`

To jest wersja Storybooka, domyślnie `7`. Jest to potrzebne, aby wiedzieć, czy należy użyć selektora V6 [`clipSelector`](#clipselector).

### Testy interakcji Storybook

Testy interakcji Storybook umożliwiają interakcję z komponentem poprzez tworzenie niestandardowych skryptów z komendami WDIO, aby ustawić komponent w określonym stanie. Na przykład, zobacz poniższy fragment kodu:

```ts
import { browser, expect } from "@wdio/globals";

describe("Storybook Interaction", () => {
    it("should create screenshots for the logged in state when it logs out", async () => {
        const componentId = "example-page--logged-in";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
        await $("button=Log out").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
    });

    it("should create screenshots for the logged out state when it logs in", async () => {
        const componentId = "example-page--logged-out";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
        await $("button=Log in").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
    });
});
```

Wykonywane są dwa testy na dwóch różnych komponentach. Każdy test najpierw ustawia stan, a następnie wykonuje zrzut ekranu. Zauważysz również, że wprowadzono nową niestandardową komendę, którą można znaleźć [tutaj](#new-custom-command).

Powyższy plik specyfikacji można zapisać w folderze i dodać do wiersza poleceń za pomocą następującego polecenia:

```sh
pnpm run test.local.desktop.storybook.localhost -- --spec='tests/specs/storybook-interaction/*.ts'
```

Runner Storybook najpierw automatycznie przeskanuje twoją instancję Storybook, a następnie doda twoje testy do historii, które muszą zostać porównane. Jeśli nie chcesz, aby komponenty, których używasz do testów interakcji, były porównywane dwukrotnie, możesz dodać filtr, aby usunąć "domyślne" historie ze skanowania, podając filtr [`--skipStories`](#--skipstories). Wyglądałoby to tak:

```sh
pnpm run test.local.desktop.storybook.localhost -- --skipStories="/example-page.*/gm" --spec='tests/specs/storybook-interaction/*.ts'
```

### Nowa niestandardowa komenda

Nowa niestandardowa komenda o nazwie `browser.waitForStorybookComponentToBeLoaded({ id: 'componentId' })` zostanie dodana do obiektu `browser/driver`, który automatycznie załaduje komponent i poczeka na jego zakończenie, więc nie musisz używać metody `browser.url('url.com')`. Można jej używać w ten sposób

```ts
import { browser, expect } from "@wdio/globals";

describe("Storybook Interaction", () => {
    it("should create screenshots for the logged in state when it logs out", async () => {
        const componentId = "example-page--logged-in";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
        await $("button=Log out").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
    });

    it("should create screenshots for the logged out state when it logs in", async () => {
        const componentId = "example-page--logged-out";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
        await $("button=Log in").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
    });
});
```

Opcje to:

#### `additionalSearchParams`

-   **Typ:** [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `new URLSearchParams()`
-   **Przykład:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    additionalSearchParams: new URLSearchParams({ foo: "bar", abc: "def" }),
    id: "componentId",
});
```

Dodaje dodatkowe parametry wyszukiwania do URL Storybooka, w powyższym przykładzie URL będzie `http://storybook.url/iframe.html?id=story-id&foo=bar&abc=def`.
Zobacz dokumentację [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) po więcej informacji.

#### `clipSelector`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `#storybook-root > :first-child` dla Storybook V7 i `#root > :first-child:not(script):not(style)` dla Storybook V6
-   **Przykład:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    clipSelector: "#your-selector",
    id: "componentId",
});
```

Jest to selektor, który będzie używany:

-   do wyboru elementu, którego zrzut ekranu ma być wykonany
-   dla elementu, który ma być widoczny przed wykonaniem zrzutu ekranu

#### `id`

-   **Typ:** `string`
-   **Obowiązkowe:** tak
-   **Przykład:**

```ts
await browser.waitForStorybookComponentToBeLoaded({ '#your-selector', id: 'componentId' })
```

Użyj `id` historii, które można znaleźć w URL historii. Na przykład, `id` w tym URL `http://localhost:6006/?path=/story/example-page--logged-out` to `example-page--logged-out`

#### `timeout`

-   **Typ:** `number`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** 1100 milisekund
-   **Przykład:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    id: "componentId",
    timeout: 20000,
});
```

Maksymalny czas oczekiwania na widoczność komponentu po załadowaniu na stronie

#### `url`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `http://127.0.0.1:6006`
-   **Przykład:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    id: "componentId",
    url: "https://your.url",
});
```

URL, na którym hostowana jest twoja instancja Storybook.

</details>

## Współtworzenie

### Aktualizacja pakietów

Możesz zaktualizować pakiety za pomocą prostego narzędzia CLI. Upewnij się, że zainstalowałeś wszystkie zależności, następnie możesz uruchomić

```sh
pnpm update.packages
```

Spowoduje to uruchomienie CLI, które zada ci następujące pytania

```logs
==========================
🤖 Package update Wizard 🧙
==========================

? Which version target would you like to update to? (Minor|Latest)
? Do you want to update the package.json files? (Y/n)
? Do you want to remove all "node_modules" and reinstall dependencies? (Y/n)
? Would you like reinstall the dependencies? (Y/n)
```

To spowoduje następujące logi

<details>
    <summary>Otwórz, aby zobaczyć przykład logów</summary>
    
```logs
==========================
🤖 Package update Wizard 🧙
==========================

? Which version target would you like to update to? Minor
? Do you want to update the package.json files? yes
Updating root 'package.json' for minor updates...
Updating packages for minor updates in /Users/wswebcreation/Git/wdio/visual-testing...
Using pnpm
Upgrading /Users/wswebcreation/Git/wdio/visual-testing/package.json
[====================] 38/38 100%

@typescript-eslint/eslint-plugin ^8.7.0 → ^8.8.0
@typescript-eslint/parser ^8.7.0 → ^8.8.0
@typescript-eslint/utils ^8.7.0 → ^8.8.0
@vitest/coverage-v8 ^2.1.1 → ^2.1.2
vitest ^2.1.1 → ^2.1.2

Run pnpm install to install new versions.
Updating packages for minor updates in /Users/wswebcreation/Git/wdio/visual-testing/packages/ocr-service...
Using pnpm
Upgrading /Users/wswebcreation/Git/wdio/visual-testing/packages/ocr-service/package.json
[====================] 11/11 100%

All dependencies match the minor package versions :)
Updating packages for minor updates in /Users/wswebcreation/Git/wdio/visual-testing/packages/visual-reporter...
Using pnpm
Upgrading /Users/wswebcreation/Git/wdio/visual-testing/packages/visual-reporter/package.json
[====================] 11/11 100%

eslint-config-next 14.2.13 → 14.2.14
next 14.2.13 → 14.2.14

Run pnpm install to install new versions.
Updating packages for minor updates in /Users/wswebcreation/Git/wdio/visual-testing/packages/visual-service...
Using pnpm
Upgrading /Users/wswebcreation/Git/wdio/visual-testing/packages/visual-service/package.json
[====================] 5/5 100%

All dependencies match the minor package versions :)
Updating packages for minor updates in /Users/wswebcreation/Git/wdio/visual-testing/packages/webdriver-image-comparison...
Using pnpm
Upgrading /Users/wswebcreation/Git/wdio/visual-testing/packages/webdriver-image-comparison/package.json
[====================] 8/8 100%

All dependencies match the minor package versions :)
? Do you want to remove all "node_modules" and reinstall dependencies? yes
Removing root dependencies in /Users/wswebcreation/Git/wdio/visual-testing...
Removing dependencies in ocr-service...
Removing dependencies in visual-reporter...
Removing dependencies in visual-service...
Removing dependencies in webdriver-image-comparison...
? Would you like reinstall the dependencies? yes
Installing dependencies in /Users/wswebcreation/Git/wdio/visual-testing...

> @wdio/visual-testing-monorepo@ pnpm.install.workaround /Users/wswebcreation/Git/wdio/visual-testing
> pnpm install --shamefully-hoist

Scope: all 5 workspace projects
Lockfile is up to date, resolution step is skipped
Packages: +1274
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 1274, reused 1265, downloaded 0, added 1274, done

dependencies:

-   @wdio/ocr-service 2.0.0 <- packages/ocr-service
-   @wdio/visual-service 6.0.0 <- packages/visual-service

devDependencies:

-   @changesets/cli 2.27.8
-   @inquirer/prompts 5.5.0
-   @tsconfig/node20 20.1.4
-   @types/eslint 9.6.1
-   @types/jsdom 21.1.7
-   @types/node 20.16.4
-   @types/react 18.3.5
-   @types/react-dom 18.3.0
-   @types/xml2js 0.4.14
-   @typescript-eslint/eslint-plugin 8.8.0
-   @typescript-eslint/parser 8.8.0
-   @typescript-eslint/utils 8.8.0
-   @vitest/coverage-v8 2.1.2
-   @wdio/appium-service 9.1.2
-   @wdio/cli 9.1.2
-   @wdio/globals 9.1.2
-   @wdio/local-runner 9.1.2
-   @wdio/mocha-framework 9.1.2
-   @wdio/sauce-service 9.1.2
-   @wdio/shared-store-service 9.1.2
-   @wdio/spec-reporter 9.1.2
-   @wdio/types 9.1.2
-   eslint 9.11.1
-   eslint-plugin-import 2.30.0
-   eslint-plugin-unicorn 55.0.0
-   eslint-plugin-wdio 9.0.8
-   husky 9.1.6
-   jsdom 25.0.1
-   pnpm-run-all2 6.2.3
-   release-it 17.6.0
-   rimraf 6.0.1
-   saucelabs 8.0.0
-   ts-node 10.9.2
-   typescript 5.6.2
-   vitest 2.1.2
-   webdriverio 9.1.2

. prepare$ husky
└─ Done in 204ms
Done in 9.5s
All packages updated!

````

</details>

### Pytania

Dołącz do naszego serwera [Discord](https://discord.webdriver.io), jeśli masz jakiekolwiek pytania lub problemy związane z współtworzeniem tego projektu. Znajdź współtwórców na kanale `🙏-contributing`.

### Problemy

Jeśli masz pytania, zgłoszenia błędów lub prośby o funkcje, zgłoś problem. Przed przesłaniem problemu, przeszukaj archiwum problemów, aby zmniejszyć liczbę duplikatów i przeczytaj [FAQ](https://webdriver.io/docs/visual-testing/faq/).

Jeśli nie możesz go tam znaleźć, możesz złożyć zgłoszenie, w którym możesz przesłać:

-   🐛**Raport błędu**: Utwórz raport, aby pomóc nam w ulepszeniu
-   📖**Dokumentacja**: Zaproponuj ulepszenia lub zgłoś brakującą/niejasną dokumentację.
-   💡**Prośba o funkcję**: Zaproponuj pomysł dla tego modułu.
-   💬**Pytanie**: Zadawaj pytania.

### Proces rozwoju

Aby utworzyć PR dla tego projektu i zacząć współtworzyć, postępuj zgodnie z poniższym przewodnikiem krok po kroku:

-   Wykonaj fork projektu.
-   Sklonuj projekt gdzieś na swoim komputerze

    ```sh
    $ git clone https://github.com/webdriverio/visual-testing.git
    ```

-   Przejdź do katalogu i skonfiguruj projekt

    ```sh
    $ cd visual-testing
    $ corepack enable
    $ pnpm pnpm.install.workaround
    ```

-   Uruchom tryb watch, który automatycznie transpiluje kod

    ```sh
    $ pnpm watch
    ```

    aby zbudować projekt, uruchom:

    ```sh
    $ pnpm build
    ```

-   Upewnij się, że twoje zmiany nie psują żadnych testów, uruchom:

    ```sh
    $ pnpm test
    ```

Ten projekt używa [changesets](https://github.com/changesets/changesets) do automatycznego tworzenia dzienników zmian i wydań.

### Testowanie

Należy wykonać kilka testów, aby móc przetestować moduł. Przy dodawaniu PR wszystkie testy muszą co najmniej przejść testy lokalne. Każdy PR jest automatycznie testowany na Sauce Labs, patrz [nasza pipeline GitHub Actions](https://github.com/webdriverio/visual-testing/actions/workflows/tests.yml). Przed zatwierdzeniem PR, główni współtwórcy przetestują PR na emulatorach/symulatorach / rzeczywistych urządzeniach.

#### Testowanie lokalne

Najpierw należy utworzyć lokalną linię bazową. Można to zrobić za pomocą:

```sh
// Z protokołem webdriver
$ pnpm run test.local.init
````

To polecenie utworzy folder o nazwie `localBaseline`, który będzie przechowywał wszystkie obrazy bazowe.

Następnie uruchom:

```sh
// Z protokołem webdriver
pnpm run test.local.desktop
```

To uruchomi wszystkie testy na lokalnej maszynie na Chrome.

#### Lokalne testowanie Storybook Runner (Beta)

Najpierw należy utworzyć lokalną linię bazową. Można to zrobić za pomocą:

```sh
pnpm run test.local.desktop.storybook
```

To uruchomi testy Storybook z Chrome w trybie headless na Demo Storybook repo zlokalizowanym pod adresem https://govuk-react.github.io/govuk-react/.

Aby uruchomić testy z większą liczbą przeglądarek, możesz uruchomić

```sh
pnpm run test.local.desktop.storybook -- --browsers=chrome,firefox,edge,safari
```

> [!NOTE]
> Upewnij się, że masz zainstalowane przeglądarki, które chcesz uruchomić na swoim lokalnym komputerze

#### Testowanie CI z Sauce Labs (niepotrzebne dla PR)

Poniższe polecenie jest używane do testowania buildu na GitHub Actions, może być używane tylko tam, a nie do lokalnego rozwoju.

```
$ pnpm run test.saucelabs
```

Testuje to wiele konfiguracji, które można znaleźć [tutaj](https://github.com/webdriverio/visual-testing/blob/main/./tests/configs/wdio.saucelabs.web.conf.ts).
Wszystkie PR są automatycznie sprawdzane na Sauce Labs.

## Wydawanie

Aby wydać wersję dowolnego z pakietów wymienionych powyżej, wykonaj następujące czynności:

-   uruchom [pipeline wydania](https://github.com/webdriverio/visual-testing/actions/workflows/release.yml)
-   generowany jest PR wydania, poproś innego członka WebdriverIO o sprawdzenie i zatwierdzenie
-   scal PR
-   uruchom [pipeline wydania](https://github.com/webdriverio/visual-testing/actions/workflows/release.yml) ponownie
-   nowa wersja powinna zostać wydana 🎉

## Podziękowania

`@wdio/visual-testing` korzysta z licencji open-source od [LambdaTest](https://www.lambdatest.com/) i [Sauce Labs](https://saucelabs.com/).