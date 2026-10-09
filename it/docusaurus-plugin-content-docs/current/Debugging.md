---
id: debugging
title: Debugging
description: "Esegui il debug dei test WebdriverIO con browser.debug, i breakpoint di VS Code o WebStorm, strategie per i test instabili e la profilazione di CPU e heap."
---

Il debugging è significativamente più difficile quando diversi processi generano dozzine di test in più browser.

<iframe width="560" height="315" src="https://www.youtube.com/embed/_bw_VWn5IzU" frameborder="0" allowFullScreen></iframe>

Per iniziare, è estremamente utile limitare il parallelismo impostando `maxInstances` a `1` e selezionando solo le spec e i browser di cui è necessario fare il debug.

In `wdio.conf`:

```js
export const config = {
    // ...
    maxInstances: 1,
    specs: [
        '**/myspec.spec.js'
    ],
    capabilities: [{
        browserName: 'firefox'
    }],
    // ...
}
```

## Il comando Debug

In molti casi, puoi usare [`browser.debug()`](/docs/api/browser/debug) per mettere in pausa il test e ispezionare il browser.

Anche l'interfaccia a riga di comando passerà in modalità REPL. Questa modalità ti permette di sperimentare con i comandi e gli elementi della pagina. In modalità REPL, puoi accedere all'oggetto `browser`&mdash;o alle funzioni `$` e `$$`&mdash;come nei tuoi test.

Quando usi `browser.debug()`, probabilmente dovrai aumentare il timeout del test runner per evitare che il test fallisca perché impiega troppo tempo. Ad esempio:

In `wdio.conf`:

```js
jasmineOpts: {
    defaultTimeoutInterval: (24 * 60 * 60 * 1000)
}
```

Consulta [timeouts](timeouts) per maggiori informazioni su come farlo utilizzando altri framework.

Per proseguire con i test dopo il debugging, nella shell usa la scorciatoia `^C` o il comando `.exit`.

### Pausa per un coding agent (`--debug=agent`)

`wdio run --debug=agent` aumenta il timeout del framework a 24 ore e mette in pausa il worker quando una spec chiama `await browser.debug()` o quando un test fallisce. L'esecuzione stampa una riga come:

```text
Paused in cart.e2e.ts › adds a blue t-shirt. Inspect with `wdio session -s debug-0-0 snapshot`, continue with `wdio session -s debug-0-0 resume`.
```

Ispeziona il browser in pausa con [`wdio session`](/docs/session/debug) (`snapshot`, `exec`, …), quindi usa `wdio session -s debug-0-0 resume` per continuare. `wdio session -s debug-0-0 close` fa fallire il test in pausa con `Session closed from wdio session`. Il nome della sessione è `debug-<cid>` (`debug-0-0` per il primo worker). Il resto di questo flusso di lavoro si trova nella sezione [WebdriverIO Session](/docs/session).
## Configurazione dinamica

Nota che `wdio.conf.js` può contenere Javascript. Dato che probabilmente non vuoi modificare in modo permanente il valore del timeout a 1 giorno, spesso può essere utile modificare queste impostazioni dalla riga di comando utilizzando una variabile d'ambiente.

Utilizzando questa tecnica, puoi modificare dinamicamente la configurazione:

```js
const debug = process.env.DEBUG
const defaultCapabilities = ...
const defaultTimeoutInterval = ...
const defaultSpecs = ...

export const config = {
    // ...
    maxInstances: debug ? 1 : 100,
    capabilities: debug ? [{ browserName: 'chrome' }] : defaultCapabilities,
    execArgv: debug ? ['--inspect'] : [],
    jasmineOpts: {
      defaultTimeoutInterval: debug ? (24 * 60 * 60 * 1000) : defaultTimeoutInterval
    }
    // ...
}
```

Puoi quindi anteporre il flag `debug` al comando `wdio`:

```
$ DEBUG=true npx wdio wdio.conf.js --spec ./tests/e2e/myspec.test.js
```

...e fare il debug del tuo file spec con i DevTools!

## Debugging con Visual Studio Code (VSCode)

Se vuoi eseguire il debug dei tuoi test con i breakpoint nell'ultima versione di VSCode, hai due opzioni per avviare il debugger, di cui l'opzione 1 è il metodo più semplice:
 1. collegare automaticamente il debugger
 2. collegare il debugger utilizzando un file di configurazione

### VSCode Toggle Auto Attach

Puoi collegare automaticamente il debugger seguendo questi passaggi in VSCode:
 - Premi CMD + Shift + P (Linux e Macos) o CTRL + Shift + P (Windows)
 - Digita "attach" nel campo di input
 - Seleziona "Debug: Toggle Auto Attach"
 - Seleziona "Only With Flag"

 Ecco fatto! Ora, quando esegui i tuoi test (ricorda che dovrai impostare il flag --inspect nella tua configurazione, come mostrato in precedenza), il debugger verrà avviato automaticamente e si fermerà al primo breakpoint che raggiunge.

### File di configurazione di VSCode

È possibile eseguire tutti i file spec o solo quelli selezionati. Le configurazioni di debug devono essere aggiunte a `.vscode/launch.json`; per eseguire il debug della spec selezionata aggiungi la seguente configurazione:
```
{
    "name": "run select spec",
    "type": "node",
    "request": "launch",
    "args": ["wdio.conf.js", "--spec", "${file}"],
    "cwd": "${workspaceFolder}",
    "autoAttachChildProcesses": true,
    "program": "${workspaceRoot}/node_modules/@wdio/cli/bin/wdio.js",
    "console": "integratedTerminal",
    "skipFiles": [
        "${workspaceFolder}/node_modules/**/*.js",
        "${workspaceFolder}/lib/**/*.js",
        "<node_internals>/**/*.js"
    ]
},
```

