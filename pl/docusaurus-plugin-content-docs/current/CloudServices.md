---
id: cloudservices
title: Korzystanie z usług chmurowych
description: "Uruchamiaj testy WebdriverIO na Sauce Labs, BrowserStack, TestingBot, TestMu AI (dawniej LambdaTest), Perfecto i u innych dostawców chmurowych."
---

Korzystanie z usług na żądanie, takich jak Sauce Labs, Browserstack, TestingBot, TestMu AI (dawniej LambdaTest) czy Perfecto, z WebdriverIO jest dość proste. Wystarczy, że ustawisz `user` i `key` swojej usługi w opcjach.

Opcjonalnie możesz również sparametryzować swój test, ustawiając capabilities specyficzne dla chmury, takie jak `build`. Jeśli chcesz uruchamiać usługi chmurowe tylko w Travis, możesz użyć zmiennej środowiskowej `CI`, aby sprawdzić, czy jesteś w Travis, i odpowiednio zmodyfikować konfigurację.

```js
// wdio.conf.js
export let config = {...}
if (process.env.CI) {
    config.user = process.env.SAUCE_USERNAME
    config.key = process.env.SAUCE_ACCESS_KEY
}
```

## Sauce Labs

Możesz skonfigurować swoje testy tak, aby uruchamiały się zdalnie w [Sauce Labs](https://saucelabs.com).

Jedynym wymaganiem jest ustawienie w konfiguracji (eksportowanej przez `wdio.conf.js` lub przekazanej do `webdriverio.remote(...)`) wartości `user` i `key` na Twoją nazwę użytkownika i klucz dostępu Sauce Labs.

Możesz również przekazać dowolną opcjonalną [opcję konfiguracji testu](https://docs.saucelabs.com/dev/test-configuration-options/) jako parę klucz/wartość w capabilities dla dowolnej przeglądarki.

### Sauce Connect

Jeśli chcesz uruchamiać testy na serwerze, który nie jest dostępny z Internetu (np. na `localhost`), musisz użyć [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy).

Obsługa tego wykracza poza zakres WebdriverIO, więc musisz uruchomić go samodzielnie.

Jeśli używasz testrunnera WDIO, pobierz i skonfiguruj [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) w swoim `wdio.conf.js`. Pomaga on uruchomić Sauce Connect i oferuje dodatkowe funkcje, które lepiej integrują Twoje testy z usługą Sauce.

### Z Travis CI

Travis CI [obsługuje](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect) jednak uruchamianie Sauce Connect przed każdym testem, więc postępowanie zgodnie z ich instrukcjami jest jedną z opcji.

Jeśli to zrobisz, musisz ustawić opcję konfiguracji testu `tunnel-identifier` w `capabilities` każdej przeglądarki. Travis domyślnie ustawia ją na zmienną środowiskową `TRAVIS_JOB_NUMBER`.

Ponadto, jeśli chcesz, aby Sauce Labs grupował Twoje testy według numeru buildu, możesz ustawić `build` na `TRAVIS_BUILD_NUMBER`.

Na koniec, jeśli ustawisz `name`, zmieni to nazwę tego testu w Sauce Labs dla tego buildu. Jeśli używasz testrunnera WDIO w połączeniu z [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service), WebdriverIO automatycznie ustawia odpowiednią nazwę testu.

Przykładowe `capabilities`:

```javascript
browserName: 'chrome',
version: '27.0',
platform: 'XP',
'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
name: 'integration',
build: process.env.TRAVIS_BUILD_NUMBER
```

### Limity czasu

Ponieważ uruchamiasz testy zdalnie, może być konieczne zwiększenie niektórych limitów czasu.

Możesz zmienić [limit czasu bezczynności](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout), przekazując `idle-timeout` jako opcję konfiguracji testu. Określa to, jak długo Sauce będzie czekać między poleceniami przed zamknięciem połączenia.

## BrowserStack

WebdriverIO ma również wbudowaną integrację z [Browserstack](https://www.browserstack.com).

Jedynym wymaganiem jest ustawienie w konfiguracji (eksportowanej przez `wdio.conf.js` lub przekazanej do `webdriverio.remote(...)`) wartości `user` i `key` na Twoją nazwę użytkownika i klucz dostępu Browserstack Automate.

Możesz również przekazać dowolne opcjonalne [obsługiwane capabilities](https://www.browserstack.com/automate/capabilities) jako parę klucz/wartość w capabilities dla dowolnej przeglądarki. Jeśli ustawisz `browserstack.debug` na `true`, zostanie nagrany screencast sesji, co może być pomocne.

### Testowanie lokalne

Jeśli chcesz uruchamiać testy na serwerze, który nie jest dostępny z Internetu (np. na `localhost`), musisz użyć [Local Testing](https://www.browserstack.com/local-testing#command-line).

Obsługa tego wykracza poza zakres WebdriverIO, więc musisz uruchomić go samodzielnie.

Jeśli korzystasz z trybu lokalnego, powinieneś ustawić `browserstack.local` na `true` w swoich capabilities.

Jeśli używasz testrunnera WDIO, pobierz i skonfiguruj [`@wdio/browserstack-service`](https://github.com/browserstack/wdio-browserstack-service) w swoim `wdio.conf.js`. Pomaga on uruchomić BrowserStack i oferuje dodatkowe funkcje, które lepiej integrują Twoje testy z usługą BrowserStack.

### Z Travis CI

Jeśli chcesz dodać Local Testing w Travis, musisz uruchomić go samodzielnie.

Poniższy skrypt pobierze go i uruchomi w tle. Powinieneś uruchomić go w Travis przed rozpoczęciem testów.

```sh
wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip
unzip BrowserStackLocal-linux-x64.zip
./BrowserStackLocal -v -onlyAutomate -forcelocal $BROWSERSTACK_ACCESS_KEY &
sleep 3
```

Możesz również chcieć ustawić `build` na numer buildu Travis.

Przykładowe `capabilities`:

```javascript
browserName: 'chrome',
project: 'myApp',
version: '44.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'browserstack.local': 'true',
'browserstack.debug': 'true'
```

## TestingBot

Jedynym wymaganiem jest ustawienie w konfiguracji (eksportowanej przez `wdio.conf.js` lub przekazanej do `webdriverio.remote(...)`) wartości `user` i `key` na Twoją nazwę użytkownika i tajny klucz [TestingBot](https://testingbot.com).

Możesz również przekazać dowolne opcjonalne [obsługiwane capabilities](https://testingbot.com/support/other/test-options) jako parę klucz/wartość w capabilities dla dowolnej przeglądarki.

### Testowanie lokalne

Jeśli chcesz uruchamiać testy na serwerze, który nie jest dostępny z Internetu (np. na `localhost`), musisz użyć [Local Testing](https://testingbot.com/support/other/tunnel). TestingBot udostępnia tunel oparty na Javie, który pozwala testować strony niedostępne z Internetu.

Ich strona pomocy dotycząca tunelu zawiera informacje niezbędne do jego uruchomienia.

Jeśli używasz testrunnera WDIO, pobierz i skonfiguruj [`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service) w swoim `wdio.conf.js`. Pomaga on uruchomić TestingBot i oferuje dodatkowe funkcje, które lepiej integrują Twoje testy z usługą TestingBot.

## TestMu AI (dawniej LambdaTest)

Integracja z [TestMu AI](https://www.testmuai.com/) jest również wbudowana.

Jedynym wymaganiem jest ustawienie w konfiguracji (eksportowanej przez `wdio.conf.js` lub przekazanej do `webdriverio.remote(...)`) wartości `user` i `key` na nazwę użytkownika i klucz dostępu Twojego konta TestMu AI.

Możesz również przekazać dowolne opcjonalne [obsługiwane capabilities](https://www.testmuai.com/capabilities-generator/) jako parę klucz/wartość w capabilities dla dowolnej przeglądarki. Jeśli ustawisz `visual` na `true`, zostanie nagrany screencast sesji, co może być pomocne.

### Tunel do testowania lokalnego

Jeśli chcesz uruchamiać testy na serwerze, który nie jest dostępny z Internetu (np. na `localhost`), musisz użyć [Local Testing](https://www.testmuai.com/support/docs/testing-locally-hosted-pages/).

Obsługa tego wykracza poza zakres WebdriverIO, więc musisz uruchomić go samodzielnie.

Jeśli korzystasz z trybu lokalnego, powinieneś ustawić `tunnel` na `true` w swoich capabilities.

Jeśli używasz testrunnera WDIO, pobierz i skonfiguruj [`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service) w swoim `wdio.conf.js`. Pomaga on uruchomić TestMu AI i oferuje dodatkowe funkcje, które lepiej integrują Twoje testy z usługą TestMu AI.

### Z Travis CI

Jeśli chcesz dodać Local Testing w Travis, musisz uruchomić go samodzielnie.

Poniższy skrypt pobierze go i uruchomi w tle. Powinieneś uruchomić go w Travis przed rozpoczęciem testów.

```sh
wget http://downloads.lambdatest.com/tunnel/linux/64bit/LT_Linux.zip
unzip LT_Linux.zip
./LT -user $LT_USERNAME -key $LT_ACCESS_KEY -cui &
sleep 3
```

Możesz również chcieć ustawić `build` na numer buildu Travis.

Przykładowe `capabilities`:

```javascript
platform: 'Windows 10',
browserName: 'chrome',
version: '79.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'tunnel': 'true',
'visual': 'true'
```

## Perfecto

Korzystając z wdio z [`Perfecto`](https://www.perfecto.io), musisz utworzyć token bezpieczeństwa dla każdego użytkownika i dodać go do struktury capabilities (oprócz innych capabilities) w następujący sposób:

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

Ponadto musisz dodać konfigurację chmury w następujący sposób:

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```

## RobotActions

[RobotActions](https://robotactions.com) udostępnia prawdziwe urządzenia z systemami Android i iOS oraz węzły przeglądarek za pojedynczym endpointem. Uwierzytelnianie odbywa się za pomocą tokenu API zamiast pary `user` i `key`. Wyślij token jako nagłówek bearer:

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

Alternatywnie przekaż token jako prefiks ścieżki, który grid usuwa przed przekazaniem żądania dalej:

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

Grid akceptuje również dane uwierzytelniające osadzone w adresie URL (`https://user:token@host`) dla innych klientów WebDriver, ale tej formy nie można używać z WebdriverIO: opiera się on na fetch, a Node.js odrzuca dane uwierzytelniające osadzone w adresie URL.

Aby uruchomić testy na prawdziwym urządzeniu, przekaż przeglądarkę jako capability Appium wraz z jednym z powyższych sposobów połączenia:

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