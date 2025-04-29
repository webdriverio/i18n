---
id: shared-store-service
title: Servizio di Archiviazione Condivisa
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-shared-store-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Scambio di dati tra processo principale e worker (specs).

## Installazione

Il modo più semplice è mantenere `@wdio/shared-store-service` come dipendenza di sviluppo nel tuo `package.json`, tramite:

```sh
npm install @wdio/shared-store-service --save-dev
```

Le istruzioni su come installare `WebdriverIO` possono essere trovate [qui.](https://webdriver.io/docs/gettingstarted)

## Utilizzo

Ottieni/imposta un valore (un oggetto semplice) da/nello store tramite chiave (stringa). La chiave può essere qualsiasi stringa arbitraria eccetto `*` che è riservata in quanto permette di recuperare l'intero store.

### Impostare Valori

Per impostare valori nello store chiama:

```js
await browser.sharedStore.set('key', 'foobar123')
```

### Ottenere Valori

Per ottenere valori dallo store chiama:

```js
const value = await browser.sharedStore.get('key')
console.log(value) // restituisce "foobar123"
```

Puoi anche recuperare tutti i valori delle chiavi utilizzando la chiave `*`:

```js
const store = await browser.sharedStore.get('*')
console.log(value) // restituisce `{ key: "foobar" }`
```

### Accesso allo Store negli Hook WDIO

Puoi anche accedere direttamente ai gestori asincroni `setValue` e `getValue`.
Assicurati di chiamarli correttamente con la parola chiave `await`.

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

IMPORTANTE! Ogni file spec dovrebbe essere atomico e isolato dalle spec degli altri.
L'idea del servizio è di affrontare problemi molto specifici di configurazione dell'ambiente.
Evita di condividere dati di esecuzione dei test!

### Pool di Risorse

Se i thread worker competono per risorse che devono essere assegnate a ciascun worker, puoi utilizzare l'API Resource Pool:

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

Questo esempio garantisce che entrambi i worker non utilizzino mai la stessa `baseUrl`. Un URL unico viene assegnato a un solo worker finché non viene rilasciato.

## Configurazione

Aggiungi `shared-store` alla lista dei servizi e l'oggetto `sharedStore` sarà accessibile nello [scope `browser`](https://webdriver.io/docs/api/browser) nel tuo test.

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['shared-store'],
    // ...
};
```

Se stai utilizzando typescript, assicurati di aggiungere `@wdio/shared-store-service` ai tuoi `compilerOptions.types`:

```js
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/shared-store-service"],
    }
}
```