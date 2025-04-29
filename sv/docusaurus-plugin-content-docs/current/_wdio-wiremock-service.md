---
id: wdio-wiremock-service
title: WireMock Service
custom_edit_url: https://github.com/erwinheitzman/wdio-wiremock-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-wiremock-service är ett tredjepartspaket, för mer information se [GitHub](https://github.com/erwinheitzman/wdio-wiremock-service) | [npm](https://www.npmjs.com/package/wdio-wiremock-service)

[![downloads](https://img.shields.io/npm/dm/wdio-wiremock-service.svg)](https://www.npmjs.com/package/wdio-wiremock-service)


Denna tjänst hjälper dig att köra [WireMock](http://wiremock.org/) sömlöst när du kör tester med [WebdriverIO](https://webdriver.io). Den använder det välkända [Maven](https://mvnrepository.com/repos/central) repository för att ladda ner WireMock jar-filen åt dig som sedan automatiskt installeras, startas och stoppas. Håll dig uppdaterad genom att gå med i gemenskapen på [Gitter](https://gitter.im/erwinheitzman/wdio-wiremock-service) för hjälp och support.

## Installation

```bash
npm i -D wdio-wiremock-service
```

Instruktioner om hur man installerar `WebdriverIO` finns [här.](https://webdriver.io/docs/gettingstarted.html)

## Användning

I rootkatalogen (standard `./mock`) hittar du två underkataloger, `__files` och `mappings` som används för dina fixtures och mocks.

För mer information, kolla in [WireMock's officiella dokumentation](https://wiremock.org/docs/standalone/).

## Konfiguration

För att använda tjänsten med wdio testrunner behöver du lägga till den i din service-array:

```js
// wdio.conf.js
export.config = {
  // ...
  services: ['wiremock'],
  // ...
};
```

När du använder webdriverio standalone behöver du lägga till tjänsten och manuellt trigga `onPrepare` och `onComplete` hooks. Ett exempel finns [här](####webdriverio-standalone) (exemplet använder [Jest](https://jestjs.io/en/)):

## Alternativ

Följande alternativ kan läggas till tjänsten.

### port

Port där WireMock ska köras.

Typ: `Number`

Standard: `8080`

Exempel:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { port: 8181 }]],
	// ...
};
```

### rootDir

Sökväg där WireMock ska leta efter filer.

Typ: `String`

Standard: `./mock`

Exempel:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { rootDir: './mock' }]],
	// ...
};
```

### version

Version av WireMock som ska laddas ner och användas.

Typ: `String`

Standard: `3.3.1`

Exempel:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { version: '2.25.1' }]],
	// ...
};
```

### skipWiremockInstall

Tala om för tjänsten att hoppa över nedladdningen av WireMock.

Typ: `Boolean`

Standard: false

Exempel:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { skipWiremockInstall: true }]],
	// ...
};
```

### binPath

Anpassad sökväg till en lokal Wiremock-binär (används ofta i kombination med skipWiremockInstall).

Typ: `String`

Standard: './wiremock-standalone-3.0.0.jar' (relativt från tjänsten)

Exempel:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { binPath: './my-custom/example-path/wiremock-standalone-3.0.0.jar' }]],
	// ...
};
```

### silent

Tyst läge för loggning av WireMock's output (inklusive ytterligare loggning från själva tjänsten).

Typ: `Boolean`

Standard: `false`

Exempel:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { silent: true }]],
	// ...
};
```

### mavenBaseUrl

Bas-URL för nedladdning från Maven.

Typ: `String`

Standard: `https://repo1.maven.org/maven2`

Exempel:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { mavenBaseUrl: 'https://repo1.maven.org/maven2' }]],
	// ...
};
```

### args

Lista där du kan skicka alla stödda argument för att konfigurera WireMock

Obs: du kan inte skicka alternativen (`port`, `rootDir`, `stdio`, `mavenBaseUrl`) här eftersom de kommer att ignoreras.

Typ: `Array`

Exempel:

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

### Skriva tester

Att skriva ditt första test är verkligen enkelt:

#### Använda WDIO testrunner

```js
import fetch from 'node-fetch'; // you can use any HTTP client you like
import { equal } from 'node:assert'; // you can use any assertion library you like

describe('example', () => {
	it(`should assert the mock data`, async () => {
		const body = await fetch('http://localhost:8080/api/mytest');
		equal(body.text(), 'Hello world!');
	});
});
```

#### Använda WebdriverIO Standalone

```js
import fetch from 'node-fetch'; // you can use any HTTP client you like
import { equal } from 'node:assert'; // you can use any assertion library you like
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
		wiremockLauncher = new launcher(); // create instance of the service
		await wiremockLauncher.onPrepare(WDIO_OPTIONS); // run the onPrepare hook
		client = await remote(WDIO_OPTIONS);
	});

	afterAll(async () => {
		await client.deleteSession();
		await wiremockLauncher.onComplete(); // run the onComplete hook
	});

	test('should showoff a mocked api response', async () => {
		const body = await fetch('http://localhost:8080/api/mytest');
		equal(body.text(), 'Hello world!');
	});
});
```

För mer information om WebdriverIO se [hemsidan](https://webdriver.io).