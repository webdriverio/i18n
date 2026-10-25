---
id: visual-testing
title: Test Visivi
description: "Confronta screenshot di schermate, elementi o pagine intere con le baseline tramite @wdio/visual-service, incluse installazione e utilizzo."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Cosa può fare?

WebdriverIO fornisce confronti di immagini su schermate, elementi o pagine intere per

-   🖥️ Browser desktop (Chrome / Firefox / Safari / Microsoft Edge)
-   📱 Browser mobile / tablet (Chrome su emulatori Android / Safari su simulatori iOS / simulatori / dispositivi reali) tramite Appium
-   📱 App native (emulatori Android / simulatori iOS / dispositivi reali) tramite Appium (🌟 **NOVITÀ** 🌟)
-   📳 App ibride tramite Appium

attraverso il [`@wdio/visual-service`](https://www.npmjs.com/package/@wdio/visual-service), un servizio WebdriverIO leggero.

Questo ti permette di:

-   salvare o confrontare schermate di **schermi/elementi/pagine intere** con una baseline
-   **creare automaticamente una baseline** quando non ne esiste una
-   **oscurare regioni personalizzate** e persino **escludere automaticamente** la barra di stato e/o le barre degli strumenti (solo mobile) durante un confronto
-   aumentare le dimensioni degli screenshot degli elementi
-   **nascondere il testo** durante il confronto del sito web per:
    -   **migliorare la stabilità** e prevenire l'instabilità nel rendering dei font
    -   concentrarsi solo sul **layout** di un sito web
-   utilizzare **diversi metodi di confronto** e un insieme di **matcher aggiuntivi** per test più leggibili
-   verificare come il tuo sito web **supporterà la navigazione con il tasto Tab della tastiera)**, vedi anche [Navigare con Tab in un sito web](#tabbing-through-a-website)
-   e molto altro, vedi le opzioni del [servizio](./visual-testing/service-options) e dei [metodi](./visual-testing/method-options)

Il servizio è un modulo leggero per recuperare i dati e gli screenshot necessari per tutti i browser/dispositivi. La potenza del confronto deriva da [Pixelmatch](https://github.com/mapbox/pixelmatch), una libreria di confronto percettivo delle immagini veloce e accurata. Dalla v11, misura le differenze di colore nello spazio colore OKLab con la distanza HyAB (pixelmatch 8), che è più vicina al modo in cui le persone percepiscono i colori. Le immagini vengono elaborate con [fast-png](https://github.com/image-js/fast-png), un codec PNG senza dipendenze native.

:::info NOTA Per App Native/Ibride
I metodi `saveScreen`, `saveElement`, `checkScreen`, `checkElement` e i matcher `toMatchScreenSnapshot` e `toMatchElementSnapshot` possono essere utilizzati per App/Contesti Nativi.

Utilizza la proprietà `isHybridApp:true` nelle impostazioni del servizio quando vuoi usarlo per App Ibride.
:::

:::caution Aggiornamento dalla v10?

`@wdio/visual-service` **v11** supporta solo **WebdriverIO v10** (e Node.js 22.19 o successivo). Con WebdriverIO v9, rimani su `@wdio/visual-service@10`.

La v11 confronta i colori con pixelmatch 8 (spazio colore OKLab, distanza HyAB) invece di YIQ. La scala della soglia e i preset `ignore*` non sono cambiati, ma **le percentuali di mismatch possono differire leggermente** dalla v10 per le stesse immagini. Il codice dei tuoi test non deve cambiare. Se un controllo dipende da una percentuale di mismatch esatta o da una tolleranza ristretta, verificalo di nuovo dopo l'aggiornamento.

Alcune correzioni nella v11 possono anche modificare una baseline una sola volta:

-   **Screenshot di elementi di grandi dimensioni su iOS:** per un elemento non completamente all'interno del viewport, l'immagine aveva le dimensioni dell'intero elemento, ma la parte al di fuori del viewport era nera ([appium/appium#22939](https://github.com/appium/appium/issues/22939)). Ora l'immagine contiene solo la parte visibile dell'elemento, come su Android.
-   **Screenshot di elementi con `biDiOrigin: 'viewport'`:** in una sessione WebDriver BiDi, lo screenshot ora ritaglia l'elemento stesso, anche quando la pagina è scrollata.
-   **Ritorno dello scroll:** i controlli degli elementi (con `autoElementScroll`) e i controlli della pagina intera ora riportano lo scroll della pagina alla posizione precedente. Un controllo del viewport eseguito subito dopo può produrre un'immagine diversa.

Consulta la [guida alla migrazione v11](https://github.com/webdriverio/visual-testing/blob/main/docs/v11-migration.md) per tutte le modifiche.

:::

:::caution Aggiornamento dalla v9 (o precedenti)?

`@wdio/visual-service` **v10** ha cambiato il motore di confronto da **ResembleJS** a **[Pixelmatch](https://github.com/mapbox/pixelmatch)**. Pixelmatch utilizza un modello di colore percettivo (YIQ) invece dell'RGB grezzo, quindi le percentuali di mismatch differiranno dalla v9. Questo significa:

-   **Il codice dei tuoi test non deve cambiare.** Tutti i nomi dei metodi, i nomi delle opzioni e i matcher sono identici.
-   **Le tue immagini baseline potrebbero dover essere aggiornate.** Dopo l'aggiornamento, esegui la tua suite di test e rivedi eventuali differenze visive. Puoi aggiornare le singole baseline fallite con `--update-visual-baseline`, oppure eliminare l'intera cartella delle baseline e lasciare che `autoSaveBaseline` la ricrei da zero. Consulta le [FAQ](/docs/visual-testing/faq#my-visual-tests-fail-with-a-difference-how-can-i-update-my-baseline) per i dettagli.

:::

## Installazione

Il modo più semplice è mantenere `@wdio/visual-service` come dev-dependency nel tuo `package.json`, tramite:

```sh
npm install --save-dev @wdio/visual-service
```

Questo installa la v11, che richiede WebdriverIO v10. Per un progetto WebdriverIO v9, installa la v10 del servizio:

```sh
npm install --save-dev @wdio/visual-service@10
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
                // Alcune opzioni, consulta la documentazione per altre
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

Ulteriori opzioni del servizio sono disponibili [qui](/docs/visual-testing/service-options).

Una volta configurato nella tua configurazione WebdriverIO, puoi procedere ad aggiungere asserzioni visive ai [tuoi test](/docs/visual-testing/writing-tests).

### Capabilities
Per utilizzare il modulo Visual Testing, **non è necessario aggiungere opzioni extra alle tue capabilities**. Tuttavia, in alcuni casi, potresti voler aggiungere metadati aggiuntivi ai tuoi test visivi, come un `logName`.

Il `logName` ti permette di assegnare un nome personalizzato a ciascuna capability, che può poi essere incluso nei nomi dei file delle immagini. Questo è particolarmente utile per distinguere gli screenshot acquisiti su browser, dispositivi o configurazioni diversi.

Per abilitarlo, puoi definire `logName` nella sezione `capabilities` e assicurarti che l'opzione `formatImageName` nel servizio Visual Testing vi faccia riferimento. Ecco come configurarlo:

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
                // Alcune opzioni, consulta la documentazione per altre
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
1. Configurazione del `logName`:

    - Nella sezione `capabilities`, assegna un `logName` univoco a ciascun browser o dispositivo. Ad esempio, `chrome-mac-15` identifica i test eseguiti su Chrome su macOS versione 15.

2. Denominazione personalizzata delle immagini:

    - L'opzione `formatImageName` integra il `logName` nei nomi dei file degli screenshot. Ad esempio, se il `tag` è homepage e la risoluzione è `1920x1080`, il nome del file risultante potrebbe essere simile a questo:

        `homepage-chrome-mac-15-1920x1080.png`

3. Vantaggi della denominazione personalizzata:

    - Distinguere tra screenshot di browser o dispositivi diversi diventa molto più semplice, soprattutto quando si gestiscono le baseline e si analizzano le discrepanze.

4. Nota sui valori predefiniti:

    -Se `logName` non è impostato nelle capabilities, l'opzione `formatImageName` lo mostrerà come stringa vuota nei nomi dei file (`homepage--15-1920x1080.png`)

### WebdriverIO multi-remote

Supportiamo anche il [multi-remote](https://webdriver.io/docs/multiremote/). Per farlo funzionare correttamente, assicurati di aggiungere `wdio-ics:options` alle tue
capabilities come puoi vedere qui sotto. Questo garantirà che ogni screenshot abbia un nome univoco.

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

// oppure usa questo SOLO per salvare uno screenshot
await browser.saveFullPageScreen("examplePaged", {});

// oppure usa questo per la validazione. Non è necessario combinare i due metodi, vedi le FAQ
await browser.checkFullPageScreen("examplePaged", {});

await browser.deleteSession();
```

### Navigare con Tab in un sito web

Puoi verificare se un sito web è accessibile utilizzando il tasto <kbd>TAB</kbd> della tastiera. Testare questa parte dell'accessibilità è sempre stato un lavoro (manuale) dispendioso in termini di tempo e piuttosto difficile da realizzare tramite automazione.
Con i metodi `saveTabbablePage` e `checkTabbablePage`, ora puoi disegnare linee e punti sul tuo sito web per verificare l'ordine di tabulazione.

Tieni presente che questo è utile solo per i browser desktop e **NON\*\*** per i dispositivi mobili. Tutti i browser desktop supportano questa funzionalità.

:::note

Il lavoro è ispirato al post del blog di [Viv Richards](https://github.com/vivrichards600) intitolato ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).

Il modo in cui vengono selezionati gli elementi tabulabili si basa sul modulo [tabbable](https://github.com/davidtheclark/tabbable). In caso di problemi relativi alla tabulazione, consulta il [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) e in particolare la sezione [More ](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details)Details.

:::

#### Come funziona

Entrambi i metodi creeranno un elemento `canvas` sul tuo sito web e disegneranno linee e punti per mostrarti dove andrebbe il TAB se un utente finale lo utilizzasse. Successivamente, creeranno uno screenshot della pagina intera per darti una buona panoramica del flusso.

:::important

**Usa `saveTabbablePage` solo quando devi creare uno screenshot e NON vuoi confrontarlo **con un'immagine **baseline**.\*\*\*\*

:::

Quando vuoi confrontare il flusso di tabulazione con una baseline, puoi utilizzare il metodo `checkTabbablePage`. **NON** è necessario utilizzare i due metodi insieme. Se è già stata creata un'immagine baseline, cosa che può avvenire automaticamente impostando `autoSaveBaseline: true` quando istanzi il servizio,
`checkTabbablePage` creerà prima l'immagine _attuale_ e poi la confronterà con la baseline.

##### Opzioni

Entrambi i metodi utilizzano le stesse opzioni di `saveFullPageScreen` o `compareFullPageScreen`.

#### Esempio

Questo è un esempio di come funziona la tabulazione sul nostro [sito web cavia](https://guinea-pig.webdriver.io/image-compare.html):

![WDIO tabbing example](/img/visual/tabbable-chrome-latest-1366x768.png)

### Aggiornare automaticamente gli snapshot visivi falliti

Aggiorna le immagini baseline tramite la riga di comando aggiungendo l'argomento `--update-visual-baseline`. Questo

-   copierà automaticamente lo screenshot effettivamente acquisito e lo inserirà nella cartella delle baseline
-   in caso di differenze, farà passare il test perché la baseline è stata aggiornata

**Utilizzo:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

Quando esegui i log in modalità info/debug vedrai aggiunti i seguenti log

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

Questo modulo include il supporto TypeScript, che ti permette di beneficiare di auto-completamento, sicurezza dei tipi e una migliore esperienza di sviluppo quando utilizzi il servizio Visual Testing.

### Passo 1: Aggiungere le definizioni dei tipi
Per assicurarti che TypeScript riconosca i tipi del modulo, aggiungi la seguente voce al campo types nel tuo tsconfig.json:

```json
{
    "compilerOptions": {
        "types": ["@wdio/visual-service"]
    }
}
```

### Passo 2: Abilitare la sicurezza dei tipi per le opzioni del servizio
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

### Versione 10 e successive (attuale)

Per la versione 10 e successive, questo modulo non ha dipendenze di sistema aggiuntive oltre ai [requisiti generali del progetto](/docs/gettingstarted#system-requirements). Utilizza [Pixelmatch](https://github.com/mapbox/pixelmatch) per il confronto percettivo delle immagini e [fast-png](https://github.com/image-js/fast-png) per la codifica/decodifica delle immagini. Entrambi sono puro JavaScript senza dipendenze native.

La versione 11 richiede WebdriverIO v10 e Node.js 22.19 o successivo. La versione 10 funziona con WebdriverIO v9 (9.29.1 o successivo) e v10.

### Dalla versione 5 alla 9 (legacy)

Le versioni dalla 5 alla 9 utilizzavano [Jimp](https://github.com/jimp-dev/jimp), una libreria di elaborazione delle immagini per Node scritta interamente in JavaScript, senza dipendenze native. Non erano richieste dipendenze di sistema aggiuntive.

### Versione 4 e precedenti

Per la versione 4 e precedenti, questo modulo si basa su [Canvas](https://github.com/Automattic/node-canvas), un'implementazione di canvas per Node.js. Canvas dipende da [Cairo](https://cairographics.org/).

#### Dettagli di installazione

Per impostazione predefinita, i binari per macOS, Linux e Windows verranno scaricati durante l'`npm install` del tuo progetto. Se non disponi di un sistema operativo o di un'architettura del processore supportati, il modulo verrà compilato sul tuo sistema. Ciò richiede diverse dipendenze, tra cui Cairo e Pango.

Per informazioni dettagliate sull'installazione, consulta la [wiki di node-canvas](https://github.com/Automattic/node-canvas/wiki/_pages). Di seguito sono riportate istruzioni di installazione in una riga per i sistemi operativi più comuni. Nota che `libgif/giflib`, `librsvg` e `libjpeg` sono opzionali e necessari solo rispettivamente per il supporto GIF, SVG e JPEG. È richiesto Cairo v1.10.0 o successivo.

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

    **Mac OS X v10.11+:** Se hai aggiornato di recente a Mac OS X v10.11+ e riscontri problemi durante la compilazione, esegui il seguente comando: `xcode-select --install`. Leggi di più sul problema [su Stack Overflow](http://stackoverflow.com/a/32929012/148072).
    Se hai installato Xcode 10.0 o successivo, per compilare dal sorgente hai bisogno di NPM 6.4.1 o successivo.

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

    Consulta la [wiki](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows)

</TabItem>
<TabItem value="others">

    Consulta la [wiki](https://github.com/Automattic/node-canvas/wiki)

</TabItem>
</Tabs>