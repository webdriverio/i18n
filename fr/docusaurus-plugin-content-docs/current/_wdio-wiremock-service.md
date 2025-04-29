---
id: wdio-wiremock-service
title: Service WireMock
custom_edit_url: https://github.com/erwinheitzman/wdio-wiremock-service/edit/master/README.md
---


> wdio-wiremock-service est un package tiers, pour plus d'informations veuillez consulter [GitHub](https://github.com/erwinheitzman/wdio-wiremock-service) | [npm](https://www.npmjs.com/package/wdio-wiremock-service)

[![downloads](https://img.shields.io/npm/dm/wdio-wiremock-service.svg)](https://www.npmjs.com/package/wdio-wiremock-service)


Ce service vous aide à exécuter [WireMock](http://wiremock.org/) de manière transparente lors de l'exécution de tests avec [WebdriverIO](https://webdriver.io). Il utilise le célèbre dépôt [Maven](https://mvnrepository.com/repos/central) pour télécharger le fichier jar WireMock pour vous, qui est ensuite automatiquement installé, démarré et arrêté. Restez à jour en rejoignant la communauté sur [Gitter](https://gitter.im/erwinheitzman/wdio-wiremock-service) pour obtenir de l'aide et du soutien.

## Installation

```bash
npm i -D wdio-wiremock-service
```

Les instructions sur la façon d'installer `WebdriverIO` peuvent être trouvées [ici.](https://webdriver.io/docs/gettingstarted.html)

## Utilisation

Dans le répertoire racine (par défaut `./mock`), vous trouverez deux sous-répertoires, `__files` et `mappings` qui sont utilisés pour vos fixtures et mocks.

Pour plus d'informations, consultez [la documentation officielle de WireMock](https://wiremock.org/docs/standalone/).

## Configuration

Pour utiliser le service avec le testrunner wdio, vous devez l'ajouter à votre tableau de services :

```js
// wdio.conf.js
export.config = {
  // ...
  services: ['wiremock'],
  // ...
};
```

Lorsque vous utilisez webdriverio de manière autonome, vous devez ajouter le service et déclencher les hooks `onPrepare` et `onComplete` manuellement. Un exemple peut être trouvé [ici](####webdriverio-standalone) (l'exemple utilise [Jest](https://jestjs.io/en/)) :

## Options

Les options suivantes peuvent être ajoutées au service.

### port

Port sur lequel WireMock doit fonctionner.

Type: `Number`

Par défaut: `8080`

Exemple:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { port: 8181 }]],
	// ...
};
```

### rootDir

Chemin où WireMock recherchera les fichiers.

Type: `String`

Par défaut: `./mock`

Exemple:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { rootDir: './mock' }]],
	// ...
};
```

### version

Version de WireMock à télécharger et à utiliser.

Type: `String`

Par défaut: `3.3.1`

Exemple:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { version: '2.25.1' }]],
	// ...
};
```

### skipWiremockInstall

Indique au service de sauter le téléchargement de WireMock.

Type: `Boolean`

Par défaut: false

Exemple:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { skipWiremockInstall: true }]],
	// ...
};
```

### binPath

Chemin personnalisé vers un binaire local Wiremock (souvent utilisé en combinaison avec skipWiremockInstall).

Type: `String`

Par défaut: './wiremock-standalone-3.0.0.jar' (relatif depuis le service)

Exemple:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { binPath: './my-custom/example-path/wiremock-standalone-3.0.0.jar' }]],
	// ...
};
```

### silent

Mode silencieux pour la journalisation de la sortie de WireMock (y compris la journalisation supplémentaire du service lui-même).

Type: `Boolean`

Par défaut: `false`

Exemple:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { silent: true }]],
	// ...
};
```

### mavenBaseUrl

URL de base de téléchargement pour Maven.

Type: `String`

Par défaut: `https://repo1.maven.org/maven2`

Exemple:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { mavenBaseUrl: 'https://repo1.maven.org/maven2' }]],
	// ...
};
```

### args

Liste où vous pouvez passer tous les arguments pris en charge pour configurer WireMock

Remarque : vous ne pouvez pas passer les options (`port`, `rootDir`, `stdio`, `mavenBaseUrl`) ici car elles seront ignorées.

Type: `Array`

Exemple:

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

### Écriture de tests

Écrire votre premier test est vraiment simple :

#### Utilisation du testrunner WDIO

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

#### Utilisation de WebdriverIO Standalone

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

Pour plus d'informations sur WebdriverIO, consultez la [page d'accueil](https://webdriver.io).