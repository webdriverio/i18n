---
id: runner
title: 运行器
---

import CodeBlock from '@theme/CodeBlock';

WebdriverIO中的运行器负责协调测试如何以及在何处运行，当使用测试运行器时。WebdriverIO目前支持两种不同类型的运行器：本地运行器和浏览器运行器。

## 本地运行器

[本地运行器](https://www.npmjs.com/package/@wdio/local-runner)在工作进程中启动您的框架（例如Mocha、Jasmine或Cucumber），并在您的Node.js环境中运行所有测试文件。每个测试文件都在一个单独的工作进程中运行（每个能力），从而实现最大并发性。每个工作进程使用一个浏览器实例，因此运行自己的浏览器会话，允许最大程度的隔离。

由于每个测试都在自己的隔离进程中运行，因此无法在测试文件之间共享数据。有两种方法可以解决这个问题：

- 使用[`@wdio/shared-store-service`](https://www.npmjs.com/package/@wdio/shared-store-service)来在所有工作进程之间共享数据
- 对规格文件进行分组（在[组织测试套件](https://webdriver.io/docs/organizingsuites#grouping-test-specs-to-run-sequentially)中阅读更多内容）

如果在`wdio.conf.js`中没有定义其他内容，本地运行器是WebdriverIO中的默认运行器。

### 安装

要使用本地运行器，您可以通过以下方式安装：

```sh
npm install --save-dev @wdio/local-runner
```

### 设置

本地运行器是WebdriverIO中的默认运行器，因此不需要在`wdio.conf.js`中定义它。如果您想明确设置它，可以按如下方式定义：

```js
// wdio.conf.js
export const {
    // ...
    runner: 'local',
    // ...
}
```

## 浏览器运行器

与[本地运行器](https://www.npmjs.com/package/@wdio/local-runner)不同，[浏览器运行器](https://www.npmjs.com/package/@wdio/browser-runner)在浏览器内启动和执行框架。这允许您在实际浏览器中运行单元测试或组件测试，而不是像许多其他测试框架那样在JSDOM中运行。

虽然[JSDOM](https://www.npmjs.com/package/jsdom)被广泛用于测试目的，但它最终不是一个真正的浏览器，也不能用它模拟移动环境。通过这个运行器，WebdriverIO使您能够轻松地在浏览器中运行测试，并使用WebDriver命令与页面上渲染的元素进行交互。

以下是在JSDOM与WebdriverIO浏览器运行器中运行测试的对比：

| | JSDOM | WebdriverIO浏览器运行器 |
|-|-------|----------------------------|
|1.| 在Node.js中运行您的测试，使用Web标准的重新实现，特别是WHATWG DOM和HTML标准 | 在实际浏览器中执行您的测试，并在您的用户使用的环境中运行代码 |
|2.| 与组件的交互只能通过JavaScript模拟 | 您可以使用[WebdriverIO API](api)通过WebDriver协议与元素交互 |
|3.| Canvas支持需要[额外的依赖](https://www.npmjs.com/package/canvas)并且[有限制](https://github.com/Automattic/node-canvas/issues) | 您可以访问真正的[Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) |
|4.| JSDOM有一些[注意事项](https://github.com/jsdom/jsdom#caveats)和不支持的Web API | 所有Web API都受支持，因为测试在实际浏览器中运行 |
|5.| 不可能跨浏览器检测错误 | 支持所有浏览器，包括移动浏览器 |
|6.| __不能__测试元素伪状态 | 支持伪状态，如`:hover`或`:active` |

此运行器使用[Vite](https://vitejs.dev/)来编译您的测试代码并将其加载到浏览器中。它为以下组件框架提供预设：

- React
- Preact
- Vue.js
- Svelte
- SolidJS
- Stencil

每个测试文件/测试文件组在单个页面内运行，这意味着在每个测试之间，页面都会重新加载，以确保测试之间的隔离。

### 安装

要使用浏览器运行器，您可以通过以下方式安装：

```sh
npm install --save-dev @wdio/browser-runner
```

### 设置

要使用浏览器运行器，您必须在`wdio.conf.js`文件中定义一个`runner`属性，例如：

```js
// wdio.conf.js
export const {
    // ...
    runner: 'browser',
    // ...
}
```

### 运行器选项

浏览器运行器允许以下配置：

#### `preset`

如果您使用上述提到的框架之一测试组件，可以定义一个预设，确保一切都已配置好。此选项不能与`viteConfig`一起使用。

__类型:__ `vue` | `svelte` | `solid` | `react` | `preact` | `stencil`<br />
__示例:__

```js title="wdio.conf.js"
export const {
    // ...
    runner: ['browser', {
        preset: 'svelte'
    }],
    // ...
}
```

#### `viteConfig`

定义您自己的[Vite配置](https://vitejs.dev/config/)。您可以传入自定义对象或导入现有的`vite.conf.ts`文件（如果您使用Vite.js进行开发）。请注意，WebdriverIO保留自定义Vite配置以设置测试环境。

__类型:__ `string`或[`UserConfig`](https://github.com/vitejs/vite/blob/52e64eb43287d241f3fd547c332e16bd9e301e95/packages/vite/src/node/config.ts#L119-L272)或`(env: ConfigEnv) => UserConfig | Promise<UserConfig>`<br />
__示例:__

```js title="wdio.conf.ts"
import viteConfig from '../vite.config.ts'

export const {
    // ...
    runner: ['browser', { viteConfig }],
    // 或者简单地：
    runner: ['browser', { viteConfig: '../vites.config.ts' }],
    // 或者使用函数，如果您的vite配置包含许多插件，
    // 您只想在读取值时解析它们
    runner: ['browser', {
        viteConfig: () => ({
            // ...
        })
    }],
    // ...
}
```

#### `headless`

如果设置为`true`，运行器将更新功能以无头方式运行测试。默认情况下，在CI环境中启用此功能，其中`CI`环境变量设置为`'1'`或`'true'`。

__类型:__ `boolean`<br />
__默认值:__ `false`，如果设置了`CI`环境变量则为`true`

#### `rootDir`

项目根目录。

__类型:__ `string`<br />
__默认值:__ `process.cwd()`

#### `coverage`

WebdriverIO支持通过[`istanbul`](https://istanbul.js.org/)进行测试覆盖率报告。有关更多详细信息，请参阅[覆盖率选项](#coverage-options)。

__类型:__ `object`<br />
__默认值:__ `undefined`

### 覆盖率选项

以下选项允许配置覆盖率报告。

#### `enabled`

启用覆盖率收集。

__类型:__ `boolean`<br />
__默认值:__ `false`

#### `include`

覆盖率中包含的文件列表，使用glob模式。

__类型:__ `string[]`<br />
__默认值:__ `[**]`

#### `exclude`

覆盖率中排除的文件列表，使用glob模式。

__类型:__ `string[]`<br />
__默认值:__

```
[
  'coverage/**',
  'dist/**',
  'packages/*/test{,s}/**',
  '**/*.d.ts',
  'cypress/**',
  'test{,s}/**',
  'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
  '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}',
  '**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}',
  '**/__tests__/**',
  '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
  '**/.{eslint,mocha,prettier}rc.{js,cjs,yml}',
]
```

#### `extension`

报告应包含的文件扩展名列表。

__类型:__ `string | string[]`<br />
__默认值:__ `['.js', '.cjs', '.mjs', '.ts', '.mts', '.cts', '.tsx', '.jsx', '.vue', '.svelte']`

#### `reportsDirectory`

写入覆盖率报告的目录。

__类型:__ `string`<br />
__默认值:__ `./coverage`

#### `reporter`

要使用的覆盖率报告器。有关所有报告器的详细列表，请参阅[istanbul文档](https://istanbul.js.org/docs/advanced/alternative-reporters/)。

__类型:__ `string[]`<br />
__默认值:__ `['text', 'html', 'clover', 'json-summary']`

#### `perFile`

按文件检查阈值。有关实际阈值，请参阅`lines`、`functions`、`branches`和`statements`。

__类型:__ `boolean`<br />
__默认值:__ `false`

#### `clean`

在运行测试之前清除覆盖率结果。

__类型:__ `boolean`<br />
__默认值:__ `true`

#### `lines`

行的阈值。

__类型:__ `number`<br />
__默认值:__ `undefined`

#### `functions`

函数的阈值。

__类型:__ `number`<br />
__默认值:__ `undefined`

#### `branches`

分支的阈值。

__类型:__ `number`<br />
__默认值:__ `undefined`

#### `statements`

语句的阈值。

__类型:__ `number`<br />
__默认值:__ `undefined`

### 限制

在使用WebdriverIO浏览器运行器时，需要注意的是，线程阻塞对话框如`alert`或`confirm`不能原生使用。这是因为它们会阻塞网页，这意味着WebdriverIO无法继续与页面通信，导致执行挂起。

在这种情况下，WebdriverIO为这些API提供默认的模拟，并返回默认值。这确保了如果用户意外使用同步弹出式Web API，执行不会挂起。但是，仍然建议用户为这些Web API进行模拟以获得更好的体验。在[模拟](/docs/component-testing/mocking)中了解更多。

### 示例

请务必查看[组件测试](https://webdriver.io/docs/component-testing)相关文档，并查看[示例仓库](https://github.com/webdriverio/component-testing-examples)，了解使用这些和其他各种框架的示例。