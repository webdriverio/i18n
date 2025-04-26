---
id: seleniumgrid
title: Selenium Grid
---

Sie können WebdriverIO mit Ihrer bestehenden Selenium Grid-Instanz verwenden. Um Ihre Tests mit Selenium Grid zu verbinden, müssen Sie lediglich die Optionen in Ihren Testrunner-Konfigurationen aktualisieren.

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
Sie müssen die entsprechenden Werte für Protokoll, Hostname, Port und Pfad basierend auf Ihrer Selenium Grid-Einrichtung angeben.
Wenn Sie Selenium Grid auf demselben Computer wie Ihre Testskripte ausführen, sind hier einige typische Optionen:

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

### Basis-Authentifizierung mit geschütztem Selenium Grid

Es wird dringend empfohlen, Ihr Selenium Grid zu sichern. Wenn Sie ein geschütztes Selenium Grid haben, das eine Authentifizierung erfordert, können Sie Authentifizierungs-Header über Optionen übergeben. 
Weitere Informationen finden Sie im Abschnitt [headers](https://webdriver.io/docs/configuration/#headers) in der Dokumentation.

### Timeout-Konfigurationen mit dynamischem Selenium Grid

Bei der Verwendung eines dynamischen Selenium Grids, bei dem Browser-Pods bei Bedarf gestartet werden, kann die Sitzungserstellung einen Kaltstart erfahren. In solchen Fällen wird empfohlen, die Timeouts für die Sitzungserstellung zu erhöhen. Der Standardwert in den Optionen beträgt 120 Sekunden, aber Sie können ihn erhöhen, wenn Ihr Grid mehr Zeit benötigt, um eine neue Sitzung zu erstellen.

```ts
connectionRetryTimeout: 180000,
```

### Erweiterte Konfigurationen

Für erweiterte Konfigurationen beachten Sie bitte die Testrunner [Konfigurationsdatei](https://webdriver.io/docs/configurationfile).

### Dateioperationen mit Selenium Grid

Wenn Sie Testfälle mit einem Remote-Selenium-Grid ausführen, läuft der Browser auf einem entfernten Computer, und Sie müssen besondere Vorsicht bei Testfällen walten lassen, die Datei-Uploads und -Downloads beinhalten.

### Datei-Downloads

Für Chromium-basierte Browser können Sie die [Download file](https://webdriver.io/docs/api/browser/downloadFile) Dokumentation konsultieren. Wenn Ihre Testskripte den Inhalt einer heruntergeladenen Datei lesen müssen, müssen Sie diese vom Remote-Selenium-Node auf den Testrunner-Computer herunterladen. Hier ist ein Beispiel-Codeausschnitt aus der Beispiel-`wdio.conf.ts`-Konfiguration für den Chrome-Browser:

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

### Datei-Upload mit Remote-Selenium-Grid

Um eine Datei in eine Web-App im Remote-Browser hochzuladen, müssen Sie zuerst die Datei zum Remote-Grid hochladen. Details finden Sie in der [uploadFile](https://webdriver.io/docs/api/browser/uploadFile) Dokumentation.

### Andere Datei-/Grid-Operationen

Es gibt noch einige weitere Operationen, die Sie mit Selenium Grid durchführen können. Die Anweisungen für Selenium Standalone sollten auch mit Selenium Grid gut funktionieren. Bitte beachten Sie die [Selenium Standalone](https://webdriver.io/docs/api/selenium/) Dokumentation für verfügbare Optionen.


### Offizielle Dokumentation zu Selenium Grid

Weitere Informationen zu Selenium Grid finden Sie in der offiziellen Selenium Grid [Dokumentation](https://www.selenium.dev/documentation/grid/).

Wenn Sie Selenium Grid in Docker, Docker Compose oder Kubernetes ausführen möchten, beachten Sie bitte das Selenium-Docker [GitHub-Repository](https://github.com/SeleniumHQ/docker-selenium).