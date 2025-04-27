---
id: snapshot
title: 快照
---

快照测试对于一次性断言组件或逻辑的多个方面非常有用。在WebdriverIO中，您可以对任意对象、WebElement的DOM结构或WebdriverIO命令结果进行快照。

与其他测试框架类似，WebdriverIO会对给定值进行快照，然后将其与存储在测试旁边的参考快照文件进行比较。如果两个快照不匹配，测试将失败：要么变更是意外的，要么参考快照需要更新到结果的新版本。

:::info 跨平台支持

这些快照功能适用于在Node.js环境中运行的端到端测试，以及在浏览器或移动设备上运行的[单元和组件测试](/docs/component-testing)。

:::

## 使用快照
要对一个值进行快照，您可以使用[`expect()`](/docs/api/expect-webdriverio) API中的`toMatchSnapshot()`：

```ts
import { browser, expect } from '@wdio/globals'

it('can take a DOM snapshot', () => {
    await browser.url('https://guinea-pig.webdriver.io/')
    await expect($('.findme')).toMatchSnapshot()
})
```

首次运行此测试时，WebdriverIO会创建一个如下所示的快照文件：

```js
// Snapshot v1

exports[`main suite 1 > can take a DOM snapshot 1`] = `"<h1 class="findme">Test CSS Attributes</h1>"`;
```

快照文件应与代码更改一起提交，并作为代码审查过程的一部分进行审查。在后续的测试运行中，WebdriverIO将渲染的输出与先前的快照进行比较。如果它们匹配，测试将通过。如果它们不匹配，要么测试运行器在您的代码中发现了应该修复的错误，要么实现已经改变，需要更新快照。

要更新快照，向`wdio`命令传递`-s`标志（或`--updateSnapshot`），例如：

```sh
npx wdio run wdio.conf.js -s
```

__注意：__如果您使用多个浏览器并行运行测试，只会创建并比较一个快照。如果您希望每个功能有单独的快照，请[提出问题](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Idea+%F0%9F%92%A1%2CNeeds+Triaging+%E2%8F%B3&projects=&template=feature-request.yml&title=%5B%F0%9F%92%A1+Feature%5D%3A+%3Ctitle%3E)并让我们了解您的用例。

## 内联快照

类似地，您可以使用`toMatchInlineSnapshot()`在测试文件中内联存储快照。

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

Vitest不会创建快照文件，而是直接修改测试文件以将快照更新为字符串：

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
    const elem = $('.container')
    await expect(elem.getCSSProperty()).toMatchInlineSnapshot(`
        {
            "parsed": {
                "alpha": 0,
                "hex": "#000000",
                "rgba": "rgba(0,0,0,0)",
                "type": "color",
            },
            "property": "background-color",
            "value": "rgba(0,0,0,0)",
        }
    `)
})
```

这允许您直接查看预期输出，而无需在不同文件之间跳转。

## 视觉快照

对元素进行DOM快照可能不是最好的方法，特别是当DOM结构太大并且包含动态元素属性时。在这些情况下，建议依靠元素的视觉快照。

要启用视觉快照，请将`@wdio/visual-service`添加到您的设置中。您可以按照[文档](/docs/visual-testing#installation)中的设置说明进行视觉测试。

然后，您可以通过`toMatchElementSnapshot()`进行视觉快照，例如：

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

然后，图像将存储在基线目录中。查看[视觉测试](/docs/visual-testing)获取更多信息。