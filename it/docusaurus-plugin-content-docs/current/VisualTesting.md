---
id: visual-testing
title: Test Visivi
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Cosa può fare?

WebdriverIO fornisce confronti di immagini su schermi, elementi o pagine intere per

-   🖥️ Browser desktop (Chrome / Firefox / Safari / Microsoft Edge)
-   📱 Browser mobili / tablet (Chrome su emulatori Android / Safari su Simulatori iOS / Simulatori / dispositivi reali) tramite Appium
-   📱 App native (emulatori Android / Simulatori iOS / dispositivi reali) tramite Appium (🌟 **NUOVO** 🌟)
-   📳 App ibride tramite Appium

attraverso il [`@wdio/visual-service`](https://www.npmjs.com/package/@wdio/visual-service) che è un servizio leggero di WebdriverIO.

Questo ti permette di:

-   salvare o confrontare **schermate/elementi/pagine intere** rispetto a una baseline
-   **creare automaticamente una baseline** quando non ne esiste una
-   **bloccare regioni personalizzate** e persino **escludere automaticamente** barre di stato e/o strumenti (solo mobile) durante un confronto
-   aumentare le dimensioni degli screenshot degli elementi
-   **nascondere il testo** durante il confronto dei siti web per:
    -   **migliorare la stabilità** e prevenire instabilità nel rendering dei font
    -   concentrarti solo sul **layout** di un sito web
-   utilizzare **diversi metodi di confronto** e un insieme di **matcher aggiuntivi** per test più leggibili
-   verificare come il tuo sito web **supporterà la navigazione con la tastiera tramite tab**, vedi anche [Navigazione con tab attraverso un sito web](#tabbing-through-a-website)
-   e molto altro, consulta le opzioni del [servizio](./visual-testing/service-options) e dei [metodi](./visual-testing/method-options)

Il servizio è un modulo leggero per recuperare i dati e gli screenshot necessari per tutti i browser/dispositivi. La potenza di confronto proviene da [ResembleJS](https://github.com/Huddle/Resemble.js). Se vuoi confrontare immagini online puoi controllare lo [strumento online](http://rsmbl.github.io/Resemble.js/).

:::info NOTA Per App Native/Ibride
I metodi `saveScreen`, `saveElement`, `checkScreen`, `checkElement` e i matcher `toMatchScreenSnapshot` e `toMatchElementSnapshot` possono essere utilizzati per App/Contesti Nativi.

Si prega di utilizzare la proprietà `isHybridApp:true` nelle impostazioni del servizio quando si desidera utilizzarlo per App Ibride.
:::

## Installazione

Il modo più semplice è mantenere `@wdio/visual-service` come dev-dependency nel tuo `package.json`, tramite:

```sh
npm install --save-dev @wdio/visual-service
```

## Utilizzo

`@wdio/visual-service` può essere utilizzato come un normale servizio. Puoi configurarlo nel tuo file di configurazione con quanto segue:

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
                // Alcune opzioni, vedi la documentazione per altre
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                formatImageName: "{tag}-{logName}-{width}x{height}",
                screenshotPath: path.join(process.cwd(), "tmp"),
                savePerInstance: true,
                // ... altre opzioni
            },
        ],
    ],
    // ...
};
```

Altre opzioni del servizio possono essere trovate [qui](/docs/visual-testing/service-options).

Una volta configurato nella tua configurazione WebdriverIO, puoi procedere e aggiungere asserzioni visive ai [tuoi test](/docs/visual-testing/writing-tests).

### Funzionalità
Per utilizzare il modulo di Test Visivi, **non è necessario aggiungere opzioni extra alle tue capabilities**. Tuttavia, in alcuni casi, potresti voler aggiungere metadati aggiuntivi ai tuoi test visivi, come un `logName`.

Il `logName` ti permette di assegnare un nome personalizzato a ciascuna capability, che può poi essere incluso nei nomi dei file delle immagini. Questo è particolarmente utile per distinguere screenshot acquisiti su diversi browser, dispositivi o configurazioni.

Per abilitare questa funzionalità, puoi definire `logName` nella sezione `capabilities` e assicurarti che l'opzione `formatImageName` nel servizio di Test Visivi lo referenzi. Ecco come puoi configurarlo:

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
                logName: 'chrome-mac-15', // Nome log personalizzato per Chrome
            },
        }
        {
            browserName: 'firefox',
            'wdio-ics:options': {
                logName: 'firefox-mac-15', // Nome log personalizzato per Firefox
            },
        }
    ],
    services: [
        [
            "visual",
            {
                // Alcune opzioni, vedi la documentazione per altre
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                screenshotPath: path.join(process.cwd(), "tmp"),
                // Il formato seguente utilizzerà il `logName` dalle capabilities
                formatImageName: "{tag}-{logName}-{width}x{height}",
                // ... altre opzioni
            },
        ],
    ],
    // ...
};
```

