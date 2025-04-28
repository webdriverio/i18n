---
id: cloudservices
title: Korzystanie z usług chmurowych
---

Korzystanie z usług na żądanie, takich jak Sauce Labs, Browserstack, TestingBot, LambdaTest lub Perfecto z WebdriverIO jest bardzo proste. Wszystko, co musisz zrobić, to ustawić `user` i `key` swojej usługi w opcjach.

Opcjonalnie możesz również sparametryzować swój test, ustawiając możliwości specyficzne dla chmury, takie jak `build`. Jeśli chcesz uruchamiać usługi chmurowe tylko w Travis, możesz użyć zmiennej środowiskowej `CI`, aby sprawdzić, czy jesteś w Travis i odpowiednio zmodyfikować konfigurację.

```js
// wdio.conf.js
export let config = {...}
if (process.env.CI) {
    config.user = process.env.SAUCE_USERNAME
    config.key = process.env.SAUCE_ACCESS_KEY
}
```

## Sauce Labs

Możesz skonfigurować swoje testy do zdalnego uruchamiania w [Sauce Labs](https://saucelabs.com).

Jedynym wymaganiem jest ustawienie `user` i `key` w konfiguracji (eksportowanej przez `wdio.conf.js` lub przekazanej do `webdriverio.remote(...)`) na swoją nazwę użytkownika i klucz dostępu do Sauce Labs.

Możesz również przekazać dowolną opcjonalną [opcję konfiguracji testu](https://docs.saucelabs.com/dev/test-configuration-options/) jako klucz/wartość w możliwościach dla dowolnej przeglądarki.

### Sauce Connect

Jeśli chcesz uruchamiać testy na serwerze, który nie jest dostępny dla Internetu (np. na `localhost`), musisz użyć [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy).

Jest to poza zakresem WebdriverIO, więc będziesz musiał uruchomić to samodzielnie.

Jeśli używasz testera WDIO, pobierz i skonfiguruj [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) w swoim pliku `wdio.conf.js`. Pomaga to uruchomić Sauce Connect i zawiera dodatkowe funkcje, które lepiej integrują twoje testy z usługą Sauce.

### Z Travis CI

Travis CI jednak [ma wsparcie](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect) dla uruchamiania Sauce Connect przed każdym testem, więc postępowanie zgodnie z ich instrukcjami jest opcją.

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

Ponieważ uruchamiasz swoje testy zdalnie, może być konieczne zwiększenie niektórych limitów czasu.

Możesz zmienić [limit czasu bezczynności](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout), przekazując `idle-timeout` jako opcję konfiguracji testu. Kontroluje to, jak długo Sauce będzie czekać między poleceniami przed zamknięciem połączenia.

## BrowserStack

WebdriverIO ma również wbudowaną integrację z [Browserstack](https://www.browserstack.com).

Jedynym wymaganiem jest ustawienie `user` i `key` w konfiguracji (eksportowanej przez `wdio.conf.js` lub przekazanej do `webdriverio.remote(...)`) na swoją nazwę użytkownika i klucz dostępu do automatyzacji Browserstack.

Możesz również przekazać dowolne opcjonalne [obsługiwane możliwości](https://www.browserstack.com/automate/capabilities) jako klucz/wartość w możliwościach dla dowolnej przeglądarki. Jeśli ustawisz `browserstack.debug` na `true`, sesja zostanie nagrana, co może być pomocne.

### Testowanie lokalne

Jeśli chcesz uruchamiać testy na serwerze, który nie jest dostępny dla Internetu (np. na `localhost`), musisz użyć [Local Testing](https://www.browserstack.com/local-testing#command-line).

Jest to poza zakresem WebdriverIO, więc musisz uruchomić to samodzielnie.

Jeśli używasz lokalnego, powinieneś ustawić `browserstack.local` na `true` w swoich możliwościach.

Jeśli używasz testera WDIO, pobierz i skonfiguruj [`@wdio/browserstack-service`](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-browserstack-service) w swoim pliku `wdio.conf.js`. Pomaga to uruchomić BrowserStack i zawiera dodatkowe funkcje, które lepiej integrują twoje testy z usługą BrowserStack.

### Z Travis CI

Jeśli chcesz dodać testowanie lokalne w Travis, musisz uruchomić je samodzielnie.

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

Jedynym wymaganiem jest ustawienie `user` i `key` w konfiguracji (eksportowanej przez `wdio.conf.js` lub przekazanej do `webdriverio.remote(...)`) na swoją nazwę użytkownika i tajny klucz [TestingBot](https://testingbot.com).

Możesz również przekazać dowolne opcjonalne [obsługiwane możliwości](https://testingbot.com/support/other/test-options) jako klucz/wartość w możliwościach dla dowolnej przeglądarki.

### Testowanie lokalne

Jeśli chcesz uruchamiać testy na serwerze, który nie jest dostępny dla Internetu (np. na `localhost`), musisz użyć [Local Testing](https://testingbot.com/support/other/tunnel). TestingBot zapewnia tunel oparty na Javie, który pozwala na testowanie stron internetowych niedostępnych z internetu.

Ich strona wsparcia tunelu zawiera informacje niezbędne do uruchomienia.

Jeśli używasz testera WDIO, pobierz i skonfiguruj [`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service) w swoim pliku `wdio.conf.js`. Pomaga to uruchomić TestingBot i zawiera dodatkowe funkcje, które lepiej integrują twoje testy z usługą TestingBot.

## LambdaTest

Integracja [LambdaTest](https://www.lambdatest.com) jest również wbudowana.

Jedynym wymaganiem jest ustawienie `user` i `key` w konfiguracji (eksportowanej przez `wdio.conf.js` lub przekazanej do `webdriverio.remote(...)`) na swoją nazwę użytkownika i klucz dostępu do konta LambdaTest.

Możesz również przekazać dowolne opcjonalne [obsługiwane możliwości](https://www.lambdatest.com/capabilities-generator/) jako klucz/wartość w możliwościach dla dowolnej przeglądarki. Jeśli ustawisz `visual` na `true`, sesja zostanie nagrana, co może być pomocne.

### Tunel do testowania lokalnego

Jeśli chcesz uruchamiać testy na serwerze, który nie jest dostępny dla Internetu (np. na `localhost`), musisz użyć [Local Testing](https://www.lambdatest.com/support/docs/testing-locally-hosted-pages/).

Jest to poza zakresem WebdriverIO, więc musisz uruchomić to samodzielnie.

Jeśli używasz lokalnego, powinieneś ustawić `tunnel` na `true` w swoich możliwościach.

Jeśli używasz testera WDIO, pobierz i skonfiguruj [`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service) w swoim pliku `wdio.conf.js`. Pomaga to uruchomić LambdaTest i zawiera dodatkowe funkcje, które lepiej integrują twoje testy z usługą LambdaTest.

### Z Travis CI

Jeśli chcesz dodać testowanie lokalne w Travis, musisz uruchomić je samodzielnie.

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

Podczas korzystania z wdio z [`Perfecto`](https://www.perfecto.io), musisz utworzyć token bezpieczeństwa dla każdego użytkownika i dodać go do struktury możliwości (oprócz innych możliwości), w następujący sposób:

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

Dodatkowo, musisz dodać konfigurację chmury, w następujący sposób:

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```