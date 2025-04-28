---
id: cloudservices
title: Utilizzo dei Servizi Cloud
---

Utilizzare servizi on-demand come Sauce Labs, Browserstack, TestingBot, LambdaTest o Perfecto con WebdriverIO è piuttosto semplice. Tutto ciò che devi fare è impostare l'`user` e la `key` del tuo servizio nelle tue opzioni.

Facoltativamente, puoi anche parametrizzare il tuo test impostando capacità specifiche del cloud come `build`. Se vuoi eseguire i servizi cloud solo in Travis, puoi utilizzare la variabile di ambiente `CI` per verificare se sei in Travis e modificare la configurazione di conseguenza.

```js
// wdio.conf.js
export let config = {...}
if (process.env.CI) {
    config.user = process.env.SAUCE_USERNAME
    config.key = process.env.SAUCE_ACCESS_KEY
}
```

## Sauce Labs

Puoi configurare i tuoi test per l'esecuzione remota in [Sauce Labs](https://saucelabs.com).

L'unico requisito è impostare `user` e `key` nella tua configurazione (sia esportata da `wdio.conf.js` o passata a `webdriverio.remote(...)`) con il tuo nome utente e chiave di accesso di Sauce Labs.

Puoi anche passare qualsiasi [opzione di configurazione del test](https://docs.saucelabs.com/dev/test-configuration-options/) opzionale come chiave/valore nelle capacità per qualsiasi browser.

### Sauce Connect

Se vuoi eseguire test contro un server che non è accessibile da Internet (come su `localhost`), devi utilizzare [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy).

È al di fuori dello scopo di WebdriverIO supportare questo, quindi dovrai avviarlo autonomamente.

Se stai utilizzando il testrunner WDIO, scarica e configura il [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) nel tuo `wdio.conf.js`. Aiuta ad avviare Sauce Connect e include funzionalità aggiuntive che integrano meglio i tuoi test nel servizio Sauce.

### Con Travis CI

Travis CI, tuttavia, [ha supporto](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect) per avviare Sauce Connect prima di ogni test, quindi seguire le loro indicazioni è un'opzione.

Se lo fai, devi impostare l'opzione di configurazione del test `tunnel-identifier` nelle `capabilities` di ogni browser. Travis imposta questo sulla variabile di ambiente `TRAVIS_JOB_NUMBER` per impostazione predefinita.

Inoltre, se desideri che Sauce Labs raggruppi i tuoi test per numero di build, puoi impostare `build` su `TRAVIS_BUILD_NUMBER`.

Infine, se imposti `name`, questo cambia il nome di questo test in Sauce Labs per questa build. Se stai utilizzando il testrunner WDIO combinato con il [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service), WebdriverIO imposta automaticamente un nome appropriato per il test.

Esempio di `capabilities`:

```javascript
browserName: 'chrome',
version: '27.0',
platform: 'XP',
'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
name: 'integration',
build: process.env.TRAVIS_BUILD_NUMBER
```

### Timeouts

Poiché stai eseguendo i tuoi test da remoto, potrebbe essere necessario aumentare alcuni timeout.

Puoi modificare il [timeout di inattività](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout) passando `idle-timeout` come opzione di configurazione del test. Questo controlla quanto tempo Sauce attenderà tra i comandi prima di chiudere la connessione.

## BrowserStack

WebdriverIO ha anche un'integrazione con [Browserstack](https://www.browserstack.com) incorporata.

L'unico requisito è impostare `user` e `key` nella tua configurazione (sia esportata da `wdio.conf.js` o passata a `webdriverio.remote(...)`) con il tuo nome utente e chiave di accesso automate di Browserstack.

Puoi anche passare qualsiasi [capacità supportata](https://www.browserstack.com/automate/capabilities) opzionale come chiave/valore nelle capacità per qualsiasi browser. Se imposti `browserstack.debug` su `true` registrerà uno screencast della sessione, che potrebbe essere utile.

### Test Locali

Se vuoi eseguire test contro un server che non è accessibile da Internet (come su `localhost`), allora devi utilizzare [Local Testing](https://www.browserstack.com/local-testing#command-line).

È al di fuori dello scopo di WebdriverIO supportare questo, quindi devi avviarlo autonomamente.

Se utilizzi local, dovresti impostare `browserstack.local` su `true` nelle tue capacità.

Se stai utilizzando il testrunner WDIO, scarica e configura il [`@wdio/browserstack-service`](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-browserstack-service) nel tuo `wdio.conf.js`. Aiuta ad avviare BrowserStack e include funzionalità aggiuntive che integrano meglio i tuoi test nel servizio BrowserStack.

### Con Travis CI

Se vuoi aggiungere Local Testing in Travis, devi avviarlo autonomamente.

Il seguente script scaricherà e lo avvierà in background. Dovresti eseguirlo in Travis prima di iniziare i test.

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

L'unico requisito è impostare `user` e `key` nella tua configurazione (sia esportata da `wdio.conf.js` o passata a `webdriverio.remote(...)`) con il tuo nome utente e chiave segreta di [TestingBot](https://testingbot.com).

Puoi anche passare qualsiasi [capacità supportata](https://testingbot.com/support/other/test-options) opzionale come chiave/valore nelle capacità per qualsiasi browser.

### Test Locali

Se vuoi eseguire test contro un server che non è accessibile da Internet (come su `localhost`), allora devi utilizzare [Local Testing](https://testingbot.com/support/other/tunnel). TestingBot fornisce un tunnel basato su Java per consentirti di testare siti web non accessibili da Internet.

La loro pagina di supporto per il tunnel contiene le informazioni necessarie per iniziare.

Se stai utilizzando il testrunner WDIO, scarica e configura il [`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service) nel tuo `wdio.conf.js`. Aiuta ad avviare TestingBot e include funzionalità aggiuntive che integrano meglio i tuoi test nel servizio TestingBot.

## LambdaTest

L'integrazione con [LambdaTest](https://www.lambdatest.com) è anch'essa incorporata.

L'unico requisito è impostare `user` e `key` nella tua configurazione (sia esportata da `wdio.conf.js` o passata a `webdriverio.remote(...)`) con il tuo nome utente e chiave di accesso dell'account LambdaTest.

Puoi anche passare qualsiasi [capacità supportata](https://www.lambdatest.com/capabilities-generator/) opzionale come chiave/valore nelle capacità per qualsiasi browser. Se imposti `visual` su `true` registrerà uno screencast della sessione, che potrebbe essere utile.

### Tunnel per test locali

Se vuoi eseguire test contro un server che non è accessibile da Internet (come su `localhost`), allora devi utilizzare [Local Testing](https://www.lambdatest.com/support/docs/testing-locally-hosted-pages/).

È al di fuori dello scopo di WebdriverIO supportare questo, quindi devi avviarlo autonomamente.

Se utilizzi local, dovresti impostare `tunnel` su `true` nelle tue capacità.

Se stai utilizzando il testrunner WDIO, scarica e configura il [`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service) nel tuo `wdio.conf.js`. Aiuta ad avviare LambdaTest e include funzionalità aggiuntive che integrano meglio i tuoi test nel servizio LambdaTest.

### Con Travis CI

Se vuoi aggiungere Local Testing in Travis, devi avviarlo autonomamente.

Il seguente script scaricherà e lo avvierà in background. Dovresti eseguirlo in Travis prima di iniziare i test.

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

Quando si utilizza wdio con [`Perfecto`](https://www.perfecto.io), è necessario creare un token di sicurezza per ciascun utente e aggiungerlo nella struttura delle capacità (oltre ad altre capacità), come segue:

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

Inoltre, è necessario aggiungere la configurazione del cloud, come segue:

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```