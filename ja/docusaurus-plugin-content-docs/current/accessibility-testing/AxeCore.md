---
id: axe-core
title: Axe Core
description: WebdriverIOテストスイートにアクセシビリティテストを組み込む方法
---

WebdriverIOテストスイート内にDequeの[オープンソースアクセシビリティツールAxe](https://www.deque.com/axe/)を使ってアクセシビリティテストを組み込むことができます。セットアップは非常に簡単で、WebdriverIO Axeアダプターをインストールするだけです：

```bash npm2yarn
npm install -g @axe-core/webdriverio
```

Axeアダプターは、[ブラウザオブジェクト](/docs/api/browser)を使って単純にインポートして初期化することで、[スタンドアロンまたはテストランナー](/docs/setuptypes)モードのどちらでも使用できます。例：

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

Axe WebdriverIOアダプターについての詳細なドキュメントは[GitHubで確認できます](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/webdriverio#usage)。