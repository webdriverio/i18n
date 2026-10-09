---
id: seleniumgrid
title: Selenium Grid
description: "Anslut WebdriverIO-tester till ett befintligt Selenium Grid genom att ange protocol, hostname, port och path i din konfiguration."
---

Du kan använda WebdriverIO med din befintliga Selenium Grid-instans. För att ansluta dina tester till Selenium Grid behöver du bara uppdatera alternativen i konfigurationen för din testrunner.

Här är ett kodexempel från en exempelfil wdio.conf.ts.

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
Du behöver ange lämpliga värden för protocol, hostname, port och path baserat på din Selenium Grid-uppsättning.
Om du kör Selenium Grid på samma maskin som dina testskript är detta några typiska alternativ:

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

### Grundläggande autentisering med skyddat Selenium Grid

Det rekommenderas starkt att du skyddar ditt Selenium Grid. Om du har ett skyddat Selenium Grid som kräver autentisering kan du skicka autentiseringsheaders via alternativen. 
Se avsnittet [headers](https://webdriver.io/docs/configuration/#headers) i dokumentationen för mer information.

### Timeout-konfigurationer med dynamiskt Selenium Grid

När du använder ett dynamiskt Selenium Grid där webbläsarpoddar startas vid behov kan skapandet av sessioner drabbas av en kallstart. I sådana fall rekommenderas det att öka timeout-värdena för att skapa sessioner. Standardvärdet i alternativen är 120 sekunder, men du kan öka det om ditt grid tar längre tid på sig att skapa en ny session. 

```ts
connectionRetryTimeout: 180000,
```

### Avancerade konfigurationer

För avancerade konfigurationer, se Testrunnerns [konfigurationsfil](https://webdriver.io/docs/configurationfile).

### Filoperationer med Selenium Grid

När du kör testfall med ett fjärranslutet Selenium Grid körs webbläsaren på en fjärrmaskin, och du behöver vara särskilt uppmärksam på testfall som involverar uppladdning och nedladdning av filer.

### Filnedladdningar

För Chromium-baserade webbläsare kan du läsa dokumentationen för [Ladda ner fil](https://webdriver.io/docs/api/browser/downloadFile). Om dina testskript behöver läsa innehållet i en nedladdad fil måste du ladda ner den från den fjärranslutna Selenium-noden till maskinen där testrunnern körs. Här är ett exempel på kod från exempelkonfigurationen `wdio.conf.ts` för webbläsaren Chrome:

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

### Filuppladdning med fjärranslutet Selenium Grid

[`element.setFiles()`](/docs/api/element/setFiles) anger en filinmatning via WebDriver BiDi. Sökvägarna du skickar öppnas av webbläsaren, så de måste finnas på maskinen som kör webbläsaren. WebdriverIO överför inte en lokal fil till en Selenium-nod.

```ts
await $('#file-upload').setFiles('/path/on/the/node/file.png')
```

En testsvit som använde `browser.uploadFile()` för att skicka bytes till noden måste placera filen där webbläsaren kan läsa den och sedan anropa `setFiles`. Seleniums [`file`](/docs/api/selenium#file)-endpoint är fortfarande tillgänglig som `browser.file()` för Chromedriver, Edgedriver och Selenium Grid. Det är inte ett WebDriver- eller WebDriver BiDi-kommando.

### Andra fil-/grid-operationer

Det finns ytterligare några operationer som du kan utföra med Selenium Grid. Instruktionerna för Selenium Standalone bör fungera bra även med Selenium Grid. Se dokumentationen för [Selenium Standalone](https://webdriver.io/docs/api/selenium/) för tillgängliga alternativ.


### Officiell dokumentation för Selenium Grid

För mer information om Selenium Grid kan du läsa den officiella [dokumentationen](https://www.selenium.dev/documentation/grid/) för Selenium Grid. 

Om du vill köra Selenium Grid i Docker, Docker compose eller Kubernetes, se Selenium-Dockers [GitHub-repository](https://github.com/SeleniumHQ/docker-selenium).