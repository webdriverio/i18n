---
id: cloudservices
title: Verwendung von Cloud-Diensten
---

Die Verwendung von On-Demand-Diensten wie Sauce Labs, Browserstack, TestingBot, LambdaTest oder Perfecto mit WebdriverIO ist ziemlich einfach. Alles, was Sie tun müssen, ist, Ihren `user` und `key` des Dienstes in Ihren Optionen festzulegen.

Optional können Sie Ihre Tests auch parametrisieren, indem Sie Cloud-spezifische Capabilities wie `build` festlegen. Wenn Sie Cloud-Dienste nur in Travis ausführen möchten, können Sie die Umgebungsvariable `CI` verwenden, um zu prüfen, ob Sie sich in Travis befinden, und die Konfiguration entsprechend anpassen.

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

Die einzige Voraussetzung ist, dass Sie `user` und `key` in Ihrer Konfiguration (entweder exportiert von `wdio.conf.js` oder übergeben an `webdriverio.remote(...)`) auf Ihren Sauce Labs-Benutzernamen und Zugriffsschlüssel setzen.

Sie können auch jede optionale [Testkonfigurationsoption](https://docs.saucelabs.com/dev/test-configuration-options/) als Schlüssel/Wert in den Capabilities für jeden Browser übergeben.

### Sauce Connect

Wenn Sie Tests gegen einen Server ausführen möchten, der nicht über das Internet zugänglich ist (wie auf `localhost`), dann müssen Sie [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy) verwenden.

Es liegt außerhalb des Umfangs von WebdriverIO, dies zu unterstützen, daher müssen Sie es selbst starten.

Wenn Sie den WDIO-Testrunner verwenden, laden Sie den [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) herunter und konfigurieren Sie ihn in Ihrer `wdio.conf.js`. Er hilft dabei, Sauce Connect zum Laufen zu bringen und bietet zusätzliche Funktionen, die Ihre Tests besser in den Sauce-Dienst integrieren.

### Mit Travis CI

Travis CI hat jedoch [Unterstützung](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect) für das Starten von Sauce Connect vor jedem Test, daher ist es eine Option, deren Anweisungen zu befolgen.

Wenn Sie dies tun, müssen Sie die Testkonfigurationsoption `tunnel-identifier` in den `capabilities` jedes Browsers festlegen. Travis setzt dies standardmäßig auf die Umgebungsvariable `TRAVIS_JOB_NUMBER`.

Wenn Sie möchten, dass Sauce Labs Ihre Tests nach Build-Nummer gruppiert, können Sie `build` auf `TRAVIS_BUILD_NUMBER` setzen.

Wenn Sie `name` festlegen, ändert dies den Namen dieses Tests in Sauce Labs für diesen Build. Wenn Sie den WDIO-Testrunner in Kombination mit dem [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) verwenden, setzt WebdriverIO automatisch einen passenden Namen für den Test.

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

Sie können das [Idle-Timeout](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout) ändern, indem Sie `idle-timeout` als Testkonfigurationsoption übergeben. Dies steuert, wie lange Sauce zwischen Befehlen wartet, bevor die Verbindung geschlossen wird.

## BrowserStack

WebdriverIO hat auch eine integrierte [Browserstack](https://www.browserstack.com)-Integration.

Die einzige Voraussetzung ist, dass Sie `user` und `key` in Ihrer Konfiguration (entweder exportiert von `wdio.conf.js` oder übergeben an `webdriverio.remote(...)`) auf Ihren Browserstack-Automatisierungsbenutzernamen und Zugriffsschlüssel setzen.

Sie können auch jede optionale [unterstützte Capability](https://www.browserstack.com/automate/capabilities) als Schlüssel/Wert in den Capabilities für jeden Browser übergeben. Wenn Sie `browserstack.debug` auf `true` setzen, wird ein Screencast der Sitzung aufgezeichnet, was hilfreich sein kann.

### Lokales Testen

Wenn Sie Tests gegen einen Server ausführen möchten, der nicht über das Internet zugänglich ist (wie auf `localhost`), dann müssen Sie [Local Testing](https://www.browserstack.com/local-testing#command-line) verwenden.

Es liegt außerhalb des Umfangs von WebdriverIO, dies zu unterstützen, daher müssen Sie es selbst starten.

Wenn Sie Local verwenden, sollten Sie `browserstack.local` in Ihren Capabilities auf `true` setzen.

Wenn Sie den WDIO-Testrunner verwenden, laden Sie den [`@wdio/browserstack-service`](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-browserstack-service) herunter und konfigurieren Sie ihn in Ihrer `wdio.conf.js`. Er hilft dabei, BrowserStack zum Laufen zu bringen und bietet zusätzliche Funktionen, die Ihre Tests besser in den BrowserStack-Dienst integrieren.

### Mit Travis CI

Wenn Sie Local Testing in Travis hinzufügen möchten, müssen Sie es selbst starten.

Das folgende Skript lädt es herunter und startet es im Hintergrund. Sie sollten dies in Travis ausführen, bevor Sie die Tests starten.

```sh
wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip
unzip BrowserStackLocal-linux-x64.zip
./BrowserStackLocal -v -onlyAutomate -forcelocal $BROWSERSTACK_ACCESS_KEY &
sleep 3
```

Außerdem möchten Sie vielleicht `build` auf die Travis-Build-Nummer setzen.

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

Die einzige Voraussetzung ist, dass Sie `user` und `key` in Ihrer Konfiguration (entweder exportiert von `wdio.conf.js` oder übergeben an `webdriverio.remote(...)`) auf Ihren [TestingBot](https://testingbot.com)-Benutzernamen und geheimen Schlüssel setzen.

Sie können auch jede optionale [unterstützte Capability](https://testingbot.com/support/other/test-options) als Schlüssel/Wert in den Capabilities für jeden Browser übergeben.

### Lokales Testen

Wenn Sie Tests gegen einen Server ausführen möchten, der nicht über das Internet zugänglich ist (wie auf `localhost`), dann müssen Sie [Local Testing](https://testingbot.com/support/other/tunnel) verwenden. TestingBot bietet einen Java-basierten Tunnel, mit dem Sie Websites testen können, die nicht über das Internet zugänglich sind.

Ihre Tunnel-Support-Seite enthält die notwendigen Informationen, um dies zum Laufen zu bringen.

Wenn Sie den WDIO-Testrunner verwenden, laden Sie den [`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service) herunter und konfigurieren Sie ihn in Ihrer `wdio.conf.js`. Er hilft dabei, TestingBot zum Laufen zu bringen und bietet zusätzliche Funktionen, die Ihre Tests besser in den TestingBot-Dienst integrieren.

## LambdaTest

Die [LambdaTest](https://www.lambdatest.com)-Integration ist ebenfalls integriert.

Die einzige Voraussetzung ist, dass Sie `user` und `key` in Ihrer Konfiguration (entweder exportiert von `wdio.conf.js` oder übergeben an `webdriverio.remote(...)`) auf Ihren LambdaTest-Kontobenutzernamen und Zugriffsschlüssel setzen.

Sie können auch jede optionale [unterstützte Capability](https://www.lambdatest.com/capabilities-generator/) als Schlüssel/Wert in den Capabilities für jeden Browser übergeben. Wenn Sie `visual` auf `true` setzen, wird ein Screencast der Sitzung aufgezeichnet, was hilfreich sein kann.

### Tunnel für lokales Testen

Wenn Sie Tests gegen einen Server ausführen möchten, der nicht über das Internet zugänglich ist (wie auf `localhost`), dann müssen Sie [Local Testing](https://www.lambdatest.com/support/docs/testing-locally-hosted-pages/) verwenden.

Es liegt außerhalb des Umfangs von WebdriverIO, dies zu unterstützen, daher müssen Sie es selbst starten.

Wenn Sie Local verwenden, sollten Sie `tunnel` in Ihren Capabilities auf `true` setzen.

Wenn Sie den WDIO-Testrunner verwenden, laden Sie den [`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service) herunter und konfigurieren Sie ihn in Ihrer `wdio.conf.js`. Er hilft dabei, LambdaTest zum Laufen zu bringen und bietet zusätzliche Funktionen, die Ihre Tests besser in den LambdaTest-Dienst integrieren.

### Mit Travis CI

Wenn Sie Local Testing in Travis hinzufügen möchten, müssen Sie es selbst starten.

Das folgende Skript lädt es herunter und startet es im Hintergrund. Sie sollten dies in Travis ausführen, bevor Sie die Tests starten.

```sh
wget http://downloads.lambdatest.com/tunnel/linux/64bit/LT_Linux.zip
unzip LT_Linux.zip
./LT -user $LT_USERNAME -key $LT_ACCESS_KEY -cui &
sleep 3
```

Außerdem möchten Sie vielleicht `build` auf die Travis-Build-Nummer setzen.

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

Bei der Verwendung von wdio mit [`Perfecto`](https://www.perfecto.io) müssen Sie für jeden Benutzer ein Sicherheitstoken erstellen und dieses in die Capabilities-Struktur einfügen (zusätzlich zu anderen Capabilities), wie folgt:

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

Darüber hinaus müssen Sie die Cloud-Konfiguration hinzufügen, wie folgt:

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```