Per eseguire tutti i file spec rimuovi `"--spec", "${file}"` da `"args"`

Esempio: [.vscode/launch.json](https://github.com/mgrybyk/webdriverio-devtools/blob/master/.vscode/launch.json)

Informazioni aggiuntive: https://code.visualstudio.com/docs/nodejs/nodejs-debugging

## Repl dinamico con Atom

Se sei un hacker di [Atom](https://atom.io/) puoi provare [`wdio-repl`](https://github.com/kurtharriger/wdio-repl) di [@kurtharriger](https://github.com/kurtharriger), un repl dinamico che ti permette di eseguire singole righe di codice in Atom. Guarda [questo](https://www.youtube.com/watch?v=kdM05ChhLQE) video su YouTube per vedere una demo.

## Debugging con WebStorm / Intellij
Puoi creare una configurazione di debug node.js come questa:
![Screenshot from 2021-05-29 17-33-33](https://user-images.githubusercontent.com/18728354/120088460-81844c00-c0a5-11eb-916b-50f21c8472a8.png)
Guarda questo [video su YouTube](https://www.youtube.com/watch?v=Qcqnmle6Wu8) per maggiori informazioni su come creare una configurazione.

## Debugging dei test instabili

I test instabili (flaky) possono essere davvero difficili da debuggare, quindi ecco alcuni suggerimenti su come provare a riprodurre localmente il risultato instabile ottenuto nella tua CI.

### Rete
Per eseguire il debug dell'instabilità legata alla rete usa il comando [throttleNetwork](https://webdriver.io/docs/api/browser/throttleNetwork).
```js
await browser.throttleNetwork('Regular3G')
```

### Velocità di rendering
Per eseguire il debug dell'instabilità legata alla velocità del dispositivo usa il comando [throttleCPU](https://webdriver.io/docs/api/browser/throttleCPU).
Questo farà sì che le tue pagine vengano renderizzate più lentamente, cosa che può essere causata da molti fattori, come l'esecuzione di più processi nella tua CI che potrebbero rallentare i tuoi test.
```js
await browser.throttleCPU(4)
```

### Velocità di esecuzione dei test

Se i tuoi test non sembrano esserne influenzati, è possibile che WebdriverIO sia più veloce dell'aggiornamento del framework frontend / browser. Questo accade quando si usano asserzioni sincrone, poiché WebdriverIO non ha più la possibilità di ritentare queste asserzioni. Alcuni esempi di codice che può fallire per questo motivo:
```js
expect(elementList.length).toEqual(7) // la lista potrebbe non essere ancora popolata al momento dell'asserzione
expect(await elem.getText()).toEqual('this button was clicked 3 times') // il testo potrebbe non essere ancora aggiornato al momento dell'asserzione, causando un errore ("this button was clicked 2 times" non corrisponde al valore atteso "this button was clicked 3 times")
expect(await elem.isDisplayed()).toBe(true) // potrebbe non essere ancora visualizzato
```
Per risolvere questo problema, è necessario utilizzare invece asserzioni asincrone. Gli esempi precedenti diventerebbero così:
```js
await expect(elementList).toBeElementsArrayOfSize(7)
await expect(elem).toHaveText('this button was clicked 3 times')
await expect(elem).toBeDisplayed()
```
Utilizzando queste asserzioni, WebdriverIO attenderà automaticamente finché la condizione non sarà soddisfatta. Nel caso di asserzioni sul testo, ciò significa che l'elemento deve esistere e il testo deve essere uguale al valore atteso.
Ne parliamo più approfonditamente nella nostra [Guida alle Best Practice](https://webdriver.io/docs/bestpractices#use-the-built-in-assertions).

## Profilazione delle prestazioni

WebdriverIO ti permette di acquisire profili di prestazioni dei tuoi test per identificare colli di bottiglia nell'esecuzione dei test o memory leak. Questa funzionalità utilizza le capacità di profilazione native di Node.js.

### Profilazione della CPU

Per acquisire un profilo della CPU, puoi usare il flag CLI `--cpu-prof` oppure impostare `cpuProf: true` nella tua configurazione.

```bash
npx wdio run wdio.conf.js --cpu-prof
```

Questo genererà un file `.cpuprofile` nella directory `./profiles` (predefinita) per ogni processo worker. Puoi caricare questo file in **Chrome DevTools > Performance > Load Profile** per analizzare l'esecuzione.

### Profilazione dell'heap

Per acquisire un profilo dell'heap, usa il flag CLI `--heap-prof` oppure imposta `heapProf: true` nella tua configurazione.

```bash
npx wdio run wdio.conf.js --heap-prof
```

Questo genera un file `.heapprofile` nella directory `./profiles` (utilizza il sampling heap profiler). Puoi caricarlo in **Chrome DevTools > Memory > Load** per analizzare l'utilizzo della memoria.

### Metriche di tempo

Quando la profilazione è abilitata, WebdriverIO registra automaticamente anche le metriche di tempo per le fasi di setup, esecuzione e teardown del tuo test, aiutandoti a capire dove viene impiegato il tempo.

```
📊 Performance Metrics:
────────────────────────────────────────
  Setup:     1.25s
  Execution: 3.42s
  Teardown:  0.15s
```