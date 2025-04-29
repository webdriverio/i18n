---
id: shared-store-service
title: Delad Lagringstjänst
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-shared-store-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Utbyt data mellan huvudprocessen och workers (specifikationer).

## Installation

Det enklaste sättet är att behålla `@wdio/shared-store-service` som ett dev-beroende i din `package.json`, via:

```sh
npm install @wdio/shared-store-service --save-dev
```

Instruktioner om hur du installerar `WebdriverIO` finns [här.](https://webdriver.io/docs/gettingstarted)

## Användning

Hämta/ange ett värde (ett enkelt objekt) till/från lagret med hjälp av en nyckel (sträng). Nyckeln kan vara vilken godtycklig sträng som helst förutom `*` som är reserverat eftersom det låter dig hämta hela lagret.

### Ange värden

För att ange värden i lagret, anropa:

```js
await browser.sharedStore.set('key', 'foobar123')
```

### Hämta värden

För att hämta värden från lagret, anropa:

```js
const value = await browser.sharedStore.get('key')
console.log(value) // returnerar "foobar123"
```

Du kan också hämta alla nyckelvärden genom att använda nyckeln `*`:

```js
const store = await browser.sharedStore.get('*')
console.log(value) // returnerar `{ key: "foobar" }`
```

### Åtkomst till lagret i WDIO Hooks

Du kan också direkt få åtkomst till asynkrona hanterare `setValue` och `getValue`.
Se till att du anropar dem korrekt med nyckelordet `await`.

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

VIKTIGT! Varje spec-fil bör vara atomisk och isolerad från andra spec-filer.
Idén med tjänsten är att hantera mycket specifika miljöinställningsproblem.
Undvik att dela testexekveringsdata!

### Resurspoler

Om worker-trådarna konkurrerar om resurser som måste tilldelas för varje worker, kan du använda Resource Pool API:

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

Detta exempel säkerställer att båda workers aldrig använder samma `baseUrl`. En unik URL tilldelas endast en worker tills den frigörs av den.

## Konfiguration

Lägg till `shared-store` i listan över tjänster och `sharedStore`-objektet kommer att vara tillgängligt för dig inom [`browser`-omfattningen](https://webdriver.io/docs/api/browser) i ditt test.

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['shared-store'],
    // ...
};
```

Om du använder typescript, se till att lägga till `@wdio/shared-store-service` till dina `compilerOptions.types`:

```js
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/shared-store-service"],
    }
}
```