#### Come funziona
1. Impostazione del `logName`:

    - Nella sezione `capabilities`, assegna un `logName` unico a ciascun browser o dispositivo. Ad esempio, `chrome-mac-15` identifica i test eseguiti su Chrome su macOS versione 15.

2. Denominazione personalizzata delle immagini:

    - L'opzione `formatImageName` integra il `logName` nei nomi dei file degli screenshot. Ad esempio, se il `tag` è homepage e la risoluzione è `1920x1080`, il nome del file risultante potrebbe apparire così:

        `homepage-chrome-mac-15-1920x1080.png`

3. Vantaggi della denominazione personalizzata:

    - Distinguere tra screenshot di diversi browser o dispositivi diventa molto più facile, specialmente quando si gestiscono baseline e si debuggano discrepanze.

4. Nota sui valori predefiniti:

    - Se `logName` non è impostato nelle capabilities, l'opzione `formatImageName` lo mostrerà come una stringa vuota nei nomi dei file (`homepage--15-1920x1080.png`)

### WebdriverIO MultiRemote

Supportiamo anche [MultiRemote](https://webdriver.io/docs/multiremote/). Per far funzionare correttamente questa funzionalità, assicurati di aggiungere `wdio-ics:options` alle tue
capabilities come puoi vedere qui sotto. Questo garantirà che ogni screenshot avrà il proprio nome univoco.

[Scrivere i tuoi test](/docs/visual-testing/writing-tests) non sarà diverso rispetto all'uso del [testrunner](https://webdriver.io/docs/testrunner)

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
                // QUESTO!!!
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
                // QUESTO!!!
                "wdio-ics:options": {
                    logName: "chrome-latest-two",
                },
            },
        },
    },
};
```

### Esecuzione Programmatica

Ecco un esempio minimo di come utilizzare `@wdio/visual-service` tramite opzioni `remote`:

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

// "Avvia" il servizio per aggiungere i comandi personalizzati al `browser`
visualService.remoteSetup(browser);

await browser.url("https://webdriver.io/");

// o usa questo per SOLO salvare uno screenshot
await browser.saveFullPageScreen("examplePaged", {});

// o usa questo per la validazione. Entrambi i metodi non devono essere combinati, vedi le FAQ
await browser.checkFullPageScreen("examplePaged", {});

await browser.deleteSession();
```

### Navigazione con tab attraverso un sito web

Puoi verificare se un sito web è accessibile utilizzando il tasto <kbd>TAB</kbd> della tastiera. Testare questa parte dell'accessibilità è sempre stato un lavoro (manuale) che richiede tempo ed è piuttosto difficile da fare attraverso l'automazione.
Con i metodi `saveTabbablePage` e `checkTabbablePage`, puoi ora disegnare linee e punti sul tuo sito web per verificare l'ordine di tabulazione.

Tieni presente che questo è utile solo per i browser desktop e **NON\*\*** per i dispositivi mobili. Tutti i browser desktop supportano questa funzionalità.

:::note

