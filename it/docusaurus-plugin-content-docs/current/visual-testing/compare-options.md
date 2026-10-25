---
id: compare-options
title: Opzioni di confronto
description: "Regola il modo in cui gli screenshot vengono confrontati con le opzioni di sensibilità visiva, pixelmatch, oscuramento per dispositivi mobili e reportistica per il servizio visual."
---

Le opzioni di confronto sono opzioni che influenzano il modo in cui viene eseguito il confronto.

:::info NOTA
Tutte le opzioni di confronto possono essere utilizzate durante l'istanziazione del servizio oppure per ogni singolo `checkElement`, `checkScreen` e `checkFullPageScreen`. Se un'opzione del metodo ha la stessa chiave di un'opzione impostata durante l'istanziazione del servizio, l'opzione di confronto del metodo sovrascriverà il valore dell'opzione di confronto del servizio.
:::

## Sensibilità visiva

---

:::info Cronologia delle versioni per le opzioni `ignore*`
I preset `ignore*` hanno cambiato comportamento una volta, come breaking change, quando il motore di confronto è passato da ResembleJS a Pixelmatch:

| Versione | Motore | Note |
| --- | --- | --- |
| v9 e precedenti | ResembleJS | Semantica originale di `ignore*` (basata su RGB/luminosità, con l'ordine dei preset proprio di resemble). |
| v10 e successive | Pixelmatch | I preset `ignore*` corrispondono alle impostazioni di threshold/AA di pixelmatch. I valori predefiniti e il comportamento attuali sono documentati per ciascuna opzione qui sotto; le nuove funzionalità/correzioni successive sono segnalate con una nota "Dalla versione" sull'opzione pertinente. |
| v11 e successive | Pixelmatch 8 | I colori vengono confrontati nello spazio colore OKLab con la distanza HyAB (in precedenza: YIQ). La scala del threshold e i preset `ignore*` non sono cambiati, ma le percentuali di mismatch possono differire leggermente rispetto alla v10. |

:::

**Ordinamento "vince l'ultimo":** quando più di un flag `ignore*` è abilitato contemporaneamente, viene effettivamente applicato un solo preset, secondo questo ordine (vince quello successivo): `ignoreAlpha` → `ignoreAntialiasing` → `ignoreColors` → `ignoreLess` → `ignoreNothing`. Viene registrato un avviso che indica quale preset ha prevalso.

### `ignoreColors`

<Option type="boolean" default="false" required="no">

-   **Nota:** _Può essere utilizzata anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin_
-   **Dalla versione:** `v10.1.0`: confronto basato solo sulla luminosità utilizzando i pesi di luma di resemble (`0.3/0.59/0.11`).

Confronta solo la luminosità, ignorando le differenze di tonalità/colore. Preset: threshold rigoroso (~16/255), anti-aliasing non tollerato.

**Usala quando** ci si aspetta che il colore stesso vari (ad es. UI con temi, immagini che cambiano colore a seconda dell'ambiente) ma si vogliono comunque rilevare cambiamenti di layout o di luminosità.

</Option>
### `ignoreAlpha`

<Option type="boolean" default="false" required="no">

-   **Nota:** _Può essere utilizzata anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin_
-   **Dalla versione:** `v10.1.0`: applica la propria regola di threshold/AA indipendentemente dagli altri flag `ignore*`.

Confronta le immagini scartando le differenze del canale alfa. Preset: threshold rigoroso (~16/255), anti-aliasing non tollerato.

**Usala quando** il rendering di trasparenza/opacità è instabile (ad es. overlay, elementi semitrasparenti) ma i colori effettivi dei pixel sottostanti sono importanti.

</Option>
### `ignoreAntialiasing`

<Option type="boolean" default="true" required="no">

-   **Nota:** _Può essere utilizzata anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin_
-   **Dalla versione:** `v10`: il valore predefinito è cambiato in `true` (era `false` nella v9 e precedenti).

Tollera i pixel con anti-aliasing durante il confronto (threshold rilassato ~32/255). È l'unico preset che tollera l'anti-aliasing ed è abilitato per impostazione predefinita, in modo che il rumore del rendering sub-pixel non faccia fallire i confronti fin dall'inizio. Impostalo su `false` per un confronto rigoroso in cui i pixel con anti-aliasing devono essere considerati mismatch.

**Usala per** risolvere la fonte più comune di instabilità nei test visivi: bordi di testo e forme renderizzati con un anti-aliasing leggermente diverso tra macchine/browser anche se in realtà nulla è cambiato.

</Option>
### `ignoreLess`

<Option type="boolean" default="false" required="no">

-   **Nota:** _Può essere utilizzata anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin_
-   **Dalla versione:** `v10.1.0`: applica la propria regola di threshold/AA indipendentemente dagli altri flag `ignore*`.

Confronta le immagini utilizzando una tolleranza RGB rilassata (~16/255 per canale nello spazio YIQ). Preset: threshold rigoroso, anti-aliasing non tollerato.

**Usala quando** vuoi un po' di margine per piccoli disturbi di rendering (artefatti di compressione in stile JPEG, leggeri arrotondamenti del colore) senza tollerare l'anti-aliasing.

</Option>
### `ignoreNothing`

<Option type="boolean" default="false" required="no">

-   **Nota:** _Può essere utilizzata anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin_
-   **Dalla versione:** `v10.1.0`: applica la propria regola di threshold/AA indipendentemente dagli altri flag `ignore*`.

Usa tolleranza zero: qualsiasi differenza di pixel viene considerata un mismatch, incluso l'anti-aliasing.

**Usala quando** hai bisogno di una prova pixel-perfect che nulla sia cambiato, ad es. per verificare che una correzione non abbia introdotto alcuna regressione, per quanto piccola.

</Option>
### `scaleImagesToSameSize`

<Option type="boolean" default="false" required="no">

-   **Nota:** _Può essere utilizzata anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin_

Ridimensiona 2 immagini alla stessa dimensione prima dell'esecuzione del confronto. Si consiglia vivamente di abilitare `ignoreAntialiasing` e `ignoreAlpha`

</Option>
## Controllo diretto di pixelmatch

---

:::info Aggiunto nella v10.1.0
`compareOptions.pixelmatch` non ha un equivalente nella v9 (ResembleJS). È un modo completamente nuovo per controllare direttamente il motore di confronto, invece di utilizzare un preset `ignore*`.
:::

### `compareOptions.pixelmatch`

<Option type="object" default="undefined" required="no">

-   **Nota:** _Può essere utilizzata anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin per quel metodo specifico_
-   **Aggiunto in:** `v10.1.0`

Passa le impostazioni direttamente a [pixelmatch](https://github.com/mapbox/pixelmatch) invece di utilizzare un preset `ignore*`. **Usala quando i cinque preset `ignore*` sono troppo approssimativi:** hai bisogno di un valore di threshold specifico che i preset non offrono, oppure di un'immagine diff effettivamente leggibile nei tuoi report/output CI invece dell'evidenziazione magenta predefinita.

:::warning Mutuamente esclusivi all'interno dello stesso oggetto di opzioni
Inserire una qualsiasi chiave `ignore*` e `pixelmatch` nello **stesso** oggetto di opzioni genera un `CompareOptionsConflictError`, anche quando il valore di `ignore*` è `false` (vedi l'esempio non valido qui sotto). Scegli una sola modalità per oggetto: preset `ignore*` oppure `pixelmatch`, mai entrambi.

Questo vale solo all'interno di un singolo oggetto. La configurazione del servizio e le opzioni di una chiamata a un metodo sono oggetti separati, quindi una chiamata `check*` **può** utilizzare una modalità diversa rispetto alla configurazione del servizio, ad esempio il servizio usa i preset `ignore*` ma una chiamata passa invece `pixelmatch` (o viceversa). In quel caso non viene generato alcun errore, ma solo registrato un avviso che segnala il cambio di modalità di confronto.
:::

| Campo | Tipo | Predefinito | A cosa serve |
| --- | --- | --- | --- |
| `threshold` | `number` | `0.1` | Sensibilità da 0 (qualsiasi differenza di pixel fallisce) a 1 (quasi nulla fallisce). Usalo per impostare un valore di sensibilità esatto invece di scegliere il preset `ignore*` più vicino. |
| `includeAA` | `boolean` | `false` | `true` considera i pixel dei bordi con anti-aliasing come mismatch; `false` li tollera. Disattivalo se le differenze di rendering dei bordi di font/forme causano fallimenti instabili. |
| `diffColor` | `[number, number, number]` | `[255, 0, 255]` (magenta) | Colore RGB per i pixel non corrispondenti nell'immagine diff. Cambialo se il magenta si confonde con la tua UI (ad es. un tema rosa/viola) e i mismatch sono difficili da individuare. |
| `aaColor` | `[number, number, number]` | `[255, 0, 255]` (magenta) | Colore RGB per i pixel con anti-aliasing, mantenuti visivamente separati dai mismatch reali così da poter distinguere a colpo d'occhio il "rumore di rendering" da un "bug reale". |
| `diffColorAlt` | `[number, number, number]` | `[255, 0, 255]` (magenta) | Colore RGB per i pixel aggiunti o rimossi (non semplicemente ricolorati), utile per distinguere gli spostamenti di layout dai cambiamenti di colore. |
| `alpha` | `number` | `0.1` | Opacità dell'overlay del diff sopra lo screenshot effettivo. Aumentala per far risaltare maggiormente i diff nei report; diminuiscila per continuare a vedere chiaramente la UI sottostante. Non è correlata al preset `ignoreAlpha`. |
| `diffMask` | `boolean` | `false` | Imposta `true` per produrre solo il diff grezzo (sfondo trasparente) invece del diff disegnato sopra lo screenshot, utile per creare un visualizzatore/report di diff personalizzato. |
| `checkerboard` | `boolean` | `true` | Controlla come vengono renderizzati i pixel semitrasparenti nel diff. Disattivalo se il motivo a scacchiera si confonde facilmente con il contenuto reale dei tuoi screenshot. |

**Configurazione del servizio:**

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['visual', {
            compareOptions: {
                pixelmatch: {
                    threshold: 0.063,
                    includeAA: true,
                },
            },
        }],
    ],
}
```

**Override a livello di metodo quando il servizio usa i preset `ignore*`:**

```js
await browser.checkScreen('homepage', {
    pixelmatch: { threshold: 0.05 },
})
```

**Override a livello di metodo quando il servizio usa `pixelmatch`:**

```js
await browser.checkScreen('homepage', {
    ignoreLess: true,
})
```

**Non valido: genera `CompareOptionsConflictError`**

```js
compareOptions: {
    ignoreLess: false,
    pixelmatch: { threshold: 0.063 },
}
```

Consulta la [documentazione di pixelmatch](https://github.com/mapbox/pixelmatch) per la semantica completa delle opzioni.

</Option>
## Oscuramento per dispositivi mobili

---

### `blockOutStatusBar`

<Option type="boolean" default="true" required="no">

-   **Nota:** _Può essere utilizzata anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin. Questa opzione è **solo per dispositivi mobili**_

Oscura automaticamente la barra di stato e la barra degli indirizzi durante i confronti. Questo evita fallimenti dovuti all'ora, al wifi o allo stato della batteria.

</Option>
### `blockOutToolBar`

<Option type="boolean" default="true" required="no">

-   **Nota:** _Può essere utilizzata anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin. Questa opzione è **solo per dispositivi mobili**_

Oscura automaticamente la barra degli strumenti.

</Option>
### `blockOutSideBar`

<Option type="boolean" default="true" required="no">

-   **Nota:** _Può essere utilizzata solo per `checkScreen()`. Sovrascriverà l'impostazione del plugin. Questa opzione è **solo per iPad**_

Oscura automaticamente la barra laterale sugli iPad in modalità orizzontale durante i confronti. Questo evita fallimenti dovuti al componente nativo delle schede/navigazione privata/segnalibri.

</Option>
## Risultati e reportistica

---

### `rawMisMatchPercentage`

<Option type="boolean" default="false" required="no">

-   **Nota:** _Può essere utilizzata anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin_

Se true, la percentuale restituita sarà del tipo `0.12345678`; il valore predefinito è `0.12`

</Option>
### `returnAllCompareData`

<Option type="boolean" default="false" required="no">

-   **Nota:** _Può essere utilizzata anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin_

Restituirà tutti i dati del confronto, non solo la percentuale di mismatch

</Option>
### `saveAboveTolerance`

<Option type="number" default="0" required="no">

-   **Nota:** _Può essere utilizzata anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin_

Valore ammissibile di `misMatchPercentage` che impedisce il salvataggio delle immagini con differenze

</Option>
### `diffPixelBoundingBoxProximity`

<Option type="number" default="5" required="no">

-   **Nota:** _Può essere utilizzata anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Rilevante solo quando [`createJsonReportFiles`](/docs/visual-testing/service-options#createjsonreportfiles) è abilitato._

La prossimità in pixel utilizzata per raggruppare i pixel di differenza nei report JSON. Valori più alti raggruppano più pixel in un numero minore di bounding box; valori più bassi producono box più precisi ma più numerosi.

</Option>