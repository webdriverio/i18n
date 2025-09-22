---
id: method-options
title: Opzioni dei Metodi
---

Le opzioni dei metodi sono le opzioni che possono essere impostate per ogni [metodo](./methods). Se l'opzione ha la stessa chiave di un'opzione che è stata impostata durante l'istanziazione del plugin, questa opzione del metodo sovrascriverà il valore dell'opzione del plugin.

:::info NOTA

-   Tutte le opzioni dalle [Opzioni di Salvataggio](#save-options) possono essere utilizzate per i metodi [Confronta](#compare-check-options)
-   Tutte le opzioni di confronto possono essere utilizzate durante l'istanziazione del servizio __o__ per ogni singolo metodo di verifica. Se un'opzione del metodo ha la stessa chiave di un'opzione che è stata impostata durante l'istanziazione del servizio, allora l'opzione di confronto del metodo sovrascriverà il valore dell'opzione di confronto del servizio.
- Tutte le opzioni possono essere utilizzate per i contesti di applicazione sottostanti, salvo diversa indicazione:
    - Web
    - App Ibrida
    - App Nativa
- Gli esempi seguenti sono con i metodi `save*`, ma possono anche essere utilizzati con i metodi `check*`

:::

## Save Options

### `disableBlinkingCursor`

- **Tipo:** `boolean`
- **Obbligatorio:** No
- **Predefinito:** `false`
- **Usato con:** Tutti i [metodi](./methods)
- **Contesti di Applicazione Supportati:** Web, App Ibrida (Webview)

Attiva/Disattiva il "lampeggiamento" del cursore in tutti gli elementi `input`, `textarea`, `[contenteditable]` nell'applicazione. Se impostato su `true`, il cursore sarà impostato su `transparent` prima di catturare uno screenshot e ripristinato al termine.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableBlinkingCursor: true
    }
)
```

### `disableCSSAnimation`

- **Tipo:** `boolean`
- **Obbligatorio:** No
- **Predefinito:** `false`
- **Usato con:** Tutti i [metodi](./methods)
- **Contesti di Applicazione Supportati:** Web, App Ibrida (Webview)

Attiva/Disattiva tutte le animazioni CSS nell'applicazione. Se impostato su `true`, tutte le animazioni saranno disabilitate prima di catturare uno screenshot e ripristinate al termine

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableCSSAnimation: true
    }
)
```

### `enableLegacyScreenshotMethod`

- **Tipo:** `boolean`
- **Obbligatorio:** No
- **Predefinito:** `false`
- **Usato con:** Tutti i [metodi](./methods)
- **Contesti di Applicazione Supportati:** Web, App Ibrida (Webview)

Usa questa opzione per tornare al metodo di screenshot "vecchio" basato sul protocollo W3C-WebDriver. Questo può essere utile se i tuoi test si basano su immagini di riferimento esistenti o se stai operando in ambienti che non supportano completamente gli screenshot basati su BiDi.
Nota che abilitando questo potresti produrre screenshot con risoluzione o qualità leggermente diverse.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLegacyScreenshotMethod: true
    }
)
```

### `enableLayoutTesting`

- **Tipo:** `boolean`
- **Obbligatorio:** No
- **Predefinito:** `false`
- **Usato con:** Tutti i [metodi](./methods)
- **Contesti di Applicazione Supportati:** Web, App Ibrida (Webview)

Questo nasconderà tutto il testo in una pagina in modo che solo il layout venga utilizzato per il confronto. Il testo verrà nascosto aggiungendo lo stile `'color': 'transparent !important'` a __ciascun__ elemento.

Per l'output vedi [Test Output](./test-output#enablelayouttesting).

:::info
Usando questo flag, ogni elemento che contiene testo (quindi non solo `p, h1, h2, h3, h4, h5, h6, span, a, li`, ma anche `div|button|..`) otterrà questa proprietà. Non esiste un'opzione per personalizzare questo comportamento.
:::

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLayoutTesting: true
    }
)
```

### `hideScrollBars`

