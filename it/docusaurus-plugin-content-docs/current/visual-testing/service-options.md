---
id: service-options
title: Opzioni del Servizio
description: "Configura le opzioni predefinite del servizio visivo, tra cui l'acquisizione di screenshot, gli screenshot a pagina intera, le baseline, le cartelle e la reportistica."
---

Le opzioni del servizio sono le opzioni che possono essere impostate quando il servizio viene istanziato e verranno utilizzate per ogni chiamata di metodo.

```js
// wdio.conf.(js|ts)
export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // Le opzioni
            },
        ],
    ],
    // ...
};
```

# Opzioni Predefinite

## Acquisizione degli screenshot

---

### `hideScrollBars`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

Nasconde le barre di scorrimento nell'applicazione. Se impostato su true, tutte le barre di scorrimento verranno disabilitate prima di acquisire uno screenshot. Il valore predefinito è `true` per prevenire problemi aggiuntivi.

</Option>
### `disableBlinkingCursor`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview)">

Abilita/Disabilita il "lampeggiamento" del cursore in tutti gli elementi `input`, `textarea`, `[contenteditable]` nell'applicazione. Se impostato su `true` il cursore verrà impostato su `transparent` prima di acquisire uno screenshot
e ripristinato al termine

</Option>
### `disableCSSAnimation`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview)">

Abilita/Disabilita tutte le animazioni CSS nell'applicazione. Se impostato su `true` tutte le animazioni verranno disabilitate prima di acquisire uno screenshot
e ripristinate al termine

</Option>
### `enableLayoutTesting`

<Option type="boolean" default="false" required="No" contexts="Web">

Questa opzione nasconderà tutto il testo di una pagina, in modo che per il confronto venga utilizzato solo il layout. L'occultamento avviene aggiungendo lo stile `'color': 'transparent !important'` a **ogni** elemento.

Per l'output vedi [Test Output](/docs/visual-testing/test-output#enablelayouttesting)

:::info
Utilizzando questo flag, ogni elemento che contiene testo (quindi non solo `p, h1, h2, h3, h4, h5, h6, span, a, li`, ma anche `div|button|..`) riceverà questa proprietà. **Non** esiste un'opzione per personalizzare questo comportamento.
:::

</Option>
### `ignoreRegionPadding`

<Option type="number" default="1" required="No" contexts="Web, Hybrid App (Webview)">

Padding in pixel del dispositivo aggiunto a ciascun lato delle regioni ignorate, rendendo ogni regione più larga e più alta di 2× questo valore. Questo aiuta a evitare differenze di 1 px ai bordi che possono comparire su display ad alto DPR o con il protocollo di screenshot BiDi. Imposta `0` per disabilitarlo.

</Option>
### `waitForFontsLoaded`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

I font, inclusi quelli di terze parti, possono essere caricati in modo sincrono o asincrono. Il caricamento asincrono significa che i font potrebbero essere caricati dopo che WebdriverIO ha stabilito che una pagina è stata completamente caricata. Per prevenire problemi di rendering dei font, questo modulo, per impostazione predefinita, attenderà il caricamento di tutti i font prima di acquisire uno screenshot.

</Option>
## Screenshot a pagina intera

---

### `userBasedFullPageScreenshot`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview) **Introduced in visual-service@7.0.0">

Per impostazione predefinita, gli screenshot a pagina intera sul web desktop vengono acquisiti utilizzando il protocollo WebDriver BiDi, che consente screenshot veloci, stabili e coerenti senza scorrimento.
Quando userBasedFullPageScreenshot è impostato su true, il processo di acquisizione simula un utente reale: scorre la pagina, acquisisce screenshot delle dimensioni del viewport e li unisce. Questo metodo è utile per pagine con contenuti caricati in modo lazy o con rendering dinamico che dipende dalla posizione di scorrimento.

