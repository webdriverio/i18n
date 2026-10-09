---
id: method-options
title: Opzioni dei metodi
description: "Imposta per ogni metodo le opzioni di salvataggio, confronto e cartelle per i metodi di visual testing che sovrascrivono le opzioni a livello di servizio."
---

Le opzioni dei metodi sono le opzioni che possono essere impostate per ogni [metodo](./methods). Se l'opzione ha la stessa chiave di un'opzione impostata durante l'istanziazione del plugin, questa opzione del metodo sovrascriverà il valore dell'opzione del plugin.

:::info NOTA

-   Tutte le opzioni delle [Opzioni di salvataggio](#save-options) possono essere utilizzate per i metodi di [Confronto](#compare-check-options)
-   Tutte le opzioni di confronto possono essere utilizzate durante l'istanziazione del servizio __oppure__ per ogni singolo metodo di verifica. Se un'opzione del metodo ha la stessa chiave di un'opzione impostata durante l'istanziazione del servizio, allora l'opzione di confronto del metodo sovrascriverà il valore dell'opzione di confronto del servizio.
- Tutte le opzioni possono essere utilizzate per i contesti applicativi seguenti, salvo diversa indicazione:
    - Web
    - Hybrid App
    - Native App
- Gli esempi seguenti utilizzano i metodi `save*`, ma possono essere utilizzati anche con i metodi `check*`

:::

# Opzioni di salvataggio

## Visualizzazione e rendering

---

### `hideScrollBars`

<Option type="boolean" default="true" required="No">

- **Utilizzato con:** Tutti i [metodi](./methods)
- **Contesti applicativi supportati:** Web, Hybrid App (Webview)

Nasconde la/le barra/e di scorrimento nell'applicazione. Se impostato su true, tutte le barre di scorrimento verranno disabilitate prima di acquisire uno screenshot. Il valore predefinito è `true` per prevenire ulteriori problemi.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideScrollBars: false
    }
)
```

</Option>
### `disableBlinkingCursor`

<Option type="boolean" default="false" required="No">

- **Utilizzato con:** Tutti i [metodi](./methods)
- **Contesti applicativi supportati:** Web, Hybrid App (Webview)

Abilita/disabilita il "lampeggiamento" del cursore in tutti gli elementi `input`, `textarea`, `[contenteditable]` dell'applicazione. Se impostato su `true`, il cursore verrà impostato su `transparent` prima di acquisire uno screenshot
e ripristinato al termine.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableBlinkingCursor: true
    }
)
```

</Option>
### `disableCSSAnimation`

<Option type="boolean" default="false" required="No">

- **Utilizzato con:** Tutti i [metodi](./methods)
- **Contesti applicativi supportati:** Web, Hybrid App (Webview)

Abilita/disabilita tutte le animazioni CSS nell'applicazione. Se impostato su `true`, tutte le animazioni verranno disabilitate prima di acquisire uno screenshot
e ripristinate al termine

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableCSSAnimation: true
    }
)
```

</Option>
### `enableLayoutTesting`

<Option type="boolean" default="false" required="No">

- **Utilizzato con:** Tutti i [metodi](./methods)
- **Contesti applicativi supportati:** Web, Hybrid App (Webview)

Nasconde tutto il testo di una pagina in modo che per il confronto venga utilizzato solo il layout. L'occultamento avviene aggiungendo lo stile `'color': 'transparent !important'` a __ogni__ elemento.

Per l'output vedi [Output dei test](./test-output#enablelayouttesting).

:::info
Utilizzando questo flag, ogni elemento che contiene testo (quindi non solo `p, h1, h2, h3, h4, h5, h6, span, a, li`, ma anche `div|button|..`) riceverà questa proprietà. __Non__ esiste alcuna opzione per personalizzare questo comportamento.
:::

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLayoutTesting: true
    }
)
```

</Option>
### `enableLegacyScreenshotMethod`

<Option type="boolean" default="false" required="No">

- **Utilizzato con:** Tutti i [metodi](./methods)
- **Contesti applicativi supportati:** Web, Hybrid App (Webview)

