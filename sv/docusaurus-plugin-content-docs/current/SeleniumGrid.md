---
id: seleniumgrid
title: Selenium Grid
---

Du kan använda WebdriverIO med din befintliga Selenium Grid-instans. För att ansluta dina tester till Selenium Grid behöver du bara uppdatera alternativen i dina testrunner-konfigurationer.

Här är ett kodavsnitt från exempel wdio.conf.ts.

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
Du behöver ange lämpliga värden för protokoll, värdnamn, port och sökväg baserat på din Selenium Grid-konfiguration.
Om du kör Selenium Grid på samma maskin som dina testskript, här är några typiska alternativ:

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

### Grundläggande autentisering med skyddad Selenium Grid

Det rekommenderas starkt att säkra din Selenium Grid. Om du har en skyddad Selenium Grid som kräver autentisering kan du skicka autentiseringshuvuden via alternativ.
Se avsnittet [headers](https://webdriver.io/docs/configuration/#headers) i dokumentationen för mer information.

### Timeout-konfigurationer med dynamisk Selenium Grid

När du använder en dynamisk Selenium Grid där webbläsarpoddar startas på begäran kan sessionsskapande möta en kall start. I sådana fall rekommenderas att öka tidsgränserna för sessionsskapande. Standardvärdet i alternativen är 120 sekunder, men du kan öka det om ditt rutnät tar längre tid att skapa en ny session.

```ts
connectionRetryTimeout: 180000,
```

### Avancerade konfigurationer

För avancerade konfigurationer, se Testrunner [konfigurationsfil](https://webdriver.io/docs/configurationfile).

### Filoperationer med Selenium Grid

När du kör testfall med ett fjärrstyrt Selenium Grid körs webbläsaren på en fjärrmaskin, och du behöver ta särskild hänsyn till testfall som involverar filuppladdningar och nedladdningar.

### Filnedladdningar

För Chromium-baserade webbläsare kan du se dokumentationen för [Download file](https://webdriver.io/docs/api/browser/downloadFile). Om dina testskript behöver läsa innehållet i en nedladdad fil måste du ladda ner den från den fjärrstyrda Selenium-noden till testkörningsmaskinen. Här är ett exempel på kodavsnitt från exemplet `wdio.conf.ts` konfiguration för Chrome-webbläsaren:

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

### Filuppladdning med fjärrstyrd Selenium Grid

För att ladda upp en fil till en webbapp i fjärrwebbläsaren måste du först ladda upp filen till det fjärrstyrda rutnätet. Du kan se dokumentationen för [uploadFile](https://webdriver.io/docs/api/browser/uploadFile) för detaljer.

### Andra fil-/gridoperationer

Det finns några fler operationer som du kan utföra med Selenium Grid. Instruktionerna för Selenium Standalone bör fungera bra med Selenium Grid också. Se dokumentationen för [Selenium Standalone](https://webdriver.io/docs/api/selenium/) för tillgängliga alternativ.


### Selenium Grid officiell dokumentation

För mer information om Selenium Grid kan du se den officiella Selenium Grid [dokumentationen](https://www.selenium.dev/documentation/grid/).

Om du vill köra Selenium Grid i Docker, Docker compose eller Kubernetes, se Selenium-Docker [GitHub-arkivet](https://github.com/SeleniumHQ/docker-selenium).