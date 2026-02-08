---
id: cloudservices
title: Korzystanie z Usług Chmurowych
---

Korzystanie z usług na żądanie, takich jak Sauce Labs, Browserstack, TestingBot, TestMu AI (dawniej LambdaTest) lub Perfecto z WebdriverIO jest dość proste. Wszystko, co musisz zrobić, to ustawić `user` i `key` swojej usługi w opcjach.

Opcjonalnie możesz również sparametryzować swój test, ustawiając zdolności specyficzne dla chmury, takie jak `build`. Jeśli chcesz uruchamiać usługi chmurowe tylko w Travis, możesz użyć zmiennej środowiskowej `CI` do sprawdzenia, czy jesteś w Travis i odpowiednio zmodyfikować konfigurację.

```js
// wdio.conf.js
export let config = {...}
if (process.env.CI) {
    config.user = process.env.SAUCE_USERNAME
    config.key = process.env.SAUCE_ACCESS_KEY
}
```

## Sauce Labs

Możesz skonfigurować swoje testy, aby były uruchamiane zdalnie w [Sauce Labs](https://saucelabs.com).

Jedynym wymaganiem jest ustawienie `user` i `key` w konfiguracji (eksportowanych przez `wdio.conf.js` lub przekazanych do `webdriverio.remote(...)`) na swoją nazwę użytkownika Sauce Labs i klucz dostępu.

Możesz również przekazać dowolną opcjonalną [opcję konfiguracji testu](https://docs.saucelabs.com/dev/test-configuration-options/) jako klucz/wartość w capabilities dla dowolnej przeglądarki.

### Sauce Connect

Jeśli chcesz uruchamiać testy przeciwko serwerowi, który nie jest dostępny w Internecie (np. na `localhost`), musisz użyć [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy).

Wykracza to poza zakres WebdriverIO, więc będziesz musiał uruchomić go samodzielnie.

Jeśli używasz testera WDIO, pobierz i skonfiguruj [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) w swoim `wdio.conf.js`. Pomoże to uruchomić Sauce Connect i zawiera dodatkowe funkcje, które lepiej integrują twoje testy z usługą Sauce.

### Z Travis CI

Travis CI jednak [obsługuje](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect) uruchamianie Sauce Connect przed każdym testem, więc śledzenie ich instrukcji jest opcją.

Jeśli to zrobisz, musisz ustawić opcję konfiguracji testu `tunnel-identifier` w `capabilities` każdej przeglądarki. Travis domyślnie ustawia to na zmienną środowiskową `TRAVIS_JOB_NUMBER`.

Ponadto, jeśli chcesz, aby Sauce Labs grupował twoje testy według numeru kompilacji, możesz ustawić `build` na `TRAVIS_BUILD_NUMBER`.

Na koniec, jeśli ustawisz `name`, zmienia to nazwę tego testu w Sauce Labs dla tej kompilacji. Jeśli używasz testera WDIO w połączeniu z [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service), WebdriverIO automatycznie ustawia odpowiednią nazwę dla testu.

Przykład `capabilities`:

```javascript
browserName: 'chrome',
version: '27.0',
platform: 'XP',
'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
name: 'integration',
build: process.env.TRAVIS_BUILD_NUMBER
```

### Limity czasu

Ponieważ uruchamiasz testy zdalnie, może być konieczne zwiększenie niektórych limitów czasowych.

Możesz zmienić [limit czasu bezczynności](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout) przekazując `idle-timeout` jako opcję konfiguracji testu. Określa to, jak długo Sauce będzie czekać między poleceniami, zanim zamknie połączenie.

## BrowserStack

WebdriverIO ma również wbudowaną integrację z [Browserstack](https://www.browserstack.com).

Jedynym wymaganiem jest ustawienie `user` i `key` w konfiguracji (eksportowanych przez `wdio.conf.js` lub przekazanych do `webdriverio.remote(...)`) na swoją nazwę użytkownika Browserstack automate i klucz dostępu.

Możesz również przekazać dowolne opcjonalne [obsługiwane zdolności](https://www.browserstack.com/automate/capabilities) jako klucz/wartość w capabilities dla dowolnej przeglądarki. Jeśli ustawisz `browserstack.debug` na `true`, nagra screencast sesji, co może być pomocne.

### Testy lokalne

Jeśli chcesz uruchamiać testy przeciwko serwerowi, który nie jest dostępny w Internecie (np. na `localhost`), musisz użyć [Local Testing](https://www.browserstack.com/local-testing#command-line).

Wykracza to poza zakres WebdriverIO, więc musisz uruchomić go samodzielnie.

Jeśli używasz lokalnie, powinieneś ustawić `browserstack.local` na `true` w swoich capabilities.

Jeśli używasz testera WDIO, pobierz i skonfiguruj [`@wdio/browserstack-service`](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-browserstack-service) w swoim `wdio.conf.js`. Pomoże to uruchomić BrowserStack i zawiera dodatkowe funkcje, które lepiej integrują twoje testy z usługą BrowserStack.

### Z Travis CI

Jeśli chcesz dodać Local Testing w Travis, musisz uruchomić go samodzielnie.

Poniższy skrypt pobierze i uruchomi go w tle. Powinieneś uruchomić to w Travis przed rozpoczęciem testów.

```sh
wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip
unzip BrowserStackLocal-linux-x64.zip
./BrowserStackLocal -v -onlyAutomate -forcelocal $BROWSERSTACK_ACCESS_KEY &
sleep 3
```

Ponadto, możesz chcieć ustawić `build` na numer kompilacji Travis.

Przykład `capabilities`:

```javascript
browserName: 'chrome',
project: 'myApp',
version: '44.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'browserstack.local': 'true',
'browserstack.debug': 'true'
```

## TestingBot

Jedynym wymaganiem jest ustawienie `user` i `key` w konfiguracji (eksportowanych przez `wdio.conf.js` lub przekazanych do `webdriverio.remote(...)`) na swoją nazwę użytkownika [TestingBot](https://testingbot.com) i tajny klucz.

Możesz również przekazać dowolne opcjonalne [obsługiwane zdolności](https://testingbot.com/support/other/test-options) jako klucz/wartość w capabilities dla dowolnej przeglądarki.

### Testy lokalne

Jeśli chcesz uruchamiać testy przeciwko serwerowi, który nie jest dostępny w Internecie (np. na `localhost`), musisz użyć [Local Testing](https://testingbot.com/support/other/tunnel). TestingBot zapewnia tunel oparty na Javie, aby umożliwić testowanie stron internetowych niedostępnych z Internetu.

Ich strona wsparcia tunelu zawiera informacje niezbędne do uruchomienia tego.

Jeśli używasz testera WDIO, pobierz i skonfiguruj [`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service) w swoim `wdio.conf.js`. Pomoże to uruchomić TestingBot i zawiera dodatkowe funkcje, które lepiej integrują twoje testy z usługą TestingBot.

## TestMu AI (dawniej LambdaTest)

Integracja z [TestMu AI](https://www.testmuai.com/) jest również wbudowana.

Jedynym wymaganiem jest ustawienie `user` i `key` w konfiguracji (eksportowanych przez `wdio.conf.js` lub przekazanych do `webdriverio.remote(...)`) na nazwę użytkownika i klucz dostępu do konta TestMu AI.

Możesz również przekazać dowolne opcjonalne [obsługiwane zdolności](https://www.testmuai.com/capabilities-generator/) jako klucz/wartość w capabilities dla dowolnej przeglądarki. Jeśli ustawisz `visual` na `true`, nagra screencast sesji, co może być pomocne.

### Tunel do testów lokalnych

Jeśli chcesz uruchamiać testy przeciwko serwerowi, który nie jest dostępny w Internecie (np. na `localhost`), musisz użyć [Local Testing](https://www.testmuai.com/support/docs/testing-locally-hosted-pages/).

Wykracza to poza zakres WebdriverIO, więc musisz uruchomić go samodzielnie.

Jeśli używasz lokalnie, powinieneś ustawić `tunnel` na `true` w swoich capabilities.

Jeśli używasz testera WDIO, pobierz i skonfiguruj [`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service) w swoim `wdio.conf.js`. Pomoże to uruchomić TestMu AI i zawiera dodatkowe funkcje, które lepiej integrują twoje testy z usługą TestMu AI.

### Z Travis CI

Jeśli chcesz dodać Local Testing w Travis, musisz uruchomić go samodzielnie.

Poniższy skrypt pobierze i uruchomi go w tle. Powinieneś uruchomić to w Travis przed rozpoczęciem testów.

```sh
wget http://downloads.lambdatest.com/tunnel/linux/64bit/LT_Linux.zip
unzip LT_Linux.zip
./LT -user $LT_USERNAME -key $LT_ACCESS_KEY -cui &
sleep 3
```

Ponadto, możesz chcieć ustawić `build` na numer kompilacji Travis.

Przykład `capabilities`:

```javascript
platform: 'Windows 10',
browserName: 'chrome',
version: '79.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'tunnel': 'true',
'visual': 'true'
```

## Perfecto

Podczas korzystania z wdio z [`Perfecto`](https://www.perfecto.io) musisz utworzyć token bezpieczeństwa dla każdego użytkownika i dodać go w strukturze capabilities (oprócz innych zdolności), w następujący sposób:

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

Dodatkowo musisz dodać konfigurację chmury, jak poniżej:

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```