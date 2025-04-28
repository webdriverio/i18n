---
id: method-options
title: Opzioni dei Metodi
---

Le opzioni dei metodi sono le opzioni che possono essere impostate per ogni [metodo](./methods). Se l'opzione ha la stessa chiave di un'opzione impostata durante l'istanziazione del plugin, questa opzione del metodo sovrascriverà il valore dell'opzione del plugin.

## Opzioni di Salvataggio

### `disableBlinkingCursor`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported:** Web, Hybrid App (Webview)

Abilita/Disabilita il "lampeggiamento" del cursore negli elementi `input`, `textarea`, `[contenteditable]` nell'applicazione. Se impostato a `true`, il cursore sarà impostato a `transparent` prima di catturare uno screenshot
e ripristinato al termine

### `disableCSSAnimation`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported:** Web, Hybrid App (Webview)

Abilita/Disabilita tutte le animazioni CSS nell'applicazione. Se impostato a `true`, tutte le animazioni saranno disabilitate prima di catturare uno screenshot
e ripristinate al termine

### `enableLayoutTesting`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Used with:** Tutti i [metodi](./methods)
-   **Supported:** Web

Questo nasconderà tutto il testo in una pagina in modo che solo il layout venga utilizzato per il confronto. Il testo sarà nascosto aggiungendo lo stile `'color': 'transparent !important'` a __ciascun__ elemento.

Per l'output, vedere [Test Output](./test-output#enablelayouttesting)

:::info
Utilizzando questa opzione, ogni elemento che contiene testo (quindi non solo `p, h1, h2, h3, h4, h5, h6, span, a, li`, ma anche `div|button|..`) riceverà questa proprietà. __Non__ esiste un'opzione per personalizzare questo comportamento.
:::

### `hideScrollBars`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Used with:** Tutti i [metodi](./methods)
-   **Supported:** Web, Hybrid App (Webview)

Nasconde le barre di scorrimento nell'applicazione. Se impostato a true, tutte le barre di scorrimento saranno disabilitate prima di catturare uno screenshot. Per impostazione predefinita è `true` per prevenire problemi aggiuntivi.

### `hideElements`

-   **Type:** `array`
-   **Mandatory:** no
-   **Used with:** Tutti i [metodi](./methods)
-   **Supported:** Web, Hybrid App (Webview), Native App

Questo metodo può nascondere uno o più elementi aggiungendo la proprietà `visibility: hidden` fornendo un array di elementi.

### `removeElements`

-   **Type:** `array`
-   **Mandatory:** no
-   **Used with:** Tutti i [metodi](./methods)
-   **Supported:** Web, Hybrid App (Webview), Native App

Questo metodo può _rimuovere_ uno o più elementi aggiungendo la proprietà `display: none` fornendo un array di elementi.

### `resizeDimensions`