Utilizza questa opzione per tornare al metodo di screenshot "precedente" basato sul protocollo W3C-WebDriver. Può essere utile se i tuoi test si basano su immagini baseline esistenti o se esegui i test in ambienti che non supportano pienamente i nuovi screenshot basati su BiDi.
Tieni presente che abilitando questa opzione si potrebbero ottenere screenshot con risoluzione o qualità leggermente diverse.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLegacyScreenshotMethod: true
    }
)
```

</Option>
### `ignoreRegionPadding`

<Option type="number" default="1" required="No">

- **Utilizzato con:** Tutti i [metodi](./methods)
- **Contesti applicativi supportati:** Web, Hybrid App (Webview)

Padding in pixel del dispositivo aggiunto a ciascun lato delle regioni ignorate, rendendo ogni regione più larga e più alta del doppio di questo valore. Aiuta a evitare differenze di 1 px ai bordi che possono comparire su display ad alto DPR o con il protocollo di screenshot BiDi. Imposta su `0` per disabilitarlo.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        ignoreRegionPadding: 0
    }
)
```

</Option>
### `waitForFontsLoaded`

<Option type="boolean" default="true" required="No">

- **Utilizzato con:** Tutti i [metodi](./methods)
- **Contesti applicativi supportati:** Web, Hybrid App (Webview)

I font, inclusi quelli di terze parti, possono essere caricati in modo sincrono o asincrono. Il caricamento asincrono significa che i font potrebbero essere caricati dopo che WebdriverIO ha stabilito che una pagina è stata completamente caricata. Per evitare problemi di rendering dei font, questo modulo, per impostazione predefinita, attenderà il caricamento di tutti i font prima di acquisire uno screenshot.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        waitForFontsLoaded: true
    }
)
```

</Option>
## Visibilità degli elementi

---

### `hideElements`

<Option type="array" required="No">

- **Utilizzato con:** Tutti i [metodi](./methods)
- **Contesti applicativi supportati:** Web, Hybrid App (Webview)

Questo metodo può nascondere 1 o più elementi aggiungendo loro la proprietà `visibility: hidden`, fornendo un array di elementi.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideElements: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

</Option>
### `removeElements`

<Option type="array" required="No">

- **Utilizzato con:** Tutti i [metodi](./methods)
- **Contesti applicativi supportati:** Web, Hybrid App (Webview)

Questo metodo può _rimuovere_ 1 o più elementi aggiungendo loro la proprietà `display: none`, fornendo un array di elementi.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        removeElements: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

</Option>
## Specifiche per gli elementi

---

### `resizeDimensions`

<Option type="object" default={`{ top: 0, right: 0, bottom: 0, left: 0}`} required="No">

- **Utilizzato con:** Solo per [`saveElement`](./methods#saveelement) o [`checkElement`](./methods#checkelement)
- **Contesti applicativi supportati:** Web, Hybrid App (Webview), Native App

Un oggetto che deve contenere una quantità di pixel `top`, `right`, `bottom` e `left` necessaria per ingrandire il ritaglio dell'elemento.

```typescript
await browser.saveElement(
    'sample-tag',
    {
        resizeDimensions: {
            top: 50,
            left: 100,
            right: 10,
            bottom: 90,
        },
    }
)
```

</Option>
### `biDiOrigin`

<Option type="'document' | 'viewport'" default="'document'" required="No">

- **Utilizzato con:** Solo per [`saveElement`](./methods#saveelement) o [`checkElement`](./methods#checkelement)
- **Contesti applicativi supportati:** Web, Hybrid App (Webview)

Opzione esclusiva di BiDi che controlla quale origine delle coordinate viene utilizzata durante l'acquisizione di screenshot degli elementi tramite il protocollo WebDriver BiDi.

- `'document'` _(predefinito)_: esegue il rendering del layout del documento. Funziona per qualsiasi posizione dell'elemento ma **non** acquisisce i layer compositi (ad es. barre di scorrimento, overlay fixed/sticky, elementi con `will-change`).
- `'viewport'`: acquisisce il frame composito così come viene disegnato, incluse barre di scorrimento e overlay. Richiede che l'elemento sia **completamente visibile** nel viewport; genera un errore descrittivo quando l'elemento è al di fuori del viewport o più grande di esso.

```typescript
await browser.saveElement(
    await $('#my-element'),
    'sample-tag',
    {
        biDiOrigin: 'viewport'
    }
)
```

</Option>
## Specifiche per la pagina intera

---

### `userBasedFullPageScreenshot`

<Option type="boolean" default="false" required="No">

- **Utilizzato con:** Solo per [`saveFullPageScreen`](./methods#savefullpagescreen), [`saveTabbablePage`](./methods#savetabbablepage), [`checkFullPageScreen`](./methods#checkfullpagescreen) o [`checkTabbablePage`](./methods#checktabbablepage)
- **Contesti applicativi supportati:** Web, Hybrid App (Webview)

Quando impostata su `true`, questa opzione abilita la **strategia di scorrimento e unione** (scroll-and-stitch) per acquisire screenshot della pagina intera.
Invece di utilizzare le funzionalità di screenshot native del browser, scorre manualmente la pagina e unisce più screenshot.
Questo metodo è particolarmente utile per pagine con **contenuti caricati in modo lazy** o layout complessi che richiedono lo scorrimento per essere renderizzati completamente.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        userBasedFullPageScreenshot: true
    }
)
```

