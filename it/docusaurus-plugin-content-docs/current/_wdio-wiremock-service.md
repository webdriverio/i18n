---
id: wdio-wiremock-service
title: Servizio WireMock
custom_edit_url: https://github.com/erwinheitzman/wdio-wiremock-service/edit/master/README.md
---


> wdio-wiremock-service è un pacchetto di terze parti, per maggiori informazioni consultare [GitHub](https://github.com/erwinheitzman/wdio-wiremock-service) | [npm](https://www.npmjs.com/package/wdio-wiremock-service)

[![downloads](https://img.shields.io/npm/dm/wdio-wiremock-service.svg)](https://www.npmjs.com/package/wdio-wiremock-service)


Questo servizio ti aiuta a eseguire [WireMock](http://wiremock.org/) senza problemi quando esegui test con [WebdriverIO](https://webdriver.io). Utilizza il ben noto repository [Maven](https://mvnrepository.com/repos/central) per scaricare il jar WireMock per te, che viene poi automaticamente installato, avviato e fermato. Rimani aggiornato unendoti alla comunità su [Gitter](https://gitter.im/erwinheitzman/wdio-wiremock-service) per supporto e aiuto.

## Installazione

```bash
npm i -D wdio-wiremock-service
```

Le istruzioni su come installare `WebdriverIO` possono essere trovate [qui.](https://webdriver.io/docs/gettingstarted.html)

## Utilizzo

Nella directory principale (default `./mock`) troverai due sottodirectory, `__files` e `mappings` che sono utilizzate per i tuoi fixture e mock.

Per maggiori informazioni, consulta la [documentazione ufficiale di WireMock](https://wiremock.org/docs/standalone/).

## Configurazione

Per utilizzare il servizio con il testrunner wdio devi aggiungerlo al tuo array di servizi:

```js
// wdio.conf.js
export.config = {
  // ...
  services: ['wiremock'],
  // ...
};
```

Quando si utilizza webdriverio standalone è necessario aggiungere il servizio e attivare manualmente gli hook `onPrepare` e `onComplete`. Un esempio può essere trovato [qui](####webdriverio-standalone) (l'esempio utilizza [Jest](https://jestjs.io/en/)):

## Opzioni

Le seguenti opzioni possono essere aggiunte al servizio.

### port

Porta su cui WireMock dovrebbe essere eseguito.

Tipo: `Number`

Default: `8080`

Esempio:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { port: 8181 }]],
	// ...
};
```

### rootDir

Percorso in cui WireMock cercherà i file.

Tipo: `String`

Default: `./mock`

Esempio:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { rootDir: './mock' }]],
	// ...
};
```

### version

Versione di WireMock da scaricare e utilizzare.

Tipo: `String`

Default: `3.3.1`

Esempio:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { version: '2.25.1' }]],
	// ...
};
```

### skipWiremockInstall

Indica al servizio di saltare il download di WireMock.

Tipo: `Boolean`

Default: false

Esempio:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { skipWiremockInstall: true }]],
	// ...
};
```

### binPath

Percorso personalizzato verso un binario locale di Wiremock (spesso usato in combinazione con skipWiremockInstall).

Tipo: `String`

Default: './wiremock-standalone-3.0.0.jar' (relativo al servizio)

Esempio:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { binPath: './my-custom/example-path/wiremock-standalone-3.0.0.jar' }]],
	// ...
};
```

### silent

Modalità silenziosa per la registrazione dell'output di WireMock (inclusi i log aggiuntivi dal servizio stesso).

Tipo: `Boolean`

Default: `false`

Esempio:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { silent: true }]],
	// ...
};
```

### mavenBaseUrl

URL di base per il download da Maven.

Tipo: `String`

Default: `https://repo1.maven.org/maven2`

Esempio:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { mavenBaseUrl: 'https://repo1.maven.org/maven2' }]],
	// ...
};
```

### args

Lista dove puoi passare tutti gli argomenti supportati per configurare WireMock

Nota: non puoi passare le opzioni (`port`, `rootDir`, `stdio`, `mavenBaseUrl`) qui poiché saranno ignorate.

Tipo: `Array`

Esempio:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [
		[
			'wiremock',
			{
				args: ['--verbose', '--match-headers'],
			},
		],
	],
	// ...
};
```

### Scrittura dei test

Scrivere il tuo primo test è davvero semplice:

#### Utilizzando il testrunner WDIO

```js
import fetch from 'node-fetch'; // puoi utilizzare qualsiasi client HTTP che preferisci
import { equal } from 'node:assert'; // puoi utilizzare qualsiasi libreria di asserzioni che preferisci

describe('example', () => {
	it(`should assert the mock data`, async () => {
		const body = await fetch('http://localhost:8080/api/mytest');
		equal(body.text(), 'Hello world!');
	});
});
```

#### Utilizzando WebdriverIO Standalone

```js
import fetch from 'node-fetch'; // puoi utilizzare qualsiasi client HTTP che preferisci
import { equal } from 'node:assert'; // puoi utilizzare qualsiasi libreria di asserzioni che preferisci
import { remote } from 'webdriverio';
import { launcher } from 'wdio-wiremock-service';

const WDIO_OPTIONS = {
	capabilities: {
		browserName: 'chrome',
	},
};

describe('example', () => {
	let wiremockLauncher;
	let client;

	beforeAll(async () => {
		wiremockLauncher = new launcher(); // crea un'istanza del servizio
		await wiremockLauncher.onPrepare(WDIO_OPTIONS); // esegui l'hook onPrepare
		client = await remote(WDIO_OPTIONS);
	});

	afterAll(async () => {
		await client.deleteSession();
		await wiremockLauncher.onComplete(); // esegui l'hook onComplete
	});

	test('should showoff a mocked api response', async () => {
		const body = await fetch('http://localhost:8080/api/mytest');
		equal(body.text(), 'Hello world!');
	});
});
```

Per ulteriori informazioni su WebdriverIO, consulta la [homepage](https://webdriver.io).