Usa questa opzione se la tua pagina si basa su contenuti caricati durante lo scorrimento o se vuoi preservare il comportamento dei metodi di screenshot precedenti.

</Option>
### `fullPageScrollTimeout`

<Option type="number" default="1500" required="No" contexts="Web">

Il timeout in millisecondi da attendere dopo uno scorrimento. Questo può aiutare a identificare le pagine con lazy loading.

:::info

Funziona solo quando l'opzione del servizio/metodo `userBasedFullPageScreenshot` è impostata su `true`, vedi anche [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedfullpagescreenshot)

:::

</Option>
## Mobile e dispositivi

---

### `isHybridApp`

<Option type="boolean" default="false" required="No" contexts="Hybrid App (Webview)">

Imposta questa opzione su `true` quando testi un'app ibrida (una shell nativa con una o più webview incorporate). Questo regola il modo in cui il modulo gestisce i ritagli della barra di stato e della barra degli indirizzi per le schermate basate su webview, ricorrendo a valori predefiniti sicuri quando i dati nativi sul rettangolo del dispositivo non sono disponibili.

</Option>
### `addIOSBezelCorners`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview), Native App">

Aggiunge gli angoli della cornice e il notch/dynamic island allo screenshot per i dispositivi iOS.

:::info NOTA
Questo può essere fatto solo quando il nome del dispositivo **PUÒ** essere determinato automaticamente e corrisponde al seguente elenco di nomi di dispositivi normalizzati. La normalizzazione verrà eseguita da questo modulo.
**iPhone:**

-   iPhone X: `iphonex`
-   iPhone XS: `iphonexs`
-   iPhone XS Max: `iphonexsmax`
-   iPhone XR: `iphonexr`
-   iPhone 11: `iphone11`
-   iPhone 11 Pro: `iphone11pro`
-   iPhone 11 Pro Max: `iphone11promax`
-   iPhone 12: `iphone12`
-   iPhone 12 Mini: `iphone12mini`
-   iPhone 12 Pro: `iphone12pro`
-   iPhone 12 Pro Max: `iphone12promax`
-   iPhone 13: `iphone13`
-   iPhone 13 Mini: `iphone13mini`
-   iPhone 13 Pro: `iphone13pro`
-   iPhone 13 Pro Max: `iphone13promax`
-   iPhone 14: `iphone14`
-   iPhone 14 Plus: `iphone14plus`
-   iPhone 14 Pro: `iphone14pro`
-   iPhone 14 Pro Max: `iphone14promax`
    **iPad:**
-   iPad Mini 6ª generazione: `ipadmini`
-   iPad Air 4ª generazione: `ipadair`
-   iPad Air 5ª generazione: `ipadair`
-   iPad Pro (11 pollici) 1ª generazione: `ipadpro11`
-   iPad Pro (11 pollici) 2ª generazione: `ipadpro11`
-   iPad Pro (11 pollici) 3ª generazione: `ipadpro11`
-   iPad Pro (12,9 pollici) 3ª generazione: `ipadpro129`
-   iPad Pro (12,9 pollici) 4ª generazione: `ipadpro129`
-   iPad Pro (12,9 pollici) 5ª generazione: `ipadpro129`
:::

</Option>
### `addressBarShadowPadding`

<Option type="number" default="6" required="No" contexts="Web">

Il padding che deve essere aggiunto alla barra degli indirizzi su iOS e Android per eseguire un ritaglio corretto del viewport.

</Option>
### `toolBarShadowPadding`

<Option type="number" default={`6 for Android and \`15\` for iOS (\`6\` by default and \`9\` will be added automatically for the possible home bar on iPhones with a notch or iPads that have a home bar)`} required="No" contexts="Web">

Il padding che deve essere aggiunto alla barra degli strumenti su iOS e Android per eseguire un ritaglio corretto del viewport.

</Option>
## Gestione di file e cartelle

---

### `baselineFolder`

