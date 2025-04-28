---
id: seleniumgrid
title: Selenium Grid
---

Du kan använda WebdriverIO med din befintliga Selenium Grid-instans. För att ansluta dina tester till Selenium Grid behöver du bara uppdatera alternativen i dina test runner-konfigurationer.

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
Du måste ange lämpliga värden för protokoll, värdnamn, port och sökväg baserat på din Selenium Grid-konfiguration.
Om du kör Selenium Grid på samma maskin som dina testskript är här några typiska alternativ:

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

Det rekommenderas starkt att säkra din Selenium Grid. Om du har en skyddad Selenium Grid som kräver autentisering kan du skicka autentiseringsrubriker via alternativ. 
Se avsnittet [headers](https://webdriver.io/docs/configuration/#headers) i dokumentationen för mer information.

### Timeout-konfigurationer med dynamisk Selenium Grid

När du använder en dynamisk Selenium Grid där webbläsarpoddar startas på begäran kan sessionskapande stöta på en kallstart. I sådana fall rekommenderas det att öka tidsgränserna för sessionskapande. Standardvärdet i alternativen är 120 sekunder, men du kan öka det om ditt grid tar längre tid på sig att skapa en ny session. 

```ts
connectionRetryTimeout: 180000,
```

### Avancerade konfigurationer

För avancerade konfigurationer, se Testrunner [konfigurationsfil](https://webdriver.io/docs/configurationfile).

### Filoperationer med Selenium Grid

När du kör testfall med ett fjärran Selenium Grid körs webbläsaren på en fjärrmaskin, och du måste vara särskilt försiktig med testfall som involverar filuppladdningar och nedladdningar.

### Filnedladdningar

För Chromium-baserade webbläsare kan du se dokumentationen [Download file](https://webdriver.io/docs/api/browser/downloadFile). Om dina testskript behöver läsa innehållet i en nedladdad fil måste du ladda ner den från den fjärranslutna Selenium-noden till testkörningsmaskinen. Här är ett exempel på kodavsnitt från exempelfilen `wdio.conf.ts` för Chrome-webbläsaren:

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

### Filuppladdning med fjärransluten Selenium Grid

För att ladda upp en fil till en webbapp i fjärrwebbläsaren måste du först ladda upp filen till det fjärranslutna griddet. Du kan se dokumentationen [uploadFile](https://webdriver.io/docs/api/browser/uploadFile) för detaljer.

### Andra fil/grid-operationer

Det finns några fler operationer som du kan utföra med Selenium Grid. Instruktionerna för Selenium Standalone bör fungera bra även med Selenium Grid. Se dokumentationen för [Selenium Standalone](https://webdriver.io/docs/api/selenium/) för tillgängliga alternativ.


### Selenium Grid Officiell dokumentation

För mer information om Selenium Grid kan du hänvisa till den officiella Selenium Grid [dokumentationen](https://www.selenium.dev/documentation/grid/).

Om du vill köra Selenium Grid i Docker, Docker Compose eller Kubernetes, se Selenium-Docker [GitHub-repositoriet](https://github.com/SeleniumHQ/docker-selenium).