</Option>
### `fullPageScrollTimeout`

<Option type="number" default="1500" required="No">

- **Utilizzato con:** Solo per [`saveFullPageScreen`](./methods#savefullpagescreen) o [`saveTabbablePage`](./methods#savetabbablepage)
- **Contesti applicativi supportati:** Web, Hybrid App (Webview)

Il timeout in millisecondi da attendere dopo uno scorrimento. Può aiutare a gestire pagine con lazy loading.

> **NOTA:** Funziona solo quando `userBasedFullPageScreenshot` è impostato su `true`

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        fullPageScrollTimeout: 3 * 1000
    }
)
```

</Option>
### `hideAfterFirstScroll`

<Option type="array" required="No">

- **Utilizzato con:** Solo per [`saveFullPageScreen`](./methods#savefullpagescreen) o [`saveTabbablePage`](./methods#savetabbablepage)
- **Contesti applicativi supportati:** Web, Hybrid App (Webview)

Questo metodo nasconderà uno o più elementi aggiungendo loro la proprietà `visibility: hidden`, fornendo un array di elementi.
È utile quando, ad esempio, una pagina contiene elementi sticky che scorrono insieme alla pagina quando questa viene scorsa, ma che producono un effetto fastidioso quando viene acquisito uno screenshot della pagina intera

> **NOTA:** Funziona solo quando `userBasedFullPageScreenshot` è impostato su `true`

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        hideAfterFirstScroll: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

# Opzioni di confronto (Check)

Le opzioni di confronto sono opzioni che influenzano il modo in cui viene eseguito il confronto.

</Option>
## Sensibilità visiva

---

:::info Cronologia delle versioni per le opzioni `ignore*`
Questi preset hanno cambiato comportamento una volta, come breaking change, quando il motore di confronto è passato da ResembleJS (v9 e precedenti) a Pixelmatch (v10 e successive). Consulta la [tabella della cronologia delle versioni](./compare-options#visual-sensitivity) nella pagina Opzioni di confronto per i dettagli. Tutto ciò che è stato introdotto dalla v10.0.0 è segnalato con una nota "Dalla versione" nell'opzione pertinente qui sotto.
:::

**Ordine "l'ultimo vince":** quando più flag `ignore*` sono abilitati contemporaneamente, viene applicato un solo preset, secondo questo ordine (l'ultimo vince): `ignoreAlpha` → `ignoreAntialiasing` → `ignoreColors` → `ignoreLess` → `ignoreNothing`. A partire dalla `v10.1.0` viene registrato un avviso che indica quale preset ha prevalso.

### `ignoreColors`

<Option type="boolean" default="false" required="No">

- **Utilizzato con:** Tutti i [metodi Check](./methods#check-methods)
- **Contesti applicativi supportati:** Tutti
- **Dalla versione:** `v10.1.0`: confronto basato solo sulla luminosità utilizzando i pesi di luma di resemble (`0.3/0.59/0.11`).

Confronta solo la luminosità (pesi di luma di resemble `0.3/0.59/0.11`), ignorando le differenze di tonalità/colore. Utilizzalo quando ci si aspetta che il colore stesso vari, ma vuoi comunque rilevare modifiche al layout o alla luminosità.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreColors: true
    }
)
```

</Option>
### `ignoreAlpha`

<Option type="boolean" default="false" required="No">

- **Utilizzato con:** Tutti i [metodi Check](./methods#check-methods)
- **Contesti applicativi supportati:** Tutti
- **Dalla versione:** `v10.1.0`: applica una propria regola di soglia/AA indipendentemente dagli altri flag `ignore*`.

Confronta le immagini ignorando le differenze del canale alfa. Utilizzalo quando il rendering di trasparenza/opacità è instabile ma i colori dei pixel sottostanti sono importanti.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAlpha: true
    }
)
```

</Option>
### `ignoreAntialiasing`

<Option type="boolean" default="true" required="No">

- **Utilizzato con:** Tutti i [metodi Check](./methods#check-methods)
- **Contesti applicativi supportati:** Tutti
- **Dalla versione:** `v10`: valore predefinito cambiato in `true` (era `false` nella v9 e precedenti).

Tollera i pixel con anti-aliasing durante il confronto. Imposta su `false` per un confronto rigoroso in cui i pixel con anti-aliasing devono essere conteggiati come discrepanze. Questo risolve la causa più comune di instabilità nei test visivi: i bordi di testo/forme renderizzati con un anti-aliasing leggermente diverso tra le macchine, anche se nulla è cambiato.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAntialiasing: true
    }
)
```

