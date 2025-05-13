---
id: method-options
title: Opzioni dei Metodi
---

Le opzioni dei metodi sono le opzioni che possono essere impostate per ogni [metodo](./methods). Se l'opzione ha la stessa chiave di un'opzione che è stata impostata durante l'istanziazione del plugin, questa opzione di metodo sovrascriverà il valore dell'opzione del plugin.

## Opzioni di Salvataggio

### `disableBlinkingCursor`

-   **Tipo:** `boolean`
-   **Obbligatorio:** No
-   **Predefinito:** `false`
-   **Supportato:** Web, App Ibrida (Webview)

Abilita/Disabilita il "lampeggiamento" del cursore in tutti gli elementi `input`, `textarea`, `[contenteditable]` nell'applicazione. Se impostato su `true`, il cursore sarà impostato su `transparent` prima di acquisire uno screenshot
e ripristinato al termine

### `disableCSSAnimation`

-   **Tipo:** `boolean`
-   **Obbligatorio:** No
-   **Predefinito:** `false`
-   **Supportato:** Web, App Ibrida (Webview)

Abilita/Disabilita tutte le animazioni CSS nell'applicazione. Se impostato su `true`, tutte le animazioni saranno disabilitate prima di acquisire uno screenshot
e ripristinate al termine

### `enableLegacyScreenshotMethod`

-   **Tipo:** `boolean`
-   **Obbligatorio:** No
-   **Predefinito:** `false`
-   **Supportato:** Web, App Ibrida (Webview)

Usa questa opzione per tornare al metodo di screenshot "precedente" basato sul protocollo W3C-WebDriver. Questo può essere utile se i tuoi test si basano su immagini di riferimento esistenti o se stai eseguendo in ambienti che non supportano completamente gli screenshot basati su BiDi.
Nota che abilitando questa opzione potresti ottenere screenshot con risoluzione o qualità leggermente diverse.

### `enableLayoutTesting`

-   **Tipo:** `boolean`
-   **Obbligatorio:** No
-   **Predefinito:** `false`
-   **Usato con:** Tutti i [metodi](./methods)
-   **Supportato:** Web

Questo nasconderà tutto il testo in una pagina in modo che solo il layout venga utilizzato per il confronto. L'occultamento avverrà aggiungendo lo stile `'color': 'transparent !important'` a __ciascun__ elemento.

Per l'output vedi [Test Output](./test-output#enablelayouttesting)

:::info
Utilizzando questo flag, ogni elemento che contiene testo (quindi non solo `p, h1, h2, h3, h4, h5, h6, span, a, li`, ma anche `div|button|..`) riceverà questa proprietà. __NON__ esiste un'opzione per personalizzare questo comportamento.
:::

### `hideScrollBars`

-   **Tipo:** `boolean`
-   **Obbligatorio:** No
-   **Predefinito:** `true`
-   **Usato con:** Tutti i [metodi](./methods)
-   **Supportato:** Web, App Ibrida (Webview)

Nasconde le barre di scorrimento nell'applicazione. Se impostato su true, tutte le barre di scorrimento saranno disabilitate prima di acquisire uno screenshot. Questo è impostato di default su `true` per prevenire problemi aggiuntivi.

### `hideElements`

-   **Tipo:** `array`
-   **Obbligatorio:** no
-   **Usato con:** Tutti i [metodi](./methods)
-   **Supportato:** Web, App Ibrida (Webview), App Nativa

Questo metodo può nascondere uno o più elementi aggiungendo la proprietà `visibility: hidden` fornendo un array di elementi.

### `removeElements`

-   **Tipo:** `array`
-   **Obbligatorio:** no
-   **Usato con:** Tutti i [metodi](./methods)
-   **Supportato:** Web, App Ibrida (Webview), App Nativa

Questo metodo può _rimuovere_ uno o più elementi aggiungendo la proprietà `display: none` fornendo un array di elementi.

### `resizeDimensions`

