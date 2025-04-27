---
id: axe-core
title: Axe Core
---

您可以使用[Deque公司的开源可访问性工具Axe](https://www.deque.com/axe/)在WebdriverIO测试套件中包含可访问性测试。设置非常简单，您只需要通过以下方式安装WebdriverIO Axe适配器：

```bash npm2yarn
npm install -g @axe-core/webdriverio
```

Axe适配器可以在[独立模式或测试运行器](/docs/setuptypes)模式下使用，只需简单地导入并使用[browser对象](/docs/api/browser)初始化它，例如：

```ts
import { browser } from '@wdio/globals'
import AxeBuilder from '@axe-core/webdriverio'

describe('Accessibility Test', () => {
    it('should get the accessibility results from a page', async () => {
        const builder = new AxeBuilder({ client: browser })

        await browser.url('https://testingbot.com')
        const result = await builder.analyze()
        console.log('Acessibility Results:', result)
    })
})
```

您可以在[GitHub](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/webdriverio#usage)上找到有关Axe WebdriverIO适配器的更多文档。