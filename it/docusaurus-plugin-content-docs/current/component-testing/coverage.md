---
id: coverage
title: Copertura
---

Il browser runner di WebdriverIO supporta il reporting della copertura del codice utilizzando [`istanbul`](https://istanbul.js.org/). Il testrunner strumenterà automaticamente il tuo codice e catturerà la copertura del codice per te.

## Configurazione

Per abilitare il reporting della copertura del codice, attivalo attraverso la configurazione del browser runner di WebdriverIO, ad esempio:

```js title=wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: process.env.WDIO_PRESET,
        coverage: {
            enabled: true
        }
    }],
    // ...
}
```

Controlla tutte le [opzioni di copertura](/docs/runner#coverage-options) per imparare come configurarla correttamente.

## Ignorare il Codice

Potrebbero esserci alcune sezioni del tuo codebase che desideri escludere intenzionalmente dal tracciamento della copertura, per farlo puoi utilizzare i seguenti suggerimenti di parsing:

- `/* istanbul ignore if */`: ignora la prossima istruzione if.
- `/* istanbul ignore else */`: ignora la porzione else di un'istruzione if.
- `/* istanbul ignore next */`: ignora la prossima cosa nel codice sorgente (funzioni, istruzioni if, classi, tutto ciò che vuoi).
- `/* istanbul ignore file */`: ignora un intero file sorgente (questo dovrebbe essere posizionato all'inizio del file).

:::info

Si consiglia di escludere i file di test dal reporting della copertura poiché potrebbero causare errori, ad esempio quando si chiamano i comandi `execute` o `executeAsync`. Se desideri mantenerli nel tuo report, assicurati di escludere la loro strumentazione tramite:

```ts
await browser.execute(/* istanbul ignore next */() => {
    // ...
})
```

:::