---
id: wdio-wiremock-service
title: خدمة WireMock
custom_edit_url: https://github.com/erwinheitzman/wdio-wiremock-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-wiremock-service هي حزمة طرف ثالث، لمزيد من المعلومات يرجى مراجعة [GitHub](https://github.com/erwinheitzman/wdio-wiremock-service) | [npm](https://www.npmjs.com/package/wdio-wiremock-service)

[![downloads](https://img.shields.io/npm/dm/wdio-wiremock-service.svg)](https://www.npmjs.com/package/wdio-wiremock-service)


تساعدك هذه الخدمة على تشغيل [WireMock](http://wiremock.org/) بسلاسة عند تشغيل الاختبارات مع [WebdriverIO](https://webdriver.io). تستخدم مستودع [Maven](https://mvnrepository.com/repos/central) المعروف لتنزيل ملف WireMock jar لك، والذي يتم تثبيته وتشغيله وإيقافه تلقائياً. ابق على اطلاع بالانضمام إلى المجتمع على [Gitter](https://gitter.im/erwinheitzman/wdio-wiremock-service) للحصول على المساعدة والدعم.

## التثبيت

```bash
npm i -D wdio-wiremock-service
```

يمكن العثور على تعليمات حول كيفية تثبيت `WebdriverIO` [هنا.](https://webdriver.io/docs/gettingstarted.html)

## الاستخدام

في الدليل الجذر (الافتراضي `./mock`) ستجد دليلين فرعيين، `__files` و `mappings` والتي تستخدم للتجهيزات والمحاكاة الخاصة بك.

لمزيد من المعلومات، راجع [وثائق WireMock الرسمية](https://wiremock.org/docs/standalone/).

## التكوين

لاستخدام الخدمة مع wdio testrunner، تحتاج إلى إضافتها إلى مصفوفة الخدمات الخاصة بك:

```js
// wdio.conf.js
export.config = {
  // ...
  services: ['wiremock'],
  // ...
};
```

عند استخدام webdriverio standalone، تحتاج إلى إضافة الخدمة وتشغيل خطافات `onPrepare` و `onComplete` يدوياً. يمكن العثور على مثال [هنا](####webdriverio-standalone) (يستخدم المثال [Jest](https://jestjs.io/en/)):

## الخيارات

يمكن إضافة الخيارات التالية إلى الخدمة.

### port

المنفذ الذي يجب أن يعمل عليه WireMock.

النوع: `Number`

القيمة الافتراضية: `8080`

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

المسار الذي سيبحث فيه WireMock عن الملفات.

النوع: `String`

القيمة الافتراضية: `./mock`

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

إصدار WireMock الذي سيتم تنزيله واستخدامه.

النوع: `String`

القيمة الافتراضية: `3.3.1`

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

أخبر الخدمة بتخطي تنزيل WireMock.

النوع: `Boolean`

القيمة الافتراضية: false

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

مسار مخصص لملف Wiremock الثنائي المحلي (غالباً ما يستخدم مع skipWiremockInstall).

النوع: `String`

القيمة الافتراضية: './wiremock-standalone-3.0.0.jar' (نسبي من الخدمة)

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

الوضع الصامت لتسجيل مخرجات WireMock (بما في ذلك التسجيل الإضافي من الخدمة نفسها).

النوع: `Boolean`

القيمة الافتراضية: `false`

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

عنوان URL الأساسي للتنزيل من Maven.

النوع: `String`

القيمة الافتراضية: `https://repo1.maven.org/maven2`

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

قائمة يمكنك من خلالها تمرير جميع الوسيطات المدعومة لتكوين WireMock

ملاحظة: لا يمكنك تمرير الخيارات (`port`, `rootDir`, `stdio`, `mavenBaseUrl`) هنا لأنه سيتم تجاهلها.

النوع: `Array`

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

### كتابة الاختبارات

كتابة اختبارك الأول أمر بسيط للغاية:

#### استخدام WDIO testrunner

```js
import fetch from 'node-fetch'; // يمكنك استخدام أي عميل HTTP تفضله
import { equal } from 'node:assert'; // يمكنك استخدام أي مكتبة تأكيد تفضلها

describe('example', () => {
	it(`should assert the mock data`, async () => {
		const body = await fetch('http://localhost:8080/api/mytest');
		equal(body.text(), 'Hello world!');
	});
});
```

#### استخدام WebdriverIO Standalone

```js
import fetch from 'node-fetch'; // يمكنك استخدام أي عميل HTTP تفضله
import { equal } from 'node:assert'; // يمكنك استخدام أي مكتبة تأكيد تفضلها
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
		wiremockLauncher = new launcher(); // إنشاء نسخة من الخدمة
		await wiremockLauncher.onPrepare(WDIO_OPTIONS); // تشغيل خطاف onPrepare
		client = await remote(WDIO_OPTIONS);
	});

	afterAll(async () => {
		await client.deleteSession();
		await wiremockLauncher.onComplete(); // تشغيل خطاف onComplete
	});

	test('should showoff a mocked api response', async () => {
		const body = await fetch('http://localhost:8080/api/mytest');
		equal(body.text(), 'Hello world!');
	});
});
```

لمزيد من المعلومات حول WebdriverIO، راجع [الصفحة الرئيسية](https://webdriver.io).