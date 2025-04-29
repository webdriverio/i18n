---
id: shared-store-service
title: Servizio di Archiviazione Condivisa
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-shared-store-service/README.md
---


> Scambia dati tra il processo principale e i worker (specifiche).

## Installazione

Il modo più semplice è mantenere `@wdio/shared-store-service` come dipendenza di sviluppo nel tuo `package.json`, tramite:

```sh
npm install @wdio/shared-store-service --save-dev
```

Le istruzioni su come installare `WebdriverIO` possono essere trovate [qui.](https://webdriver.io/docs/gettingstarted)

## Utilizzo

Ottieni/imposta un valore (un oggetto semplice) da/verso l'archivio tramite chiave (stringa). La chiave può essere qualsiasi stringa arbitraria tranne `*` che è riservata poiché consente di recuperare l'intero archivio.

### Impostare Valori

Per impostare valori nell'archivio chiama:

```js
await browser.sharedStore.set('key', 'foobar123')
```

### Ottenere Valori

Per ottenere valori dall'archivio chiama:

```js
const value = await browser.sharedStore.get('key')
console.log(value) // ritorna "foobar123"
```

Puoi anche recuperare tutti i valori delle chiavi utilizzando la chiave `*`:

```js
const store = await browser.sharedStore.get('*')
console.log(value) // ritorna `{ key: "foobar" }`
```

### Accedere all'Archivio negli Hook WDIO

Potresti anche accedere direttamente ai gestori asincroni `setValue` e `getValue`.
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

IMPORTANTE! Ogni file di specifiche dovrebbe essere atomico e isolato dalle specifiche degli altri.
L'idea del servizio è di gestire problemi di configurazione dell'ambiente molto specifici.
Si prega di evitare la condivisione dei dati di esecuzione dei test!

### Pool di Risorse

Se i thread dei worker stanno competendo per risorse che devono essere assegnate per ciascun worker, puoi utilizzare l'API del Pool di Risorse:

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

Questo esempio garantisce che entrambi i worker non utilizzino mai lo stesso `baseUrl`. Un URL unico viene assegnato a un solo worker fino a quando non viene rilasciato da quest'ultimo.

## Configurazione

Aggiungi `shared-store` all'elenco dei servizi e l'oggetto `sharedStore` sarà accessibile nell'ambito [`browser`](https://webdriver.io/docs/api/browser) nel tuo test.

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['shared-store'],
    // ...
};
```

Se stai utilizzando typescript, assicurati di aggiungere `@wdio/shared-store-service` al tuo `compilerOptions.types`:

```js
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/shared-store-service"],
    }
}
```