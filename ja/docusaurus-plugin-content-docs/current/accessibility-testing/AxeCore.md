---
id: axe-core
title: Axe Core
---

WebdriverIOテストスイート内に、[Deque社が提供するAxeと呼ばれる](https://www.deque.com/axe/)オープンソースのアクセシビリティツールを使用してアクセシビリティテストを含めることができます。セットアップは非常に簡単で、WebdriverIO Axeアダプタをインストールするだけです：

```bash npm2yarn
npm install -g @axe-core/webdriverio
```

Axeアダプタは、[ブラウザオブジェクト](/docs/api/browser)を使って簡単にインポートして初期化することで、[スタンドアロンまたはテストランナー](/docs/setuptypes)モードのどちらでも使用できます。例：

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

Axe WebdriverIOアダプタに関するより詳細なドキュメントは[GitHubで確認できます](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/webdriverio#usage)。