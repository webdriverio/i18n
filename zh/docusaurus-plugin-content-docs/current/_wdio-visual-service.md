---
id: wdio-visual-service
title: 图像比较（视觉回归测试）服务
custom_edit_url: https://github.com/webdriverio/visual-testing/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @wdio/visual-service 是一个第三方包，更多信息请参见 [GitHub](https://github.com/webdriverio/visual-testing) | [npm](https://www.npmjs.com/package/@wdio/visual-service)

有关使用 WebdriverIO 进行视觉测试的文档，请参阅 [文档](https://webdriver.io/docs/visual-testing)。该项目包含使用 WebdriverIO 运行视觉测试的所有相关模块。在 `./packages` 目录中，你将找到：

-   `@wdio/visual-testing`：用于集成视觉测试的 WebdriverIO 服务
-   `webdriver-image-comparison`：一个图像比较模块，可用于支持 WebDriver 协议的不同 NodeJS 测试自动化框架

## Storybook 运行器（测试版）

<details>
  <summary>点击查看更多关于 Storybook 运行器测试版的文档</summary>

> Storybook 运行器仍处于测试阶段，文档稍后将移至 [WebdriverIO](https://webdriver.io/docs/visual-testing) 文档页面。

该模块现在支持 Storybook 并提供新的视觉运行器。该运行器会自动扫描本地/远程 Storybook 实例，并为每个组件创建元素截图。可以通过添加

```ts
export const config: WebdriverIO.Config = {
    // ...
    services: ["visual"],
    // ....
};
```

到你的 `services` 配置中，并通过命令行运行 `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook`。
它将默认使用 Chrome 浏览器的无头模式。

> [!NOTE]
>
> -   大多数视觉测试选项也适用于 Storybook 运行器，请参阅 [WebdriverIO](https://webdriver.io/docs/visual-testing) 文档。
> -   Storybook 运行器将覆盖所有你的功能配置，并且只能在其支持的浏览器上运行，请参见 [`--browsers`](#browsers)。
> -   Storybook 运行器不支持使用 Multiremote 功能的现有配置，并会抛出错误。
> -   Storybook 运行器仅支持桌面网页，不支持移动网页。

### Storybook 运行器服务选项

服务选项可以这样提供

```ts
export const config: WebdriverIO.Config  = {
    // ...
    services: [
      [
        'visual',
        {
            // 一些默认选项
            baselineFolder: join(process.cwd(), './__snapshots__/'),
            debug: true,
            // Storybook 选项，参见命令行选项描述
            storybook: {
                additionalSearchParams: new URLSearchParams({foo: 'bar', abc: 'def'}),
                clip: false,
                clipSelector: ''#some-id,
                numShards: 4,
                // `skipStories` 可以是字符串 ('example-button--secondary'),
                // 数组 (['example-button--secondary', 'example-button--small'])
                // 或正则表达式，需要以字符串形式提供 ("/.*button.*/gm")
                skipStories: ['example-button--secondary', 'example-button--small'],
                url: 'https://www.bbc.co.uk/iplayer/storybook/',
                version: 6,
                // 可选 - 允许覆盖基准路径。默认情况下，它会按类别和组件分组基准(例如 forms/input/baseline.png)
                getStoriesBaselinePath: (category, component) => `path__${category}__${component}`,
            },
        },
      ],
    ],
    // ....
}
```

### Storybook 运行器命令行选项

#### `--additionalSearchParams`

-   **类型：** `string`
-   **必需：** 否
-   **默认值：** ''
-   **示例：** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --additionalSearchParams="foo=bar&abc=def"`

它将向 Storybook URL 添加额外的搜索参数。
有关更多信息，请参阅 [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) 文档。字符串必须是有效的 URLSearchParams 字符串。

> [!NOTE]
> 需要双引号以防止 `&` 被解释为命令分隔符。
> 例如，使用 `--additionalSearchParams="foo=bar&abc=def"` 将为故事测试生成以下 Storybook URL：`http://storybook.url/iframe.html?id=story-id&foo=bar&abc=def`。

#### `--browsers`

-   **类型：** `string`
-   **必需：** 否
-   **默认值：** `chrome`，你可以从 `chrome|firefox|edge|safari` 中选择
-   **示例：** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --browsers=chrome,firefox,edge,safari`
-   **注意：** 仅通过命令行可用

它将使用提供的浏览器来拍摄组件截图

> [!NOTE]
> 确保你想运行的浏览器已安装在本地机器上

#### `--clip`

-   **类型：** `boolean`
-   **必需：** 否
-   **默认值：** `true`
-   **示例：** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --clip=false`

禁用时，它将创建视口截图。启用时，它将根据 [`--clipSelector`](#clipselector) 创建元素截图，这将减少组件截图周围的空白区域并减少截图大小。

#### `--clipSelector`

-   **类型：** `string`
-   **必需：** 否
-   **默认值：** Storybook V7 是 `#storybook-root > :first-child`，Storybook V6 是 `#root > :first-child:not(script):not(style)`，另请参见 [`--version`](#version)
-   **示例：** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --clipSelector="#some-id"`

这是将用于以下目的的选择器：

-   选择要截图的元素
-   等待元素可见后再进行截图

#### `--devices`

-   **类型：** `string`
-   **必需：** 否
-   **默认值：** 你可以从 [`deviceDescriptors.ts`](https://github.com/webdriverio/visual-testing/blob/main/./packages/service/src/storybook/deviceDescriptors.ts) 中选择
-   **示例：** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --devices="iPhone 14 Pro Max","Pixel 3 XL"`
-   **注意：** 仅通过命令行可用

它将使用与 [`deviceDescriptors.ts`](https://github.com/webdriverio/visual-testing/blob/main/./packages/service/src/storybook/deviceDescriptors.ts) 匹配的提供设备来拍摄组件截图

> [!NOTE]
>
> -   如果你缺少设备配置，请随时提交 [功能请求](https://github.com/webdriverio/visual-testing/issues/new?assignees=&labels=&projects=&template=--feature-request.md)
> -   这只适用于 Chrome：
>     -   如果你提供 `--devices`，则所有 Chrome 实例将在**移动模拟**模式下运行
>     -   如果你还提供了其他浏览器，如 `--devices --browsers=firefox,safari,edge`，它将自动添加移动模拟模式的 Chrome
> -   Storybook 运行器默认会创建元素快照，如果你想查看完整的移动模拟截图，则通过命令行提供 `--clip=false`
> -   文件名例如会是 `__snapshots__/example/button/desktop_chrome/example-button--large-local-chrome-iPhone-14-Pro-Max-430x932-dpr-3.png`
> -   **[来源：](https://chromedriver.chromium.org/mobile-emulation#h.p_ID_167)** 使用移动模拟在桌面上测试移动网站可能很有用，但测试人员应该意识到存在许多细微差别，例如：
>     -   完全不同的 GPU，可能导致性能大幅变化；
>     -   未模拟移动 UI（特别是，隐藏的 URL 栏会影响页面高度）；
>     -   不支持消歧弹出窗口（在其中选择几个触摸目标之一）；
>     -   许多硬件 API（例如，orientationchange 事件）不可用。

#### `--headless`

-   **类型：** `boolean`
-   **必需：** 否
-   **默认值：** `true`
-   **示例：** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --headless=false`
-   **注意：** 仅通过命令行可用

这将默认在无头模式下运行测试（当浏览器支持时）或可以禁用

#### `--numShards`

-   **类型：** `number`
-   **必需：** 否
-   **默认值：** `true`
-   **示例：** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --numShards=10`

这将是用于运行故事的并行实例数。这将受到 `wdio.conf` 文件中 `maxInstances` 的限制。

> [!IMPORTANT]
> 在 `headless` 模式下运行时，不要将数量增加到超过 20，以防止由于资源限制而导致的不稳定性

#### `--skipStories`

-   **类型：** `string|regex`
-   **必需：** 否
-   **默认值：** null
-   **示例：** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --skipStories="/.*button.*/gm"`

这可以是：

-   字符串 (`example-button--secondary,example-button--small`)
-   或正则表达式 (`"/.*button.*/gm"`)

用于跳过某些故事。使用故事的 `id`，可以在故事的 URL 中找到。例如，URL `http://localhost:6006/?path=/story/example-page--logged-out` 中的 `id` 是 `example-page--logged-out`

#### `--url`

-   **类型：** `string`
-   **必需：** 否
-   **默认值：** `http://127.0.0.1:6006`
-   **示例：** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --url="https://example.com"`

托管 Storybook 实例的 URL。

#### `--version`

-   **类型：** `number`
-   **必需：** 否
-   **默认值：** 7
-   **示例：** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --version=6`

这是 Storybook 的版本，默认为 `7`。这是需要知道是否使用 V6 [`clipSelector`](#clipselector) 所必需的。

### Storybook 交互测试

Storybook 交互测试允许你通过创建带有 WDIO 命令的自定义脚本与组件交互，将组件设置为特定状态。例如，请参阅下面的代码片段：

```ts
import { browser, expect } from "@wdio/globals";

describe("Storybook Interaction", () => {
    it("should create screenshots for the logged in state when it logs out", async () => {
        const componentId = "example-page--logged-in";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
        await $("button=Log out").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
    });

    it("should create screenshots for the logged out state when it logs in", async () => {
        const componentId = "example-page--logged-out";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
        await $("button=Log in").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
    });
});
```

在两个不同的组件上执行了两个测试。每个测试首先设置一个状态，然后拍摄截图。你还会注意到引入了一个新的自定义命令，可以在[这里](#new-custom-command)找到。

上面的规格文件可以保存在一个文件夹中，并通过以下命令添加到命令行：

```sh
pnpm run test.local.desktop.storybook.localhost -- --spec='tests/specs/storybook-interaction/*.ts'
```

Storybook 运行器将首先自动扫描您的 Storybook 实例，然后将您的测试添加到需要比较的故事中。如果您不希望用于交互测试的组件被重复比较，可以通过提供 [`--skipStories`](#--skipstories) 过滤器来从扫描中移除"默认"故事。这看起来像这样：

```sh
pnpm run test.local.desktop.storybook.localhost -- --skipStories="/example-page.*/gm" --spec='tests/specs/storybook-interaction/*.ts'
```

### 新的自定义命令

一个名为 `browser.waitForStorybookComponentToBeLoaded({ id: 'componentId' })` 的新自定义命令将被添加到 `browser/driver` 对象中，它将自动加载组件并等待完成，因此您不需要使用 `browser.url('url.com')` 方法。它可以这样使用：

```ts
import { browser, expect } from "@wdio/globals";

describe("Storybook Interaction", () => {
    it("should create screenshots for the logged in state when it logs out", async () => {
        const componentId = "example-page--logged-in";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
        await $("button=Log out").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
    });

    it("should create screenshots for the logged out state when it logs in", async () => {
        const componentId = "example-page--logged-out";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
        await $("button=Log in").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
    });
});
```

选项包括：

#### `additionalSearchParams`

-   **类型：** [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
-   **必需：** 否
-   **默认值：** `new URLSearchParams()`
-   **示例：**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    additionalSearchParams: new URLSearchParams({ foo: "bar", abc: "def" }),
    id: "componentId",
});
```

这将向 Storybook URL 添加额外的搜索参数，在上面的示例中，URL 将是 `http://storybook.url/iframe.html?id=story-id&foo=bar&abc=def`。
有关更多信息，请参阅 [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) 文档。

#### `clipSelector`

-   **类型：** `string`
-   **必需：** 否
-   **默认值：** Storybook V7 是 `#storybook-root > :first-child`，Storybook V6 是 `#root > :first-child:not(script):not(style)`
-   **示例：**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    clipSelector: "#your-selector",
    id: "componentId",
});
```

这是将用于以下目的的选择器：

-   选择要截图的元素
-   等待元素可见后再进行截图

#### `id`

-   **类型：** `string`
-   **必需：** 是
-   **示例：**

```ts
await browser.waitForStorybookComponentToBeLoaded({ '#your-selector', id: 'componentId' })
```

使用故事的 `id`，可以在故事的 URL 中找到。例如，URL `http://localhost:6006/?path=/story/example-page--logged-out` 中的 `id` 是 `example-page--logged-out`

#### `timeout`

-   **类型：** `number`
-   **必需：** 否
-   **默认值：** 1100 毫秒
-   **示例：**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    id: "componentId",
    timeout: 20000,
});
```

在页面加载后等待组件可见的最大超时时间

#### `url`

-   **类型：** `string`
-   **必需：** 否
-   **默认值：** `http://127.0.0.1:6006`
-   **示例：**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    id: "componentId",
    url: "https://your.url",
});
```

托管 Storybook 实例的 URL。

</details>

## 贡献

### 更新包

你可以使用简单的 CLI 工具更新包。确保你已安装所有依赖项，然后运行

```sh
pnpm update.packages
```

这将触发一个 CLI，询问你以下问题

```logs
==========================
🤖 Package update Wizard 🧙
==========================

? Which version target would you like to update to? (Minor|Latest)
? Do you want to update the package.json files? (Y/n)
? Do you want to remove all "node_modules" and reinstall dependencies? (Y/n)
? Would you like reinstall the dependencies? (Y/n)
```

这将产生以下日志

<details>
    <summary>打开查看日志示例</summary>
    
```logs
==========================
🤖 Package update Wizard 🧙
==========================

? Which version target would you like to update to? Minor
? Do you want to update the package.json files? yes
Updating root 'package.json' for minor updates...
Updating packages for minor updates in /Users/wswebcreation/Git/wdio/visual-testing...
Using pnpm
Upgrading /Users/wswebcreation/Git/wdio/visual-testing/package.json
[====================] 38/38 100%

@typescript-eslint/eslint-plugin ^8.7.0 → ^8.8.0
@typescript-eslint/parser ^8.7.0 → ^8.8.0
@typescript-eslint/utils ^8.7.0 → ^8.8.0
@vitest/coverage-v8 ^2.1.1 → ^2.1.2
vitest ^2.1.1 → ^2.1.2

Run pnpm install to install new versions.
Updating packages for minor updates in /Users/wswebcreation/Git/wdio/visual-testing/packages/ocr-service...
Using pnpm
Upgrading /Users/wswebcreation/Git/wdio/visual-testing/packages/ocr-service/package.json
[====================] 11/11 100%

All dependencies match the minor package versions :)
Updating packages for minor updates in /Users/wswebcreation/Git/wdio/visual-testing/packages/visual-reporter...
Using pnpm
Upgrading /Users/wswebcreation/Git/wdio/visual-testing/packages/visual-reporter/package.json
[====================] 11/11 100%

eslint-config-next 14.2.13 → 14.2.14
next 14.2.13 → 14.2.14

Run pnpm install to install new versions.
Updating packages for minor updates in /Users/wswebcreation/Git/wdio/visual-testing/packages/visual-service...
Using pnpm
Upgrading /Users/wswebcreation/Git/wdio/visual-testing/packages/visual-service/package.json
[====================] 5/5 100%

All dependencies match the minor package versions :)
Updating packages for minor updates in /Users/wswebcreation/Git/wdio/visual-testing/packages/webdriver-image-comparison...
Using pnpm
Upgrading /Users/wswebcreation/Git/wdio/visual-testing/packages/webdriver-image-comparison/package.json
[====================] 8/8 100%

All dependencies match the minor package versions :)
? Do you want to remove all "node_modules" and reinstall dependencies? yes
Removing root dependencies in /Users/wswebcreation/Git/wdio/visual-testing...
Removing dependencies in ocr-service...
Removing dependencies in visual-reporter...
Removing dependencies in visual-service...
Removing dependencies in webdriver-image-comparison...
? Would you like reinstall the dependencies? yes
Installing dependencies in /Users/wswebcreation/Git/wdio/visual-testing...

> @wdio/visual-testing-monorepo@ pnpm.install.workaround /Users/wswebcreation/Git/wdio/visual-testing
> pnpm install --shamefully-hoist

Scope: all 5 workspace projects
Lockfile is up to date, resolution step is skipped
Packages: +1274
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 1274, reused 1265, downloaded 0, added 1274, done

dependencies:

-   @wdio/ocr-service 2.0.0 <- packages/ocr-service
-   @wdio/visual-service 6.0.0 <- packages/visual-service

devDependencies:

-   @changesets/cli 2.27.8
-   @inquirer/prompts 5.5.0
-   @tsconfig/node20 20.1.4
-   @types/eslint 9.6.1
-   @types/jsdom 21.1.7
-   @types/node 20.16.4
-   @types/react 18.3.5
-   @types/react-dom 18.3.0
-   @types/xml2js 0.4.14
-   @typescript-eslint/eslint-plugin 8.8.0
-   @typescript-eslint/parser 8.8.0
-   @typescript-eslint/utils 8.8.0
-   @vitest/coverage-v8 2.1.2
-   @wdio/appium-service 9.1.2
-   @wdio/cli 9.1.2
-   @wdio/globals 9.1.2
-   @wdio/local-runner 9.1.2
-   @wdio/mocha-framework 9.1.2
-   @wdio/sauce-service 9.1.2
-   @wdio/shared-store-service 9.1.2
-   @wdio/spec-reporter 9.1.2
-   @wdio/types 9.1.2
-   eslint 9.11.1
-   eslint-plugin-import 2.30.0
-   eslint-plugin-unicorn 55.0.0
-   eslint-plugin-wdio 9.0.8
-   husky 9.1.6
-   jsdom 25.0.1
-   pnpm-run-all2 6.2.3
-   release-it 17.6.0
-   rimraf 6.0.1
-   saucelabs 8.0.0
-   ts-node 10.9.2
-   typescript 5.6.2
-   vitest 2.1.2
-   webdriverio 9.1.2

. prepare$ husky
└─ Done in 204ms
Done in 9.5s
All packages updated!

````

</details>

### 问题

如果您对贡献此项目有任何问题或问题，请加入我们的 [Discord](https://discord.webdriver.io) 服务器。在 `🙏-contributing` 频道中找到我们的贡献者。

### 议题

如果您有问题、错误或功能请求，请提交问题。在提交问题之前，请搜索问题归档以帮助减少重复，并阅读 [FAQ](https://webdriver.io/docs/visual-testing/faq/)。

如果找不到，您可以提交以下内容：

-   🐛**错误报告**：创建报告以帮助我们改进
-   📖**文档**：建议改进或报告缺失/不清楚的文档。
-   💡**功能请求**：为此模块提出想法。
-   💬**问题**：提出问题。

### 开发工作流程

要为该项目创建 PR 并开始贡献，请按照以下步骤操作：

-   Fork 项目。
-   在计算机上的某处克隆项目

    ```sh
    $ git clone https://github.com/webdriverio/visual-testing.git
    ```

-   进入目录并设置项目

    ```sh
    $ cd visual-testing
    $ corepack enable
    $ pnpm pnpm.install.workaround
    ```

-   运行监视模式，自动转译代码

    ```sh
    $ pnpm watch
    ```

    要构建项目，运行：

    ```sh
    $ pnpm build
    ```

-   确保你的更改不会破坏任何测试，运行：

    ```sh
    $ pnpm test
    ```

该项目使用 [changesets](https://github.com/changesets/changesets) 自动创建变更日志和版本发布。

### 测试

需要执行多项测试才能测试该模块。添加 PR 时，所有测试必须至少通过本地测试。每个 PR 都会在 Sauce Labs 上自动测试，详见 [我们的 GitHub Actions 流水线](https://github.com/webdriverio/visual-testing/actions/workflows/tests.yml)。在批准 PR 之前，核心贡献者将针对模拟器/仿真器/真实设备测试 PR。

#### 本地测试

首先，需要创建本地基准。可以通过以下方式完成：

```sh
// 使用 webdriver 协议
$ pnpm run test.local.init
```

此命令将创建一个名为 `localBaseline` 的文件夹，用于保存所有基准图像。

然后运行：

```sh
// 使用 webdriver 协议
pnpm run test.local.desktop
```

这将在本地机器上的 Chrome 浏览器上运行所有测试。

#### 本地 Storybook 运行器测试（测试版）

首先，需要创建本地基准。可以通过以下方式完成：

```sh
pnpm run test.local.desktop.storybook
```

这将使用 Chrome 无头模式在 https://govuk-react.github.io/govuk-react/ 上的演示 Storybook 仓库上运行 Storybook 测试。

要使用更多浏览器运行测试，可以运行

```sh
pnpm run test.local.desktop.storybook -- --browsers=chrome,firefox,edge,safari
```

> [!NOTE]
> 确保你想要运行的浏览器已安装在本地机器上

#### 使用 Sauce Labs 进行 CI 测试（PR 不需要）

以下命令用于在 GitHub Actions 上测试构建，只能在那里使用，不能用于本地开发。

```
$ pnpm run test.saucelabs
```

它将针对[这里](https://github.com/webdriverio/visual-testing/blob/main/./tests/configs/wdio.saucelabs.web.conf.ts)的大量配置进行测试。
所有 PR 都会自动在 Sauce Labs 上进行检查。

## 发布

要发布上述任何包的版本，请执行以下操作：

-   触发[发布流水线](https://github.com/webdriverio/visual-testing/actions/workflows/release.yml)
-   生成发布 PR，由另一位 WebdriverIO 成员审核并批准
-   合并 PR
-   再次触发[发布流水线](https://github.com/webdriverio/visual-testing/actions/workflows/release.yml)
-   新版本应该发布了 🎉

## 鸣谢

`@wdio/visual-testing` 使用来自 [LambdaTest](https://www.lambdatest.com/) 和 [Sauce Labs](https://saucelabs.com/) 的开源许可证。