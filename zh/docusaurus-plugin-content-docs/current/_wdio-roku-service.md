---
id: wdio-roku-service
title: Roku 服务
custom_edit_url: https://github.com/theREDspace/wdio-roku-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-roku-service 是一个第三方包，更多信息请参见 [GitHub](https://github.com/theREDspace/wdio-roku-service) | [npm](https://www.npmjs.com/package/wdio-roku-service)
此服务重写了 WebdriverIO 的许多部分，以允许它们与 Roku 应用程序一起使用，并提供对 [Roku ECP](https://developer.roku.com/en-ca/docs/developer-program/dev-tools/external-control-api.md) 的访问，以在测试期间控制 Roku。

## 要求

### Roku
一个测试频道/channel.zip 和一个 Roku 设备（启用了开发者模式），与您的 Mac 在同一网络上。

### WebdriverIO
这不是一个独立的产品 -- 它被用作 WebdriverIO 测试框架插件（或者按照他们的术语称为 Service）。在使用之前，您应该通过运行 `npm init wdio@latest` 完成 WDIO 的设置。

在进行设置步骤时，为了避免必须浏览所有问题/选项，您可以在初始化阶段选择以下选项：
- Roku Testing（注意：如果您的仓库只用于 Roku 测试，请使用此选项，因为它将成为默认且唯一安装的服务。否则，请使用 E2E Testing，以便您可以安装多个服务。）
- On my local machine（仅限 E2E）
- Web（仅限 E2E）
- Chrome（仅限 E2E）
- Mocha
- Typescript [modules 适用于 TS 和 JS，所以选择任意一个]
- autogenerate some test files (Y)
-- 默认位置
- page objects (Y)
-- 默认位置
- spec reporter
- additional plugins (N)
- Visual Testing (N)
- services (roku)
- npm install (Y)

### Typescript 配置
如果您想使用 Typescript 编写测试，您需要确保在 Webdriverio 生成的 tsconfig.json 文件中设置以下选项。
```
"moduleResolution": "nodenext",
"module": "NodeNext",
```
然后您可以通过按照下面详细说明的方式导入服务来使用它。

### WDIO 配置
目前，测试仅支持单个 Roku 设备。需要进行以下配置更新：
* `maxInstances` 和 `maxInstancesPerCapability` 应为 1。不支持自动在多个设备上测试，这将导致重复的命令被发送到 Roku。应该只有一个能力。
```js
//wdio.conf.js
export const config: WebdriverIO.Config = {

maxInstances: 1,

    capabilities: [{
        browserName: 'chrome'
        // 或者如果您想要无头模式：
        browserName: 'chrome',
        'goog:chromeOptions': { 
            args: ['--headless', '--disable-gpu']
        }
    }],
    //...
}
```

* 建议增加 `waitforInterval` 和 `waitforTimeout`，因为每个间隔都涉及从 Roku 下载 xml。为了更好地利用 `browser.debug()` 功能，您也可以选择延长 mocha testrunner 的超时时间到 5 分钟以上，以便于开发。
```js
//wdio.conf.js
export const config: WebdriverIO.Config = {
    waitforTimeout: 30000,
    
    //可选：
    mochaOpts: {
        ui: 'bdd',
        timeout: 600000
    },
    //...
}
```

您已经准备好编写您的第一个测试了！

```js
import { installFromZip } from 'wdio-roku-service/install'
import { exitChannel } from 'wdio-roku-service/channel'
import { Buttons, keyPress, keySequence } from 'wdio-roku-service/controller'

describe('first test', () => {
    before('On the landing screen of the test channel', async () => {
        await installFromZip(process.env.ROKU_APP_PATH)
    })

    it('should launch to the homescreen without login', async () => {
        await $("//LoadingIndicator").waitForDisplayed({ reverse: true })
        await expect($("//ContentCarousel")).toBeDisplayed()
    })

    after('should return to home', async () => {
        await exitChannel()
    })
})

```

也建议您利用 wdio 中的 `browser.debug()` 功能来暂停测试进行调试和测试创作：

```js
// ...
    it('should launch to the homescreen without login', async () => {
        await $("//LoadingIndicator").waitForDisplayed({ reverse: true })
        await expect($("//ContentCarousel")).toBeDisplayed()
        await browser.debug()
        // 测试暂停，可以使用 REPL 进行命令操作

```
如果 chrome 不是无头模式，您可以看到最后一次调用 `openRokuXML()` 的时间（可能是通过 `waitForX` 或 `expect`）。在终端中使用 REPL，您可以使用任何有效的 `$` 命令，以及一些添加的自定义命令（`browser.openRokuXML()` 和 `browser.saveScreenshot('path/to/ss.jpg')`）-- `controller` 类没有附加到 `browser` 对象上，所以当前无法使用那些命令。幸运的是，您可能就坐在 Roku 旁边，有一个遥控器可以用来导航，并偶尔调用 `browser.openRokuXML()` 来查看页面状态发生了什么变化！请记住，XML 在 chrome 浏览器本身中可以与 xpath 原生配合工作，因此您可以在调试过程中直接在 chrome 控制台中评估/开发选择器。

### .env
请参见 `.env.example` 文件。复制并将其重命名为 `.env`，放在使用此服务的 WebdriverIO 项目中。您可能还想将其添加到 .gitignore 中。

* `ROKU_IP` 应该是您的 Roku 的 IP。命令将使用此 IP 与之通信。这是必需的。
* `ROKU_USER` 和 `ROKU_PW`：需要登录凭证来安装归档文件，以及拍摄屏幕截图。
* `ROKU_APP_PATH` 应该是 Roku 频道 zip 文件的绝对路径。
* `ROKU_CHANNEL_ID` 应该是您的 Roku 频道的 ID（通常是 "dev"）。
* `DEBUG=wdio-roku-service` 将启用调试消息。如果您想要这些消息，请移除行首的 '#'。

## 修改的函数
### 浏览器
* `waitUntil` 将在每次迭代时从 Roku 获取 xml 以检查更改。
* `saveScreenshot` 将从 Roku 下载当前屏幕的截图。值得注意的是，这些截图采用 .jpg 格式，而不是 WebdriverIO 通常使用的 .png。
* `openRokuXML` 如果您需要手动而不是通过等待来获取 Roku 的 xml，可以使用此函数。

### 元素
* 所有等待的支持方式与浏览器相同。`waitForClickable` 映射到 `waitForDisplayed`，`waitForStable` 映射到 `waitForExist`。
* 不支持 `click`、`doubleClick` 和 `moveTo`。您必须手动导航应用程序。
* `isFocused` 将检查元素上的 `focused` 属性是否为 true。
* `isDisplayed` 将检查元素上的 `bounds` 属性，并且 `visible` 未设置为 false。如果设置了 `withinViewport`，则会将 bounds 与 Roku 的屏幕大小进行比较。
* `getSize` 和 `getLocation` 从 `bounds` 属性获取值，如果不存在，则返回大小为 0，位置为 -Infinity。

其他函数未更改，但许多仍然按预期工作。

### 匹配器
大多数匹配器都已更新为在等待时获取 xml。有些功能略有不同。
* `toBeDisplayed`、`toBeDisplayedInViewport`、`toBeFocused`、`toBeExisting`、`toBePresent`、`toExist`、`toHaveSize`、`toHaveWidth`、`toHaveHeight` 和 `toHaveAttribute` 都按预期工作，考虑到元素的更改。
* `toHaveElementProperty` 映射到 `toHaveAttribute`。
* `toHaveElementClass` 检查元素的 `name` 属性。
* `toHaveId` 映射到 `toHaveElementClass`。
* `toHaveText` 检查元素的 `text` 属性。
* `toHaveChildren` 检查元素的 `children` 属性。
* `toHaveHTML` 将 xml 视为 HTML，但可能用处不大。

以下当前不受支持：
* `toBeSelected` - 在确定所选按钮的 xml 外观如何后，如果有区别的话，可能很快就会受到支持。
* `toBeChecked` - 在确定选中的复选框的 xml 外观如何后，如果有区别的话，可能很快就会受到支持。
* `toHaveComputedLabel` - 如果您在 Roku 元素上有此等价物，请使用 `toHaveAttribute` 检查属性。
* `toHaveComputedRole` - 如果您在 Roku 元素上有此等价物，请使用 `toHaveAttribute` 检查属性。
* `toHaveHref` - 如果您在 Roku 元素上有 URL，请使用 `toHaveAttribute` 检查属性。
* `toHaveStyle` - xml 元素没有样式。
* `toHaveClipboardText` - 这是未知的。
* `toHaveTitle` - 标题将是 xml 的随机生成的临时文件名。
* `toHaveUrl` - URL 将是您计算机上 xml 文件的路径。

## 使用方法
### 频道安装

这需要您的频道有一个分配的 ID。
```js
import { installByID } from 'wdio-roku-service/install';

async before() {
    await installByID(process.env.ROKU_CHANNEL_ID);
}
```

归档安装

建议将路径存储在 .env 中，特别是如果您有多个开发人员可能有不同的位置和/或文件名。
```js
import { installFromZip } from 'wdio-roku-service/install';

async before() {
    await installFromZip(process.env.ROKU_ARCHIVE_PATH);
}
```

预安装频道

如果您在测试之前已经自行安装了频道，则可以简单地启动它。
```js
import { launchChannel, exitChannel } from 'wdio-roku-service/channel';

async before() {
    // 如果频道已经打开，则关闭它。如果频道支持即时恢复，这将仅将其放入后台
    await exitChannel();
    // 使用频道 ID 'dev' 将启动侧载应用程序。
    await launchChannel('dev');
}
```

### 测试
`wdio-roku-service/controller` 提供了向 Roku 发送按钮按压的能力。`keySequence` 是主要的一个，按顺序发送多个按钮按压。
```js
import { Buttons, keySequence } from 'wdio-roku-service/controller';

// 在应用程序中导航
await keySequence(Buttons.LEFT, Buttons.LEFT, Buttons.SELECT, Buttons.DOWN, Buttons.SELECT);
// 从 Roku 获取当前应用程序 UI 并将其加载到浏览器中
await browser.openRokuXML();
// 或者，使用等待，它将重复加载 XML，直到超时或条件通过
await browser.waitUntil(condition);
await element.waitForDisplayed();
// 在 roku XML 上使用 WDIO 匹配器，就像它是一个网页一样
await expect(element).toHaveAttr('focused');
```

`wdio-roku-service/controller` 还具有保持或释放按钮以及在键盘上输入文本的功能。
```js
import { Buttons, keyboardInput, keyPress, keySequence } from 'wdio-roku-service/controller';

await keySequence(Buttons.DOWN, Buttons.DOWN, Buttons.SELECT);
await keyboardInput('example');
await keyPress(Buttons.ENTER);
await browser.openRokuXML();
```

### 深度链接
`wdio-roku-service/channel` 提供与频道相关的功能。`inputChannel` 允许您向应用程序发送任意信息。
```js
import { exitChannel, launchChannel, MediaType } from 'wdio-roku-service/channel';
await exitChannel();
await launchChannel(process.env.ROKU_CHANNEL_ID, myContent, MediaType.MOVIE, {myExtraParameter:true});
await expect(MyContent.header).toBeDisplayed();
```

### 其他功能
`wdio-roku-service/info` 提供杂项功能，例如获取应用程序图标或孤立节点。
```js
import { getAppIcon } from 'wdio-roku-service/info';
const response = await getAppIcon(process.env.ROKU_CHANNEL_ID);
expect(response.headers.get('Content-Type')).toBe('image/jpg');
```
`wdio-roku-service/ecp` 是与 ECP 的直接接口，如果您需要执行任何高度特定的操作。
```js
import { ECP } from 'wdio-roku-service/ecp';
await ECP('search/browse?keyword=voyage&type=movie&tmsid=MV000058030000', 'POST');
```

## 常见问题
* Roku 元素的文本在 'text' 属性中，而不在标签之间。在进行选择器时，对于几乎所有元素，`$('element=Text')` 都不起作用。相反，您必须执行 `$('element[text=Text]')`。

## 功能路线图
* 即将提交一个 PR，允许在 `npm init wdio@latest` 问卷调查期间安装此服务。
* 目前正在评估与 Roku 的套接字通信，以便可以工具化更多功能，例如唤醒休眠的 Roku 的方法。
* 网络代理功能，允许通过网络活动进行键控。

## 利用 Allure 报告附加截图和 XML 文件

开箱即用，Allure 报告没有配置可以生成应用程序的截图或在测试执行的任何时刻代表 Roku 应用程序当前状态的 XML 代码副本。以下文档解释了如何解决这个问题，以便每次 `it` 测试完成运行时，都会生成应用程序当前状态的截图并附加到 Allure 报告中。它还允许在 `it` 测试运行失败时获取代表当前 Roku 应用程序状态的 XML 的源快照。

有关 Allure Reporter 的完整文档，请访问 @wdio/allure-reporter 文档 https://webdriver.io/docs/allure-reporter/

### Utils.js 依赖
将以下代码添加到名为 `Utils.js` 的文件中。此文件可能位于您的 `/helpers` 文件夹或类似位置。
```js
/**
 * 返回以毫秒为单位的'当前'时间戳的字符串表示，用于纪元。
 */
export const getEpochTimestamp = async () => {
    return Date.now().toString()
}

/**
 * 返回按以下模式的'当前'时间戳的字符串表示：{YYYY}-{MM}-{DD}_{24小时制的小时}-{分钟}-{秒}-{毫秒}
 */
export const getLongFormatTimestamp = async () => {
    const now = new Date(Date.now())
    const result = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}_${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}-${now.getMilliseconds()}`
    return result
}

