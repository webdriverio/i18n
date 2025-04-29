---
id: wdio-visual-service
title: Servizio di confronto immagini (Test di regressione visiva)
custom_edit_url: https://github.com/webdriverio/visual-testing/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @wdio/visual-service è un pacchetto di terze parti, per maggiori informazioni consultare [GitHub](https://github.com/webdriverio/visual-testing) | [npm](https://www.npmjs.com/package/@wdio/visual-service)

Per la documentazione sui test visivi con WebdriverIO, si prega di fare riferimento ai [docs](https://webdriver.io/docs/visual-testing). Questo progetto contiene tutti i moduli rilevanti per l'esecuzione di test visivi con WebdriverIO. All'interno della directory `./packages` troverai:

-   `@wdio/visual-testing`: il servizio WebdriverIO per l'integrazione dei test visivi
-   `webdriver-image-comparison`: Un modulo di confronto immagini che può essere utilizzato per diversi framework di automazione dei test NodeJS che supportano il protocollo WebDriver

## Storybook Runner (BETA)

<details>
  <summary>Clicca per scoprire maggiori informazioni sulla BETA di Storybook Runner</summary>

> Storybook Runner è ancora in BETA, la documentazione verrà successivamente spostata nelle pagine di documentazione di [WebdriverIO](https://webdriver.io/docs/visual-testing).

Questo modulo ora supporta Storybook con un nuovo Visual Runner. Questo runner scansiona automaticamente un'istanza Storybook locale/remota e creerà screenshot degli elementi di ogni componente. Questo può essere fatto aggiungendo

```ts
export const config: WebdriverIO.Config = {
    // ...
    services: ["visual"],
    // ....
};
```

ai tuoi `services` ed eseguendo `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook` dalla riga di comando.
Utilizzerà Chrome in modalità headless come browser predefinito.

> [!NOTE]
>
> -   La maggior parte delle opzioni di Visual Testing funzionerà anche per lo Storybook Runner, consulta la documentazione [WebdriverIO](https://webdriver.io/docs/visual-testing).
> -   Lo Storybook Runner sovrascriverà tutte le tue capabilities e può essere eseguito solo sui browser che supporta, vedi [`--browsers`](#browsers).
> -   Lo Storybook Runner non supporta una configurazione esistente che utilizza capabilities Multiremote e genererà un errore.
> -   Lo Storybook Runner supporta solo Desktop Web, non Mobile Web.

### Opzioni del servizio Storybook Runner

Le opzioni del servizio possono essere fornite in questo modo

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
            // Le opzioni di storybook, vedi le opzioni cli per la descrizione
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

### Opzioni CLI di Storybook Runner

#### `--additionalSearchParams`

-   **Tipo:** `string`
-   **Obbligatorio:** No
-   **Predefinito:** ''
-   **Esempio:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --additionalSearchParams="foo=bar&abc=def"`

Aggiungerà parametri di ricerca aggiuntivi all'URL di Storybook.
Consulta la documentazione di [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) per maggiori informazioni. La stringa deve essere una stringa URLSearchParams valida.

> [!NOTE]
> Le virgolette doppie sono necessarie per evitare che il carattere `&` venga interpretato come un separatore di comandi.
> Ad esempio con `--additionalSearchParams="foo=bar&abc=def"` genererà il seguente URL Storybook per il test delle storie: `http://storybook.url/iframe.html?id=story-id&foo=bar&abc=def`.

#### `--browsers`

-   **Tipo:** `string`
-   **Obbligatorio:** No
-   **Predefinito:** `chrome`, puoi selezionare tra `chrome|firefox|edge|safari`
-   **Esempio:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --browsers=chrome,firefox,edge,safari`
-   **NOTA:** Disponibile solo tramite CLI

Utilizzerà i browser forniti per scattare screenshot dei componenti

> [!NOTE]
> Assicurati di avere installati sulla tua macchina locale i browser su cui desideri eseguire i test

#### `--clip`

-   **Tipo:** `boolean`
-   **Obbligatorio:** No
-   **Predefinito:** `true`
-   **Esempio:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --clip=false`

Quando disabilitato creerà uno screenshot del viewport. Quando abilitato creerà screenshot degli elementi in base al [`--clipSelector`](#clipselector) che ridurrà la quantità di spazio bianco intorno allo screenshot del componente e ridurrà la dimensione dello screenshot.

#### `--clipSelector`

-   **Tipo:** `string`
-   **Obbligatorio:** No
-   **Predefinito:** `#storybook-root > :first-child` per Storybook V7 e `#root > :first-child:not(script):not(style)` per Storybook V6, vedi anche [`--version`](#version)
-   **Esempio:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --clipSelector="#some-id"`

Questo è il selettore che verrà utilizzato:

-   per selezionare l'elemento di cui scattare lo screenshot
-   per l'elemento da attendere che sia visibile prima che venga scattato uno screenshot

#### `--devices`

-   **Tipo:** `string`
-   **Obbligatorio:** No
-   **Predefinito:** Puoi selezionare da [`deviceDescriptors.ts`](https://github.com/webdriverio/visual-testing/blob/main/./packages/service/src/storybook/deviceDescriptors.ts)
-   **Esempio:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --devices="iPhone 14 Pro Max","Pixel 3 XL"`
-   **NOTA:** Disponibile solo tramite CLI

Utilizzerà i dispositivi forniti che corrispondono a [`deviceDescriptors.ts`](https://github.com/webdriverio/visual-testing/blob/main/./packages/service/src/storybook/deviceDescriptors.ts) per scattare screenshot dei componenti

> [!NOTE]
>
> -   Se ti manca una configurazione del dispositivo, sentiti libero di inviare una [richiesta di funzionalità](https://github.com/webdriverio/visual-testing/issues/new?assignees=&labels=&projects=&template=--feature-request.md)
> -   Questo funzionerà solo con Chrome:
>     -   se fornisci `--devices` allora tutte le istanze di Chrome verranno eseguite in modalità **Mobile Emulation**
>     -   se fornisci anche altri browser oltre a Chrome, come `--devices --browsers=firefox,safari,edge` aggiungerà automaticamente Chrome in modalità di emulazione mobile
> -   Lo Storybook Runner per impostazione predefinita creerà istantanee degli elementi, se vuoi vedere lo screenshot completo dell'emulazione mobile allora fornisci `--clip=false` tramite la riga di comando
> -   Il nome del file sembrerà ad esempio `__snapshots__/example/button/desktop_chrome/example-button--large-local-chrome-iPhone-14-Pro-Max-430x932-dpr-3.png`
> -   **[SRC:](https://chromedriver.chromium.org/mobile-emulation#h.p_ID_167)** Testare un sito web mobile su desktop utilizzando l'emulazione mobile può essere utile, ma i tester dovrebbero essere consapevoli che ci sono molte sottili differenze come:
>     -   GPU completamente diversa, che può portare a grandi cambiamenti di prestazioni;
>     -   l'interfaccia utente mobile non è emulata (in particolare, la barra URL nascosta influisce sull'altezza della pagina);
>     -   il popup di disambiguazione (dove si seleziona uno dei target touch) non è supportato;
>     -   molte API hardware (ad esempio, l'evento orientationchange) non sono disponibili.

#### `--headless`

-   **Tipo:** `boolean`
-   **Obbligatorio:** No
-   **Predefinito:** `true`
-   **Esempio:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --headless=false`
-   **NOTA:** Disponibile solo tramite CLI

Eseguirà i test di default in modalità headless (quando il browser lo supporta) o può essere disabilitato

#### `--numShards`

-   **Tipo:** `number`
-   **Obbligatorio:** No
-   **Predefinito:** `true`
-   **Esempio:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --numShards=10`

Questo sarà il numero di istanze parallele che verranno utilizzate per eseguire le storie. Questo sarà limitato dal `maxInstances` nel tuo file `wdio.conf`.

> [!IMPORTANT]
> Quando si esegue in modalità `headless` non aumentare il numero a più di 20 per evitare instabilità dovute a restrizioni di risorse

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

Questa è la versione di Storybook, per impostazione predefinita è `7`. Questo è necessario per sapere se deve essere utilizzato il [`clipSelector`](#clipselector) di V6.

### Test di interazione con Storybook

I test di interazione di Storybook ti permettono di interagire con il tuo componente creando script personalizzati con comandi WDIO per impostare un componente in un certo stato. Ad esempio, vedi lo snippet di codice qui sotto:

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

Un nuovo comando personalizzato chiamato `browser.waitForStorybookComponentToBeLoaded({ id: 'componentId' })` verrà aggiunto all'oggetto `browser/driver` che caricherà automaticamente il componente e attenderà che sia pronto, quindi non è necessario utilizzare il metodo `browser.url('url.com')`. Può essere utilizzato così

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
Consulta la documentazione di [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) per maggiori informazioni.

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
-   per l'elemento da attendere che sia visibile prima che venga scattato uno screenshot

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

Puoi aggiornare i pacchetti con un semplice strumento CLI. Assicurati di aver installato tutte le dipendenze, quindi puoi eseguire

```sh
pnpm update.packages
```

Questo avvierà una CLI che ti porrà le seguenti domande

```logs
==========================
🤖 Package update Wizard 🧙
==========================

? Which version target would you like to update to? (Minor|Latest)
? Do you want to update the package.json files? (Y/n)
? Do you want to remove all "node_modules" and reinstall dependencies? (Y/n)
? Would you like reinstall the dependencies? (Y/n)
```

### Domande

Per favore, unisciti al nostro server [Discord](https://discord.webdriver.io) se hai domande o problemi nel contribuire a questo progetto. Troverai i contributori nel canale `🙏-contributing`.

### Problemi

Se hai domande, bug o richieste di funzionalità, per favore apri una issue. Prima di inviare una issue, cerca nell'archivio delle issue per aiutare a ridurre i duplicati, e leggi le [FAQ](https://webdriver.io/docs/visual-testing/faq/).

Se non riesci a trovare risposta, puoi inviare una issue dove puoi:

-   🐛**Segnalazione di bug**: Crea un rapporto per aiutarci a migliorare
-   📖**Documentazione**: Suggerisci miglioramenti o segnala documentazione mancante/poco chiara.
-   💡**Richiesta di funzionalità**: Suggerisci un'idea per questo modulo.
-   💬**Domanda**: Fai domande.

### Flusso di sviluppo

Per creare una PR per questo progetto e iniziare a contribuire, segui questa guida passo-passo:

-   Fai il fork del progetto.
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

È necessario eseguire diversi test per poter testare il modulo. Quando si aggiunge una PR, tutti i test devono almeno superare i test locali. Ogni PR viene automaticamente testata su Sauce Labs, vedi [la nostra pipeline GitHub Actions](https://github.com/webdriverio/visual-testing/actions/workflows/tests.yml). Prima di approvare una PR, i contributori principali testeranno la PR su emulatori/simulatori / dispositivi reali.

#### Test locali

Prima, è necessario creare una baseline locale. Questo può essere fatto con:

```sh
// Con il protocollo webdriver
$ pnpm run test.local.init
```

Questo comando creerà una cartella chiamata `localBaseline` che conterrà tutte le immagini di baseline.

Poi esegui:

```sh
// Con il protocollo webdriver
pnpm run test.local.desktop
```

Questo eseguirà tutti i test su una macchina locale su Chrome.

#### Test locali di Storybook Runner (Beta)

Prima, è necessario creare una baseline locale. Questo può essere fatto con:

```sh
pnpm run test.local.desktop.storybook
```

Questo eseguirà i test di Storybook con Chrome in modalità headless contro un repo Demo Storybook situato su https://govuk-react.github.io/govuk-react/.

Per eseguire i test con più browser, puoi eseguire

```sh
pnpm run test.local.desktop.storybook -- --browsers=chrome,firefox,edge,safari
```

> [!NOTE]
> Assicurati di avere installati sulla tua macchina locale i browser su cui desideri eseguire i test

#### Test CI con Sauce Labs (non necessari per una PR)

Il comando seguente viene utilizzato per testare la build su GitHub Actions, può essere utilizzato solo lì e non per lo sviluppo locale.

```
$ pnpm run test.saucelabs
```

Testerà su molte configurazioni che possono essere trovate [qui](https://github.com/webdriverio/visual-testing/blob/main/./tests/configs/wdio.saucelabs.web.conf.ts).
Tutte le PR sono automaticamente controllate su Sauce Labs.

## Rilascio

Per rilasciare una versione di uno qualsiasi dei pacchetti elencati sopra, fai quanto segue:

-   avvia la [pipeline di rilascio](https://github.com/webdriverio/visual-testing/actions/workflows/release.yml)
-   viene generata una PR di rilascio, falla esaminare e approvare da un altro membro di WebdriverIO
-   unisci la PR
-   avvia nuovamente la [pipeline di rilascio](https://github.com/webdriverio/visual-testing/actions/workflows/release.yml)
-   dovrebbe essere rilasciata una nuova versione 🎉

## Crediti

`@wdio/visual-testing` utilizza una licenza open-source da [LambdaTest](https://www.lambdatest.com/) e [Sauce Labs](https://saucelabs.com/).