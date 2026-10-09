---
id: integrate-with-app-percy
title: Für mobile Anwendungen
description: "Integrieren Sie WebdriverIO-Tests für mobile Apps mit BrowserStack App Percy für visuelles Testen, beginnend mit dem Setzen Ihres PERCY_TOKEN."
---

## Integrieren Sie Ihre WebdriverIO-Tests mit App Percy

Vor der Integration können Sie sich das [Beispiel-Build-Tutorial von App Percy für WebdriverIO](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) ansehen.
Integrieren Sie Ihre Testsuite mit BrowserStack App Percy. Hier ist ein Überblick über die Integrationsschritte:

### Schritt 1: Neues App-Projekt im Percy-Dashboard erstellen

[Melden Sie sich](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) bei Percy an und [erstellen Sie ein neues Projekt vom Typ App](https://www.browserstack.com/docs/app-percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation). Nachdem Sie das Projekt erstellt haben, wird Ihnen eine `PERCY_TOKEN`-Umgebungsvariable angezeigt. Percy verwendet das `PERCY_TOKEN`, um zu wissen, in welche Organisation und welches Projekt die Screenshots hochgeladen werden sollen. Sie benötigen dieses `PERCY_TOKEN` in den nächsten Schritten.

### Schritt 2: Das Projekt-Token als Umgebungsvariable setzen

Führen Sie den folgenden Befehl aus, um PERCY_TOKEN als Umgebungsvariable zu setzen:

```sh
export PERCY_TOKEN="<your token here>"   // macOS oder Linux
$Env:PERCY_TOKEN="<your token here>"    // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### Schritt 3: Percy-Pakete installieren

Installieren Sie die Komponenten, die zum Einrichten der Integrationsumgebung für Ihre Testsuite erforderlich sind.
Um die Abhängigkeiten zu installieren, führen Sie den folgenden Befehl aus:

```sh
npm install --save-dev @percy/cli
```

### Schritt 4: Abhängigkeiten installieren

Installieren Sie die Percy Appium App

```sh
npm install --save-dev @percy/appium-app
```

### Schritt 5: Testskript aktualisieren
Stellen Sie sicher, dass Sie @percy/appium-app in Ihrem Code importieren.

Unten finden Sie einen Beispieltest, der die Funktion percyScreenshot verwendet. Verwenden Sie diese Funktion überall dort, wo Sie einen Screenshot aufnehmen müssen.

```sh
import percyScreenshot from '@percy/appium-app';
describe('Appium webdriverio test example', function() {
  it('takes a screenshot', async () => {
    await percyScreenshot('Appium JS example');
  });
});
```
Wir übergeben die erforderlichen Argumente an die Methode percyScreenshot.

Die Argumente der Screenshot-Methode sind:

```sh
percyScreenshot(driver, name[, options])
```
### Schritt 6: Testskript ausführen

Führen Sie Ihre Tests mit `percy app:exec` aus.

Wenn Sie den Befehl percy app:exec nicht verwenden können oder Ihre Tests lieber über die Ausführungsoptionen Ihrer IDE starten möchten, können Sie die Befehle percy app:exec:start und percy app:exec:stop verwenden. Weitere Informationen finden Sie unter [Run Percy](https://www.browserstack.com/docs/app-percy/references/commands/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

```sh
$ percy app:exec -- appium test command
```
Dieser Befehl startet Percy, erstellt einen neuen Percy-Build, nimmt Snapshots auf und lädt sie in Ihr Projekt hoch und beendet Percy anschließend:


```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Snapshot taken "Appium WebdriverIO Example"
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!
```

## Weitere Details finden Sie auf den folgenden Seiten:
- [Integrieren Sie Ihre WebdriverIO-Tests mit Percy](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Seite zu Umgebungsvariablen](https://www.browserstack.com/docs/app-percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Integration mit dem BrowserStack SDK](https://www.browserstack.com/docs/app-percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation), falls Sie BrowserStack Automate verwenden.


| Ressource                                                                                                                                                            | Beschreibung                       |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [Offizielle Dokumentation](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)             | WebdriverIO-Dokumentation von App Percy |
| [Beispiel-Build - Tutorial](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | WebdriverIO-Tutorial von App Percy      |
| [Offizielles Video](https://youtu.be/a4I_RGFdwvc/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                              | Visuelles Testen mit App Percy         |
| [Blog](https://www.browserstack.com/blog/product-launch-app-percy/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | Lernen Sie App Percy kennen: KI-gestützte Plattform für automatisiertes visuelles Testen nativer Apps    |