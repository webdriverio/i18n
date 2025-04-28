---
id: debugging
title: Debugging
---

Debugging è significativamente più difficile quando diversi processi generano decine di test in più browser.

<iframe width="560" height="315" src="https://www.youtube.com/embed/_bw_VWn5IzU" frameborder="0" allowFullScreen></iframe>

Per iniziare, è estremamente utile limitare il parallelismo impostando `maxInstances` a `1`, e mirando solo a quelle specifiche e browser che devono essere debuggati.

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

## Il Comando Debug

In molti casi, puoi usare [`browser.debug()`](/docs/api/browser/debug) per mettere in pausa il tuo test e ispezionare il browser.

La tua interfaccia a riga di comando passerà anche alla modalità REPL. Questa modalità ti permette di giocare con i comandi e gli elementi sulla pagina. In modalità REPL, puoi accedere all'oggetto `browser`&mdash;o alle funzioni `$` e `$$`&mdash;come puoi fare nei tuoi test.

Quando usi `browser.debug()`, probabilmente dovrai aumentare il timeout del test runner per evitare che il test fallisca perché ci mette troppo tempo. Per esempio:

In `wdio.conf`:

```js
jasmineOpts: {
    defaultTimeoutInterval: (24 * 60 * 60 * 1000)
}
```

Vedi [timeouts](timeouts) per maggiori informazioni su come farlo usando altri framework.

Per procedere con i test dopo il debugging, nella shell usa la scorciatoia `^C` o il comando `.exit`.
## Configurazione dinamica

Nota che `wdio.conf.js` può contenere Javascript. Poiché probabilmente non vuoi cambiare permanentemente il tuo valore di timeout a 1 giorno, può essere spesso utile cambiare queste impostazioni dalla riga di comando usando una variabile d'ambiente.

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

Puoi quindi prefissare il comando `wdio` con il flag `debug`:

```
$ DEBUG=true npx wdio wdio.conf.js --spec ./tests/e2e/myspec.test.js
```

...e debuggare il tuo file spec con DevTools!

## Debugging con Visual Studio Code (VSCode)

Se vuoi debuggare i tuoi test con breakpoint nell'ultima versione di VSCode, hai due opzioni per avviare il debugger, di cui l'opzione 1 è il metodo più semplice:
 1. collegare automaticamente il debugger
 2. collegare il debugger utilizzando un file di configurazione

### VSCode Toggle Auto Attach

Puoi collegare automaticamente il debugger seguendo questi passaggi in VSCode:
 - Premi CMD + Shift + P (Linux e Macos) o CTRL + Shift + P (Windows)
 - Digita "attach" nel campo di input
 - Seleziona "Debug: Toggle Auto Attach"
 - Seleziona "Only With Flag"

 Ecco fatto! Ora quando esegui i tuoi test (ricorda che avrai bisogno del flag --inspect impostato nella tua configurazione come mostrato in precedenza) avvierà automaticamente il debugger e si fermerà al primo breakpoint che raggiunge.

### File di configurazione VSCode

È possibile eseguire tutti o file spec selezionati. Le configurazioni di debug devono essere aggiunte a `.vscode/launch.json`, per eseguire il debug di una spec selezionata aggiungi la seguente configurazione:
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

Se sei un hacker di [Atom](https://atom.io/), puoi provare [`wdio-repl`](https://github.com/kurtharriger/wdio-repl) di [@kurtharriger](https://github.com/kurtharriger), che è un repl dinamico che ti consente di eseguire singole linee di codice in Atom. Guarda [questo](https://www.youtube.com/watch?v=kdM05ChhLQE) video di YouTube per vedere una dimostrazione.

## Debugging con WebStorm / Intellij
Puoi creare una configurazione di debug node.js come questa:
![Screenshot from 2021-05-29 17-33-33](https://user-images.githubusercontent.com/18728354/120088460-81844c00-c0a5-11eb-916b-50f21c8472a8.png)
Guarda questo [Video YouTube](https://www.youtube.com/watch?v=Qcqnmle6Wu8) per maggiori informazioni su come creare una configurazione.

## Debugging di test instabili

I test instabili possono essere davvero difficili da debuggare, quindi ecco alcuni suggerimenti su come puoi provare a riprodurre localmente quel risultato instabile che hai ottenuto nel tuo CI.

### Rete
Per il debugging di problemi di instabilità legati alla rete, usa il comando [throttleNetwork](https://webdriver.io/docs/api/browser/throttleNetwork).
```js
await browser.throttleNetwork('Regular3G')
```

### Velocità di rendering
Per il debugging di problemi di instabilità legati alla velocità del dispositivo, usa il comando [throttleCPU](https://webdriver.io/docs/api/browser/throttleCPU).
Questo farà sì che le tue pagine vengano visualizzate più lentamente, cosa che può essere causata da molti fattori come l'esecuzione di più processi nel tuo CI che potrebbero rallentare i tuoi test.
```js
await browser.throttleCPU(4)
```

### Velocità di esecuzione dei test

Se i tuoi test non sembrano essere influenzati, è possibile che WebdriverIO sia più veloce dell'aggiornamento del framework frontend / browser. Questo accade quando si utilizzano asserzioni sincrone poiché WebdriverIO non ha più la possibilità di riprovare queste asserzioni. Alcuni esempi di codice che può rompersi a causa di questo:
```js
expect(elementList.length).toEqual(7) // la lista potrebbe non essere popolata al momento dell'asserzione
expect(await elem.getText()).toEqual('this button was clicked 3 times') // il testo potrebbe non essere ancora aggiornato al momento dell'asserzione, risultando in un errore ("this button was clicked 2 times" non corrisponde all'atteso "this button was clicked 3 times")
expect(await elem.isDisplayed()).toBe(true) // potrebbe non essere ancora visualizzato
```
Per risolvere questo problema, dovrebbero essere utilizzate asserzioni asincrone. Gli esempi sopra sarebbero così:
```js
await expect(elementList).toBeElementsArrayOfSize(7)
await expect(elem).toHaveText('this button was clicked 3 times')
await expect(elem).toBeDisplayed()
```
Usando queste asserzioni, WebdriverIO attenderà automaticamente finché la condizione non corrisponde. Quando si afferma un testo, ciò significa che l'elemento deve esistere e il testo deve essere uguale al valore atteso.
Parliamo di più di questo nella nostra [Guida alle Best Practices](https://webdriver.io/docs/bestpractices#use-the-built-in-assertions).