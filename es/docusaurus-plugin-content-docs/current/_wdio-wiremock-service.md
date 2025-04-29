---
id: wdio-wiremock-service
title: Servicio WireMock
custom_edit_url: https://github.com/erwinheitzman/wdio-wiremock-service/edit/master/README.md
---


> wdio-wiremock-service es un paquete de terceros, para más información consulta [GitHub](https://github.com/erwinheitzman/wdio-wiremock-service) | [npm](https://www.npmjs.com/package/wdio-wiremock-service)

[![downloads](https://img.shields.io/npm/dm/wdio-wiremock-service.svg)](https://www.npmjs.com/package/wdio-wiremock-service)


Este servicio te ayuda a ejecutar [WireMock](http://wiremock.org/) sin problemas cuando ejecutas pruebas con [WebdriverIO](https://webdriver.io). Utiliza el conocido repositorio [Maven](https://mvnrepository.com/repos/central) para descargar el archivo jar de WireMock automáticamente, que luego se instala, inicia y detiene de forma automática. Mantente al día uniéndote a la comunidad en [Gitter](https://gitter.im/erwinheitzman/wdio-wiremock-service) para obtener ayuda y soporte.

## Instalación

```bash
npm i -D wdio-wiremock-service
```

Las instrucciones sobre cómo instalar `WebdriverIO` se pueden encontrar [aquí.](https://webdriver.io/docs/gettingstarted.html)

## Uso

En el directorio raíz (por defecto `./mock`) encontrarás dos subdirectorios, `__files` y `mappings` que se utilizan para tus fixtures y mocks.

Para más información, consulta la [documentación oficial de WireMock](https://wiremock.org/docs/standalone/).

## Configuración

Para usar el servicio con el testrunner de wdio necesitas añadirlo a tu array de servicios:

```js
// wdio.conf.js
export.config = {
  // ...
  services: ['wiremock'],
  // ...
};
```

Cuando uses webdriverio de forma independiente, necesitas añadir el servicio y activar los hooks `onPrepare` y `onComplete` manualmente. Puedes encontrar un ejemplo [aquí](####webdriverio-standalone) (el ejemplo utiliza [Jest](https://jestjs.io/en/)):

## Opciones

Las siguientes opciones se pueden añadir al servicio.

### port

Puerto donde WireMock debería ejecutarse.

Tipo: `Number`

Valor predeterminado: `8080`

Ejemplo:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { port: 8181 }]],
	// ...
};
```

### rootDir

Ruta donde WireMock buscará archivos.

Tipo: `String`

Valor predeterminado: `./mock`

Ejemplo:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { rootDir: './mock' }]],
	// ...
};
```

### version

Versión de WireMock que se descargará y utilizará.

Tipo: `String`

Valor predeterminado: `3.3.1`

Ejemplo:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { version: '2.25.1' }]],
	// ...
};
```

### skipWiremockInstall

Indica al servicio que omita la descarga de WireMock.

Tipo: `Boolean`

Valor predeterminado: false

Ejemplo:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { skipWiremockInstall: true }]],
	// ...
};
```

### binPath

Ruta personalizada a un binario local de Wiremock (a menudo usado en combinación con skipWiremockInstall).

Tipo: `String`

Valor predeterminado: './wiremock-standalone-3.0.0.jar' (relativo al servicio)

Ejemplo:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { binPath: './my-custom/example-path/wiremock-standalone-3.0.0.jar' }]],
	// ...
};
```

### silent

Modo silencioso para el registro de la salida de WireMock (incluido el registro adicional del propio servicio).

Tipo: `Boolean`

Valor predeterminado: `false`

Ejemplo:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { silent: true }]],
	// ...
};
```

### mavenBaseUrl

URL base de descarga para Maven.

Tipo: `String`

Valor predeterminado: `https://repo1.maven.org/maven2`

Ejemplo:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { mavenBaseUrl: 'https://repo1.maven.org/maven2' }]],
	// ...
};
```

### args

Lista donde puedes pasar todos los argumentos soportados para configurar WireMock

Nota: no puedes pasar las opciones (`port`, `rootDir`, `stdio`, `mavenBaseUrl`) aquí ya que serán ignoradas.

Tipo: `Array`

Ejemplo:

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

### Escribiendo pruebas

Escribir tu primera prueba es realmente sencillo:

#### Usando el testrunner de WDIO

```js
import fetch from 'node-fetch'; // puedes usar cualquier cliente HTTP que prefieras
import { equal } from 'node:assert'; // puedes usar cualquier biblioteca de aserciones que prefieras

describe('example', () => {
	it(`should assert the mock data`, async () => {
		const body = await fetch('http://localhost:8080/api/mytest');
		equal(body.text(), 'Hello world!');
	});
});
```

#### Usando WebdriverIO Standalone

```js
import fetch from 'node-fetch'; // puedes usar cualquier cliente HTTP que prefieras
import { equal } from 'node:assert'; // puedes usar cualquier biblioteca de aserciones que prefieras
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
		wiremockLauncher = new launcher(); // crear instancia del servicio
		await wiremockLauncher.onPrepare(WDIO_OPTIONS); // ejecutar el hook onPrepare
		client = await remote(WDIO_OPTIONS);
	});

	afterAll(async () => {
		await client.deleteSession();
		await wiremockLauncher.onComplete(); // ejecutar el hook onComplete
	});

	test('should showoff a mocked api response', async () => {
		const body = await fetch('http://localhost:8080/api/mytest');
		equal(body.text(), 'Hello world!');
	});
});
```

Para más información sobre WebdriverIO, visita la [página principal](https://webdriver.io).