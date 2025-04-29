---
id: wdio-wiremock-service
title: WireMock 服务
custom_edit_url: https://github.com/erwinheitzman/wdio-wiremock-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-wiremock-service 是一个第三方包，更多信息请查看 [GitHub](https://github.com/erwinheitzman/wdio-wiremock-service) | [npm](https://www.npmjs.com/package/wdio-wiremock-service)

[![downloads](https://img.shields.io/npm/dm/wdio-wiremock-service.svg)](https://www.npmjs.com/package/wdio-wiremock-service)


这个服务帮助您在使用 [WebdriverIO](https://webdriver.io) 运行测试时无缝运行 [WireMock](http://wiremock.org/)。它使用知名的 [Maven](https://mvnrepository.com/repos/central) 仓库为您下载 WireMock jar 包，然后自动安装、启动和停止。加入 [Gitter](https://gitter.im/erwinheitzman/wdio-wiremock-service) 社区获取帮助和支持，及时获取最新信息。

## 安装

```bash
npm i -D wdio-wiremock-service
```

关于如何安装 `WebdriverIO` 的说明可以在[这里](https://webdriver.io/docs/gettingstarted.html)找到。

## 使用方法

在根目录（默认为 `./mock`）中，您会找到两个子目录，`__files` 和 `mappings`，用于存放您的固定数据和模拟。

更多信息，请查看 [WireMock 的官方文档](https://wiremock.org/docs/standalone/)。

## 配置

为了在 wdio 测试运行器中使用该服务，您需要将其添加到服务数组中：

```js
// wdio.conf.js
export.config = {
  // ...
  services: ['wiremock'],
  // ...
};
```

当使用 webdriverio 独立模式时，您需要手动添加服务并触发 `onPrepare` 和 `onComplete` 钩子。示例可以在[这里](####webdriverio-standalone)找到（示例使用了 [Jest](https://jestjs.io/en/)）：

## 选项

以下选项可以添加到服务中。

### port

WireMock 应该运行的端口。

类型：`Number`

默认值：`8080`

示例：

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { port: 8181 }]],
	// ...
};
```

### rootDir

WireMock 查找文件的路径。

类型：`String`

默认值：`./mock`

示例：

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { rootDir: './mock' }]],
	// ...
};
```

### version

要下载和使用的 WireMock 版本。

类型：`String`

默认值：`3.3.1`

示例：

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { version: '2.25.1' }]],
	// ...
};
```

### skipWiremockInstall

告诉服务跳过下载 WireMock。

类型：`Boolean`

默认值：false

示例：

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { skipWiremockInstall: true }]],
	// ...
};
```

### binPath

本地 Wiremock 二进制文件的自定义路径（通常与 skipWiremockInstall 结合使用）。

类型：`String`

默认值：'./wiremock-standalone-3.0.0.jar'（相对于服务）

示例：

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { binPath: './my-custom/example-path/wiremock-standalone-3.0.0.jar' }]],
	// ...
};
```

### silent

WireMock 输出的静默模式（包括来自服务本身的额外日志记录）。

类型：`Boolean`

默认值：`false`

示例：

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { silent: true }]],
	// ...
};
```

### mavenBaseUrl

Maven 的基础下载 URL。

类型：`String`

默认值：`https://repo1.maven.org/maven2`

示例：

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { mavenBaseUrl: 'https://repo1.maven.org/maven2' }]],
	// ...
};
```

### args

您可以传递所有支持的 WireMock 配置参数的列表。

注意：您不能在这里传递选项（`port`、`rootDir`、`stdio`、`mavenBaseUrl`），因为它们将被忽略。

类型：`Array`

示例：

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

### 编写测试

编写您的第一个测试非常简单：

#### 使用 WDIO 测试运行器

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

#### 使用 WebdriverIO 独立模式

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

有关 WebdriverIO 的更多信息，请参阅[主页](https://webdriver.io)。