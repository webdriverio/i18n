---
id: cloudservices
title: Utilizzo dei servizi cloud
description: "Esegui i test WebdriverIO su Sauce Labs, BrowserStack, TestingBot, TestMu AI (precedentemente LambdaTest), Perfecto e altri provider cloud."
---

Utilizzare servizi on-demand come Sauce Labs, Browserstack, TestingBot, TestMu AI (precedentemente LambdaTest) o Perfecto con WebdriverIO è piuttosto semplice. Tutto ciò che devi fare è impostare `user` e `key` del tuo servizio nelle opzioni.

Facoltativamente, puoi anche parametrizzare il tuo test impostando capability specifiche del cloud come `build`. Se vuoi eseguire i servizi cloud solo in Travis, puoi utilizzare la variabile d'ambiente `CI` per verificare se ti trovi in Travis e modificare la configurazione di conseguenza.

```js
// wdio.conf.js
export let config = {...}
if (process.env.CI) {
    config.user = process.env.SAUCE_USERNAME
    config.key = process.env.SAUCE_ACCESS_KEY
}
```

## Sauce Labs

Puoi configurare i tuoi test per essere eseguiti in remoto su [Sauce Labs](https://saucelabs.com).

L'unico requisito è impostare `user` e `key` nella tua configurazione (esportata da `wdio.conf.js` o passata a `webdriverio.remote(...)`) con il tuo nome utente e la tua chiave di accesso Sauce Labs.

Puoi anche passare qualsiasi [opzione di configurazione del test](https://docs.saucelabs.com/dev/test-configuration-options/) facoltativa come coppia chiave/valore nelle capability di qualsiasi browser.

### Sauce Connect

Se vuoi eseguire i test su un server non accessibile da Internet (ad esempio su `localhost`), devi utilizzare [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy).

Il supporto a questa funzionalità esula dagli scopi di WebdriverIO, quindi dovrai avviarlo autonomamente.

Se stai utilizzando il testrunner WDIO, scarica e configura il [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) nel tuo `wdio.conf.js`. Aiuta ad avviare Sauce Connect e offre funzionalità aggiuntive che integrano meglio i tuoi test nel servizio Sauce.

### Con Travis CI

Travis CI, tuttavia, [offre supporto](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect) per l'avvio di Sauce Connect prima di ogni test, quindi seguire le loro indicazioni in merito è un'opzione.

Se lo fai, devi impostare l'opzione di configurazione del test `tunnel-identifier` nelle `capabilities` di ogni browser. Travis la imposta per impostazione predefinita sulla variabile d'ambiente `TRAVIS_JOB_NUMBER`.

Inoltre, se vuoi che Sauce Labs raggruppi i tuoi test per numero di build, puoi impostare `build` su `TRAVIS_BUILD_NUMBER`.

Infine, se imposti `name`, questo cambia il nome del test in Sauce Labs per questa build. Se stai utilizzando il testrunner WDIO in combinazione con il [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service), WebdriverIO imposta automaticamente un nome appropriato per il test.

Esempio di `capabilities`:

```javascript
browserName: 'chrome',
version: '27.0',
platform: 'XP',
'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
name: 'integration',
build: process.env.TRAVIS_BUILD_NUMBER
```

### Timeout

Poiché stai eseguendo i test in remoto, potrebbe essere necessario aumentare alcuni timeout.

Puoi modificare l'[idle timeout](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout) passando `idle-timeout` come opzione di configurazione del test. Questo controlla quanto tempo Sauce attenderà tra un comando e l'altro prima di chiudere la connessione.

## BrowserStack

WebdriverIO dispone anche di un'integrazione integrata con [Browserstack](https://www.browserstack.com).

L'unico requisito è impostare `user` e `key` nella tua configurazione (esportata da `wdio.conf.js` o passata a `webdriverio.remote(...)`) con il tuo nome utente e la tua chiave di accesso di Browserstack Automate.

Puoi anche passare qualsiasi [capability supportata](https://www.browserstack.com/automate/capabilities) facoltativa come coppia chiave/valore nelle capability di qualsiasi browser. Se imposti `browserstack.debug` su `true`, verrà registrato uno screencast della sessione, che potrebbe essere utile.

### Test in locale

Se vuoi eseguire i test su un server non accessibile da Internet (ad esempio su `localhost`), devi utilizzare il [Local Testing](https://www.browserstack.com/local-testing#command-line).

Il supporto a questa funzionalità esula dagli scopi di WebdriverIO, quindi devi avviarlo autonomamente.

Se utilizzi il test in locale, dovresti impostare `browserstack.local` su `true` nelle tue capability.

Se stai utilizzando il testrunner WDIO, scarica e configura il [`@wdio/browserstack-service`](https://github.com/browserstack/wdio-browserstack-service) nel tuo `wdio.conf.js`. Aiuta ad avviare BrowserStack e offre funzionalità aggiuntive che integrano meglio i tuoi test nel servizio BrowserStack.

### Con Travis CI

Se vuoi aggiungere il Local Testing in Travis, devi avviarlo autonomamente.

Lo script seguente lo scaricherà e lo avvierà in background. Dovresti eseguirlo in Travis prima di avviare i test.

```sh
wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip
unzip BrowserStackLocal-linux-x64.zip
./BrowserStackLocal -v -onlyAutomate -forcelocal $BROWSERSTACK_ACCESS_KEY &
sleep 3
```

Inoltre, potresti voler impostare `build` sul numero di build di Travis.

Esempio di `capabilities`:

```javascript
browserName: 'chrome',
project: 'myApp',
version: '44.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'browserstack.local': 'true',
'browserstack.debug': 'true'
```

## TestingBot

L'unico requisito è impostare `user` e `key` nella tua configurazione (esportata da `wdio.conf.js` o passata a `webdriverio.remote(...)`) con il tuo nome utente e la tua chiave segreta di [TestingBot](https://testingbot.com).

Puoi anche passare qualsiasi [capability supportata](https://testingbot.com/support/other/test-options) facoltativa come coppia chiave/valore nelle capability di qualsiasi browser.

### Test in locale

Se vuoi eseguire i test su un server non accessibile da Internet (ad esempio su `localhost`), devi utilizzare il [Local Testing](https://testingbot.com/support/other/tunnel). TestingBot fornisce un tunnel basato su Java che consente di testare siti web non accessibili da Internet.

La loro pagina di supporto sul tunnel contiene le informazioni necessarie per configurarlo e avviarlo.

Se stai utilizzando il testrunner WDIO, scarica e configura il [`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service) nel tuo `wdio.conf.js`. Aiuta ad avviare TestingBot e offre funzionalità aggiuntive che integrano meglio i tuoi test nel servizio TestingBot.

## TestMu AI (precedentemente LambdaTest)

Anche l'integrazione con [TestMu AI](https://www.testmuai.com/) è integrata.

L'unico requisito è impostare `user` e `key` nella tua configurazione (esportata da `wdio.conf.js` o passata a `webdriverio.remote(...)`) con il nome utente e la chiave di accesso del tuo account TestMu AI.

Puoi anche passare qualsiasi [capability supportata](https://www.testmuai.com/capabilities-generator/) facoltativa come coppia chiave/valore nelle capability di qualsiasi browser. Se imposti `visual` su `true`, verrà registrato uno screencast della sessione, che potrebbe essere utile.

### Tunnel per i test in locale

Se vuoi eseguire i test su un server non accessibile da Internet (ad esempio su `localhost`), devi utilizzare il [Local Testing](https://www.testmuai.com/support/docs/testing-locally-hosted-pages/).

Il supporto a questa funzionalità esula dagli scopi di WebdriverIO, quindi devi avviarlo autonomamente.

Se utilizzi il test in locale, dovresti impostare `tunnel` su `true` nelle tue capability.

Se stai utilizzando il testrunner WDIO, scarica e configura il [`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service) nel tuo `wdio.conf.js`. Aiuta ad avviare TestMu AI e offre funzionalità aggiuntive che integrano meglio i tuoi test nel servizio TestMu AI.

### Con Travis CI

Se vuoi aggiungere il Local Testing in Travis, devi avviarlo autonomamente.

Lo script seguente lo scaricherà e lo avvierà in background. Dovresti eseguirlo in Travis prima di avviare i test.

```sh
wget http://downloads.lambdatest.com/tunnel/linux/64bit/LT_Linux.zip
unzip LT_Linux.zip
./LT -user $LT_USERNAME -key $LT_ACCESS_KEY -cui &
sleep 3
```

Inoltre, potresti voler impostare `build` sul numero di build di Travis.

Esempio di `capabilities`:

```javascript
platform: 'Windows 10',
browserName: 'chrome',
version: '79.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'tunnel': 'true',
'visual': 'true'
```

## Perfecto

Quando utilizzi wdio con [`Perfecto`](https://www.perfecto.io), devi creare un token di sicurezza per ogni utente e aggiungerlo nella struttura delle capability (oltre alle altre capability), come segue:

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

Inoltre, devi aggiungere la configurazione del cloud, come segue:

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```

## RobotActions

[RobotActions](https://robotactions.com) fornisce dispositivi Android e iOS reali insieme a nodi browser dietro un unico endpoint. L'autenticazione avviene tramite un token API anziché una coppia `user` e `key`. Invia il token come header bearer:

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

In alternativa, passa il token come prefisso del path, che la grid rimuove prima di inoltrare la richiesta:

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

La grid accetta inoltre credenziali incorporate nell'URL (`https://user:token@host`) per altri client WebDriver, ma questa forma non può essere utilizzata da WebdriverIO: si basa su fetch e Node.js rifiuta le credenziali incorporate nell'URL.

Per eseguire i test su un dispositivo reale, passa il browser come capability Appium insieme a uno dei due stili di connessione sopra indicati:

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