</Option>
### `ignoreLess`

<Option type="boolean" default="false" required="No">

- **Utilizzato con:** Tutti i [metodi Check](./methods#check-methods)
- **Contesti applicativi supportati:** Tutti
- **Dalla versione:** `v10.1.0`: applica una propria regola di soglia/AA indipendentemente dagli altri flag `ignore*`.

Confronta le immagini utilizzando una tolleranza RGB più permissiva (~16/255 per canale nello spazio YIQ). L'anti-aliasing non viene tollerato. Utilizzalo per avere un po' di margine sul rumore di rendering (artefatti di compressione, arrotondamenti dei colori) senza tollerare l'anti-aliasing.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreLess: true
    }
)
```

</Option>
### `ignoreNothing`

<Option type="boolean" default="false" required="No">

- **Utilizzato con:** Tutti i [metodi Check](./methods#check-methods)
- **Contesti applicativi supportati:** Tutti
- **Dalla versione:** `v10.1.0`: applica una propria regola di soglia/AA indipendentemente dagli altri flag `ignore*`.

Utilizza tolleranza zero: qualsiasi differenza di pixel viene conteggiata come discrepanza, incluso l'anti-aliasing. Utilizzalo quando hai bisogno di una prova pixel-perfect che nulla sia cambiato.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreNothing: true
    }
)
```

</Option>
### `pixelmatch`

<Option type="object" default="undefined" required="No">

- **Utilizzato con:** Tutti i [metodi Check](./methods#check-methods)
- **Contesti applicativi supportati:** Tutti
- **Aggiunto in:** `v10.1.0`

Sovrascrive la modalità di confronto per una singola chiamata `check*` con impostazioni dirette di [pixelmatch](https://github.com/mapbox/pixelmatch) (`threshold`, `includeAA`, `diffColor`, `aaColor`, `diffColorAlt`, `alpha`, `diffMask`, `checkerboard`), invece di un preset `ignore*`. Utilizzalo quando i preset sono troppo approssimativi per un test specifico, ad es. quando serve un proprio valore di soglia o un colore delle differenze che risalti davvero nel tuo report. Consulta [Controllo diretto di pixelmatch](./compare-options#direct-pixelmatch-control) per il riferimento completo dei campi e per sapere quale problema risolve ciascun campo.

Non può essere combinato con le opzioni `ignore*` nello stesso oggetto di opzioni della chiamata: ciò genera `CompareOptionsConflictError`. Può tuttavia sovrascrivere una configurazione del servizio che utilizza i preset `ignore*` (o viceversa); viene registrato un avviso quando una chiamata di metodo cambia la modalità di confronto in questo modo.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        pixelmatch: { threshold: 0.05 }
    }
)
```

</Option>
### `scaleImagesToSameSize`

<Option type="boolean" default="false" required="No">

- **Utilizzato con:** Tutti i [metodi Check](./methods#check-methods)
- **Contesti applicativi supportati:** Tutti

Ridimensiona 2 immagini alla stessa dimensione prima dell'esecuzione del confronto. Si consiglia vivamente di abilitare `ignoreAntialiasing` e `ignoreAlpha`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        scaleImagesToSameSize: true
    }
)
```

</Option>
## Oscuramenti su mobile

---

### `blockOutStatusBar`

<Option type="boolean" default="true" required="No">

- **Utilizzato con:** _Questa opzione è **solo per Mobile**_
- **Contesti applicativi supportati:** Hybrid (parte nativa) e Native App

Oscura automaticamente la barra di stato e la barra degli indirizzi durante i confronti. Questo previene fallimenti dovuti a ora, wifi o stato della batteria.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutStatusBar: true
    }
)
```

</Option>
### `blockOutToolBar`

<Option type="boolean" default="true" required="No">

- **Utilizzato con:** _Questa opzione è **solo per Mobile**_
- **Contesti applicativi supportati:** Hybrid (parte nativa) e Native App

Oscura automaticamente la barra degli strumenti.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutToolBar: true
    }
)
```

</Option>
### `blockOutSideBar`

<Option type="boolean" default="true" required="No">

- **Utilizzato con:** _Può essere utilizzato solo per `checkScreen()`. Questa opzione è **solo per iPad**_
- **Contesti applicativi supportati:** Tutti

