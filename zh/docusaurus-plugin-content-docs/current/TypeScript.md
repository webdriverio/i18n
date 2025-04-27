---
id: typescript
title: TypeScript 设置
---

您可以使用 [TypeScript](http://www.typescriptlang.org) 编写测试以获得自动完成和类型安全。

您需要在 `devDependencies` 中安装 [`tsx`](https://github.com/privatenumber/tsx)，通过：

```bash npm2yarn
$ npm install tsx --save-dev
```

WebdriverIO 会自动检测是否安装了这些依赖项，并为您编译配置和测试。确保在与 WDIO 配置相同的目录中有一个 `tsconfig.json`。

#### 自定义 TSConfig

如果您需要为 `tsconfig.json` 设置不同的路径，请使用 TSCONFIG_PATH 环境变量设置您想要的路径，或使用 wdio 配置的 [tsConfigPath 设置](/docs/configurationfile)。

或者，您可以使用 `tsx` 的[环境变量](https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path)。

#### 类型检查

请注意，`tsx` 不支持类型检查 - 如果您希望检查类型，则需要在单独的步骤中使用 `tsc` 进行检查。

## 框架设置

您的 `tsconfig.json` 需要包含以下内容：

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types"]
    }
}
```

请避免显式导入 `webdriverio` 或 `@wdio/sync`。
一旦在 `tsconfig.json` 的 `types` 中添加，`WebdriverIO` 和 `WebDriver` 类型将可从任何地方访问。如果您使用其他 WebdriverIO 服务、插件或 `devtools` 自动化包，请也将它们添加到 `types` 列表中，因为许多提供额外的类型定义。

## 框架类型

根据您使用的框架，您需要将该框架的类型添加到 `tsconfig.json` 的 types 属性中，并安装其类型定义。如果您想要内置断言库 [`expect-webdriverio`](https://www.npmjs.com/package/expect-webdriverio) 的类型支持，这一点尤为重要。

例如，如果您决定使用 Mocha 框架，您需要安装 `@types/mocha` 并像这样添加它，以使所有类型全局可用：

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
    {label: 'Cucumber', value: 'cucumber'},
  ]
}>
<TabItem value="mocha">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
    }
}
```

</TabItem>
<TabItem value="jasmine">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/jasmine-framework"]
    }
}
```

</TabItem>
<TabItem value="cucumber">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/cucumber-framework"]
    }
}
```

</TabItem>
</Tabs>

## 服务

如果您使用的服务向浏览器范围添加命令，您也需要将这些服务包含在 `tsconfig.json` 中。例如，如果您使用 `@wdio/lighthouse-service`，请确保也将其添加到 `types` 中，例如：

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": [
            "node",
            "@wdio/globals/types",
            "@wdio/mocha-framework",
            "@wdio/lighthouse-service"
        ]
    }
}
```

将服务和报告器添加到 TypeScript 配置中也会增强 WebdriverIO 配置文件的类型安全性。

## 类型定义

运行 WebdriverIO 命令时，所有属性通常都是有类型的，因此您不必处理导入其他类型。但在某些情况下，您可能想要预先定义变量。为确保这些变量类型安全，您可以使用 [`@wdio/types`](https://www.npmjs.com/package/@wdio/types) 包中定义的所有类型。例如，如果您想为 `webdriverio` 定义远程选项，可以这样做：

```ts
import type { Options } from '@wdio/types'

// 这是一个您可能想要直接导入类型的示例
const remoteConfig: Options.WebdriverIO = {
    hostname: 'http://localhost',
    port: '4444' // 错误：类型'string'不能赋值给类型'number'.ts(2322)
    capabilities: {
        browserName: 'chrome'
    }
}

// 对于其他情况，您可以使用 `WebdriverIO` 命名空间
export const config: WebdriverIO.Config = {
  ...remoteConfig
  // 其他配置选项
}
```

## 提示和建议

### 编译和代码检查

为了完全安全，您可以考虑遵循最佳实践：使用 TypeScript 编译器编译代码（运行 `tsc` 或 `npx tsc`），并在 [pre-commit hook](https://github.com/typicode/husky) 上运行 [eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)。