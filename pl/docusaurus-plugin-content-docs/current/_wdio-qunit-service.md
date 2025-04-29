---
id: wdio-qunit-service
title: Usługa QUnit
custom_edit_url: https://github.com/mauriciolauffer/wdio-qunit-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-qunit-service jest pakietem zewnętrznym, więcej informacji znajdziesz na [GitHub](https://github.com/mauriciolauffer/wdio-qunit-service) | [npm](https://www.npmjs.com/package/wdio-qunit-service)

[![npm](https://img.shields.io/npm/v/wdio-qunit-service)](https://www.npmjs.com/package/wdio-qunit-service) [![test](https://github.com/mauriciolauffer/wdio-qunit-service/actions/workflows/test.yml/badge.svg)](https://github.com/mauriciolauffer/wdio-qunit-service/actions/workflows/test.yml)

[WebdriverIO](https://webdriver.io/) (wdio) usługa do uruchamiania testów przeglądarkowych [QUnit](https://qunitjs.com/) i dynamicznego konwertowania ich na zestawy testów `wdio`.

## Zastępowanie Karma

`QUnit Service` jest zamiennym rozwiązaniem dla tych, którzy używają [Karma JS](https://karma-runner.github.io/latest/index.html) do uruchamiania swoich testów `QUnit` ([karma-qunit](https://github.com/karma-runner/karma-qunit/), [karma-ui5](https://github.com/SAP/karma-ui5) lub dowolnej innej kombinacji Karma i QUnit). Karma jest [przestarzała](https://github.com/karma-runner/karma) i ludzie powinni przejść na nowoczesne alternatywy!

Jeśli chcesz zachować swoje testy QUnit w obecnej formie, bez przepisywania i refaktoryzacji, `QUnit Service` jest wszystkim, czego potrzebujesz. Uruchamia pliki HTML QUnit w przeglądarce i przechwytuje wszystkie wyniki w formacie `wdio`.

Dzięki temu deweloperzy mogą używać `QUnit Service` wraz ze wszystkim innym dostępnym w ekosystemie `wdio`.

Chcesz nagrać przebieg testu w formie [wideo](https://webdriver.io/docs/wdio-video-reporter/)? Może zrobić [zrzut ekranu](https://webdriver.io/docs/api/browser/saveScreenshot/) lub zapisać go w formacie [PDF](https://webdriver.io/docs/api/browser/savePDF/)? Sprawdzić [pokrycie kodu](https://www.npmjs.com/package/wdio-monocart-service)? Zapisać wyniki testów w formacie [JUnit](https://webdriver.io/docs/junit-reporter)? Śmiało, `QUnit Service` nie stoi na przeszkodzie.

## Instalacja

Po skonfigurowaniu `WebdriverIO`, zainstaluj `wdio-qunit-service` jako devDependency w pliku `package.json`.

```shell
npm install wdio-qunit-service --save-dev
```

Jeśli nie skonfigurowałeś jeszcze `WebdriverIO`, sprawdź oficjalną [dokumentację](https://webdriver.io/docs/gettingstarted).

## Konfiguracja

Aby korzystać z `QUnit Service`, wystarczy dodać go do listy `services` w pliku `wdio.conf.js`. Dokumentacja wdio zawiera wszystkie informacje związane z [plikiem konfiguracyjnym](https://webdriver.io/docs/configurationfile):

```js
// wdio.conf.js
export const config = {
  // ...
  services: ["qunit"],
  // ...
};
```

## Użytkowanie

Upewnij się, że serwer WWW jest uruchomiony przed wykonaniem testów. `wdio` nie uruchomi serwera WWW.

### Z plikami .spec lub .test

W teście WebdriverIO musisz przejść do strony testowej QUnit HTML, a następnie wywołać `browser.getQUnitResults()`.

```js
describe("QUnit test page", () => {
  it("should pass QUnit tests", async () => {
    await browser.url("http://localhost:8080/test/unit/unitTests.qunit.html");
    await browser.getQUnitResults();
  });
});
```

Zaleca się posiadanie jednego pliku testowego WebdriverIO na stronę testową QUnit HTML. Zapewnia to, że testy będą uruchamiane równolegle i w pełni izolowane.

### Tylko konfiguracja, bez plików .spec lub .test

Jeśli nie chcesz tworzyć plików spec/test, możesz przekazać listę plików HTML QUnit do konfiguracji, a testy zostaną automatycznie wygenerowane.

```js
// wdio.conf.js
export const config = {
  // ...
  baseUrl: 'http://localhost:8080',
  services: [
    ['qunit', {
      paths: [
        'unit-tests.html',
        'integration-tests.html',
        'test/qunit.html'
      ]
    }],
  // ...
};
```

### Wyniki testów

Wyniki testów mogą wyglądać tak:
![QUnit Service test results](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./wdio-qunit-service-results.png?raw=true)

## Przykłady

Sprawdź folder [examples](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/) z przykładami używającymi `javascript`, `typescript` i więcej.

### Użycie w aplikacjach SAP Fiori / UI5

Prosty [przykład](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/) wykorzystujący dobrze znaną aplikację [openui5-sample-app](https://github.com/SAP/openui5-sample-app):

- Utwórz plik konfiguracyjny: [wdio.conf.js](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/wdio.conf.js)

- Powiedz `wdio` gdzie znaleźć pliki testowe QUnit:

- - Dołącz pliki QUnit do [konfiguracji usługi](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app-no-specs/webapp/test/wdio.conf.js)
- - lub
- - Utwórz plik testowy WebdriverIO dla [testów jednostkowych](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/unit/unit.test.js) i kolejny dla [testów OPA5](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/integration/opa.test.js)

- Serwer WWW musi być uruchomiony przed wykonaniem testów

- Uruchom $ `wdio run webapp/test/wdio.conf.js`

## Autor

Mauricio Lauffer

- LinkedIn: [https://www.linkedin.com/in/mauriciolauffer](https://www.linkedin.com/in/mauriciolauffer)

## Licencja

Ten projekt jest licencjonowany na podstawie licencji MIT - szczegóły znajdziesz w pliku [LICENSE](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/LICENSE).