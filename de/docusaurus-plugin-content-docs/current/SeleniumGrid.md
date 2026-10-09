---
id: seleniumgrid
title: Selenium Grid
description: "Verbinden Sie WebdriverIO-Tests mit einem bestehenden Selenium Grid, indem Sie Protokoll, Hostname, Port und Pfad in Ihrer Konfiguration festlegen."
---

Sie können WebdriverIO mit Ihrer bestehenden Selenium Grid-Instanz verwenden. Um Ihre Tests mit Selenium Grid zu verbinden, müssen Sie lediglich die Optionen in Ihrer Testrunner-Konfiguration anpassen.

Hier ist ein Codeausschnitt aus einer Beispiel-wdio.conf.ts.

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'https',
    hostname: 'yourseleniumgridhost.yourdomain.com',
    port: 443,
    path: '/wd/hub',
    // ...

}
```
Sie müssen die passenden Werte für Protokoll, Hostname, Port und Pfad entsprechend Ihrem Selenium Grid-Setup angeben.
Wenn Sie Selenium Grid auf demselben Rechner wie Ihre Testskripte ausführen, sind hier einige typische Optionen:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'http',
    hostname: 'localhost',
    port: 4444,
    path: '/wd/hub',
    // ...

}
```

### Basic-Authentifizierung mit geschütztem Selenium Grid

Es wird dringend empfohlen, Ihr Selenium Grid abzusichern. Wenn Sie ein geschütztes Selenium Grid haben, das eine Authentifizierung erfordert, können Sie Authentifizierungs-Header über die Optionen übergeben. 
Weitere Informationen finden Sie im Abschnitt [headers](https://webdriver.io/docs/configuration/#headers) der Dokumentation.

### Timeout-Konfigurationen mit dynamischem Selenium Grid

Bei Verwendung eines dynamischen Selenium Grids, bei dem Browser-Pods bei Bedarf gestartet werden, kann es bei der Sitzungserstellung zu einem Kaltstart kommen. In solchen Fällen empfiehlt es sich, die Timeouts für die Sitzungserstellung zu erhöhen. Der Standardwert in den Optionen beträgt 120 Sekunden, Sie können ihn jedoch erhöhen, wenn Ihr Grid mehr Zeit benötigt, um eine neue Sitzung zu erstellen. 

```ts
connectionRetryTimeout: 180000,
```

### Erweiterte Konfigurationen

Für erweiterte Konfigurationen lesen Sie bitte die Testrunner-[Konfigurationsdatei](https://webdriver.io/docs/configurationfile).

### Dateioperationen mit Selenium Grid

Wenn Sie Testfälle mit einem entfernten Selenium Grid ausführen, läuft der Browser auf einem entfernten Rechner, und Sie müssen bei Testfällen, die Datei-Uploads und -Downloads beinhalten, besonders sorgfältig vorgehen.

### Datei-Downloads

Für Chromium-basierte Browser können Sie die Dokumentation zu [Download file](https://webdriver.io/docs/api/browser/downloadFile) heranziehen. Wenn Ihre Testskripte den Inhalt einer heruntergeladenen Datei lesen müssen, müssen Sie diese vom entfernten Selenium-Node auf den Testrunner-Rechner herunterladen. Hier ist ein Beispiel-Codeausschnitt aus der Beispielkonfiguration `wdio.conf.ts` für den Chrome-Browser:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'https',
    hostname: 'yourseleniumgridhost.yourdomain.com',
    port: 443,
    path: '/wd/hub',
    // ...
    capabilities: [{
        browserName: 'chrome',
        'se:downloadsEnabled': true
    }],
    //...
}
```

### Datei-Upload mit entferntem Selenium Grid

[`element.setFiles()`](/docs/api/element/setFiles) setzt ein Datei-Eingabefeld über WebDriver BiDi. Die übergebenen Pfade werden vom Browser geöffnet und müssen daher auf dem Rechner existieren, auf dem der Browser läuft. WebdriverIO überträgt keine lokale Datei auf einen Selenium-Node.

```ts
await $('#file-upload').setFiles('/path/on/the/node/file.png')
```

Eine Testsuite, die `browser.uploadFile()` verwendet hat, um Bytes an den Node zu übertragen, muss die Datei an einem Ort ablegen, an dem der Browser sie lesen kann, und anschließend `setFiles` aufrufen. Der Selenium-Endpunkt [`file`](/docs/api/selenium#file) ist weiterhin als `browser.file()` für Chromedriver, Edgedriver und Selenium Grid verfügbar. Es handelt sich dabei nicht um einen WebDriver- oder WebDriver BiDi-Befehl.

### Weitere Datei-/Grid-Operationen

Es gibt noch einige weitere Operationen, die Sie mit Selenium Grid durchführen können. Die Anweisungen für Selenium Standalone sollten auch mit Selenium Grid problemlos funktionieren. Die verfügbaren Optionen finden Sie in der Dokumentation zu [Selenium Standalone](https://webdriver.io/docs/api/selenium/).


### Offizielle Selenium Grid-Dokumentation

Weitere Informationen zu Selenium Grid finden Sie in der offiziellen Selenium Grid-[Dokumentation](https://www.selenium.dev/documentation/grid/). 

Wenn Sie Selenium Grid in Docker, Docker Compose oder Kubernetes ausführen möchten, lesen Sie bitte das Selenium-Docker-[GitHub-Repository](https://github.com/SeleniumHQ/docker-selenium).