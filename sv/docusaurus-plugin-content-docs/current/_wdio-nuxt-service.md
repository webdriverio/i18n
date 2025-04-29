---
id: wdio-nuxt-service
title: Nuxt Service Tjänst
custom_edit_url: https://github.com/webdriverio-community/wdio-nuxt-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-nuxt-service is a 3rd party package, for more information please see [GitHub](https://github.com/webdriverio-community/wdio-nuxt-service) | [npm](https://www.npmjs.com/package/wdio-nuxt-service)

Denna tjänst hjälper dig att starta din applikation när du använder [Nuxt](https://nuxt.com/) som byggverktyg. Den startar automatiskt Nuxt-servern med hjälp av din `nuxt.conf.js` innan testet körs.

## Installation

Om du är nybörjare med WebdriverIO kan du använda konfigurationsguiden för att ställa in allt:

```sh
npm init wdio@latest .
```

Den kommer att upptäcka ditt projekt som ett Nuxt-projekt och installera alla nödvändiga plugins åt dig. Om du lägger till denna tjänst i en befintlig setup kan du alltid installera den via:

```bash
npm install wdio-nuxt-service --save-dev
```

## Konfiguration

För att aktivera tjänsten, lägg bara till den i din `services`-lista i din `wdio.conf.js`-fil, t.ex.:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['nuxt'],
    // ...
};
```

Du kan tillämpa tjänstalternativ genom att skicka in en array med ett konfigurationsobjekt, t.ex.:

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['nuxt', {
            rootDir: './packages/nuxt'
        }]
    ],
    // ...
};
```

## Användning

Om din konfiguration är korrekt inställd, kommer tjänsten att ställa in [`baseUrl`](https://webdriver.io/docs/configuration#baseurl)-alternativet för att peka på din applikation. Du kan navigera till den via [`url`](https://webdriver.io/docs/api/browser/url)-kommandot, t.ex.:

```ts
await browser.url('/')
await expect(browser).toHaveTitle('Welcome to Nuxt!')
await expect($('aria/Welcome to Nuxt!')).toBePresent()
```

## Alternativ

### `rootDir`

Rotmappen för projektet.

Typ: `string`<br />
Standard: `process.cwd()`

### `dotenv`

Miljöfil som ska laddas innan servern startar.

Typ: `string`<br />
Standard: `.env`

### `hostname`

Värdnamn som servern ska startas på.

Typ: `string`<br />
Standard: `localhost`

### `port`

Port som servern ska startas på.

Typ: `number`<br />
Standard: `process.env.NUXT_PORT || config.devServer.port`

### `https`

Sätt till true om testservern ska startas med https (certifikat måste konfigureras i Nuxt-konfigurationen).

Typ: `boolean`<br />
Standard: `false`

### `sslCert`

SSL-certifikat som ska användas för att starta servern med https.

Typ: `string`

### `sslKey`

SSL-nyckel som ska användas för att starta servern med https.

Typ: `string`

----

För mer information om WebdriverIO, se [hemsidan](https://webdriver.io).