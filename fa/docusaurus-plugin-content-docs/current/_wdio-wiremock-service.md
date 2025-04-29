---
id: wdio-wiremock-service
title: سرویس WireMock
custom_edit_url: https://github.com/erwinheitzman/wdio-wiremock-service/edit/master/README.md
---


> wdio-wiremock-service یک پکیج شخص ثالث است، برای اطلاعات بیشتر لطفاً به [GitHub](https://github.com/erwinheitzman/wdio-wiremock-service) | [npm](https://www.npmjs.com/package/wdio-wiremock-service) مراجعه کنید

[![downloads](https://img.shields.io/npm/dm/wdio-wiremock-service.svg)](https://www.npmjs.com/package/wdio-wiremock-service)


این سرویس به شما کمک می‌کند تا [WireMock](http://wiremock.org/) را به صورت یکپارچه هنگام اجرای تست‌ها با [WebdriverIO](https://webdriver.io) راه‌اندازی کنید. این سرویس از مخزن شناخته شده [Maven](https://mvnrepository.com/repos/central) برای دانلود فایل jar مربوط به WireMock استفاده می‌کند که سپس به صورت خودکار نصب، شروع و متوقف می‌شود. برای کمک و پشتیبانی به روز بمانید و به جامعه کاربران در [Gitter](https://gitter.im/erwinheitzman/wdio-wiremock-service) بپیوندید.

## نصب

```bash
npm i -D wdio-wiremock-service
```

دستورالعمل نصب `WebdriverIO` را می‌توانید [اینجا](https://webdriver.io/docs/gettingstarted.html) پیدا کنید.

## استفاده

در دایرکتوری اصلی (به طور پیش‌فرض `./mock`) دو زیر دایرکتوری `__files` و `mappings` وجود دارد که برای نمونه‌ها و موک‌های شما استفاده می‌شوند.

برای اطلاعات بیشتر، [مستندات رسمی WireMock](https://wiremock.org/docs/standalone/) را بررسی کنید.

## پیکربندی

برای استفاده از این سرویس با اجراکننده تست wdio، باید آن را به آرایه سرویس خود اضافه کنید:

```js
// wdio.conf.js
export.config = {
  // ...
  services: ['wiremock'],
  // ...
};
```

هنگام استفاده از webdriverio به صورت مستقل، باید سرویس را اضافه کرده و قلاب‌های `onPrepare` و `onComplete` را به صورت دستی فراخوانی کنید. نمونه‌ای از این کار [اینجا](####webdriverio-standalone) قابل مشاهده است (این مثال از [Jest](https://jestjs.io/en/) استفاده می‌کند):

## گزینه‌ها

گزینه‌های زیر را می‌توان به سرویس اضافه کرد.

### port

پورتی که WireMock باید روی آن اجرا شود.

نوع: `Number`

پیش‌فرض: `8080`

مثال:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { port: 8181 }]],
	// ...
};
```

### rootDir

مسیری که WireMock فایل‌ها را در آن جستجو می‌کند.

نوع: `String`

پیش‌فرض: `./mock`

مثال:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { rootDir: './mock' }]],
	// ...
};
```

### version

نسخه WireMock که باید دانلود و استفاده شود.

نوع: `String`

پیش‌فرض: `3.3.1`

مثال:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { version: '2.25.1' }]],
	// ...
};
```

### skipWiremockInstall

به سرویس بگویید که دانلود WireMock را رد کند.

نوع: `Boolean`

پیش‌فرض: false

مثال:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { skipWiremockInstall: true }]],
	// ...
};
```

### binPath

مسیر سفارشی به فایل اجرایی محلی Wiremock (اغلب با skipWiremockInstall استفاده می‌شود).

نوع: `String`

پیش‌فرض: './wiremock-standalone-3.0.0.jar' (نسبت به سرویس)

مثال:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { binPath: './my-custom/example-path/wiremock-standalone-3.0.0.jar' }]],
	// ...
};
```

### silent

حالت سکوت برای ثبت خروجی WireMock (شامل ثبت اضافی از خود سرویس).

نوع: `Boolean`

پیش‌فرض: `false`

مثال:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { silent: true }]],
	// ...
};
```

### mavenBaseUrl

URL پایه دانلود برای Maven.

نوع: `String`

پیش‌فرض: `https://repo1.maven.org/maven2`

مثال:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { mavenBaseUrl: 'https://repo1.maven.org/maven2' }]],
	// ...
};
```

### args

لیستی که می‌توانید همه آرگومان‌های پشتیبانی شده برای پیکربندی WireMock را در آن قرار دهید.

توجه: شما نمی‌توانید گزینه‌های (`port`، `rootDir`، `stdio`، `mavenBaseUrl`) را اینجا قرار دهید زیرا نادیده گرفته می‌شوند.

نوع: `Array`

مثال:

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

### نوشتن تست‌ها

نوشتن اولین تست شما بسیار ساده است:

#### استفاده از اجراکننده تست WDIO

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

#### استفاده از WebdriverIO به صورت مستقل

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

برای اطلاعات بیشتر در مورد WebdriverIO به [صفحه اصلی](https://webdriver.io) مراجعه کنید.