-   **Tipo:** `object`
-   **Obbligatorio:** no
-   **Predefinito:** `{ top: 0, right: 0, bottom: 0, left: 0}`
-   **Usato con:** Solo per [`saveElement`](./methods#saveelement) o [`checkElement`](./methods#checkelement)
-   **Supportato:** Web, App Ibrida (Webview), App Nativa

Un oggetto che deve contenere un numero di pixel `top`, `right`, `bottom` e `left` che devono rendere il ritaglio dell'elemento più grande.

### `userBasedFullPageScreenshot`

* **Tipo:** `boolean`
* **Obbligatorio:** No
* **Predefinito:** `false`
* **Supportato:** Web, App Ibrida (Webview)

Quando impostato su `true`, questa opzione abilita la **strategia di scorrimento e cucitura** per catturare screenshot a pagina intera.
Invece di utilizzare le capacità native di screenshot del browser, scorre manualmente attraverso la pagina e unisce più screenshot insieme.
Questo metodo è particolarmente utile per pagine con **contenuto caricato in modo lazy** o layout complessi che richiedono lo scorrimento per il rendering completo.

### `fullPageScrollTimeout`

-   **Tipo:** `number`
-   **Obbligatorio:** No
-   **Predefinito:** `1500`
-   **Usato con:** Solo per [`saveFullPageScreen`](./methods#savefullpagescreen) o [`saveTabbablePage`](./methods#savetabbablepage)
-   **Supportato:** Web

Il timeout in millisecondi da attendere dopo uno scorrimento. Questo potrebbe aiutare a identificare pagine con caricamento lazy.

> **NOTA:** Questo funziona solo quando `userBasedFullPageScreenshot` è impostato su `true`

### `hideAfterFirstScroll`

-   **Tipo:** `array`
-   **Obbligatorio:** no
-   **Usato con:** Solo per [`saveFullPageScreen`](./methods#savefullpagescreen) o [`saveTabbablePage`](./methods#savetabbablepage)
-   **Supportato:** Web

Questo metodo nasconderà uno o più elementi aggiungendo la proprietà `visibility: hidden` fornendo un array di elementi.
Questo sarà utile quando una pagina, ad esempio, contiene elementi sticky che scorrono con la pagina quando questa viene scrollata ma daranno un effetto fastidioso quando viene fatto uno screenshot a pagina intera

> **NOTA:** Questo funziona solo quando `userBasedFullPageScreenshot` è impostato su `true`

### `waitForFontsLoaded`

-   **Tipo:** `boolean`
-   **Obbligatorio:** No
-   **Predefinito:** `true`
-   **Usato con:** Tutti i [metodi](./methods)
-   **Supportato:** Web, App Ibrida (Webview)

I font, inclusi i font di terze parti, possono essere caricati in modo sincrono o asincrono. Il caricamento asincrono significa che i font potrebbero caricarsi dopo che WebdriverIO ha determinato che una pagina è stata completamente caricata. Per prevenire problemi di rendering dei font, questo modulo, per impostazione predefinita, attenderà che tutti i font siano caricati prima di acquisire uno screenshot.

## Opzioni di Confronto (Check)

Le opzioni di confronto sono opzioni che influenzano il modo in cui il confronto, tramite [ResembleJS](https://github.com/Huddle/Resemble.js), viene eseguito.

:::info NOTA

-   Tutte le opzioni dalle [Opzioni di Salvataggio](#opzioni-di-salvataggio) possono essere utilizzate per i metodi di Confronto
-   Tutte le opzioni di confronto possono essere utilizzate durante l'istanziazione del servizio __o__ per ogni singolo metodo di controllo. Se un'opzione di metodo ha la stessa chiave di un'opzione impostata durante l'istanziazione del servizio, l'opzione di confronto del metodo sovrascriverà il valore dell'opzione di confronto del servizio.
- Tutte le opzioni possono essere utilizzate per:
    - Web
    - App Ibrida
    - App Nativa

:::

### `ignoreAlpha`

-   **Tipo:** `boolean`
-   **Predefinito:** `false`
-   **Obbligatorio:** no

Confronta le immagini e scarta l'alpha.

### `blockOutSideBar`

-   **Tipo:** `boolean`
-   **Predefinito:** `true`
-   **Obbligatorio:** no
-   **Nota:** _Può essere utilizzato solo per `checkScreen()`. Questo è **solo per iPad**_

Blocca automaticamente la barra laterale per iPad in modalità landscape durante i confronti. Questo previene fallimenti sul componente nativo tab/private/bookmark.

### `blockOutStatusBar`

-   **Tipo:** `boolean`
-   **Predefinito:** `true`
-   **Obbligatorio:** no
-   **Nota:** _Questo è **solo per Mobile**_

Blocca automaticamente la barra di stato e la barra degli indirizzi durante i confronti. Questo previene fallimenti su ora, wifi o stato della batteria.

### `blockOutToolBar`

-   **Tipo:** `boolean`
-   **Predefinito:** `true`
-   **Obbligatorio:** no
-   **Nota:** _Questo è **solo per Mobile**_

Blocca automaticamente la toolbar.

### `ignoreAntialiasing`

-   **Tipo:** `boolean`
-   **Predefinito:** `false`
-   **Obbligatorio:** no

Confronta le immagini e scarta l'anti-aliasing.

### `ignoreColors`

-   **Tipo:** `boolean`
-   **Predefinito:** `false`
-   **Obbligatorio:** no

Anche se le immagini sono a colori, il confronto confronterà 2 immagini in bianco e nero

### `ignoreLess`

-   **Tipo:** `boolean`
-   **Predefinito:** `false`
-   **Obbligatorio:** no

Confronta le immagini e confronta con `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

### `ignoreNothing`

-   **Tipo:** `boolean`
-   **Predefinito:** `false`
-   **Obbligatorio:** no

Confronta le immagini e confronta con `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

### `rawMisMatchPercentage`

-   **Tipo:** `boolean`
-   **Predefinito:** `false`
-   **Obbligatorio:** no

Se true, la percentuale restituita sarà come `0.12345678`, di default è `0.12`

### `returnAllCompareData`

-   **Tipo:** `boolean`
-   **Predefinito:** `false`
-   **Obbligatorio:** no

Questo restituirà tutti i dati di confronto, non solo la percentuale di mismatch

### `saveAboveTolerance`

-   **Tipo:** `number`
-   **Predefinito:** `0`
-   **Obbligatorio:** no

Valore ammissibile di `misMatchPercentage` che impedisce il salvataggio di immagini con differenze

### `largeImageThreshold`

-   **Tipo:** `number`
-   **Predefinito:** `0`
-   **Obbligatorio:** no

Il confronto di immagini di grandi dimensioni può portare a problemi di prestazioni.
Quando si fornisce un numero per il numero di pixel qui (maggiore di 0), l'algoritmo di confronto salta i pixel quando la larghezza o l'altezza dell'immagine è maggiore di `largeImageThreshold` pixel.

### `scaleImagesToSameSize`

-   **Tipo:** `boolean`
-   **Predefinito:** `false`
-   **Obbligatorio:** no

Scala 2 immagini alla stessa dimensione prima dell'esecuzione del confronto. Altamente raccomandato per abilitare `ignoreAntialiasing` e `ignoreAlpha`

## Opzioni di cartella

La cartella di baseline e le cartelle di screenshot (attuale, diff) sono opzioni che possono essere impostate durante l'istanziazione del plugin o del metodo. Per impostare le opzioni di cartella su un particolare metodo, passa le opzioni di cartella all'oggetto delle opzioni dei metodi. Questo può essere utilizzato per:

- Web
- App Ibrida
- App Nativa

```ts
import path from 'node:path'

const methodOptions = {
    actualFolder: path.join(process.cwd(), 'customActual'),
    baselineFolder: path.join(process.cwd(), 'customBaseline'),
    diffFolder: path.join(process.cwd(), 'customDiff'),
}

// Puoi usare questo per tutti i metodi
await expect(
    await browser.checkFullPageScreen("checkFullPage", methodOptions)
).toEqual(0)
```

### `actualFolder`

-   **Tipo:** `string`
-   **Obbligatorio:** no

Cartella per lo snapshot che è stato catturato nel test.

### `baselineFolder`

-   **Tipo:** `string`
-   **Obbligatorio:** no

Cartella per l'immagine di baseline che viene utilizzata per il confronto.

### `diffFolder`

-   **Tipo:** `string`
-   **Obbligatorio:** no

Cartella per la differenza di immagine renderizzata da ResembleJS.