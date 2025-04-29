---
id: wdio-visual-service
title: Bildanalys (Visuell regressionstestning) tjänst
custom_edit_url: https://github.com/webdriverio/visual-testing/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @wdio/visual-service är ett tredjepartspaket, för mer information se [GitHub](https://github.com/webdriverio/visual-testing) | [npm](https://www.npmjs.com/package/@wdio/visual-service)

För dokumentation om visuell testning med WebdriverIO, se [docs](https://webdriver.io/docs/visual-testing). Detta projekt innehåller alla relevanta moduler för att köra visuella tester med WebdriverIO. I katalogen `./packages` hittar du:

-   `@wdio/visual-testing`: WebdriverIO-tjänsten för integrering av visuell testning
-   `webdriver-image-comparison`: En bildanalysmodul som kan användas för olika NodeJS-testautomatiseringsramverk som stöder WebDriver-protokollet

## Storybook Runner (BETA)

<details>
  <summary>Klicka för att se mer dokumentation om Storybook Runner BETA</summary>

> Storybook Runner är fortfarande i BETA, dokumentationen kommer senare att flyttas till [WebdriverIO](https://webdriver.io/docs/visual-testing) dokumentationssidor.

Denna modul stöder nu Storybook med en ny Visual Runner. Denna runner söker automatiskt efter en lokal/fjärransluten Storybook-instans och skapar element-skärmbilder av varje komponent. Detta kan göras genom att lägga till

```ts
export const config: WebdriverIO.Config = {
    // ...
    services: ["visual"],
    // ....
};
```

till dina `services` och köra `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook` genom kommandoraden.
Den kommer att använda Chrome i headless-läge som standardwebbläsare.

> [!NOTE]
>
> -   De flesta Visual Testing-alternativen fungerar också för Storybook Runner, se [WebdriverIO](https://webdriver.io/docs/visual-testing) dokumentationen.
> -   Storybook Runner kommer att skriva över alla dina capabilities och kan bara köras på de webbläsare som den stöder, se [`--browsers`](#browsers).
> -   Storybook Runner stöder inte en befintlig konfiguration som använder Multiremote capabilities och kommer att kasta ett fel.
> -   Storybook Runner stöder endast Desktop Web, inte Mobile Web.

### Storybook Runner Service-alternativ

Service-alternativ kan tillhandahållas så här

```ts
export const config: WebdriverIO.Config  = {
    // ...
    services: [
      [
        'visual',
        {
            // Några standardalternativ
            baselineFolder: join(process.cwd(), './__snapshots__/'),
            debug: true,
            // Storybook-alternativen, se cli-alternativ för beskrivningen
            storybook: {
                additionalSearchParams: new URLSearchParams({foo: 'bar', abc: 'def'}),
                clip: false,
                clipSelector: ''#some-id,
                numShards: 4,
                // `skipStories` kan vara en sträng ('example-button--secondary'),
                // en array (['example-button--secondary', 'example-button--small'])
                // eller ett reguljärt uttryck som måste anges som en sträng ("/.*button.*/gm")
                skipStories: ['example-button--secondary', 'example-button--small'],
                url: 'https://www.bbc.co.uk/iplayer/storybook/',
                version: 6,
                // Valfritt - Tillåter överskrivning av baseline-sökvägen. Som standard grupperas baselines efter kategori och komponent (t.ex. forms/input/baseline.png)
                getStoriesBaselinePath: (category, component) => `path__${category}__${component}`,
            },
        },
      ],
    ],
    // ....
}
```

### Storybook Runner CLI-alternativ

#### `--additionalSearchParams`

-   **Typ:** `string`
-   **Obligatoriskt:** Nej
-   **Standard:** ''
-   **Exempel:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --additionalSearchParams="foo=bar&abc=def"`

Det lägger till ytterligare sökparametrar till Storybook-URL:en.
Se [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)-dokumentationen för mer information. Strängen måste vara en giltig URLSearchParams-sträng.

> [!NOTE]
> De dubbla citattecknen behövs för att förhindra att `&` tolkas som en kommandoseparator.
> Till exempel med `--additionalSearchParams="foo=bar&abc=def"` kommer det att generera följande Storybook-URL för stories-test: `http://storybook.url/iframe.html?id=story-id&foo=bar&abc=def`.

#### `--browsers`

-   **Typ:** `string`
-   **Obligatoriskt:** Nej
-   **Standard:** `chrome`, du kan välja mellan `chrome|firefox|edge|safari`
-   **Exempel:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --browsers=chrome,firefox,edge,safari`
-   **OBS:** Endast tillgängligt via CLI

Den kommer att använda de angivna webbläsarna för att ta komponentskärmbilder

> [!NOTE]
> Se till att du har de webbläsare du vill köra på installerade på din lokala maskin

#### `--clip`

-   **Typ:** `boolean`
-   **Obligatoriskt:** Nej
-   **Standard:** `true`
-   **Exempel:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --clip=false`

När den är inaktiverad skapas en viewport-skärmbild. När den är aktiverad skapas element-skärmbilder baserade på [`--clipSelector`](#clipselector) vilket minskar mängden tomt utrymme runt komponentskärmbilden och minskar skärmbildens storlek.

#### `--clipSelector`

-   **Typ:** `string`
-   **Obligatoriskt:** Nej
-   **Standard:** `#storybook-root > :first-child` för Storybook V7 och `#root > :first-child:not(script):not(style)` för Storybook V6, se även [`--version`](#version)
-   **Exempel:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --clipSelector="#some-id"`

Detta är den väljare som kommer att användas:

-   för att välja elementet som skärmbilden ska tas av
-   för elementet som ska vänta på att bli synligt innan en skärmbild tas

#### `--devices`

-   **Typ:** `string`
-   **Obligatoriskt:** Nej
-   **Standard:** Du kan välja från [`deviceDescriptors.ts`](https://github.com/webdriverio/visual-testing/blob/main/./packages/service/src/storybook/deviceDescriptors.ts)
-   **Exempel:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --devices="iPhone 14 Pro Max","Pixel 3 XL"`
-   **OBS:** Endast tillgängligt via CLI

Den kommer att använda de angivna enheterna som matchar [`deviceDescriptors.ts`](https://github.com/webdriverio/visual-testing/blob/main/./packages/service/src/storybook/deviceDescriptors.ts) för att ta komponentskärmbilder

> [!NOTE]
>
> -   Om du saknar en enhetskonfiguration, välkommen att skicka in en [Feature request](https://github.com/webdriverio/visual-testing/issues/new?assignees=&labels=&projects=&template=--feature-request.md)
> -   Detta fungerar endast med Chrome:
>     -   om du anger `--devices` kommer alla Chrome-instanser att köras i **Mobile Emulation**-läge
>     -   om du också anger andra webbläsare än Chrome, som `--devices --browsers=firefox,safari,edge` kommer det automatiskt att lägga till Chrome i Mobile emulation-läge
> -   Storybook Runner kommer som standard att skapa elementskärmbilder, om du vill se den kompletta Mobile Emulated-skärmbilden, ange `--clip=false` via kommandoraden
> -   Filnamnet kommer till exempel att se ut som `__snapshots__/example/button/desktop_chrome/example-button--large-local-chrome-iPhone-14-Pro-Max-430x932-dpr-3.png`
> -   **[KÄLLA:](https://chromedriver.chromium.org/mobile-emulation#h.p_ID_167)** Att testa en mobilwebbplats på en dator med mobil emulering kan vara användbart, men testare bör vara medvetna om att det finns många subtila skillnader såsom:
>     -   helt annan GPU, vilket kan leda till stora prestandaförändringar;
>     -   mobil UI emuleras inte (särskilt påverkar dölj-url-fältet sidhöjden);
>     -   disambigueringspopup (där du väljer ett av flera pekbara mål) stöds inte;
>     -   många hårdvaru-API:er (till exempel orientationchange-händelsen) är inte tillgängliga.

#### `--headless`

-   **Typ:** `boolean`
-   **Obligatoriskt:** Nej
-   **Standard:** `true`
-   **Exempel:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --headless=false`
-   **OBS:** Endast tillgängligt via CLI

Detta kommer som standard att köra testerna i headless-läge (när webbläsaren stöder det) eller kan inaktiveras

#### `--numShards`

-   **Typ:** `number`
-   **Obligatoriskt:** Nej
-   **Standard:** `true`
-   **Exempel:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --numShards=10`

Detta kommer att vara antalet parallella instanser som kommer att användas för att köra stories. Detta kommer att begränsas av `maxInstances` i din `wdio.conf`-fil.

> [!IMPORTANT]
> När du kör i `headless`-läge, öka inte antalet till mer än 20 för att förhindra instabilitet på grund av resursbegränsningar

#### `--skipStories`

-   **Typ:** `string|regex`
-   **Obligatoriskt:** Nej
-   **Standard:** null
-   **Exempel:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --skipStories="/.*button.*/gm"`

Detta kan vara:

-   en sträng (`example-button--secondary,example-button--small`)
-   eller ett reguljärt uttryck (`"/.*button.*/gm"`)

för att hoppa över vissa stories. Använd `id` för storyn som kan hittas i URL:en för storyn. Till exempel är `id` i denna URL `http://localhost:6006/?path=/story/example-page--logged-out` `example-page--logged-out`

#### `--url`

-   **Typ:** `string`
-   **Obligatoriskt:** Nej
-   **Standard:** `http://127.0.0.1:6006`
-   **Exempel:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --url="https://example.com"`

URL:en där din Storybook-instans är värd.

#### `--version`

-   **Typ:** `number`
-   **Obligatoriskt:** Nej
-   **Standard:** 7
-   **Exempel:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --version=6`

Detta är versionen av Storybook, det är standard `7`. Detta behövs för att veta om V6 [`clipSelector`](#clipselector) behöver användas.

### Storybook Interaction Testing

Storybook Interaction Testing låter dig interagera med din komponent genom att skapa anpassade skript med WDIO-kommandon för att sätta en komponent i ett visst tillstånd. Till exempel, se kodavsnittet nedan:

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

Två tester på två olika komponenter utförs. Varje test ställer först in ett tillstånd och tar sedan en skärmbild. Du kommer också att märka att ett nytt anpassat kommando har introducerats, som kan hittas [här](#new-custom-command).

Ovanstående specifikationsfil kan sparas i en mapp och läggas till på kommandoraden med följande kommando:

```sh
pnpm run test.local.desktop.storybook.localhost -- --spec='tests/specs/storybook-interaction/*.ts'
```

Storybook-runnern kommer först automatiskt att skanna din Storybook-instans och sedan lägga till dina tester till de stories som behöver jämföras. Om du inte vill att komponenterna som du använder för interaktionstestning ska jämföras två gånger, kan du lägga till ett filter för att ta bort "standard"-stories från skanningen genom att ange filtret [`--skipStories`](#--skipstories). Det skulle se ut så här:

```sh
pnpm run test.local.desktop.storybook.localhost -- --skipStories="/example-page.*/gm" --spec='tests/specs/storybook-interaction/*.ts'
```

### Nytt anpassat kommando

Ett nytt anpassat kommando kallat `browser.waitForStorybookComponentToBeLoaded({ id: 'componentId' })` kommer att läggas till i `browser/driver`-objektet som automatiskt laddar komponenten och väntar på att den ska vara klar, så du behöver inte använda metoden `browser.url('url.com')`. Det kan användas så här

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

Alternativen är:

#### `additionalSearchParams`

-   **Typ:** [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
-   **Obligatoriskt:** Nej
-   **Standard:** `new URLSearchParams()`
-   **Exempel:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    additionalSearchParams: new URLSearchParams({ foo: "bar", abc: "def" }),
    id: "componentId",
});
```

Detta kommer att lägga till ytterligare sökparametrar till Storybook-URL:en, i exemplet ovan kommer URL:en att vara `http://storybook.url/iframe.html?id=story-id&foo=bar&abc=def`.
Se [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)-dokumentationen för mer information.

#### `clipSelector`

-   **Typ:** `string`
-   **Obligatoriskt:** Nej
-   **Standard:** `#storybook-root > :first-child` för Storybook V7 och `#root > :first-child:not(script):not(style)` för Storybook V6
-   **Exempel:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    clipSelector: "#your-selector",
    id: "componentId",
});
```

Detta är den väljare som kommer att användas:

-   för att välja elementet som skärmbilden ska tas av
-   för elementet som ska vänta på att bli synligt innan en skärmbild tas

#### `id`

-   **Typ:** `string`
-   **Obligatoriskt:** ja
-   **Exempel:**

```ts
await browser.waitForStorybookComponentToBeLoaded({ '#your-selector', id: 'componentId' })
```

Använd `id` för storyn som kan hittas i URL:en för storyn. Till exempel är `id` i denna URL `http://localhost:6006/?path=/story/example-page--logged-out` `example-page--logged-out`

#### `timeout`

-   **Typ:** `number`
-   **Obligatoriskt:** Nej
-   **Standard:** 1100 millisekunder
-   **Exempel:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    id: "componentId",
    timeout: 20000,
});
```

Den maximala tiden vi vill vänta på att en komponent ska bli synlig efter att ha laddats på sidan

#### `url`

-   **Typ:** `string`
-   **Obligatoriskt:** Nej
-   **Standard:** `http://127.0.0.1:6006`
-   **Exempel:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    id: "componentId",
    url: "https://your.url",
});
```

URL:en där din Storybook-instans är värd.

</details>

## Bidra

### Uppdatera paketen

Du kan uppdatera paketen med ett enkelt CLI-verktyg. Se till att du har installerat alla beroenden, du kan sedan köra

```sh
pnpm update.packages
```

Detta kommer att starta en CLI som kommer att fråga dig följande frågor

```logs
==========================
🤖 Package update Wizard 🧙
==========================

? Which version target would you like to update to? (Minor|Latest)
? Do you want to update the package.json files? (Y/n)
? Do you want to remove all "node_modules" and reinstall dependencies? (Y/n)
? Would you like reinstall the dependencies? (Y/n)
```

Detta kommer att resultera i följande loggar

<details>
    <summary>Öppna för att se ett exempel på loggarna</summary>
    
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

### Frågor

Gå med i vår [Discord](https://discord.webdriver.io)-server om du har några frågor eller problem med att bidra till detta projekt. Fånga oss bidragsgivare i kanalen `🙏-contributing`.

### Problem

Om du har frågor, buggar eller funktionsförfrågningar, vänligen skapa ett ärende. Innan du skickar in ett ärende, sök i ärendearkivet för att hjälpa till att minska dubbletter och läs [FAQ](https://webdriver.io/docs/visual-testing/faq/).

Om du inte kan hitta det där kan du skicka in ett ärende där du kan skicka:

-   🐛**Buggrapport**: Skapa en rapport för att hjälpa oss förbättra
-   📖**Dokumentation**: Föreslå förbättringar eller rapportera saknad/oklar dokumentation.
-   💡**Funktionsförfrågan**: Föreslå en idé för denna modul.
-   💬**Fråga**: Ställ frågor.

### Utvecklingsarbetsflöde

För att skapa en PR för detta projekt och börja bidra, följ denna steg-för-steg guide:

-   Forka projektet.
-   Klona projektet någonstans på din dator

    ```sh
    $ git clone https://github.com/webdriverio/visual-testing.git
    ```

-   Gå till katalogen och ställ in projektet

    ```sh
    $ cd visual-testing
    $ corepack enable
    $ pnpm pnpm.install.workaround
    ```

-   Kör watch-läget som automatiskt transpilerar koden

    ```sh
    $ pnpm watch
    ```

    för att bygga projektet, kör:

    ```sh
    $ pnpm build
    ```

-   Se till att dina ändringar inte bryter några tester, kör:

    ```sh
    $ pnpm test
    ```

Detta projekt använder [changesets](https://github.com/changesets/changesets) för att automatiskt skapa ändringsloggar och releaser.

### Testning

Flera tester måste utföras för att kunna testa modulen. När du lägger till en PR måste alla tester åtminstone klara de lokala testerna. Varje PR testas automatiskt mot Sauce Labs, se [vår GitHub Actions-pipeline](https://github.com/webdriverio/visual-testing/actions/workflows/tests.yml). Innan en PR godkänns kommer kärnbidragsgivarna att testa PR mot emulatorer/simulatorer/verkliga enheter.

#### Lokal testning

Först måste en lokal baseline skapas. Detta kan göras med:

```sh
// Med webdriver-protokollet
$ pnpm run test.local.init
```

Detta kommando kommer att skapa en mapp kallad `localBaseline` som kommer att innehålla alla baseline-bilder.

Kör sedan:

```sh
// Med webdriver-protokollet
pnpm run test.local.desktop
```

Detta kommer att köra alla tester på en lokal maskin på Chrome.

#### Lokal Storybook Runner-testning (Beta)

Först måste en lokal baseline skapas. Detta kan göras med:

```sh
pnpm run test.local.desktop.storybook
```

Detta kommer att köra Storybook-tester med Chrome i headless-läge mot en Demo Storybook-repo på https://govuk-react.github.io/govuk-react/.

För att köra testerna med fler webbläsare kan du köra

```sh
pnpm run test.local.desktop.storybook -- --browsers=chrome,firefox,edge,safari
```

> [!NOTE]
> Se till att du har de webbläsare du vill köra på installerade på din lokala maskin

#### CI-testning med Sauce Labs (behövs inte för en PR)

Kommandot nedan används för att testa bygget på GitHub Actions, det kan bara användas där och inte för lokal utveckling.

```
$ pnpm run test.saucelabs
```

Det kommer att testa mot en mängd konfigurationer som kan hittas [här](https://github.com/webdriverio/visual-testing/blob/main/./tests/configs/wdio.saucelabs.web.conf.ts).
Alla PR kontrolleras automatiskt mot Sauce Labs.

## Releaser

För att släppa en version av något av paketen som anges ovan, gör följande:

-   utlös [release-pipelinen](https://github.com/webdriverio/visual-testing/actions/workflows/release.yml)
-   en release-PR genereras, låt denna granskas och godkännas av en annan WebdriverIO-medlem
-   slå ihop PR:en
-   utlös [release-pipelinen](https://github.com/webdriverio/visual-testing/actions/workflows/release.yml) igen
-   en ny version borde släppas 🎉

## Erkännanden

`@wdio/visual-testing` använder en öppen källkodslicens från [LambdaTest](https://www.lambdatest.com/) och [Sauce Labs](https://saucelabs.com/).