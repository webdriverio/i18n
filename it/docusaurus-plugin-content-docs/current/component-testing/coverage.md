---
id: coverage
title: Copertura
description: "Raccogli la copertura del codice per i test dei componenti con il browser runner, che strumenta il tuo codice con istanbul tramite Vite."
---

Il browser runner di WebdriverIO supporta la generazione di report sulla copertura del codice utilizzando [`istanbul`](https://istanbul.js.org/). Il testrunner strumenterà automaticamente il tuo codice utilizzando Vite e raccoglierà la copertura del codice per te.

## Come Funziona

Il `@wdio/browser-runner` utilizza Vite per servire la tua applicazione. Quando abiliti la copertura, aggiunge un plugin al server Vite che tenta di strumentare il tuo codice sorgente al volo, man mano che viene richiesto dal browser.

:::warning Importante
**Non allontanarti dal test runner!**

La copertura del codice si basa sui file serviti e strumentati dal server Vite locale avviato da WebdriverIO.
Se utilizzi `browser.url('http://...')` o `browser.url('file://...')` per navigare verso una pagina diversa, stai abbandonando l'ambiente strumentato. Il tuo codice verrà eseguito, ma **non verrà raccolta alcuna copertura**.

**Approccio Corretto (Component Testing):**
Esegui il rendering del tuo componente o importa il tuo modulo direttamente nel file di test.

```js
import { myFunction } from '../src/utils.js'

it('should cover my function', () => {
    myFunction() // Questo è coperto
})
```

**Approccio Errato (Stile E2E):**
```js
it('will not have coverage', async () => {
    // ❌ navigare altrove interrompe la strumentazione
    await browser.url('http://localhost:3000')
})
```
:::

## Configurazione

Per abilitare la generazione di report sulla copertura del codice, abilitala tramite la configurazione del browser runner di WebdriverIO, ad esempio:

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

Consulta tutte le [opzioni di copertura](/docs/runner#coverage-options) per imparare come configurarla correttamente.

:::tip Suggerimenti di Configurazione
Se stai testando file non standard (come script inline in file `.html`) o se i tuoi file non vengono rilevati, potrebbe essere necessario verificare esplicitamente le opzioni `include` ed `extension`:

```js
coverage: {
    enabled: true,
    // Indica esplicitamente i tuoi file sorgente se la risoluzione predefinita non funziona
    include: ['src/**/*.js', 'src/**/*.vue'],
    // Aggiungi .html se hai script inline
    extension: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.html']
}
```
:::

## Ignorare il Codice

Potrebbero esserci alcune sezioni del tuo codebase che desideri escludere intenzionalmente dal monitoraggio della copertura; per farlo puoi utilizzare i seguenti suggerimenti di parsing:

- `/* istanbul ignore if */`: ignora la successiva istruzione if.
- `/* istanbul ignore else */`: ignora la parte else di un'istruzione if.
- `/* istanbul ignore next */`: ignora l'elemento successivo nel codice sorgente (funzioni, istruzioni if, classi, e così via).
- `/* istanbul ignore file */`: ignora un intero file sorgente (questo dovrebbe essere posizionato all'inizio del file).

:::info

Si consiglia di escludere i file di test dal report sulla copertura, poiché potrebbero causare errori, ad esempio quando si chiama il comando `execute`. Se desideri mantenerli nel tuo report, assicurati di escluderli dalla strumentazione tramite:

```ts
await browser.execute(/* istanbul ignore next */() => {
    // ...
})
```

:::