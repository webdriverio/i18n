---
id: cloudservices
title: Cloud-Dienste verwenden
description: "Führen Sie WebdriverIO-Tests auf Sauce Labs, BrowserStack, TestingBot, TestMu AI (ehemals LambdaTest), Perfecto und anderen Cloud-Anbietern aus."
---

Die Verwendung von On-Demand-Diensten wie Sauce Labs, Browserstack, TestingBot, TestMu AI (ehemals LambdaTest) oder Perfecto mit WebdriverIO ist ziemlich einfach. Sie müssen lediglich den `user` und `key` Ihres Dienstes in Ihren Optionen festlegen.

Optional können Sie Ihren Test auch parametrisieren, indem Sie Cloud-spezifische Capabilities wie `build` festlegen. Wenn Sie Cloud-Dienste nur in Travis ausführen möchten, können Sie die Umgebungsvariable `CI` verwenden, um zu prüfen, ob Sie sich in Travis befinden, und die Konfiguration entsprechend anpassen.

```js
// wdio.conf.js
export let config = {...}
if (process.env.CI) {
    config.user = process.env.SAUCE_USERNAME
    config.key = process.env.SAUCE_ACCESS_KEY
}
```

## Sauce Labs

Sie können Ihre Tests so einrichten, dass sie remote in [Sauce Labs](https://saucelabs.com) ausgeführt werden.

Die einzige Voraussetzung ist, `user` und `key` in Ihrer Konfiguration (entweder exportiert durch `wdio.conf.js` oder übergeben an `webdriverio.remote(...)`) auf Ihren Sauce Labs-Benutzernamen und Zugriffsschlüssel zu setzen.

Sie können außerdem jede optionale [Testkonfigurationsoption](https://docs.saucelabs.com/dev/test-configuration-options/) als Schlüssel/Wert-Paar in den Capabilities für jeden Browser übergeben.

### Sauce Connect

Wenn Sie Tests gegen einen Server ausführen möchten, der nicht über das Internet erreichbar ist (wie z. B. auf `localhost`), müssen Sie [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy) verwenden.

Die Unterstützung hierfür liegt außerhalb des Aufgabenbereichs von WebdriverIO, daher müssen Sie es selbst starten.

Wenn Sie den WDIO-Testrunner verwenden, laden Sie den [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) herunter und konfigurieren Sie ihn in Ihrer `wdio.conf.js`. Er hilft dabei, Sauce Connect zum Laufen zu bringen, und bietet zusätzliche Funktionen, die Ihre Tests besser in den Sauce-Dienst integrieren.

### Mit Travis CI

Travis CI bietet jedoch [Unterstützung](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect) für das Starten von Sauce Connect vor jedem Test, sodass es eine Option ist, deren Anweisungen dafür zu folgen.

Wenn Sie dies tun, müssen Sie die Testkonfigurationsoption `tunnel-identifier` in den `capabilities` jedes Browsers festlegen. Travis setzt diese standardmäßig auf die Umgebungsvariable `TRAVIS_JOB_NUMBER`.

Wenn Sie außerdem möchten, dass Sauce Labs Ihre Tests nach Build-Nummer gruppiert, können Sie `build` auf `TRAVIS_BUILD_NUMBER` setzen.

Wenn Sie schließlich `name` festlegen, ändert dies den Namen dieses Tests in Sauce Labs für diesen Build. Wenn Sie den WDIO-Testrunner in Kombination mit dem [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) verwenden, legt WebdriverIO automatisch einen passenden Namen für den Test fest.

Beispiel für `capabilities`:

```javascript
browserName: 'chrome',
version: '27.0',
platform: 'XP',
'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
name: 'integration',
build: process.env.TRAVIS_BUILD_NUMBER
```

### Timeouts

Da Sie Ihre Tests remote ausführen, kann es notwendig sein, einige Timeouts zu erhöhen.

Sie können den [Idle-Timeout](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout) ändern, indem Sie `idle-timeout` als Testkonfigurationsoption übergeben. Dieser legt fest, wie lange Sauce zwischen Befehlen wartet, bevor die Verbindung geschlossen wird.

## BrowserStack

WebdriverIO verfügt außerdem über eine integrierte [Browserstack](https://www.browserstack.com)-Integration.

Die einzige Voraussetzung ist, `user` und `key` in Ihrer Konfiguration (entweder exportiert durch `wdio.conf.js` oder übergeben an `webdriverio.remote(...)`) auf Ihren Browserstack Automate-Benutzernamen und Zugriffsschlüssel zu setzen.

Sie können außerdem jede optionale [unterstützte Capability](https://www.browserstack.com/automate/capabilities) als Schlüssel/Wert-Paar in den Capabilities für jeden Browser übergeben. Wenn Sie `browserstack.debug` auf `true` setzen, wird eine Bildschirmaufzeichnung der Sitzung erstellt, was hilfreich sein kann.

### Lokales Testen

Wenn Sie Tests gegen einen Server ausführen möchten, der nicht über das Internet erreichbar ist (wie z. B. auf `localhost`), müssen Sie [Local Testing](https://www.browserstack.com/local-testing#command-line) verwenden.

Die Unterstützung hierfür liegt außerhalb des Aufgabenbereichs von WebdriverIO, daher müssen Sie es selbst starten.

Wenn Sie Local verwenden, sollten Sie `browserstack.local` in Ihren Capabilities auf `true` setzen.

Wenn Sie den WDIO-Testrunner verwenden, laden Sie den [`@wdio/browserstack-service`](https://github.com/browserstack/wdio-browserstack-service) herunter und konfigurieren Sie ihn in Ihrer `wdio.conf.js`. Er hilft dabei, BrowserStack zum Laufen zu bringen, und bietet zusätzliche Funktionen, die Ihre Tests besser in den BrowserStack-Dienst integrieren.

### Mit Travis CI

Wenn Sie Local Testing in Travis hinzufügen möchten, müssen Sie es selbst starten.

Das folgende Skript lädt es herunter und startet es im Hintergrund. Sie sollten dies in Travis ausführen, bevor Sie die Tests starten.

```sh
wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip
unzip BrowserStackLocal-linux-x64.zip
./BrowserStackLocal -v -onlyAutomate -forcelocal $BROWSERSTACK_ACCESS_KEY &
sleep 3
```

Außerdem möchten Sie möglicherweise `build` auf die Travis-Build-Nummer setzen.

Beispiel für `capabilities`:

```javascript
browserName: 'chrome',
project: 'myApp',
version: '44.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'browserstack.local': 'true',
'browserstack.debug': 'true'
```

## TestingBot

Die einzige Voraussetzung ist, `user` und `key` in Ihrer Konfiguration (entweder exportiert durch `wdio.conf.js` oder übergeben an `webdriverio.remote(...)`) auf Ihren [TestingBot](https://testingbot.com)-Benutzernamen und geheimen Schlüssel zu setzen.

Sie können außerdem jede optionale [unterstützte Capability](https://testingbot.com/support/other/test-options) als Schlüssel/Wert-Paar in den Capabilities für jeden Browser übergeben.

### Lokales Testen

Wenn Sie Tests gegen einen Server ausführen möchten, der nicht über das Internet erreichbar ist (wie z. B. auf `localhost`), müssen Sie [Local Testing](https://testingbot.com/support/other/tunnel) verwenden. TestingBot stellt einen Java-basierten Tunnel bereit, mit dem Sie Websites testen können, die nicht über das Internet erreichbar sind.

Deren Support-Seite zum Tunnel enthält die notwendigen Informationen, um diesen einzurichten und zum Laufen zu bringen.

Wenn Sie den WDIO-Testrunner verwenden, laden Sie den [`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service) herunter und konfigurieren Sie ihn in Ihrer `wdio.conf.js`. Er hilft dabei, TestingBot zum Laufen zu bringen, und bietet zusätzliche Funktionen, die Ihre Tests besser in den TestingBot-Dienst integrieren.

## TestMu AI (ehemals LambdaTest)

Die [TestMu AI](https://www.testmuai.com/)-Integration ist ebenfalls integriert.

Die einzige Voraussetzung ist, `user` und `key` in Ihrer Konfiguration (entweder exportiert durch `wdio.conf.js` oder übergeben an `webdriverio.remote(...)`) auf den Benutzernamen und Zugriffsschlüssel Ihres TestMu AI-Kontos zu setzen.

Sie können außerdem jede optionale [unterstützte Capability](https://www.testmuai.com/capabilities-generator/) als Schlüssel/Wert-Paar in den Capabilities für jeden Browser übergeben. Wenn Sie `visual` auf `true` setzen, wird eine Bildschirmaufzeichnung der Sitzung erstellt, was hilfreich sein kann.

### Tunnel für lokales Testen

Wenn Sie Tests gegen einen Server ausführen möchten, der nicht über das Internet erreichbar ist (wie z. B. auf `localhost`), müssen Sie [Local Testing](https://www.testmuai.com/support/docs/testing-locally-hosted-pages/) verwenden.

Die Unterstützung hierfür liegt außerhalb des Aufgabenbereichs von WebdriverIO, daher müssen Sie es selbst starten.

Wenn Sie Local verwenden, sollten Sie `tunnel` in Ihren Capabilities auf `true` setzen.

Wenn Sie den WDIO-Testrunner verwenden, laden Sie den [`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service) herunter und konfigurieren Sie ihn in Ihrer `wdio.conf.js`. Er hilft dabei, TestMu AI zum Laufen zu bringen, und bietet zusätzliche Funktionen, die Ihre Tests besser in den TestMu AI-Dienst integrieren.

### Mit Travis CI

Wenn Sie Local Testing in Travis hinzufügen möchten, müssen Sie es selbst starten.

Das folgende Skript lädt es herunter und startet es im Hintergrund. Sie sollten dies in Travis ausführen, bevor Sie die Tests starten.

```sh
wget http://downloads.lambdatest.com/tunnel/linux/64bit/LT_Linux.zip
unzip LT_Linux.zip
./LT -user $LT_USERNAME -key $LT_ACCESS_KEY -cui &
sleep 3
```

Außerdem möchten Sie möglicherweise `build` auf die Travis-Build-Nummer setzen.

Beispiel für `capabilities`:

```javascript
platform: 'Windows 10',
browserName: 'chrome',
version: '79.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'tunnel': 'true',
'visual': 'true'
```

## Perfecto

Wenn Sie wdio mit [`Perfecto`](https://www.perfecto.io) verwenden, müssen Sie für jeden Benutzer ein Sicherheitstoken erstellen und dieses (zusätzlich zu anderen Capabilities) wie folgt in die Capabilities-Struktur einfügen:

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

Darüber hinaus müssen Sie die Cloud-Konfiguration wie folgt hinzufügen:

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```

## RobotActions

[RobotActions](https://robotactions.com) stellt echte Android- und iOS-Geräte zusammen mit Browser-Knoten hinter einem einzigen Endpunkt bereit. Die Authentifizierung erfolgt über ein API-Token statt über ein `user`- und `key`-Paar. Senden Sie das Token als Bearer-Header:

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

Alternativ können Sie das Token als Pfadpräfix übergeben, das vom Grid entfernt wird, bevor die Anfrage weitergeleitet wird:

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

Das Grid akzeptiert für andere WebDriver-Clients zusätzlich in die URL eingebettete Zugangsdaten (`https://user:token@host`), diese Form kann jedoch nicht mit WebdriverIO verwendet werden: WebdriverIO basiert auf fetch, und Node.js lehnt in URLs eingebettete Zugangsdaten ab.

Um Tests auf einem echten Gerät auszuführen, übergeben Sie den Browser als Appium-Capability zusammen mit einer der oben genannten Verbindungsarten:

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