---
id: wdio-wiremock-service
title: Сервис WireMock
custom_edit_url: https://github.com/erwinheitzman/wdio-wiremock-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-wiremock-service - это сторонний пакет, для получения дополнительной информации посетите [GitHub](https://github.com/erwinheitzman/wdio-wiremock-service) | [npm](https://www.npmjs.com/package/wdio-wiremock-service)

[![downloads](https://img.shields.io/npm/dm/wdio-wiremock-service.svg)](https://www.npmjs.com/package/wdio-wiremock-service)


Этот сервис помогает запускать [WireMock](http://wiremock.org/) без проблем при выполнении тестов с [WebdriverIO](https://webdriver.io). Он использует хорошо известный репозиторий [Maven](https://mvnrepository.com/repos/central) для загрузки JAR-файла WireMock, который затем автоматически устанавливается, запускается и останавливается. Оставайтесь в курсе, присоединившись к сообществу в [Gitter](https://gitter.im/erwinheitzman/wdio-wiremock-service) для получения помощи и поддержки.

## Установка

```bash
npm i -D wdio-wiremock-service
```

Инструкции по установке `WebdriverIO` можно найти [здесь.](https://webdriver.io/docs/gettingstarted.html)

## Использование

В корневом каталоге (по умолчанию `./mock`) вы найдете два подкаталога, `__files` и `mappings`, которые используются для ваших фикстур и моков.

Для получения дополнительной информации ознакомьтесь с [официальной документацией WireMock](https://wiremock.org/docs/standalone/).

## Конфигурация

Чтобы использовать сервис с тестовым раннером wdio, вам нужно добавить его в массив сервисов:

```js
// wdio.conf.js
export.config = {
  // ...
  services: ['wiremock'],
  // ...
};
```

При использовании webdriverio в автономном режиме вам нужно добавить сервис и вручную запустить хуки `onPrepare` и `onComplete`. Пример можно найти [здесь](####webdriverio-standalone) (пример использует [Jest](https://jestjs.io/en/)):

## Опции

В сервис можно добавить следующие опции.

### port

Порт, на котором должен работать WireMock.

Тип: `Number`

По умолчанию: `8080`

Пример:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { port: 8181 }]],
	// ...
};
```

### rootDir

Путь, по которому WireMock будет искать файлы.

Тип: `String`

По умолчанию: `./mock`

Пример:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { rootDir: './mock' }]],
	// ...
};
```

### version

Версия WireMock, которая будет загружена и использована.

Тип: `String`

По умолчанию: `3.3.1`

Пример:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { version: '2.25.1' }]],
	// ...
};
```

### skipWiremockInstall

Указывает сервису пропустить загрузку WireMock.

Тип: `Boolean`

По умолчанию: false

Пример:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { skipWiremockInstall: true }]],
	// ...
};
```

### binPath

Пользовательский путь к локальному исполняемому файлу Wiremock (часто используется в сочетании с skipWiremockInstall).

Тип: `String`

По умолчанию: './wiremock-standalone-3.0.0.jar' (относительно сервиса)

Пример:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { binPath: './my-custom/example-path/wiremock-standalone-3.0.0.jar' }]],
	// ...
};
```

### silent

Тихий режим для вывода логов WireMock (включая дополнительное логирование от самого сервиса).

Тип: `Boolean`

По умолчанию: `false`

Пример:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { silent: true }]],
	// ...
};
```

### mavenBaseUrl

Базовый URL для загрузки Maven.

Тип: `String`

По умолчанию: `https://repo1.maven.org/maven2`

Пример:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { mavenBaseUrl: 'https://repo1.maven.org/maven2' }]],
	// ...
};
```

### args

Список, в котором вы можете передать все поддерживаемые аргументы для настройки WireMock.

Примечание: вы не можете передать здесь опции (`port`, `rootDir`, `stdio`, `mavenBaseUrl`), так как они будут проигнорированы.

Тип: `Array`

Пример:

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

### Написание тестов

Написание вашего первого теста очень простое:

#### Использование тестового раннера WDIO

```js
import fetch from 'node-fetch'; // вы можете использовать любой HTTP-клиент по вашему выбору
import { equal } from 'node:assert'; // вы можете использовать любую библиотеку утверждений по вашему выбору

describe('example', () => {
	it(`should assert the mock data`, async () => {
		const body = await fetch('http://localhost:8080/api/mytest');
		equal(body.text(), 'Hello world!');
	});
});
```

#### Использование WebdriverIO в автономном режиме

```js
import fetch from 'node-fetch'; // вы можете использовать любой HTTP-клиент по вашему выбору
import { equal } from 'node:assert'; // вы можете использовать любую библиотеку утверждений по вашему выбору
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
		wiremockLauncher = new launcher(); // создание экземпляра сервиса
		await wiremockLauncher.onPrepare(WDIO_OPTIONS); // запуск хука onPrepare
		client = await remote(WDIO_OPTIONS);
	});

	afterAll(async () => {
		await client.deleteSession();
		await wiremockLauncher.onComplete(); // запуск хука onComplete
	});

	test('should showoff a mocked api response', async () => {
		const body = await fetch('http://localhost:8080/api/mytest');
		equal(body.text(), 'Hello world!');
	});
});
```

Для получения дополнительной информации о WebdriverIO посетите [домашнюю страницу](https://webdriver.io).