---
id: wdio-wiremock-service
title: Serviço WireMock
custom_edit_url: https://github.com/erwinheitzman/wdio-wiremock-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-wiremock-service é um pacote de terceiros, para mais informações veja [GitHub](https://github.com/erwinheitzman/wdio-wiremock-service) | [npm](https://www.npmjs.com/package/wdio-wiremock-service)

[![downloads](https://img.shields.io/npm/dm/wdio-wiremock-service.svg)](https://www.npmjs.com/package/wdio-wiremock-service)


Este serviço ajuda você a executar o [WireMock](http://wiremock.org/) de forma integrada ao executar testes com [WebdriverIO](https://webdriver.io). Ele usa o conhecido repositório [Maven](https://mvnrepository.com/repos/central) para baixar o jar do WireMock para você, que é então automaticamente instalado, iniciado e parado. Mantenha-se atualizado participando da comunidade no [Gitter](https://gitter.im/erwinheitzman/wdio-wiremock-service) para obter ajuda e suporte.

## Instalação

```bash
npm i -D wdio-wiremock-service
```

Instruções sobre como instalar o `WebdriverIO` podem ser encontradas [aqui.](https://webdriver.io/docs/gettingstarted.html)

## Uso

No diretório raiz (padrão `./mock`) você encontra dois subdiretórios, `__files` e `mappings` que são usados para seus fixtures e mocks.

Para mais informações, consulte a [documentação oficial do WireMock](https://wiremock.org/docs/standalone/).

## Configuração

Para usar o serviço com o testrunner wdio, você precisa adicioná-lo ao seu array de serviços:

```js
// wdio.conf.js
export.config = {
  // ...
  services: ['wiremock'],
  // ...
};
```

Ao usar o webdriverio standalone, você precisa adicionar o serviço e acionar os hooks `onPrepare` e `onComplete` manualmente. Um exemplo pode ser encontrado [aqui](####webdriverio-standalone) (o exemplo faz uso do [Jest](https://jestjs.io/en/)):

## Opções

As seguintes opções podem ser adicionadas ao serviço.

### port

Porta onde o WireMock deve ser executado.

Tipo: `Number`

Padrão: `8080`

Exemplo:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { port: 8181 }]],
	// ...
};
```

### rootDir

Caminho onde o WireMock procurará por arquivos.

Tipo: `String`

Padrão: `./mock`

Exemplo:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { rootDir: './mock' }]],
	// ...
};
```

### version

Versão do WireMock a ser baixada e usada.

Tipo: `String`

Padrão: `3.3.1`

Exemplo:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { version: '2.25.1' }]],
	// ...
};
```

### skipWiremockInstall

Indica ao serviço para pular o download do WireMock.

Tipo: `Boolean`

Padrão: false

Exemplo:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { skipWiremockInstall: true }]],
	// ...
};
```

### binPath

Caminho personalizado para um binário local do Wiremock (frequentemente usado em combinação com skipWiremockInstall).

Tipo: `String`

Padrão: './wiremock-standalone-3.0.0.jar' (relativo ao serviço)

Exemplo:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { binPath: './my-custom/example-path/wiremock-standalone-3.0.0.jar' }]],
	// ...
};
```

### silent

Modo silencioso para registrar a saída do WireMock (incluindo registros adicionais do próprio serviço).

Tipo: `Boolean`

Padrão: `false`

Exemplo:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { silent: true }]],
	// ...
};
```

### mavenBaseUrl

URL base de download para o Maven.

Tipo: `String`

Padrão: `https://repo1.maven.org/maven2`

Exemplo:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { mavenBaseUrl: 'https://repo1.maven.org/maven2' }]],
	// ...
};
```

### args

Lista onde você pode passar todos os argumentos suportados para configurar o WireMock

Nota: você não pode passar as opções (`port`, `rootDir`, `stdio`, `mavenBaseUrl`) aqui, pois elas serão ignoradas.

Tipo: `Array`

Exemplo:

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

### Escrevendo testes

Escrever seu primeiro teste é realmente simples:

#### Usando o testrunner WDIO

```js
import fetch from 'node-fetch'; // você pode usar qualquer cliente HTTP que desejar
import { equal } from 'node:assert'; // você pode usar qualquer biblioteca de asserção que desejar

describe('example', () => {
	it(`should assert the mock data`, async () => {
		const body = await fetch('http://localhost:8080/api/mytest');
		equal(body.text(), 'Hello world!');
	});
});
```

#### Usando WebdriverIO Standalone

```js
import fetch from 'node-fetch'; // você pode usar qualquer cliente HTTP que desejar
import { equal } from 'node:assert'; // você pode usar qualquer biblioteca de asserção que desejar
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
		wiremockLauncher = new launcher(); // cria instância do serviço
		await wiremockLauncher.onPrepare(WDIO_OPTIONS); // executa o hook onPrepare
		client = await remote(WDIO_OPTIONS);
	});

	afterAll(async () => {
		await client.deleteSession();
		await wiremockLauncher.onComplete(); // executa o hook onComplete
	});

	test('should showoff a mocked api response', async () => {
		const body = await fetch('http://localhost:8080/api/mytest');
		equal(body.text(), 'Hello world!');
	});
});
```

Para mais informações sobre WebdriverIO, consulte a [página inicial](https://webdriver.io).