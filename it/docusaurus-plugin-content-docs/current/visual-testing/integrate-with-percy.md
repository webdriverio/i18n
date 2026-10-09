---
id: integrate-with-percy
title: Per Applicazioni Web
description: "Integra i test WebdriverIO per applicazioni web con BrowserStack Percy per il visual testing, dalla creazione di un progetto all'esecuzione delle build."
---

## Integra i tuoi test WebdriverIO con Percy

Prima dell'integrazione, puoi esplorare il [tutorial di build di esempio di Percy per WebdriverIO](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).
Integra i tuoi test automatizzati WebdriverIO con BrowserStack Percy. Ecco una panoramica dei passaggi di integrazione:

### Passaggio 1: Crea un progetto Percy
[Accedi](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) a Percy. In Percy, crea un progetto di tipo Web e assegnagli un nome. Dopo la creazione del progetto, Percy genera un token. Prendine nota. Dovrai usarlo per impostare la variabile d'ambiente nel passaggio successivo.

Per i dettagli sulla creazione di un progetto, consulta [Creare un progetto Percy](https://www.browserstack.com/docs/percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

### Passaggio 2: Imposta il token del progetto come variabile d'ambiente

Esegui il comando indicato per impostare PERCY_TOKEN come variabile d'ambiente:

```sh
export PERCY_TOKEN="<your token here>"   // macOS o Linux
$Env:PERCY_TOKEN="<your token here>"   // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### Passaggio 3: Installa le dipendenze di Percy

Installa i componenti necessari per configurare l'ambiente di integrazione per la tua suite di test.

Per installare le dipendenze, esegui il seguente comando:

```sh
npm install --save-dev @percy/cli @percy/webdriverio
```

### Passaggio 4: Aggiorna il tuo script di test

Importa la libreria Percy per utilizzare il metodo e gli attributi necessari per acquisire gli screenshot.
L'esempio seguente utilizza la funzione percySnapshot() in modalità async:

```sh
import percySnapshot from '@percy/webdriverio';
describe('webdriver.io page', () => {
  it('should have the right title', async () => {
    await browser.url('https://webdriver.io');
    await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js');
    await percySnapshot('webdriver.io page');
  });
});
```

Quando usi WebdriverIO in [modalità standalone](https://webdriver.io/docs/setuptypes.html/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation), passa l'oggetto browser come primo argomento alla funzione `percySnapshot`:

```sh
import { remote } from 'webdriverio'

import percySnapshot from '@percy/webdriverio';

const browser = await remote({
  logLevel: 'trace',
  capabilities: {
    browserName: 'chrome'
  }
});

await browser.url('https://duckduckgo.com');
const inputElem = await browser.$('#search_form_input_homepage');
await inputElem.setValue('WebdriverIO');
const submitBtn = await browser.$('#search_button_homepage');
await submitBtn.click();
// l'oggetto browser è obbligatorio in modalità standalone
percySnapshot(browser, 'WebdriverIO at DuckDuckGo');
await browser.deleteSession();
```
Gli argomenti del metodo snapshot sono:

```sh
percySnapshot(name[, options])
```
### Modalità standalone

```sh
percySnapshot(browser, name[, options])
```

- browser (obbligatorio) - L'oggetto browser di WebdriverIO
- name (obbligatorio) - Il nome dello snapshot; deve essere univoco per ogni snapshot
- options - Vedi le opzioni di configurazione per singolo snapshot

Per saperne di più, consulta [Percy snapshot](https://www.browserstack.com/docs/percy/take-percy-snapshots/overview/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

### Passaggio 5: Esegui Percy
Esegui i tuoi test utilizzando il comando `percy exec` come mostrato di seguito:

Se non puoi utilizzare il comando `percy:exec` o preferisci eseguire i test tramite le opzioni di esecuzione dell'IDE, puoi usare i comandi `percy:exec:start` e `percy:exec:stop`. Per saperne di più, visita [Eseguire Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

```sh
percy exec -- wdio wdio.conf.js
```

```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Running "wdio wdio.conf.js"
...
[...] webdriver.io page
[percy] Snapshot taken "webdriver.io page"
[...]    ✓ should have the right title
...
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!

```

## Visita le seguenti pagine per maggiori dettagli:
- [Integra i tuoi test WebdriverIO con Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Pagina delle variabili d'ambiente](https://www.browserstack.com/docs/percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Integrazione tramite BrowserStack SDK](https://www.browserstack.com/docs/percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) se utilizzi BrowserStack Automate.


| Risorsa                                                                                                                                                             | Descrizione                       |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [Documentazione ufficiale](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)  | Documentazione WebdriverIO di Percy |
| [Build di esempio - Tutorial](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | Tutorial WebdriverIO di Percy  |
| [Video ufficiale](https://youtu.be/1Sr_h9_3MI0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                             | Visual Testing con Percy          |
| [Blog](https://www.browserstack.com/blog/introducing-visual-reviews-2-0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | Presentazione di Visual Reviews 2.0 |