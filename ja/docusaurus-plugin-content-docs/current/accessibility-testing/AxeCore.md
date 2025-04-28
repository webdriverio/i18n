---
id: axe-core
title: Axe コア
---

WebdriverIOテストスイート内に、[Deque社のAxeという名前のオープンソースアクセシビリティツール](https://www.deque.com/axe/)を使用してアクセシビリティテストを含めることができます。セットアップは非常に簡単で、WebdriverIO Axeアダプターをインストールするだけです：

```bash npm2yarn
npm install -g @axe-core/webdriverio
```

Axeアダプターは、[browserオブジェクト](/docs/api/browser)でインポートして初期化するだけで、[スタンドアローンモードまたはテストランナーモード](/docs/setuptypes)のいずれでも使用できます。例：

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

Axe WebdriverIOアダプターの詳細なドキュメントは[GitHubで確認できます](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/webdriverio#usage)。