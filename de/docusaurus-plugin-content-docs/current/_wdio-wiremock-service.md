---
id: wdio-wiremock-service
title: WireMock Service
custom_edit_url: https://github.com/erwinheitzman/wdio-wiremock-service/edit/master/README.md
---


> wdio-wiremock-service ist ein Paket von Drittanbietern, weitere Informationen finden Sie auf [GitHub](https://github.com/erwinheitzman/wdio-wiremock-service) | [npm](https://www.npmjs.com/package/wdio-wiremock-service)

[![downloads](https://img.shields.io/npm/dm/wdio-wiremock-service.svg)](https://www.npmjs.com/package/wdio-wiremock-service)


Dieser Service hilft Ihnen, [WireMock](http://wiremock.org/) nahtlos auszuführen, wenn Sie Tests mit [WebdriverIO](https://webdriver.io) durchführen. Er verwendet das bekannte [Maven](https://mvnrepository.com/repos/central) Repository, um die WireMock-JAR für Sie herunterzuladen, die dann automatisch installiert, gestartet und gestoppt wird. Bleiben Sie auf dem Laufenden, indem Sie der Community auf [Gitter](https://gitter.im/erwinheitzman/wdio-wiremock-service) für Hilfe und Unterstützung beitreten.

## Installation

```bash
npm i -D wdio-wiremock-service
```

Anweisungen zur Installation von `WebdriverIO` finden Sie [hier.](https://webdriver.io/docs/gettingstarted.html)

## Verwendung

Im Stammverzeichnis (standardmäßig `./mock`) finden Sie zwei Unterverzeichnisse, `__files` und `mappings`, die für Ihre Fixtures und Mocks verwendet werden.

Weitere Informationen finden Sie in der [offiziellen Dokumentation von WireMock](https://wiremock.org/docs/standalone/).

## Konfiguration

Um den Service mit dem wdio-Testrunner zu verwenden, müssen Sie ihn zu Ihrem Service-Array hinzufügen:

```js
// wdio.conf.js
export.config = {
  // ...
  services: ['wiremock'],
  // ...
};
```

Wenn Sie webdriverio standalone verwenden, müssen Sie den Service hinzufügen und die Hooks `onPrepare` und `onComplete` manuell auslösen. Ein Beispiel finden Sie [hier](####webdriverio-standalone) (das Beispiel verwendet [Jest](https://jestjs.io/en/)):

## Optionen

Die folgenden Optionen können dem Service hinzugefügt werden.

### port

Port, auf dem WireMock laufen soll.

Typ: `Number`

Standard: `8080`

Beispiel:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { port: 8181 }]],
	// ...
};
```

### rootDir

Pfad, in dem WireMock nach Dateien suchen wird.

Typ: `String`

Standard: `./mock`

Beispiel:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { rootDir: './mock' }]],
	// ...
};
```

### version

Version von WireMock, die heruntergeladen und verwendet werden soll.

Typ: `String`

Standard: `3.3.1`

Beispiel:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { version: '2.25.1' }]],
	// ...
};
```

### skipWiremockInstall

Weist den Service an, das Herunterladen von WireMock zu überspringen.

Typ: `Boolean`

Standard: false

Beispiel:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { skipWiremockInstall: true }]],
	// ...
};
```

### binPath

Benutzerdefinierter Pfad zu einer lokalen Wiremock-Binärdatei (oft in Kombination mit skipWiremockInstall verwendet).

Typ: `String`

Standard: './wiremock-standalone-3.0.0.jar' (relativ vom Service)

Beispiel:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { binPath: './my-custom/example-path/wiremock-standalone-3.0.0.jar' }]],
	// ...
};
```

### silent

Stummer Modus für die Protokollierung der Ausgabe von WireMock (einschließlich zusätzlicher Protokollierung durch den Service selbst).

Typ: `Boolean`

Standard: `false`

Beispiel:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { silent: true }]],
	// ...
};
```

### mavenBaseUrl

Basis-Download-URL für Maven.

Typ: `String`

Standard: `https://repo1.maven.org/maven2`

Beispiel:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { mavenBaseUrl: 'https://repo1.maven.org/maven2' }]],
	// ...
};
```

### args

Liste, in der Sie alle unterstützten Argumente für die Konfiguration von WireMock übergeben können.

Hinweis: Sie können die Optionen (`port`, `rootDir`, `stdio`, `mavenBaseUrl`) hier nicht übergeben, da sie ignoriert werden.

Typ: `Array`

Beispiel:

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

### Tests schreiben

Das Schreiben Ihres ersten Tests ist wirklich einfach:

#### Verwendung des WDIO-Testrunners

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

#### Verwendung von WebdriverIO Standalone

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

Weitere Informationen zu WebdriverIO finden Sie auf der [Homepage](https://webdriver.io).