<Option type="string|()=> string" default=".path/to/testfile/__snapshots__/" required="No" contexts="Web, Hybrid App (Webview), Native App">

La directory che conterrà tutte le immagini baseline utilizzate durante il confronto. Se non impostata, verrà utilizzato il valore predefinito, che salverà i file in una cartella `__snapshots__/` accanto alla spec che esegue i test visivi. Per impostare il valore di `baselineFolder` si può anche utilizzare una funzione che restituisce una `string`:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// OPPURE
{
    baselineFolder: () => {
        // Fai qualche magia qui
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

</Option>
### `screenshotPath`

<Option type="string | () => string" default=".tmp/" required="no" contexts="Web, Hybrid App (Webview), Native App">

La directory che conterrà tutti gli screenshot effettivi/con differenze. Se non impostata, verrà utilizzato il valore predefinito. Per impostare il valore di screenshotPath si può anche utilizzare una funzione che
restituisce una stringa:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// OPPURE
{
    screenshotPath: () => {
        // Fai qualche magia qui
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

</Option>
### `clearRuntimeFolder`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview), Native App">

Elimina la cartella di runtime (`actual` & `diff) all'inizializzazione

:::info NOTA
Funziona solo quando [`screenshotPath`](#screenshotpath) è impostato tramite le opzioni del plugin e **NON FUNZIONERÀ** se imposti le cartelle nei metodi
:::

</Option>
### `savePerInstance`

<Option type="boolean" default="false" required="no" contexts="Web, Hybrid App (Webview), Native App">

Salva le immagini per istanza in una cartella separata, così ad esempio tutti gli screenshot di Chrome verranno salvati in una cartella Chrome come `desktop_chrome`.

</Option>
### `formatImageName`

<Option type="string" default={`{tag}-{browserName}-{width}x{height}-dpr-{dpr}`} required="No" contexts="Web, Hybrid App (Webview), Native App">

Il nome delle immagini salvate può essere personalizzato passando il parametro `formatImageName` con una stringa di formato come:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

Le seguenti variabili possono essere passate per formattare la stringa e verranno lette automaticamente dalle capabilities dell'istanza.
Se non possono essere determinate, verranno utilizzati i valori predefiniti.

-   `browserName`: Il nome del browser nelle capabilities fornite
-   `browserVersion`: La versione del browser fornita nelle capabilities
-   `deviceName`: Il nome del dispositivo dalle capabilities
-   `dpr`: Il device pixel ratio
-   `height`: L'altezza dello schermo
-   `logName`: Il logName dalle capabilities
-   `mobile`: Aggiungerà `_app`, o il nome del browser dopo il `deviceName` per distinguere gli screenshot delle app da quelli del browser
-   `platformName`: Il nome della piattaforma nelle capabilities fornite
-   `platformVersion`: La versione della piattaforma fornita nelle capabilities
-   `tag`: Il tag fornito nei metodi che vengono chiamati
-   `width`: La larghezza dello schermo

:::info

Non è possibile fornire percorsi/cartelle personalizzati in `formatImageName`. Se vuoi modificare il percorso, valuta la modifica delle seguenti opzioni:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) per metodo

:::

</Option>
## Comportamento di baseline e salvataggio

---

### `autoSaveBaseline`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview), Native App">

Se durante il confronto non viene trovata alcuna immagine baseline, l'immagine viene copiata automaticamente nella cartella delle baseline.

</Option>
### `autoElementScroll`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

Questa opzione consente di disabilitare lo scorrimento automatico dell'elemento nella vista quando viene creato uno screenshot di un elemento.

</Option>
### `alwaysSaveActualImage`

<Option type="boolean" default="true" required="No" contexts="All">

Impostando questa opzione su `false`:

- l'immagine effettiva non verrà salvata quando **non** ci sono differenze
- il file jsonreport non verrà memorizzato quando `createJsonReportFiles` è impostato su `true`. Verrà inoltre mostrato un avviso nei log che indica che `createJsonReportFiles` è disabilitato

Questo dovrebbe garantire prestazioni migliori, poiché nessun file viene scritto sul sistema, e dovrebbe evitare che ci sia molto rumore nella cartella `actual`.

</Option>
## Reportistica

---

### `createJsonReportFiles` **(NUOVO)**

<Option type="boolean" default="false" required="No">

Ora hai la possibilità di esportare i risultati del confronto in un file di report JSON. Fornendo l'opzione `createJsonReportFiles: true`, ogni immagine confrontata creerà un report memorizzato nella cartella `actual`, accanto a ciascun risultato di immagine `actual`. L'output sarà simile a questo:

```json
{
    "parent": "check methods",
    "test": "should fail comparing with a baseline",
    "tag": "examplePageFail",
    "instanceData": {
        "browser": {
            "name": "chrome-headless-shell",
            "version": "126.0.6478.183"
        },
        "platform": {
            "name": "mac",
            "version": "not-known"
        }
    },
    "commandName": "checkScreen",
    "boundingBoxes": {
        "diffBoundingBoxes": [
            {
                "left": 1088,
                "top": 717,
                "right": 1186,
                "bottom": 730
            }
            //....
        ],
        "ignoredBoxes": [
            {
                "left": 159,
                "top": 652,
                "right": 356,
                "bottom": 703
            }
            //...
        ]
    },
    "fileData": {
        "actualFilePath": "/Users/wdio/visual-testing/.tmp/actual/desktop_chrome-headless-shellexamplePageFail-local-chrome-latest-1366x768.png",
        "baselineFilePath": "/Users/wdio/visual-testing/localBaseline/desktop_chrome-headless-shellexamplePageFail-local-chrome-latest-1366x768.png",
        "diffFilePath": "/Users/wdio/visual-testing/.tmp/diff/desktop_chrome-headless-shell/examplePageFail-local-chrome-latest-1366x768png",
        "fileName": "examplePageFail-local-chrome-latest-1366x768.png",
        "size": {
            "actual": {
                "height": 768,
                "width": 1366
            },
            "baseline": {
                "height": 768,
                "width": 1366
            },
            "diff": {
                "height": 768,
                "width": 1366
            }
        }
    },
    "misMatchPercentage": "12.90",
    "rawMisMatchPercentage": 12.900729014153246
}
```

Quando tutti i test sono stati eseguiti, verrà generato un nuovo file JSON con la raccolta dei confronti, che si trova nella radice della tua cartella `actual`. I dati sono raggruppati per:

-   `describe` per Jasmine/Mocha o `Feature` per CucumberJS
-   `it` per Jasmine/Mocha o `Scenario` per CucumberJS
    e poi ordinati per:
-   `commandName`, ovvero i nomi dei metodi di confronto utilizzati per confrontare le immagini
-   `instanceData`, prima il browser, poi il dispositivo, poi la piattaforma
    e avrà questo aspetto

```json
[
    {
        "description": "check methods",
        "data": [
            {
                "test": "should fail comparing with a baseline",
                "data": [
                    {
                        "tag": "examplePageFail",
                        "instanceData": {},
                        "commandName": "checkScreen",
                        "framework": "mocha",
                        "boundingBoxes": {
                            "diffBoundingBoxes": [],
                            "ignoredBoxes": []
                        },
                        "fileData": {},
                        "misMatchPercentage": "14.34",
                        "rawMisMatchPercentage": 14.335403703025868
                    },
                    {
                        "tag": "exampleElementFail",
                        "instanceData": {},
                        "commandName": "checkElement",
                        "framework": "mocha",
                        "boundingBoxes": {
                            "diffBoundingBoxes": [],
                            "ignoredBoxes": []
                        },
                        "fileData": {},
                        "misMatchPercentage": "1.34",
                        "rawMisMatchPercentage": 1.335403703025868
                    }
                ]
            }
        ]
    }
]
```

I dati del report ti daranno l'opportunità di creare il tuo report visivo senza dover fare tutta la magia e la raccolta dei dati da solo.

:::info NOTA
Devi utilizzare `@wdio/visual-testing` versione `5.2.0` o superiore
:::

</Option>
### `diffPixelBoundingBoxProximity`

<Option type="number" default="5" required="No" contexts="Web, Hybrid App (Webview), Native App">

La prossimità in pixel utilizzata per raggruppare i pixel di differenza nel report JSON generato da [`createJsonReportFiles`](#createjsonreportfiles). Valori più alti raggruppano più pixel in un numero minore di bounding box; valori più bassi producono box più precisi ma più numerosi.

</Option>
## Generale

---

### `logLevel`

<Option type="string" default="info" required="No" contexts="Web, Hybrid App (Webview), Native App">

Aggiunge log extra, le opzioni sono `debug | info | warn | silent`

Gli errori vengono sempre registrati nella console.

</Option>
## Opzioni Tabbable

:::info NOTA

Questo modulo supporta anche il disegno del modo in cui un utente utilizzerebbe la tastiera per navigare con _tab_ nel sito web, tracciando linee e punti da un elemento tabbable all'altro.<br/>
Il lavoro è ispirato al post del blog di [Viv Richards](https://github.com/vivrichards600) intitolato ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br/>
Il modo in cui vengono selezionati gli elementi tabbable si basa sul modulo [tabbable](https://github.com/davidtheclark/tabbable). In caso di problemi relativi alla navigazione con tab, consulta il [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) e in particolare la [sezione More details](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

### `tabbableOptions`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Le opzioni che possono essere modificate per le linee e i punti se utilizzi i metodi `{save|check}Tabbable`. Le opzioni sono spiegate di seguito.

</Option>
#### `tabbableOptions.circle`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Le opzioni per modificare il cerchio.

</Option>
##### `tabbableOptions.circle.backgroundColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Il colore di sfondo del cerchio.

</Option>
##### `tabbableOptions.circle.borderColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Il colore del bordo del cerchio.

</Option>
##### `tabbableOptions.circle.borderWidth`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Lo spessore del bordo del cerchio.

</Option>
##### `tabbableOptions.circle.fontColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Il colore del font del testo nel cerchio. Verrà mostrato solo se [`showNumber`](./#tabbableoptionscircleshownumber) è impostato su `true`.

</Option>
##### `tabbableOptions.circle.fontFamily`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

La famiglia del font del testo nel cerchio. Verrà mostrato solo se [`showNumber`](./#tabbableoptionscircleshownumber) è impostato su `true`.

Assicurati di impostare font supportati dai browser.

</Option>
##### `tabbableOptions.circle.fontSize`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

La dimensione del font del testo nel cerchio. Verrà mostrato solo se [`showNumber`](./#tabbableoptionscircleshownumber) è impostato su `true`.

</Option>
##### `tabbableOptions.circle.size`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

La dimensione del cerchio.

</Option>
##### `tabbableOptions.circle.showNumber`

<Option type="showNumber" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Mostra il numero della sequenza di tab nel cerchio.

</Option>
#### `tabbableOptions.line`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Le opzioni per modificare la linea.

</Option>
##### `tabbableOptions.line.color`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Il colore della linea.

</Option>
##### `tabbableOptions.line.width`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Lo spessore della linea.

</Option>
## Opzioni di confronto

### `compareOptions`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) for all default values" required="No" contexts="Web, Hybrid App (Webview), Native App (See [Method Compare options](./method-options#compare-check-options) for more information)">

Le opzioni di confronto possono essere impostate anche come opzioni del servizio; sono descritte nelle [Opzioni di confronto dei metodi](/docs/visual-testing/method-options#compare-check-options)

</Option>