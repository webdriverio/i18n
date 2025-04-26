---
id: integrate-with-percy
title: Für Webanwendungen
---

## Integrieren Sie Ihre WebdriverIO-Tests mit Percy

Vor der Integration können Sie [Percys Tutorial für Beispiel-Builds mit WebdriverIO](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) erkunden.
Integrieren Sie Ihre WebdriverIO-automatisierten Tests mit BrowserStack Percy. Hier ist ein Überblick über die Integrationsschritte:

### Schritt 1: Erstellen Sie ein Percy-Projekt
[Melden Sie sich an](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) bei Percy. Erstellen Sie in Percy ein Projekt vom Typ Web und benennen Sie es. Nach der Erstellung generiert Percy ein Token. Notieren Sie es. Sie müssen es verwenden, um Ihre Umgebungsvariable im nächsten Schritt zu setzen.

Weitere Informationen zum Erstellen eines Projekts finden Sie unter [Ein Percy-Projekt erstellen](https://www.browserstack.com/docs/percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

### Schritt 2: Setzen Sie das Projekt-Token als Umgebungsvariable

Führen Sie den folgenden Befehl aus, um PERCY_TOKEN als Umgebungsvariable zu setzen:

```sh
export PERCY_TOKEN="<your token here>"   // macOS or Linux
$Env:PERCY_TOKEN="<your token here>"   // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### Schritt 3: Installieren Sie Percy-Abhängigkeiten

Installieren Sie die Komponenten, die für die Einrichtung der Integrationsumgebung für Ihre Testsuite erforderlich sind.

Um die Abhängigkeiten zu installieren, führen Sie den folgenden Befehl aus:

```sh
npm install --save-dev @percy/cli @percy/webdriverio
```

### Schritt 4: Aktualisieren Sie Ihr Testskript

Importieren Sie die Percy-Bibliothek, um die Methoden und Attribute zu verwenden, die für Screenshots benötigt werden.
Das folgende Beispiel verwendet die percySnapshot()-Funktion im asynchronen Modus:

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

Wenn Sie WebdriverIO im [Standalone-Modus](https://webdriver.io/docs/setuptypes.html/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) verwenden, übergeben Sie das Browser-Objekt als erstes Argument an die `percySnapshot`-Funktion:

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
// the browser object is required in standalone mode
percySnapshot(browser, 'WebdriverIO at DuckDuckGo');
await browser.deleteSession();
```
Die Argumente der Snapshot-Methode sind:

```sh
percySnapshot(name[, options])
```
### Standalone-Modus

```sh
percySnapshot(browser, name[, options])
```

- browser (erforderlich) - Das WebdriverIO-Browser-Objekt
- name (erforderlich) - Der Snapshot-Name; muss für jeden Snapshot eindeutig sein
- options - Siehe Konfigurationsoptionen pro Snapshot

Weitere Informationen finden Sie unter [Percy-Snapshot](https://www.browserstack.com/docs/percy/take-percy-snapshots/overview/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

### Schritt 5: Percy ausführen
Führen Sie Ihre Tests mit dem Befehl `percy exec` aus, wie unten gezeigt:

Wenn Sie den Befehl `percy:exec` nicht verwenden können oder Ihre Tests lieber mit IDE-Ausführungsoptionen ausführen möchten, können Sie die Befehle `percy:exec:start` und `percy:exec:stop` verwenden. Weitere Informationen finden Sie unter [Percy ausführen](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

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

## Besuchen Sie die folgenden Seiten für weitere Details:
- [Integrieren Sie Ihre WebdriverIO-Tests mit Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Seite zu Umgebungsvariablen](https://www.browserstack.com/docs/percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Integration mit BrowserStack SDK](https://www.browserstack.com/docs/percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation), wenn Sie BrowserStack Automate verwenden.


| Ressource                                                                                                                                                            | Beschreibung                       |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [Offizielle Dokumentation](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)             | Percys WebdriverIO-Dokumentation |
| [Beispiel-Build - Tutorial](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | Percys WebdriverIO-Tutorial      |
| [Offizielles Video](https://youtu.be/1Sr_h9_3MI0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                              | Visuelles Testen mit Percy         |
| [Blog](https://www.browserstack.com/blog/introducing-visual-reviews-2-0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | Einführung in Visual Reviews 2.0    |