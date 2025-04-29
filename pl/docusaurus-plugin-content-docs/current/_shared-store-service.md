---
id: shared-store-service
title: Usługa Współdzielonego Magazynu
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-shared-store-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Wymiana danych między procesem głównym a procesami roboczymi (specyfikacjami).

## Instalacja

Najłatwiejszy sposób to utrzymywanie `@wdio/shared-store-service` jako zależności deweloperskiej w `package.json`, poprzez:

```sh
npm install @wdio/shared-store-service --save-dev
```

Instrukcje dotyczące instalacji `WebdriverIO` można znaleźć [tutaj.](https://webdriver.io/docs/gettingstarted)

## Użycie

Pobierz/ustaw wartość (zwykły obiekt) do/z magazynu za pomocą klucza (ciągu znaków). Klucz może być dowolnym ciągiem znaków z wyjątkiem `*`, który jest zarezerwowany, ponieważ pozwala na pobranie całego magazynu.

### Ustawianie wartości

Aby ustawić wartości w magazynie, wywołaj:

```js
await browser.sharedStore.set('key', 'foobar123')
```

### Pobieranie wartości

Aby pobrać wartości z magazynu, wywołaj:

```js
const value = await browser.sharedStore.get('key')
console.log(value) // zwraca "foobar123"
```

Możesz także pobrać wszystkie wartości kluczy używając klucza `*`:

```js
const store = await browser.sharedStore.get('*')
console.log(value) // zwraca `{ key: "foobar" }`
```

### Dostęp do magazynu w hookach WDIO

Możesz również bezpośrednio uzyskać dostęp do asynchronicznych procedur obsługi `setValue` i `getValue`.
Upewnij się, że prawidłowo wywołujesz je ze słowem kluczowym `await`.

```js
// wdio.conf.js
import { setValue, getValue } from '@wdio/shared-store-service'

export const config = {
    // ...
    onPrepare: [async function (config, capabilities) {
        await setValue('foo', 'bar')
    }],
    // ...
    after: async () => {
        const value = await getValue('foo')
        // ...
    }
```

WAŻNE! Każdy plik specyfikacji powinien być atomowy i izolowany od innych specyfikacji.
Idea usługi polega na rozwiązywaniu bardzo specyficznych problemów z konfiguracją środowiska.
Proszę unikać udostępniania danych wykonywania testów!

### Pule zasobów

Jeśli wątki robocze konkurują o zasoby, które muszą być przydzielone dla każdego pracownika, możesz użyć API puli zasobów:

```js
// wdio.conf.js
import { setResourcePool, getValueFromPool, addValueToPool } from '@wdio/shared-store-service'

export const config = {
    maxInstances: 2,
    // ...
    onPrepare: async function (config, capabilities) {
        await setResourcePool('availableUrls', ['url01.com', 'url02.com'])
    },
    // ...
    beforeSession: async (conf) => {
        conf.baseUrl = await getValueFromPool('availableUrls');
    },
    // ...
    afterSession: async (conf) => {
        // worker returns the used resource for next workers to use
        await addValueToPool('availableUrls', conf.baseUrl);
    }
```

Ten przykład zapewnia, że oba procesy robocze nigdy nie używają tego samego `baseUrl`. Unikalny adres URL jest przypisany tylko do jednego procesu roboczego, dopóki nie zostanie przez niego zwolniony.

## Konfiguracja

Dodaj `shared-store` do listy usług, a obiekt `sharedStore` będzie dostępny dla ciebie w [zakresie `browser`](https://webdriver.io/docs/api/browser) w twoim teście.

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['shared-store'],
    // ...
};
```

Jeśli używasz TypeScript, pamiętaj o dodaniu `@wdio/shared-store-service` do swoich `compilerOptions.types`:

```js
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/shared-store-service"],
    }
}
```