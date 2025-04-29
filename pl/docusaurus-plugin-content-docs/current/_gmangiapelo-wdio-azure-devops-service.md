---
id: gmangiapelo-wdio-azure-devops-service
title: Usługa Azure DevOps Test Plans
custom_edit_url: https://github.com/gianlucamangiapelo/wdio-azure-devops-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @gmangiapelo/wdio-azure-devops-service jest pakietem zewnętrznym, więcej informacji znajdziesz na [GitHub](https://github.com/gianlucamangiapelo/wdio-azure-devops-service) | [npm](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)

[![version](https://img.shields.io/npm/v/@gmangiapelo/wdio-azure-devops-service.svg)](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)
[![downloads](https://img.shields.io/npm/dt/@gmangiapelo/wdio-azure-devops-service.svg)](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)

Publikuje wyniki testów [WebdriverIO](https://webdriver.io/) w Azure DevOps Test Plans.

Główne funkcje:

* Wsparcie dla frameworków Jasmine/Jest/Mocha i Cucumber
* Wyniki testów są agregowane w ramach tego samego uruchomienia testu, jeśli wykonujesz więcej plików specyfikacji (testów) i należą one do tej samej suity
* Wyniki są raportowane natychmiast po zakończeniu pojedynczego testu (raportowanie w czasie rzeczywistym)
* Uruchomienie testu jest zamykane po zakończeniu ostatniego pliku specyfikacji (testu)
* Obsługa wielu suit testowych


## Instalacja

Zainstaluj ten moduł lokalnie za pomocą następującego polecenia, aby używać go jako (dev-)zależności:

```shell
npm install --save @gmangiapelo/wdio-azure-devops-service
npm install --save-dev @gmangiapelo/wdio-azure-devops-service
```

Instrukcje dotyczące instalacji `WebdriverIO` można znaleźć [tutaj.](https://webdriver.io/docs/gettingstarted)

## Użycie

> _wdio-azure-devops-service_ wspiera **NodeJS 8 lub nowszy**

> _wdio-azure-devops-service_ wspiera **commonjs** i **esm**

### Konfiguracja

Ponieważ `@gmangiapelo/wdio-azure-devops-service` jest usługą, możesz skonfigurować ją w pliku `wdio.conf.js` w następujący sposób

```js
import AzureDevopsService from "@gmangiapelo/wdio-azure-devops-service";
// wdio.conf.js
exports.config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
              AzureDevopsService,
              {
                  pat: '3qaPw0PnOyQ6mb8gwN7n9aIQtccn8FtsZ2s1tSIzo6yAt6eK9BInJQGJ99BDACAAAAAu9TDCAAASAZDO2Onn',
                  organizationUrl: 'https://dev.azure.com/gianlucamangiapelo',
                  projectId: '8b3c68ac-f69d-41c6-bbad-921d8bae9819',
                  planId: 263072,
                  suiteId: 263073,
                  caseIdRegex: '@?[ref](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/\\d+)',
                  runName: 'FE regression tests for TestPlan',
              },
          ],
    ],
    // ...
};
```

### Konfiguracja przypadku testowego

Twoje testy WDIO powinny zawierać ID przypadku testowego Azure. Upewnij się, że ID przypadków testowych różnią się od tytułów testów:

**Styl Mocha:**
```Javascript
// Dobrze:
it("C123 Can authenticate a valid user", ...

// Źle:
it("C123Can authenticate a valid user", ...
it("Can authenticate a valid user C123", ...
```

**Styl Cucumber:**
```Gherkin
## Dobrze:
@C123
Scenario Can authenticate a valid user
@c123
Scenario Can authenticate a valid user,

## Źle:
@c123stringTest
Scenario Can authenticate a valid user
```

### Przykład raportu Azure DevOps

To przykład wyników przesłanych do AZ Test Plans podczas uruchomienia testu
![AzureDevops Test Plans example](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/./img/AZ-DevOps-example.png)

<br />

## Opcje usługi

### pat

Token osobistego dostępu (Personal Access Token) wygenerowany w Azure DevOps z ustawionymi uprawnieniami API.

Przykład: `"3qaPw0PnOyQ6mb8gwN7n9aIQtccn8FtsZ2s1tSIzo6yAt6eK9BInJQGJ99BDACAAAAAu9TDCAAASAZDO2Onn"`

Typ: `string`

Wymagane: `true`

### organizationUrl

Podstawowy adres URL Twojej instancji Azure DevOps.

Przykład: `"https://dev.azure.com/gianlucamangiapelo"`

Typ: `string`

Wymagane: `true`

### projectId

Identyfikator projektu w Azure DevOps.

Aby znaleźć projectId, użyj `GET {organizationUrl}/_apis/projects?api-version=6.0` i skopiuj odpowiednie `id`.

Przykład: `"3cf7dbc9-cb1e-4240-93f2-9a5960ab3945"`

Typ: `string`

Wymagane: `true`

### planId

Identyfikator planu testowego, który możesz znaleźć w sekcji Azure DevOps Test Plan.

Przykład: `124`

Typ: `integer`

Wymagane: `true`

### suiteId

Identyfikator suity, który możesz znaleźć w sekcji Azure DevOps Test Plan. W przypadku zagnieżdżonych suit, pobierz główny suiteId, usługa iteruje po wszystkich podrzędnych suitach.

Przykład: `21`

Typ: `integer`

Wymagane: `true`

### runName

Opisowa nazwa dla uruchomienia testu.

Przykład: `"FE regression tests run"`

Typ: `string`

Wymagane: `true`

### caseIdRegex

Niestandardowe wyrażenie regularne dopasowujące testCaseId z tagu lub tytułu przypadku testowego.

Typ: `string`

Domyślnie: `"@?[cC](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/\d+)"`

Wymagane: `false`

## Autor
Gianluca Mangiapelo - [github](https://github.com/gianlucamangiapelo)