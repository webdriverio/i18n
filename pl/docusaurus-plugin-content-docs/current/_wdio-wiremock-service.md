---
id: wdio-wiremock-service
title: Usługa WireMock
custom_edit_url: https://github.com/erwinheitzman/wdio-wiremock-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-wiremock-service to pakiet zewnętrzny, więcej informacji znajdziesz na [GitHub](https://github.com/erwinheitzman/wdio-wiremock-service) | [npm](https://www.npmjs.com/package/wdio-wiremock-service)

[![downloads](https://img.shields.io/npm/dm/wdio-wiremock-service.svg)](https://www.npmjs.com/package/wdio-wiremock-service)


Ta usługa pomaga płynnie uruchamiać [WireMock](http://wiremock.org/) podczas testów z [WebdriverIO](https://webdriver.io). Korzysta z dobrze znanego repozytorium [Maven](https://mvnrepository.com/repos/central), aby pobrać dla Ciebie plik JAR WireMock, który jest następnie automatycznie instalowany, uruchamiany i zatrzymywany. Bądź na bieżąco, dołączając do społeczności na [Gitter](https://gitter.im/erwinheitzman/wdio-wiremock-service), aby uzyskać pomoc i wsparcie.

## Instalacja

```bash
npm i -D wdio-wiremock-service
```

Instrukcje dotyczące instalacji `WebdriverIO` można znaleźć [tutaj.](https://webdriver.io/docs/gettingstarted.html)

## Użycie

W katalogu głównym (domyślnie `./mock`) znajdziesz dwa podkatalogi, `__files` i `mappings`, które są używane do przechowywania fixtures i mocków.

Aby uzyskać więcej informacji, sprawdź [oficjalną dokumentację WireMock](https://wiremock.org/docs/standalone/).

## Konfiguracja

Aby używać tej usługi z testrunnerem wdio, musisz dodać ją do tablicy usług:

```js
// wdio.conf.js
export.config = {
  // ...
  services: ['wiremock'],
  // ...
};
```

Podczas korzystania z samodzielnego webdriverio, musisz dodać usługę i ręcznie wywołać hooki `onPrepare` i `onComplete`. Przykład można znaleźć [tutaj](####webdriverio-standalone) (przykład wykorzystuje [Jest](https://jestjs.io/en/)):

## Opcje

Do usługi można dodać następujące opcje.

### port

Port, na którym powinien działać WireMock.

Typ: `Number`

Domyślnie: `8080`

Przykład:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { port: 8181 }]],
	// ...
};
```

### rootDir

Ścieżka, w której WireMock będzie szukać plików.

Typ: `String`

Domyślnie: `./mock`

Przykład:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { rootDir: './mock' }]],
	// ...
};
```

### version

Wersja WireMock do pobrania i użycia.

Typ: `String`

Domyślnie: `3.3.1`

Przykład:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { version: '2.25.1' }]],
	// ...
};
```

### skipWiremockInstall

Poinformuj usługę, aby pominęła pobieranie WireMock.

Typ: `Boolean`

Domyślnie: false

Przykład:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { skipWiremockInstall: true }]],
	// ...
};
```

### binPath

Niestandardowa ścieżka do lokalnego pliku binarnego Wiremock (często używana w połączeniu z skipWiremockInstall).

Typ: `String`

Domyślnie: './wiremock-standalone-3.0.0.jar' (względna od usługi)

Przykład:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { binPath: './my-custom/example-path/wiremock-standalone-3.0.0.jar' }]],
	// ...
};
```

### silent

Tryb cichy dla logowania wyjścia WireMock (w tym dodatkowego logowania z samej usługi).

Typ: `Boolean`

Domyślnie: `false`

Przykład:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { silent: true }]],
	// ...
};
```

### mavenBaseUrl

Bazowy URL pobierania dla Maven.

Typ: `String`

Domyślnie: `https://repo1.maven.org/maven2`

Przykład:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { mavenBaseUrl: 'https://repo1.maven.org/maven2' }]],
	// ...
};
```

### args

Lista, w której możesz przekazać wszystkie obsługiwane argumenty do konfiguracji WireMock.

Uwaga: nie możesz przekazać opcji (`port`, `rootDir`, `stdio`, `mavenBaseUrl`) tutaj, ponieważ zostaną one zignorowane.

Typ: `Array`

Przykład:

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

### Pisanie testów

Napisanie pierwszego testu jest naprawdę proste:

#### Używanie testrunner WDIO

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

#### Używanie WebdriverIO Standalone

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

Więcej informacji na temat WebdriverIO znajdziesz na [stronie głównej](https://webdriver.io).