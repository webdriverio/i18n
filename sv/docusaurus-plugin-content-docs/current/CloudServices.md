---
id: cloudservices
title: Användning av molntjänster
---

Att använda tjänster på begäran som Sauce Labs, Browserstack, TestingBot, LambdaTest eller Perfecto med WebdriverIO är ganska enkelt. Allt du behöver göra är att ange din tjänsts `user` och `key` i dina alternativ.

Alternativt kan du också parametrisera ditt test genom att ange molnspecifika funktioner som `build`. Om du bara vill köra molntjänster i Travis kan du använda miljövariabeln `CI` för att kontrollera om du är i Travis och ändra konfigurationen därefter.

```js
// wdio.conf.js
export let config = {...}
if (process.env.CI) {
    config.user = process.env.SAUCE_USERNAME
    config.key = process.env.SAUCE_ACCESS_KEY
}
```

## Sauce Labs

Du kan ställa in dina tester att köras på distans i [Sauce Labs](https://saucelabs.com).

Det enda kravet är att ange `user` och `key` i din konfiguration (antingen exporterad av `wdio.conf.js` eller skickad till `webdriverio.remote(...)`) till ditt Sauce Labs användarnamn och åtkomstnyckel.

Du kan också skicka in valfritt [testkonfigurationsalternativ](https://docs.saucelabs.com/dev/test-configuration-options/) som nyckel/värde i egenskaperna för vilken webbläsare som helst.

### Sauce Connect

Om du vill köra tester mot en server som inte är tillgänglig för internet (som på `localhost`), måste du använda [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy).

Det ligger utanför WebdriverIOs omfång att stödja detta, så du måste starta det själv.

Om du använder WDIO testrunner, ladda ner och konfigurera [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) i din `wdio.conf.js`. Det hjälper till att få Sauce Connect att köra och kommer med ytterligare funktioner som bättre integrerar dina tester i Sauce-tjänsten.

### Med Travis CI

Travis CI har dock [stöd](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect) för att starta Sauce Connect före varje test, så att följa deras anvisningar för det är ett alternativ.

Om du gör det måste du ställa in testkonfigurationsalternativet `tunnel-identifier` i varje webbläsares `capabilities`. Travis sätter detta till miljövariabeln `TRAVIS_JOB_NUMBER` som standard.

Om du vill att Sauce Labs ska gruppera dina tester efter byggningsnummer kan du ställa in `build` till `TRAVIS_BUILD_NUMBER`.

Om du ställer in `name` ändrar detta testets namn i Sauce Labs för denna byggning. Om du använder WDIO testrunner i kombination med [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service), ställer WebdriverIO automatiskt in ett lämpligt namn för testet.

Exempel på `capabilities`:

```javascript
browserName: 'chrome',
version: '27.0',
platform: 'XP',
'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
name: 'integration',
build: process.env.TRAVIS_BUILD_NUMBER
```

### Tidsgränser

Eftersom du kör dina tester på distans kan det vara nödvändigt att öka vissa tidsgränser.

Du kan ändra [inaktivitetstidsgränsen](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout) genom att skicka `idle-timeout` som ett testkonfigurationsalternativ. Detta kontrollerar hur länge Sauce kommer att vänta mellan kommandon innan anslutningen stängs.

## BrowserStack

WebdriverIO har också en inbyggd [Browserstack](https://www.browserstack.com)-integration.

Det enda kravet är att ställa in `user` och `key` i din konfiguration (antingen exporterad av `wdio.conf.js` eller skickad till `webdriverio.remote(...)`) till ditt Browserstack-automatiseringens användarnamn och åtkomstnyckel.

Du kan också skicka in valfria [stödda funktioner](https://www.browserstack.com/automate/capabilities) som nyckel/värde i egenskaperna för vilken webbläsare som helst. Om du ställer in `browserstack.debug` till `true` kommer den att spela in en skärminspelning av sessionen, vilket kan vara till hjälp.

### Lokal testning

Om du vill köra tester mot en server som inte är tillgänglig för internet (som på `localhost`), måste du använda [Local Testing](https://www.browserstack.com/local-testing#command-line).

Det ligger utanför WebdriverIOs omfång att stödja detta, så du måste starta det själv.

Om du använder local, bör du ställa in `browserstack.local` till `true` i dina egenskaper.

Om du använder WDIO testrunner, ladda ner och konfigurera [`@wdio/browserstack-service`](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-browserstack-service) i din `wdio.conf.js`. Det hjälper till att få BrowserStack att köra och kommer med ytterligare funktioner som bättre integrerar dina tester i BrowserStack-tjänsten.

### Med Travis CI

Om du vill lägga till Local Testing i Travis måste du starta det själv.

Följande skript laddar ner och startar det i bakgrunden. Du bör köra detta i Travis innan du startar testerna.

```sh
wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip
unzip BrowserStackLocal-linux-x64.zip
./BrowserStackLocal -v -onlyAutomate -forcelocal $BROWSERSTACK_ACCESS_KEY &
sleep 3
```

Du kanske också vill ställa in `build` till Travis-byggningsnummer.

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

Det enda kravet är att ställa in `user` och `key` i din konfiguration (antingen exporterad av `wdio.conf.js` eller skickad till `webdriverio.remote(...)`) till ditt [TestingBot](https://testingbot.com) användarnamn och hemliga nyckel.

Du kan också skicka in valfria [stödda egenskaper](https://testingbot.com/support/other/test-options) som nyckel/värde i egenskaperna för vilken webbläsare som helst.

### Lokal testning

Om du vill köra tester mot en server som inte är tillgänglig för internet (som på `localhost`), måste du använda [Local Testing](https://testingbot.com/support/other/tunnel). TestingBot tillhandahåller en Javabaserad tunnel för att låta dig testa webbplatser som inte är tillgängliga från internet.

Deras tunnelstödsida innehåller den information som behövs för att få detta att fungera.

Om du använder WDIO testrunner, ladda ner och konfigurera [`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service) i din `wdio.conf.js`. Det hjälper till att få TestingBot att köra och kommer med ytterligare funktioner som bättre integrerar dina tester i TestingBot-tjänsten.

## LambdaTest

[LambdaTest](https://www.lambdatest.com)-integration är också inbyggd.

Det enda kravet är att ställa in `user` och `key` i din konfiguration (antingen exporterad av `wdio.conf.js` eller skickad till `webdriverio.remote(...)`) till ditt LambdaTest-kontos användarnamn och åtkomstnyckel.

Du kan också skicka in valfria [stödda egenskaper](https://www.lambdatest.com/capabilities-generator/) som nyckel/värde i egenskaperna för vilken webbläsare som helst. Om du ställer in `visual` till `true` kommer den att spela in en skärminspelning av sessionen, vilket kan vara till hjälp.

### Tunnel för lokal testning

Om du vill köra tester mot en server som inte är tillgänglig för internet (som på `localhost`), måste du använda [Local Testing](https://www.lambdatest.com/support/docs/testing-locally-hosted-pages/).

Det ligger utanför WebdriverIOs omfång att stödja detta, så du måste starta det själv.

Om du använder local, bör du ställa in `tunnel` till `true` i dina egenskaper.

Om du använder WDIO testrunner, ladda ner och konfigurera [`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service) i din `wdio.conf.js`. Det hjälper till att få LambdaTest att köra och kommer med ytterligare funktioner som bättre integrerar dina tester i LambdaTest-tjänsten.

### Med Travis CI

Om du vill lägga till Local Testing i Travis måste du starta det själv.

Följande skript laddar ner och startar det i bakgrunden. Du bör köra detta i Travis innan du startar testerna.

```sh
wget http://downloads.lambdatest.com/tunnel/linux/64bit/LT_Linux.zip
unzip LT_Linux.zip
./LT -user $LT_USERNAME -key $LT_ACCESS_KEY -cui &
sleep 3
```

Du kanske också vill ställa in `build` till Travis-byggningsnummer.

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

När du använder wdio med [`Perfecto`](https://www.perfecto.io) behöver du skapa en säkerhetstoken för varje användare och lägga till den i capabilities-strukturen (utöver andra egenskaper), enligt följande:

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

Dessutom behöver du lägga till molnkonfiguration enligt följande:

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```