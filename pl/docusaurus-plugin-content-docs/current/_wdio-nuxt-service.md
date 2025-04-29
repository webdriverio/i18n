---
id: wdio-nuxt-service
title: Usługa Nuxt Service
custom_edit_url: https://github.com/webdriverio-community/wdio-nuxt-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-nuxt-service jest pakietem zewnętrznym, więcej informacji znajdziesz na [GitHub](https://github.com/webdriverio-community/wdio-nuxt-service) | [npm](https://www.npmjs.com/package/wdio-nuxt-service)

Ta usługa pomaga w uruchomieniu aplikacji, gdy używasz [Nuxt](https://nuxt.com/) jako narzędzia budowania. Automatycznie uruchamia serwer Nuxt przy użyciu pliku `nuxt.conf.js` przed rozpoczęciem testów.

## Instalacja

Jeśli zaczynasz pracę z WebdriverIO, możesz użyć kreatora konfiguracji, aby wszystko skonfigurować:

```sh
npm init wdio@latest .
```

Kreator wykryje Twój projekt jako projekt Nuxt i zainstaluje wszystkie niezbędne wtyczki. Jeśli dodajesz tę usługę do istniejącej konfiguracji, zawsze możesz ją zainstalować za pomocą:

```bash
npm install wdio-nuxt-service --save-dev
```

## Konfiguracja

Aby włączyć usługę, wystarczy dodać ją do listy `services` w pliku `wdio.conf.js`, np.:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['nuxt'],
    // ...
};
```

Możesz zastosować opcje usługi, przekazując tablicę z obiektem konfiguracyjnym, np.:

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

## Użycie

Jeśli Twoja konfiguracja jest odpowiednio ustawiona, usługa ustawi opcję [`baseUrl`](https://webdriver.io/docs/configuration#baseurl) wskazującą na Twoją aplikację. Możesz przejść do niej za pomocą komendy [`url`](https://webdriver.io/docs/api/browser/url), np.:

```ts
await browser.url('/')
await expect(browser).toHaveTitle('Welcome to Nuxt!')
await expect($('aria/Welcome to Nuxt!')).toBePresent()
```

## Opcje

### `rootDir`

Katalog główny projektu.

Typ: `string`<br />
Domyślnie: `process.cwd()`

### `dotenv`

Plik środowiskowy, który zostanie załadowany przed uruchomieniem serwera.

Typ: `string`<br />
Domyślnie: `.env`

### `hostname`

Nazwa hosta, na którym uruchomiony zostanie serwer.

Typ: `string`<br />
Domyślnie: `localhost`

### `port`

Port, na którym uruchomiony zostanie serwer.

Typ: `number`<br />
Domyślnie: `process.env.NUXT_PORT || config.devServer.port`

### `https`

Ustaw na true, jeśli serwer testowy powinien być uruchomiony z https (certyfikaty muszą być skonfigurowane w konfiguracji Nuxt).

Typ: `boolean`<br />
Domyślnie: `false`

### `sslCert`

Certyfikat SSL używany do uruchomienia serwera z https.

Typ: `string`

### `sslKey`

Klucz SSL używany do uruchomienia serwera z https.

Typ: `string`

----

Więcej informacji o WebdriverIO znajdziesz na [stronie głównej](https://webdriver.io).