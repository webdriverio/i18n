---
id: wdio-nuxt-service
title: Servizio Nuxt Service
custom_edit_url: https://github.com/webdriverio-community/wdio-nuxt-service/edit/main/README.md
---


> wdio-nuxt-service è un pacchetto di terze parti, per maggiori informazioni consultare [GitHub](https://github.com/webdriverio-community/wdio-nuxt-service) | [npm](https://www.npmjs.com/package/wdio-nuxt-service)

Questo servizio ti aiuta ad avviare la tua applicazione quando utilizzi [Nuxt](https://nuxt.com/) come strumento di build. Avvia automaticamente il server Nuxt utilizzando il tuo `nuxt.conf.js` prima di avviare il test.

## Installazione

Se stai iniziando con WebdriverIO puoi utilizzare la procedura guidata di configurazione per impostare tutto:

```sh
npm init wdio@latest .
```

Rileverà il tuo progetto come un progetto Nuxt e installerà tutti i plugin necessari per te. Se stai aggiungendo questo servizio a una configurazione esistente, puoi sempre installarlo tramite:

```bash
npm install wdio-nuxt-service --save-dev
```

## Configurazione

Per abilitare il servizio, aggiungilo semplicemente alla tua lista `services` nel file `wdio.conf.js`, ad esempio:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['nuxt'],
    // ...
};
```

Puoi applicare le opzioni del servizio passando un array con un oggetto di configurazione, ad esempio:

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

## Utilizzo

Se la tua configurazione è impostata di conseguenza, il servizio imposterà l'opzione [`baseUrl`](https://webdriver.io/docs/configuration#baseurl) per puntare alla tua applicazione. Puoi navigare verso di essa tramite il comando [`url`](https://webdriver.io/docs/api/browser/url), ad esempio:

```ts
await browser.url('/')
await expect(browser).toHaveTitle('Welcome to Nuxt!')
await expect($('aria/Welcome to Nuxt!')).toBePresent()
```

## Opzioni

### `rootDir`

Directory root del progetto.

Tipo: `string`<br />
Default: `process.cwd()`

### `dotenv`

File di ambiente da caricare prima dell'avvio del server.

Tipo: `string`<br />
Default: `.env`

### `hostname`

Hostname su cui avviare il server.

Tipo: `string`<br />
Default: `localhost`

### `port`

Porta su cui avviare il server.

Tipo: `number`<br />
Default: `process.env.NUXT_PORT || config.devServer.port`

### `https`

Impostare su true se il server di test deve essere avviato su https (i certificati devono essere configurati nella configurazione di Nuxt).

Tipo: `boolean`<br />
Default: `false`

### `sslCert`

Certificato SSL da utilizzare per avviare il server su https.

Tipo: `string`

### `sslKey`

Chiave SSL da utilizzare per avviare il server su https.

Tipo: `string`

----

Per maggiori informazioni su WebdriverIO visita la [homepage](https://webdriver.io).