- **Tipo:** `boolean`
- **Obbligatorio:** No
- **Predefinito:** `true`
- **Usato con:** Tutti i [metodi](./methods)
- **Contesti di Applicazione Supportati:** Web, App Ibrida (Webview)

Nasconde le barre di scorrimento nell'applicazione. Se impostato su true, tutte le barre di scorrimento saranno disabilitate prima di catturare uno screenshot. Questa opzione è impostata a `true` per impostazione predefinita per prevenire problemi aggiuntivi.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideScrollBars: false
    }
)
```

### `hideElements`

- **Tipo:** `array`
- **Obbligatorio:** No
- **Usato con:** Tutti i [metodi](./methods)
- **Contesti di Applicazione Supportati:** Web, App Ibrida (Webview)

Questo metodo può nascondere uno o più elementi aggiungendo la proprietà `visibility: hidden` fornendo un array di elementi.

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

### `removeElements`

- **Tipo:** `array`
- **Obbligatorio:** No
- **Usato con:** Tutti i [metodi](./methods)
- **Contesti di Applicazione Supportati:** Web, App Ibrida (Webview)

Questo metodo può _rimuovere_ uno o più elementi aggiungendo la proprietà `display: none` fornendo un array di elementi.

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

### `resizeDimensions`

- **Tipo:** `object`
- **Obbligatorio:** No
- **Predefinito:** `{ top: 0, right: 0, bottom: 0, left: 0}`
- **Usato con:** Solo per [`saveElement`](./methods#saveelement) o [`checkElement`](./methods#checkelement)
- **Contesti di Applicazione Supportati:** Web, App Ibrida (Webview), App Nativa

Un oggetto che deve contenere un numero di pixel `top`, `right`, `bottom` e `left` che devono rendere più grande il ritaglio dell'elemento.

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

### `userBasedFullPageScreenshot`

- **Tipo:** `boolean`
- **Obbligatorio:** No
- **Predefinito:** `false`
- **Usato con:** Solo per [`saveFullPageScreen`](./methods#savefullpagescreen), [`saveTabbablePage`](./methods#savetabbablepage), [`checkFullPageScreen`](./methods#checkfullpagescreen) o [`checkTabbablePage`](./methods#checktabbablepage)
- **Contesti di Applicazione Supportati:** Web, App Ibrida (Webview)

Quando impostato su `true`, questa opzione abilita la **strategia di scorrimento e cucitura** per catturare screenshot a pagina intera.
Invece di utilizzare le funzionalità native di screenshot del browser, scorre manualmente la pagina e unisce più screenshot.
Questo metodo è particolarmente utile per pagine con **contenuto caricato in modo lazy** o layout complessi che richiedono lo scorrimento per essere completamente renderizzati.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        userBasedFullPageScreenshot: true
    }
)
```

### `fullPageScrollTimeout`

- **Tipo:** `number`
- **Obbligatorio:** No
- **Predefinito:** `1500`
- **Usato con:** Solo per [`saveFullPageScreen`](./methods#savefullpagescreen) o [`saveTabbablePage`](./methods#savetabbablepage)
- **Contesti di Applicazione Supportati:** Web, App Ibrida (Webview)

Il timeout in millisecondi da attendere dopo uno scorrimento. Questo potrebbe aiutare a identificare le pagine con caricamento lazy.

> **NOTA:** Questo funziona solo quando `userBasedFullPageScreenshot` è impostato su `true`

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        fullPageScrollTimeout: 3 * 1000
    }
)
```

### `hideAfterFirstScroll`

- **Tipo:** `array`
- **Obbligatorio:** No
- **Usato con:** Solo per [`saveFullPageScreen`](./methods#savefullpagescreen) o [`saveTabbablePage`](./methods#savetabbablepage)
- **Contesti di Applicazione Supportati:** Web, App Ibrida (Webview)

Questo metodo nasconderà uno o più elementi aggiungendo la proprietà `visibility: hidden` fornendo un array di elementi.
Questo sarà utile quando una pagina, ad esempio, contiene elementi fissi che scorreranno con la pagina se la pagina viene scorruta, ma daranno un effetto fastidioso quando viene realizzato uno screenshot a pagina intera

> **NOTA:** Questo funziona solo quando `userBasedFullPageScreenshot` è impostato su `true`

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

### `waitForFontsLoaded`

- **Tipo:** `boolean`
- **Obbligatorio:** No
- **Predefinito:** `true`
- **Usato con:** Tutti i [metodi](./methods)
- **Contesti di Applicazione Supportati:** Web, App Ibrida (Webview)

I font, inclusi quelli di terze parti, possono essere caricati in modo sincrono o asincrono. Il caricamento asincrono significa che i font potrebbero caricarsi dopo che WebdriverIO ha determinato che una pagina è stata completamente caricata. Per prevenire problemi di rendering dei font, questo modulo, per impostazione predefinita, attenderà che tutti i font siano caricati prima di catturare uno screenshot.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        waitForFontsLoaded: true
    }
)
```

