---
id: wdio-wiremock-service
title: Сервіс WireMock
custom_edit_url: https://github.com/erwinheitzman/wdio-wiremock-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-wiremock-service є пакетом сторонніх розробників, для отримання додаткової інформації див. [GitHub](https://github.com/erwinheitzman/wdio-wiremock-service) | [npm](https://www.npmjs.com/package/wdio-wiremock-service)

[![downloads](https://img.shields.io/npm/dm/wdio-wiremock-service.svg)](https://www.npmjs.com/package/wdio-wiremock-service)


Цей сервіс допомагає вам запускати [WireMock](http://wiremock.org/) без проблем при запуску тестів з [WebdriverIO](https://webdriver.io). Він використовує відомий репозиторій [Maven](https://mvnrepository.com/repos/central) для завантаження WireMock jar для вас, який потім автоматично встановлюється, запускається та зупиняється. Будьте в курсі подій, приєднавшись до спільноти в [Gitter](https://gitter.im/erwinheitzman/wdio-wiremock-service) для допомоги та підтримки.

## Встановлення

```bash
npm i -D wdio-wiremock-service
```

Інструкції щодо встановлення `WebdriverIO` можна знайти [тут.](https://webdriver.io/docs/gettingstarted.html)

## Використання

У кореневому каталозі (за замовчуванням `./mock`) ви знайдете два підкаталоги, `__files` та `mappings`, які використовуються для ваших фікстур та моків.

Для отримання додаткової інформації перегляньте [офіційну документацію WireMock](https://wiremock.org/docs/standalone/).

## Конфігурація

Щоб використовувати сервіс із тестовим раннером wdio, вам потрібно додати його до масиву сервісів:

```js
// wdio.conf.js
export.config = {
  // ...
  services: ['wiremock'],
  // ...
};
```

При використанні webdriverio в автономному режимі вам потрібно додати сервіс і вручну викликати хуки `onPrepare` та `onComplete`. Приклад можна знайти [тут](####webdriverio-standalone) (приклад використовує [Jest](https://jestjs.io/en/)):

## Опції

До сервісу можна додати такі опції.

### port

Порт, на якому повинен працювати WireMock.

Тип: `Number`

За замовчуванням: `8080`

Приклад:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { port: 8181 }]],
	// ...
};
```

### rootDir

Шлях, де WireMock шукатиме файли.

Тип: `String`

За замовчуванням: `./mock`

Приклад:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { rootDir: './mock' }]],
	// ...
};
```

### version

Версія WireMock, яку потрібно завантажити та використовувати.

Тип: `String`

За замовчуванням: `3.3.1`

Приклад:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { version: '2.25.1' }]],
	// ...
};
```

### skipWiremockInstall

Вказує сервісу пропустити завантаження WireMock.

Тип: `Boolean`

За замовчуванням: false

Приклад:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { skipWiremockInstall: true }]],
	// ...
};
```

### binPath

Власний шлях до локального бінарного файлу Wiremock (часто використовується разом з skipWiremockInstall).

Тип: `String`

За замовчуванням: './wiremock-standalone-3.0.0.jar' (відносно сервісу)

Приклад:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { binPath: './my-custom/example-path/wiremock-standalone-3.0.0.jar' }]],
	// ...
};
```

### silent

Тихий режим для логування виводу WireMock (включаючи додаткове логування самого сервісу).

Тип: `Boolean`

За замовчуванням: `false`

Приклад:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { silent: true }]],
	// ...
};
```

### mavenBaseUrl

Базовий URL для завантаження з Maven.

Тип: `String`

За замовчуванням: `https://repo1.maven.org/maven2`

Приклад:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { mavenBaseUrl: 'https://repo1.maven.org/maven2' }]],
	// ...
};
```

### args

Список, де ви можете передавати всі підтримувані аргументи для налаштування WireMock

Примітка: ви не можете передавати опції (`port`, `rootDir`, `stdio`, `mavenBaseUrl`) тут, оскільки вони будуть проігноровані.

Тип: `Array`

Приклад:

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

### Написання тестів

Написання вашого першого тесту дуже просте:

#### Використання тестового раннера WDIO

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

#### Використання WebdriverIO в автономному режимі

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

Для отримання додаткової інформації про WebdriverIO перегляньте [домашню сторінку](https://webdriver.io).