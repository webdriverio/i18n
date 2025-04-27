---
id: visual-testing
title: 视觉测试
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 它能做什么？

WebdriverIO提供屏幕、元素或整个页面的图像比较功能，适用于：

-   🖥️ 桌面浏览器（Chrome / Firefox / Safari / Microsoft Edge）
-   📱 移动/平板浏览器（通过Appium在Android模拟器上的Chrome / iOS模拟器上的Safari / 模拟器 / 真实设备）
-   📱 原生应用（通过Appium在Android模拟器 / iOS模拟器 / 真实设备上）（🌟 **新功能** 🌟）
-   📳 通过Appium的混合应用

这些功能通过轻量级WebdriverIO服务[`@wdio/visual-service`](https://www.npmjs.com/package/@wdio/visual-service)提供。

这使您能够：

-   保存或比较**屏幕/元素/整页**截图与基准图像
-   当没有基准图像时**自动创建基准**
-   **屏蔽自定义区域**，甚至在比较期间**自动排除**状态栏和工具栏（仅限移动设备）
-   增加元素尺寸截图
-   在网站比较期间**隐藏文本**，以：
    -   **提高稳定性**并防止字体渲染不稳定
    -   只关注网站的**布局**
-   使用**不同的比较方法**和一组**额外的匹配器**，使测试更易读
-   验证您的网站如何**支持键盘Tab键导航**，参见[通过网站Tab导航](#tabbing-through-a-website)
-   以及更多功能，查看[服务](./visual-testing/service-options)和[方法](./visual-testing/method-options)选项

该服务是一个轻量级模块，用于为所有浏览器/设备检索所需的数据和截图。比较功能来自[ResembleJS](https://github.com/Huddle/Resemble.js)。如果您想在线比较图像，可以查看[在线工具](http://rsmbl.github.io/Resemble.js/)。

:::info 原生/混合应用注意事项
方法`saveScreen`、`saveElement`、`checkScreen`、`checkElement`以及匹配器`toMatchScreenSnapshot`和`toMatchElementSnapshot`可用于原生应用/上下文。

如果您想将其用于混合应用，请在服务设置中使用`isHybridApp:true`属性。
:::

## 安装

最简单的方法是通过以下命令将`@wdio/visual-service`作为开发依赖保存在您的`package.json`中：

```sh
npm install --save-dev @wdio/visual-service
```

## 使用方法

`@wdio/visual-service`可以作为普通服务使用。您可以在配置文件中按以下方式设置：

```js
import path from "node:path";

// wdio.conf.ts
export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // 一些选项，查看文档了解更多
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                formatImageName: "{tag}-{logName}-{width}x{height}",
                screenshotPath: path.join(process.cwd(), "tmp"),
                savePerInstance: true,
                // ... 更多选项
            },
        ],
    ],
    // ...
};
```

更多服务选项可以在[这里](/docs/visual-testing/service-options)找到。

在WebdriverIO配置中设置好后，您可以继续向[您的测试](/docs/visual-testing/writing-tests)添加视觉断言。

### 能力配置
要使用视觉测试模块，**您不需要向能力配置添加任何额外选项**。但是，在某些情况下，您可能希望向视觉测试添加额外的元数据，例如`logName`。

`logName`允许您为每个能力分配一个自定义名称，然后可以将其包含在图像文件名中。这对于区分在不同浏览器、设备或配置上拍摄的截图特别有用。

要启用此功能，您可以在`capabilities`部分定义`logName`，并确保视觉测试服务中的`formatImageName`选项引用它。以下是设置方法：

```js
import path from "node:path";

// wdio.conf.ts
export const config = {
    // ...
    // =====
    // Setup
    // =====
    capabilities: [
        {
            browserName: 'chrome',
            'wdio-ics:options': {
                logName: 'chrome-mac-15', // Chrome的自定义日志名
            },
        }
        {
            browserName: 'firefox',
            'wdio-ics:options': {
                logName: 'firefox-mac-15', // Firefox的自定义日志名
            },
        }
    ],
    services: [
        [
            "visual",
            {
                // 一些选项，查看文档了解更多
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                screenshotPath: path.join(process.cwd(), "tmp"),
                // 下面的格式将使用capabilities中的`logName`
                formatImageName: "{tag}-{logName}-{width}x{height}",
                // ... 更多选项
            },
        ],
    ],
    // ...
};
```

#### 工作原理
1. 设置`logName`：

    - 在`capabilities`部分，为每个浏览器或设备分配一个唯一的`logName`。例如，`chrome-mac-15`标识在macOS 15版本上运行的Chrome测试。

2. 自定义图像命名：

    - `formatImageName`选项将`logName`集成到截图文件名中。例如，如果`tag`是homepage，分辨率是`1920x1080`，则生成的文件名可能如下所示：

        `homepage-chrome-mac-15-1920x1080.png`

3. 自定义命名的好处：

    - 区分来自不同浏览器或设备的截图变得更加容易，特别是在管理基准和调试差异时。

4. 默认值说明：

    - 如果在capabilities中未设置`logName`，则`formatImageName`选项将在文件名中显示为空字符串（`homepage--15-1920x1080.png`）

### WebdriverIO MultiRemote

我们也支持[MultiRemote](https://webdriver.io/docs/multiremote/)。为了使其正常工作，请确保您在capabilities中添加了`wdio-ics:options`，如下所示。这将确保每个截图都有自己的唯一名称。

与使用[testrunner](https://webdriver.io/docs/testrunner)相比，[编写测试](/docs/visual-testing/writing-tests)不会有任何不同

```js
// wdio.conf.js
export const config = {
    capabilities: {
        chromeBrowserOne: {
            capabilities: {
                browserName: "chrome",
                "goog:chromeOptions": {
                    args: ["disable-infobars"],
                },
                // 这个！！！
                "wdio-ics:options": {
                    logName: "chrome-latest-one",
                },
            },
        },
        chromeBrowserTwo: {
            capabilities: {
                browserName: "chrome",
                "goog:chromeOptions": {
                    args: ["disable-infobars"],
                },
                // 这个！！！
                "wdio-ics:options": {
                    logName: "chrome-latest-two",
                },
            },
        },
    },
};
```

### 以编程方式运行

以下是通过`remote`选项使用`@wdio/visual-service`的最小示例：

```js
import { remote } from "webdriverio";
import VisualService from "@wdio/visual-service";

let visualService = new VisualService({
    autoSaveBaseline: true,
});

const browser = await remote({
    logLevel: "silent",
    capabilities: {
        browserName: "chrome",
    },
});

// "启动"服务，将自定义命令添加到`browser`
visualService.remoteSetup(browser);

await browser.url("https://webdriver.io/");

// 或使用此方法仅保存截图
await browser.saveFullPageScreen("examplePaged", {});

// 或使用此方法进行验证。这两种方法不需要组合使用，参见FAQ
await browser.checkFullPageScreen("examplePaged", {});

await browser.deleteSession();
```

### 通过网站Tab导航

您可以通过使用键盘<kbd>TAB</kbd>键检查网站是否可访问。测试可访问性的这部分一直是一项耗时的（手动）工作，并且通过自动化实现相当困难。
使用`saveTabbablePage`和`checkTabbablePage`方法，您现在可以在网站上绘制线条和点来验证Tab键导航顺序。

请注意，这仅适用于桌面浏览器，**不适用于**移动设备。所有桌面浏览器都支持此功能。

:::note

这项工作的灵感来自[Viv Richards](https://github.com/vivrichards600)的博客文章["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript)。

可Tab导航元素的选择方式基于模块[tabbable](https://github.com/davidtheclark/tabbable)。如果有关于Tab导航的任何问题，请查看[README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md)，特别是[更多详情](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details)部分。

:::

#### 工作原理

这两种方法都会在您的网站上创建一个`canvas`元素，并绘制线条和点来显示如果最终用户使用Tab键会导航到哪里。之后，它会创建一个全页截图，为您提供流程的良好概览。

:::important

**仅在您需要创建截图而不想将其与基准图像进行比较时使用`saveTabbablePage`。**

:::

当您想将Tab导航流程与基准进行比较时，可以使用`checkTabbablePage`方法。您**不需要**同时使用这两种方法。如果已经创建了基准图像（可以通过在实例化服务时提供`autoSaveBaseline: true`自动完成），
则`checkTabbablePage`将首先创建_实际_图像，然后将其与基准进行比较。

##### 选项

这两种方法使用与[`saveFullPageScreen`](https://github.com/wswebcreation/webdriver-image-comparison/blob/master/docs/OPTIONS.md#savefullpagescreen-or-savetabbablepage)或
[`compareFullPageScreen`](https://github.com/wswebcreation/webdriver-image-comparison/blob/master/docs/OPTIONS.md#comparefullpagescreen-or-comparetabbablepage)相同的选项。

#### 示例

这是Tab导航在我们的[测试网站](https://guinea-pig.webdriver.io/image-compare.html)上如何工作的示例：

![WDIO tabbing example](/img/visual/tabbable-chrome-latest-1366x768.png)

### 自动更新失败的视觉快照

通过添加参数`--update-visual-baseline`在命令行中更新基准图像。这将

-   自动复制实际拍摄的截图并将其放入基准文件夹
-   如果有差异，它将让测试通过，因为基准已更新

**用法：**

```sh
npm run test.local.desktop  --update-visual-baseline
```

在日志信息/调试模式下运行时，您将看到以下添加的日志：

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

## TypeScript支持

本模块包含TypeScript支持，让您在使用视觉测试服务时能够受益于自动完成、类型安全和改进的开发体验。

### 步骤1：添加类型定义
为确保TypeScript识别模块类型，请在tsconfig.json的types字段中添加以下条目：

```json
{
    "compilerOptions": {
        "types": ["@wdio/visual-service"]
    }
}
```

### 步骤2：为服务选项启用类型安全
要对服务选项强制类型检查，请更新您的WebdriverIO配置：

```ts
// wdio.conf.ts
import { join } from 'node:path';
// 导入类型定义
import type { VisualServiceOptions } from '@wdio/visual-service';

export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // 服务选项
                baselineFolder: join(process.cwd(), './__snapshots__/'),
                formatImageName: '{tag}-{logName}-{width}x{height}',
                screenshotPath: join(process.cwd(), '.tmp/'),
            } satisfies VisualServiceOptions, // 确保类型安全
        ],
    ],
    // ...
};
```

## 系统要求

### 版本5及以上

对于版本5及以上，该模块是一个纯JavaScript模块，除了[项目要求](/docs/gettingstarted#system-requirements)外，没有额外的系统依赖项。它使用[Jimp](https://github.com/jimp-dev/jimp)，这是一个完全用JavaScript编写的Node.js图像处理库，没有原生依赖项。

### 版本4及以下

对于版本4及以下，该模块依赖于[Canvas](https://github.com/Automattic/node-canvas)，这是一个适用于Node.js的canvas实现。Canvas依赖于[Cairo](https://cairographics.org/)。

#### 安装详情

默认情况下，在您项目的`npm install`期间，将下载适用于macOS、Linux和Windows的二进制文件。如果您没有受支持的操作系统或处理器架构，则该模块将在您的系统上编译。这需要几个依赖项，包括Cairo和Pango。

有关详细的安装信息，请参见[node-canvas wiki](https://github.com/Automattic/node-canvas/wiki/_pages)。以下是常见操作系统的一行安装说明。请注意，`libgif/giflib`、`librsvg`和`libjpeg`是可选的，仅在需要GIF、SVG和JPEG支持时才需要。需要Cairo v1.10.0或更高版本。

<Tabs
defaultValue="osx"
values={[
{label: 'OS', value: 'osx'},
{label: 'Ubuntu', value: 'ubuntu'},
{label: 'Fedora', value: 'fedora'},
{label: 'Solaris', value: 'solaris'},
{label: 'OpenBSD', value: 'openbsd'},
{label: 'Window', value: 'windows'},
{label: 'Others', value: 'others'},
]}

> <TabItem value="osx">

     使用[Homebrew](https://brew.sh/)：

     ```sh
     brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman
     ```

    **Mac OS X v10.11+：** 如果您最近更新到Mac OS X v10.11+并在编译时遇到问题，请运行以下命令：`xcode-select --install`。在[Stack Overflow](http://stackoverflow.com/a/32929012/148072)上阅读更多关于此问题的信息。
    如果您安装了Xcode 10.0或更高版本，要从源代码构建，您需要NPM 6.4.1或更高版本。

</TabItem>
<TabItem value="ubuntu">

    ```sh
    sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
    ```

</TabItem>
<TabItem value="fedora">

    ```sh
    sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel
    ```

</TabItem>
<TabItem value="solaris">

    ```sh
    pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto
    ```

</TabItem>
<TabItem value="openbsd">

    ```sh
    doas pkg_add cairo pango png jpeg giflib
    ```

</TabItem>
<TabItem value="windows">

    请参见[wiki](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows)

</TabItem>
<TabItem value="others">

    请参见[wiki](https://github.com/Automattic/node-canvas/wiki)

</TabItem>
</Tabs>