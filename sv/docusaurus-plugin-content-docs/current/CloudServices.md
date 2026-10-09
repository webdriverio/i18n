---
id: cloudservices
title: Använda molntjänster
description: "Kör WebdriverIO-tester på Sauce Labs, BrowserStack, TestingBot, TestMu AI (tidigare LambdaTest), Perfecto och andra molnleverantörer."
---

Att använda on-demand-tjänster som Sauce Labs, Browserstack, TestingBot, TestMu AI (tidigare LambdaTest) eller Perfecto med WebdriverIO är ganska enkelt. Allt du behöver göra är att ange din tjänsts `user` och `key` i dina inställningar.

Du kan även parametrisera ditt test genom att ange molnspecifika capabilities som `build`. Om du bara vill köra molntjänster i Travis kan du använda miljövariabeln `CI` för att kontrollera om du befinner dig i Travis och ändra konfigurationen därefter.

```js
// wdio.conf.js
export let config = {...}
if (process.env.CI) {
    config.user = process.env.SAUCE_USERNAME
    config.key = process.env.SAUCE_ACCESS_KEY
}
```

## Sauce Labs

Du kan konfigurera dina tester så att de körs på distans i [Sauce Labs](https://saucelabs.com).

Det enda kravet är att ange `user` och `key` i din konfiguration (antingen exporterad från `wdio.conf.js` eller skickad till `webdriverio.remote(...)`) till ditt användarnamn och din åtkomstnyckel för Sauce Labs.

Du kan även skicka in valfria [testkonfigurationsalternativ](https://docs.saucelabs.com/dev/test-configuration-options/) som nyckel/värde i capabilities för vilken webbläsare som helst.

### Sauce Connect

Om du vill köra tester mot en server som inte är åtkomlig från internet (till exempel på `localhost`) måste du använda [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy).

Det ligger utanför WebdriverIO:s omfång att stödja detta, så du måste starta det själv.

Om du använder WDIO-testrunnern, ladda ner och konfigurera [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) i din `wdio.conf.js`. Den hjälper till att få igång Sauce Connect och har ytterligare funktioner som bättre integrerar dina tester med Sauce-tjänsten.

### Med Travis CI

Travis CI har dock [stöd](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect) för att starta Sauce Connect före varje test, så att följa deras instruktioner för detta är ett alternativ.

Om du gör det måste du ange testkonfigurationsalternativet `tunnel-identifier` i varje webbläsares `capabilities`. Travis sätter detta till miljövariabeln `TRAVIS_JOB_NUMBER` som standard.

Om du vill att Sauce Labs ska gruppera dina tester efter byggnummer kan du dessutom sätta `build` till `TRAVIS_BUILD_NUMBER`.

Slutligen, om du anger `name` ändras namnet på detta test i Sauce Labs för detta bygge. Om du använder WDIO-testrunnern i kombination med [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) sätter WebdriverIO automatiskt ett lämpligt namn på testet.

Exempel på `capabilities`:

```javascript
browserName: 'chrome',
version: '27.0',
platform: 'XP',
'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
name: 'integration',
build: process.env.TRAVIS_BUILD_NUMBER
```

### Timeouts

Eftersom du kör dina tester på distans kan det vara nödvändigt att öka vissa timeouts.

Du kan ändra [idle timeout](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout) genom att skicka `idle-timeout` som ett testkonfigurationsalternativ. Detta styr hur länge Sauce väntar mellan kommandon innan anslutningen stängs.

## BrowserStack

WebdriverIO har även en inbyggd integration med [Browserstack](https://www.browserstack.com).

Det enda kravet är att ange `user` och `key` i din konfiguration (antingen exporterad från `wdio.conf.js` eller skickad till `webdriverio.remote(...)`) till ditt användarnamn och din åtkomstnyckel för Browserstack Automate.

Du kan även skicka in valfria [capabilities som stöds](https://www.browserstack.com/automate/capabilities) som nyckel/värde i capabilities för vilken webbläsare som helst. Om du sätter `browserstack.debug` till `true` spelas en skärminspelning av sessionen in, vilket kan vara till hjälp.

### Lokal testning

Om du vill köra tester mot en server som inte är åtkomlig från internet (till exempel på `localhost`) måste du använda [Local Testing](https://www.browserstack.com/local-testing#command-line).

Det ligger utanför WebdriverIO:s omfång att stödja detta, så du måste starta det själv.

Om du använder local bör du sätta `browserstack.local` till `true` i dina capabilities.

Om du använder WDIO-testrunnern, ladda ner och konfigurera [`@wdio/browserstack-service`](https://github.com/browserstack/wdio-browserstack-service) i din `wdio.conf.js`. Den hjälper till att få igång BrowserStack och har ytterligare funktioner som bättre integrerar dina tester med BrowserStack-tjänsten.

### Med Travis CI

Om du vill lägga till Local Testing i Travis måste du starta det själv.

Följande skript laddar ner och startar det i bakgrunden. Du bör köra detta i Travis innan testerna startas.

```sh
wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip
unzip BrowserStackLocal-linux-x64.zip
./BrowserStackLocal -v -onlyAutomate -forcelocal $BROWSERSTACK_ACCESS_KEY &
sleep 3
```

Du kanske även vill sätta `build` till Travis byggnummer.

Exempel på `capabilities`:

```javascript
browserName: 'chrome',
project: 'myApp',
version: '44.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'browserstack.local': 'true',
'browserstack.debug': 'true'
```

## TestingBot

Det enda kravet är att ange `user` och `key` i din konfiguration (antingen exporterad från `wdio.conf.js` eller skickad till `webdriverio.remote(...)`) till ditt användarnamn och din hemliga nyckel för [TestingBot](https://testingbot.com).

Du kan även skicka in valfria [capabilities som stöds](https://testingbot.com/support/other/test-options) som nyckel/värde i capabilities för vilken webbläsare som helst.

### Lokal testning

Om du vill köra tester mot en server som inte är åtkomlig från internet (till exempel på `localhost`) måste du använda [Local Testing](https://testingbot.com/support/other/tunnel). TestingBot tillhandahåller en Java-baserad tunnel som låter dig testa webbplatser som inte är åtkomliga från internet.

Deras supportsida för tunneln innehåller den information som behövs för att få igång detta.

Om du använder WDIO-testrunnern, ladda ner och konfigurera [`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service) i din `wdio.conf.js`. Den hjälper till att få igång TestingBot och har ytterligare funktioner som bättre integrerar dina tester med TestingBot-tjänsten.

## TestMu AI (tidigare LambdaTest)

Integration med [TestMu AI](https://www.testmuai.com/) är också inbyggd.

Det enda kravet är att ange `user` och `key` i din konfiguration (antingen exporterad från `wdio.conf.js` eller skickad till `webdriverio.remote(...)`) till ditt användarnamn och din åtkomstnyckel för ditt TestMu AI-konto.

Du kan även skicka in valfria [capabilities som stöds](https://www.testmuai.com/capabilities-generator/) som nyckel/värde i capabilities för vilken webbläsare som helst. Om du sätter `visual` till `true` spelas en skärminspelning av sessionen in, vilket kan vara till hjälp.

### Tunnel för lokal testning

Om du vill köra tester mot en server som inte är åtkomlig från internet (till exempel på `localhost`) måste du använda [Local Testing](https://www.testmuai.com/support/docs/testing-locally-hosted-pages/).

Det ligger utanför WebdriverIO:s omfång att stödja detta, så du måste starta det själv.

Om du använder local bör du sätta `tunnel` till `true` i dina capabilities.

Om du använder WDIO-testrunnern, ladda ner och konfigurera [`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service) i din `wdio.conf.js`. Den hjälper till att få igång TestMu AI och har ytterligare funktioner som bättre integrerar dina tester med TestMu AI-tjänsten.

### Med Travis CI

Om du vill lägga till Local Testing i Travis måste du starta det själv.

Följande skript laddar ner och startar det i bakgrunden. Du bör köra detta i Travis innan testerna startas.

```sh
wget http://downloads.lambdatest.com/tunnel/linux/64bit/LT_Linux.zip
unzip LT_Linux.zip
./LT -user $LT_USERNAME -key $LT_ACCESS_KEY -cui &
sleep 3
```

Du kanske även vill sätta `build` till Travis byggnummer.

Exempel på `capabilities`:

```javascript
platform: 'Windows 10',
browserName: 'chrome',
version: '79.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'tunnel': 'true',
'visual': 'true'
```

## Perfecto

När du använder wdio med [`Perfecto`](https://www.perfecto.io) måste du skapa en säkerhetstoken för varje användare och lägga till den i capabilities-strukturen (utöver andra capabilities), enligt följande:

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

Dessutom måste du lägga till molnkonfiguration, enligt följande:

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```

## RobotActions

[RobotActions](https://robotactions.com) tillhandahåller riktiga Android- och iOS-enheter tillsammans med webbläsarnoder bakom en enda endpoint. Autentisering sker med en API-token i stället för ett `user`- och `key`-par. Skicka token som en bearer-header:

```js
export const config = {
  protocol: 'https',
  hostname: 'grid.robotactions.com',
  port: 443,
  path: '/',
  headers: {
    Authorization: `Bearer ${process.env.RA_API_TOKEN}`
  },
  capabilities: [{
    browserName: 'chrome'
  }]
}
```

Alternativt kan du skicka token som ett sökvägsprefix, som griden tar bort innan begäran vidarebefordras:

```js
export const config = {
  protocol: 'https',
  hostname: 'grid.robotactions.com',
  port: 443,
  path: `/t/${process.env.RA_API_TOKEN}/`,
  capabilities: [{
    browserName: 'chrome'
  }]
}
```

Griden accepterar dessutom inloggningsuppgifter inbäddade i URL:en (`https://user:token@host`) för andra WebDriver-klienter, men den formen kan inte användas från WebdriverIO: den är fetch-baserad, och Node.js avvisar inloggningsuppgifter inbäddade i URL:er.

För att köra mot en riktig enhet, skicka webbläsaren som en Appium-capability tillsammans med någon av anslutningsmetoderna ovan:

```js
export const config = {
  protocol: 'https',
  hostname: 'grid.robotactions.com',
  port: 443,
  path: '/',
  headers: {
    Authorization: `Bearer ${process.env.RA_API_TOKEN}`
  },
  capabilities: [{
    platformName: 'Android',
    'appium:browserName': 'chrome',
    'appium:automationName': 'UiAutomator2'
  }]
}
```