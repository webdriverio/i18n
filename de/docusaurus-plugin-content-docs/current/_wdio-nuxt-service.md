---
id: wdio-nuxt-service
title: Nuxt Service Dienst
custom_edit_url: https://github.com/webdriverio-community/wdio-nuxt-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-nuxt-service ist ein Drittanbieterpaket, weitere Informationen finden Sie auf [GitHub](https://github.com/webdriverio-community/wdio-nuxt-service) | [npm](https://www.npmjs.com/package/wdio-nuxt-service)

Dieser Dienst hilft Ihnen beim Starten Ihrer Anwendung, wenn Sie [Nuxt](https://nuxt.com/) als Build-Tool verwenden. Er startet automatisch den Nuxt-Server mit Ihrer `nuxt.conf.js`, bevor der Test gestartet wird.

## Installation

Wenn Sie mit WebdriverIO beginnen, können Sie den Konfigurationsassistenten verwenden, um alles einzurichten:

```sh
npm init wdio@latest .
```

Es erkennt Ihr Projekt als Nuxt-Projekt und installiert alle notwendigen Plugins für Sie. Wenn Sie diesen Dienst zu einer bestehenden Konfiguration hinzufügen, können Sie ihn jederzeit über folgenden Befehl installieren:

```bash
npm install wdio-nuxt-service --save-dev
```

## Konfiguration

Um den Dienst zu aktivieren, fügen Sie ihn einfach zu Ihrer `services`-Liste in Ihrer `wdio.conf.js`-Datei hinzu, z.B.:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['nuxt'],
    // ...
};
```

Sie können Dienstoptionen anwenden, indem Sie ein Array mit einem Konfigurationsobjekt übergeben, z.B.:

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

## Verwendung

Wenn Ihre Konfiguration entsprechend eingerichtet ist, setzt der Dienst die [`baseUrl`](https://webdriver.io/docs/configuration#baseurl)-Option so, dass sie auf Ihre Anwendung zeigt. Sie können mit dem [`url`](https://webdriver.io/docs/api/browser/url)-Befehl dorthin navigieren, z.B.:

```ts
await browser.url('/')
await expect(browser).toHaveTitle('Welcome to Nuxt!')
await expect($('aria/Welcome to Nuxt!')).toBePresent()
```

## Optionen

### `rootDir`

Stammverzeichnis des Projekts.

Typ: `string`<br />
Standard: `process.cwd()`

### `dotenv`

Umgebungsdatei, die vor dem Serverstart geladen werden soll.

Typ: `string`<br />
Standard: `.env`

### `hostname`

Hostname, auf dem der Server gestartet werden soll.

Typ: `string`<br />
Standard: `localhost`

### `port`

Port, auf dem der Server gestartet werden soll.

Typ: `number`<br />
Standard: `process.env.NUXT_PORT || config.devServer.port`

### `https`

Auf true setzen, wenn der Testserver mit HTTPS gestartet werden soll (Zertifikate müssen in der Nuxt-Konfiguration konfiguriert sein).

Typ: `boolean`<br />
Standard: `false`

### `sslCert`

SSL-Zertifikat, das für den Start des Servers mit HTTPS verwendet werden soll.

Typ: `string`

### `sslKey`

SSL-Schlüssel, der für den Start des Servers mit HTTPS verwendet werden soll.

Typ: `string`

----

Weitere Informationen zu WebdriverIO finden Sie auf der [Homepage](https://webdriver.io).