Il lavoro è ispirato dal post sul blog di [Viv Richards](https://github.com/vivrichards600) su ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).

Il modo in cui vengono selezionati gli elementi navigabili tramite tab si basa sul modulo [tabbable](https://github.com/davidtheclark/tabbable). Se ci sono problemi relativi alla tabulazione, consulta il [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) e in particolare la sezione [More Details](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

#### Come funziona

Entrambi i metodi creeranno un elemento `canvas` sul tuo sito web e disegneranno linee e punti per mostrarti dove andrebbe il tuo TAB se un utente finale lo utilizzasse. Dopodiché, creerà uno screenshot dell'intera pagina per darti una buona panoramica del flusso.

:::important

**Usa `saveTabbablePage` solo quando devi creare uno screenshot e NON vuoi confrontarlo **con un'immagine **baseline**.\*\*\*\*

:::

Quando vuoi confrontare il flusso di tabulazione con una baseline, puoi utilizzare il metodo `checkTabbablePage`. **NON** è necessario utilizzare i due metodi insieme. Se esiste già un'immagine baseline, che può essere creata automaticamente fornendo `autoSaveBaseline: true` quando si istanzia il servizio,
`checkTabbablePage` creerà prima l'immagine _attuale_ e poi la confronterà con la baseline.

##### Opzioni

Entrambi i metodi utilizzano le stesse opzioni di [`saveFullPageScreen`](https://github.com/wswebcreation/webdriver-image-comparison/blob/master/docs/OPTIONS.md#savefullpagescreen-or-savetabbablepage) o
[`compareFullPageScreen`](https://github.com/wswebcreation/webdriver-image-comparison/blob/master/docs/OPTIONS.md#comparefullpagescreen-or-comparetabbablepage).

#### Esempio

Questo è un esempio di come funziona la tabulazione sul nostro [sito web guinea pig](https://guinea-pig.webdriver.io/image-compare.html):

![Esempio di tabulazione WDIO](/img/visual/tabbable-chrome-latest-1366x768.png)

### Aggiornamento automatico degli Snapshot Visivi falliti

Aggiorna le immagini di base tramite la riga di comando aggiungendo l'argomento `--update-visual-baseline`. Questo:

-   copierà automaticamente lo screenshot effettivamente acquisito e lo metterà nella cartella di base
-   se ci sono differenze, farà passare il test perché la baseline è stata aggiornata

**Utilizzo:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

Quando si eseguono log in modalità info/debug, vedrai i seguenti log aggiunti

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

## Supporto Typescript

Questo modulo include il supporto TypeScript, permettendoti di beneficiare dell'auto-completamento, della sicurezza dei tipi e di un'esperienza di sviluppo migliorata quando utilizzi il servizio di Test Visivi.

### Passo 1: Aggiungi Definizioni dei Tipi
Per assicurarti che TypeScript riconosca i tipi del modulo, aggiungi la seguente voce al campo types nel tuo tsconfig.json:

```json
{
    "compilerOptions": {
        "types": ["@wdio/visual-service"]
    }
}
```

### Passo 2: Abilita la Sicurezza dei Tipi per le Opzioni del Servizio
Per applicare il controllo dei tipi sulle opzioni del servizio, aggiorna la tua configurazione WebdriverIO:

```ts
// wdio.conf.ts
import { join } from 'node:path';
// Importa la definizione del tipo
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
                // Opzioni del servizio
                baselineFolder: join(process.cwd(), './__snapshots__/'),
                formatImageName: '{tag}-{logName}-{width}x{height}',
                screenshotPath: join(process.cwd(), '.tmp/'),
            } satisfies VisualServiceOptions, // Garantisce la sicurezza dei tipi
        ],
    ],
    // ...
};
```

## Requisiti di Sistema

### Versione 5 e successive

Per la versione 5 e successive, questo modulo è un modulo puramente basato su JavaScript senza dipendenze di sistema aggiuntive oltre ai [requisiti generali del progetto](/docs/gettingstarted#system-requirements). Utilizza [Jimp](https://github.com/jimp-dev/jimp), che è una libreria di elaborazione delle immagini per Node scritta interamente in JavaScript, senza dipendenze native.

### Versione 4 e precedenti

Per la versione 4 e precedenti, questo modulo si basa su [Canvas](https://github.com/Automattic/node-canvas), un'implementazione di canvas per Node.js. Canvas dipende da [Cairo](https://cairographics.org/).

#### Dettagli di installazione

Per impostazione predefinita, i binari per macOS, Linux e Windows verranno scaricati durante l'`npm install` del tuo progetto. Se non hai un sistema operativo o un'architettura del processore supportati, il modulo verrà compilato sul tuo sistema. Ciò richiede diverse dipendenze, tra cui Cairo e Pango.

Per informazioni dettagliate sull'installazione, consulta il [wiki di node-canvas](https://github.com/Automattic/node-canvas/wiki/_pages). Di seguito sono riportate le istruzioni di installazione in una riga per i sistemi operativi comuni. Nota che `libgif/giflib`, `librsvg` e `libjpeg` sono opzionali e necessari solo per il supporto di GIF, SVG e JPEG, rispettivamente. È richiesto Cairo v1.10.0 o successivo.

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

     Utilizzando [Homebrew](https://brew.sh/):

     ```sh
     brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman
     ```

    **Mac OS X v10.11+:** Se hai recentemente aggiornato a Mac OS X v10.11+ e stai riscontrando problemi durante la compilazione, esegui il seguente comando: `xcode-select --install`. Leggi di più sul problema [su Stack Overflow](http://stackoverflow.com/a/32929012/148072).
    Se hai installato Xcode 10.0 o superiore, per compilare da sorgente hai bisogno di NPM 6.4.1 o superiore.

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

    Vedi il [wiki](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows)

</TabItem>
<TabItem value="others">

    Vedi il [wiki](https://github.com/Automattic/node-canvas/wiki)

</TabItem>
</Tabs>