Oscura automaticamente la barra laterale sugli iPad in modalità orizzontale durante i confronti. Questo previene fallimenti dovuti al componente nativo schede/privata/segnalibri.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutSideBar: true
    }
)
```

</Option>
## Gestione delle regioni

---

### `blockOut`

<Option type="array" required="No">

- **Utilizzato con:** Tutti i [metodi Check](./methods#check-methods)
- **Contesti applicativi supportati:** Tutti

Un array di aree rettangolari da oscurare prima del confronto. Ogni voce deve essere un oggetto con i valori `x`, `y`, `width` e `height` (in pixel). Le aree oscurate vengono coperte prima del calcolo delle differenze, impedendo a tali regioni di contribuire alla percentuale di discrepanza.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOut: [
            { x: 0, y: 0, width: 100, height: 50 },
            { x: 300, y: 200, width: 80, height: 80 },
        ]
    }
)
```

</Option>
### `ignore`

<Option type="array" required="No">

- **Utilizzato con:** Solo con il metodo `checkScreen`, **NON** con il metodo `checkElement`
- **Contesti applicativi supportati:** Native App

Questo metodo oscurerà automaticamente elementi o un'area dello schermo in base a un array di elementi o a un oggetto `x|y|width|height`.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignore: [
            $('~element-1'),
            await $('~element-2'),
            {
                x: 150,
                y: 250,
                width: 100,
                height: 100,
            }
        ]
    }
)
```

</Option>
## Risultati e reportistica

---

### `rawMisMatchPercentage`

<Option type="boolean" default="false" required="No">

- **Utilizzato con:** Tutti i [metodi Check](./methods#check-methods)
- **Contesti applicativi supportati:** Tutti

Se true, la percentuale restituita sarà nel formato `0.12345678`; il valore predefinito è `0.12`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        rawMisMatchPercentage: true
    }
)
```

</Option>
### `returnAllCompareData`

<Option type="boolean" default="false" required="No">

- **Utilizzato con:** Tutti i [metodi Check](./methods#check-methods)
- **Contesti applicativi supportati:** Tutti

Restituisce tutti i dati del confronto, non solo la percentuale di discrepanza; vedi anche [Output della console](./test-output#console-output-1)

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        returnAllCompareData: true
    }
)
```

</Option>
### `saveAboveTolerance`

<Option type="number" default="0" required="No">

- **Utilizzato con:** Tutti i [metodi Check](./methods#check-methods)
- **Contesti applicativi supportati:** Tutti

Valore ammissibile di `misMatchPercentage` che impedisce il salvataggio delle immagini con differenze

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        saveAboveTolerance: 0.25
    }
)
```

</Option>
### `diffPixelBoundingBoxProximity`

<Option type="number" default="5" required="No">

- **Utilizzato con:** Tutti i [metodi Check](./methods#check-methods)
- **Contesti applicativi supportati:** Tutti

La prossimità in pixel utilizzata per raggruppare i pixel differenti nei report JSON. Valori più alti raggruppano più pixel in un numero minore di bounding box; valori più bassi producono box più precisi ma più numerosi. Rilevante solo quando [`createJsonReportFiles`](/docs/visual-testing/service-options#createjsonreportfiles) è abilitato.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        diffPixelBoundingBoxProximity: 10
    }
)
```

# Opzioni delle cartelle

---

La cartella baseline e le cartelle degli screenshot (actual, diff) sono opzioni che possono essere impostate durante l'istanziazione del plugin o del metodo. Per impostare le opzioni delle cartelle su un metodo specifico, passa le opzioni delle cartelle all'oggetto delle opzioni del metodo. Questo può essere utilizzato per:

- Web
- Hybrid App
- Native App

```ts
import path from 'node:path'

const methodOptions = {
    actualFolder: path.join(process.cwd(), 'customActual'),
    baselineFolder: path.join(process.cwd(), 'customBaseline'),
    diffFolder: path.join(process.cwd(), 'customDiff'),
}

// Puoi utilizzarlo per tutti i metodi
await expect(
    await browser.checkFullPageScreen("checkFullPage", methodOptions)
).toEqual(0)
```

</Option>
### `actualFolder`

<Option type="string" required="No" contexts="All">

Cartella per lo snapshot acquisito durante il test.

</Option>
### `baselineFolder`

<Option type="string" required="No" contexts="All">

Cartella per l'immagine baseline utilizzata per il confronto.

</Option>
### `diffFolder`

<Option type="string" required="No" contexts="All">

Cartella per l'immagine delle differenze generata durante il confronto.

</Option>