---
id: integrate-with-app-percy
title: Per applicazioni mobili
description: "Integra i test di app mobili WebdriverIO con BrowserStack App Percy per il visual testing, iniziando con l'impostazione del tuo PERCY_TOKEN."
---

## Integra i tuoi test WebdriverIO con App Percy

Prima dell'integrazione, puoi esplorare il [tutorial della build di esempio di App Percy per WebdriverIO](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).
Integra la tua suite di test con BrowserStack App Percy; ecco una panoramica dei passaggi di integrazione:

### Passaggio 1: Crea un nuovo progetto app sulla dashboard di Percy

[Accedi](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) a Percy e [crea un nuovo progetto di tipo app](https://www.browserstack.com/docs/app-percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation). Dopo aver creato il progetto, ti verrà mostrata una variabile d'ambiente `PERCY_TOKEN`. Percy utilizzerà il `PERCY_TOKEN` per sapere in quale organizzazione e progetto caricare gli screenshot. Avrai bisogno di questo `PERCY_TOKEN` nei passaggi successivi.

### Passaggio 2: Imposta il token del progetto come variabile d'ambiente

Esegui il comando indicato per impostare PERCY_TOKEN come variabile d'ambiente:

```sh
export PERCY_TOKEN="<your token here>"   // macOS o Linux
$Env:PERCY_TOKEN="<your token here>"    // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### Passaggio 3: Installa i pacchetti Percy

Installa i componenti necessari per configurare l'ambiente di integrazione per la tua suite di test.
Per installare le dipendenze, esegui il seguente comando:

```sh
npm install --save-dev @percy/cli
```

### Passaggio 4: Installa le dipendenze

Installa l'app Percy Appium

```sh
npm install --save-dev @percy/appium-app
```

### Passaggio 5: Aggiorna lo script di test
Assicurati di importare @percy/appium-app nel tuo codice.

Di seguito è riportato un esempio di test che utilizza la funzione percyScreenshot. Usa questa funzione ovunque tu debba acquisire uno screenshot.

```sh
import percyScreenshot from '@percy/appium-app';
describe('Appium webdriverio test example', function() {
  it('takes a screenshot', async () => {
    await percyScreenshot('Appium JS example');
  });
});
```
Stiamo passando gli argomenti richiesti al metodo percyScreenshot.

Gli argomenti del metodo screenshot sono:

```sh
percyScreenshot(driver, name[, options])
```
### Passaggio 6: Esegui il tuo script di test

Esegui i tuoi test utilizzando `percy app:exec`.

Se non puoi utilizzare il comando percy app:exec o preferisci eseguire i test utilizzando le opzioni di esecuzione dell'IDE, puoi usare i comandi percy app:exec:start e percy app:exec:stop. Per saperne di più, visita [Run Percy](https://www.browserstack.com/docs/app-percy/references/commands/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

```sh
$ percy app:exec -- appium test command
```
Questo comando avvia Percy, crea una nuova build Percy, acquisisce gli snapshot e li carica nel tuo progetto, e arresta Percy:


```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Snapshot taken "Appium WebdriverIO Example"
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!
```

## Visita le seguenti pagine per maggiori dettagli:
- [Integra i tuoi test WebdriverIO con Percy](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Pagina delle variabili d'ambiente](https://www.browserstack.com/docs/app-percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Integra utilizzando BrowserStack SDK](https://www.browserstack.com/docs/app-percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) se utilizzi BrowserStack Automate.


| Risorsa                                                                                                                                                            | Descrizione                       |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [Documentazione ufficiale](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)             | Documentazione WebdriverIO di App Percy |
| [Build di esempio - Tutorial](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | Tutorial WebdriverIO di App Percy      |
| [Video ufficiale](https://youtu.be/a4I_RGFdwvc/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                              | Visual Testing con App Percy         |
| [Blog](https://www.browserstack.com/blog/product-launch-app-percy/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | Scopri App Percy: piattaforma di visual testing automatizzato basata sull'IA per app native    |