## Compare (Check) Options

Le opzioni di confronto sono opzioni che influenzano il modo in cui il confronto, tramite [ResembleJS](https://github.com/Huddle/Resemble.js), viene eseguito.

### `ignoreAlpha`

- **Tipo:** `boolean`
- **Predefinito:** `false`
- **Obbligatorio:** No
- **Usato con:** Tutti i [metodi Check](./methods#check-methods)
- **Contesti di Applicazione Supportati:** Tutti

Confronta le immagini e scarta il canale alfa.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAlpha: true
    }
)
```

### `blockOutSideBar`

- **Tipo:** `boolean`
- **Predefinito:** `true`
- **Obbligatorio:** No
- **Usato con:** _Può essere utilizzato solo per `checkScreen()`. Questo è **solo per iPad**_
- **Contesti di Applicazione Supportati:** Tutti

Blocca automaticamente la barra laterale per iPad in modalità orizzontale durante i confronti. Questo previene fallimenti sul componente nativo tab/privato/segnalibro.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutSideBar: true
    }
)
```

### `blockOutStatusBar`

- **Tipo:** `boolean`
- **Predefinito:** `true`
- **Obbligatorio:** No
- **Usato con:** _Questo è **solo per Mobile**_
- **Contesti di Applicazione Supportati:** Ibrido (parte nativa) e App Native

Blocca automaticamente la barra di stato e la barra degli indirizzi durante i confronti. Questo previene fallimenti su tempo, stato del WiFi o della batteria.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutStatusBar: true
    }
)
```

### `blockOutToolBar`

- **Tipo:** `boolean`
- **Predefinito:** `true`
- **Obbligatorio:** No
- **Usato con:** _Questo è **solo per Mobile**_
- **Contesti di Applicazione Supportati:** Ibrido (parte nativa) e App Native

Blocca automaticamente la barra degli strumenti.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutToolBar: true
    }
)
```

### `ignoreAntialiasing`

- **Tipo:** `boolean`
- **Predefinito:** `false`
- **Obbligatorio:** No
- **Usato con:** Tutti i [metodi Check](./methods#check-methods)
- **Contesti di Applicazione Supportati:** Tutti

Confronta le immagini e scarta l'anti-aliasing.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAntialiasing: true
    }
)
```

### `ignoreColors`

- **Tipo:** `boolean`
- **Predefinito:** `false`
- **Obbligatorio:** No
- **Usato con:** Tutti i [metodi Check](./methods#check-methods)
- **Contesti di Applicazione Supportati:** Tutti

Anche se le immagini sono a colori, il confronto paragonerà 2 immagini in bianco e nero

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreColors: true
    }
)
```

### `ignoreLess`