/**
 * 一个包含用于报告目的的可能文件扩展名的字符串表示的对象。
 */
export const FILE_EXTENSIONS = {
    JPG: '.jpg',
    XML: '.xml'
}

/**
 * 一个包含用于报告目的的可能 MIME 类型的字符串表示的对象。
 */
export const FILE_MIME_TYPES = {
    JPG: 'image/jpeg',
    XML: 'application/xml'
}

/**
 * 一个函数，用于生成带有可能的前缀、时间戳和提供的可能扩展名之一的文件名。
 * @param {string} fileExtension 使用之前定义的 FILE_EXTENSIONS 对象中的一个值。
 * @param {string} [fileNamePrefix] 如果提供，则在文件名开头附加的前缀。默认为空字符串。
 */
export const getFileNameWithTimestamp = async (fileExtension, fileNamePrefix = '') => {
    return (fileNamePrefix !== '')
        ? `${fileNamePrefix}_${await getLongFormatTimestamp()}${fileExtension}`
        : `${await getLongFormatTimestamp()}${fileExtension}`
}

```

### wdio.conf.js 代码
在 `wdio.conf.js` 文件中添加以下导入语句：
```js
import { readFile, rm } from 'node:fs/promises'
import { addAttachment } from '@wdio/allure-reporter'
import { FILE_EXTENSIONS, FILE_MIME_TYPES, getFileNameWithTimestamp } from './<Utils.js file path>/Utils.js'  // 将 <Utils.js file path> 替换为 Utils.js 文件的实际相对路径

