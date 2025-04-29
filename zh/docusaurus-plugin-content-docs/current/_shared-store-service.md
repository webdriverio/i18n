---
id: shared-store-service
title: 共享存储服务
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-shared-store-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> 在主进程和工作进程（测试规格）之间交换数据。

## 安装

最简单的方法是将 `@wdio/shared-store-service` 作为开发依赖保留在你的 `package.json` 中，通过：

```sh
npm install @wdio/shared-store-service --save-dev
```

关于如何安装 `WebdriverIO` 的说明可以在[这里](https://webdriver.io/docs/gettingstarted)找到。

## 使用方法

通过键（字符串）从存储中获取/设置值（普通对象）。键可以是任意字符串，除了保留的 `*`，它允许你获取整个存储。

### 设置值

要设置存储中的值，调用：

```js
await browser.sharedStore.set('key', 'foobar123')
```

### 获取值

要从存储中获取值，调用：

```js
const value = await browser.sharedStore.get('key')
console.log(value) // 返回 "foobar123"
```

你也可以使用 `*` 键获取所有键值：

```js
const store = await browser.sharedStore.get('*')
console.log(value) // 返回 `{ key: "foobar" }`
```

### 在 WDIO 钩子中访问存储

你也可以直接访问 `setValue` 和 `getValue` 异步处理程序。
确保正确地使用 `await` 关键字调用它们。

```js
// wdio.conf.js
import { setValue, getValue } from '@wdio/shared-store-service'

export const config = {
    // ...
    onPrepare: [async function (config, capabilities) {
        await setValue('foo', 'bar')
    }],
    // ...
    after: async () => {
        const value = await getValue('foo')
        // ...
    }
```

重要！每个规格文件应该是原子的，并与其他规格隔离。
该服务的想法是处理非常特定的环境设置问题。
请避免共享测试执行数据！

### 资源池

如果工作进程正在竞争必须为每个工作进程分配的资源，你可以使用资源池 API：

```js
// wdio.conf.js
import { setResourcePool, getValueFromPool, addValueToPool } from '@wdio/shared-store-service'

export const config = {
    maxInstances: 2,
    // ...
    onPrepare: async function (config, capabilities) {
        await setResourcePool('availableUrls', ['url01.com', 'url02.com'])
    },
    // ...
    beforeSession: async (conf) => {
        conf.baseUrl = await getValueFromPool('availableUrls');
    },
    // ...
    afterSession: async (conf) => {
        // worker returns the used resource for next workers to use
        await addValueToPool('availableUrls', conf.baseUrl);
    }
```

这个例子确保两个工作进程永远不会使用相同的 `baseUrl`。一个唯一的 url 只分配给一个工作进程，直到它被释放。

## 配置

将 `shared-store` 添加到服务列表中，`sharedStore` 对象将在你的测试中的 [`browser` 作用域](https://webdriver.io/docs/api/browser)中可访问。

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['shared-store'],
    // ...
};
```

如果你使用的是 typescript，请确保将 `@wdio/shared-store-service` 添加到你的 `compilerOptions.types` 中：

```js
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/shared-store-service"],
    }
}
```