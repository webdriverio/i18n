---
id: shared-store-service
title: Shared Store Service
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-shared-store-service/README.md
---


> Datenaustausch zwischen Hauptprozess und Workern (Specs).

## Installation

Der einfachste Weg ist, `@wdio/shared-store-service` als Dev-Dependency in Ihrer `package.json` zu behalten, über:

```sh
npm install @wdio/shared-store-service --save-dev
```

Anleitungen zur Installation von `WebdriverIO` finden Sie [hier.](https://webdriver.io/docs/gettingstarted)

## Verwendung

Holen/Setzen Sie einen Wert (ein einfaches Objekt) in/aus dem Speicher über einen Schlüssel (String). Der Schlüssel kann eine beliebige Zeichenfolge sein, außer `*`, welcher reserviert ist, da er Ihnen erlaubt, den gesamten Speicher abzurufen.

### Werte setzen

Um Werte im Speicher zu setzen, rufen Sie:

```js
await browser.sharedStore.set('key', 'foobar123')
```

### Werte abrufen

Um Werte aus dem Speicher abzurufen, rufen Sie:

```js
const value = await browser.sharedStore.get('key')
console.log(value) // gibt "foobar123" zurück
```

Sie können auch alle Schlüsselwerte abrufen, indem Sie den Schlüssel `*` verwenden:

```js
const store = await browser.sharedStore.get('*')
console.log(value) // gibt `{ key: "foobar" }` zurück
```

### Zugriff auf den Speicher in WDIO Hooks

Sie können auch direkt auf die asynchronen Handler `setValue` und `getValue` zugreifen.
Stellen Sie sicher, dass Sie sie korrekt mit dem `await`-Schlüsselwort aufrufen.

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

WICHTIG! Jede Spec-Datei sollte atomar und isoliert von anderen Specs sein.
Die Idee des Service ist es, mit sehr spezifischen Umgebungseinrichtungsproblemen umzugehen.
Bitte vermeiden Sie das Teilen von Testausführungsdaten!

### Ressourcen-Pools

Wenn die Worker-Threads um Ressourcen konkurrieren, die jedem Worker zugewiesen werden müssen, können Sie die Resource Pool API verwenden:

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

Dieses Beispiel stellt sicher, dass beide Worker niemals die gleiche `baseUrl` verwenden. Eine eindeutige URL wird nur einem Worker zugewiesen, bis dieser sie freigibt.

## Konfiguration

Fügen Sie `shared-store` zur Liste der Services hinzu und das `sharedStore`-Objekt wird Ihnen im [`browser`-Bereich](https://webdriver.io/docs/api/browser) in Ihrem Test zugänglich sein.

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['shared-store'],
    // ...
};
```

Wenn Sie TypeScript verwenden, stellen Sie sicher, dass Sie `@wdio/shared-store-service` zu Ihren `compilerOptions.types` hinzufügen:

```js
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/shared-store-service"],
    }
}
```