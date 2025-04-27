---
id: file-download
title: 文件下载
---

在网页测试中自动化文件下载时，必须在不同浏览器中一致地处理这些下载，以确保测试执行的可靠性。

在这里，我们提供文件下载的最佳实践，并演示如何为**Google Chrome**、**Mozilla Firefox**和**Microsoft Edge**配置下载目录。

## 下载路径

在测试脚本中**硬编码**下载路径可能导致维护问题和可移植性问题。使用**相对路径**作为下载目录，以确保在不同环境中的可移植性和兼容性。

```javascript
// 👎
// 硬编码下载路径
const downloadPath = '/path/to/downloads';

// 👍
// 相对下载路径
const downloadPath = path.join(__dirname, 'downloads');
```

## 等待策略

未能实施适当的等待策略可能导致竞态条件或不可靠的测试，特别是对于下载完成。实施**显式**等待策略以等待文件下载完成，确保测试步骤之间的同步。

```javascript
// 👎
// 没有明确等待下载完成
await browser.pause(5000);

// 👍
// 等待文件下载完成
await waitUntil(async ()=> await fs.existsSync(downloadPath), 5000);
```

## 配置下载目录

要覆盖**Google Chrome**、**Mozilla Firefox**和**Microsoft Edge**的文件下载行为，请在WebDriverIO功能中提供下载目录：

<Tabs
defaultValue="chrome"
values={[
{label: 'Chrome', value: 'chrome'},
{label: 'Firefox', value: 'firefox'},
{label: 'Microsoft Edge', value: 'edge'},
]
}>

<TabItem value='chrome'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L8-L16

```

</TabItem>

<TabItem value='firefox'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L20-L32

```

</TabItem>

<TabItem value='edge'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L36-L44

```

</TabItem>

</Tabs>

有关示例实现，请参考[WebdriverIO测试下载行为配方](https://github.com/webdriverio/example-recipes/tree/main/testDownloadBehavior)。

## 配置Chromium浏览器下载

要使用WebDriverIO的`getPuppeteer`方法访问Chrome DevTools，更改__基于Chromium__的浏览器（如Chrome、Edge、Brave等）的下载路径。

```javascript
const page = await browser.getPuppeteer();
// 初始化CDP会话：
const cdpSession = await page.target().createCDPSession();
// 设置下载路径：
await cdpSession.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: downloadPath });
```

## 处理多文件下载

在处理涉及多个文件下载的场景时，实施策略来有效管理和验证每个下载是非常重要的。考虑以下方法：

__顺序下载处理：__ 一个接一个地下载文件，并在启动下一个下载之前验证每个下载，以确保有序执行和准确验证。

__并行下载处理：__ 利用异步编程技术同时启动多个文件下载，优化测试执行时间。实施强大的验证机制，以便在下载完成后验证所有下载。

## 跨浏览器兼容性考虑

虽然WebDriverIO为浏览器自动化提供了统一的接口，但考虑到浏览器行为和功能的差异是非常重要的。考虑在不同的浏览器上测试您的文件下载功能，以确保兼容性和一致性。

__浏览器特定配置：__ 调整下载路径设置和等待策略，以适应Chrome、Firefox、Edge和其他支持的浏览器之间的行为和偏好差异。

__浏览器版本兼容性：__ 定期更新您的WebDriverIO和浏览器版本，以利用最新的功能和增强功能，同时确保与现有测试套件的兼容性。