-   **Type:** `object`
-   **Mandatory:** no
-   **Default:** `{ top: 0, right: 0, bottom: 0, left: 0}`
-   **Used with:** Solo per [`saveElement`](./methods#saveelement) o [`checkElement`](./methods#checkelement)
-   **Supported:** Web, Hybrid App (Webview), Native App

Un oggetto che deve contenere una quantità di pixel `top`, `right`, `bottom` e `left` che devono rendere il ritaglio dell'elemento più grande.

### `fullPageScrollTimeout`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** `1500`
-   **Used with:** Solo per [`saveFullPageScreen`](./methods#savefullpagescreen) o [`saveTabbablePage`](./methods#savetabbablepage)
-   **Supported:** Web

Il timeout in millisecondi da attendere dopo uno scroll. Questo può aiutare a identificare pagine con caricamento lazy.

### `hideAfterFirstScroll`

-   **Type:** `array`
-   **Mandatory:** no
-   **Used with:** Solo per [`saveFullPageScreen`](./methods#savefullpagescreen) o [`saveTabbablePage`](./methods#savetabbablepage)
-   **Supported:** Web

Questo metodo nasconderà uno o più elementi aggiungendo la proprietà `visibility: hidden` fornendo un array di elementi.
Sarà utile quando una pagina, ad esempio, contiene elementi sticky che scorrono con la pagina quando questa viene scrollata ma che daranno un effetto fastidioso quando si fa uno screenshot dell'intera pagina

### `waitForFontsLoaded`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Used with:** Tutti i [metodi](./methods)
-   **Supported:** Web, Hybrid App (Webview)

I font, inclusi quelli di terze parti, possono essere caricati in modo sincrono o asincrono. Il caricamento asincrono significa che i font potrebbero caricarsi dopo che WebdriverIO ha determinato che una pagina è completamente caricata. Per prevenire problemi di rendering dei font, questo modulo, per impostazione predefinita, attenderà che tutti i font siano caricati prima di catturare uno screenshot.

## Opzioni di Confronto (Check)

Le opzioni di confronto sono opzioni che influenzano il modo in cui il confronto, eseguito da [ResembleJS](https://github.com/Huddle/Resemble.js), viene eseguito.

:::info NOTA

-   Tutte le opzioni dalle [Opzioni di Salvataggio](#save-options) possono essere utilizzate per i metodi di Confronto
-   Tutte le opzioni di confronto possono essere utilizzate durante l'istanziazione del servizio __o__ per ogni singolo metodo di controllo. Se un'opzione del metodo ha la stessa chiave di un'opzione impostata durante l'istanziazione del servizio, l'opzione di confronto del metodo sovrascriverà il valore dell'opzione di confronto del servizio.
- Tutte le opzioni possono essere utilizzate per:
    - Web
    - Hybrid App
    - Native App

:::

### `ignoreAlpha`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

Confronta le immagini e scarta l'alpha.

### `blockOutSideBar`

-   **Type:** `boolean`
-   **Default:** `true`
-   **Mandatory:** no
-   **Remark:** _Può essere utilizzato solo per `checkScreen()`. Questo è **solo per iPad**_

Blocca automaticamente la barra laterale per iPad in modalità orizzontale durante i confronti. Questo previene errori sul componente nativo tab/private/bookmark.

### `blockOutStatusBar`

-   **Type:** `boolean`
-   **Default:** `true`
-   **Mandatory:** no
-   **Remark:** _Questo è **solo per Mobile**_

Blocca automaticamente la barra di stato e la barra degli indirizzi durante i confronti. Questo previene errori su ora, wifi o stato della batteria.

### `blockOutToolBar`

-   **Type:** `boolean`
-   **Default:** `true`
-   **Mandatory:** no
-   **Remark:** _Questo è **solo per Mobile**_

Blocca automaticamente la barra degli strumenti.

### `ignoreAntialiasing`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

Confronta le immagini e scarta l'anti-aliasing.

### `ignoreColors`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

Anche se le immagini sono a colori, il confronto comparerà 2 immagini in bianco e nero

### `ignoreLess`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

Confronta le immagini con `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

### `ignoreNothing`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

Confronta le immagini con `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

### `rawMisMatchPercentage`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

Se true la percentuale di ritorno sarà come `0.12345678`, di default è `0.12`

### `returnAllCompareData`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

Questo restituirà tutti i dati di confronto, non solo la percentuale di mancata corrispondenza

### `saveAboveTolerance`

-   **Type:** `number`
-   **Default:** `0`
-   **Mandatory:** no

Valore ammissibile di `misMatchPercentage` che impedisce il salvataggio di immagini con differenze

### `largeImageThreshold`

-   **Type:** `number`
-   **Default:** `0`
-   **Mandatory:** no

Il confronto di immagini di grandi dimensioni può portare a problemi di prestazioni.
Quando si fornisce un numero per il numero di pixel qui (maggiore di 0), l'algoritmo di confronto salta i pixel quando la larghezza o l'altezza dell'immagine è maggiore di `largeImageThreshold` pixel.

### `scaleImagesToSameSize`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

Ridimensiona 2 immagini alla stessa dimensione prima dell'esecuzione del confronto. Si consiglia vivamente di abilitare `ignoreAntialiasing` e `ignoreAlpha`

## Opzioni di cartella

La cartella di baseline e le cartelle degli screenshot (actual, diff) sono opzioni che possono essere impostate durante l'istanziazione del plugin o del metodo. Per impostare le opzioni di cartella su un particolare metodo, passa le opzioni di cartella all'oggetto opzioni del metodo. Questo può essere utilizzato per:

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

// You can use this for all methods
await expect(
    await browser.checkFullPageScreen("checkFullPage", methodOptions)
).toEqual(0)
```

### `actualFolder`

-   **Type:** `string`
-   **Mandatory:** no

Cartella per lo snapshot che è stato catturato nel test.

### `baselineFolder`

-   **Type:** `string`
-   **Mandatory:** no

Cartella per l'immagine di baseline che viene utilizzata per il confronto.

### `diffFolder`

-   **Type:** `string`
-   **Mandatory:** no

Cartella per la differenza di immagine renderizzata da ResembleJS.