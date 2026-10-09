---
id: compare-options
title: Opzioni di confronto
description: "Regola il modo in cui vengono confrontati gli screenshot con le opzioni di sensibilità visiva, pixelmatch, oscuramento per dispositivi mobili e reporting per il servizio visual."
---

Le opzioni di confronto sono opzioni che influenzano il modo in cui viene eseguito il confronto.

:::info NOTA
Tutte le opzioni di confronto possono essere utilizzate durante l'istanziazione del servizio o per ogni singolo `checkElement`, `checkScreen` e `checkFullPageScreen`. Se un'opzione del metodo ha la stessa chiave di un'opzione impostata durante l'istanziazione del servizio, l'opzione di confronto del metodo sovrascriverà il valore dell'opzione di confronto del servizio.
:::

## Sensibilità visiva

---

:::info Cronologia delle versioni per le opzioni `ignore*`
I preset `ignore*` hanno cambiato comportamento una volta, come breaking change, quando il motore di confronto è passato da ResembleJS a Pixelmatch:

| Versione | Motore | Note |
| --- | --- | --- |
| v9 e precedenti | ResembleJS | Semantica originale di `ignore*` (basata su RGB/luminosità, con l'ordinamento dei preset proprio di resemble). |
| v10 e successive | Pixelmatch | I preset `ignore*` corrispondono alle impostazioni di soglia/AA di pixelmatch. I valori predefiniti e il comportamento attuali sono documentati per ogni opzione qui sotto; le nuove funzionalità/correzioni successive sono segnalate con una nota "Da" sull'opzione pertinente. |

:::

**Ordinamento "vince l'ultimo":** quando più flag `ignore*` sono abilitati contemporaneamente, viene effettivamente applicato un solo preset, secondo questo ordine (vince l'ultimo): `ignoreAlpha` → `ignoreAntialiasing` → `ignoreColors` → `ignoreLess` → `ignoreNothing`. Viene registrato un avviso che indica quale preset ha prevalso.

### `ignoreColors`

<Option type="boolean" default="false" required="no">

-   **Nota:** _Può essere usata anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin_
-   **Da:** `v10.1.0`: confronto basato solo sulla luminosità usando i pesi di luma di resemble (`0.3/0.59/0.11`).

Confronta solo la luminosità, ignorando le differenze di tonalità/colore. Preset: soglia rigorosa (~16/255), anti-aliasing non tollerato.

**Usala quando** è previsto che il colore stesso vari (ad es. UI con temi, immagini che cambiano colore a seconda dell'ambiente) ma si vogliono comunque rilevare cambiamenti di layout o di luminosità.

</Option>
### `ignoreAlpha`

<Option type="boolean" default="false" required="no">

-   **Nota:** _Può essere usata anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin_
-   **Da:** `v10.1.0`: applica la propria regola di soglia/AA indipendentemente dagli altri flag `ignore*`.

Confronta le immagini ignorando le differenze del canale alfa. Preset: soglia rigorosa (~16/255), anti-aliasing non tollerato.

**Usala quando** il rendering di trasparenza/opacità è instabile (ad es. overlay, elementi semitrasparenti) ma i colori effettivi dei pixel sottostanti sono importanti.

</Option>
### `ignoreAntialiasing`

<Option type="boolean" default="true" required="no">

-   **Nota:** _Può essere usata anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin_
-   **Da:** `v10`: il valore predefinito è cambiato in `true` (era `false` nella v9 e precedenti).

Tollera i pixel con anti-aliasing durante il confronto (soglia rilassata ~32/255). È l'unico preset che tollera l'anti-aliasing ed è abilitato di default, in modo che il rumore del rendering sub-pixel non faccia fallire i confronti fin da subito. Impostalo su `false` per un confronto rigoroso in cui i pixel con anti-aliasing devono essere conteggiati come discrepanze.

**Usala per** risolvere la causa più comune di instabilità nei test visivi: bordi di testo e forme renderizzati con un anti-aliasing leggermente diverso tra macchine/browser anche se in realtà non è cambiato nulla.

</Option>
### `ignoreLess`

<Option type="boolean" default="false" required="no">

-   **Nota:** _Può essere usata anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin_
-   **Da:** `v10.1.0`: applica la propria regola di soglia/AA indipendentemente dagli altri flag `ignore*`.

Confronta le immagini usando una tolleranza RGB rilassata (~16/255 per canale nello spazio YIQ). Preset: soglia rigorosa, anti-aliasing non tollerato.

**Usala quando** si desidera un po' di margine per piccoli disturbi di rendering (artefatti di compressione tipo JPEG, leggeri arrotondamenti di colore) senza tollerare l'anti-aliasing.

</Option>
### `ignoreNothing`

<Option type="boolean" default="false" required="no">

-   **Nota:** _Può essere usata anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin_
-   **Da:** `v10.1.0`: applica la propria regola di soglia/AA indipendentemente dagli altri flag `ignore*`.

Usa tolleranza zero: qualsiasi differenza di pixel viene conteggiata come discrepanza, incluso l'anti-aliasing.

**Usala quando** serve la prova al pixel che non sia cambiato assolutamente nulla, ad es. per verificare che una correzione non abbia introdotto alcuna regressione, per quanto piccola.

</Option>
### `scaleImagesToSameSize`

<Option type="boolean" default="false" required="no">

-   **Nota:** _Può essere usata anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin_

Ridimensiona 2 immagini alla stessa dimensione prima di eseguire il confronto. Si consiglia vivamente di abilitare `ignoreAntialiasing` e `ignoreAlpha`

</Option>
## Controllo diretto di pixelmatch

---

:::info Aggiunto nella v10.1.0
`compareOptions.pixelmatch` non ha un equivalente nella v9 (ResembleJS). È un modo completamente nuovo per controllare direttamente il motore di confronto, invece di usare un preset `ignore*`.
:::

### `compareOptions.pixelmatch`

<Option type="object" default="undefined" required="no">

-   **Nota:** _Può essere usata anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin per quel metodo specifico_
-   **Aggiunto in:** `v10.1.0`

Passa le impostazioni direttamente a [pixelmatch](https://github.com/mapbox/pixelmatch) invece di usare un preset `ignore*`. **Usala quando i cinque preset `ignore*` sono troppo approssimativi:** ti serve un valore di soglia specifico che i preset non offrono, oppure un'immagine diff realmente leggibile nei tuoi report/output CI invece dell'evidenziazione magenta predefinita.

:::warning Mutuamente esclusive all'interno dello stesso oggetto di opzioni
Inserire una qualsiasi chiave `ignore*` e `pixelmatch` nello **stesso** oggetto di opzioni genera `CompareOptionsConflictError`, anche quando il valore di `ignore*` è `false` (vedi l'esempio non valido qui sotto). Scegli una modalità per oggetto: preset `ignore*` oppure `pixelmatch`, mai entrambi.

Questo vale solo all'interno di un singolo oggetto. La configurazione del servizio e le opzioni di una chiamata di metodo sono oggetti separati, quindi una chiamata `check*` **può** usare una modalità diversa da quella della configurazione del servizio, ad esempio il servizio usa i preset `ignore*` ma una chiamata passa invece `pixelmatch` (o viceversa). In tal caso non viene generato alcun errore, ma solo un avviso registrato che segnala il cambio di modalità di confronto.
:::

| Campo | Tipo | Predefinito | A cosa serve |
| --- | --- | --- | --- |
| `threshold` | `number` | `0.1` | Sensibilità da 0 (qualsiasi differenza di pixel fallisce) a 1 (quasi nulla fallisce). Usalo per impostare un valore di sensibilità esatto invece di scegliere il preset `ignore*` più vicino. |
| `includeAA` | `boolean` | `false` | `true` conteggia i pixel dei bordi con anti-aliasing come discrepanze; `false` li tollera. Disattivalo se le differenze di rendering dei bordi di font/forme causano fallimenti instabili. |
| `diffColor` | `[number, number, number]` | `[255, 0, 255]` (magenta) | Colore RGB per i pixel discordanti nell'immagine diff. Cambialo se il magenta si confonde con la tua UI (ad es. un tema rosa/viola) e le discrepanze sono difficili da individuare. |
| `aaColor` | `[number, number, number]` | `[255, 0, 255]` (magenta) | Colore RGB per i pixel con anti-aliasing, mantenuto visivamente separato dalle discrepanze reali così da distinguere a colpo d'occhio il "rumore di rendering" da un "bug reale". |
| `diffColorAlt` | `[number, number, number]` | `[255, 0, 255]` (magenta) | Colore RGB per i pixel aggiunti o rimossi (non solo ricolorati), utile per distinguere gli spostamenti di layout dai cambiamenti di colore. |
| `alpha` | `number` | `0.1` | Opacità dell'overlay diff sopra lo screenshot effettivo. Aumentalo per rendere le differenze più evidenti nei report; diminuiscilo per continuare a vedere chiaramente la UI sottostante. Non è correlato al preset `ignoreAlpha`. |
| `diffMask` | `boolean` | `false` | Imposta `true` per generare solo il diff grezzo (sfondo trasparente) invece del diff disegnato sopra lo screenshot, utile per creare un visualizzatore/report diff personalizzato. |
| `checkerboard` | `boolean` | `true` | Controlla come vengono renderizzati i pixel semitrasparenti nel diff. Disattivalo se il motivo a scacchiera è facile da confondere con il contenuto reale dei tuoi screenshot. |

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

**Override del metodo quando il servizio usa i preset `ignore*`:**

```js
await browser.checkScreen('homepage', {
    pixelmatch: { threshold: 0.05 },
})
```

**Override del metodo quando il servizio usa `pixelmatch`:**

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
## Oscuramenti per dispositivi mobili

---

### `blockOutStatusBar`

<Option type="boolean" default="true" required="no">

-   **Nota:** _Può essere usata anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin. Questa opzione è **solo per dispositivi mobili**_

Oscura automaticamente la barra di stato e la barra degli indirizzi durante i confronti. Questo evita fallimenti dovuti a ora, wifi o stato della batteria.

</Option>
### `blockOutToolBar`

<Option type="boolean" default="true" required="no">

-   **Nota:** _Può essere usata anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin. Questa opzione è **solo per dispositivi mobili**_

Oscura automaticamente la barra degli strumenti.

</Option>
### `blockOutSideBar`

<Option type="boolean" default="true" required="no">

-   **Nota:** _Può essere usata solo per `checkScreen()`. Sovrascriverà l'impostazione del plugin. Questa opzione è **solo per iPad**_

Oscura automaticamente la barra laterale degli iPad in modalità orizzontale durante i confronti. Questo evita fallimenti dovuti al componente nativo schede/privata/segnalibri.

</Option>
## Risultati e reporting

---

### `rawMisMatchPercentage`

<Option type="boolean" default="false" required="no">

-   **Nota:** _Può essere usata anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin_

Se true, la percentuale restituita sarà del tipo `0.12345678`, il valore predefinito è `0.12`

</Option>
### `returnAllCompareData`

<Option type="boolean" default="false" required="no">

-   **Nota:** _Può essere usata anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin_

Restituisce tutti i dati del confronto, non solo la percentuale di discrepanza

</Option>
### `saveAboveTolerance`

<Option type="number" default="0" required="no">

-   **Nota:** _Può essere usata anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin_

Valore consentito di `misMatchPercentage` che impedisce il salvataggio delle immagini con differenze

</Option>
### `diffPixelBoundingBoxProximity`

<Option type="number" default="5" required="no">

-   **Nota:** _Può essere usata anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Rilevante solo quando [`createJsonReportFiles`](/docs/visual-testing/service-options#createjsonreportfiles) è abilitato._

La prossimità in pixel usata per raggruppare i pixel diff nei report JSON. Valori più alti raggruppano più pixel in un numero minore di bounding box; valori più bassi producono box più precisi ma più numerosi.

</Option>