```

在 `wdio.conf.js` 文件中定义以下 `afterTest` 钩子。如果您在此钩子中已有工作代码，请将下面提供的代码附加到其中。
```js
afterTest: async function (test, context, result) {
        // 无论测试结果如何，都保存并附加截图的逻辑。
        const fileName = await getFileNameWithTimestamp(FILE_EXTENSIONS.JPG)
        try {
            const tempScreenshotPath = `./allure-results/${fileName}`
            await browser.saveScreenshot(tempScreenshotPath)
            const screenShotData = await readFile(tempScreenshotPath)
            addAttachment(`${fileName}`, screenShotData, FILE_MIME_TYPES.JPG)
            await rm(tempScreenshotPath).catch((rmError) => {
                console.error(`Failed to remove file: ${tempScreenshotPath}`, rmError)
            })
        } catch (error) {
            console.error('Error handling screenshot or attachment: ', error)
        }

        // 测试失败时附加 XML 的逻辑。
        if (result.passed === false) {
            const fileName = await getFileNameWithTimestamp(FILE_EXTENSIONS.XML, 'AppStateAfterTestFail')
            const rawSourceString = String(await browser.getPageSource())
            const extractedXMLSubstring = '<?xml version="1.0" encoding="UTF-8" ?>\n'.concat(rawSourceString.substring(rawSourceString.search('<app-ui xmlns="">'), rawSourceString.search('</app-ui>')).concat('</app-ui>')).replace('<app-ui xmlns="">', '<app-ui>')
            try {
                addAttachment(`${fileName}`, extractedXMLSubstring, FILE_MIME_TYPES.XML)
            } catch (error) {
                console.log(error)
            }
        }
    },
```

### 预期行为
在项目配置中实施此代码后，预期是每次运行 `it` 测试时，无论测试结果如何，都将在运行结束时拍摄屏幕截图并附加到 Allure 报告的相关部分。在测试失败的特定情况下，应用程序状态的 XML 格式的源快照也将附加到 Allure 报告中的测试部分。

### 注意
* 开箱即用的 Allure 报告支持 `.png` 格式的屏幕截图。此服务中的方法重写支持 `.jpg` 格式的图像。
* XML 附件可以在 Allure 报告本身中浏览或在浏览器的单独标签中打开。