- **Tipo:** `boolean`
- **Predefinito:** `false`
- **Obbligatorio:** No
- **Usato con:** Tutti i [metodi Check](./methods#check-methods)
- **Contesti di Applicazione Supportati:** Tutti

Confronta immagini con i parametri `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreLess: true
    }
)
```

### `ignoreNothing`

- **Tipo:** `boolean`
- **Predefinito:** `false`
- **Obbligatorio:** No
- **Usato con:** Tutti i [metodi Check](./methods#check-methods)
- **Contesti di Applicazione Supportati:** Tutti

Confronta immagini con i parametri `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreNothing: true
    }
)
```

### `rawMisMatchPercentage`

- **Tipo:** `boolean`
- **Predefinito:** `false`
- **Obbligatorio:** No
- **Usato con:** Tutti i [metodi Check](./methods#check-methods)
- **Contesti di Applicazione Supportati:** Tutti

Se true, la percentuale restituita sarà come `0.12345678`, di default è `0.12`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        rawMisMatchPercentage: true
    }
)
```

### `returnAllCompareData`

- **Tipo:** `boolean`
- **Predefinito:** `false`
- **Obbligatorio:** No
- **Usato con:** Tutti i [metodi Check](./methods#check-methods)
- **Contesti di Applicazione Supportati:** Tutti

Questo restituirà tutti i dati di confronto, non solo la percentuale di discrepanza, vedi anche [Console Output](./test-output#console-output-1)

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        returnAllCompareData: true
    }
)
```

### `saveAboveTolerance`

- **Tipo:** `number`
- **Predefinito:** `0`
- **Obbligatorio:** No
- **Usato con:** Tutti i [metodi Check](./methods#check-methods)
- **Contesti di Applicazione Supportati:** Tutti

Valore consentito di `misMatchPercentage` che impedisce il salvataggio di immagini con differenze

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        saveAboveTolerance: 0.25
    }
)
```

### `largeImageThreshold`

- **Tipo:** `number`
- **Predefinito:** `0`
- **Obbligatorio:** No
- **Usato con:** Tutti i [metodi Check](./methods#check-methods)
- **Contesti di Applicazione Supportati:** Tutti

Il confronto di immagini di grandi dimensioni può portare a problemi di prestazioni.
Quando si fornisce un numero per il numero di pixel qui (maggiore di 0), l'algoritmo di confronto salta i pixel quando la larghezza o l'altezza dell'immagine è maggiore di `largeImageThreshold` pixel.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        largeImageThreshold: 1500
    }
)
```

### `scaleImagesToSameSize`

- **Tipo:** `boolean`
- **Predefinito:** `false`
- **Obbligatorio:** No
- **Usato con:** Tutti i [metodi Check](./methods#check-methods)
- **Contesti di Applicazione Supportati:** Tutti

Ridimensiona 2 immagini alla stessa dimensione prima dell'esecuzione del confronto. Si consiglia vivamente di abilitare `ignoreAntialiasing` e `ignoreAlpha`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        scaleImagesToSameSize: true
    }
)
```

### `ignore`

- **Tipo:** `array`
- **Obbligatorio:** No
- **Usato con:** Solo con il metodo `checkScreen`, **NON** con il metodo `checkElement`
- **Contesti di Applicazione Supportati:** App Nativa

Questo metodo bloccherà automaticamente elementi o un'area su uno schermo basandosi su un array di elementi o un oggetto `x|y|width|height`.

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

## Folder options

Le cartelle di riferimento e di screenshot (attuali, diff) sono opzioni che possono essere impostate durante l'istanziazione del plugin o del metodo. Per impostare le opzioni della cartella su un metodo particolare, passa le opzioni della cartella all'oggetto delle opzioni del metodo. Questo può essere usato per:

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

- **Tipo:** `string`
- **Obbligatorio:** No
- **Contesti di Applicazione Supportati:** Tutti

Cartella per lo snapshot che è stato catturato nel test.

### `baselineFolder`

- **Tipo:** `string`
- **Obbligatorio:** No
- **Contesti di Applicazione Supportati:** Tutti

Cartella per l'immagine di riferimento che viene utilizzata per il confronto.

### `diffFolder`

- **Tipo:** `string`
- **Obbligatorio:** No
- **Contesti di Applicazione Supportati:** Tutti

Cartella per la differenza di immagine renderizzata da ResembleJS.