---
id: visual-testing
title: Test Visivi
---


## Cosa può fare?

WebdriverIO fornisce confronti di immagini su schermate, elementi o pagine intere per

-   🖥️ Browser desktop (Chrome / Firefox / Safari / Microsoft Edge)
-   📱 Browser per dispositivi mobili / tablet (Chrome su emulatori Android / Safari su Simulatori iOS / Simulatori / dispositivi reali) tramite Appium
-   📱 App native (emulatori Android / Simulatori iOS / dispositivi reali) tramite Appium (🌟 **NUOVO** 🌟)
-   📳 App ibride tramite Appium

attraverso [`@wdio/visual-service`](https://www.npmjs.com/package/@wdio/visual-service) che è un servizio leggero di WebdriverIO.

Questo ti permette di:

-   salvare o confrontare schermate di **schermi/elementi/pagine intere** rispetto a un riferimento base
-   **creare automaticamente una linea di base** quando non esiste
-   **bloccare regioni personalizzate** e persino **escludere automaticamente** una barra di stato e/o delle barre degli strumenti (solo mobile) durante un confronto
-   aumentare le dimensioni degli screenshot degli elementi
-   **nascondere il testo** durante il confronto del sito web per:
    -   **migliorare la stabilità** e prevenire la variabilità nel rendering dei font
    -   concentrarsi solo sul **layout** di un sito web
-   utilizzare **diversi metodi di confronto** e una serie di **matcher aggiuntivi** per test più leggibili
-   verificare come il tuo sito web **supporterà la navigazione con la tastiera)**, vedi anche [Navigazione con tab in un sito web](#tabbing-through-a-website)
-   e molto altro, vedere le opzioni del [servizio](./visual-testing/service-options) e dei [metodi](./visual-testing/method-options)

Il servizio è un modulo leggero per recuperare i dati e gli screenshot necessari per tutti i browser/dispositivi. La potenza di confronto deriva da [ResembleJS](https://github.com/Huddle/Resemble.js). Se desideri confrontare immagini online, puoi controllare lo [strumento online](http://rsmbl.github.io/Resemble.js/).

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
                // Alcune opzioni, vedi la documentazione per maggiori informazioni
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

Altre opzioni di servizio possono essere trovate [qui](/docs/visual-testing/service-options).

Una volta configurato nella tua configurazione WebdriverIO, puoi procedere e aggiungere asserzioni visive ai [tuoi test](/docs/visual-testing/writing-tests).

### Capabilities
Per utilizzare il modulo di Test Visivi, **non è necessario aggiungere opzioni extra alle tue capabilities**. Tuttavia, in alcuni casi, potresti voler aggiungere metadati aggiuntivi ai tuoi test visivi, come un `logName`.

Il `logName` ti permette di assegnare un nome personalizzato a ciascuna capability, che può quindi essere incluso nei nomi dei file delle immagini. Questo è particolarmente utile per distinguere gli screenshot scattati su diversi browser, dispositivi o configurazioni.

Per abilitare questa funzionalità, puoi definire `logName` nella sezione `capabilities` e assicurarti che l'opzione `formatImageName` nel servizio di Test Visivi lo referenzi. Ecco come configurarlo:

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
                logName: 'chrome-mac-15', // Nome di log personalizzato per Chrome
            },
        }
        {
            browserName: 'firefox',
            'wdio-ics:options': {
                logName: 'firefox-mac-15', // Nome di log personalizzato per Firefox
            },
        }
    ],
    services: [
        [
            "visual",
            {
                // Alcune opzioni, vedi la documentazione per maggiori informazioni
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                screenshotPath: path.join(process.cwd(), "tmp"),
                // Il formato sottostante utilizzerà il `logName` dalle capabilities
                formatImageName: "{tag}-{logName}-{width}x{height}",
                // ... altre opzioni
            },
        ],
    ],
    // ...
};
```

#### Come funziona
1. Configurazione del `logName`:

    - Nella sezione `capabilities`, assegna un `logName` unico a ciascun browser o dispositivo. Ad esempio, `chrome-mac-15` identifica i test in esecuzione su Chrome su macOS versione 15.

2. Denominazione personalizzata delle immagini:

    - L'opzione `formatImageName` integra il `logName` nei nomi dei file degli screenshot. Ad esempio, se il `tag` è homepage e la risoluzione è `1920x1080`, il nome del file risultante potrebbe essere:

        `homepage-chrome-mac-15-1920x1080.png`

3. Vantaggi della denominazione personalizzata:

    - Distinguere tra screenshot da diversi browser o dispositivi diventa molto più facile, specialmente quando si gestiscono baseline e si eseguono debug delle discrepanze.

4. Nota sui valori predefiniti:

    - Se `logName` non è impostato nelle capabilities, l'opzione `formatImageName` lo mostrerà come una stringa vuota nei nomi dei file (`homepage--15-1920x1080.png`)

### WebdriverIO MultiRemote

Supportiamo anche [MultiRemote](https://webdriver.io/docs/multiremote/). Per far funzionare correttamente questo, assicurati di aggiungere `wdio-ics:options` alle tue capabilities come puoi vedere di seguito. Questo garantirà che ogni screenshot abbia il proprio nome univoco.

[Scrivere i tuoi test](/docs/visual-testing/writing-tests) non sarà diverso rispetto all'utilizzo del [testrunner](https://webdriver.io/docs/testrunner)

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

### Esecuzione programmatica

Ecco un esempio minimo di come utilizzare `@wdio/visual-service` tramite le opzioni `remote`:

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

### Navigazione con tab in un sito web

Puoi verificare se un sito web è accessibile utilizzando il tasto <kbd>TAB</kbd> della tastiera. Testare questa parte dell'accessibilità è sempre stato un lavoro (manuale) che richiede tempo ed è piuttosto difficile da fare attraverso l'automazione.
Con i metodi `saveTabbablePage` e `checkTabbablePage`, ora puoi disegnare linee e punti sul tuo sito web per verificare l'ordine di tabulazione.

Tieni presente che questo è utile solo per i browser desktop e **NON** per i dispositivi mobili. Tutti i browser desktop supportano questa funzionalità.

:::note

Il lavoro è ispirato al post sul blog di [Viv Richards](https://github.com/vivrichards600) su ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).

Il modo in cui vengono selezionati gli elementi tabulabili si basa sul modulo [tabbable](https://github.com/davidtheclark/tabbable). Se ci sono problemi relativi alla tabulazione, controlla il [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) e in particolare la sezione [More Details](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

#### Come funziona

Entrambi i metodi creeranno un elemento `canvas` sul tuo sito web e disegneranno linee e punti per mostrarti dove andrebbe il tuo TAB se un utente finale lo utilizzasse. Dopo, creerà uno screenshot dell'intera pagina per darti una buona panoramica del flusso.

:::important

**Usa il `saveTabbablePage` solo quando hai bisogno di creare uno screenshot e NON vuoi confrontarlo **con un'immagine di **riferimento** .\*\*\*\*

:::

Quando vuoi confrontare il flusso di tabulazione con un riferimento, puoi utilizzare il metodo `checkTabbablePage`. **NON** è necessario utilizzare i due metodi insieme. Se c'è già un'immagine di riferimento creata, che può essere fatta automaticamente fornendo `autoSaveBaseline: true` quando istanzi il servizio,
il `checkTabbablePage` creerà prima l'immagine _effettiva_ e poi la confronterà con il riferimento.

##### Opzioni

Entrambi i metodi utilizzano le stesse opzioni del [`saveFullPageScreen`](https://github.com/wswebcreation/webdriver-image-comparison/blob/master/docs/OPTIONS.md#savefullpagescreen-or-savetabbablepage) o del
[`compareFullPageScreen`](https://github.com/wswebcreation/webdriver-image-comparison/blob/master/docs/OPTIONS.md#comparefullpagescreen-or-comparetabbablepage).

#### Esempio

Questo è un esempio di come funziona la tabulazione sul nostro [sito web guinea pig](https://guinea-pig.webdriver.io/image-compare.html):

![WDIO tabbing example](/img/visual/tabbable-chrome-latest-1366x768.png)

### Aggiornamento automatico degli Snapshot Visivi falliti

Aggiorna le immagini di riferimento attraverso la riga di comando aggiungendo l'argomento `--update-visual-baseline`. Questo:

-   copierà automaticamente lo screenshot acquisito e lo metterà nella cartella di riferimento
-   se ci sono differenze, farà passare il test perché il riferimento è stato aggiornato

**Utilizzo:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

Quando si eseguono i log in modalità info/debug, vedrai i seguenti log aggiunti

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

## Supporto TypeScript

Questo modulo include il supporto per TypeScript, permettendoti di beneficiare dell'auto-completamento, del controllo dei tipi e di un'esperienza di sviluppo migliorata quando utilizzi il servizio di Test Visivi.

### Passo 1: Aggiungi le definizioni dei tipi
Per assicurarti che TypeScript riconosca i tipi del modulo, aggiungi la seguente voce al campo types nel tuo tsconfig.json:

```json
{
    "compilerOptions": {
        "types": ["@wdio/visual-service"]
    }
}
```

### Passo 2: Abilita il controllo dei tipi per le opzioni del servizio
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

## Requisiti di sistema

### Versione 5 e successive

Per la versione 5 e successive, questo modulo è un modulo puramente basato su JavaScript senza dipendenze di sistema aggiuntive oltre ai [requisiti generali del progetto](/docs/gettingstarted#system-requirements). Utilizza [Jimp](https://github.com/jimp-dev/jimp), una libreria di elaborazione immagini per Node scritta interamente in JavaScript, senza dipendenze native.

### Versione 4 e precedenti

Per la versione 4 e precedenti, questo modulo si basa su [Canvas](https://github.com/Automattic/node-canvas), un'implementazione di canvas per Node.js. Canvas dipende da [Cairo](https://cairographics.org/).

#### Dettagli di installazione

Di default, i binari per macOS, Linux e Windows verranno scaricati durante l'`npm install` del tuo progetto. Se non hai un sistema operativo o un'architettura del processore supportati, il modulo verrà compilato sul tuo sistema. Questo richiede diverse dipendenze, tra cui Cairo e Pango.

Per informazioni dettagliate sull'installazione, consulta la [wiki di node-canvas](https://github.com/Automattic/node-canvas/wiki/_pages). Di seguito sono riportate istruzioni di installazione in una riga per i sistemi operativi comuni. Nota che `libgif/giflib`, `librsvg` e `libjpeg` sono opzionali e necessari solo per il supporto di GIF, SVG e JPEG, rispettivamente. È richiesto Cairo v1.10.0 o successivo.

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

    Vedi la [wiki](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows)

</TabItem>
<TabItem value="others">

    Vedi la [wiki](https://github.com/Automattic/node-canvas/wiki)

</TabItem>
</Tabs>