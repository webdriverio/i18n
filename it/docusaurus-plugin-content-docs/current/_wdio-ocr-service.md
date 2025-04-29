---
id: wdio-ocr-service
title: Servizio di Test OCR
custom_edit_url: https://github.com/webdriverio/visual-testing/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @wdio/ocr-service è un pacchetto di terze parti, per maggiori informazioni consultare [GitHub](https://github.com/webdriverio/visual-testing) | [npm](https://www.npmjs.com/package/@wdio/ocr-service)

Per la documentazione sui test visivi con WebdriverIO, consulta i [docs](https://webdriver.io/docs/visual-testing). Questo progetto contiene tutti i moduli rilevanti per eseguire test visivi con WebdriverIO. All'interno della directory `./packages` troverai:

-   `@wdio/visual-testing`: il servizio WebdriverIO per l'integrazione dei test visivi
-   `webdriver-image-comparison`: Un modulo di confronto immagini che può essere utilizzato per diversi framework di automazione dei test NodeJS che supportano il protocollo WebDriver

## Storybook Runner (BETA)

<details>
  <summary>Clicca per scoprire ulteriori informazioni sul Storybook Runner BETA</summary>

> Storybook Runner è ancora in BETA, la documentazione verrà successivamente spostata nelle pagine di documentazione di [WebdriverIO](https://webdriver.io/docs/visual-testing).

Questo modulo ora supporta Storybook con un nuovo Visual Runner. Questo runner scansiona automaticamente un'istanza Storybook locale/remota e creerà screenshot degli elementi di ogni componente. Ciò può essere fatto aggiungendo

```ts
export const config: WebdriverIO.Config = {
    // ...
    services: ["visual"],
    // ....
};
```

ai tuoi `services` ed eseguendo `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook` tramite la riga di comando.
Utilizzerà Chrome in modalità headless come browser predefinito.

> [!NOTE]
>
> -   La maggior parte delle opzioni di Visual Testing funzioneranno anche per lo Storybook Runner, consulta la documentazione di [WebdriverIO](https://webdriver.io/docs/visual-testing).
> -   Lo Storybook Runner sovrascriverà tutte le tue capacità e può essere eseguito solo sui browser che supporta, vedi [`--browsers`](#browsers).
> -   Lo Storybook Runner non supporta una configurazione esistente che utilizza capacità Multiremote e genererà un errore.
> -   Lo Storybook Runner supporta solo Desktop Web, non Mobile Web.

### Opzioni del servizio Storybook Runner

Le opzioni di servizio possono essere fornite in questo modo

```ts
export const config: WebdriverIO.Config  = {
    // ...
    services: [
      [
        'visual',
        {
            // Alcune opzioni predefinite
            baselineFolder: join(process.cwd(), './__snapshots__/'),
            debug: true,
            // Le opzioni storybook, vedi le opzioni cli per la descrizione
            storybook: {
                additionalSearchParams: new URLSearchParams({foo: 'bar', abc: 'def'}),
                clip: false,
                clipSelector: ''#some-id,
                numShards: 4,
                // `skipStories` può essere una stringa ('example-button--secondary'),
                // un array (['example-button--secondary', 'example-button--small'])
                // o un'espressione regolare che deve essere fornita come stringa ("/.*button.*/gm")
                skipStories: ['example-button--secondary', 'example-button--small'],
                url: 'https://www.bbc.co.uk/iplayer/storybook/',
                version: 6,
                // Opzionale - Consente di sovrascrivere il percorso delle baseline. Di default raggrupperà le baseline per categoria e componente (es. forms/input/baseline.png)
                getStoriesBaselinePath: (category, component) => `path__${category}__${component}`,
            },
        },
      ],
    ],
    // ....
}
```

### Opzioni CLI per Storybook Runner

#### `--additionalSearchParams`

-   **Tipo:** `string`
-   **Obbligatorio:** No
-   **Predefinito:** ''
-   **Esempio:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --additionalSearchParams="foo=bar&abc=def"`

Aggiunge parametri di ricerca aggiuntivi all'URL di Storybook.
Vedi la documentazione di [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) per maggiori informazioni. La stringa deve essere una stringa URLSearchParams valida.

> [!NOTE]
> Le virgolette doppie sono necessarie per evitare che `&` venga interpretato come separatore di comandi.
> Ad esempio con `--additionalSearchParams="foo=bar&abc=def"` genererà il seguente URL Storybook per i test delle storie: `http://storybook.url/iframe.html?id=story-id&foo=bar&abc=def`.

#### `--browsers`

-   **Tipo:** `string`
-   **Obbligatorio:** No
-   **Predefinito:** `chrome`, puoi selezionare tra `chrome|firefox|edge|safari`
-   **Esempio:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --browsers=chrome,firefox,edge,safari`
-   **NOTA:** Disponibile solo tramite CLI

Utilizzerà i browser forniti per scattare screenshot dei componenti

> [!NOTE]
> Assicurati di avere installati sulla tua macchina locale i browser che desideri utilizzare

#### `--clip`

-   **Tipo:** `boolean`
-   **Obbligatorio:** No
-   **Predefinito:** `true`
-   **Esempio:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --clip=false`

Quando disabilitato creerà uno screenshot del viewport. Quando abilitato creerà screenshot degli elementi basati sul [`--clipSelector`](#clipselector) che ridurrà la quantità di spazio bianco attorno allo screenshot del componente e ridurrà la dimensione dello screenshot.

#### `--clipSelector`

-   **Tipo:** `string`
-   **Obbligatorio:** No
-   **Predefinito:** `#storybook-root > :first-child` per Storybook V7 e `#root > :first-child:not(script):not(style)` per Storybook V6, vedi anche [`--version`](#version)
-   **Esempio:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --clipSelector="#some-id"`

Questo è il selettore che verrà utilizzato:

-   per selezionare l'elemento di cui scattare lo screenshot
-   per l'elemento da attendere che sia visibile prima di scattare uno screenshot

#### `--devices`

-   **Tipo:** `string`
-   **Obbligatorio:** No
-   **Predefinito:** Puoi selezionare da [`deviceDescriptors.ts`](https://github.com/webdriverio/visual-testing/blob/main/./packages/service/src/storybook/deviceDescriptors.ts)
-   **Esempio:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --devices="iPhone 14 Pro Max","Pixel 3 XL"`
-   **NOTA:** Disponibile solo tramite CLI

Utilizzerà i dispositivi forniti che corrispondono ai [`deviceDescriptors.ts`](https://github.com/webdriverio/visual-testing/blob/main/./packages/service/src/storybook/deviceDescriptors.ts) per scattare screenshot dei componenti

> [!NOTE]
>
> -   Se ti manca una configurazione di dispositivo, sentiti libero di inviare una [richiesta di funzionalità](https://github.com/webdriverio/visual-testing/issues/new?assignees=&labels=&projects=&template=--feature-request.md)
> -   Questo funzionerà solo con Chrome:
>     -   se fornisci `--devices` tutte le istanze di Chrome verranno eseguite in modalità **Mobile Emulation**
>     -   se fornisci anche altri browser oltre a Chrome, come `--devices --browsers=firefox,safari,edge` aggiungerà automaticamente Chrome in modalità emulazione Mobile
> -   Lo Storybook Runner creerà per impostazione predefinita snapshot degli elementi, se vuoi vedere lo screenshot completo dell'emulazione Mobile fornisci `--clip=false` tramite la riga di comando
> -   Il nome del file avrà ad esempio questo aspetto `__snapshots__/example/button/desktop_chrome/example-button--large-local-chrome-iPhone-14-Pro-Max-430x932-dpr-3.png`
> -   **[SRC:](https://chromedriver.chromium.org/mobile-emulation#h.p_ID_167)** Testare un sito web mobile su un desktop utilizzando l'emulazione mobile può essere utile, ma i tester dovrebbero essere consapevoli che ci sono molte sottili differenze come:
>     -   GPU completamente diversa, che può portare a grandi cambiamenti di prestazioni;
>     -   l'interfaccia utente mobile non è emulata (in particolare, la barra url nascosta influisce sull'altezza della pagina);
>     -   il popup di disambiguazione (dove si seleziona uno dei pochi target touch) non è supportato;
>     -   molte API hardware (ad esempio, l'evento orientationchange) non sono disponibili.

#### `--headless`

-   **Tipo:** `boolean`
-   **Obbligatorio:** No
-   **Predefinito:** `true`
-   **Esempio:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --headless=false`
-   **NOTA:** Disponibile solo tramite CLI

Questo eseguirà i test per impostazione predefinita in modalità headless (quando il browser lo supporta) o può essere disabilitato

#### `--numShards`

-   **Tipo:** `number`
-   **Obbligatorio:** No
-   **Predefinito:** `true`
-   **Esempio:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --numShards=10`

Questo sarà il numero di istanze parallele che verranno utilizzate per eseguire le storie. Sarà limitato dal `maxInstances` nel tuo file `wdio.conf`.

> [!IMPORTANT]
> Quando si esegue in modalità `headless`, non aumentare il numero a più di 20 per evitare instabilità dovute a restrizioni di risorse

#### `--skipStories`

-   **Tipo:** `string|regex`
-   **Obbligatorio:** No
-   **Predefinito:** null
-   **Esempio:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --skipStories="/.*button.*/gm"`

Questo può essere:

-   una stringa (`example-button--secondary,example-button--small`)
-   o un'espressione regolare (`"/.*button.*/gm"`)

per saltare determinate storie. Usa l'`id` della storia che può essere trovato nell'URL della storia. Ad esempio, l'`id` in questo URL `http://localhost:6006/?path=/story/example-page--logged-out` è `example-page--logged-out`

#### `--url`

-   **Tipo:** `string`
-   **Obbligatorio:** No
-   **Predefinito:** `http://127.0.0.1:6006`
-   **Esempio:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --url="https://example.com"`

L'URL dove è ospitata la tua istanza Storybook.

#### `--version`

-   **Tipo:** `number`
-   **Obbligatorio:** No
-   **Predefinito:** 7
-   **Esempio:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --version=6`

Questa è la versione di Storybook, per impostazione predefinita è `7`. Questo è necessario per sapere se deve essere utilizzato il [`clipSelector`](#clipselector) V6.

### Test di Interazione con Storybook

I test di interazione di Storybook ti permettono di interagire con il tuo componente creando script personalizzati con comandi WDIO per impostare un componente in un determinato stato. Ad esempio, vedi il frammento di codice qui sotto:

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

Vengono eseguiti due test su due componenti diversi. Ogni test imposta prima uno stato e poi scatta uno screenshot. Noterai anche che è stato introdotto un nuovo comando personalizzato, che puoi trovare [qui](#new-custom-command).

Il file spec sopra può essere salvato in una cartella e aggiunto alla riga di comando con il seguente comando:

```sh
pnpm run test.local.desktop.storybook.localhost -- --spec='tests/specs/storybook-interaction/*.ts'
```

Lo Storybook runner prima scansionerà automaticamente la tua istanza Storybook e poi aggiungerà i tuoi test alle storie che devono essere confrontate. Se non vuoi che i componenti che usi per i test di interazione vengano confrontati due volte, puoi aggiungere un filtro per rimuovere le storie "predefinite" dalla scansione fornendo il filtro [`--skipStories`](#--skipstories). Questo apparirebbe così:

```sh
pnpm run test.local.desktop.storybook.localhost -- --skipStories="/example-page.*/gm" --spec='tests/specs/storybook-interaction/*.ts'
```

### Nuovo comando personalizzato

Un nuovo comando personalizzato chiamato `browser.waitForStorybookComponentToBeLoaded({ id: 'componentId' })` verrà aggiunto all'oggetto `browser/driver` che caricherà automaticamente il componente e attenderà che sia completato, quindi non è necessario utilizzare il metodo `browser.url('url.com')`. Può essere utilizzato così

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

Le opzioni sono:

#### `additionalSearchParams`

-   **Tipo:** [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
-   **Obbligatorio:** No
-   **Predefinito:** `new URLSearchParams()`
-   **Esempio:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    additionalSearchParams: new URLSearchParams({ foo: "bar", abc: "def" }),
    id: "componentId",
});
```

Questo aggiungerà parametri di ricerca aggiuntivi all'URL di Storybook, nell'esempio sopra l'URL sarà `http://storybook.url/iframe.html?id=story-id&foo=bar&abc=def`.
Vedi la documentazione di [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) per maggiori informazioni.

#### `clipSelector`

-   **Tipo:** `string`
-   **Obbligatorio:** No
-   **Predefinito:** `#storybook-root > :first-child` per Storybook V7 e `#root > :first-child:not(script):not(style)` per Storybook V6
-   **Esempio:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    clipSelector: "#your-selector",
    id: "componentId",
});
```

Questo è il selettore che verrà utilizzato:

-   per selezionare l'elemento di cui scattare lo screenshot
-   per l'elemento da attendere che sia visibile prima di scattare uno screenshot

#### `id`

-   **Tipo:** `string`
-   **Obbligatorio:** sì
-   **Esempio:**

```ts
await browser.waitForStorybookComponentToBeLoaded({ '#your-selector', id: 'componentId' })
```

Usa l'`id` della storia che può essere trovato nell'URL della storia. Ad esempio, l'`id` in questo URL `http://localhost:6006/?path=/story/example-page--logged-out` è `example-page--logged-out`

#### `timeout`

-   **Tipo:** `number`
-   **Obbligatorio:** No
-   **Predefinito:** 1100 millisecondi
-   **Esempio:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    id: "componentId",
    timeout: 20000,
});
```

Il timeout massimo che vogliamo attendere affinché un componente sia visibile dopo il caricamento sulla pagina

#### `url`

-   **Tipo:** `string`
-   **Obbligatorio:** No
-   **Predefinito:** `http://127.0.0.1:6006`
-   **Esempio:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    id: "componentId",
    url: "https://your.url",
});
```

L'URL dove è ospitata la tua istanza Storybook.

</details>

## Contribuire

### Aggiornamento dei pacchetti

Puoi aggiornare i pacchetti con un semplice strumento CLI. Assicurati di aver installato tutte le dipendenze, poi puoi eseguire

```sh
pnpm update.packages
```

Questo attiverà una CLI che ti porrà le seguenti domande

```logs
==========================
🤖 Package update Wizard 🧙
==========================

? Which version target would you like to update to? (Minor|Latest)
? Do you want to update the package.json files? (Y/n)
? Do you want to remove all "node_modules" and reinstall dependencies? (Y/n)
? Would you like reinstall the dependencies? (Y/n)
```

Questo darà come risultato i seguenti log

<details>
    <summary>Apri per vedere un esempio dei log</summary>
    
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

### Domande

Unisciti al nostro server [Discord](https://discord.webdriver.io) se hai domande o problemi nel contribuire a questo progetto. Trova i contributori nel canale `🙏-contributing`.

### Problemi

Se hai domande, bug o richieste di funzionalità, apri una segnalazione. Prima di inviare una segnalazione, cerca nell'archivio delle segnalazioni per ridurre i duplicati e leggi le [FAQ](https://webdriver.io/docs/visual-testing/faq/).

Se non trovi ciò che cerchi, puoi inviare una segnalazione dove puoi sottoporre:

-   🐛**Bug report**: Crea un rapporto per aiutarci a migliorare
-   📖**Documentazione**: Suggerisci miglioramenti o segnala documentazione mancante/poco chiara.
-   💡**Richiesta funzionalità**: Suggerisci un'idea per questo modulo.
-   💬**Domanda**: Fai domande.

### Flusso di sviluppo

Per creare una PR per questo progetto e iniziare a contribuire, segui questa guida passo-passo:

-   Fai un fork del progetto.
-   Clona il progetto da qualche parte sul tuo computer

    ```sh
    $ git clone https://github.com/webdriverio/visual-testing.git
    ```

-   Vai alla directory e configura il progetto

    ```sh
    $ cd visual-testing
    $ corepack enable
    $ pnpm pnpm.install.workaround
    ```

-   Esegui la modalità watch che traspilerà automaticamente il codice

    ```sh
    $ pnpm watch
    ```

    per compilare il progetto, esegui:

    ```sh
    $ pnpm build
    ```

-   Assicurati che le tue modifiche non interrompano nessun test, esegui:

    ```sh
    $ pnpm test
    ```

Questo progetto utilizza [changesets](https://github.com/changesets/changesets) per creare automaticamente changelog e release.

### Test

È necessario eseguire diversi test per poter testare il modulo. Quando si aggiunge una PR, tutti i test devono superare almeno i test locali. Ogni PR viene automaticamente testata su Sauce Labs, vedi [la nostra pipeline GitHub Actions](https://github.com/webdriverio/visual-testing/actions/workflows/tests.yml). Prima di approvare una PR, i contributori principali testeranno la PR su emulatori/simulatori / dispositivi reali.

#### Test locali

Prima, è necessario creare una baseline locale. Questo può essere fatto con:

```sh
// Con il protocollo webdriver
$ pnpm run test.local.init
```

Questo comando creerà una cartella chiamata `localBaseline` che conterrà tutte le immagini di baseline.

Quindi esegui:

```sh
// Con il protocollo webdriver
pnpm run test.local.desktop
```

Questo eseguirà tutti i test su una macchina locale su Chrome.

#### Test locali con Storybook Runner (Beta)

Prima, è necessario creare una baseline locale. Questo può essere fatto con:

```sh
pnpm run test.local.desktop.storybook
```

Questo eseguirà i test Storybook con Chrome in modalità headless contro un repo Demo Storybook situato su https://govuk-react.github.io/govuk-react/.

Per eseguire i test con più browser puoi eseguire

```sh
pnpm run test.local.desktop.storybook -- --browsers=chrome,firefox,edge,safari
```

> [!NOTE]
> Assicurati di avere installati sulla tua macchina locale i browser su cui vuoi eseguire i test

#### Test CI con Sauce Labs (non necessario per una PR)

Il comando seguente viene utilizzato per testare la build su GitHub Actions, può essere utilizzato solo lì e non per lo sviluppo locale.

```
$ pnpm run test.saucelabs
```

Testerà su molte configurazioni che possono essere trovate [qui](https://github.com/webdriverio/visual-testing/blob/main/./tests/configs/wdio.saucelabs.web.conf.ts).
Tutte le PR vengono automaticamente controllate su Sauce Labs.

## Rilasci

Per rilasciare una versione di uno qualsiasi dei pacchetti elencati sopra, procedi come segue:

-   attiva la [pipeline di rilascio](https://github.com/webdriverio/visual-testing/actions/workflows/release.yml)
-   viene generata una PR di rilascio, falla revisionare e approvare da un altro membro di WebdriverIO
-   unisci la PR
-   attiva di nuovo la [pipeline di rilascio](https://github.com/webdriverio/visual-testing/actions/workflows/release.yml)
-   dovrebbe essere rilasciata una nuova versione 🎉

## Crediti

`@wdio/visual-testing` utilizza una licenza open-source da [LambdaTest](https://www.lambdatest.com/) e [Sauce Labs](https://saucelabs.com/).