---
id: wdio-visual-service
title: Usługa porównywania obrazów (testowanie regresji wizualnej)
custom_edit_url: https://github.com/webdriverio/visual-testing/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @wdio/visual-service to pakiet zewnętrzny, więcej informacji znajdziesz na [GitHub](https://github.com/webdriverio/visual-testing) | [npm](https://www.npmjs.com/package/@wdio/visual-service)

Dokumentację dotyczącą testów wizualnych z WebdriverIO można znaleźć w [dokumentacji](https://webdriver.io/docs/visual-testing). Ten projekt zawiera wszystkie istotne moduły do uruchamiania testów wizualnych z WebdriverIO. W katalogu `./packages` znajdziesz:

-   `@wdio/visual-testing`: usługa WebdriverIO do integracji testów wizualnych
-   `webdriver-image-comparison`: moduł porównywania obrazów, który może być używany w różnych frameworkach automatyzacji testów NodeJS obsługujących protokół WebDriver

## Storybook Runner (BETA)

<details>
  <summary>Kliknij, aby dowiedzieć się więcej o Storybook Runner BETA</summary>

> Storybook Runner jest nadal w wersji BETA, dokumentacja zostanie później przeniesiona na strony dokumentacji [WebdriverIO](https://webdriver.io/docs/visual-testing).

Ten moduł teraz obsługuje Storybook z nowym Visual Runner. Ten runner automatycznie skanuje lokalne/zdalne instancje storybook i tworzy zrzuty ekranu elementów dla każdego komponentu. Można to zrobić dodając

```ts
export const config: WebdriverIO.Config = {
    // ...
    services: ["visual"],
    // ....
};
```

do twoich `services` i uruchamiając `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook` przez wiersz poleceń.
Domyślnie będzie używać Chrome w trybie headless.

> [!NOTE]
>
> -   Większość opcji Visual Testing będzie również działać dla Storybook Runner, zobacz dokumentację [WebdriverIO](https://webdriver.io/docs/visual-testing).
> -   Storybook Runner nadpisze wszystkie twoje capabilities i może działać tylko na przeglądarkach, które wspiera, zobacz [`--browsers`](#browsers).
> -   Storybook Runner nie obsługuje istniejącej konfiguracji, która używa Multiremote capabilities i wyrzuci błąd.
> -   Storybook Runner obsługuje tylko Desktop Web, nie Mobile Web.

### Opcje usługi Storybook Runner

Opcje usługi można dostarczyć w następujący sposób

```ts
export const config: WebdriverIO.Config  = {
    // ...
    services: [
      [
        'visual',
        {
            // Niektóre domyślne opcje
            baselineFolder: join(process.cwd(), './__snapshots__/'),
            debug: true,
            // Opcje storybook, zobacz opcje cli dla opisu
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
                // Opcjonalnie - Pozwala na nadpisanie ścieżki bazowej. Domyślnie grupuje bazowe zrzuty według kategorii i komponentu (np. forms/input/baseline.png)
                getStoriesBaselinePath: (category, component) => `path__${category}__${component}`,
            },
        },
      ],
    ],
    // ....
}
```

### Opcje wiersza poleceń Storybook Runner

#### `--additionalSearchParams`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** ''
-   **Przykład:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --additionalSearchParams="foo=bar&abc=def"`

Dodaje dodatkowe parametry wyszukiwania do URL Storybooka.
Zobacz dokumentację [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) aby uzyskać więcej informacji. Ciąg musi być prawidłowym ciągiem URLSearchParams.

> [!NOTE]
> Podwójne cudzysłowy są potrzebne, aby zapobiec interpretacji `&` jako separatora poleceń.
> Na przykład z `--additionalSearchParams="foo=bar&abc=def"` zostanie wygenerowany następujący URL Storybooka dla testu stories: `http://storybook.url/iframe.html?id=story-id&foo=bar&abc=def`.

#### `--browsers`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `chrome`, możesz wybrać spośród `chrome|firefox|edge|safari`
-   **Przykład:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --browsers=chrome,firefox,edge,safari`
-   **UWAGA:** Dostępne tylko przez CLI

Będzie używać dostarczonych przeglądarek do robienia zrzutów ekranu komponentów

> [!NOTE]
> Upewnij się, że masz zainstalowane przeglądarki, na których chcesz uruchamiać testy, na swojej lokalnej maszynie

#### `--clip`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `true`
-   **Przykład:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --clip=false`

Po wyłączeniu utworzy zrzut ekranu widoku. Po włączeniu utworzy zrzuty ekranu elementów na podstawie [`--clipSelector`](#clipselector), co zmniejszy ilość białej przestrzeni wokół zrzutu ekranu komponentu i zmniejszy rozmiar zrzutu ekranu.

#### `--clipSelector`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `#storybook-root > :first-child` dla Storybook V7 i `#root > :first-child:not(script):not(style)` dla Storybook V6, zobacz również [`--version`](#version)
-   **Przykład:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --clipSelector="#some-id"`

To jest selektor, który będzie używany:

-   do wyboru elementu, z którego ma być zrobiony zrzut ekranu
-   dla elementu, który ma być widoczny przed wykonaniem zrzutu ekranu

#### `--devices`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Możesz wybrać z [`deviceDescriptors.ts`](https://github.com/webdriverio/visual-testing/blob/main/./packages/service/src/storybook/deviceDescriptors.ts)
-   **Przykład:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --devices="iPhone 14 Pro Max","Pixel 3 XL"`
-   **UWAGA:** Dostępne tylko przez CLI

Będzie używać dostarczonych urządzeń pasujących do [`deviceDescriptors.ts`](https://github.com/webdriverio/visual-testing/blob/main/./packages/service/src/storybook/deviceDescriptors.ts) do robienia zrzutów ekranu komponentów

> [!NOTE]
>
> -   Jeśli brakuje ci konfiguracji urządzenia, możesz złożyć [prośbę o funkcję](https://github.com/webdriverio/visual-testing/issues/new?assignees=&labels=&projects=&template=--feature-request.md)
> -   To będzie działać tylko z Chrome:
>     -   jeśli podasz `--devices`, wszystkie instancje Chrome będą działać w trybie **Mobile Emulation**
>     -   jeśli podasz również inne przeglądarki niż Chrome, np. `--devices --browsers=firefox,safari,edge`, automatycznie doda Chrome w trybie emulacji mobilnej
> -   Storybook Runner domyślnie tworzy zrzuty ekranu elementów, jeśli chcesz zobaczyć pełny zrzut ekranu w emulacji mobilnej, podaj `--clip=false` przez wiersz poleceń
> -   Nazwa pliku będzie wyglądać na przykład tak: `__snapshots__/example/button/desktop_chrome/example-button--large-local-chrome-iPhone-14-Pro-Max-430x932-dpr-3.png`
> -   **[ŹRÓDŁO:](https://chromedriver.chromium.org/mobile-emulation#h.p_ID_167)** Testowanie mobilnej strony internetowej na komputerze przy użyciu emulacji mobilnej może być przydatne, ale testerzy powinni pamiętać o subtelnych różnicach, takich jak:
>     -   zupełnie inny GPU, co może prowadzić do dużych zmian wydajności;
>     -   interfejs mobilny nie jest emulowany (w szczególności ukrywanie paska adresu wpływa na wysokość strony);
>     -   popup dezambiguacji (gdzie wybierasz jeden z kilku celów dotykowych) nie jest obsługiwany;
>     -   wiele API sprzętowych (na przykład zdarzenie orientationchange) jest niedostępnych.

#### `--headless`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `true`
-   **Przykład:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --headless=false`
-   **UWAGA:** Dostępne tylko przez CLI

Domyślnie uruchomi testy w trybie headless (jeśli przeglądarka to obsługuje) lub może być wyłączony

#### `--numShards`

-   **Typ:** `number`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `true`
-   **Przykład:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --numShards=10`

To będzie liczba równoległych instancji, które będą używane do uruchamiania stories. Będzie to ograniczone przez `maxInstances` w twoim pliku `wdio.conf`.

> [!IMPORTANT]
> Podczas uruchamiania w trybie `headless` nie zwiększaj liczby do więcej niż 20, aby zapobiec niestabilności z powodu ograniczeń zasobów

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

URL, gdzie hostowana jest instancja Storybooka.

#### `--version`

-   **Typ:** `number`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** 7
-   **Przykład:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --version=6`

Jest to wersja Storybooka, domyślnie `7`. Jest to potrzebne, aby wiedzieć, czy należy użyć [`clipSelector`](#clipselector) dla V6.

### Storybook Interaction Testing

Storybook Interaction Testing pozwala na interakcję z komponentem poprzez tworzenie niestandardowych skryptów z poleceniami WDIO, aby ustawić komponent w określonym stanie. Na przykład, zobacz poniższy fragment kodu:

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

Wykonywane są dwa testy na dwóch różnych komponentach. Każdy test najpierw ustawia stan, a następnie wykonuje zrzut ekranu. Zauważysz również, że wprowadzono nowe niestandardowe polecenie, które można znaleźć [tutaj](#new-custom-command).

Powyższy plik specyfikacji można zapisać w folderze i dodać do wiersza poleceń za pomocą następującego polecenia:

```sh
pnpm run test.local.desktop.storybook.localhost -- --spec='tests/specs/storybook-interaction/*.ts'
```

Storybook runner najpierw automatycznie zeskanuje twoją instancję Storybooka, a następnie doda twoje testy do historii, które muszą zostać porównane. Jeśli nie chcesz, aby komponenty, których używasz do testów interakcji, były porównywane dwukrotnie, możesz dodać filtr, aby usunąć "domyślne" historie ze skanowania, używając filtra [`--skipStories`](#--skipstories). Wyglądałoby to tak:

```sh
pnpm run test.local.desktop.storybook.localhost -- --skipStories="/example-page.*/gm" --spec='tests/specs/storybook-interaction/*.ts'
```

### Nowe niestandardowe polecenie

Nowe niestandardowe polecenie o nazwie `browser.waitForStorybookComponentToBeLoaded({ id: 'componentId' })` zostanie dodane do obiektu `browser/driver`, które automatycznie załaduje komponent i poczeka na jego ukończenie, więc nie musisz używać metody `browser.url('url.com')`. Można go używać tak:

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
Zobacz dokumentację [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) aby uzyskać więcej informacji.

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

To jest selektor, który będzie używany:

-   do wyboru elementu, z którego ma być zrobiony zrzut ekranu
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

URL, gdzie hostowana jest instancja Storybooka.

</details>

## Współtworzenie

### Aktualizacja pakietów

Możesz zaktualizować pakiety za pomocą prostego narzędzia CLI. Upewnij się, że zainstalowałeś wszystkie zależności, a następnie uruchom

```sh
pnpm update.packages
```

Spowoduje to uruchomienie CLI, które zada Ci następujące pytania

```logs
==========================
🤖 Package update Wizard 🧙
==========================

? Which version target would you like to update to? (Minor|Latest)
? Do you want to update the package.json files? (Y/n)
? Do you want to remove all "node_modules" and reinstall dependencies? (Y/n)
? Would you like reinstall the dependencies? (Y/n)
```

### Pytania

Dołącz do naszego serwera [Discord](https://discord.webdriver.io), jeśli masz jakiekolwiek pytania lub problemy związane z współtworzeniem tego projektu. Znajdziesz nas, współtwórców, na kanale `🙏-contributing`.

### Problemy

Jeśli masz pytania, błędy lub prośby o funkcje, zgłoś problem. Przed zgłoszeniem problemu, przeszukaj archiwum problemów, aby zmniejszyć duplikaty, i przeczytaj [FAQ](https://webdriver.io/docs/visual-testing/faq/).

Jeśli nie możesz go tam znaleźć, możesz zgłosić:

-   🐛**Raport błędu**: Utwórz raport, aby pomóc nam poprawić
-   📖**Dokumentacja**: Zasugeruj ulepszenia lub zgłoś brakującą/niejasną dokumentację.
-   💡**Prośba o funkcję**: Zasugeruj pomysł na ten moduł.
-   💬**Pytanie**: Zadaj pytania.

### Proces rozwoju

Aby utworzyć PR dla tego projektu i zacząć współtworzyć, postępuj zgodnie z tym przewodnikiem krok po kroku:

-   Zrób fork projektu.
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

-   Uruchom tryb obserwacji, który automatycznie transpiluje kod

    ```sh
    $ pnpm watch
    ```

    aby zbudować projekt, uruchom:

    ```sh
    $ pnpm build
    ```

-   Upewnij się, że Twoje zmiany nie powodują awarii żadnych testów, uruchom:

    ```sh
    $ pnpm test
    ```

Ten projekt używa [changesets](https://github.com/changesets/changesets) do automatycznego tworzenia dzienników zmian i wydań.

### Testowanie

Aby przetestować moduł, należy wykonać kilka testów. Przy dodawaniu PR wszystkie testy muszą co najmniej przejść testy lokalne. Każdy PR jest automatycznie testowany na Sauce Labs, zobacz [nasz pipeline GitHub Actions](https://github.com/webdriverio/visual-testing/actions/workflows/tests.yml). Przed zatwierdzeniem PR główni współtwórcy przetestują PR na emulatorach/symulatorach / prawdziwych urządzeniach.

#### Testowanie lokalne

Najpierw trzeba utworzyć lokalną bazę porównawczą. Można to zrobić za pomocą:

```sh
// Z protokołem webdriver
$ pnpm run test.local.init
```

To polecenie utworzy folder o nazwie `localBaseline`, który będzie zawierał wszystkie obrazy bazowe.

Następnie uruchom:

```sh
// Z protokołem webdriver
pnpm run test.local.desktop
```

Spowoduje to uruchomienie wszystkich testów na lokalnej maszynie na Chrome.

#### Testowanie lokalnego Storybook Runner (Beta)

Najpierw trzeba utworzyć lokalną bazę porównawczą. Można to zrobić za pomocą:

```sh
pnpm run test.local.desktop.storybook
```

Uruchomi to testy Storybook z Chrome w trybie headless na Demo Storybook repo znajdującym się pod adresem https://govuk-react.github.io/govuk-react/.

Aby uruchomić testy z większą liczbą przeglądarek, możesz uruchomić

```sh
pnpm run test.local.desktop.storybook -- --browsers=chrome,firefox,edge,safari
```

> [!NOTE]
> Upewnij się, że masz zainstalowane przeglądarki, na których chcesz uruchamiać testy, na swojej lokalnej maszynie

#### Testowanie CI z Sauce Labs (nie jest wymagane dla PR)

Poniższe polecenie służy do testowania buildu na GitHub Actions, może być używane tylko tam, a nie do lokalnego rozwoju.

```
$ pnpm run test.saucelabs
```

Testuje wiele konfiguracji, które można znaleźć [tutaj](https://github.com/webdriverio/visual-testing/blob/main/./tests/configs/wdio.saucelabs.web.conf.ts).
Wszystkie PR są automatycznie sprawdzane na Sauce Labs.

## Wydawanie

Aby wydać wersję któregokolwiek z wyżej wymienionych pakietów, wykonaj następujące czynności:

-   uruchom [pipeline wydania](https://github.com/webdriverio/visual-testing/actions/workflows/release.yml)
-   generowany jest PR wydania, poproś o jego przegląd i zatwierdzenie przez innego członka WebdriverIO
-   scal PR
-   uruchom [pipeline wydania](https://github.com/webdriverio/visual-testing/actions/workflows/release.yml) ponownie
-   nowa wersja powinna zostać wydana 🎉

## Podziękowania

`@wdio/visual-testing` korzysta z licencji open-source od [LambdaTest](https://www.lambdatest.com/) i [Sauce Labs](https://saucelabs.com/).